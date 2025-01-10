/**
 * @fileoverview FAQ section component with search functionality
 */

import { useState, useMemo, useCallback } from "react";
import styles from "../styles/faq.module.css";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useUserPreferences } from "../contexts/UserPreferencesContext";
import { faqs, categories } from "../data/faqs";

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { preferences } = useUserPreferences();

  const toggleFAQ = useCallback((index: number) => {
    setExpandedFAQs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  const copyToClipboard = useCallback(async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  }, []);

  const categoryCount = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.id] = faqs.filter(
        (faq) => faq.category === category.id
      ).length;
      return acc;
    }, {} as Record<string, number>);
  }, []);

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
          <div className="relative flex-1 group">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${styles.searchInput} w-full px-4 py-2 pl-10 pr-10 text-sm transition-colors bg-surface border-base rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 text-base`}
            />
            <MagnifyingGlassIcon className="absolute w-5 h-5 text-muted transition-colors group-focus-within:text-primary-500 left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-muted hover:text-base"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  styles.categoryBadge
                } px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 ring-2 ring-primary-200 dark:ring-primary-800"
                    : "text-muted hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                {category.name}
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800">
                  {categoryCount[category.id]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ list */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <p className="text-muted">No FAQs found matching your search.</p>
        ) : (
          filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className={`${
                styles.faqItem
              } border-base rounded-lg overflow-hidden transition-shadow hover:shadow-md bg-surface ${
                preferences.printMode ? "print-page-break" : ""
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full p-4 text-left"
              >
                <div className="flex items-start flex-1 space-x-3">
                  <h3 className="text-base text-lg font-semibold">
                    {faq.question}
                  </h3>
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-muted">
                    {categories.find((c) => c.id === faq.category)?.name}
                  </span>
                </div>
                <ChevronDownIcon
                  className={`w-5 h-5 text-muted transition-transform ${
                    expandedFAQs.includes(index) ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {expandedFAQs.includes(index) && (
                <div className={`${styles.faqContent} p-4 pt-0`}>
                  <div className="pt-4 border-t border-base">
                    <p className="text-muted">{faq.answer}</p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `Q: ${faq.question}\nA: ${faq.answer}`,
                            index
                          )
                        }
                        className={`${styles.copyButton} flex items-center space-x-1 text-sm text-muted hover:text-base`}
                      >
                        {copiedIndex === index ? (
                          <>
                            <CheckIcon className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <ClipboardDocumentIcon className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
