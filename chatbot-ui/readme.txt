PDF Answer Assistant - Frontend

The frontend is a React and TypeScript application built with Vite. It provides one shared PDF assistant view for uploading PDFs, selecting documents stored in MongoDB, and asking questions through the backend API.

Features

- Upload PDF files
- View and search available PDFs
- Select a PDF from the shared sidebar
- Ask questions about the selected PDF
- Choose between Ollama and Groq providers
- Display assistant responses in a chat interface

Prerequisites

- Node.js 18 or newer
- npm
- Backend running at http://127.0.0.1:8000

Installation

From the repository root:

cd chatbot-ui
npm install

Running the Frontend

Start the Vite development server:

npm run dev

Frontend URL: http://localhost:5173

The backend must also be running before uploading PDFs or asking questions.

Build and Quality Commands

npm run build      Create a production build
npm run preview    Preview the production build
npm run lint       Run ESLint

Backend Connection

The frontend uses http://127.0.0.1:8000 by default. To change this, set VITE_API_BASE_URL or update the API base URL in src/services/api.ts.

Project Structure

src/App.tsx                         Application entry point
src/pages/Guest/GuestPage.tsx       Shared PDF assistant page
src/components/dashboard/           Sidebar and chat components
src/components/shared/               Upload and shared UI components
src/services/api.ts                 Backend API requests
src/types/index.ts                  Shared TypeScript types

Important Notes

- Do not commit node_modules or dist.
- Install frontend dependencies with npm install.
- Keep the backend running while using the frontend locally.