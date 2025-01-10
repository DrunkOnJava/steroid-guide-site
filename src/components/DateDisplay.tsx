/**
 * @fileoverview Component for displaying current date and cycle day information
 */

import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { TooltipWrapper } from "./ui";

interface DateDisplayProps {
  dateTime: Date;
  cycleDay: number;
  totalDays: number;
  cycleStatus: {
    isActive: boolean;
    message: string;
    startDate: Date;
    currentDay: number;
  };
}

export default function DateDisplay({
  dateTime,
  cycleDay,
  totalDays,
  cycleStatus,
}: DateDisplayProps) {
  const formattedDateTime = dateTime.toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "long",
  });

  return (
    <div className="p-4 bg-white border border-gray-100 shadow-lg dark:bg-gray-900 rounded-xl dark:border-gray-800 sm:p-6">
      <div className="flex items-center mb-2 space-x-3">
        <CalendarDaysIcon className="w-6 h-6 text-blue-500" />
        <h2 className="mt-0 text-xl font-bold text-gray-800 dark:text-white">
          <TooltipWrapper content="All schedules and timings are synchronized to Eastern Standard Time (EST/UTC-5) to ensure consistent dosing intervals across time zones">
            <span className="cursor-help">Current Date (EST)</span>
          </TooltipWrapper>
        </h2>
      </div>
      <div className="mb-0 text-sm text-gray-600 dark:text-gray-300">
        <TooltipWrapper content="Local time adjusted to EST for consistent scheduling">
          <p className="mb-1 cursor-help">{formattedDateTime}</p>
        </TooltipWrapper>
        <TooltipWrapper
          content={
            cycleStatus.isActive
              ? `${Math.floor((cycleDay - 1) / 7) + 1} weeks and ${
                  ((cycleDay - 1) % 7) + 1
                } days into your cycle. Follow the schedule closely for optimal results.`
              : cycleStatus.message
          }
        >
          <p className="cursor-help">
            <span className="font-semibold">
              {cycleStatus.isActive ? (
                <>
                  Cycle Day: {cycleDay}
                  {` of ${totalDays}`}
                </>
              ) : (
                cycleStatus.message
              )}
            </span>
          </p>
        </TooltipWrapper>
      </div>
    </div>
  );
}
