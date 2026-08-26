<h1 align="center">PDF Answer Assistant</h1>

<p align="center">
  A full-stack PDF question-answering chatbot that helps users upload documents and get answers directly from PDF content.
</p>

<p align="center">
  <strong>React</strong> · <strong>FastAPI</strong> · <strong>MongoDB</strong> · <strong>LangChain</strong> · <strong>FAISS</strong> · <strong>Ollama</strong>
</p>

## Overview

PDF Answer Assistant is designed to make PDF documents easier to search, understand, and question. Users can upload a PDF, select it from the interface, and ask natural language questions. The system retrieves relevant content from the document and generates an answer based on the PDF context.

The project is split into a frontend and backend. The frontend provides the user interface, while the backend handles PDF processing, storage, retrieval, and answer generation.

## Key Features

- Upload and process PDF files
- Ask questions from selected PDFs
- Retrieve relevant document sections using vector search
- Generate answers using Ollama or Groq
- Display source pages for better answer traceability
- Clean React-based chat interface

## Repository Structure

| Folder | Purpose |
| --- | --- |
| `chatbot-ollama/` | Backend API for PDF processing, vector search, MongoDB storage, and LLM-based answers |
| `chatbot-ui/` | Frontend application for uploading PDFs and chatting with the assistant |

## Technology Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Python, FastAPI, LangChain |
| Database | MongoDB |
| Vector Search | FAISS |
| LLM Provider | Ollama, Groq |

## Documentation

Detailed setup and run instructions are available inside each project folder:

- [Backend Documentation](chatbot-ollama/readme.txt)
- [Frontend Documentation](chatbot-ui/readme.txt)

## Security Notes

Environment files and private configuration should not be committed to GitHub. Use `.env.example` as a safe template and keep real `.env` files local.

## Deployment Note

Ollama runs as a local model server and does not run directly on Vercel. For deployment, the frontend can be hosted separately while the backend runs on a server that has access to Ollama or another LLM provider.
