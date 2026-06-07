// src/components/PDFSelector.tsx
import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import type { PDFSelectorProps } from '../../types';

const PDFSelector: React.FC<PDFSelectorProps> = ({ pdfs, selectedPdf, onPdfSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Select PDF</h2>
      
      {pdfs.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No PDFs uploaded yet</p>
          <p className="text-sm text-gray-400 mt-1">Upload a PDF to start chatting</p>
        </div>
      ) : (
        <div className="space-y-2">
          {pdfs.map((pdf) => (
            <button
              key={pdf}
              onClick={() => onPdfSelect(pdf)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                selectedPdf === pdf
                  ? 'bg-blue-50 border-2 border-blue-200 text-blue-900'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent text-gray-700 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FileText className={`h-5 w-5 ${
                  selectedPdf === pdf ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <span className="font-medium truncate">{pdf}</span>
              </div>
              <ChevronRight className={`h-4 w-4 ${
                selectedPdf === pdf ? 'text-blue-600' : 'text-gray-400'
              }`} />
            </button>
          ))}
        </div>
      )}
      
      {selectedPdf && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Active PDF:</span> {selectedPdf}
          </p>
        </div>
      )}
    </div>
  );
};

export default PDFSelector;
