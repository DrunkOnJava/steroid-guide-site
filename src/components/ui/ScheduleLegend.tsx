/**
 * @fileoverview ScheduleLegend component for displaying phase indicator explanations
 * @project     Steroid Guide Site
 * @module      components/ui/ScheduleLegend
 */

import { CyclePhaseIndicator } from "./CyclePhaseIndicator";

const phases = [
  { type: "loading", label: "Loading Phase" },
  { type: "maintenance", label: "Maintenance Phase" },
  { type: "pct", label: "Post Cycle Therapy" },
  { type: "bridge", label: "Bridge Period" },
  { type: "custom", label: "Custom Phase" },
] as const;

type ScheduleLegendProps = {
  className?: string;
};

const ScheduleLegend = ({ className }: ScheduleLegendProps) => {
  return (
    <div className={className}>
      <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        Phase Legend
      </h3>
      <div className="flex flex-wrap gap-4">
        {phases.map(({ type, label }) => (
          <div
            key={type}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
          >
            <CyclePhaseIndicator phase={type} size="sm" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export type { ScheduleLegendProps };
export { ScheduleLegend };
