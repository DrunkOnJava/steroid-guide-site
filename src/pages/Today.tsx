import { useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  BeakerIcon,
  ArrowTrendingUpIcon,
  CircleStackIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

// Utility: Convert local time to Eastern Standard Time (EST) display
function getESTDate() {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "long",
  });
}

// Calculate which day of the cycle we are on, given that Day 1 = Jan 8, 2025
function getCycleDay() {
  const cycleStart = new Date("2025-01-08T00:00:00-05:00"); // Jan 8, 2025, 00:00 EST
  const nowEST = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  // Calculate difference in days (round down)
  const diff = nowEST.getTime() - cycleStart.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayNumber = Math.floor(diff / oneDay) + 1; // +1 so cycleStart is Day 1

  // If before cycle start, treat as Day 0 (or negative if you prefer)
  return dayNumber < 1 ? 0 : dayNumber;
}

// We'll define total cycle length as 18 weeks = 126 days
const TOTAL_CYCLE_DAYS = 18 * 7;

export default function Today() {
  const [estDateTime, setEstDateTime] = useState(getESTDate());
  const [cycleDay, setCycleDay] = useState(getCycleDay());

  // Update time every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setEstDateTime(getESTDate());
      setCycleDay(getCycleDay());
    }, 60_000); // every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Determine which medications to display for "today"
  function getMedicationsForDay(day: number) {
    if (day < 1 || day > TOTAL_CYCLE_DAYS) {
      return ["The cycle hasn't started or has finished."];
    }

    // figure out which week we are in
    const week = Math.ceil(day / 7);

    // define which day of the week:
    const dayOfWeek = (day - 1) % 7;
    // day1 (Wed) => dayOfWeek=0, day2(Thu)=>1, day3(Fri)=>2, day4(Sat)=>3, day5(Sun)=>4, day6(Mon)=>5, day7(Tue)=>6

    const meds: string[] = [];

    // 1) Semaglutide every Wednesday => dayOfWeek = 0
    if (dayOfWeek === 0) {
      meds.push("Semaglutide injection (once weekly)");
    }

    // 2) Weeks 1–10: Test Cyp & NPP Wed + Sun => dayOfWeek=0 (Wed) or dayOfWeek=4 (Sun)
    if (week >= 1 && week <= 10 && (dayOfWeek === 0 || dayOfWeek === 4)) {
      meds.push("Testosterone Cypionate 250 mg (1 ml) injection");
      meds.push("Nandrolone Phenylpropionate 100 mg (1 ml) injection");
    }

    // 3) Anastrozole EOD during Weeks 1–10
    if (week >= 1 && week <= 10 && day % 2 === 1) {
      meds.push("Anastrozole 0.5 mg (1 pill)");
    }

    // 4) Weeks 11–13: HCG 500 IU twice weekly (Wed + Sun)
    if (week >= 11 && week <= 13 && (dayOfWeek === 0 || dayOfWeek === 4)) {
      meds.push("HCG 500 IU injection");
    }

    // 5) Weeks 14–18: Nolvadex 20 mg + Clomid 50 mg daily
    if (week >= 14 && week <= 18) {
      meds.push("Nolvadex (Tamoxifen) 20 mg (1 pill)");
      meds.push("Clomid (Clomiphene) 50 mg (1 pill)");
    }

    if (meds.length === 0) {
      meds.push("No medications scheduled today.");
    }

    return meds;
  }

  const medsToday = getMedicationsForDay(cycleDay);

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <PresentationChartLineIcon className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">Cycle Progress</h2>
          </div>
          <div className="text-sm font-medium text-gray-500">
            {Math.max(
              0,
              Math.min(100, (cycleDay / TOTAL_CYCLE_DAYS) * 100)
            ).toFixed(1)}
            % Complete
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${Math.max(
                0,
                Math.min(100, (cycleDay / TOTAL_CYCLE_DAYS) * 100)
              )}%`,
            }}
          />
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-6 transform transition-all duration-200 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-2">
            <BeakerIcon className="h-6 w-6 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Current Phase
            </h3>
          </div>
          <p className="text-gray-600">
            {cycleDay <= 70
              ? "Main Cycle (Weeks 1-10)"
              : cycleDay <= 91
              ? "HCG Phase (Weeks 11-13)"
              : "PCT Phase (Weeks 14-18)"}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-6 transform transition-all duration-200 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-2">
            <ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Next Milestone
            </h3>
          </div>
          <p className="text-gray-600">
            {cycleDay < 70
              ? `PCT Begins in ${71 - cycleDay} days`
              : cycleDay < 126
              ? `Cycle Ends in ${126 - cycleDay} days`
              : "Cycle Complete"}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-6 transform transition-all duration-200 hover:scale-[1.02]">
          <div className="flex items-center space-x-3 mb-2">
            <CircleStackIcon className="h-6 w-6 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Total Progress
            </h3>
          </div>
          <p className="text-gray-600">
            {cycleDay < 1
              ? "Not Started"
              : cycleDay > TOTAL_CYCLE_DAYS
              ? "Completed"
              : `Day ${cycleDay} of ${TOTAL_CYCLE_DAYS}`}
          </p>
        </div>
      </div>

      {/* Current Date Card */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-6 transform transition-all duration-200 hover:scale-[1.01]">
        <div className="flex items-center space-x-3 mb-2">
          <CalendarDaysIcon className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-800 mt-0">
            Current Date (EST)
          </h2>
        </div>
        <p className="text-sm text-gray-600 mb-0">
          {estDateTime} <br />
          {cycleDay >= 1 && cycleDay <= TOTAL_CYCLE_DAYS ? (
            <>
              <span className="font-semibold">Cycle Day: {cycleDay}</span>
              {` of ${TOTAL_CYCLE_DAYS}`}
            </>
          ) : (
            <span className="font-semibold">
              (Not within the 18-week cycle range)
            </span>
          )}
        </p>
      </div>

      {/* Today's Medications */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-6 transform transition-all duration-200 hover:scale-[1.01]">
        <div className="flex items-center space-x-3 mb-2">
          <CheckCircleIcon className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-bold text-gray-800 mt-0">
            Medications/Instructions for Today
          </h2>
        </div>
        <ul className="divide-y divide-gray-100">
          {medsToday.map((med, idx) => (
            <li
              key={idx}
              className="py-3 flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-150"
            >
              <span className="flex-shrink-0">
                {med.includes("injection") ? (
                  <BeakerIcon className="h-5 w-5 text-blue-500" />
                ) : med.includes("pill") ? (
                  <CircleStackIcon className="h-5 w-5 text-purple-500" />
                ) : (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                )}
              </span>
              <span>{med}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Complete Schedule */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-6 transform transition-all duration-200 hover:scale-[1.01]">
        <div className="flex items-center space-x-3 mb-2">
          <ClockIcon className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-800 mt-0">
            Complete 18-Week Schedule
          </h2>
        </div>
        <div className="text-sm text-gray-600 whitespace-pre-line font-mono mt-4 space-y-6">
          {/* Weeks 1-10 */}
          <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
            <BeakerIcon className="h-5 w-5 text-blue-500" />
            WEEKS 1–10 (Days 1–70)
          </h3>
          <p>
            Day 1 (Wed, Jan 8): Test Cyp 250 mg, NPP 100 mg, Anastrozole 0.5 mg,
            Semaglutide
          </p>
          <p>Day 2 (Thu, Jan 9): Anastrozole 0.5 mg</p>
          {/* ... rest of the schedule ... */}
          <p>Day 70 (Tue, Mar 18): Anastrozole 0.5 mg</p>

          {/* Weeks 11-13 */}
          <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
            <CircleStackIcon className="h-5 w-5 text-purple-500" />
            WEEKS 11–13 (Days 71–91)
          </h3>
          <p>Day 71 (Wed, Mar 19): HCG 500 IU, Semaglutide</p>
          {/* ... rest of the schedule ... */}
          <p>Day 91 (Tue, Apr 8): (No meds)</p>

          {/* Weeks 14-18 */}
          <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
            WEEKS 14–18 (Days 92–126)
          </h3>
          <p>Day 92 (Wed, Apr 9): Nolvadex 20 mg, Clomid 50 mg, Semaglutide</p>
          {/* ... rest of the schedule ... */}
          <p>Day 126 (Tue, May 13): Nolvadex 20 mg, Clomid 50 mg</p>
        </div>
      </div>
    </div>
  );
}
