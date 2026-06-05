// src/App.tsx
import { useState, useEffect, type JSX } from 'react';
import Header from './components/Header';
import PDFUploader from './components/PDFUploader';
import PDFSelector from './components/PDFSelector';
import ChatInterface from './components/ChatInterface';
import { fetchPdfs } from './services/api';
import type { Message } from './types';

function App(): JSX.Element {
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    loadPdfs();
  }, []);

  const loadPdfs = async () => {
    try {
      const pdfList = await fetchPdfs();
      setPdfs(pdfList);
    } catch (error) {
      console.error('Error loading PDFs:', error);
    }
  };

  const handlePdfUploaded = () => {
    loadPdfs();
  };

  const handlePdfSelect = (pdfName: string): void => {
    setSelectedPdf(pdfName);
    setMessages([]); // Clear messages when switching PDFs
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - PDF Management */}
          <div className="lg:col-span-1 space-y-6">
            <PDFUploader onUploadSuccess={handlePdfUploaded} />
            <PDFSelector 
              pdfs={pdfs}
              selectedPdf={selectedPdf}
              onPdfSelect={handlePdfSelect}
            />
          </div>

          {/* Right Panel - Chat Interface */}
          <div className="lg:col-span-2">
            <ChatInterface 
              selectedPdf={selectedPdf}
              messages={messages}
              setMessages={setMessages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
