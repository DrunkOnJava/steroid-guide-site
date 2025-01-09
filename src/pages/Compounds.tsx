/**
 * @fileoverview Compound information and details page
 * @project     Steroid Guide Site (v0.0.0)
 * @module      Compounds
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
 * Main page for displaying and interacting with compound information.
 * Features a searchable grid of compound cards, detailed modal views,
 * storage guidelines, and related content navigation.
 *
 * Page Features:
 * - Compound card grid with filtering
 * - Detailed compound information modals
 * - Search functionality
 * - Storage and handling guidelines
 * - Related content navigation
 *
 * User Interactions:
 * - Search compounds by name
 * - View detailed compound information
 * - Access related sections
 * - Review safety guidelines
 *
 * Content Organization:
 * - Header with search
 * - Compound grid layout
 * - Modal for detailed views
 * - Supporting information sections
 *
 * @example
 * ```tsx
 * import Compounds from './pages/Compounds';
 *
 * function App() {
 *   return (
 *     <Router>
 *       <Route path="/compounds" element={<Compounds />} />
 *     </Router>
 *   );
 * }
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - @heroicons/react@2.2.0
 * - react-router-dom@7.1.1
 *
 * @requirements
 * - Tailwind CSS for styling
 * - Compound data source
 * - Modal support
 * - Modern browser features
 */

import { useState } from "react";
import {
  BeakerIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import CompoundCard from "../components/CompoundCard";
import CompoundModal from "../components/CompoundModal";
import SearchBar from "../components/SearchBar";
import StorageGuidelines from "../components/StorageGuidelines";
import RelatedLinks from "../components/RelatedLinks";
import { compounds } from "../data/compounds";
import type { CompoundDetails } from "../types/compounds";

export default function Compounds() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompound, setSelectedCompound] =
    useState<CompoundDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCompoundSelect = (compound: CompoundDetails) => {
    setSelectedCompound(compound);
    setIsModalOpen(true);
  };

  const filteredCompounds = compounds.filter((compound) =>
    compound.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-extrabold text-transparent text-gray-900 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
          Pharmacological Profiles
        </h1>
        <p className="max-w-3xl mb-8 text-xl leading-relaxed text-gray-600">
          Detailed information about each compound, including benefits,
          considerations, and usage guidelines.
        </p>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search compounds..."
        />
      </div>

      {/* Compounds Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompounds.map((compound, index) => (
          <CompoundCard
            key={index}
            compound={compound}
            onSelect={handleCompoundSelect}
          />
        ))}
      </div>

      <CompoundModal
        compound={selectedCompound}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <StorageGuidelines />

      <RelatedLinks
        links={[
          {
            title: "Cycle Overview",
            description: "Learn about cycle planning, duration, and protocols",
            path: "/cycle-overview",
            icon: <BeakerIcon className="w-6 h-6" />,
          },
          {
            title: "Safety Considerations",
            description: "Important safety guidelines and precautions",
            path: "/safety",
            icon: <ShieldCheckIcon className="w-6 h-6" />,
          },
          {
            title: "Training & Nutrition",
            description: "Optimize your results with proper training and diet",
            path: "/training-nutrition",
            icon: <UserGroupIcon className="w-6 h-6" />,
          },
          {
            title: "Glossary",
            description: "Definitions of common terms and concepts",
            path: "/glossary",
            icon: <BookOpenIcon className="w-6 h-6" />,
          },
        ]}
      />
    </div>
  );
}
