import React, { useEffect, useRef, useState } from 'react';
import {
  Bot,
  Loader2,
  MessageCircle,
  Send,
  User,
  ChevronDown
} from 'lucide-react';

import { askQuestion } from '../services/api';
import type {
  ChatInterfaceProps,
  LLMProvider,
  Message
} from '../types';

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedPdf,
  pdfs,
  onPdfSelect,
  messages,
  setMessages,
  isAuthenticated,
  uploadedCount = 0
}) => {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] =
    useState<LLMProvider>('ollama');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages, isLoading]);

  const handleAskQuestion = async () => {
    if (!currentQuestion.trim() || !selectedPdf || isLoading) return;

    const question = currentQuestion;

    const userMessage: Message = {
      type: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentQuestion('');
    setIsLoading(true);

    try {
      const result = await askQuestion(
        question,
        selectedPdf,
        selectedProvider
      );

      const botMessage: Message = {
        type: 'bot',
        content: result.answer,
        timestamp: new Date(),
        source: result.source
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content: 'Failed to generate response.',
          timestamp: new Date(),
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-[28px] bg-[#f8fafc]">

      {/* Top */}

      <div className="flex items-center justify-between px-5 py-5">

        <div className="relative">

          <select
            value={selectedPdf}
            onChange={(e) => onPdfSelect(e.target.value)}
            className="h-12 rounded-xl border border-slate-200 bg-white px-5 pr-10 text-sm shadow-sm outline-none"
          >
            <option value="">
              Choose PDF
            </option>

            {pdfs.map((pdf) => (
              <option key={pdf}>{pdf}</option>
            ))}
          </select>

          <ChevronDown
            className="absolute right-3 top-4 text-slate-500"
            size={16}
          />
        </div>

        {isAuthenticated && (
          <div className="rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-blue-600">
            Uploaded PDFs: {uploadedCount}
          </div>
        )}
      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto">

        {messages.length === 0 && !isLoading ? (
          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-white">
                <MessageCircle
                  size={38}
                  className="text-slate-400"
                />
              </div>

              <h1 className="text-3xl font-semibold text-slate-700">
                Select a PDF to start chatting
              </h1>

              <p className="mt-4 text-slate-500">
                Upload a PDF and choose it from the dropdown to begin asking questions
              </p>
            </div>

          </div>
        ) : (
          <div className="mx-auto max-w-4xl space-y-6 px-6 pb-8">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >

                <div
                  className={`max-w-[70%] rounded-3xl px-6 py-4 shadow-sm ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white'
                  }`}
                >
                  {message.content}

                  <div className="mt-3 text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex">

                <div className="rounded-3xl bg-white px-6 py-4 shadow-sm">

                  <div className="flex items-center gap-3">
                    <Loader2 className="animate-spin" size={18} />
                    Thinking...
                  </div>

                </div>

              </div>
            )}

            <div ref={messagesEndRef} />

          </div>
        )}
      </div>

      {/* Bottom */}

      <div className="px-5 pb-5">

        <div className="flex items-center gap-3 rounded-3xl bg-white p-3 shadow-sm">

          <select
            value={selectedProvider}
            onChange={(e) =>
              setSelectedProvider(
                e.target.value as LLMProvider
              )
            }
            className="h-12 rounded-xl border border-slate-200 px-4"
          >
            <option value="ollama">Ollama</option>
            <option value="groq">Groq</option>
          </select>

          <input
            value={currentQuestion}
            onChange={(e) =>
              setCurrentQuestion(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === 'Enter' && handleAskQuestion()
            }
            placeholder={
              selectedPdf
                ? 'Ask a question...'
                : 'Select a PDF first...'
            }
            className="h-12 flex-1 bg-transparent px-4 outline-none"
          />

          <button
            disabled={!selectedPdf}
            onClick={handleAskQuestion}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white hover:bg-blue-500"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;