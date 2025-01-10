/**
 * @fileoverview Comprehensive terminology reference and definitions page
 */

import React, { useState, useCallback, useMemo } from "react";
import { glossaryData } from "../features/glossary/data";
import GlossarySection from "../features/glossary/components/GlossarySection";
import GlossarySearch from "../features/glossary/components/GlossarySearch";

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSections = useMemo(() => {
    if (!searchTerm) return glossaryData.sections;

    const searchLower = searchTerm.toLowerCase();

    return glossaryData.sections
      .map((section) => {
        const filteredTerms = Object.fromEntries(
          Object.entries(section.terms).map(([letter, terms]) => [
            letter,
            terms.filter(
              (term) =>
                term.term.toLowerCase().includes(searchLower) ||
                term.definition.toLowerCase().includes(searchLower) ||
                term.abbreviation?.toLowerCase().includes(searchLower) ||
                term.relatedTerms?.some((related) =>
                  related.toLowerCase().includes(searchLower)
                )
            ),
          ])
        );

        // Only keep letters that have matching terms
        const nonEmptyTerms = Object.fromEntries(
          Object.entries(filteredTerms).filter(([, terms]) => terms.length > 0)
        );

        return {
          ...section,
          terms: nonEmptyTerms,
        };
      })
      .filter((section) => Object.keys(section.terms).length > 0);
  }, [searchTerm]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold">
        Comprehensive Bodybuilding Glossary
      </h1>

      <GlossarySearch onSearch={handleSearch} />

      {filteredSections.length > 0 ? (
        filteredSections.map((section) => (
          <GlossarySection key={section.title} section={section} />
        ))
      ) : (
        <div className="py-12 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No terms found matching "{searchTerm}"
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="px-4 py-2 mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default Glossary;
