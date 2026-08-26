PDF Answer Assistant - Backend

The backend is a FastAPI service for a PDF question-answering chatbot. It extracts PDF text, stores documents in MongoDB, creates FAISS vector stores using Ollama embeddings, and generates answers with Ollama or Groq.

Prerequisites

- Python 3.10 or newer
- MongoDB running locally or through MongoDB Atlas
- Ollama running locally for the Ollama provider

Install the required Ollama models:

ollama pull llama3.2:1b
ollama pull nomic-embed-text

Installation

From the repository root:

cd chatbot-ollama
python -m venv venv

Windows PowerShell:

.\venv\Scripts\Activate.ps1

Windows Command Prompt:

venv\Scripts\activate.bat

Install Python packages:

pip install -r requirements.txt

Environment Setup

Copy .env.example to .env and update the local values. Keep .env private and never commit it.

The default Ollama configuration is:

OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:1b

Running the Backend

Start MongoDB and Ollama, then run:

uvicorn main:app --reload

Backend URL: http://localhost:8000
API documentation: http://localhost:8000/docs

Endpoints

GET  /                 Check API health
GET  /list_pdfs        List stored PDF names
POST /upload_pdf       Upload and process a PDF
POST /ask_from_pdf     Ask a question about a selected PDF
GET  /test_ollama      Test Ollama processing

Important Notes

- The nomic-embed-text model is required for PDF search.
- The llama3.2:1b model generates Ollama answers.
- Groq is optional and requires a valid GROQ_API_KEY.
- Uploaded PDFs are stored in the uploads directory and MongoDB.