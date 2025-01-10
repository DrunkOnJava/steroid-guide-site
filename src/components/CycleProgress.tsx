/**
 * @fileoverview Enhanced component for displaying cycle progress, current medications, and stats
 */

import {
  PresentationChartLineIcon,
  BeakerIcon,
  CheckCircleIcon,
  CircleStackIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { TooltipWrapper, Tooltip, MedicationTooltip } from "./ui";
import { isInjection, isPill, type Medication } from "../utils/medicationUtils";

interface CycleProgressProps {
  currentDay: number;
  totalDays: number;
  medications?: Medication[];
  isActive: boolean;
}

export default function CycleProgress({
  currentDay,
  totalDays,
  medications = [],
  isActive,
}: CycleProgressProps) {
  const progressPercentage = Math.max(
    0,
    Math.min(100, (currentDay / totalDays) * 100)
  );

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

  return (
    <div className="p-4 bg-white border border-gray-100 shadow-lg dark:bg-gray-900 dark:border-gray-800 rounded-xl sm:p-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <PresentationChartLineIcon className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            <TooltipWrapper content="Visual representation of your progress through the 18-week cycle, including main phase, bridging, and PCT">
              <span className="cursor-help">Cycle Progress</span>
            </TooltipWrapper>
          </h2>
        </div>
        <div className="flex items-center space-x-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          <TooltipWrapper
            content={
              !isActive
                ? "Cycle is not currently active"
                : `${((currentDay / totalDays) * 100).toFixed(
                    1
                  )}% through the total cycle duration`
            }
          >
            <span className="cursor-help">
              {!isActive ? "Inactive" : `Day ${currentDay} of ${totalDays}`}
            </span>
          </TooltipWrapper>
          <span className="text-gray-300 dark:text-gray-600">|</span>
          <TooltipWrapper
            content={`${
              currentDay <= 70
                ? "Main building phase - focus on training intensity and nutrition"
                : currentDay <= 91
                ? "Bridging phase - maintaining gains while preparing for PCT"
                : "PCT phase - restoring natural hormone production"
            }`}
          >
            <span className="cursor-help">
              {progressPercentage.toFixed(1)}% Complete
            </span>
          </TooltipWrapper>
        </div>
      </div>

      {/* Progress Bar */}
      <TooltipWrapper
        content={
          <div className="space-y-1">
            <p className="font-medium">Cycle Phases:</p>
            <p>• Weeks 1-10: Main Phase (55.6%)</p>
            <p>• Weeks 11-13: Bridging (16.7%)</p>
            <p>• Weeks 14-18: PCT (27.7%)</p>
            <p className="mt-2 text-sm">
              Hover over the progress bar to track your current phase
            </p>
          </div>
        }
      >
        <div className="w-full h-4 bg-gray-100 rounded-full dark:bg-gray-800">
          <div
            className={`h-full transition-all duration-500 ease-out rounded-full ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700"
                : "bg-gray-400 dark:bg-gray-600"
            }`}
            style={{
              width: `${progressPercentage}%`,
            }}
          />
        </div>
      </TooltipWrapper>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mt-6 mb-6">
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center mb-2 space-x-2">
            <BeakerIcon className="w-5 h-5 text-purple-500" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              <TooltipWrapper content="The current stage of your cycle, each with specific protocols and compounds designed to optimize results">
                <span className="cursor-help">Current Phase</span>
              </TooltipWrapper>
            </h3>
          </div>
          <TooltipWrapper
            content={
              currentDay <= 70
                ? "Main building phase focused on muscle growth and strength gains with primary compounds"
                : currentDay <= 91
                ? "Transition phase using HCG to maintain testicular function before PCT"
                : "Post-Cycle Therapy phase to restore natural hormone production"
            }
          >
            <div className="text-sm text-gray-600 dark:text-gray-300 cursor-help">
              {getCurrentPhase(currentDay)}
            </div>
          </TooltipWrapper>
        </div>

        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center mb-2 space-x-2">
            <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              <TooltipWrapper content="Important upcoming changes in your cycle that require preparation and protocol adjustments">
                <span className="cursor-help">Next Milestone</span>
              </TooltipWrapper>
            </h3>
          </div>
          <TooltipWrapper
            content={
              currentDay < 70
                ? "Prepare for PCT by gathering necessary compounds and adjusting training/nutrition"
                : currentDay < totalDays
                ? "Final phase of the cycle - maintain consistent protocol until completion"
                : "Cycle completed - consider blood work and health markers before planning next cycle"
            }
          >
            <div className="text-sm text-gray-600 dark:text-gray-300 cursor-help">
              {getNextMilestone(currentDay)}
            </div>
          </TooltipWrapper>
        </div>

        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center mb-2 space-x-2">
            <CircleStackIcon className="w-5 h-5 text-orange-500" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              <TooltipWrapper content="Today's required medications and compounds">
                <span className="cursor-help">Today's Medications</span>
              </TooltipWrapper>
            </h3>
          </div>
          <TooltipWrapper
            content={
              medications.length === 0
                ? "No medications scheduled for today"
                : `${medications.length} compound${
                    medications.length === 1 ? "" : "s"
                  } to be administered today`
            }
          >
            <div className="text-sm text-gray-600 dark:text-gray-300 cursor-help">
              {medications.length === 0
                ? "No medications"
                : `${medications.length} item${
                    medications.length === 1 ? "" : "s"
                  } scheduled`}
            </div>
          </TooltipWrapper>
        </div>
      </div>

      {/* Medications List */}
      {medications.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center mb-3 space-x-2">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              <Tooltip content="Compounds and dosages scheduled for administration today">
                <span className="cursor-help">Today's Protocol</span>
              </Tooltip>
            </h3>
          </div>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {medications.map((med, idx) => (
              <li
                key={idx}
                className="flex items-center px-3 py-2 space-x-2 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <span className="flex-shrink-0">
                  {isInjection(med) ? (
                    <BeakerIcon className="w-4 h-4 text-blue-500" />
                  ) : isPill(med) ? (
                    <CircleStackIcon className="w-4 h-4 text-purple-500" />
                  ) : (
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  )}
                </span>
                <div className="flex-grow">
                  <MedicationTooltip med={med.name} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
