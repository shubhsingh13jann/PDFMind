// src/components/Header.tsx
import React from 'react';
import { MessageSquareText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-blue-900/40 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-blue-600 shadow-sm">
            <MessageSquareText className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold">PDF Answer Assistant</h1>
            <p className="truncate text-sm text-slate-300">Upload PDFs and ask questions about their content</p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
