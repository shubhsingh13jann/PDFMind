import { FileText, Trash2 } from "lucide-react";

interface Props {
  onClearChat: () => void;
}

function TopBar({
  onClearChat,
}: Props) {
  return (
    <header className="flex h-[88px] items-center justify-between border-b border-slate-200/80 bg-white/75 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-200">
          <FileText size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Chat with your PDF</h1>
          <p className="mt-0.5 text-sm text-slate-500">Ask anything about your document</p>
        </div>
      </div>
      <button
        onClick={onClearChat}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
      >
        <Trash2 size={16} />
        Clear Chat
      </button>
    </header>
  );
}

export default TopBar;