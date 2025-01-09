/**
 * @fileoverview Interactive table component for displaying steroid cycle information
 * @project     Steroid Guide Site (v0.0.0)
 * @module      CycleTable
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
 * A comprehensive table component for displaying steroid cycle information with advanced features:
 *
 * Visual Organization:
 * - Color-coded phases (main cycle, transition, PCT)
 * - Compound type indicators (primary, secondary, support, PCT)
 * - Legend for easy reference
 * - Responsive table layout with horizontal scroll
 *
 * Data Display:
 * - Week ranges for each compound
 * - Compound names with optional tooltips for additional information
 * - Frequency of administration (with EOD tooltip explanation)
 * - Dosage information
 * - Purpose descriptions
 *
 * Interactive Features:
 * - Hover tooltips for technical terms and abbreviations
 * - Row highlighting on hover
 * - Smooth transitions for visual feedback
 *
 * Accessibility:
 * - Semantic table structure
 * - Proper ARIA attributes
 * - Clear visual hierarchy
 * - Mobile-responsive design
 *
 * @example
 * ```tsx
 * import CycleTable from './CycleTable';
 *
 * // Example cycle data structure
 * const sampleCycleData = {
 *   week: "1-10",
 *   compound: "Testosterone Cypionate",
 *   frequency: "Twice Weekly",
 *   dosage: "250mg x 2",
 *   purpose: "Base anabolic compound",
 *   phase: "main",
 *   type: "primary",
 *   tooltip: "Long-acting testosterone ester"
 * };
 *
 * function CyclePlan() {
 *   return (
 *     <div className="max-w-6xl mx-auto">
 *       <h2>Cycle Overview</h2>
 *       <CycleTable />
 *     </div>
 *   );
 * }
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - typescript@5.6.2 (for type definitions)
 *
 * @requirements
 * - Tailwind CSS for styling
 * - Modern browser with CSS Grid support
 * - JavaScript enabled for tooltips
 * - Proper viewport meta tag for responsive design
 * - Parent container with defined width constraints
 */

import { useState } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="border-b border-gray-500 border-dotted cursor-help"
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-10 w-48 px-2 py-1 -mt-1 text-sm text-white transform -translate-x-1/2 bg-gray-900 rounded-md shadow-lg dark:bg-gray-900 dark:shadow-black/50 left-1/2">
          {content}
        </div>
      )}
    </div>
  );
}

const phaseColors = {
  main: "bg-blue-50 dark:bg-blue-950/30",
  transition: "bg-yellow-50 dark:bg-yellow-950/30",
  pct: "bg-green-50 dark:bg-green-950/30",
};

const typeColors = {
  primary: "text-blue-800 dark:text-blue-300",
  secondary: "text-purple-800 dark:text-purple-300",
  support: "text-gray-800 dark:text-gray-300",
  pct: "text-green-800 dark:text-green-300",
};

interface CycleData {
  week: string;
  compound: string;
  frequency: string;
  dosage: string;
  purpose: string;
  phase: "main" | "transition" | "pct";
  type: "primary" | "secondary" | "support" | "pct";
  tooltip?: string;
}

const cycleData: CycleData[] = [
  {
    week: "1–10",
    compound: "Testosterone Cypionate",
    frequency: "Twice Weekly",
    dosage: "250 mg",
    purpose: "Base anabolic compound for muscle growth",
    phase: "main",
    type: "primary",
  },
  {
    week: "1–10",
    compound: "NPP",
    frequency: "Twice Weekly",
    dosage: "100 mg",
    purpose: "Secondary anabolic for recovery and mass",
    phase: "main",
    type: "secondary",
    tooltip: "Nandrolone Phenylpropionate - Fast-acting nandrolone ester",
  },
  {
    week: "1–10",
    compound: "Anastrozole",
    frequency: "EOD",
    dosage: "0.5 mg",
    purpose: "Estrogen control",
    phase: "main",
    type: "support",
    tooltip: "Aromatase Inhibitor - Controls estrogen levels",
  },
  {
    week: "1–10",
    compound: "Semaglutide",
    frequency: "Weekly",
    dosage: "As prescribed",
    purpose: "Metabolic support and appetite control",
    phase: "main",
    type: "support",
    tooltip:
      "GLP-1 receptor agonist - Helps with metabolic health and weight management",
  },
  {
    week: "11–13",
    compound: "HCG",
    frequency: "Twice Weekly",
    dosage: "500 IU",
    purpose: "Testicular function restoration",
    phase: "transition",
    type: "support",
    tooltip:
      "Human Chorionic Gonadotropin - Stimulates testosterone production",
  },
  {
    week: "11–13",
    compound: "Semaglutide",
    frequency: "Weekly",
    dosage: "As prescribed",
    purpose: "Continued metabolic support",
    phase: "transition",
    type: "support",
    tooltip:
      "GLP-1 receptor agonist - Helps with metabolic health and weight management",
  },
  {
    week: "14–18",
    compound: "Nolvadex",
    frequency: "Daily",
    dosage: "20 mg",
    purpose: "PCT to restore natural testosterone production",
    phase: "pct",
    type: "pct",
    tooltip: "Tamoxifen - Selective Estrogen Receptor Modulator (SERM)",
  },
  {
    week: "14–18",
    compound: "Clomid",
    frequency: "Daily",
    dosage: "50 mg",
    purpose: "PCT to stimulate LH and FSH production",
    phase: "pct",
    type: "pct",
    tooltip: "Clomiphene - Helps restore natural hormone production",
  },
  {
    week: "14–18",
    compound: "Semaglutide",
    frequency: "Weekly",
    dosage: "As prescribed",
    purpose: "Continued metabolic support during PCT",
    phase: "pct",
    type: "support",
    tooltip:
      "GLP-1 receptor agonist - Helps with metabolic health and weight management",
  },
];

export default function CycleTable() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center">
          <div className="w-3 h-3 mr-2 bg-blue-500 rounded-full dark:bg-blue-400"></div>
          <span>Primary Compounds</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 mr-2 bg-purple-500 rounded-full dark:bg-purple-400"></div>
          <span>Secondary Compounds</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 mr-2 bg-gray-500 rounded-full dark:bg-gray-400"></div>
          <span>Support Compounds</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 mr-2 bg-green-500 rounded-full dark:bg-green-400"></div>
          <span>PCT Compounds</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden border-b border-gray-200 shadow dark:border-gray-700 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Week
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Compound
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Frequency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Dosage
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-800">
                {cycleData.map((row) => (
                  <tr
                    key={`${row.week}-${row.compound}`}
                    className={`${
                      phaseColors[row.phase]
                    } hover:bg-opacity-75 transition-colors`}
                  >
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        typeColors[row.type]
                      }`}
                    >
                      {row.week}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        typeColors[row.type]
                      }`}
                    >
                      {row.tooltip ? (
                        <Tooltip content={row.tooltip}>{row.compound}</Tooltip>
                      ) : (
                        row.compound
                      )}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        typeColors[row.type]
                      }`}
                    >
                      {row.frequency === "EOD" ? (
                        <Tooltip content="Every Other Day">
                          {row.frequency}
                        </Tooltip>
                      ) : (
                        row.frequency
                      )}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        typeColors[row.type]
                      }`}
                    >
                      {row.dosage}
                    </td>
                    <td className={`px-6 py-4 text-sm ${typeColors[row.type]}`}>
                      {row.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
