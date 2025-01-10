/**
 * @fileoverview PhaseHeader component for phase titles in medication schedules
 * @project     Steroid Guide Site
 * @module      components/ui/PhaseHeader
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipWrapper } from "./TooltipWrapper";
import { CyclePhaseIndicator } from "./CyclePhaseIndicator";
import { CalendarIcon } from "@heroicons/react/24/outline";

type PhaseHeaderProps = {
  title: string;
  phase: "loading" | "maintenance" | "pct" | "bridge" | "custom";
  duration?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  className?: string;
  showDates?: boolean;
};

const PhaseHeader = forwardRef<HTMLDivElement, PhaseHeaderProps>(
  (
    {
      title,
      phase,
      duration,
      startDate,
      endDate,
      description,
      className,
      showDates = true,
      ...props
    },
    ref
  ) => {
    const content = (
      <div
        ref={ref}
        className={twMerge(
          "flex flex-col space-y-2 p-4 bg-white rounded-lg shadow dark:bg-gray-800",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <CyclePhaseIndicator phase={phase} size="sm" />
          </div>
          {duration && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CalendarIcon className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          )}
        </div>
        {showDates && (startDate || endDate) && (
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {startDate && <span>Start: {startDate}</span>}
            {endDate && <span>End: {endDate}</span>}
          </div>
        )}
      </div>
    );

    return description ? (
      <TooltipWrapper content={description}>{content}</TooltipWrapper>
    ) : (
      content
    );
  }
);

PhaseHeader.displayName = "PhaseHeader";

export type { PhaseHeaderProps };
export { PhaseHeader };
