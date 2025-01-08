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
      <h3 className="text-xl font-semibold mb-4 px-4 py-2 bg-gray-100 rounded-lg">
        {title}
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {days.map((day) => (
          <div
            key={day.day}
            className={`${bgColor} rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200`}
          >
            <div className="px-4 py-3 bg-opacity-75 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">
                  Day {day.day}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {day.date}
                </span>
              </div>
            </div>
            <div className="p-4">
              {day.medications.map((med, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-700 mb-2 last:mb-0 pl-4 border-l-2 border-gray-200"
                >
                  {med}
                </div>
              ))}
              {day.medications.length === 0 && (
                <div className="text-sm text-gray-500 italic pl-4 border-l-2 border-gray-200">
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Cycle Schedule
        </h2>
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-100 mr-2 ring-2 ring-blue-200"></div>
            <span className="text-sm font-medium">Main Phase (Weeks 1-10)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-100 mr-2 ring-2 ring-green-200"></div>
            <span className="text-sm font-medium">
              Bridging Phase (Weeks 11-13)
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-purple-100 mr-2 ring-2 ring-purple-200"></div>
            <span className="text-sm font-medium">PCT Phase (Weeks 14-18)</span>
          </div>
        </div>
      </div>

      {renderPhase("Weeks 1-10 (Days 1-70)", phase1Days, "bg-blue-50")}
      {renderPhase("Weeks 11-13 (Days 71-91)", phase2Days, "bg-green-50")}
      {renderPhase("Weeks 14-18 (Days 92-126)", phase3Days, "bg-purple-50")}
    </div>
  );
};

export default MedicationSchedule;
