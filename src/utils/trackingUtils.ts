/**
 * @fileoverview Tracking utilities for medication adherence and progress monitoring
 * @project     Steroid Guide Site
 * @module      utils/trackingUtils
 */

import { createValidationError } from "./errorUtils";
import { isSameDay } from "./dateUtils";
import type { Dose, Medication } from "./medicationUtils";

export interface AdherenceMetrics {
  adherenceRate: number;
  missedDoses: number;
  lateAdministrations: number;
  streak: number;
}

export interface Measurement {
  timestamp: Date;
  type: string;
  value: number;
  unit: string;
}

export interface ProgressMetrics {
  trend: "increasing" | "decreasing" | "stable";
  percentageChange: number;
  averageValue: number;
  minValue: number;
  maxValue: number;
}

export interface PatternAnalysis {
  timeOfDay: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  };
  daysOfWeek: Record<string, number>;
  commonSkipDays: string[];
}

/**
 * Calculates medication adherence metrics
 */
export const calculateAdherence = (
  scheduled: Dose[],
  taken: Dose[],
  gracePeriodHours = 1
): AdherenceMetrics => {
  const sortedScheduled = [...scheduled].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  let currentStreak = 0;
  let maxStreak = 0;
  let missedDoses = 0;
  let lateAdministrations = 0;

  for (const dose of sortedScheduled) {
    const matchingDose = taken.find(
      (t) =>
        t.medicationId === dose.medicationId &&
        isSameDay(t.timestamp, dose.timestamp)
    );

    if (!matchingDose) {
      missedDoses++;
      currentStreak = 0;
      continue;
    }

    const hoursDifference =
      (matchingDose.timestamp.getTime() - dose.timestamp.getTime()) /
      (1000 * 60 * 60);

    if (hoursDifference > gracePeriodHours) {
      lateAdministrations++;
    }

    currentStreak++;
    maxStreak = Math.max(maxStreak, currentStreak);
  }

  const adherenceRate =
    ((scheduled.length - missedDoses) / scheduled.length) * 100;

  return {
    adherenceRate: Number(adherenceRate.toFixed(2)),
    missedDoses,
    lateAdministrations,
    streak: maxStreak,
  };
};

/**
 * Analyzes progress metrics over time
 */
export const trackProgress = (measurements: Measurement[]): ProgressMetrics => {
  if (measurements.length < 2) {
    throw createValidationError(
      "At least two measurements are required for progress tracking"
    );
  }

  const sortedMeasurements = [...measurements].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  const values = sortedMeasurements.map((m) => m.value);
  const firstValue = values[0];
  const lastValue = values[values.length - 1];
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const averageValue =
    values.reduce((sum, val) => sum + val, 0) / values.length;

  const percentageChange = ((lastValue - firstValue) / firstValue) * 100;

  let trend: "increasing" | "decreasing" | "stable";
  if (percentageChange > 2) {
    trend = "increasing";
  } else if (percentageChange < -2) {
    trend = "decreasing";
  } else {
    trend = "stable";
  }

  return {
    trend,
    percentageChange: Number(percentageChange.toFixed(2)),
    averageValue: Number(averageValue.toFixed(2)),
    minValue: Number(minValue.toFixed(2)),
    maxValue: Number(maxValue.toFixed(2)),
  };
};

/**
 * Identifies patterns in medication usage
 */
