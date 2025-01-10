/**
 * @fileoverview Search component for filtering glossary terms
 */

import React, { useState, useCallback } from "react";

interface Props {
  onSearch: (searchTerm: string) => void;
  className?: string;
}

export const GlossarySearch: React.FC<Props> = ({
  onSearch,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
      onSearch(value);
    },
    [onSearch]
  );

  return (
    <div className={`mb-8 ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search terms..."
          className="w-full px-4 py-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          aria-label="Search glossary terms"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GlossarySearch;
