import React, { useState } from "react";

interface EventCardProps {
  eventtitle: string | null;
  value: number;
  onAlert: () => void;
  onTrade: () => void;
}

export function EventCard({
  eventtitle,
  value,
  onAlert,
  onTrade,
}: EventCardProps) {
  const [showActions, setShowActions] = useState(true);
  const isPositive = value >= 0;
  const colorClass = isPositive ? "text-green-600" : "text-red-600";

  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          {eventtitle}
        </span>
        <span className={`text-2xl font-bold ${colorClass}`}>{value}%</span>
      </div>

      {!showActions ? (
        <button
          onClick={() => setShowActions(true)}
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-between"
        >
          <span>View Actions</span>
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={onAlert}
            className="flex-1 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Alert Me
          </button>
          <button
            onClick={onTrade}
            className="flex-1 p-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            Place Trade
          </button>
        </div>
      )}
    </div>
  );
}
