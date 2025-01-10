/**
 * @fileoverview PhaseSection component for rendering medication schedule phase blocks
 * @project     Steroid Guide Site
 * @module      components/ui/PhaseSection
 */

import { useUserPreferences } from "../../contexts/userPreferences.hooks";
import { PhaseHeader } from "./PhaseHeader";
import { TooltipWrapper } from "./TooltipWrapper";
import type {
  PhaseSchedule,
  DaySchedule,
  Medication,
} from "../../data/phaseSchedules";

const phaseColors = {
  loading: "bg-blue-50 dark:bg-blue-950/50",
  maintenance: "bg-blue-50 dark:bg-blue-950/50",
  pct: "bg-purple-50 dark:bg-purple-950/50",
  bridge: "bg-green-50 dark:bg-green-950/50",
  custom: "bg-gray-50 dark:bg-gray-950/50",
} as const;

interface PhaseSectionProps {
  phase: PhaseSchedule;
  className?: string;
}

const PhaseSection = ({ phase, className }: PhaseSectionProps) => {
  const { preferences } = useUserPreferences();

  return (
    <div className={className}>
      <PhaseHeader
        title={phase.title}
        phase={phase.type}
        duration={phase.duration}
        startDate={phase.startDate}
        endDate={phase.endDate}
        description={phase.description}
        className="mb-4"
      />

      <div
        className={`grid gap-4 ${
          preferences.printMode
            ? "grid-cols-2 print:gap-2 print:grid-cols-3"
            : "md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {phase.days.map((day: DaySchedule) => (
          <div
            key={day.day}
            className={`${
              phaseColors[phase.type]
            } rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 print:shadow-none print:border print:border-gray-200 print:hover:shadow-none print:text-black print:bg-white`}
          >
            <div className="px-4 py-3 bg-opacity-75 border-b border-gray-200 print:py-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800 dark:text-white print:text-black">
                  Day {day.day}
                </span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 print:text-black">
                  {day.date}
                </span>
              </div>
            </div>
            <div className="p-4 print:p-2">
              {day.medications.map((med: Medication, index: number) => (
                <div
                  key={`${med.name}-${index}`}
                  className="pl-4 mb-2 text-sm text-gray-700 border-l-2 border-gray-200 dark:text-gray-300 dark:border-gray-700 last:mb-0 print:text-black print:border-gray-300"
                >
                  <TooltipWrapper content={med.tooltip}>
                    <span className="cursor-help">
                      {med.name} {med.dosage}
                    </span>
                  </TooltipWrapper>
                </div>
              ))}
              {day.medications.length === 0 && (
                <div className="pl-4 text-sm italic text-gray-500 border-l-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 print:text-gray-500 print:border-gray-300">
                  <TooltipWrapper content="Rest day - no compounds need to be administered. Use this time to monitor your body's response and recovery.">
                    <span className="cursor-help">
                      No medications scheduled
                    </span>
                  </TooltipWrapper>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export type { PhaseSectionProps };
export { PhaseSection };
