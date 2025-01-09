/**
 * @fileoverview Comprehensive medication schedule display component
 * @project     Steroid Guide Site (v0.0.0)
 * @module      MedicationSchedule
 *
 * @author      Steroid Guide Team <team@steroidguide.com>
 * @contributors
 * @maintainer  Steroid Guide Team <team@steroidguide.com>
 *
 * @created     2024-03-19
 * @modified    2024-03-19
 * @version     1.0.0
 *
 * @license     MIT - see LICENSE.md file in root directory
 * @copyright   Copyright (c) 2024 Steroid Guide
 *
 * @description
 * Advanced schedule component for displaying medication timing and dosages across multiple phases.
 *
 * Schedule Organization:
 * - Three distinct phases: Main (10 weeks), Bridging (3 weeks), PCT (5 weeks)
 * - Day-by-day breakdown with dates and weekdays
 * - Color-coded phases for visual distinction
 * - Medication grouping by administration time
 *
 * Scheduling Features:
 * - Automatic date calculation from start date
 * - Weekly pattern recognition (e.g., Sunday/Wednesday injections)
 * - Empty day handling
 * - Phase transition management
 *
 * Visual Elements:
 * - Phase indicators with color coding
 * - Card-based day display
 * - Hover effects for better interaction
 * - Responsive grid layout
 *
 * Data Management:
 * - Dynamic schedule generation
 * - Flexible medication arrays
 * - Date formatting and manipulation
 * - Phase-specific logic handling
 *
 * @example
 * ```tsx
 * import MedicationSchedule from './MedicationSchedule';
 *
 * function SchedulePage() {
 *   return (
 *     <div className="container mx-auto">
 *       <h1>Cycle Schedule</h1>
 *       <MedicationSchedule />
 *     </div>
 *   );
 * }
 *
 * // Schedule Structure:
 * // Phase 1 (Weeks 1-10):
 * // - Test Cyp 250mg + NPP 100mg (Sun/Wed)
 * // - Anastrozole 0.5mg (daily)
 * // - Semaglutide (Wed)
 * //
 * // Phase 2 (Weeks 11-13):
 * // - HCG 500 IU (Sun/Wed)
 * // - Semaglutide (Wed)
 * //
 * // Phase 3 (Weeks 14-18):
 * // - Nolvadex 20mg (daily)
 * // - Clomid 50mg (daily)
 * // - Semaglutide (Wed)
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - TypeScript type definitions
 *
 * @requirements
 * - Tailwind CSS for styling
 * - Modern browser with CSS Grid support
 * - JavaScript Date object support
 * - Parent container with appropriate width
 * - Proper date localization support
 */

import React from "react";

interface DaySchedule {
  day: number;
  date: string;
  medications: string[];
}

const MedicationSchedule: React.FC = () => {
  // Helper function to render a phase section
  const renderPhase = (title: string, days: DaySchedule[], bgColor: string) => (
    <div className="mb-8">
      <h3 className="px-4 py-2 mb-4 text-xl font-semibold bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-white">
        {title}
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {days.map((day) => (
          <div
            key={day.day}
            className={`${bgColor} rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200`}
          >
            <div className="px-4 py-3 bg-opacity-75 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800 dark:text-white">
                  Day {day.day}
                </span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {day.date}
                </span>
              </div>
            </div>
            <div className="p-4">
              {day.medications.map((med, index) => (
                <div
                  key={index}
                  className="pl-4 mb-2 text-sm text-gray-700 border-l-2 border-gray-200 dark:text-gray-300 dark:border-gray-700 last:mb-0"
                >
                  {med}
                </div>
              ))}
              {day.medications.length === 0 && (
                <div className="pl-4 text-sm italic text-gray-500 border-l-2 border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  No medications scheduled
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Parse and organize the schedule data
  const phase1Days: DaySchedule[] = Array.from({ length: 70 }, (_, i) => {
    const day = i + 1;
    const meds = ["Anastrozole 0.5 mg"];

    // Every Sunday and Wednesday
    if (day % 7 === 1 || day % 7 === 5) {
      meds.unshift("Test Cyp 250 mg", "NPP 100 mg");
    }

    // Every Wednesday
    if (day % 7 === 1) {
      meds.push("Semaglutide");
    }

    // Calculate date starting from Jan 8
    const date = new Date(2024, 0, 8);
    date.setDate(date.getDate() + i);
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return { day, date: dateStr, medications: meds };
  });

  const phase2Days: DaySchedule[] = Array.from({ length: 21 }, (_, i) => {
    const day = i + 71;
    const meds = [];

    // Every Wednesday and Sunday
    if (day % 7 === 1) {
      meds.push("HCG 500 IU", "Semaglutide");
    } else if (day % 7 === 5) {
      meds.push("HCG 500 IU");
    }

    const date = new Date(2024, 0, 8);
    date.setDate(date.getDate() + i + 70);
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return { day, date: dateStr, medications: meds };
  });

  const phase3Days: DaySchedule[] = Array.from({ length: 35 }, (_, i) => {
    const day = i + 92;
    const meds = ["Nolvadex 20 mg", "Clomid 50 mg"];

    // Every Wednesday
    if (day % 7 === 1) {
      meds.push("Semaglutide");
    }

    const date = new Date(2024, 0, 8);
    date.setDate(date.getDate() + i + 91);
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return { day, date: dateStr, medications: meds };
  });

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <div className="p-6 mb-8 bg-white shadow-sm dark:bg-gray-900 rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
          Cycle Schedule
        </h2>
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 bg-blue-100 rounded-full ring-2 ring-blue-200"></div>
            <span className="text-sm font-medium dark:text-gray-300">
              Main Phase (Weeks 1-10)
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 bg-green-100 rounded-full ring-2 ring-green-200"></div>
            <span className="text-sm font-medium dark:text-gray-300">
              Bridging Phase (Weeks 11-13)
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 bg-purple-100 rounded-full ring-2 ring-purple-200"></div>
            <span className="text-sm font-medium dark:text-gray-300">
              PCT Phase (Weeks 14-18)
            </span>
          </div>
        </div>
      </div>

      {renderPhase(
        "Weeks 1-10 (Days 1-70)",
        phase1Days,
        "bg-blue-50 dark:bg-blue-950/50"
      )}
      {renderPhase(
        "Weeks 11-13 (Days 71-91)",
        phase2Days,
        "bg-green-50 dark:bg-green-950/50"
      )}
      {renderPhase(
        "Weeks 14-18 (Days 92-126)",
        phase3Days,
        "bg-purple-50 dark:bg-purple-950/50"
      )}
    </div>
  );
};

export default MedicationSchedule;
