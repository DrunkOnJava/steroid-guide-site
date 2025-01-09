/**
 * @fileoverview Reusable search input component with icon and styling
 * @project     Steroid Guide Site (v0.0.0)
 * @module      SearchBar
 *
 * @author      Steroid Guide Team <team@steroidguide.com>
 * @contributors
 * @maintainer  Steroid Guide Team <team@steroidguide.com>
 *
 * @created     2024-03-19
 * @modified    2024-03-19
 * @version     1.0.0
 *
 * @license     MIT - see LICENSE.md file in root directory
 * @copyright   Copyright (c) 2024 Steroid Guide
 *
 * @description
 * A controlled search input component with consistent styling and visual feedback.
 * Features a search icon, customizable placeholder text, and focus states.
 *
 * Component Features:
 * - Search icon integration
 * - Controlled input handling
 * - Focus and hover states
 * - Customizable placeholder
 *
 * Visual Elements:
 * - Icon placement and styling
 * - Input field styling
 * - Focus ring animation
 * - Border transitions
 *
 * Accessibility:
 * - Proper input labeling
 * - Visual focus indicators
 * - Icon for visual context
 * - Sufficient color contrast
 *
 * @example
 * ```tsx
 * import SearchBar from './SearchBar';
 *
 * function SearchPage() {
 *   const [searchQuery, setSearchQuery] = useState('');
 *
 *   return (
 *     <SearchBar
 *       value={searchQuery}
 *       onChange={setSearchQuery}
 *       placeholder="Search compounds..."
 *     />
 *   );
 * }
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - @heroicons/react@2.2.0
 *
 * @requirements
 * - Tailwind CSS for styling
 * - Parent container with appropriate width
 * - Proper color contrast ratios
 */

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="relative max-w-xl">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <MagnifyingGlassIcon className="w-5 h-5 text-blue-500" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="block w-full py-3 pr-4 text-gray-900 placeholder-gray-500 transition-all duration-200 bg-white border-2 border-gray-200 dark:text-gray-100 dark:placeholder-gray-400 dark:bg-gray-950 dark:border-gray-800 pl-11 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
