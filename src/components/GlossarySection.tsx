import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

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
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search terms..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Terms Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTerms.map((term, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {term.term}
              </h3>
              <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                {term.category}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{term.definition}</p>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No matching terms found</p>
        </div>
      )}
    </div>
  );
}
