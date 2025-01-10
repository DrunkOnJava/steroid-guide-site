/**
 * @fileoverview Types and utilities for managing medication schedules
 */

import { z } from "zod";

// Zod schema for validation
export const scheduleSchema = z.object({
  id: z.string(),
  cycleId: z.string(),
  date: z.string(),
  completed: z.boolean(),
  medications: z.array(
    z.object({
      name: z.string(),
      dosage: z.number(),
      unit: z.string(),
      timeOfDay: z.string(),
      taken: z.boolean(),
      takenAt: z.string().optional(),
      notes: z.string().optional(),
    })
  ),
});

export type Schedule = z.infer<typeof scheduleSchema>;

// Calendar export formats
export enum CalendarFormat {
  ICAL = "ical",
  GOOGLE = "google",
  OUTLOOK = "outlook",
}

interface CalendarEvent {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
  reminder?: number; // minutes before
}

// Helper functions for schedule management
export const generateCalendarEvents = (
  schedule: Schedule,
  format: CalendarFormat
): CalendarEvent[] => {
  return schedule.medications.map((med) => {
    const date = new Date(schedule.date);
    const timeOfDay = med.timeOfDay.toLowerCase();

    // Set time based on timeOfDay
    if (timeOfDay === "morning") {
      date.setHours(8, 0, 0, 0);
    } else if (timeOfDay === "evening") {
      date.setHours(20, 0, 0, 0);
    }

    const endTime = new Date(date);
    endTime.setMinutes(endTime.getMinutes() + 30);

    const baseEvent = {
      title: `Take ${med.name}`,
      description: `Take ${med.dosage}${med.unit} of ${med.name}`,
      startTime: date.toISOString(),
      endTime: endTime.toISOString(),
    };

    // Add format-specific properties
    switch (format) {
      case CalendarFormat.ICAL:
        return {
          ...baseEvent,
          reminder: 15, // 15 minutes before
        };
      case CalendarFormat.GOOGLE:
        return {
          ...baseEvent,
          reminder: 15,
          location: "Home", // Google Calendar supports location
        };
      case CalendarFormat.OUTLOOK:
        return {
          ...baseEvent,
          reminder: 15,
          location: "Home",
        };
      default:
        return baseEvent;
    }
  });
};

export const formatCalendarExport = (
  events: CalendarEvent[],
  format: CalendarFormat
): string => {
  switch (format) {
    case CalendarFormat.ICAL:
      return formatICalendar(events);
    case CalendarFormat.GOOGLE:
      return formatGoogleCalendar(events);
    case CalendarFormat.OUTLOOK:
      return formatOutlookCalendar(events);
    default:
      throw new Error(`Unsupported calendar format: ${format}`);
  }
};

const formatICalendar = (events: CalendarEvent[]): string => {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Steroid Guide//Medication Schedule//EN",
  ];

  events.forEach((event) => {
    lines.push(
      "BEGIN:VEVENT",
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `DTSTART:${formatICalDateTime(event.startTime)}`,
      `DTEND:${formatICalDateTime(event.endTime)}`,
      event.reminder
        ? `BEGIN:VALARM\nACTION:DISPLAY\nDESCRIPTION:${event.title}\nTRIGGER:-PT${event.reminder}M\nEND:VALARM`
        : "",
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
};

const formatGoogleCalendar = (events: CalendarEvent[]): string => {
  return events
    .map(
      (event) =>
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
          event.title
        )}&details=${encodeURIComponent(
          event.description
        )}&dates=${formatGoogleDateTime(
          event.startTime
        )}/${formatGoogleDateTime(event.endTime)}`
    )
    .join("\n");
};

const formatOutlookCalendar = (events: CalendarEvent[]): string => {
  return events
    .map(
      (event) =>
        `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
          event.title
        )}&body=${encodeURIComponent(event.description)}&startdt=${
          event.startTime
        }&enddt=${event.endTime}`
    )
    .join("\n");
};

// Helper functions for date formatting
const formatICalDateTime = (isoString: string): string => {
  return isoString.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
};

const formatGoogleDateTime = (isoString: string): string => {
  return isoString
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "")
    .replace(/[+-]\d{2}:\d{2}/, "Z");
};

// Medication card generation
export interface MedicationCard {
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
  warnings: string[];
  emergencyContacts: string[];
}

export const generateMedicationCard = (
  medication: Schedule["medications"][0]
): MedicationCard => {
  return {
    name: medication.name,
    dosage: `${medication.dosage}${medication.unit}`,
    frequency: `Take ${medication.timeOfDay.toLowerCase()}`,
    instructions: "Take with food unless otherwise directed",
    warnings: [
      "Keep out of reach of children",
      "Store at room temperature",
      "Do not share this medication",
    ],
    emergencyContacts: [
      "Emergency: 911",
      "Poison Control: 1-800-222-1222",
      "Healthcare Provider: [Add your provider's number]",
    ],
  };
};

// Reminder system integration
export interface ReminderSettings {
  enabled: boolean;
  timeOffset: number; // minutes before scheduled time
  method: "push" | "email" | "sms";
  contacts?: string[];
}

export const generateReminderPayload = (
  schedule: Schedule,
  settings: ReminderSettings
) => {
  return schedule.medications.map((med) => {
    const date = new Date(schedule.date);
    const timeOfDay = med.timeOfDay.toLowerCase();

    // Set time based on timeOfDay
    if (timeOfDay === "morning") {
      date.setHours(8, 0, 0, 0);
    } else if (timeOfDay === "evening") {
      date.setHours(20, 0, 0, 0);
    }

    // Adjust for reminder offset
    date.setMinutes(date.getMinutes() - settings.timeOffset);

    return {
      id: `${schedule.id}-${med.name}-${timeOfDay}`,
      title: `Time to take ${med.name}`,
      message: `Take ${med.dosage}${med.unit} of ${med.name}`,
      scheduledTime: date.toISOString(),
      method: settings.method,
      contacts: settings.contacts,
    };
  });
};

// Schedule analysis and reporting
export const analyzeAdherence = (schedules: Schedule[]) => {
  const total = schedules.reduce(
    (acc, schedule) => acc + schedule.medications.length,
    0
  );
  const taken = schedules.reduce(
    (acc, schedule) =>
      acc + schedule.medications.filter((med) => med.taken).length,
    0
  );

  return {
    total,
    taken,
    adherenceRate: total > 0 ? (taken / total) * 100 : 100,
    missedDoses: total - taken,
  };
};

export const generateAdherenceReport = (
  schedules: Schedule[],
  startDate: string,
  endDate: string
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dailyAdherence = [];
  const current = new Date(start);

  while (current <= end) {
    const dateStr = current.toISOString().split("T")[0];
    const daySchedules = schedules.filter((s) => s.date === dateStr);
    const analysis = analyzeAdherence(daySchedules);

    dailyAdherence.push({
      date: dateStr,
      ...analysis,
    });

    current.setDate(current.getDate() + 1);
  }

  return {
    startDate,
    endDate,
    dailyAdherence,
    overall: analyzeAdherence(schedules),
  };
};
