/**
 * @fileoverview Comprehensive medication schedule display component
 */

import React from "react";
import { useUserPreferences } from "../contexts/UserPreferencesContext";
import { Button } from "./ui/Button";
import {
  PrinterIcon,
  EnvelopeIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

interface DaySchedule {
  day: number;
  date: string;
  medications: string[];
}

const MedicationSchedule: React.FC = () => {
  const { preferences, togglePrintMode } = useUserPreferences();

  // Helper function to render a phase section
  const renderPhase = (title: string, days: DaySchedule[], bgColor: string) => (
    <div className="mb-8">
      <h3 className="px-4 py-2 mb-4 text-xl font-semibold bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-white print:text-black print:bg-transparent print:px-0 print:mb-2">
        {title}
      </h3>
      <div
        className={`grid gap-4 ${
          preferences.printMode
            ? "grid-cols-2 print:gap-2 print:grid-cols-3"
            : "md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {days.map((day) => (
          <div
            key={day.day}
            className={`${bgColor} rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 print:shadow-none print:border print:border-gray-200 print:hover:shadow-none print:text-black print:bg-white`}
          >
            <div className="px-4 py-3 bg-opacity-75 border-b border-gray-200 print:py-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800 dark:text-white print:text-black">
                  Day {day.day}
                </span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 print:text-black">
                  {day.date}
                </span>
              </div>
            </div>
            <div className="p-4 print:p-2">
              {day.medications.map((med: string, index: number) => (
                <div
                  key={index}
                  className="pl-4 mb-2 text-sm text-gray-700 border-l-2 border-gray-200 dark:text-gray-300 dark:border-gray-700 last:mb-0 print:text-black print:border-gray-300"
                >
                  {med}
                </div>
              ))}
              {day.medications.length === 0 && (
                <div className="pl-4 text-sm italic text-gray-500 border-l-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 print:text-gray-500 print:border-gray-300">
                  No medications scheduled
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`px-4 py-8 mx-auto max-w-7xl ${
        preferences.printMode ? "print-schedule" : ""
      }`}
    >
      {/* Print and Share Controls */}
      <div className="flex items-center justify-end gap-2 mb-4 print:hidden">
        <Button
          onClick={() => {
            const mailtoUrl = `mailto:?subject=Medication Schedule&body=Please find my medication schedule attached.%0D%0A%0D%0AAccess the digital version at: ${window.location.href}`;
            window.open(mailtoUrl);
          }}
          variant="outline"
          leftIcon={<EnvelopeIcon className="w-5 h-5" />}
          title="Share via email"
        >
          Email
        </Button>
        <Button
          onClick={() => {
            window.print();
          }}
          variant="outline"
          leftIcon={<ArrowDownTrayIcon className="w-5 h-5" />}
          title="Download as PDF"
        >
          Download PDF
        </Button>
        <Button
          onClick={togglePrintMode}
          variant="outline"
          leftIcon={<PrinterIcon className="w-5 h-5" />}
        >
          Print Schedule
        </Button>
      </div>

      {/* QR Code for digital access - only visible in print mode */}
      {preferences.printMode && (
        <div className="hidden print:block print:mb-8 print:text-center">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
              window.location.href
            )}`}
            alt="QR Code for digital access"
            className="mx-auto mb-2"
            width="150"
            height="150"
          />
          <p className="text-sm text-gray-600">
            Scan to access digital version
          </p>
        </div>
      )}

      <div className="p-6 mb-8 bg-white shadow-sm dark:bg-gray-900 rounded-xl print:shadow-none print:p-2 print:mb-4">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white print:text-black">
          Cycle Schedule
        </h2>
        <div className="flex flex-wrap gap-6 mb-6 print:hidden">
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

      {/* Parse and organize the schedule data */}
      {(() => {
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
          <>
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
          </>
        );
      })()}
    </div>
  );
};

export default MedicationSchedule;
