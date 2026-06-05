# PDF Chatbot with FastAPI and Ollama

A simple PDF chatbot that allows users to upload PDF files and ask questions about their content using Ollama LLM.

## Features

- Upload PDF files and extract text content
- Store PDFs in MongoDB database
- Create vector embeddings using FAISS
- Ask questions about specific PDFs
- Get answers powered by Ollama LLM

## Setup

1. Clone the project and navigate to the directory

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your MongoDB URI if needed.

5. Make sure you have:
   - MongoDB running (locally or remote)
   - Ollama installed and running with llama2 and llama3 models

6. Create the utils directory and add all utility files

## Running the Application

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

- `GET /list_pdfs` - Get all uploaded PDF names
- `POST /upload_pdf` - Upload a new PDF file
- `POST /ask_from_pdf` - Ask a question about a specific PDF

## Project Structure

```
project/
├── main.py
├── requirements.txt
├── .env
├── .env.example
├── README.md
├── uploads/           # Directory for temporary PDF storage
└── utils/
    ├── pdf_parser.py
    ├── vector_store.py
    ├── ollama_chain.py
    ├── mongo_handler.py
    └── session_manager.py
```