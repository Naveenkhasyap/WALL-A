import React from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onMenuClick}
        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg"
      >
        <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span className="font-semibold text-gray-800 dark:text-white">
          Wall-A
        </span>
      </button>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </header>
  );
}
