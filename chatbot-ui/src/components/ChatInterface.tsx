// src/components/ChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageCircle, Bot, User } from 'lucide-react';
import { askQuestion } from '../services/api';
import  type { Message, ChatInterfaceProps, LLMProvider } from '../types';

const ChatInterface: React.FC<ChatInterfaceProps> = ({ selectedPdf, messages, setMessages }) => {
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<LLMProvider>('ollama');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAskQuestion = async (): Promise<void> => {
    if (!currentQuestion.trim() || !selectedPdf || isLoading) return;

    const userMessage: Message = { 
      type: 'user', 
      content: currentQuestion, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentQuestion('');
    setIsLoading(true);

    try {
      const result = await askQuestion(currentQuestion, selectedPdf, selectedProvider);
      
      const botMessage: Message = {
        type: 'bot',
        content: result.pages?.length
          ? `${result.answer}\n\nSource page${result.pages.length > 1 ? 's' : ''}: ${result.pages.join(', ')}`
          : result.answer,
        timestamp: new Date(),
        source: result.source,
        pdf: result.pdf
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorText = error instanceof Error
        ? error.message
        : 'Sorry, I encountered an error while processing your question. Please try again.';
      const errorMessage: Message = {
        type: 'bot',
        content: errorText,
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Chat</h2>
          {selectedPdf && (
            <span className="text-sm text-gray-500">• {selectedPdf}</span>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!selectedPdf ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Select a PDF to start chatting</p>
              <p className="text-gray-400 text-sm">
                Upload a PDF and select it from the sidebar to begin asking questions
              </p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Bot className="h-16 w-16 text-blue-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Ready to answer your questions!</p>
              <p className="text-gray-400 text-sm">
                Ask me anything about the content in {selectedPdf}
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`p-2 rounded-full ${
                  message.type === 'user' 
                    ? 'bg-blue-600' 
                    : message.isError 
                      ? 'bg-red-500' 
                      : 'bg-gray-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                
                <div className={`p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.isError
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.source && (
                    <p className="text-xs mt-2 opacity-75">
                      Source: {message.source}
                    </p>
                  )}
                  <p className="text-xs mt-1 opacity-75">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="p-2 rounded-full bg-gray-500">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value as LLMProvider)}
            disabled={isLoading}
            className="border border-gray-300 rounded-lg px-2 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            aria-label="Choose answer model"
          >
            <option value="ollama">Ollama</option>
            <option value="groq">Groq</option>
          </select>
          <textarea
            ref={inputRef}
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              selectedPdf 
                ? "Ask a question about the PDF..." 
                : "Select a PDF first..."
            }
            disabled={!selectedPdf || isLoading}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
            rows={2}
          />
          <button
            onClick={handleAskQuestion}
            disabled={!currentQuestion.trim() || !selectedPdf || isLoading}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
