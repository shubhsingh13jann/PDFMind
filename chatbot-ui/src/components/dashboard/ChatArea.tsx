import { useState } from "react";
import TopBar from "./TopBar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

import { askQuestion } from "../../services/api";
import type {
  Message,
  LLMProvider,
} from "../../types";

interface Props {
  selectedPdf: string;
  messages: Message[];
  setMessages: React.Dispatch<
    React.SetStateAction<Message[]>
  >;
}

function ChatArea({
  selectedPdf,
  messages,
  setMessages,
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
    <main className="flex h-full min-w-0 flex-1 flex-col bg-gradient-to-br from-white via-[#F8F9FF] to-[#F4F1FF]">
      <TopBar onClearChat={() => setMessages([])} />

      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full min-h-[420px] items-center justify-center px-8 py-7">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100">
                <span className="text-2xl text-indigo-500">✦</span>
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Start a conversation</h2>
              <p className="mt-1 text-sm text-slate-500">Ask a question about your selected PDF.</p>
            </div>
          </div>
        ) : (
          <ChatMessages messages={messages} isLoading={isLoading} />
        )}
      </div>

      <ChatInput
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        selectedProvider={selectedProvider}
        setSelectedProvider={setSelectedProvider}
        selectedPdf={selectedPdf}
        isLoading={isLoading}
        handleAskQuestion={handleAskQuestion}
      />
    </main>
  );
}

export default ChatArea;