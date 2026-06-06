// src/types/index.ts

export interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  source?: string;
  pdf?: string;
  isError?: boolean;
}

export interface UploadStatus {
  type: 'success' | 'error';
  message: string;
}

export interface UploadResponse {
  filename: string;
  detail: string;
}

export interface QuestionResponse {
  answer: string;
  source: string;
  pdf: string;
  pages?: number[];
}

export type LLMProvider = 'ollama' | 'groq';

export interface PDFListResponse {
  pdfs: string[];
}

export interface APIError {
  error?: string;
  detail?: string;
}

export interface PDFUploaderProps {
  onUploadSuccess: (filename: string) => void;
  compact?: boolean;
  variant?: 'light' | 'dark';
}

export interface PDFSelectorProps {
  pdfs: string[];
  selectedPdf: string;
  onPdfSelect: (pdfName: string) => void;
}

export interface ChatInterfaceProps {
  selectedPdf: string;
  pdfs: string[];
  onPdfSelect: (pdfName: string) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isAuthenticated: boolean;
  uploadedCount?: number;
}
