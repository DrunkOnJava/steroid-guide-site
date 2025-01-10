/**
 * @fileoverview TypeScript interface definitions for medication schedule data structures
 * @project     Steroid Guide Site
 * @module      types/schedule
 */

export type PhaseType = "loading" | "maintenance" | "pct" | "bridge" | "custom";

export interface DaySchedule {
  day: number;
  date: string;
  medications: (string | JSX.Element)[];
}

export interface PhaseSchedule {
  title: string;
  type: PhaseType;
  days: DaySchedule[];
  description?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
}

export interface MedicationFrequency {
  type: "daily" | "eod" | "weekly" | "biweekly" | "custom";
  value: string;
  description?: string;
  timing?: string;
}

export interface MedicationDetails {
  id: string;
  name: string;
  type: "anabolic" | "peptide" | "sarm" | "ancillary" | "custom";
  dosage: string;
  frequency: MedicationFrequency;
  notes?: string;
  warning?: string;
}
