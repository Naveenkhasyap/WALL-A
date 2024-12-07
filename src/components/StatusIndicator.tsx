import React from 'react';
import { CheckCircle } from 'lucide-react';

export function StatusIndicator() {
  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white dark:bg-gray-900 px-2 py-1 rounded-full shadow-sm">
      <CheckCircle className="w-4 h-4 text-green-500" />
      <span className="text-sm text-gray-600 dark:text-gray-400">Connected</span>
    </div>
  );
}