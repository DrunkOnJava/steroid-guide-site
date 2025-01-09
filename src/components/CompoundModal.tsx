/**
 * @fileoverview Detailed modal view for displaying comprehensive compound information
 * @project     Steroid Guide Site (v0.0.0)
 * @module      CompoundModal
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
 * A modal component that displays detailed information about a selected compound.
 * Features include:
 * - Comprehensive compound details in a structured layout
 * - Type and schedule information in a highlighted section
 * - Benefits list with green indicators and check icons
 * - Considerations list with amber warning indicators
 * - Optional storage requirements in a blue info box
 * - Responsive grid layout for key information
 * - Semantic HTML structure with proper heading hierarchy
 * - Visual hierarchy using icons and colors
 * - Accessible content organization
 *
 * Typically used in conjunction with CompoundCard component, appearing when
 * a card is clicked to show full compound details.
 *
 * @example
 * ```tsx
 * import CompoundModal from './CompoundModal';
 * import { CompoundDetails } from './CompoundCard';
 *
 * function CompoundView() {
 *   const [selectedCompound, setSelectedCompound] = useState<CompoundDetails | null>(null);
 *   const [isModalOpen, setIsModalOpen] = useState(false);
 *
 *   const handleCompoundSelect = (compound: CompoundDetails) => {
 *     setSelectedCompound(compound);
 *     setIsModalOpen(true);
 *   };
 *
 *   return (
 *     <>
 *       <CompoundCard
 *         compound={compound}
 *         onSelect={handleCompoundSelect}
 *       />
 *       <CompoundModal
 *         compound={selectedCompound}
 *         isOpen={isModalOpen}
 *         onClose={() => setIsModalOpen(false)}
 *       />
 *     </>
 *   );
 * }
 * ```
 *
 * @dependencies
 * - @heroicons/react@2.2.0
 * - react@18.3.1
 * - ./Modal (custom modal component)
 * - ./CompoundCard (for CompoundDetails type)
 *
 * @requirements
 * - Tailwind CSS with custom color configuration
 * - Parent Modal component for overlay and positioning
 * - Modern browser with CSS Grid and Flexbox support
 * - Proper state management for modal visibility
 */

import Modal from "./Modal";
import { CompoundDetails } from "./CompoundCard";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface CompoundModalProps {
  compound: CompoundDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompoundModal({
  compound,
  isOpen,
  onClose,
}: CompoundModalProps) {
  if (!compound) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={compound.name}>
      <div className="space-y-6">
        {/* Type and Schedule */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Type
              </h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                {compound.type}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Schedule
              </h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                {compound.schedule}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Half-Life
              </h4>
              <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                {compound.halfLife}
              </p>
            </div>
            {compound.ratio && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Ratio
                </h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {compound.ratio}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h4 className="flex items-center mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
            Key Benefits
          </h4>
          <ul className="space-y-2">
            {compound.benefits.map((benefit, index) => (
              <li
                key={index}
                className="relative flex items-start pl-5 text-gray-600 dark:text-gray-300"
              >
                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-green-500" />
                {benefit.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Considerations */}
        <div>
          <h4 className="flex items-center mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-amber-500" />
            Considerations
          </h4>
          <ul className="space-y-2">
            {compound.considerations.map((consideration, index) => (
              <li
                key={index}
                className="relative flex items-start pl-5 text-gray-600 dark:text-gray-300"
              >
                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
                {consideration.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Storage Info if available */}
        {compound.storage && (
          <div className="p-4 mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/50">
            <h4 className="mb-1 text-sm font-semibold text-blue-900 dark:text-blue-300">
              Storage Requirements
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              {compound.storage}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
