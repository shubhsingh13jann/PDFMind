import { useEffect, useMemo, useState, type JSX } from 'react';
import {
  MessageSquareText,
  MoreVertical,
  Plus,
  ChevronDown,
} from 'lucide-react';

import PDFUploader from './components/PDFUploader';
import ChatInterface from './components/ChatInterface';
import { fetchPdfs } from './services/api';
import type { Message } from './types';

const sessionTitles = [
  'Project kickoff — Today',
  'Budget review — Yesterday',
  'Research notes — Dec 12',
  'Client proposal — Dec 9',
  'Quarterly summary — Dec 8',
  'Legal review — Dec 7',
  'Onboarding FAQ — Dec 6',
  'Invoice archive — Dec 5',
];

function App(): JSX.Element {
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [guestPdf, setGuestPdf] = useState('');
  const [activeSession, setActiveSession] = useState(sessionTitles[0]);

  useEffect(() => {
    loadPdfs();
  }, []);

  const visiblePdfs = useMemo(() => {
    if (isAuthenticated) return pdfs;
    return guestPdf ? [guestPdf] : [];
  }, [guestPdf, isAuthenticated, pdfs]);

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
    
    if (!isAuthenticated) {
      setGuestPdf(filename);
    }
  };
  
  const handlePdfSelect = (pdfName: string) => {
    setSelectedPdf(pdfName);
    setMessages([]);
  };
  
    const handleLogin = (): void => {
    setIsAuthenticated(true);
  
      if (!selectedPdf && pdfs.length > 0) {
        setSelectedPdf(pdfs[0]);
      }
    };
  
    const handleLogout = (): void => {
      setIsAuthenticated(false);
      setSelectedPdf(guestPdf);
      setMessages([]);
    };
  
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 p-2">
      <div className="mx-auto flex h-full w-full overflow-hidden rounded-[30px] bg-[#f6f8fb] shadow-xl"> 

        {/* SIDEBAR */}

        <aside className="w-[290px] bg-[#021223] text-white flex flex-col">

          {/* Logo */}

          <div className="px-6 pt-8 pb-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <MessageSquareText className="h-6 w-6" />
              </div>

              <div>
                <h1 className="font-bold text-2xl">
                  PDF Chatbot
                </h1>

                <p className="text-sm text-slate-400">
                  Upload PDFs and ask questions
                </p>
              </div>
            </div>
          </div>

          {/* Upload */}

          <div className="px-4">
            <PDFUploader
              compact
              variant="dark"
              onUploadSuccess={handlePdfUploaded}
            />
          </div>

          {/* Sessions */}

          <div className="px-4 mt-6 flex-1 overflow-y-auto">

            <h2 className="mb-4 text-xs tracking-[0.3em] text-slate-400">
              SESSIONS
            </h2>

            <div className="space-y-2">

              {sessionTitles.map((session) => (
                <button
                  key={session}
                  onClick={() => {
                    setActiveSession(session);
                    setMessages([]);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-4 transition
                  ${
                    activeSession === session
                      ? 'bg-[#0d1d31] border border-blue-500'
                      : 'hover:bg-[#0d1d31]'
                  }`}
                >
                  <MessageSquareText
                    size={16}
                    className="text-blue-500"
                  />

                  <span className="flex-1 truncate text-left text-sm font-medium">
                    {session}
                  </span>

                  <MoreVertical size={16} className="text-slate-400" />
                </button>
              ))}
            </div>
          </div>

          {/* New Chat */}

          <div className="p-4">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-semibold hover:bg-blue-500"
            >
              <Plus size={18} />
              New Chat
            </button>
          </div>
        </aside>

        {/* RIGHT */}

        <main className="flex flex-1 flex-col">

          {/* Top bar */}

          <div className="flex items-center justify-between px-8 py-7">

            <div />

            <button
              onClick={handleLogout}
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                JD
              </div>

              <ChevronDown size={18} />
            </button>

          </div>

          {/* Chat */}

          <div className="flex-1 px-6 pb-6 overflow-hidden">
            <ChatInterface
              selectedPdf={selectedPdf}
              pdfs={visiblePdfs}
              onPdfSelect={handlePdfSelect}
              messages={messages}
              setMessages={setMessages}
              isAuthenticated={isAuthenticated}
              uploadedCount={pdfs.length}
            />
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;