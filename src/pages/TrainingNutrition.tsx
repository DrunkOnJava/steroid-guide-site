/**
 * @fileoverview Phase-specific training and nutrition protocols page
 * @project     Steroid Guide Site (v0.0.0)
 * @module      TrainingNutrition
 */

import { useState } from "react";
import WorkoutDay from "../components/WorkoutDay";
import NutritionGrid from "../components/NutritionGrid";
import RecoverySection from "../components/RecoverySection";
import PhaseSelector from "../components/PhaseSelector";
import { Tooltip } from "../components/ui";
import trainingData from "../data/trainingData";

// Helper function to enhance phase descriptions with tooltips
const enhanceDescription = (description: string) => {
  if (
    description.includes("volume") &&
    description.includes("progressive overload")
  ) {
    return (
      <div>
        Capitalize on enhanced recovery with{" "}
        <Tooltip content="The total amount of work performed (sets × reps × weight)">
          <span className="underline cursor-help">volume</span>
        </Tooltip>{" "}
        and{" "}
        <Tooltip content="Gradually increasing training demands to continue making progress">
          <span className="underline cursor-help">progressive overload</span>
        </Tooltip>
      </div>
    );
  }
  return description;
};

export default function TrainingNutrition() {
  const [selectedPhase, setSelectedPhase] = useState(0);

  const phases = trainingData.phases.map((phase) => ({
    ...phase,
    description: enhanceDescription(phase.description),
  }));

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-extrabold text-gray-900 dark:text-white">
        Training & Nutrition Guide
      </h1>

      <PhaseSelector
        phases={phases}
        selectedPhase={selectedPhase}
        onChange={setSelectedPhase}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Training Section */}
          <div className="space-y-6">
            {phases[selectedPhase].workoutDays.map((day) => (
              <WorkoutDay key={day.name} {...day} />
            ))}
          </div>

          {/* Nutrition Section */}
          <NutritionGrid nutrition={phases[selectedPhase].nutrition} />
        </div>
      </PhaseSelector>

      {/* Recovery Section */}
      <RecoverySection />
    </div>
  );
}
