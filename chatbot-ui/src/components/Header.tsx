// src/components/Header.tsx
import React from 'react';
import { ChevronDown, MessageSquareText } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onSignUp: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogin, onSignUp, onLogout }) => {
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

        {isAuthenticated ? (
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold">
              JD
            </span>
            <ChevronDown className="h-4 w-4 text-slate-300" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={onLogin}
              className="rounded-full border border-white/40 px-5 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              Login
            </button>
            <button
              onClick={onSignUp}
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