export const analyzePatterns = (doses: Dose[]): PatternAnalysis => {
  const timeOfDay = {
    morning: 0, // 6-12
    afternoon: 0, // 12-18
    evening: 0, // 18-24
    night: 0, // 0-6
  };

  const daysOfWeek: Record<string, number> = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  const missedDays = new Set<string>();

  doses.forEach((dose) => {
    // Convert UTC to local time for accurate time of day tracking
    const localHour = new Date(dose.timestamp).getHours();
    const day = dose.timestamp.toLocaleDateString("en-US", {
      weekday: "long",
    });

    // Track time of day
    if (localHour >= 6 && localHour < 12) timeOfDay.morning++;
    else if (localHour >= 12 && localHour < 18) timeOfDay.afternoon++;
    else if (localHour >= 18) timeOfDay.evening++;
    else timeOfDay.night++;

    // Track days of week
    if (!dose.taken) {
      missedDays.add(day);
    }
    daysOfWeek[day]++;
  });

  // Find days with high miss rates
  const commonSkipDays = Object.entries(daysOfWeek)
    .filter(([, count]) => count > 0)
    .map(([day, count]) => ({
      day,
      missRate: missedDays.has(day) ? 1 / count : 0,
    }))
    .filter((day) => day.missRate > 0.3)
    .map((day) => day.day);

  return {
    timeOfDay,
    daysOfWeek,
    commonSkipDays,
  };
};

/**
 * Generates a comprehensive progress report
 */
export const generateReport = (
  medication: Medication,
  doses: Dose[],
  measurements: Measurement[]
): string => {
  const adherence = calculateAdherence(
    doses.filter((d) => !d.taken),
    doses.filter((d) => d.taken)
  );

  const progress = measurements.length > 1 ? trackProgress(measurements) : null;
  const patterns = analyzePatterns(doses);

  let report = `Medication Report for ${medication.name}\n\n`;

  // Adherence Section
  report += "Adherence Metrics:\n";
  report += `- Adherence Rate: ${adherence.adherenceRate}%\n`;
  report += `- Missed Doses: ${adherence.missedDoses}\n`;
  report += `- Late Administrations: ${adherence.lateAdministrations}\n`;
  report += `- Current Streak: ${adherence.streak} doses\n\n`;

  // Progress Section
  if (progress) {
    report += "Progress Metrics:\n";
    report += `- Trend: ${progress.trend}\n`;
    report += `- Change: ${progress.percentageChange}%\n`;
    report += `- Average: ${progress.averageValue}\n`;
    report += `- Range: ${progress.minValue} - ${progress.maxValue}\n\n`;
  }

  // Patterns Section
  report += "Usage Patterns:\n";
  report += "- Time of Day Distribution:\n";
  Object.entries(patterns.timeOfDay).forEach(([time, count]) => {
    report += `  ${time}: ${count} doses\n`;
  });

  if (patterns.commonSkipDays.length > 0) {
    report += "\nDays with High Miss Rates:\n";
    patterns.commonSkipDays.forEach((day) => {
      report += `- ${day}\n`;
    });
  }

  return report;
};

/**
 * Calculates compliance score (0-100)
 */
interface ProgressData {
  workoutCompleted?: boolean;
  medicationsTaken?: boolean;
  recoveryProtocolsFollowed?: boolean;
  notes?: string;
}

interface MetricsData {
  healthMarkers?: {
    weight?: number;
    bloodPressure?: string;
    restingHeartRate?: number;
  };
  training?: {
    mainLifts?: {
      benchPress?: number;
      squat?: number;
      deadlift?: number;
    };
    bodyMeasurements?: {
      chest?: number;
      waist?: number;
      arms?: number;
    };
  };
  nutrition?: {
    caloriesConsumed?: number;
    proteinConsumed?: number;
    waterIntake?: number;
  };
}

export const logProgress = (data: ProgressData): void => {
  // In a real app, this would send data to a backend
  console.log("Progress logged:", data);
};

export const trackMetrics = (data: MetricsData): void => {
  // In a real app, this would send metrics to a backend
  console.log("Metrics tracked:", data);
};

export const calculateComplianceScore = (
  scheduled: Dose[],
  taken: Dose[]
): number => {
  const adherence = calculateAdherence(scheduled, taken);
  const baseScore = adherence.adherenceRate;

  // Penalties
  const latePenalty = (adherence.lateAdministrations / scheduled.length) * 10;
  const streakBonus = Math.min((adherence.streak / 7) * 5, 10); // Up to 10% bonus for streaks

  const finalScore = Math.max(
    0,
    Math.min(100, baseScore - latePenalty + streakBonus)
  );
  return Number(finalScore.toFixed(2));
};
