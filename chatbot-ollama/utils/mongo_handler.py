import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["chatbotDB"]
pdfs_collection = db["pdfs"]

def save_pdf_to_mongo(filename: str, file_bytes: bytes, text: str, pages: list[dict] | None = None):
    pdf_data = {"file": file_bytes, "text": text, "pages": pages or []}
    existing = pdfs_collection.find_one({"filename": filename})
    if existing:
        pdfs_collection.update_one(
            {"filename": filename},
            {"$set": pdf_data}
        )
    else:
        pdfs_collection.insert_one({
            "filename": filename,
            **pdf_data
        })

def get_all_pdf_names():
    return [doc["filename"] for doc in pdfs_collection.find({}, {"filename": 1})]

def get_pdf_text_by_name(filename: str):
    doc = pdfs_collection.find_one({"filename": filename})
    return doc["text"] if doc else None


def get_pdf_pages_by_name(filename: str):
    doc = pdfs_collection.find_one({"filename": filename})
    if not doc:
        return None
    return doc.get("pages") or [{"page": 1, "text": doc.get("text", "")}]
