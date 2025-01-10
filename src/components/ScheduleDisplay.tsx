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
import { Tooltip, MedicationTooltip } from "./ui";
import { useState, useMemo, useCallback, memo } from "react";
import { getESTDate, formatDate } from "../utils/dateUtils";
import {
  PHASE_1_MEDS,
  PHASE_2_MEDS,
  PHASE_3_MEDS,
  CYCLE_START_DATE,
  type ScheduledMedication,
} from "../data/scheduleData";

interface MedicationDayProps {
  schedMed: ScheduledMedication;
  isToday: boolean;
  isCompleted: boolean;
  onToggle: (day: number) => void;
}

const MedicationDay = memo(
  ({ schedMed, isToday, isCompleted, onToggle }: MedicationDayProps) => {
    const date = useMemo(
      () =>
        new Date(
          CYCLE_START_DATE.getTime() + (schedMed.day - 1) * 24 * 60 * 60 * 1000
        ),
      [schedMed.day]
    );

    const buttonTitle = isCompleted
      ? "Mark medications as incomplete"
      : "Mark medications as complete";

    return (
      <div
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
                <MedicationTooltip key={`${med}-${idx}`} med={med} />
              ))}
            </div>
          </div>
          {isToday && (
            <button
              onClick={() => onToggle(schedMed.day)}
              title={buttonTitle}
              aria-label={buttonTitle}
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
  }
);

MedicationDay.displayName = "MedicationDay";

export default function ScheduleDisplay() {
  const [completedMeds, setCompletedMeds] = useState<number[]>([]);

  const currentDay = useMemo(() => {
    const today = getESTDate();
    return (
      Math.floor(
        (today.getTime() - CYCLE_START_DATE.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1
    );
  }, []); // Empty deps since we only need to calculate this once on mount

  const toggleMedication = useCallback((day: number) => {
    setCompletedMeds((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }, []);

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
            {PHASE_1_MEDS.map((schedMed) => (
              <MedicationDay
                key={schedMed.day}
                schedMed={schedMed}
                isToday={schedMed.day === currentDay}
                isCompleted={completedMeds.includes(schedMed.day)}
                onToggle={toggleMedication}
              />
            ))}
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
            {PHASE_2_MEDS.map((schedMed) => (
              <MedicationDay
                key={schedMed.day}
                schedMed={schedMed}
                isToday={schedMed.day === currentDay}
                isCompleted={completedMeds.includes(schedMed.day)}
                onToggle={toggleMedication}
              />
            ))}
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
            {PHASE_3_MEDS.map((schedMed) => (
              <MedicationDay
                key={schedMed.day}
                schedMed={schedMed}
                isToday={schedMed.day === currentDay}
                isCompleted={completedMeds.includes(schedMed.day)}
                onToggle={toggleMedication}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
