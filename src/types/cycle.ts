/**
 * @fileoverview Types for cycle table data and components
 */

export type PhaseType = "main" | "transition" | "pct";
export type CompoundType = "primary" | "secondary" | "support" | "pct";

export interface CycleData {
  week: string;
  compound: string;
  frequency: string;
  dosage: string;
  purpose: string;
  phase: PhaseType;
  type: CompoundType;
  tooltip?: string;
}

export type PhaseColors = Record<PhaseType, string>;
export type TypeColors = Record<CompoundType, string>;

export interface LegendItem {
  type: CompoundType;
  label: string;
  tooltip: string;
  color: string;
}

export interface TableHeaderItem {
  key: keyof Omit<CycleData, "phase" | "type" | "tooltip">;
  label: string;
  tooltip: string;
}
