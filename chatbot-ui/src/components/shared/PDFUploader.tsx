// src/components/PDFUploader.tsx

import React, { useState, useRef } from 'react';
import {
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { uploadPdf } from '../../services/api';
import type { PDFUploaderProps, UploadStatus } from '../../types';

const PDFUploader: React.FC<PDFUploaderProps> = ({
  onUploadSuccess,
  compact = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file || file.type !== 'application/pdf') {
      setUploadStatus({
        type: 'error',
        message: 'Please select a PDF file',
      });
      return;
    }

    setIsUploading(true);

    try {
      const result = await uploadPdf(file);

      setUploadStatus({
        type: 'success',
        message: 'Uploaded successfully',
      });

      onUploadSuccess(result.filename);

      setTimeout(() => {
        setUploadStatus(null);
      }, 3000);
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : 'Upload failed';

      setUploadStatus({
        type: 'error',
        message: errMsg,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>

      <h2 className="mb-4 text-sm font-semibold text-white">
        Upload PDF
      </h2>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`rounded-2xl bg-[#071a2d] p-6 border transition
        ${
          dragActive
            ? 'border-blue-500'
            : 'border-[#10253d]'
        }`}
      >
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
        />

        {isUploading ? (
          <div className="flex flex-col items-center py-8">

            <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />

            <p className="text-slate-300 text-sm">
              Uploading...
            </p>

          </div>
        ) : (
          <div className="flex flex-col items-center py-6">

            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#032e72]">
              <Upload className="h-6 w-6 text-blue-500" />
            </div>

            <p className="text-center text-slate-300 text-sm leading-6">
              Drop PDF here or click to browse
            </p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-6 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-500"
            >
              Browse
            </button>

          </div>
        )}
      </div>

      {uploadStatus && (
        <div
          className={`mt-4 flex items-center gap-2 rounded-xl p-3 text-sm
          ${
            uploadStatus.type === 'success'
              ? 'bg-green-900/40 text-green-300'
              : 'bg-red-900/40 text-red-300'
          }`}
        >
          {uploadStatus.type === 'success' ? (
            <CheckCircle size={18} />
          ) : (
            <AlertCircle size={18} />
          )}

          {uploadStatus.message}
        </div>
      )}
    </div>
  );
};

export default PDFUploader;