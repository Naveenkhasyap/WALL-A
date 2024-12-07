import React from 'react';
import { X } from 'lucide-react';

interface MenuDropdownProps {
  isOpen: boolean;
  currentView: string | null;
  onClose: () => void;
  onSelectOption: (option: string) => void;
}

export function MenuDropdown({ isOpen, currentView, onClose, onSelectOption }: MenuDropdownProps) {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (currentView) {
      case 'about':
        return <div className="p-4">This is an about page</div>;
      case 'version':
        return <div className="p-4">This is version page</div>;
      case 'account':
        return (
          <div className="p-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Wallet Address</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 break-all">
                0x742d35Cc6634C0532925a3b844Bc454e4438f44e
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="py-2">
            {['About', 'Version', 'Account', 'Expand View'].map((option) => (
              <button
                key={option}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  if (option === 'Expand View') {
                    window.open('https://polymarket.com', '_blank');
                  } else {
                    onSelectOption(option.toLowerCase());
                  }
                }}
              >
                {option}
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="absolute top-14 left-4 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium">Menu</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {renderContent()}
    </div>
  );
}