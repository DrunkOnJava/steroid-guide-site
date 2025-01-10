/**
 * @fileoverview CompoundTypeSchedule component for displaying compound metadata
 * @project     Steroid Guide Site
 * @module      components/ui/CompoundTypeSchedule
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { IconWithLabel } from "./IconWithLabel";
import { TooltipWrapper } from "./TooltipWrapper";
import { StatsCard } from "./StatsCard";
import {
  BeakerIcon,
  ClockIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

type CompoundSchedule = {
  frequency: string;
  duration: string;
  timing: string;
};

type CompoundTypeScheduleProps = {
  name: string;
  type: string;
  schedule: CompoundSchedule;
  halfLife?: string;
  className?: string;
  tooltip?: string;
};

const CompoundTypeSchedule = forwardRef<
  HTMLDivElement,
  CompoundTypeScheduleProps
>(({ name, type, schedule, halfLife, className, tooltip, ...props }, ref) => {
  const content = (
    <div
      ref={ref}
      className={twMerge(
        "p-4 bg-white rounded-lg shadow dark:bg-gray-800",
        className
      )}
      {...props}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {name}
            </h3>
            <IconWithLabel
              icon={BeakerIcon}
              label={type}
              className="mt-1"
              iconColor="primary"
            />
          </div>
          {halfLife && (
            <TooltipWrapper
              content="Time taken for compound concentration to reduce by half"
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span>{halfLife}</span>
              </div>
            </TooltipWrapper>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatsCard
            title="Frequency"
            value={schedule.frequency}
            icon={CalendarIcon}
            tooltip="How often the compound should be administered"
          />
          <StatsCard
            title="Duration"
            value={schedule.duration}
            icon={ClockIcon}
            tooltip="Total length of time the compound is used"
          />
          <StatsCard
            title="Timing"
            value={schedule.timing}
            icon={ClockIcon}
            tooltip="Best time of day for administration"
          />
        </div>
      </div>
    </div>
  );

  return tooltip ? (
    <TooltipWrapper content={tooltip}>{content}</TooltipWrapper>
  ) : (
    content
  );
});

CompoundTypeSchedule.displayName = "CompoundTypeSchedule";

export type { CompoundTypeScheduleProps, CompoundSchedule };
export { CompoundTypeSchedule };
