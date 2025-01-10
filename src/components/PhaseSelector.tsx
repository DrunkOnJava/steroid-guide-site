/**
 * @fileoverview Component for phase selection tabs
 * @project     Steroid Guide Site
 * @module      PhaseSelector
 */

import { Tab } from "@headlessui/react";
import type { ReactNode } from "react";

interface WorkoutDay {
  name: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
  }[];
}

interface Phase {
  title: string;
  description: ReactNode;
  workoutDays: WorkoutDay[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
  };
}

interface PhaseSelectorProps {
  phases: Phase[];
  selectedPhase: number;
  onChange: (index: number) => void;
  children: ReactNode;
}

export default function PhaseSelector({
  phases,
  selectedPhase,
  onChange,
  children,
}: PhaseSelectorProps) {
  return (
    <Tab.Group selectedIndex={selectedPhase} onChange={onChange}>
      <Tab.List className="flex p-2 mb-8 space-x-4 bg-gray-100 rounded-lg dark:bg-gray-800">
        {phases.map((phase, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              `flex-1 py-3 px-4 rounded-lg font-medium focus:outline-none ${
                selected
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            {phase.title.split(" ")[0]}{" "}
            {/* Display first word of phase title */}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels>
        {phases.map((phase, idx) => (
          <Tab.Panel key={idx}>
            <div className="mb-4 text-gray-600 dark:text-gray-300">
              {phase.description}
            </div>
            {children}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
