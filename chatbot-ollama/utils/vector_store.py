from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings
from langchain_community.vectorstores import FAISS


def _build_documents(items: list[str] | list[dict]) -> list[Document]:
    docs = []

    for item in items:
        if isinstance(item, dict):
            text = (item.get("text") or "").strip()
            metadata = {"page": item.get("page")}
        else:
            text = str(item).strip()
            metadata = {}

        if text:
            docs.append(Document(page_content=text, metadata=metadata))

    return docs


def create_vector_store(texts: list[str] | list[dict]):
    source_docs = _build_documents(texts)
    if not source_docs:
        raise ValueError("Cannot create a vector store without readable text.")

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150
    )

    docs = text_splitter.split_documents(source_docs)

    if not docs:
        raise ValueError("Cannot create a vector store without text chunks.")

    embeddings = OllamaEmbeddings(model="nomic-embed-text")

    vector_store = FAISS.from_documents(docs, embeddings)

    return vector_store
