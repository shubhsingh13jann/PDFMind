import { MessageSquareText, MoreVertical, Plus } from "lucide-react";
import PDFUploader from "../shared/PDFUploader";

interface SidebarProps {
  activeSession: string;
  setActiveSession: (session: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  handlePdfUploaded: (filename: string) => void;
}

const sessionTitles = [
  "Project kickoff — Today",
  "Budget review — Yesterday",
  "Research notes — Dec 12",
  "Client proposal — Dec 9",
  "Quarterly summary — Dec 8",
  "Legal review — Dec 7",
  "Onboarding FAQ — Dec 6",
  "Invoice archive — Dec 5",
];

function Sidebar({
  activeSession,
  setActiveSession,
  setMessages,
  handlePdfUploaded,
}: SidebarProps) {
  return (
    <aside className="m-3 flex w-[320px] flex-col rounded-[30px] bg-gradient-to-b from-[#021223] via-[#04192f] to-[#08284a] text-white">

      {/* Logo */}

      <div className="px-6 pt-8 pb-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <MessageSquareText className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
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

      {/* New Chat */}

      <div className="px-4 pt-5">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-semibold"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Sessions */}

      <div className="mt-6 flex-1 overflow-y-auto px-4">

        <h2 className="mb-4 text-xs tracking-[0.35em] text-slate-400">
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
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-4 transition ${
                activeSession === session
                  ? "bg-[#0d1f35] ring-1 ring-blue-500/40"
                  : "hover:bg-[#0d1f35]"
              }`}
            >
              <MessageSquareText className="h-4 w-4 text-blue-400" />

              <span className="flex-1 truncate text-left text-sm">
                {session}
              </span>

              <MoreVertical className="h-4 w-4 text-slate-500" />
            </button>
          ))}
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;