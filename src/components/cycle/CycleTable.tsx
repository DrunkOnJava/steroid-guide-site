/**
 * @fileoverview Interactive table component for displaying steroid cycle information
 * @project     Steroid Guide Site (v0.0.0)
 * @module      CycleTable
 *
 * @author      Steroid Guide Team <team@steroidguide.com>
 * @created     2024-03-19
 * @modified    2024-03-19
 * @version     1.0.0
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
 */

import { TooltipWrapper } from "../ui";
import { TableHeader, TableRow } from "./index";

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
        <TooltipWrapper
          content="Main anabolic compounds that form the foundation of the cycle"
          position="top"
        >
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2 bg-blue-500 rounded-full dark:bg-blue-400"></div>
            <span>Primary Compounds</span>
          </div>
        </TooltipWrapper>
        <TooltipWrapper
          content="Additional compounds that complement the primary compounds"
          position="top"
        >
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2 bg-purple-500 rounded-full dark:bg-purple-400"></div>
            <span>Secondary Compounds</span>
          </div>
        </TooltipWrapper>
        <TooltipWrapper
          content="Compounds used to manage side effects and optimize results"
          position="top"
        >
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2 bg-gray-500 rounded-full dark:bg-gray-400"></div>
            <span>Support Compounds</span>
          </div>
        </TooltipWrapper>
        <TooltipWrapper
          content="Post Cycle Therapy compounds to restore natural hormone production"
          position="top"
        >
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2 bg-green-500 rounded-full dark:bg-green-400"></div>
            <span>PCT Compounds</span>
          </div>
        </TooltipWrapper>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden border-b border-gray-200 shadow dark:border-gray-700 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <TableHeader />
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-800">
                {cycleData.map((row) => (
                  <TableRow key={`${row.week}-${row.compound}`} data={row} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
