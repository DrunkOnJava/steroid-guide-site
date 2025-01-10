/**
 * @fileoverview Glossary terms data
 * @project     Steroid Guide Site
 * @module      data/glossaryTerms
 */

import type { GlossaryTerm } from "../types/glossary";

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "pct",
    term: "PCT",
    definition:
      "Post Cycle Therapy - A protocol followed after a steroid cycle to restore natural hormone production and maintain gains.",
    category: "protocols",
    additionalInfo: [
      {
        term: "Duration",
        explanation:
          "Typically 4-6 weeks depending on cycle length and compounds used",
      },
      {
        term: "Key Medications",
        explanation: "Often includes SERMs like Nolvadex and Clomid",
      },
    ],
  },
  {
    id: "ai",
    term: "AI",
    definition:
      "Aromatase Inhibitor - A class of medications that block the enzyme aromatase, preventing the conversion of androgens to estrogen.",
    category: "medications",
    additionalInfo: [
      {
        term: "Common Types",
        explanation:
          "Includes Arimidex (anastrozole) and Aromasin (exemestane)",
      },
      {
        term: "Usage",
        explanation:
          "Used during cycle to control estrogen-related side effects",
      },
    ],
  },
  {
    id: "serm",
    term: "SERM",
    definition:
      "Selective Estrogen Receptor Modulator - A class of drugs that act as estrogen antagonists in some tissues while acting as estrogen agonists in others.",
    category: "medications",
    additionalInfo: [
      {
        term: "Examples",
        explanation: "Nolvadex (tamoxifen) and Clomid (clomiphene)",
      },
      {
        term: "Primary Use",
        explanation: "Used in PCT to restore natural testosterone production",
      },
    ],
  },
  {
    id: "test-base",
    term: "Test Base",
    definition:
      "Testosterone as the foundational compound in a cycle, serving as the primary anabolic agent.",
    category: "compounds",
    additionalInfo: [
      {
        term: "Importance",
        explanation:
          "Essential for maintaining normal bodily functions and preventing low testosterone symptoms",
      },
      {
        term: "Dosage",
        explanation:
          "Typically ranges from 300-500mg per week for performance enhancement",
      },
    ],
  },
  {
    id: "bloodwork",
    term: "Bloodwork",
    definition:
      "Comprehensive blood testing to monitor health markers before, during, and after a cycle.",
    category: "health",
    additionalInfo: [
      {
        term: "Key Markers",
        explanation:
          "Includes hormone levels, liver enzymes, lipids, and hematocrit",
      },
      {
        term: "Frequency",
        explanation: "Recommended before cycle, mid-cycle, and post-PCT",
      },
    ],
  },
  {
    id: "half-life",
    term: "Half-Life",
    definition:
      "The time required for half of a drug's active substance to be metabolized and eliminated from the bloodstream.",
    category: "general",
    additionalInfo: [
      {
        term: "Importance",
        explanation: "Determines injection frequency and detection time",
      },
      {
        term: "Variation",
        explanation:
          "Ranges from a few hours to several days depending on the ester",
      },
    ],
  },
  {
    id: "frontload",
    term: "Frontload",
    definition:
      "The practice of using a higher dose of a compound in the first week to reach stable blood levels faster.",
    category: "protocols",
    additionalInfo: [
      {
        term: "Calculation",
        explanation: "Typically 1.5-2x the regular weekly dose",
      },
      {
        term: "Considerations",
        explanation:
          "May increase risk of side effects; not recommended for beginners",
      },
    ],
  },
  {
    id: "cruise",
    term: "Cruise",
    definition:
      "A period of using TRT (testosterone replacement therapy) doses between blast phases in a blast and cruise protocol.",
    category: "protocols",
    additionalInfo: [
      {
        term: "Duration",
        explanation:
          "Usually equal to or longer than the preceding blast phase",
      },
      {
        term: "Dosage",
        explanation: "Typically 100-150mg of testosterone per week",
      },
    ],
  },
];
