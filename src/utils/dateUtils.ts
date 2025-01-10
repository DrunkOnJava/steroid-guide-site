/**
 * @fileoverview Date utility functions for handling dates and time operations
 * @project     Steroid Guide Site
 * @module      utils/dateUtils
 */

import { createValidationError } from "./errorUtils";
import type { Medication } from "./medicationUtils";

export const TOTAL_CYCLE_DAYS = 112; // 16 weeks * 7 days

export interface CycleStatus {
  isActive: boolean;
  currentDay: number;
  message: string;
  startDate: Date;
}

export const getMedicationsForDay = (day: number): Medication[] => {
  const cycleStatus = getCycleStatus();
  const medications: Medication[] = [];

  if (day > 0 && day <= TOTAL_CYCLE_DAYS) {
    // Example: Add test base for the first 12 weeks
    if (day <= 84) {
      medications.push({
        id: "test-base",
        name: "Testosterone Base",
        dosage: 500,
        frequency: "weekly",
        startDate: cycleStatus.startDate,
        endDate: addDays(cycleStatus.startDate, 84),
        halfLife: 7,
        minDose: 300,
        maxDose: 600,
        administrationRoute: "injection",
      });
    }
  }

  return medications;
};

export const getCycleStatus = (): CycleStatus => {
  const today = new Date();
  const cycleStartDate = new Date("2024-01-01"); // This should be configurable
  const daysDiff = calculateDaysBetween(cycleStartDate, today);

  if (daysDiff < 0) {
    return {
      isActive: false,
      currentDay: 0,
      message: "Cycle hasn't started yet",
      startDate: cycleStartDate,
    };
  }

  if (daysDiff > TOTAL_CYCLE_DAYS) {
    return {
      isActive: false,
      currentDay: TOTAL_CYCLE_DAYS,
      message: "Cycle completed",
      startDate: cycleStartDate,
    };
  }

  return {
    isActive: true,
    currentDay: daysDiff + 1,
    message: "Cycle is active",
    startDate: cycleStartDate,
  };
};

export type DateFormat = "short" | "long" | "iso";

/**
 * Formats a date according to the specified format
 */
export const formatDate = (
  date: Date,
  format: DateFormat = "short"
): string => {
  try {
    switch (format) {
      case "short":
        return date.toLocaleDateString();
      case "long":
        return date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      case "iso":
        return date.toISOString().split("T")[0];
      default:
        throw createValidationError("Invalid date format");
    }
  } catch (error) {
    throw createValidationError("Invalid date", undefined, { error });
  }
};

/**
 * Calculates the number of days between two dates
 */
export const calculateDaysBetween = (start: Date, end: Date): number => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const diffTime = Math.abs(endTime - startTime);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Adds or subtracts days from a date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Checks if a date falls within a range
 */
export const isWithinRange = (date: Date, start: Date, end: Date): boolean => {
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
};

/**
 * Gets the start of a day (midnight)
 */
export const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Gets the end of a day (23:59:59.999)
 */
export const endOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * Checks if two dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Gets the week number of a date
 */
export const getWeekNumber = (date: Date): number => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

/**
 * Checks if a date is in the past
 */
export const isPast = (date: Date): boolean => {
  return date.getTime() < new Date().getTime();
};

/**
 * Checks if a date is in the future
 */
export const isFuture = (date: Date): boolean => {
  return date.getTime() > new Date().getTime();
};

/**
 * Checks if a date is today
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

/**
 * Parses a date string safely
 */
export const parseDate = (dateString: string): Date => {
  const parsed = new Date(dateString);
  if (isNaN(parsed.getTime())) {
    throw createValidationError("Invalid date string", undefined, {
      dateString,
    });
  }
  return parsed;
};

/**
 * Gets relative time string (e.g., "2 days ago", "in 3 hours")
 */
/**
 * Converts a date to Eastern Standard Time (EST)
 */
export const getESTDate = (date: Date = new Date()): Date => {
  return new Date(
    date.toLocaleString("en-US", { timeZone: "America/New_York" })
  );
};

export const getRelativeTimeString = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  const absSeconds = Math.abs(diffInSeconds);

  if (absSeconds < 60) {
    return "just now";
  }

  const periods: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
  ];

  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  for (const period of periods) {
    if (absSeconds >= period.seconds) {
      const value = Math.round(diffInSeconds / period.seconds);
      return formatter.format(value, period.unit);
    }
  }

  return "just now";
};
