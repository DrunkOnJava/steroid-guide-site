/**
 * @fileoverview Phase schedule data for medication cycles
 */

export interface Medication {
  name: string;
  dosage: string;
  tooltip: string;
}

export interface DaySchedule {
  day: number;
  date: string;
  medications: Medication[];
}

export interface PhaseSchedule {
  title: string;
  type: "loading" | "maintenance" | "pct" | "bridge" | "custom";
  days: DaySchedule[];
  description: string;
  duration: string;
  startDate?: string;
  endDate?: string;
}

const generatePhaseSchedules = (
  startDate: Date = new Date(2024, 0, 8)
): PhaseSchedule[] => {
  // Phase 1: Main Cycle (Weeks 1-10)
  const phase1Days: DaySchedule[] = Array.from({ length: 70 }, (_, i) => {
    const day = i + 1;
    const meds: Medication[] = [];

    // Add Anastrozole every other day
    if (day % 2 === 1) {
      meds.push({
        name: "Anastrozole",
        dosage: "0.5 mg",
        tooltip:
          "Aromatase inhibitor that helps control estrogen levels. Take on an empty stomach for optimal absorption.",
      });
    }

    // Every Sunday and Wednesday
    if (day % 7 === 1 || day % 7 === 5) {
      meds.unshift(
        {
          name: "Test Cyp",
          dosage: "250 mg",
          tooltip:
            "Long-acting testosterone ester that serves as the foundation of the cycle. Inject intramuscularly using proper sterile technique.",
        },
        {
          name: "NPP",
          dosage: "100 mg",
          tooltip:
            "Nandrolone Phenylpropionate - fast-acting compound that enhances recovery and joint health. Inject with testosterone for convenience.",
        }
      );
    }

    // Every Wednesday
    if (day % 7 === 1) {
      meds.push({
        name: "Semaglutide",
        dosage: "",
        tooltip:
          "GLP-1 receptor agonist that supports metabolic health and appetite control. Store refrigerated and rotate injection sites weekly.",
      });
    }

    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return { day, date: dateStr, medications: meds };
  });

  // Phase 2: Bridge Period (Weeks 11-13)
  const phase2Days: DaySchedule[] = Array.from({ length: 21 }, (_, i) => {
    const day = i + 71;
    const meds: Medication[] = [];

    // Every Wednesday and Sunday
    if (day % 7 === 1) {
      meds.push(
        {
          name: "HCG",
          dosage: "500 IU",
          tooltip:
            "Human Chorionic Gonadotropin that helps maintain testicular function and fertility. Reconstitute with bacteriostatic water and store refrigerated.",
        },
        {
          name: "Semaglutide",
          dosage: "",
          tooltip:
            "GLP-1 receptor agonist that supports metabolic health and appetite control. Store refrigerated and rotate injection sites weekly.",
        }
      );
    } else if (day % 7 === 5) {
      meds.push({
        name: "HCG",
        dosage: "500 IU",
        tooltip:
          "Human Chorionic Gonadotropin that helps maintain testicular function and fertility. Reconstitute with bacteriostatic water and store refrigerated.",
      });
    }

    const date = new Date(startDate);
    date.setDate(date.getDate() + i + 70);
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return { day, date: dateStr, medications: meds };
  });

  // Phase 3: PCT (Weeks 14-18)
  const phase3Days: DaySchedule[] = Array.from({ length: 35 }, (_, i) => {
    const day = i + 92;
    const meds: Medication[] = [
      {
        name: "Nolvadex",
        dosage: "20 mg",
        tooltip:
          "Selective Estrogen Receptor Modulator (SERM) that blocks estrogen in certain tissues. Take in the morning with food.",
      },
      {
        name: "Clomid",
        dosage: "50 mg",
        tooltip:
          "SERM that stimulates natural testosterone production by increasing LH and FSH. Take in the evening to minimize side effects.",
      },
    ];

    // Every Wednesday
    if (day % 7 === 1) {
      meds.push({
        name: "Semaglutide",
        dosage: "",
        tooltip:
          "GLP-1 receptor agonist that supports metabolic health and appetite control. Store refrigerated and rotate injection sites weekly.",
      });
    }

    const date = new Date(startDate);
    date.setDate(date.getDate() + i + 91);
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return { day, date: dateStr, medications: meds };
  });

  return [
    {
      title: "Weeks 1-10 (Days 1-70)",
      type: "maintenance",
      days: phase1Days,
      description:
        "Primary building phase with full compound stack. This phase focuses on muscle growth and strength development.",
      duration: "10 weeks",
    },
    {
      title: "Weeks 11-13 (Days 71-91)",
      type: "bridge",
      days: phase2Days,
      description:
        "Transition period between main cycle and PCT. This phase helps maintain gains while preparing for hormone recovery.",
      duration: "3 weeks",
    },
    {
      title: "Weeks 14-18 (Days 92-126)",
      type: "pct",
      days: phase3Days,
      description:
        "Post-Cycle Therapy phase focused on restoring natural hormone production and maintaining gains. Critical for long-term health.",
      duration: "5 weeks",
    },
  ];
};

export { generatePhaseSchedules };
