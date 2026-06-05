// src/components/Header.tsx
import React from 'react';
import { MessageCircle, FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">PDF Chatbot</h1>
            <p className="text-sm text-gray-600">Upload PDFs and ask questions about their content</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;