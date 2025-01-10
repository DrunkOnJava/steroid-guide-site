/**
 * @fileoverview Interactive glossary component with search and filtering capabilities
 * @project     Steroid Guide Site (v0.0.0)
 * @module      GlossarySection
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
 * A comprehensive glossary component that provides an interactive interface for exploring terms.
 *
 * Features:
 * - Real-time search functionality across terms and definitions
 * - Category-based filtering with dynamic category list
 * - Responsive grid layout for term cards
 * - Visual feedback with hover effects and transitions
 * - Empty state handling for no search results
 *
 * State Management:
 * - Uses useState for search query and category filter
 * - Implements useMemo for optimized filtering and category list generation
 * - Maintains responsive layout across device sizes
 *
 * User Interface:
 * - Search bar with icon
 * - Category dropdown with auto-populated options
 * - Card-based term display with category tags
 * - Accessible form controls
 * - Loading and empty states
 *
 * @example
 * ```tsx
 * import GlossarySection from './GlossarySection';
 *
 * const terms = [
 *   {
 *     term: "PCT",
 *     definition: "Post Cycle Therapy - Protocol followed after a cycle to restore natural hormone production",
 *     category: "protocols"
 *   },
 *   {
 *     term: "AI",
 *     definition: "Aromatase Inhibitor - Medication that blocks the conversion of androgens to estrogen",
 *     category: "medications"
 *   }
 * ];
 *
 * function GlossaryPage() {
 *   return (
 *     <div className="container px-4 mx-auto">
 *       <h1>Steroid Guide Glossary</h1>
 *       <GlossarySection terms={terms} />
 *     </div>
 *   );
 * }
 * ```
 *
 * @dependencies
 * - react@18.3.1 (useState, useMemo)
 * - @heroicons/react@2.2.0
 *
 * @requirements
 * - Tailwind CSS for styling
 * - Modern browser with CSS Grid and Flexbox
 * - TypeScript for type safety
 * - Parent container with appropriate padding
 * - Terms array with proper type structure
 */

import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CategorySection } from "./ui/CategorySection";
import type { Term } from "./ui/CategorySection";

type GlossaryTerm = Term & {
  category: string;
};

interface GlossarySectionProps {
  terms: GlossaryTerm[];
}

export default function GlossarySection({ terms }: GlossarySectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const cats = ["all", ...new Set(terms.map((term) => term.category))];
    return cats.sort();
  }, [terms]);

  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      const matchesSearch =
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [terms, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search terms..."
            className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Terms by Category */}
      <div className="space-y-12">
        {categories
          .filter((category) => category !== "all")
          .map((category) => {
            const categoryTerms = filteredTerms.filter(
              (term) => term.category === category
            );
            if (categoryTerms.length === 0) return null;

            return (
              <CategorySection
                key={category}
                category={category}
                terms={categoryTerms}
              />
            );
          })}
      </div>

      {/* No Results Message */}
      {filteredTerms.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No matching terms found
          </p>
        </div>
      )}
    </div>
  );
}
