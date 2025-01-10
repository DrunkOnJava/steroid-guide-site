/**
 * @fileoverview Types for user profiles and schedules
 */

export interface Schedule {
  id: string;
  cycleId: string;
  date: string;
  completed: boolean;
  medications: Array<{
    name: string;
    dosage: number;
    unit: string;
    timeOfDay: string;
    taken: boolean;
  }>;
}

export interface Cycle {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  compounds: Array<{
    name: string;
    dosage: number;
    frequency: string;
    unit: string;
  }>;
  notes?: string;
}

export interface Profile {
  id: string;
  name: string;
  schedules: Schedule[];
  cycles: Cycle[];
  createdAt: string;
  updatedAt: string;
}
