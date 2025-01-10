/**
 * @fileoverview Compound interactions visualization section
 */

import { memo } from "react";
import { BarChart } from "../charts";
import type { CompoundInteraction } from "../../types/visualization";

interface InteractionSectionProps {
  interactions: CompoundInteraction[] | null;
}

const InteractionSection = memo(({ interactions }: InteractionSectionProps) => {
  const maxInteraction = interactions
    ? Math.max(...interactions.map((i) => i.daysOverlap))
    : 0;

  const significantInteractions =
    interactions?.filter((i) => i.daysOverlap > 7).length ?? 0;

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Compound Interactions</h2>
      {interactions ? (
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="h-64">
            <BarChart
              data={interactions.map((i) => i.daysOverlap)}
              color="#7c3aed"
            />
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            <p>Total interactions analyzed: {interactions.length}</p>
            <p>Maximum overlap duration: {maxInteraction} days</p>
            {significantInteractions > 0 && (
              <p className="mt-2 text-purple-600 dark:text-purple-400">
                {significantInteractions} significant interaction
                {significantInteractions === 1 ? "" : "s"} detected (&gt;7 days)
              </p>
            )}
          </div>
          <div className="mt-4 space-y-2">
            {interactions
              .filter((i) => i.daysOverlap > 7)
              .map((interaction, index) => (
                <div
                  key={index}
                  className="p-2 text-sm rounded bg-purple-50 dark:bg-purple-900/20"
                >
                  <p className="font-medium text-purple-900 dark:text-purple-100">
                    {interaction.compound1} + {interaction.compound2}
                  </p>
                  <p className="text-purple-700 dark:text-purple-300">
                    {interaction.daysOverlap} days of overlap
                  </p>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No interaction data available
        </p>
      )}
    </section>
  );
});

InteractionSection.displayName = "InteractionSection";

export default InteractionSection;
