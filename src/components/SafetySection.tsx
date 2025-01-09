/**
 * @fileoverview Interactive safety information display with categorized sections
 * @project     Steroid Guide Site (v0.0.0)
 * @module      SafetySection
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
 * A comprehensive safety information component with collapsible sections and visual indicators.
 *
 * Content Categories:
 * - Warnings (red theme with exclamation icon)
 * - Checklists (green theme with checkmark icon)
 * - Information (blue theme with shield icon)
 *
 * Interactive Features:
 * - Expandable/collapsible sections
 * - Smooth transitions and animations
 * - Visual feedback on hover
 * - Icon-based category identification
 *
 * Visual Elements:
 * - Color-coded sections by type
 * - Consistent icon usage
 * - Clear typography hierarchy
 * - Responsive grid layout
 *
 * User Experience:
 * - Accordion-style interaction
 * - Clear visual hierarchy
 * - Accessible button controls
 * - Proper spacing and contrast
 *
 * @example
 * ```tsx
 * import SafetySection from './SafetySection';
 *
 * const safetyContent = [
 *   {
 *     title: "Important Warnings",
 *     type: "warning",
 *     items: (
 *       <ul className="pl-4 space-y-2 list-disc">
 *         <li>Always consult healthcare professionals</li>
 *         <li>Monitor blood work regularly</li>
 *       </ul>
 *     )
 *   },
 *   {
 *     title: "Pre-Cycle Checklist",
 *     type: "checklist",
 *     items: (
 *       <ul className="pl-4 space-y-2 list-disc">
 *         <li>Baseline blood work completed</li>
 *         <li>Emergency contacts available</li>
 *       </ul>
 *     )
 *   }
 * ];
 *
 * function SafetyPage() {
 *   return <SafetySection content={safetyContent} />;
 * }
 * ```
 *
 * @dependencies
 * - react@18.3.1 (useState)
 * - @heroicons/react@2.2.0
 *
 * @requirements
 * - Tailwind CSS for styling
 * - Modern browser with CSS transitions
 * - Proper color contrast ratios
 * - Responsive container width
 */

import { useState } from "react";
import {
  ChevronDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

interface SafetyItemProps {
  title: string;
  children: React.ReactNode;
  type?: "warning" | "checklist" | "info";
}

const SafetyItem = ({ title, children, type = "info" }: SafetyItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const bgColors = {
    warning:
      "bg-red-50 hover:bg-red-100 dark:bg-red-950/50 dark:hover:bg-red-900/50",
    checklist:
      "bg-green-50 hover:bg-green-100 dark:bg-green-950/50 dark:hover:bg-green-900/50",
    info: "bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50",
  };

  const iconColors = {
    warning: "text-red-500",
    checklist: "text-green-500",
    info: "text-blue-500",
  };

  const Icon = {
    warning: ExclamationTriangleIcon,
    checklist: CheckCircleIcon,
    info: ShieldCheckIcon,
  }[type];

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 rounded-lg ${bgColors[type]} transition-colors duration-200 flex items-center justify-between`}
      >
        <div className="flex items-center space-x-3">
          <Icon className={`h-6 w-6 ${iconColors[type]}`} />
          <span className="font-semibold text-gray-900 dark:text-white">
            {title}
          </span>
        </div>
        <ChevronDownIcon
          className={`h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 mt-2 bg-white rounded-lg shadow-inner dark:bg-gray-900/50 dark:shadow-black/10">
          {children}
        </div>
      )}
    </div>
  );
};

interface SafetySectionProps {
  content: {
    title: string;
    type: "warning" | "checklist" | "info";
    items: React.ReactNode;
  }[];
}

export default function SafetySection({ content }: SafetySectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {content.map((section, index) => (
          <SafetyItem key={index} title={section.title} type={section.type}>
            {section.items}
          </SafetyItem>
        ))}
      </div>
    </div>
  );
}
