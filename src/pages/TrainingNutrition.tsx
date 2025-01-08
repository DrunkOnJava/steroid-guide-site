import { useState } from "react";
import { Tab } from "@headlessui/react";
import {
  ChartBarIcon,
  BeakerIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

interface WorkoutDay {
  name: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
  }[];
}

interface PhaseData {
  title: string;
  description: string;
  workoutDays: WorkoutDay[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
  };
}

export default function TrainingNutrition() {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const phases: PhaseData[] = [
    {
      title: "Main Cycle Phase (Weeks 1-10)",
      description:
        "Capitalize on enhanced recovery with increased volume and progressive overload",
      workoutDays: [
        {
          name: "Push Day A",
          exercises: [
            { name: "Bench Press", sets: "4", reps: "6-8" },
            { name: "Incline DB Press", sets: "4", reps: "8-10" },
            { name: "Shoulder Press", sets: "4", reps: "8-10" },
            { name: "Lateral Raises", sets: "4", reps: "12-15" },
            { name: "Tricep Pushdowns", sets: "4", reps: "10-12" },
            { name: "Overhead Extensions", sets: "3", reps: "12-15" },
          ],
        },
        {
          name: "Pull Day A",
          exercises: [
            { name: "Barbell Rows", sets: "4", reps: "6-8" },
            { name: "Weighted Pull-ups", sets: "4", reps: "8-10" },
            { name: "Face Pulls", sets: "3", reps: "15-20" },
            { name: "Barbell Curls", sets: "4", reps: "8-10" },
            { name: "Hammer Curls", sets: "3", reps: "12-15" },
            { name: "Rear Delt Flies", sets: "3", reps: "15-20" },
          ],
        },
        {
          name: "Legs A",
          exercises: [
            { name: "Squats", sets: "5", reps: "6-8" },
            { name: "Romanian Deadlifts", sets: "4", reps: "8-10" },
            { name: "Leg Press", sets: "4", reps: "10-12" },
            { name: "Leg Extensions", sets: "3", reps: "12-15" },
            { name: "Leg Curls", sets: "3", reps: "12-15" },
            { name: "Standing Calf Raises", sets: "4", reps: "15-20" },
          ],
        },
      ],
      nutrition: {
        calories: "500-700 above maintenance",
        protein: "2.0-2.2g per pound bodyweight",
        carbs: "2.5-3.0g per pound bodyweight",
        fats: "0.5g per pound bodyweight",
      },
    },
    {
      title: "Transition Phase (Weeks 11-16)",
      description: "Maintain intensity while gradually reducing volume",
      workoutDays: [
        {
          name: "Upper Body Focus",
          exercises: [
            { name: "Incline Bench", sets: "4", reps: "8-10" },
            { name: "DB Shoulder Press", sets: "4", reps: "8-10" },
            { name: "Cable Flies", sets: "4", reps: "12-15" },
            { name: "Lat Pulldowns", sets: "4", reps: "10-12" },
            { name: "Face Pulls", sets: "3", reps: "15-20" },
            { name: "Tricep/Bicep Supersets", sets: "3", reps: "12-15" },
          ],
        },
        {
          name: "Lower Body Focus",
          exercises: [
            { name: "Front Squats", sets: "4", reps: "8-10" },
            { name: "Walking Lunges", sets: "3", reps: "12/leg" },
            { name: "Hack Squats", sets: "3", reps: "10-12" },
            { name: "Leg Extensions", sets: "3", reps: "15-20" },
            { name: "Leg Curls", sets: "3", reps: "15-20" },
            { name: "Seated Calf Raises", sets: "4", reps: "15-20" },
          ],
        },
      ],
      nutrition: {
        calories: "300-400 above maintenance",
        protein: "2.0g per pound bodyweight",
        carbs: "2.0-2.5g per pound bodyweight",
        fats: "0.5g per pound bodyweight",
      },
    },
    {
      title: "PCT Phase (Weeks 17-21)",
      description: "Focus on maintaining gains while reducing volume",
      workoutDays: [
        {
          name: "Full Body A",
          exercises: [
            { name: "Bench Press", sets: "3", reps: "8-10" },
            { name: "Barbell Rows", sets: "3", reps: "8-10" },
            { name: "Shoulder Press", sets: "3", reps: "10-12" },
            { name: "Leg Press", sets: "3", reps: "12-15" },
            { name: "Tricep Pushdowns", sets: "3", reps: "12-15" },
            { name: "Bicep Curls", sets: "3", reps: "12-15" },
          ],
        },
        {
          name: "Full Body B",
          exercises: [
            { name: "Squats", sets: "3", reps: "8-10" },
            { name: "Pull-ups", sets: "3", reps: "8-10" },
            { name: "Incline Press", sets: "3", reps: "10-12" },
            { name: "Romanian Deadlifts", sets: "3", reps: "10-12" },
            { name: "Lateral Raises", sets: "3", reps: "12-15" },
            { name: "Face Pulls", sets: "3", reps: "15-20" },
          ],
        },
      ],
      nutrition: {
        calories: "Maintenance level",
        protein: "2.0g per pound bodyweight",
        carbs: "1.5-2.0g per pound bodyweight",
        fats: "0.5g per pound bodyweight",
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
        Training & Nutrition Guide
      </h1>

      <Tab.Group
        selectedIndex={selectedPhase}
        onChange={(index) => setSelectedPhase(index)}
      >
        <Tab.List className="flex space-x-4 bg-gray-100 p-2 rounded-lg mb-8">
          <Tab
            className={({ selected }) =>
              `flex-1 py-3 px-4 rounded-lg font-medium focus:outline-none ${
                selected
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            Main Cycle
          </Tab>
          <Tab
            className={({ selected }) =>
              `flex-1 py-3 px-4 rounded-lg font-medium focus:outline-none ${
                selected
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            Transition
          </Tab>
          <Tab
            className={({ selected }) =>
              `flex-1 py-3 px-4 rounded-lg font-medium focus:outline-none ${
                selected
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            PCT
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {phases.map((phase, idx) => (
            <Tab.Panel key={idx}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Training Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-6">
                    <ChartBarIcon className="h-6 w-6 text-blue-500 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Training
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {phase.workoutDays.map((day) => (
                      <div
                        key={day.name}
                        className="border rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setExpandedDay(
                              expandedDay === day.name ? null : day.name
                            )
                          }
                          className="w-full px-4 py-3 bg-gray-50 flex justify-between items-center"
                        >
                          <span className="font-medium text-gray-900">
                            {day.name}
                          </span>
                          <ChartBarIcon
                            className={`h-5 w-5 text-gray-400 transform transition-transform ${
                              expandedDay === day.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {expandedDay === day.name && (
                          <div className="p-4">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead>
                                <tr>
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                    Exercise
                                  </th>
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                    Sets
                                  </th>
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                    Reps
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {day.exercises.map((exercise, i) => (
                                  <tr key={i}>
                                    <td className="px-4 py-2 text-sm text-gray-900">
                                      {exercise.name}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                      {exercise.sets}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                      {exercise.reps}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nutrition Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-6">
                    <BeakerIcon className="h-6 w-6 text-blue-500 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Nutrition
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Calories</p>
                        <p className="font-medium text-gray-900">
                          {phase.nutrition.calories}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Protein</p>
                        <p className="font-medium text-gray-900">
                          {phase.nutrition.protein}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Carbs</p>
                        <p className="font-medium text-gray-900">
                          {phase.nutrition.carbs}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Fats</p>
                        <p className="font-medium text-gray-900">
                          {phase.nutrition.fats}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* Recovery Section */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <HeartIcon className="h-6 w-6 text-blue-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Recovery</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Sleep Protocol</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 8-9 hours nightly minimum</li>
              <li>• Consistent sleep/wake schedule</li>
              <li>• Dark room, cool temperature</li>
              <li>• No screens 1 hour before bed</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              Stress Management
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Daily meditation or relaxation</li>
              <li>• Regular massage or foam rolling</li>
              <li>• Contrast showers post-workout</li>
              <li>• Active recovery on rest days</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Recovery Markers</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Morning heart rate</li>
              <li>• Sleep quality</li>
              <li>• Training performance</li>
              <li>• Joint comfort</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
