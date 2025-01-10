/**
 * @fileoverview FrequencyCell component for displaying dosing frequencies
 * @project     Steroid Guide Site
 * @module      components/ui/FrequencyCell
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipWrapper } from "./TooltipWrapper";
import { IconWithLabel } from "./IconWithLabel";
import { CalendarIcon } from "@heroicons/react/24/outline";

type FrequencyType = "daily" | "eod" | "weekly" | "biweekly" | "custom";

type FrequencyInfo = {
  type: FrequencyType;
  value: string;
  description?: string;
  timing?: string;
};

type FrequencyCellProps = {
  frequency: FrequencyInfo;
  className?: string;
  showIcon?: boolean;
  showTiming?: boolean;
};

const FrequencyCell = forwardRef<HTMLDivElement, FrequencyCellProps>(
  (
    { frequency, className, showIcon = true, showTiming = true, ...props },
    ref
  ) => {
    const descriptions = {
      daily: "Take once every day",
      eod: "Take every other day (alternating days)",
      weekly: "Take once per week",
      biweekly: "Take twice per week",
      custom: frequency.description || "Custom frequency schedule",
    };

    const content = (
      <div
        ref={ref}
        className={twMerge("flex flex-col space-y-1", className)}
        {...props}
      >
        <div className="flex items-center gap-2">
          {showIcon && (
            <IconWithLabel
              icon={CalendarIcon}
              label={frequency.value}
              iconColor="default"
              className="text-sm text-gray-600 dark:text-gray-400"
            />
          )}
          {!showIcon && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {frequency.value}
            </span>
          )}
        </div>
        {showTiming && frequency.timing && (
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {frequency.timing}
          </span>
        )}
      </div>
    );

    return (
      <TooltipWrapper content={descriptions[frequency.type]}>
        {content}
      </TooltipWrapper>
    );
  }
);

FrequencyCell.displayName = "FrequencyCell";

export type { FrequencyCellProps, FrequencyInfo, FrequencyType };
export { FrequencyCell };
