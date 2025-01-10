/**
 * @fileoverview Row component for the cycle table
 * @project     Steroid Guide Site (v0.0.0)
 * @module      TableRow
 *
 * @author      Steroid Guide Team <team@steroidguide.com>
 * @created     2024-03-19
 * @modified    2024-03-19
 * @version     1.0.0
 *
 * @description
 * Reusable row component for the cycle table that displays compound information
 * with proper styling and tooltips based on the compound type and phase.
 */

import { TooltipWrapper } from "../ui";

const phaseColors = {
  main: "bg-blue-50 dark:bg-blue-950/30",
  transition: "bg-yellow-50 dark:bg-yellow-950/30",
  pct: "bg-green-50 dark:bg-green-950/30",
} as const;

const typeColors = {
  primary: "text-blue-800 dark:text-blue-300",
  secondary: "text-purple-800 dark:text-purple-300",
  support: "text-gray-800 dark:text-gray-300",
  pct: "text-green-800 dark:text-green-300",
} as const;

interface CycleData {
  week: string;
  compound: string;
  frequency: string;
  dosage: string;
  purpose: string;
  phase: keyof typeof phaseColors;
  type: keyof typeof typeColors;
  tooltip?: string;
}

interface TableRowProps {
  data: CycleData;
}

export default function TableRow({ data }: TableRowProps) {
  return (
    <tr
      className={`${
        phaseColors[data.phase]
      } hover:bg-opacity-75 transition-colors`}
    >
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
          typeColors[data.type]
        }`}
      >
        {data.week}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm ${
          typeColors[data.type]
        }`}
      >
        {data.tooltip ? (
          <TooltipWrapper content={data.tooltip}>
            <span className="underline cursor-help">{data.compound}</span>
          </TooltipWrapper>
        ) : (
          data.compound
        )}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm ${
          typeColors[data.type]
        }`}
      >
        {data.frequency === "EOD" ? (
          <TooltipWrapper content="Every Other Day">
            <span className="underline cursor-help">{data.frequency}</span>
          </TooltipWrapper>
        ) : (
          data.frequency
        )}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm ${
          typeColors[data.type]
        }`}
      >
        <TooltipWrapper
          content={`Recommended dosage: ${data.dosage}. Follow prescribed guidelines carefully.`}
        >
          <span className="cursor-help">{data.dosage}</span>
        </TooltipWrapper>
      </td>
      <td className={`px-6 py-4 text-sm ${typeColors[data.type]}`}>
        {data.purpose}
      </td>
    </tr>
  );
}
