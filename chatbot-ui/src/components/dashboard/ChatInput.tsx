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
    <div className="border-t border-slate-200 bg-white p-5">

      <div className="flex items-center gap-3">

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
          className="h-12 flex-1 rounded-xl border border-slate-200 px-4 outline-none"
        />

        <button
          disabled={isLoading || !selectedPdf}
          onClick={handleAskQuestion}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white"
        >
          <Send size={18} />
        </button>

      </div>

    </div>
  );
}

export default ChatInput;