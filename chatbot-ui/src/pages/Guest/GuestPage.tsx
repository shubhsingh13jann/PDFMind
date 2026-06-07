import { useState } from 'react';
import Header from '../../components/shared/Header';
import PDFUploader from '../../components/shared/PDFUploader';
import ChatArea from "../../components/dashboard/ChatArea";
import type { Message } from '../../types';

function GuestPage() {
  const [selectedPdf, setSelectedPdf] = useState('');
  const [guestPdf, setGuestPdf] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePdfUploaded = (filename: string) => {
    setGuestPdf(filename);
    setSelectedPdf(filename);
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-blue-50">

      <Header
        isAuthenticated={false}
        onLogin={() => {}}
        onSignUp={() => {}}
        onLogout={() => {}}
      />

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-7 lg:grid-cols-[360px_minmax(0,1fr)]">

        {/* Left */}
        <div className="space-y-6">

          <PDFUploader
            onUploadSuccess={handlePdfUploaded}
          />

          <section className="rounded-xl bg-white p-5 shadow-sm">

            <h2 className="mb-4 text-lg font-semibold">
              Guest Session
            </h2>

            {guestPdf ? (
              <div className="rounded-lg bg-blue-50 p-4">
                {guestPdf}
              </div>
            ) : (
              <div className="rounded-lg bg-slate-50 p-6 text-center">
                No PDF uploaded yet
              </div>
            )}

          </section>

        </div>

        {/* Right */}
        <div className="min-h-[650px]">

          <ChatArea
            selectedPdf={selectedPdf}
            pdfs={guestPdf ? [guestPdf] : []}
            onPdfSelect={setSelectedPdf}
            messages={messages}
            setMessages={setMessages}
          />

        </div>

      </main>

    </div>
  );
}

export default GuestPage;