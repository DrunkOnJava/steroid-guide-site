/**
 * @fileoverview Component for displaying nutrition macros in a grid layout
 * @project     Steroid Guide Site
 * @module      NutritionGrid
 */

import { BeakerIcon } from "@heroicons/react/24/outline";
import { TooltipWrapper } from "./ui";

interface NutritionData {
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

interface NutritionGridProps {
  nutrition: NutritionData;
}

export default function NutritionGrid({ nutrition }: NutritionGridProps) {
  return (
    <div className="p-6 bg-white shadow-lg dark:bg-gray-900 rounded-xl">
      <div className="flex items-center mb-6">
        <BeakerIcon className="w-6 h-6 mr-2 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          <TooltipWrapper content="Daily macro targets optimized for muscle growth and recovery during your cycle. Adjust based on progress and response.">
            <span className="cursor-help">Nutrition</span>
          </TooltipWrapper>
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <TooltipWrapper
              content={
                <div className="space-y-1">
                  <p>
                    Daily caloric target for optimal muscle growth and recovery
                  </p>
                  <p className="text-sm">
                    • Increase if gaining less than 0.5lb/week
                  </p>
                  <p className="text-sm">
                    • Decrease if gaining more than 1lb/week
                  </p>
                  <p className="text-sm">
                    • Spread intake across 5-6 meals daily
                  </p>
                </div>
              }
            >
              <div>
                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                  Calories
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {nutrition.calories}
                </p>
              </div>
            </TooltipWrapper>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <TooltipWrapper
              content={
                <div className="space-y-1">
                  <p>
                    High-quality protein sources for muscle growth and repair
                  </p>
                  <p className="text-sm">• Consume 30-40g protein per meal</p>
                  <p className="text-sm">• Include protein with every meal</p>
                  <p className="text-sm">
                    • Best sources: lean meats, fish, eggs, whey
                  </p>
                </div>
              }
            >
              <div>
                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                  Protein
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {nutrition.protein}
                </p>
              </div>
            </TooltipWrapper>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <TooltipWrapper
              content={
                <div className="space-y-1">
                  <p>Complex carbs to fuel workouts and support recovery</p>
                  <p className="text-sm">• Higher intake around workouts</p>
                  <p className="text-sm">• Focus on low glycemic sources</p>
                  <p className="text-sm">
                    • Best sources: rice, oats, potatoes, quinoa
                  </p>
                </div>
              }
            >
              <div>
                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                  Carbs
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {nutrition.carbs}
                </p>
              </div>
            </TooltipWrapper>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <TooltipWrapper
              content={
                <div className="space-y-1">
                  <p>Healthy fats for hormone production and health</p>
                  <p className="text-sm">• Include omega-3 sources daily</p>
                  <p className="text-sm">• Moderate intake with meals</p>
                  <p className="text-sm">
                    • Best sources: nuts, avocados, olive oil, fatty fish
                  </p>
                </div>
              }
            >
              <div>
                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                  Fats
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {nutrition.fats}
                </p>
              </div>
            </TooltipWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
