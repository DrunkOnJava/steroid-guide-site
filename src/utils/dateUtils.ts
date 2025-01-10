/**
 * @fileoverview Utility functions for date and cycle calculations
 */

/**
 * Gets the current date and time in EST
 */
export function getESTDate(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  );
}

/**
 * Formats a date into a readable string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// For development/testing purposes, set cycle start to 2 days ago
const TODAY = new Date();
const TWO_DAYS_AGO = new Date(TODAY.setDate(TODAY.getDate() - 2));
const CYCLE_START = TWO_DAYS_AGO;

/**
 * Calculates the current cycle day based on the cycle start date
 */
export function getCycleDay(): number {
  const nowEST = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  );
  const diff = nowEST.getTime() - CYCLE_START.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayNumber = Math.floor(diff / oneDay) + 1;
  return dayNumber < 1 ? 1 : dayNumber; // Return 1 as minimum to show cycle content
}

/**
 * Total number of days in the cycle (18 weeks)
 */
export const TOTAL_CYCLE_DAYS = 18 * 7;

/**
 * Gets the list of medications for a specific cycle day
 */
export function getMedicationsForDay(day: number): string[] {
  if (day < 1 || day > TOTAL_CYCLE_DAYS) {
    return ["No medications scheduled - outside cycle range."];
  }

  const week = Math.ceil(day / 7);
  const dayOfWeek = (day - 1) % 7;
  const meds: string[] = [];

  if (dayOfWeek === 0) {
    meds.push("Semaglutide injection (once weekly)");
  }

  if (week >= 1 && week <= 10 && (dayOfWeek === 0 || dayOfWeek === 4)) {
    meds.push("Testosterone Cypionate 250 mg (1 ml) injection");
    meds.push("Nandrolone Phenylpropionate 100 mg (1 ml) injection");
  }

  if (week >= 1 && week <= 10 && day % 2 === 1) {
    meds.push("Anastrozole 0.5 mg (1 pill)");
  }

  if (week >= 11 && week <= 13 && (dayOfWeek === 0 || dayOfWeek === 4)) {
    meds.push("HCG 500 IU injection");
  }

  if (week >= 14 && week <= 18) {
    meds.push("Nolvadex (Tamoxifen) 20 mg (1 pill)");
    meds.push("Clomid (Clomiphene) 50 mg (1 pill)");
  }

  if (meds.length === 0) {
    meds.push("No medications scheduled for today.");
  }

  return meds;
}

/**
 * Gets the cycle status information
 */
export function getCycleStatus(): {
  isActive: boolean;
  message: string;
  startDate: Date;
  currentDay: number;
} {
  const currentDay = getCycleDay();

  return {
    isActive: currentDay >= 1 && currentDay <= TOTAL_CYCLE_DAYS,
    message:
      currentDay < 1
        ? "Cycle hasn't started yet. Review protocols and prepare compounds."
        : currentDay > TOTAL_CYCLE_DAYS
        ? "Cycle completed. Maintain gains through proper nutrition and training."
        : "Cycle is active. Follow schedule closely for optimal results.",
    startDate: CYCLE_START,
    currentDay,
  };
}
