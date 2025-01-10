/**
 * @fileoverview Data and configurations for cycle table component
 */

import type {
  CycleData,
  PhaseColors,
  TypeColors,
  LegendItem,
  TableHeaderItem,
} from "../types/cycle";

export const phaseColors: PhaseColors = {
  main: "bg-blue-50 dark:bg-blue-950/30",
  transition: "bg-yellow-50 dark:bg-yellow-950/30",
  pct: "bg-green-50 dark:bg-green-950/30",
};

export const typeColors: TypeColors = {
  primary: "text-blue-800 dark:text-blue-300",
  secondary: "text-purple-800 dark:text-purple-300",
  support: "text-gray-800 dark:text-gray-300",
  pct: "text-green-800 dark:text-green-300",
};

export const legendItems: LegendItem[] = [
  {
    type: "primary",
    label: "Primary Compounds",
    tooltip: "Main anabolic compounds that form the foundation of the cycle",
    color: "bg-blue-500 dark:bg-blue-400",
  },
  {
    type: "secondary",
    label: "Secondary Compounds",
    tooltip: "Additional compounds that complement the primary compounds",
    color: "bg-purple-500 dark:bg-purple-400",
  },
  {
    type: "support",
    label: "Support Compounds",
    tooltip: "Compounds used to manage side effects and optimize results",
    color: "bg-gray-500 dark:bg-gray-400",
  },
  {
    type: "pct",
    label: "PCT Compounds",
    tooltip:
      "Post Cycle Therapy compounds to restore natural hormone production",
    color: "bg-green-500 dark:bg-green-400",
  },
];

export const tableHeaders: TableHeaderItem[] = [
  {
    key: "week",
    label: "Week",
    tooltip: "Duration of compound administration in weeks",
  },
  {
    key: "compound",
    label: "Compound",
    tooltip: "Name of the compound being administered",
  },
  {
    key: "frequency",
    label: "Frequency",
    tooltip: "How often the compound should be administered",
  },
  {
    key: "dosage",
    label: "Dosage",
    tooltip: "Amount of compound to be administered per dose",
  },
  {
    key: "purpose",
    label: "Purpose",
    tooltip: "Intended effect of the compound in the cycle",
  },
];

export const cycleData: CycleData[] = [
  {
    week: "1–10",
    compound: "Testosterone Cypionate",
    frequency: "Twice Weekly",
    dosage: "250 mg",
    purpose: "Base anabolic compound for muscle growth",
    phase: "main",
    type: "primary",
  },
  {
    week: "1–10",
    compound: "NPP",
    frequency: "Twice Weekly",
    dosage: "100 mg",
    purpose: "Secondary anabolic for recovery and mass",
    phase: "main",
    type: "secondary",
    tooltip: "Nandrolone Phenylpropionate - Fast-acting nandrolone ester",
  },
  {
    week: "1–10",
    compound: "Anastrozole",
    frequency: "EOD",
    dosage: "0.5 mg",
    purpose: "Estrogen control",
    phase: "main",
    type: "support",
    tooltip: "Aromatase Inhibitor - Controls estrogen levels",
  },
  {
    week: "1–10",
    compound: "Semaglutide",
    frequency: "Weekly",
    dosage: "As prescribed",
    purpose: "Metabolic support and appetite control",
    phase: "main",
    type: "support",
    tooltip:
      "GLP-1 receptor agonist - Helps with metabolic health and weight management",
  },
  {
    week: "11–13",
    compound: "HCG",
    frequency: "Twice Weekly",
    dosage: "500 IU",
    purpose: "Testicular function restoration",
    phase: "transition",
    type: "support",
    tooltip:
      "Human Chorionic Gonadotropin - Stimulates testosterone production",
  },
  {
    week: "11–13",
    compound: "Semaglutide",
    frequency: "Weekly",
    dosage: "As prescribed",
    purpose: "Continued metabolic support",
    phase: "transition",
    type: "support",
    tooltip:
      "GLP-1 receptor agonist - Helps with metabolic health and weight management",
  },
  {
    week: "14–18",
    compound: "Nolvadex",
    frequency: "Daily",
    dosage: "20 mg",
    purpose: "PCT to restore natural testosterone production",
    phase: "pct",
    type: "pct",
    tooltip: "Tamoxifen - Selective Estrogen Receptor Modulator (SERM)",
  },
  {
    week: "14–18",
    compound: "Clomid",
    frequency: "Daily",
    dosage: "50 mg",
    purpose: "PCT to stimulate LH and FSH production",
    phase: "pct",
    type: "pct",
    tooltip: "Clomiphene - Helps restore natural hormone production",
  },
  {
    week: "14–18",
    compound: "Semaglutide",
    frequency: "Weekly",
    dosage: "As prescribed",
    purpose: "Continued metabolic support during PCT",
    phase: "pct",
    type: "support",
    tooltip:
      "GLP-1 receptor agonist - Helps with metabolic health and weight management",
  },
];
