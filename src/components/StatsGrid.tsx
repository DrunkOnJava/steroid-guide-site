/**
 * @fileoverview Grid component displaying cycle statistics and milestones
 */

import {
  BeakerIcon,
  ArrowTrendingUpIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import { TooltipWrapper } from "./ui";

interface StatsGridProps {
  cycleDay: number;
  totalDays: number;
}

export default function StatsGrid({ cycleDay, totalDays }: StatsGridProps) {
  const getCurrentPhase = (day: number) => {
    if (day <= 70) return "Main Cycle (Weeks 1-10)";
    if (day <= 91) return "HCG Phase (Weeks 11-13)";
    return "PCT Phase (Weeks 14-18)";
  };

  const getNextMilestone = (day: number) => {
    if (day < 70) return `PCT Begins in ${71 - day} days`;
    if (day < totalDays) return `Cycle Ends in ${totalDays - day} days`;
    return "Cycle Complete";
  };

  const getTotalProgress = (day: number) => {
    if (day < 1) return "Not Started";
    if (day > totalDays) return "Completed";
    return `Day ${day} of ${totalDays}`;
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 p-6 transform transition-all duration-200 hover:scale-[1.02]">
        <div className="flex items-center mb-2 space-x-3">
          <BeakerIcon className="w-6 h-6 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            <TooltipWrapper content="The current stage of your cycle, each with specific protocols and compounds designed to optimize results">
              <span className="cursor-help">Current Phase</span>
            </TooltipWrapper>
          </h3>
        </div>
        <TooltipWrapper
          content={
            cycleDay <= 70
              ? "Main building phase focused on muscle growth and strength gains with primary compounds"
              : cycleDay <= 91
              ? "Transition phase using HCG to maintain testicular function before PCT"
              : "Post-Cycle Therapy phase to restore natural hormone production"
          }
        >
          <p className="text-gray-600 dark:text-gray-300 cursor-help">
            {getCurrentPhase(cycleDay)}
          </p>
        </TooltipWrapper>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 p-6 transform transition-all duration-200 hover:scale-[1.02]">
        <div className="flex items-center mb-2 space-x-3">
          <ArrowTrendingUpIcon className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            <TooltipWrapper content="Important upcoming changes in your cycle that require preparation and protocol adjustments">
              <span className="cursor-help">Next Milestone</span>
            </TooltipWrapper>
          </h3>
        </div>
        <TooltipWrapper
          content={
            cycleDay < 70
              ? "Prepare for PCT by gathering necessary compounds and adjusting training/nutrition"
              : cycleDay < totalDays
              ? "Final phase of the cycle - maintain consistent protocol until completion"
              : "Cycle completed - consider blood work and health markers before planning next cycle"
          }
        >
          <p className="text-gray-600 dark:text-gray-300 cursor-help">
            {getNextMilestone(cycleDay)}
          </p>
        </TooltipWrapper>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 p-6 transform transition-all duration-200 hover:scale-[1.02]">
        <div className="flex items-center mb-2 space-x-3">
          <CircleStackIcon className="w-6 h-6 text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            <TooltipWrapper content="Overall cycle progress tracking with day count and completion status">
              <span className="cursor-help">Total Progress</span>
            </TooltipWrapper>
          </h3>
        </div>
        <TooltipWrapper
          content={
            cycleDay < 1
              ? "Prepare all compounds and review protocol before starting"
              : cycleDay > totalDays
              ? "Cycle complete - monitor recovery and maintain gains"
              : `${((cycleDay / totalDays) * 100).toFixed(
                  1
                )}% through the total cycle duration`
          }
        >
          <p className="text-gray-600 dark:text-gray-300 cursor-help">
            {getTotalProgress(cycleDay)}
          </p>
        </TooltipWrapper>
      </div>
    </div>
  );
}
