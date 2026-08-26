import React from "react";
import { Send } from "lucide-react";
import ProviderSelector from "./ProviderSelector";
import type { LLMProvider } from "../../types";

interface Props {
  currentQuestion: string;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<string>>;
  selectedProvider: LLMProvider;
  setSelectedProvider: (
    provider: LLMProvider
  ) => void;
  selectedPdf: string;
  isLoading: boolean;
  handleAskQuestion: () => Promise<void>;
}

function ChatInput({
  currentQuestion,
  setCurrentQuestion,
  selectedProvider,
  setSelectedProvider,
  selectedPdf,
  isLoading,
  handleAskQuestion,
}: Props) {

    return (
    <div className="px-8 pb-5">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-lg shadow-slate-100">

        <ProviderSelector
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
        />

        <input
          value={currentQuestion}
          onChange={(e) =>
            setCurrentQuestion(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" && handleAskQuestion()
          }
          placeholder={
            selectedPdf
              ? "Ask a question..."
              : "Select a PDF first..."
          }
          className="h-12 flex-1 bg-transparent px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />

        <button
          disabled={isLoading || !selectedPdf}
          onClick={handleAskQuestion}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#7C3AED] text-white shadow-md shadow-indigo-200 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={18} />
        </button>

        </div>
        <div className="mt-3 flex justify-center">
          <p className="text-[11px] text-slate-400">AI responses may contain inaccuracies. Please verify important information.</p>
        </div>
      </div>

    </div>
  );
}

export default ChatInput;