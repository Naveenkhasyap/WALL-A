import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface AiChatProps {
  onSendMessage: (message: string) => void;
  messages: Array<{ text: string; isUser: boolean }>;
}

export function AiChat({ onSendMessage, messages }: AiChatProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden max-h-[200px]">
      <div className="flex-1 p-2 space-y-2 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                msg.isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 border-t border-gray-200 dark:border-gray-700">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}