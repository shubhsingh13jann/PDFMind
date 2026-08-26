import { useEffect, useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import ChatArea from "../../components/dashboard/ChatArea";
import { fetchPdfs } from '../../services/api';
import type { Message } from '../../types';

function GuestPage() {
  const [selectedPdf, setSelectedPdf] = useState('');
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    loadPdfs();
  }, []);

  const loadPdfs = async () => {
    try {
      const pdfList = await fetchPdfs();
      setPdfs(pdfList);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePdfUploaded = (filename: string) => {
    loadPdfs();
    setSelectedPdf(filename);
    setMessages([]);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white via-[#F8F9FF] to-[#F4F1FF]">
      <Sidebar
        pdfs={pdfs}
        selectedPdf={selectedPdf}
        onSelectPdf={(pdf) => {
          setSelectedPdf(pdf);
          setMessages([]);
        }}
        onPdfUploaded={handlePdfUploaded}
      />
      <ChatArea
        selectedPdf={selectedPdf}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}

export default GuestPage;