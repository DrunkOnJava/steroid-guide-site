/**
 * @fileoverview Component for displaying workout day exercises
 * @project     Steroid Guide Site
 * @module      WorkoutDay
 */

import { ChartBarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { TooltipWrapper } from "./ui";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  formTip?: string;
  intensity?: string;
}

interface WorkoutDayProps {
  name: string;
  exercises: Exercise[];
}

export default function WorkoutDay({ name, exercises }: WorkoutDayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="overflow-hidden border rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 dark:bg-gray-800"
      >
        <TooltipWrapper
          content={`Training focus: ${name}. Adjust weights to maintain proper form and technique throughout all sets.`}
        >
          <span className="font-medium text-gray-900 dark:text-white cursor-help">
            {name}
          </span>
        </TooltipWrapper>
        <ChartBarIcon
          className={`h-5 w-5 text-gray-400 transform transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {isExpanded && (
        <div className="p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-500 dark:text-gray-400">
                  <TooltipWrapper content="Exercise selection targets specific muscle groups for optimal growth and strength development">
                    <span className="cursor-help">Exercise</span>
                  </TooltipWrapper>
                </th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">
                  <TooltipWrapper content="Number of sets determines total training volume. Rest 1-2 minutes between sets for optimal recovery.">
                    <span className="cursor-help">Sets</span>
                  </TooltipWrapper>
                </th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">
                  <TooltipWrapper content="Rep range determines training focus: 1-5 for strength, 8-12 for hypertrophy, 12+ for endurance">
                    <span className="cursor-help">Reps</span>
                  </TooltipWrapper>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {exercises.map((exercise, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                    <TooltipWrapper
                      content={
                        exercise.formTip ||
                        "Focus on proper form and controlled movement throughout the exercise"
                      }
                    >
                      <span className="cursor-help">{exercise.name}</span>
                    </TooltipWrapper>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                    <TooltipWrapper
                      content={
                        exercise.intensity
                          ? `Target intensity: ${exercise.intensity}`
                          : "Progress weight when you can complete all sets with good form"
                      }
                    >
                      <span className="cursor-help">{exercise.sets}</span>
                    </TooltipWrapper>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    <TooltipWrapper content="Complete all reps with controlled form. Last 2-3 reps should be challenging but maintainable.">
                      <span className="cursor-help">{exercise.reps}</span>
                    </TooltipWrapper>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
