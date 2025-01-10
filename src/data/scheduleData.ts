/**
 * @fileoverview Medication schedule data for different cycle phases
 */

export interface ScheduledMedication {
  day: number;
  medications: string[];
  completed?: boolean;
}

export const PHASE_1_MEDS: ScheduledMedication[] = [
  {
    day: 1,
    medications: [
      "Test Cyp 250 mg",
      "NPP 100 mg",
      "Anastrozole 0.5 mg",
      "Semaglutide",
    ],
  },
  {
    day: 2,
    medications: ["Anastrozole 0.5 mg"],
  },
  // Add more days as needed
];

export const PHASE_2_MEDS: ScheduledMedication[] = [
  {
    day: 71,
    medications: ["HCG 500 IU", "Semaglutide"],
  },
  // Add more days as needed
];

export const PHASE_3_MEDS: ScheduledMedication[] = [
  {
    day: 92,
    medications: ["Nolvadex 20 mg", "Clomid 50 mg", "Semaglutide"],
  },
  // Add more days as needed
];

// Cycle start date constant
export const CYCLE_START_DATE = new Date(2024, 0, 8);
