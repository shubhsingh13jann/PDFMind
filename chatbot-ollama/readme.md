# PDF Answer Assistant - Backend

The backend is a FastAPI service for a PDF-based question-answering chatbot. It handles PDF uploads, extracts text, stores document data in MongoDB, creates a FAISS vector store, and generates answers using an LLM provider such as Ollama or Groq.

## Features

- Upload and process PDF files
- Extract readable text page by page
- Store PDF content and metadata in MongoDB
- Create vector embeddings for document search
- Ask questions from a selected PDF
- Return answer source pages for better traceability

## Tech Stack

- Python
- FastAPI
- MongoDB
- LangChain
- FAISS
- Ollama
- PyPDF2

## Prerequisites

Make sure the following are installed:

- Python 3.10 or newer
- MongoDB, either local or MongoDB Atlas
- Ollama, if using local models

For the recommended local Ollama setup, pull these models:

```powershell
ollama pull llama3.2:1b
ollama pull nomic-embed-text
```

## Installation

From the project root, move into the backend folder:

```powershell
cd chatbot-ollama
```

Create a virtual environment:

```powershell
python -m venv venv
```

Activate the virtual environment.

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Windows Command Prompt:

```cmd
venv\Scripts\activate.bat
```

macOS/Linux:

```bash
source venv/bin/activate
```

If PowerShell blocks activation, allow script execution for the current terminal session:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

Install Python packages:

```powershell
pip install -r requirements.txt
```

## Environment Setup

Create a local environment file from the example file:

```powershell
copy .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

Update `.env` with your local configuration. Keep `.env` private and do not commit it to GitHub. The safe template file, `.env.example`, should be committed instead.

Groq is optional. If you do not have a Groq API key, use the Ollama provider.

## Running The Backend

Start MongoDB and Ollama first, then run:

```powershell
uvicorn main:app --reload
```

The backend will run at:

```text
http://localhost:8000
```

Interactive API documentation is available at:

```text
http://localhost:8000/docs
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Check whether the API is running |
| `GET` | `/list_pdfs` | List all uploaded PDFs |
| `POST` | `/upload_pdf` | Upload and process a PDF file |
| `POST` | `/ask_from_pdf` | Ask a question from a selected PDF |
| `GET` | `/test_ollama` | Test the Ollama connection |

## Project Structure

```text
chatbot-ollama/
├── main.py
├── requirements.txt
├── .env.example
├── uploads/
└── utils/
    ├── mongo_handler.py
    ├── ollama_chain.py
    ├── pdf_parser.py
    ├── session_manager.py
    └── vector_store.py
```

## Important Notes

- Never commit `.env`.
- Uploaded PDFs are ignored by Git.
- The backend expects MongoDB to be reachable through the URI configured in `.env`.
- If you change the embedding model in `utils/vector_store.py`, pull that model in Ollama before running the app.
