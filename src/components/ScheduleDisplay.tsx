/**
 * @fileoverview Component for displaying the complete cycle schedule with interactive medication tracking
 */

import {
  BeakerIcon,
  CheckCircleIcon,
  CircleStackIcon,
  ClockIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "./ui";
import { MedicationTooltip } from "../utils/medicationUtils";
import { useState } from "react";
import { getESTDate, formatDate } from "../utils/dateUtils";

interface ScheduledMedication {
  day: number;
  medications: string[];
  completed?: boolean;
}

const PHASE_1_MEDS: ScheduledMedication[] = [
  {
    day: 1,
    medications: [
      "Test Cyp 250 mg",
      "NPP 100 mg",
      "Anastrozole 0.5 mg",
      "Semaglutide",
    ],
  },
  {
    day: 2,
    medications: ["Anastrozole 0.5 mg"],
  },
  // Add more days as needed
];

const PHASE_2_MEDS: ScheduledMedication[] = [
  {
    day: 71,
    medications: ["HCG 500 IU", "Semaglutide"],
  },
  // Add more days as needed
];

const PHASE_3_MEDS: ScheduledMedication[] = [
  {
    day: 92,
    medications: ["Nolvadex 20 mg", "Clomid 50 mg", "Semaglutide"],
  },
  // Add more days as needed
];

export default function ScheduleDisplay() {
  const [completedMeds, setCompletedMeds] = useState<number[]>([]);
  const today = getESTDate();
  const currentDay =
    Math.floor(
      (today.getTime() - new Date(2024, 0, 8).getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

  const toggleMedication = (day: number) => {
    setCompletedMeds((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const renderMedicationDay = (schedMed: ScheduledMedication) => {
    const isToday = schedMed.day === currentDay;
    const isCompleted = completedMeds.includes(schedMed.day);
    const date = new Date(2024, 0, 8 + schedMed.day - 1);

    return (
      <div
        key={schedMed.day}
        className={`mb-2 p-3 rounded-lg transition-colors ${
          isToday ? "bg-blue-50 dark:bg-blue-900/20" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <span className="font-semibold">
              Day {schedMed.day} ({formatDate(date)}):
            </span>
            <div className="mt-1">
              {schedMed.medications.map((med, idx) => (
                <MedicationTooltip key={idx} med={med} />
              ))}
            </div>
          </div>
          {isToday && (
            <button
              onClick={() => toggleMedication(schedMed.day)}
              className={`ml-4 p-2 rounded-full transition-colors ${
                isCompleted
                  ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
              }`}
            >
              <CheckIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white border border-gray-100 shadow-lg dark:bg-gray-900 rounded-xl dark:border-gray-800 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <ClockIcon className="w-6 h-6 text-indigo-600" />
          <h2 className="mt-0 text-xl font-bold text-gray-800 dark:text-white">
            <Tooltip content="Full timeline of all compounds and dosages throughout the cycle">
              <span className="cursor-help">Complete 18-Week Schedule</span>
            </Tooltip>
          </h2>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Current Day: {currentDay}
        </div>
      </div>

      <div className="mt-4 space-y-6">
        {/* Phase 1: Weeks 1-10 */}
        <div>
          <h3 className="flex items-center mb-3 space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
            <BeakerIcon className="w-5 h-5 text-blue-500" />
            <Tooltip content="Main cycle phase with primary anabolic compounds">
              <span className="cursor-help">WEEKS 1–10 (Days 1–70)</span>
            </Tooltip>
          </h3>
          <div className="space-y-2">
            {PHASE_1_MEDS.map(renderMedicationDay)}
          </div>
        </div>

        {/* Phase 2: Weeks 11-13 */}
        <div>
          <h3 className="flex items-center mb-3 space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
            <CircleStackIcon className="w-5 h-5 text-purple-500" />
            <Tooltip content="Transition phase using HCG to maintain testicular function">
              <span className="cursor-help">WEEKS 11–13 (Days 71–91)</span>
            </Tooltip>
          </h3>
          <div className="space-y-2">
            {PHASE_2_MEDS.map(renderMedicationDay)}
          </div>
        </div>

        {/* Phase 3: Weeks 14-18 */}
        <div>
          <h3 className="flex items-center mb-3 space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <Tooltip content="Post-Cycle Therapy phase to restore natural hormone production">
              <span className="cursor-help">WEEKS 14–18 (Days 92–126)</span>
            </Tooltip>
          </h3>
          <div className="space-y-2">
            {PHASE_3_MEDS.map(renderMedicationDay)}
          </div>
        </div>
      </div>
    </div>
  );
}
