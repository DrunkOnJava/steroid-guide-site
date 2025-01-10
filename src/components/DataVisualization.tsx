/**
 * @fileoverview Data visualization components for cycle and adherence tracking
 */

import { memo, useMemo } from "react";
import { useProfile } from "../contexts/profile.hooks";
import { generateAdherenceReport } from "../data/profileSchedules";
import {
  calculatePeakOverlap,
  analyzeCompoundInteractions,
} from "../data/profileCycles";
import {
  AdherenceSection,
  OverlapSection,
  InteractionSection,
  StatsSection,
} from "./visualization";
import type { VisualizationData } from "../types/visualization";

export const DataVisualization = memo(() => {
  const { activeProfile } = useProfile();

  const { report, overlaps, interactions } = useMemo<VisualizationData>(() => {
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
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        Select a profile to view analytics
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdherenceSection report={report} />
      <OverlapSection overlaps={overlaps} />
      <InteractionSection interactions={interactions} />
      <StatsSection profile={activeProfile} />
    </div>
  );
});

DataVisualization.displayName = "DataVisualization";
