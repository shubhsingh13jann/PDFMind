from langchain_ollama import OllamaLLM
from langchain_classic.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
import logging
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

QA_PROMPT = PromptTemplate.from_template("""
You are a helpful PDF assistant.

Use only the provided PDF context to answer the question.
If the answer is not present in the context, say:
"I could not find this information in the PDF."

Give a clear and direct answer.
Use bullet points when helpful.
Avoid making up facts.

Context:
{context}

Question:
{question}

Answer:
""")


def _create_llm(provider: str):
    if provider == "groq":
        from langchain_groq import ChatGroq

        api_key = os.getenv("GROQ_API_KEY")
        if not api_key or api_key == "your_groq_api_key_here":
            raise ValueError("GROQ_API_KEY is missing. Add it to your .env file to use Groq.")

        return ChatGroq(
            model=os.getenv("GROQ_MODEL", "llama-3.1-8b-instant"),
            api_key=api_key,
            temperature=0.1,
            max_tokens=220,
            timeout=60,
        )

    return OllamaLLM(
        model=os.getenv("OLLAMA_MODEL", "llama3.2:1b"),
        base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
        timeout=60,
        temperature=0.1,
        num_predict=180,
    )


def create_qa_chain(vector_db, provider: str = "ollama"):
    try:
        provider = provider.lower().strip()
        if provider not in {"ollama", "groq"}:
            raise ValueError("Provider must be either 'ollama' or 'groq'.")

        logger.info("Creating %s LLM...", provider)
        llm = _create_llm(provider)
        
        logger.info("Creating retriever...")
        retriever = vector_db.as_retriever(
            search_type="mmr",
            search_kwargs={"k": 5, "fetch_k": 15}
        )
        
        logger.info("Creating QA chain...")
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=retriever,
            return_source_documents=True,
            chain_type_kwargs={"prompt": QA_PROMPT},
        )
        logger.info("QA chain created successfully!")
        
        return qa_chain
    except Exception as e:
        logger.error(f"Error creating QA chain: {str(e)}")
        raise e
