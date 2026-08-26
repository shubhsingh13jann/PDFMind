import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import TopBar from "../../components/dashboard/TopBar";
import ChatArea from "../../components/dashboard/ChatArea";
import { fetchPdfs } from "../../services/api";
import type { Message } from "../../types";

interface DashboardPageProps {
  handleLogout: () => void;
}

function DashboardPage({
  handleLogout,
}: DashboardPageProps) {

  const [pdfs, setPdfs] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeSession, setActiveSession] = useState(
    "Project kickoff — Today"
  );

  useEffect(() => {
    loadPdfs();
  }, []);

  const visiblePdfs = useMemo(() => pdfs, [pdfs]);

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
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-300 via-slate-100 to-slate-300 p-2">

      <div className="flex h-full w-full overflow-hidden rounded-[34px] bg-gradient-to-br from-[#f8fafc] via-[#f4f7fb] to-[#eef3f8] shadow-2xl">

        <Sidebar
          activeSession={activeSession}
          setActiveSession={setActiveSession}
          setMessages={setMessages}
          handlePdfUploaded={handlePdfUploaded}
        />

        <main className="flex flex-1 flex-col">

          <TopBar
            activeSession={activeSession}
            handleLogout={handleLogout}
          />

          <div className="flex-1 overflow-hidden px-6 pb-6">

            <div className="h-full rounded-[30px] bg-gradient-to-br from-[#fafcff] to-[#f2f5f9] shadow-lg">

              <ChatArea
                selectedPdf={selectedPdf}
                messages={messages}
                setMessages={setMessages}
              />

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default DashboardPage;