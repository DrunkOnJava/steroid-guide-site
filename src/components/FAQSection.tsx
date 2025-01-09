/**
 * @fileoverview FAQ section component with search functionality
 */

import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useUserPreferences } from "../contexts/UserPreferencesContext";
import { faqs, categories } from "../data/faqs";

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { preferences } = useUserPreferences();

  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || faq.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {/* Search and filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 text-sm border border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
            <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ list */}
      <div className="space-y-6">
        {filteredFAQs.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No FAQs found matching your search.
          </p>
        ) : (
          filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className={`space-y-2 ${
                preferences.printMode ? "print-page-break" : ""
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
