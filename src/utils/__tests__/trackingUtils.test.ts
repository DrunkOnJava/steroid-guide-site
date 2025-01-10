import { describe, it, expect } from "vitest";
import {
  calculateAdherence,
  trackProgress,
  analyzePatterns,
  calculateComplianceScore,
  generateReport,
} from "../trackingUtils";
import type { Dose, Medication } from "../medicationUtils";

describe("trackingUtils", () => {
  describe("calculateAdherence", () => {
    const baseDate = new Date("2024-01-01T08:00:00Z");
    const scheduled: Dose[] = [
      {
        medicationId: "med1",
        timestamp: baseDate,
        amount: 10,
        taken: false,
      },
      {
        medicationId: "med1",
        timestamp: new Date(baseDate.getTime() + 24 * 60 * 60 * 1000),
        amount: 10,
        taken: false,
      },
    ];

    it("calculates adherence metrics correctly", () => {
      const taken: Dose[] = [
        {
          medicationId: "med1",
          timestamp: baseDate,
          amount: 10,
          taken: true,
        },
      ];

      const metrics = calculateAdherence(scheduled, taken);
      expect(metrics.adherenceRate).toBe(50);
      expect(metrics.missedDoses).toBe(1);
      expect(metrics.streak).toBe(1);
    });

    it("identifies late administrations", () => {
      const taken: Dose[] = [
        {
          medicationId: "med1",
          timestamp: new Date(baseDate.getTime() + 2 * 60 * 60 * 1000),
          amount: 10,
          taken: true,
        },
      ];

      const metrics = calculateAdherence(scheduled, taken, 1);
      expect(metrics.lateAdministrations).toBe(1);
    });
  });

  describe("trackProgress", () => {
    const measurements = [
      {
        timestamp: new Date("2024-01-01"),
        type: "weight",
        value: 80,
        unit: "kg",
      },
      {
        timestamp: new Date("2024-01-08"),
        type: "weight",
        value: 82,
        unit: "kg",
      },
    ];

    it("calculates progress metrics correctly", () => {
      const metrics = trackProgress(measurements);
      expect(metrics.trend).toBe("increasing");
      expect(metrics.percentageChange).toBe(2.5);
      expect(metrics.averageValue).toBe(81);
      expect(metrics.minValue).toBe(80);
      expect(metrics.maxValue).toBe(82);
    });

    it("requires at least two measurements", () => {
      expect(() => trackProgress([measurements[0]])).toThrow();
    });
  });

  describe("analyzePatterns", () => {
    const doses: Dose[] = [
      {
        medicationId: "med1",
        timestamp: new Date("2024-01-01T10:00:00Z"), // 10 AM UTC to ensure it's morning in most timezones
        amount: 10,
        taken: true,
      },
      {
        medicationId: "med1",
        timestamp: new Date("2024-01-02T10:00:00Z"), // 10 AM UTC to ensure it's morning in most timezones
        amount: 10,
        taken: false,
      },
    ];

    it("analyzes time of day patterns", () => {
      const patterns = analyzePatterns(doses);
      expect(patterns.timeOfDay.morning).toBe(2);
      expect(patterns.timeOfDay.afternoon).toBe(0);
    });

    it("identifies common skip days", () => {
      const patterns = analyzePatterns(doses);
      expect(patterns.commonSkipDays).toContain("Tuesday");
    });
  });

  describe("calculateComplianceScore", () => {
    const baseDate = new Date("2024-01-01T08:00:00Z");
    const scheduled: Dose[] = Array.from({ length: 7 }, (_, i) => ({
      medicationId: "med1",
      timestamp: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
      amount: 10,
      taken: false,
    }));

    it("calculates perfect compliance", () => {
      const taken = scheduled.map((dose) => ({
        ...dose,
        taken: true,
      }));

      const score = calculateComplianceScore(scheduled, taken);
      expect(score).toBe(100);
    });

    it("penalizes missed and late doses", () => {
      const taken = scheduled.slice(0, 5).map((dose) => ({
        ...dose,
        timestamp: new Date(dose.timestamp.getTime() + 2 * 60 * 60 * 1000),
        taken: true,
      }));

      const score = calculateComplianceScore(scheduled, taken);
      expect(score).toBeLessThan(100);
      expect(score).toBeGreaterThan(0);
    });
  });

  describe("generateReport", () => {
    const medication: Medication = {
      id: "med1",
      name: "Test Med",
      dosage: 10,
      frequency: "daily",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-07"),
      halfLife: 24,
      minDose: 5,
      maxDose: 15,
      administrationRoute: "oral",
    };

    const doses: Dose[] = [
      {
        medicationId: "med1",
        timestamp: new Date("2024-01-01T08:00:00Z"),
        amount: 10,
        taken: true,
      },
    ];

    const measurements = [
      {
        timestamp: new Date("2024-01-01"),
        type: "weight",
        value: 80,
        unit: "kg",
      },
    ];

    it("generates a comprehensive report", () => {
      const report = generateReport(medication, doses, measurements);
      expect(report).toContain("Test Med");
      expect(report).toContain("Adherence Metrics");
      expect(report).toContain("Usage Patterns");
    });
  });
});
