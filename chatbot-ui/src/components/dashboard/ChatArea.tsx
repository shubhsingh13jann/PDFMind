import { useState } from "react";
import { MessageCircle } from "lucide-react";

import PdfSelector from "./PdfSelector";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

import { askQuestion } from "../../services/api";
import type {
  Message,
  LLMProvider,
} from "../../types";

interface Props {
  selectedPdf: string;
  pdfs: string[];
  onPdfSelect: (pdf: string) => void;
  messages: Message[];
  setMessages: React.Dispatch<
    React.SetStateAction<Message[]>
  >;
  uploadedCount?: number;
}

function ChatArea({
  selectedPdf,
  pdfs,
  onPdfSelect,
  messages,
  setMessages,
  uploadedCount = 0,
}: Props) {

  const [currentQuestion, setCurrentQuestion] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [selectedProvider, setSelectedProvider] =
    useState<LLMProvider>("ollama");

  const handleAskQuestion = async () => {

    if (
      !currentQuestion.trim() ||
      !selectedPdf ||
      isLoading
    )
      return;

    const question = currentQuestion.trim();

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: question,
        timestamp: new Date(),
      },
    ]);

    setCurrentQuestion("");

    setIsLoading(true);

    try {

      const result = await askQuestion(
        question,
        selectedPdf,
        selectedProvider
      );

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: result.answer,
          timestamp: new Date(),
          source: result.source,
        },
      ]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "Sorry, unable to answer.",
          timestamp: new Date(),
          isError: true,
        },
      ]);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">

      {/* Top */}

      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

        <PdfSelector
          selectedPdf={selectedPdf}
          pdfs={pdfs}
          onPdfSelect={onPdfSelect}
        />

        <div className="rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-blue-600">
          Uploaded PDFs: {uploadedCount}
        </div>

      </div>

      {/* Center */}

      <div className="flex-1 overflow-y-auto">

        {messages.length === 0 ? (

          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">

                <MessageCircle
                  className="h-10 w-10 text-blue-500"
                />

              </div>

              <h1 className="text-3xl font-semibold text-slate-700">
                Select a PDF to start chatting
              </h1>

              <p className="mt-4 text-slate-500">
                Upload a PDF and begin asking questions.
              </p>

            </div>

          </div>

        ) : (

          <ChatMessages
            messages={messages}
            isLoading={isLoading}
          />

        )}

      </div>

      {/* Bottom */}

      <ChatInput
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
        selectedPdf={selectedPdf}
        isLoading={isLoading}
        handleAskQuestion={handleAskQuestion}
      />

    </div>
  );
}

export default ChatArea;