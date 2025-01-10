/**
 * @fileoverview Interactive card component for displaying compound information
 * @project     Steroid Guide Site (v0.0.0)
 * @module      CompoundCard
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
 * A comprehensive card component for displaying compound information in an interactive format.
 * Features include:
 * - Gradient header with compound name and type
 * - Interactive hover effects with smooth transitions
 * - Quick info section displaying half-life and schedule/ratio
 * - Preview of compound benefits
 * - Responsive layout with grid system
 * - Icon integration for visual hierarchy
 * - Accessibility considerations with proper contrast
 * - Touch-friendly with cursor pointer indication
 *
 * The component uses Tailwind CSS for styling, including:
 * - Custom gradients and hover effects
 * - Responsive grid layouts
 * - Transition animations
 * - Shadow and border treatments
 *
 * @example
 * ```tsx
 * import CompoundCard, { CompoundDetails } from './CompoundCard';
 *
 * const sampleCompound: CompoundDetails = {
 *   name: "Testosterone Enanthate",
 *   type: "Injectable Androgen",
 *   halfLife: "4-5 days",
 *   schedule: "Every 3.5 days",
 *   benefits: [
 *     { text: "Increases muscle mass and strength" }
 *   ],
 *   considerations: [
 *     { text: "Requires regular blood work monitoring" }
 *   ]
 * };
 *
 * function CompoundList() {
 *   const handleSelect = (compound: CompoundDetails) => {
 *     console.log('Selected compound:', compound.name);
 *   };
 *
 *   return (
 *     <CompoundCard
 *       compound={sampleCompound}
 *       onSelect={handleSelect}
 *     />
 *   );
 * }
 * ```
 *
 * @dependencies
 * - @heroicons/react@2.2.0
 * - react@18.3.1
 * - TypeScript type definitions
 *
 * @requirements
 * - Tailwind CSS configuration with gradient support
 * - TypeScript 5.6 or higher
 * - Modern browser with CSS Grid and transition support
 * - Parent container for proper grid layout
 */

import { BeakerIcon, ClockIcon, ScaleIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "./ui";

interface CompoundBenefit {
  text: string;
}

interface CompoundConsideration {
  text: string;
}

export interface CompoundDetails {
  name: string;
  type: string;
  halfLife: string;
  schedule: string;
  ratio?: string;
  benefits: CompoundBenefit[];
  considerations: CompoundConsideration[];
  storage?: string;
}

interface CompoundCardProps {
  compound: CompoundDetails;
  onSelect: (compound: CompoundDetails) => void;
}

export default function CompoundCard({
  compound,
  onSelect,
}: CompoundCardProps) {
  return (
    <div
      className="overflow-hidden transition-all duration-300 transform border shadow-sm cursor-pointer bg-white/90 border-gray-100/50 dark:bg-gray-900/90 dark:border-gray-800/50 backdrop-blur-sm group rounded-xl hover:shadow-xl hover:border-blue-100/50 dark:hover:border-blue-900/50 hover:-translate-y-1"
      onClick={() => onSelect(compound)}
    >
      {/* Header */}
      <div className="relative p-6 overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900">
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100" />
        <h3 className="relative mb-3 text-2xl font-extrabold text-white">
          {compound.name}
        </h3>
        <div className="relative flex items-center text-blue-50">
          <Tooltip content="Classification of the compound based on its chemical structure and administration method">
            <div className="flex items-center">
              <BeakerIcon className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium tracking-wide">{compound.type}</span>
            </div>
          </Tooltip>
        </div>
      </div>

      {/* Quick Info */}
      <div className="px-6 py-5 border-b border-gray-100/50 dark:border-gray-800/50">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center group/item">
            <Tooltip content="The time it takes for half of the compound to be eliminated from the body">
              <div className="flex items-center">
                <ClockIcon className="flex-shrink-0 w-5 h-5 mr-3 transition-colors duration-200 text-blue-500/70 group-hover/item:text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-0.5">
                    Half-Life
                  </span>
                  <span className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {compound.halfLife}
                  </span>
                </div>
              </div>
            </Tooltip>
          </div>
          <div className="flex items-center group/item">
            <Tooltip
              content={
                compound.ratio
                  ? "The proportion of active ingredients in the compound"
                  : "Recommended frequency of administration"
              }
            >
              <div className="flex items-center">
                <ScaleIcon className="flex-shrink-0 w-5 h-5 mr-3 transition-colors duration-200 text-blue-500/70 group-hover/item:text-blue-600" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-0.5">
                    {compound.ratio ? "Ratio" : "Schedule"}
                  </span>
                  <span className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {compound.ratio || compound.schedule}
                  </span>
                </div>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Preview Benefits */}
      <div className="px-6 py-4">
        <div className="text-sm">
          <Tooltip content="Click to view all benefits and detailed information">
            <div>
              <span className="mr-1 font-semibold text-gray-900 dark:text-white">
                Benefits:
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {compound.benefits[0].text}...
              </span>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
