from fastapi import FastAPI, UploadFile, File, HTTPException
import os
import shutil
from dotenv import load_dotenv

from utils.pdf_parser import extract_pages_from_pdf
from utils.vector_store import create_vector_store
from utils.ollama_chain import create_qa_chain
from utils.mongo_handler import save_pdf_to_mongo, get_all_pdf_names, get_pdf_pages_by_name
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class AskRequest(BaseModel):
    question: str
    pdf_name: str
    provider: str = "ollama"

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

vector_db = None
qa_chain = None
qa_chain_cache = {}


def _build_qa_chain_for_pdf(pdf_name: str, pages: list[dict], provider: str = "ollama"):
    global vector_db, qa_chain

    provider = provider.lower().strip()
    cache_key = f"{pdf_name}:{provider}"
    cached_chain = qa_chain_cache.get(cache_key)
    if cached_chain:
        qa_chain = cached_chain
        return cached_chain

    vector_db = create_vector_store(pages)
    qa_chain = create_qa_chain(vector_db, provider=provider)
    qa_chain_cache[cache_key] = qa_chain
    return qa_chain


def _source_pages(source_documents: list) -> list[int]:
    pages = set()
    for document in source_documents:
        page = document.metadata.get("page")
        if page:
            pages.add(int(page))
    return sorted(pages)

@app.get("/")
async def root():
    return {"message": "PDF Chatbot API is running"}

@app.get("/test_ollama")
async def test_ollama():
    try:
        from utils.ollama_chain import create_qa_chain
        from utils.vector_store import create_vector_store
        
        # Test with simple text
        test_pages = [{"page": 1, "text": "This is a test document for checking if Ollama is working properly."}]
        vector_db = create_vector_store(test_pages)
        qa_chain = create_qa_chain(vector_db)
        
        result = qa_chain.invoke({"query": "What is this document about?"})
        return {"status": "success", "test_result": result.get("result", result)}
    except Exception as e:
        return {"status": "error", "error": str(e)}

@app.get("/list_pdfs")
async def list_pdfs():
    return {"pdfs": get_all_pdf_names()}

@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload a valid PDF file.")

    safe_filename = os.path.basename(file.filename)
    file_path = os.path.join(UPLOAD_DIR, safe_filename)

    try:
        print(f"Starting upload for {safe_filename}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        print("Extracting text from PDF...")
        pages = extract_pages_from_pdf(file_path)
        text = "\n\n".join(page["text"] for page in pages)
        print(f"Extracted {len(text)} characters")
        if not text.strip():
            raise HTTPException(status_code=400, detail="No readable text was found in this PDF.")

        print("Creating vector store...")
        for cache_key in list(qa_chain_cache):
            if cache_key.startswith(f"{safe_filename}:"):
                qa_chain_cache.pop(cache_key, None)
        _build_qa_chain_for_pdf(safe_filename, pages, provider="ollama")
        print("Vector store and QA chain created")

        print("Saving to MongoDB...")
        with open(file_path, "rb") as f:
            save_pdf_to_mongo(safe_filename, f.read(), text, pages)
        print("Saved to MongoDB")

        return {
            "filename": safe_filename,
            "detail": "File uploaded, saved to DB, and processed successfully."
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in upload_pdf: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to upload PDF: {str(e)}")

@app.post("/ask_from_pdf")
async def ask_from_pdf(payload: AskRequest):
    question = payload.question
    pdf_name = payload.pdf_name
    provider = payload.provider.lower().strip()
    if provider not in {"ollama", "groq"}:
        raise HTTPException(status_code=400, detail="Provider must be either 'ollama' or 'groq'.")

    pages = get_pdf_pages_by_name(pdf_name)
    if not pages:
        raise HTTPException(status_code=404, detail=f"No PDF named '{pdf_name}' found in database.")

    chain = _build_qa_chain_for_pdf(pdf_name, pages, provider=provider)

    try:
        answer = chain.invoke({"query": question})
        source_documents = answer.get("source_documents", [])
        return {
            "answer": answer.get("result", answer),
            "source": provider,
            "pdf": pdf_name,
            "pages": _source_pages(source_documents),
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to answer: {str(e)}")
