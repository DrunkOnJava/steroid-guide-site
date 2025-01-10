/**
 * @fileoverview Phase configuration constants
 * @project     Steroid Guide Site
 * @module      constants/phases
 */

import theme from "../styles/theme";

export type PhaseType = "loading" | "maintenance" | "pct" | "bridge" | "custom";

export interface PhaseConfig {
  type: PhaseType;
  title: string;
  description: string;
  duration: string;
  color: {
    light: string;
    dark: string;
  };
}

export const PHASE_CONFIGS: Record<PhaseType, PhaseConfig> = {
  loading: {
    type: "loading",
    title: "Loading Phase",
    description: "Initial phase to establish baseline compound levels",
    duration: "1-2 weeks",
    color: theme.colors.phase.loading,
  },
  maintenance: {
    type: "maintenance",
    title: "Maintenance Phase",
    description: "Primary building phase with full compound stack",
    duration: "8-10 weeks",
    color: theme.colors.phase.maintenance,
  },
  bridge: {
    type: "bridge",
    title: "Bridge Phase",
    description: "Transition period between main cycle and PCT",
    duration: "2-3 weeks",
    color: theme.colors.phase.bridge,
  },
  pct: {
    type: "pct",
    title: "PCT Phase",
    description: "Post-cycle therapy to restore natural hormone production",
    duration: "4-6 weeks",
    color: theme.colors.phase.pct,
  },
  custom: {
    type: "custom",
    title: "Custom Phase",
    description: "User-defined phase with custom parameters",
    duration: "Variable",
    color: theme.colors.phase.custom,
  },
};

export const PHASE_ORDER: PhaseType[] = [
  "loading",
  "maintenance",
  "bridge",
  "pct",
];

export const PHASE_TRANSITIONS = {
  minRestBetweenCycles: "12 weeks",
  recommendedRestBetweenCycles: "Time on + PCT",
  maxCyclesPerYear: 2,
};

export const PHASE_REQUIREMENTS = {
  loading: {
    bloodwork: ["Total Testosterone", "Estradiol", "LH/FSH"],
    healthMarkers: ["Blood Pressure", "Lipid Panel"],
  },
  maintenance: {
    bloodwork: ["Total Testosterone", "Estradiol", "LH/FSH", "Prolactin"],
    healthMarkers: ["Blood Pressure", "Lipid Panel", "Liver Function"],
  },
  bridge: {
    bloodwork: ["Total Testosterone", "Estradiol", "LH/FSH"],
    healthMarkers: ["Blood Pressure", "Lipid Panel"],
  },
  pct: {
    bloodwork: ["Total Testosterone", "Estradiol", "LH/FSH"],
    healthMarkers: ["Blood Pressure", "Lipid Panel", "Liver Function"],
  },
  custom: {
    bloodwork: ["Total Testosterone", "Estradiol"],
    healthMarkers: ["Blood Pressure"],
  },
};

export const PHASE_MONITORING = {
  daily: [
    "Blood pressure",
    "Heart rate",
    "Body temperature",
    "Water intake",
    "Sleep quality",
  ],
  weekly: [
    "Body weight",
    "Body measurements",
    "Progress photos",
    "Training performance",
  ],
  monthly: ["Blood work", "Health markers", "Body composition"],
};

export default {
  PHASE_CONFIGS,
  PHASE_ORDER,
  PHASE_TRANSITIONS,
  PHASE_REQUIREMENTS,
  PHASE_MONITORING,
};
