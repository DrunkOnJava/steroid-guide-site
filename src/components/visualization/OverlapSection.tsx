/**
 * @fileoverview Compound overlap analysis visualization section
 */

import { memo } from "react";
import { LineChart } from "../charts";
import type { PeakOverlap } from "../../types/visualization";

interface OverlapSectionProps {
  overlaps: PeakOverlap[] | null;
}

const OverlapSection = memo(({ overlaps }: OverlapSectionProps) => {
  const maxOverlap = overlaps
    ? Math.max(...overlaps.map((day) => day.totalCompounds))
    : 0;

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Compound Overlap Analysis</h2>
      {overlaps ? (
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="h-64">
            <LineChart
              data={overlaps.map((day) => day.totalCompounds)}
              color="#dc2626"
            />
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            <p>Maximum compound overlap: {maxOverlap}</p>
            <p>Total analysis period: {overlaps.length} days</p>
            {maxOverlap > 3 && (
              <p className="mt-2 text-red-600 dark:text-red-400">
                Warning: High compound overlap detected
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No cycle data available
        </p>
      )}
    </section>
  );
});

OverlapSection.displayName = "OverlapSection";

export default OverlapSection;
