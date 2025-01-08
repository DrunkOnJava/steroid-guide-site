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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
          Pharmacological Profiles
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
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
