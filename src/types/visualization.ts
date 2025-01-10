/**
 * @fileoverview Types for data visualization components
 */

export interface ChartProps {
  data: number[];
  height?: number;
  color?: string;
}

export interface DailyAdherence {
  date: string;
  total: number;
  taken: number;
  adherenceRate: number;
  missedDoses: number;
}

export interface AdherenceReport {
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

export interface PeakOverlap {
  date: string;
  totalCompounds: number;
}

export interface CompoundInteraction {
  compound1: string;
  compound2: string;
  daysOverlap: number;
}

export interface VisualizationData {
  report: AdherenceReport | null;
  overlaps: PeakOverlap[] | null;
  interactions: CompoundInteraction[] | null;
}
