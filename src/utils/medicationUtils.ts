/**
 * @fileoverview Medication utility functions for handling medication calculations and safety
 * @project     Steroid Guide Site
 * @module      utils/medicationUtils
 */

import { createValidationError, createSecurityError } from "./errorUtils";
import { addDays, isWithinRange } from "./dateUtils";

export interface Medication {
  id: string;
  name: string;
  dosage: number;
  frequency: string;
  startDate: Date;
  endDate: Date;
  halfLife: number;
  minDose: number;
  maxDose: number;
  interactions?: string[];
  administrationRoute: "oral" | "injection";
}

export interface Dose {
  medicationId: string;
  timestamp: Date;
  amount: number;
  taken: boolean;
}

export interface Schedule {
  medicationId: string;
  doses: Dose[];
}

export interface InteractionWarning {
  medication1: string;
  medication2: string;
  severity: "low" | "medium" | "high";
  description: string;
}

/**
 * Calculates medication dosage based on weight and dosage per kg
 */
export const calculateDosage = (
  weight: number,
  dosagePerKg: number,
  minDose: number,
  maxDose: number
): number => {
  if (weight <= 0 || dosagePerKg <= 0) {
    throw createValidationError("Weight and dosage must be positive numbers");
  }

  const calculatedDose = weight * dosagePerKg;

  if (calculatedDose < minDose) {
    throw createValidationError("Calculated dose is below minimum safe dose");
  }

  if (calculatedDose > maxDose) {
    throw createValidationError("Calculated dose exceeds maximum safe dose");
  }

  return Number(calculatedDose.toFixed(2));
};

/**
 * Validates if a dosage falls within safe limits
 */
export const validateDosage = (
  dose: number,
  minDose: number,
  maxDose: number
): boolean => {
  return dose >= minDose && dose <= maxDose;
};

/**
 * Parses medication frequency string (e.g., "every 12 hours", "daily")
 */
const parseFrequency = (frequency: string): number => {
  const hourlyMatch = frequency.match(/every (\d+) hours?/i);
  if (hourlyMatch) {
    return Number(hourlyMatch[1]);
  }

  if (frequency.toLowerCase() === "daily") {
    return 24;
  }

  if (frequency.toLowerCase() === "twice daily") {
    return 12;
  }

  throw createValidationError("Invalid frequency format");
};

/**
 * Generates a medication schedule based on prescribed medications
 */
export const generateSchedule = (
  medication: Medication,
  startDate: Date = new Date()
): Schedule => {
  const doses: Dose[] = [];
  const hoursInterval = parseFrequency(medication.frequency);
  let currentDate = new Date(startDate);

  while (currentDate <= medication.endDate) {
    doses.push({
      medicationId: medication.id,
      timestamp: new Date(currentDate),
      amount: medication.dosage,
      taken: false,
    });

    currentDate = addDays(currentDate, hoursInterval / 24);
  }

  return {
    medicationId: medication.id,
    doses,
  };
};

/**
 * Identifies potential medication overlaps and interactions
 */
export const calculateOverlap = (
  schedule1: Schedule,
  schedule2: Schedule,
  medications: Medication[]
): InteractionWarning[] => {
  const med1 = medications.find((m) => m.id === schedule1.medicationId);
  const med2 = medications.find((m) => m.id === schedule2.medicationId);

  if (!med1 || !med2) {
    throw createValidationError("Medication not found");
  }

  const warnings: InteractionWarning[] = [];

  // Check for direct interactions
  if (
    med1.interactions?.includes(med2.id) ||
    med2.interactions?.includes(med1.id)
  ) {
    warnings.push({
      medication1: med1.name,
      medication2: med2.name,
      severity: "high",
      description: "Direct interaction between medications",
    });
  }

  // Check for temporal overlaps considering half-lives
  for (const dose1 of schedule1.doses) {
    const dose1End = addDays(dose1.timestamp, med1.halfLife / 24);

    for (const dose2 of schedule2.doses) {
      const dose2End = addDays(dose2.timestamp, med2.halfLife / 24);

      if (
        isWithinRange(dose1.timestamp, dose2.timestamp, dose2End) ||
        isWithinRange(dose2.timestamp, dose1.timestamp, dose1End)
      ) {
        warnings.push({
          medication1: med1.name,
          medication2: med2.name,
          severity: "medium",
          description: "Temporal overlap in medication effects",
        });
        break;
      }
    }
  }

  return warnings;
};

/**
 * Validates medication frequency against safe guidelines
 */
export const validateFrequency = (
  frequency: string,
  medication: Medication
): boolean => {
  try {
    const hours = parseFrequency(frequency);
    const minInterval = medication.halfLife / 4; // Minimum safe interval
    return hours >= minInterval;
  } catch {
    return false;
  }
};

/**
 * Calculates the active amount of medication in the system
 */
export const calculateActiveAmount = (
  doses: Dose[],
  halfLife: number,
  currentTime: Date = new Date()
): number => {
  return doses.reduce((total, dose) => {
    if (!dose.taken) return total;

    const hoursSinceAdministration =
      (currentTime.getTime() - dose.timestamp.getTime()) / (1000 * 60 * 60);
    const halfLives = hoursSinceAdministration / halfLife;
    const remainingAmount = dose.amount * Math.pow(0.5, halfLives);

    return total + (remainingAmount > 0.01 ? remainingAmount : 0);
  }, 0);
};

/**
 * Checks if it's safe to take a new dose
 */
export const isSafeToTakeDose = (
  medication: Medication,
  previousDoses: Dose[],
  proposedTime: Date = new Date()
): boolean => {
  const activeAmount = calculateActiveAmount(
    previousDoses,
    medication.halfLife,
    proposedTime
  );

  // Check if active amount is below safe threshold
  if (activeAmount + medication.dosage > medication.maxDose) {
    return false;
  }

  // Check if enough time has passed since last dose
  const lastDose = [...previousDoses]
    .filter((d) => d.taken)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

  if (lastDose) {
    const hoursSinceLastDose =
      (proposedTime.getTime() - lastDose.timestamp.getTime()) /
      (1000 * 60 * 60);
    const minInterval = medication.halfLife / 4;
    return hoursSinceLastDose >= minInterval;
  }

  return true;
};

/**
 * Encrypts sensitive medication data
 */
/**
 * Checks if a medication is administered via injection
 */
export const isInjection = (medication: Medication): boolean => {
  // Add logic to determine if medication is injectable
  return medication.administrationRoute === "injection";
};

/**
 * Checks if a medication is administered orally
 */
export const isPill = (medication: Medication): boolean => {
  // Add logic to determine if medication is oral
  return medication.administrationRoute === "oral";
};

export const encryptMedicationData = async (
  data: Medication[],
  key: string
): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(JSON.stringify(data));
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode(key),
      { name: "AES-GCM" },
      false,
      ["encrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      cryptoKey,
      dataBuffer
    );

    const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedArray.set(iv, 0);
    encryptedArray.set(new Uint8Array(encryptedData), iv.length);

    return btoa(String.fromCharCode(...encryptedArray));
  } catch (error) {
    throw createSecurityError("Failed to encrypt medication data", undefined, {
      error,
    });
  }
};
