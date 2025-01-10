/**
 * @fileoverview Safety protocols and guidelines data
 * @project     Steroid Guide Site
 * @module      data/safetyProtocols
 */

import type { SafetyData } from "../types/safety";

const safetyProtocols: SafetyData = {
  bloodwork: [
    {
      name: "Total and Free Testosterone",
      tooltip: "Primary male hormone measured in both bound and unbound forms",
    },
    {
      name: "Estradiol (E2)",
      tooltip:
        "Primary estrogen hormone, important for monitoring estrogen-related side effects",
    },
    {
      name: "Prolactin",
      tooltip:
        "Hormone that can affect testosterone production and sexual function",
    },
    {
      name: "LH/FSH",
      tooltip:
        "Luteinizing Hormone and Follicle Stimulating Hormone - control natural testosterone production",
    },
    {
      name: "SHBG",
      tooltip:
        "Sex Hormone Binding Globulin - affects how much testosterone is available for use",
    },
    {
      name: "Thyroid (TSH, T3, T4)",
      tooltip: "Thyroid hormones that regulate metabolism and energy levels",
    },
  ],

  healthMarkers: [
    {
      name: "Complete Blood Count (CBC)",
      tooltip:
        "Measures red blood cells, white blood cells, and platelets to monitor blood health",
    },
    {
      name: "Comprehensive Metabolic Panel (CMP)",
      tooltip:
        "Tests liver and kidney function along with other metabolic markers",
    },
    {
      name: "Lipid Panel",
      tooltip:
        "Measures cholesterol and triglyceride levels to monitor cardiovascular health",
    },
    {
      name: "PSA (if over 30)",
      tooltip: "Prostate Specific Antigen - screens for prostate health issues",
    },
    {
      name: "Blood Pressure",
      tooltip:
        "Systolic and diastolic blood pressure measurements to monitor cardiovascular health",
    },
    {
      name: "ECG (recommended)",
      tooltip:
        "Electrocardiogram - monitors heart rhythm and electrical activity",
    },
  ],

  emergencyProtocols: {
    symptoms: [
      "Severe chest pain/pressure",
      "Difficulty breathing",
      "Extreme blood pressure (>160/100)",
      "Severe headaches",
      "Unusual heart rhythms",
      "Vision changes/problems",
    ],
    actions: [
      "Stop all compound use immediately",
      "Call emergency services (911)",
      "Have recent blood work results ready",
      "Document all symptoms and their onset",
      "List all compounds and doses being used",
    ],
  },

  equipment: {
    injectionSupplies: [
      {
        name: "Proper gauge needles (23g-25g)",
        tooltip:
          "Thinner needles for injection, causing less tissue damage and pain",
      },
      {
        name: "Drawing needles (18g-20g)",
        tooltip: "Thicker needles used for drawing compound from vials",
      },
      {
        name: "Sterile syringes",
        tooltip: "New, sealed syringes for each injection",
      },
      {
        name: "Alcohol swabs",
        tooltip: "For sterilizing injection sites and vial tops",
      },
      {
        name: "Sharps container",
        tooltip:
          "Special container for safe disposal of used needles and syringes",
      },
    ],
    safetyEquipment: [
      {
        name: "Blood pressure monitor",
        tooltip: "Digital or manual device for regular BP monitoring",
      },
      {
        name: "First aid kit",
        tooltip: "Basic supplies for wound care and emergencies",
      },
      {
        name: "Antiseptic solution",
        tooltip: "For cleaning and disinfecting injection sites",
      },
      {
        name: "Storage container",
        tooltip: "Temperature-controlled storage for compounds",
      },
    ],
  },

  preventiveMeasures: [
    {
      name: "30 min cardio minimum",
      tooltip:
        "Daily cardiovascular exercise to maintain heart health and manage blood pressure",
    },
    {
      name: "Blood pressure monitoring",
      tooltip:
        "Regular checks of blood pressure to ensure it stays within safe ranges",
    },
    {
      name: "Heart rate tracking",
      tooltip:
        "Monitoring resting and exercise heart rates for cardiovascular health",
    },
    {
      name: "Proper hydration",
      tooltip:
        "Maintaining adequate water intake to support kidney function and overall health",
    },
    {
      name: "Fish oil supplementation",
      tooltip:
        "Omega-3 fatty acids to support cardiovascular health and reduce inflammation",
    },
    {
      name: "Regular sleep schedule",
      tooltip:
        "Maintaining consistent sleep patterns for hormone regulation and recovery",
    },
    {
      name: "Stress management",
      tooltip:
        "Implementing stress reduction techniques to maintain stable blood pressure",
    },
    {
      name: "Diet monitoring",
      tooltip:
        "Tracking nutrition to support health markers and maintain proper body composition",
    },
  ],
};

export default safetyProtocols;
