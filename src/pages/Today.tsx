/**
 * @fileoverview Enhanced real-time cycle tracking and daily management page
 */

import { useEffect, useState, useMemo } from "react";
import CycleProgress from "../components/CycleProgress";
import DateDisplay from "../components/DateDisplay";
import MedicationSchedule from "../components/MedicationSchedule";
import WorkoutDay from "../components/WorkoutDay";
import NutritionGrid from "../components/NutritionGrid";
import {
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { TooltipWrapper, Alert, Button } from "../components/ui";
import HealthMarkersSection from "../components/HealthMarkersSection";

import {
  getESTDate,
  TOTAL_CYCLE_DAYS,
  getMedicationsForDay,
  getCycleStatus,
} from "../utils/dateUtils";
import trainingData from "../data/trainingData";

export default function Today() {
  const [estDateTime, setEstDateTime] = useState(getESTDate());
  const [cycleStatus, setCycleStatus] = useState(getCycleStatus());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEstDateTime(getESTDate());
      setCycleStatus(getCycleStatus());
    }, 60_000);
    return () => clearInterval(intervalId);
  }, []);

  const medsToday = getMedicationsForDay(cycleStatus.currentDay);

  // Determine current phase and its data
  const currentPhase = useMemo(() => {
    const week = Math.ceil(cycleStatus.currentDay / 7);
    if (week <= 10) return trainingData.phases[0];
    if (week <= 16) return trainingData.phases[1];
    return trainingData.phases[2];
  }, [cycleStatus.currentDay]);

  // Get today's workout based on the day of the week
  const todaysWorkout = useMemo(() => {
    const dayOfWeek = new Date().getDay();
    const workouts = currentPhase.workoutDays;
    return workouts[dayOfWeek % workouts.length];
  }, [currentPhase]);

  // Get relevant recovery protocols for today
  const todaysRecoveryProtocols = useMemo(() => {
    return trainingData.recoveryProtocols.filter(
      (protocol) =>
        protocol.frequency === "daily" || protocol.frequency === "rest days"
    );
  }, []);

  return (
    <div className="grid gap-6">
      {/* Card 1: Cycle Status */}
      <div className="p-6 bg-white shadow-lg rounded-xl dark:bg-gray-900">
        <div className="space-y-4">
          <DateDisplay
            dateTime={estDateTime}
            cycleDay={cycleStatus.currentDay}
            totalDays={TOTAL_CYCLE_DAYS}
            cycleStatus={cycleStatus}
          />
          <CycleProgress
            currentDay={cycleStatus.currentDay}
            totalDays={TOTAL_CYCLE_DAYS}
            medications={medsToday}
            isActive={cycleStatus.isActive}
          />
          {!cycleStatus.isActive && (
            <Alert variant="info" title="Cycle Status">
              {cycleStatus.message}
            </Alert>
          )}
        </div>
      </div>

      {/* Card 2: Training & Nutrition */}
      <div className="p-6 bg-white shadow-lg rounded-xl dark:bg-gray-900">
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              <TooltipWrapper content="Today's optimized training and nutrition plan">
                <span className="cursor-help">Training & Nutrition Plan</span>
              </TooltipWrapper>
            </h3>
            <WorkoutDay {...todaysWorkout} />
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900 text-md dark:text-white">
              <TooltipWrapper content="Daily nutrition targets for optimal results">
                <span className="cursor-help">Nutrition Targets</span>
              </TooltipWrapper>
            </h4>
            <NutritionGrid nutrition={currentPhase.nutrition} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {todaysRecoveryProtocols.map((protocol, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <TooltipWrapper content={protocol.description}>
                  <div className="cursor-help">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {protocol.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Importance: {protocol.importance}
                    </p>
                  </div>
                </TooltipWrapper>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 3: Health & Medications */}
      <div className="p-6 bg-white shadow-lg rounded-xl dark:bg-gray-900">
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              <TooltipWrapper content="Today's medications and health updates">
                <span className="cursor-help">Health & Medications</span>
              </TooltipWrapper>
            </h3>
            <MedicationSchedule />
          </div>
          <div className="space-y-4">
            <Alert variant="warning" title="Bloodwork due in 7 days">
              Schedule your next blood panel to monitor health markers
            </Alert>
            <Alert variant="info" title="Phase Change Coming">
              {`Transitioning to next phase in ${
                14 - (cycleStatus.currentDay % 14)
              } days`}
            </Alert>
            <HealthMarkersSection />
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              leftIcon={<ClipboardDocumentCheckIcon className="w-5 h-5" />}
              onClick={() => {
                /* TODO: Implement logging */
              }}
            >
              Log Progress
            </Button>
            <Button
              variant="secondary"
              leftIcon={<ChartBarIcon className="w-5 h-5" />}
              onClick={() => {
                /* TODO: Implement tracking */
              }}
            >
              Track Metrics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
