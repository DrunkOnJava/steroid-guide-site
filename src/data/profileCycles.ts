/**
 * @fileoverview Types and utilities for managing cycle data
 */

import { z } from "zod";

// Zod schema for validation
export const cycleSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  compounds: z.array(
    z.object({
      name: z.string(),
      dosage: z.number(),
      frequency: z.string(),
      unit: z.string(),
    })
  ),
  notes: z.string().optional(),
});

export type Cycle = z.infer<typeof cycleSchema>;

// Helper functions for cycle management
export const calculateCycleDuration = (cycle: Cycle): number => {
  const start = new Date(cycle.startDate);
  const end = new Date(cycle.endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

export const calculateTotalDosage = (
  cycle: Cycle,
  compoundName: string
): number => {
  const compound = cycle.compounds.find((c) => c.name === compoundName);
  if (!compound) return 0;

  const duration = calculateCycleDuration(cycle);
  const dosagesPerDay = getFrequencyPerDay(compound.frequency);
  return compound.dosage * dosagesPerDay * duration;
};

export const getFrequencyPerDay = (frequency: string): number => {
  switch (frequency.toLowerCase()) {
    case "daily":
      return 1;
    case "twice daily":
      return 2;
    case "every other day":
      return 0.5;
    case "weekly":
      return 1 / 7;
    default:
      return 1;
  }
};

export const validateCycle = (cycle: unknown): cycle is Cycle => {
  const result = cycleSchema.safeParse(cycle);
  return result.success;
};

export const generateScheduleFromCycle = (cycle: Cycle) => {
  const schedule = [];
  const start = new Date(cycle.startDate);
  const end = new Date(cycle.endDate);
  const current = new Date(start);

  while (current <= end) {
    const daySchedule = {
      date: current.toISOString().split("T")[0],
      medications: cycle.compounds
        .map((compound) => {
          const frequency = compound.frequency.toLowerCase();
          const shouldTakeToday =
            frequency === "daily" ||
            frequency === "twice daily" ||
            (frequency === "every other day" &&
              Math.floor(
                (current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
              ) %
                2 ===
                0) ||
            (frequency === "weekly" && current.getDay() === start.getDay());

          return {
            name: compound.name,
            dosage: compound.dosage,
            unit: compound.unit,
            timeOfDay:
              frequency === "twice daily"
                ? ["morning", "evening"]
                : ["morning"],
            take: shouldTakeToday,
          };
        })
        .filter((med) => med.take),
    };

    if (daySchedule.medications.length > 0) {
      schedule.push(daySchedule);
    }

    current.setDate(current.getDate() + 1);
  }

  return schedule;
};

// Utility functions for cycle visualization
export const generateCycleTimeline = (cycle: Cycle) => {
  const duration = calculateCycleDuration(cycle);
  const timeline = new Array(duration).fill(null).map((_, index) => {
    const date = new Date(cycle.startDate);
    date.setDate(date.getDate() + index);

    return {
      date: date.toISOString().split("T")[0],
      compounds: cycle.compounds.map((compound) => {
        const frequency = compound.frequency.toLowerCase();
        const shouldTake =
          frequency === "daily" ||
          frequency === "twice daily" ||
          (frequency === "every other day" && index % 2 === 0) ||
          (frequency === "weekly" && index % 7 === 0);

        return {
          name: compound.name,
          dosage: shouldTake ? compound.dosage : 0,
          unit: compound.unit,
        };
      }),
    };
  });

  return timeline;
};

export const calculatePeakOverlap = (cycle: Cycle) => {
  const timeline = generateCycleTimeline(cycle);
  return timeline.map((day) => ({
    date: day.date,
    totalCompounds: day.compounds.filter((c) => c.dosage > 0).length,
  }));
};

export const analyzeCompoundInteractions = (cycle: Cycle) => {
  const compounds = cycle.compounds;
  const interactions = [];

  for (let i = 0; i < compounds.length; i++) {
    for (let j = i + 1; j < compounds.length; j++) {
      const overlap = calculateCompoundOverlap(compounds[i], compounds[j]);
      if (overlap > 0) {
        interactions.push({
          compound1: compounds[i].name,
          compound2: compounds[j].name,
          daysOverlap: overlap,
        });
      }
    }
  }

  return interactions;
};

const calculateCompoundOverlap = (
  compound1: Cycle["compounds"][0],
  compound2: Cycle["compounds"][0]
) => {
  const freq1 = getFrequencyPerDay(compound1.frequency);
  const freq2 = getFrequencyPerDay(compound2.frequency);

  if (freq1 === 0 || freq2 === 0) return 0;

  // Calculate days where both compounds are taken
  const lcm = calculateLCM(1 / freq1, 1 / freq2);
  return Math.floor(lcm);
};

const calculateLCM = (a: number, b: number) => {
  const gcd = (x: number, y: number): number => {
    return y === 0 ? x : gcd(y, x % y);
  };
  return (a * b) / gcd(a, b);
};
