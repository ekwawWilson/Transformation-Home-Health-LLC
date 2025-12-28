"use client";

import { X } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export default function Alert({ type, message, onClose }: AlertProps) {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className={`${styles[type]} border rounded-lg p-4 flex items-center justify-between mb-4`}>
      <p className="flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 hover:opacity-70 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
