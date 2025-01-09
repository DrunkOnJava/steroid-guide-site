/**
 * @fileoverview Data visualization components for cycle and adherence tracking
 */

import { useMemo } from "react";
import { useProfile } from "../contexts/ProfileContext";
import {
  analyzeAdherence,
  generateAdherenceReport,
} from "../data/profileSchedules";
import {
  calculatePeakOverlap,
  analyzeCompoundInteractions,
} from "../data/profileCycles";

interface ChartProps {
  data: number[];
  height?: number;
  color?: string;
}

function LineChart({ data, height = 200, color = "#2563eb" }: ChartProps) {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  const width = 100 / (data.length - 1);

  const points = data
    .map((value, index) => {
      const x = index * width;
      const y = ((value - minValue) / range) * height;
      return `${x},${height - y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      {/* Add dots at data points */}
      {data.map((value, index) => {
        const x = index * width;
        const y = height - ((value - minValue) / range) * height;
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="2"
            fill={color}
            className="transition-all duration-200 hover:r-3"
          />
        );
      })}
    </svg>
  );
}

function BarChart({ data, height = 200, color = "#2563eb" }: ChartProps) {
  const maxValue = Math.max(...data);
  const barWidth = 100 / data.length;

  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      {data.map((value, index) => {
        const barHeight = (value / maxValue) * height;
        const x = index * barWidth;
        const y = height - barHeight;
        return (
          <rect
            key={index}
            x={x + barWidth * 0.1}
            y={y}
            width={barWidth * 0.8}
            height={barHeight}
            fill={color}
            className="transition-opacity duration-200 opacity-80 hover:opacity-100"
          />
        );
      })}
    </svg>
  );
}

export function DataVisualization() {
  const { activeProfile } = useProfile();

  interface DailyAdherence {
    date: string;
    total: number;
    taken: number;
    adherenceRate: number;
    missedDoses: number;
  }

  interface AdherenceReport {
    startDate: string;
    endDate: string;
    dailyAdherence: DailyAdherence[];
    overall: {
      total: number;
      taken: number;
      adherenceRate: number;
      missedDoses: number;
    };
  }

  interface PeakOverlap {
    date: string;
    totalCompounds: number;
  }

  interface CompoundInteraction {
    compound1: string;
    compound2: string;
    daysOverlap: number;
  }

  const { report, overlaps, interactions } = useMemo<{
    report: AdherenceReport | null;
    overlaps: PeakOverlap[] | null;
    interactions: CompoundInteraction[] | null;
  }>(() => {
    if (!activeProfile?.schedules.length) {
      return { report: null, overlaps: null, interactions: null };
    }

    const report = generateAdherenceReport(
      activeProfile.schedules,
      activeProfile.schedules[0].date,
      activeProfile.schedules[activeProfile.schedules.length - 1].date
    );

    if (!activeProfile.cycles.length) {
      return { report, overlaps: null, interactions: null };
    }

    const activeCycle = activeProfile.cycles[0];
    const overlaps = calculatePeakOverlap(activeCycle);
    const interactions = analyzeCompoundInteractions(activeCycle);

    return { report, overlaps, interactions };
  }, [activeProfile?.schedules, activeProfile?.cycles]);

  if (!activeProfile) {
    return (
      <div className="p-4 text-center text-gray-500">
        Select a profile to view analytics
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-xl font-semibold">Medication Adherence</h2>
        {report ? (
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="h-64">
              <LineChart
                data={report.dailyAdherence.map(
                  (day: DailyAdherence) => day.adherenceRate
                )}
                color="#2563eb"
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No adherence data available</p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">
          Compound Overlap Analysis
        </h2>
        {overlaps ? (
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="h-64">
              <LineChart
                data={overlaps.map((day: PeakOverlap) => day.totalCompounds)}
                color="#dc2626"
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No cycle data available</p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Compound Interactions</h2>
        {interactions ? (
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="h-64">
              <BarChart
                data={interactions.map(
                  (i: CompoundInteraction) => i.daysOverlap
                )}
                color="#7c3aed"
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No interaction data available</p>
        )}
      </section>

      <section className="p-4 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-xl font-semibold">Key Statistics</h2>
        {activeProfile.schedules.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg bg-blue-50">
              <h3 className="text-sm font-medium text-blue-800">
                Overall Adherence
              </h3>
              <p className="text-2xl font-bold text-blue-900">
                {analyzeAdherence(
                  activeProfile.schedules
                ).adherenceRate.toFixed(1)}
                %
              </p>
            </div>
            <div className="p-4 rounded-lg bg-green-50">
              <h3 className="text-sm font-medium text-green-800">
                Doses Taken
              </h3>
              <p className="text-2xl font-bold text-green-900">
                {analyzeAdherence(activeProfile.schedules).taken}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-red-50">
              <h3 className="text-sm font-medium text-red-800">Missed Doses</h3>
              <p className="text-2xl font-bold text-red-900">
                {analyzeAdherence(activeProfile.schedules).missedDoses}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50">
              <h3 className="text-sm font-medium text-purple-800">
                Active Cycles
              </h3>
              <p className="text-2xl font-bold text-purple-900">
                {activeProfile.cycles.length}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
