# PDF Answer Assistant

PDF Answer Assistant is a full-stack chatbot application that lets users upload PDF files and ask questions based on their content. The backend extracts text from PDFs, stores document data, creates a vector search index, and generates answers using an LLM provider. The frontend provides a clean interface for uploading documents, selecting PDFs, and chatting with the assistant.

## Project Overview

This repository contains two applications:

| Folder | Description |
| --- | --- |
| `chatbot-ollama/` | FastAPI backend for PDF processing, vector search, MongoDB storage, and LLM-based answers |
| `chatbot-ui/` | React + TypeScript frontend for uploading PDFs and asking questions |

## Features

- Upload PDF documents
- Extract and store PDF text
- Ask questions from a selected PDF
- Retrieve relevant document chunks using FAISS
- Generate answers with Ollama or Groq
- Show source pages for generated answers
- Use a React chat interface for interaction

## Tech Stack

**Backend**

- Python
- FastAPI
- MongoDB
- LangChain
- FAISS
- Ollama

**Frontend**

- React
- TypeScript
- Vite
- Tailwind CSS

## Prerequisites

Install the following before running the project:

- Python 3.10 or newer
- Node.js 18 or newer
- npm
- MongoDB, local or MongoDB Atlas
- Ollama, if using local LLM models

Recommended Ollama models:

```powershell
ollama pull gemma3:4b
ollama pull nomic-embed-text
```

## Quick Start

Clone the repository:

```powershell
git clone <repository-url>
cd <repository-folder>
```

### 1. Run The Backend

Move into the backend folder:

```powershell
cd chatbot-ollama
```

Create and activate a virtual environment:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

Install backend dependencies:

```powershell
pip install -r requirements.txt
```

Create the local environment file:

```powershell
copy .env.example .env
```

Update `.env` with your local MongoDB and model settings. Do not commit `.env`.

Start the backend:

```powershell
uvicorn main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

### 2. Run The Frontend

Open a new terminal from the project root and move into the frontend folder:

```powershell
cd chatbot-ui
```

Install frontend dependencies:

```powershell
npm install
```

Start the frontend:

```powershell
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Environment Variables

The backend uses a local `.env` file. Use `.env.example` as the template and keep `.env` private.

Do not commit:

- `.env`
- API keys
- private database URLs
- uploaded PDFs
- virtual environments
- `node_modules/`

## Project Structure

```text
.
├── chatbot-ollama/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   └── utils/
├── chatbot-ui/
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
├── .gitignore
└── README.md
```

## Detailed Setup Guides

For complete setup details, see:

- [Backend README](chatbot-ollama/readme.md)
- [Frontend README](chatbot-ui/README.md)

## Deployment Notes

Ollama runs as a local model server, so it does not run directly on Vercel. A common deployment setup is:

- Deploy the frontend on Vercel
- Deploy the FastAPI backend on a server, VPS, Render, Railway, or similar platform
- Run Ollama on the backend machine or use a cloud LLM provider
- Use MongoDB Atlas for the database

## License

Add a license file before publishing this project publicly.
