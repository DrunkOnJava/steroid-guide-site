/**
 * @fileoverview Medication adherence visualization section
 */

import { memo } from "react";
import { LineChart } from "../charts";
import type { AdherenceReport } from "../../types/visualization";

interface AdherenceSectionProps {
  report: AdherenceReport | null;
}

const AdherenceSection = memo(({ report }: AdherenceSectionProps) => {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Medication Adherence</h2>
      {report ? (
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="h-64">
            <LineChart
              data={report.dailyAdherence.map((day) => day.adherenceRate)}
              color="#2563eb"
            />
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            <p>
              Overall adherence rate: {report.overall.adherenceRate.toFixed(1)}%
            </p>
            <p>Total doses: {report.overall.total}</p>
            <p>Doses taken: {report.overall.taken}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No adherence data available
        </p>
      )}
    </section>
  );
});

AdherenceSection.displayName = "AdherenceSection";

export default AdherenceSection;
