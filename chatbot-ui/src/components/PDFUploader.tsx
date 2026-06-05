// src/components/PDFUploader.tsx
import React, { useState, useRef } from 'react';
import { Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadPdf } from '../services/api';
import type { PDFUploaderProps, UploadStatus } from '../types';

const PDFUploader: React.FC<PDFUploaderProps> = ({ onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File): Promise<void> => {
    if (!file || file.type !== 'application/pdf') {
      setUploadStatus({ type: 'error', message: 'Please select a valid PDF file' });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const result = await uploadPdf(file);
      setUploadStatus({ 
        type: 'success', 
        message: `Successfully uploaded ${result.filename}` 
      });
      onUploadSuccess();
      
      // Clear status after 3 seconds
      setTimeout(() => setUploadStatus(null), 3000);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Upload failed';
      setUploadStatus({ 
        type: 'error', 
        message: errMsg 
      });
        } finally {
          setIsUploading(false);
        }
      };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload PDF</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Uploading and processing...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop your PDF here, or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                browse
              </button>
            </p>
            <p className="text-sm text-gray-500">PDF files only</p>
          </div>
        )}
      </div>

      {uploadStatus && (
        <div className={`mt-4 p-3 rounded-md flex items-center ${
          uploadStatus.type === 'success' 
            ? 'bg-green-50 text-green-800' 
            : 'bg-red-50 text-red-800'
        }`}>
          {uploadStatus.type === 'success' ? (
            <CheckCircle className="h-5 w-5 mr-2" />
          ) : (
            <AlertCircle className="h-5 w-5 mr-2" />
          )}
          <span className="text-sm">{uploadStatus.message}</span>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;