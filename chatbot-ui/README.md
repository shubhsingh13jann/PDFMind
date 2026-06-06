# PDF Answer Assistant - Frontend

The frontend is a React and TypeScript application for interacting with the PDF Answer Assistant backend. Users can upload PDFs, select a document, choose an answer provider, and ask questions through a clean chat interface.

## Features

- Upload PDF files
- View available uploaded PDFs
- Ask questions from a selected PDF
- Choose between supported answer providers
- Display source pages returned by the backend

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Lucide React

## Prerequisites

Make sure the following are installed:

- Node.js 18 or newer
- npm
- Backend running at `http://127.0.0.1:8000`

## Installation

From the project root, move into the frontend folder:

```powershell
cd chatbot-ui
```

Install dependencies:

```powershell
npm install
```

The frontend uses `package.json` for dependency management. The `package-lock.json` file keeps installed versions consistent across machines.

## Running The Frontend

Start the development server:

```powershell
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

Make sure the backend is also running before uploading PDFs or asking questions.

## Build Commands

Create a production build:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

Run ESLint:

```powershell
npm run lint
```

## Backend Connection

The frontend currently calls the backend API at:

```text
http://127.0.0.1:8000
```

If the backend URL changes, update the API base URL in:

```text
src/services/api.ts
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```text
chatbot-ui/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.cjs
├── public/
└── src/
    ├── components/
    ├── services/
    ├── types/
    ├── App.tsx
    └── main.tsx
```

## Important Notes

- Do not commit `node_modules/`.
- Do not commit `dist/`.
- Frontend dependencies should be installed with `npm install`, not `pip`.
- Keep the backend running while using the frontend locally.
