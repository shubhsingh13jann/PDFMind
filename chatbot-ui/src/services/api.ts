// src/services/api.ts
import type { UploadResponse, QuestionResponse, PDFListResponse, APIError, LLMProvider } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Adjust this to your FastAPI server URL

const getErrorMessage = (errorData: APIError, fallback: string): string => {
  return errorData.detail || errorData.error || fallback;
};

// Fetch all PDFs from the backend
export const fetchPdfs = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/list_pdfs`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: PDFListResponse = await response.json();
    return data.pdfs || [];
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    throw new Error('Failed to fetch PDFs');
  }
};

// Upload a PDF file to the backend
export const uploadPdf = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload_pdf`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData: APIError = await response.json();
      throw new Error(getErrorMessage(errorData, `HTTP error! status: ${response.status}`));
    }

    const result: UploadResponse = await response.json();
    return result;
    } catch (error) {
        console.error('Error uploading PDF:', error);

        if (error instanceof Error) {
          throw new Error(error.message || 'Failed to upload PDF');
        } else {
          throw new Error('Failed to upload PDF');
        }
      }
};

// Ask a question about a specific PDF
export const askQuestion = async (
  question: string,
  pdfName: string,
  provider: LLMProvider
): Promise<QuestionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ask_from_pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question,
        pdf_name: pdfName,
        provider: provider,
      }),
    });

    if (!response.ok) {
      const errorData: APIError = await response.json();
      throw new Error(getErrorMessage(errorData, `HTTP error! status: ${response.status}`));
    }

    const result: QuestionResponse | APIError = await response.json();

    if ('error' in result) {
      throw new Error(result.error);
    }

    return result as QuestionResponse;
  } catch (error) {
    console.error('Error asking question:', error);

    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to get answer');
    } else {
      throw new Error('Failed to get answer');
    }
  }
};

// Health check for the API
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};
