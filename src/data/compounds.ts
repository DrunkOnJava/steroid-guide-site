/**
 * @fileoverview Compound information and details data source
 * @project     Steroid Guide Site (v0.0.0)
 * @module      compounds
 *
 * @author      Steroid Guide Team <team@steroidguide.com>
 * @contributors
 * @maintainer  Steroid Guide Team <team@steroidguide.com>
 *
 * @created     2024-03-19
 * @modified    2024-03-19
 * @version     1.0.0
 *
 * @license     MIT - see LICENSE.md file in root directory
 * @copyright   Copyright (c) 2024 Steroid Guide
 *
 * @description
 * Comprehensive data source containing detailed information about various
 * compounds used in cycles. Includes pharmacological details, benefits,
 * considerations, and usage guidelines for each compound.
 *
 * Compound Categories:
 * - Anabolic-androgenic steroids
 * - Peptide hormones
 * - Enzyme inhibitors
 * - SERMs for PCT
 *
 * Data Structure:
 * - Compound properties
 * - Usage schedules
 * - Benefits lists
 * - Consideration points
 *
 * Information Types:
 * - Pharmacological profiles
 * - Half-life data
 * - Administration schedules
 * - Safety considerations
 *
 * @example
 * ```tsx
 * import { compounds } from './data/compounds';
 *
 * function CompoundList() {
 *   return (
 *     <div>
 *       {compounds.map(compound => (
 *         <CompoundCard key={compound.name} compound={compound} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 *
 * @dependencies
 * - CompoundDetails type from types/compounds
 *
 * @requirements
 * - Accurate pharmacological data
 * - Type safety enforcement
 * - Regular data updates
 */

import { CompoundDetails } from "../types/compounds";

export const compounds: CompoundDetails[] = [
  {
    name: "Testosterone Cypionate",
    type: "Long-acting anabolic-androgenic steroid (AAS)",
    halfLife: "8 days",
    schedule: "Twice weekly",
    ratio: "Anabolic/Androgenic: 100:100",
    benefits: [
      { text: "Boosts protein synthesis and nitrogen retention" },
      { text: "Enhances recovery and muscle repair" },
      { text: "Improves strength and endurance" },
    ],
    considerations: [
      { text: "Aromatizes to estrogen (controlled with anastrozole)" },
      { text: "May cause mild acne, hair thinning in predisposed individuals" },
      { text: "Generally manageable side effects with proper care" },
    ],
  },
  {
    name: "Nandrolone Phenylpropionate (NPP)",
    type: "Short-acting nandrolone derivative",
    halfLife: "3-5 days",
    schedule: "Two injections per week",
    ratio: "Anabolic/Androgenic: 125:37",
    benefits: [
      { text: "Promotes muscle growth with minimal water retention" },
      { text: "Enhances collagen synthesis and joint health" },
      { text: "Mild androgenic profile with lower risk of acne/hair loss" },
    ],
    considerations: [
      { text: "May elevate prolactin levels" },
      { text: "Monitor with dopamine agonist if needed" },
      { text: "Excellent for joint support during heavy training" },
    ],
  },
  {
    name: "HCG",
    type: "Peptide hormone",
    halfLife: "36 hours",
    schedule: "Once weekly",
    benefits: [
      { text: "Prevents testicular atrophy" },
      { text: "Maintains testicular function during cycle" },
      { text: "Simplifies PCT process" },
    ],
    considerations: [
      { text: "Store properly (refrigeration required)" },
      { text: "Use throughout cycle for best results" },
      { text: "Helps maintain fertility" },
    ],
    storage: "Must be refrigerated to maintain potency",
  },
  {
    name: "Anastrozole",
    type: "Selective aromatase enzyme inhibitor",
    halfLife: "50 hours",
    schedule: "Every other day (EOD)",
    benefits: [
      { text: "Prevents estrogenic side effects" },
      { text: "Maintains lean appearance" },
      { text: "Controls water retention" },
    ],
    considerations: [
      { text: "Don't crash estrogen (monitor for low E2 symptoms)" },
      { text: "Adjust dose based on symptoms and bloodwork" },
      { text: "Essential for managing high-dose testosterone" },
    ],
  },
  {
    name: "Proviron",
    type: "Oral androgen",
    halfLife: "12 hours",
    schedule: "Daily oral dosing",
    benefits: [
      { text: "Enhances muscle hardness and vascularity" },
      { text: "Provides mild anti-estrogenic effects" },
      { text: "Boosts libido and well-being" },
    ],
    considerations: [
      { text: "Mild compound with few side effects" },
      { text: "Helps free up testosterone from SHBG" },
      { text: "Good addition for quality gains" },
    ],
  },
  {
    name: "Nolvadex",
    type: "Selective Estrogen Receptor Modulator",
    halfLife: "5-7 days",
    schedule: "Daily during PCT",
    benefits: [
      { text: "Blocks estrogen in breast tissue" },
      { text: "Helps prevent rebound gyno" },
      { text: "Supports natural testosterone production" },
    ],
    considerations: [
      { text: "Essential PCT component" },
      { text: "Start after clearing other compounds" },
      { text: "May cause temporary vision sides" },
    ],
  },
  {
    name: "Clomid",
    type: "Selective Estrogen Receptor Modulator",
    halfLife: "5-7 days",
    schedule: "Daily during PCT",
    benefits: [
      { text: "Restores natural hormone production" },
      { text: "Works synergistically with Nolvadex" },
      { text: "Stimulates LH and FSH production" },
    ],
    considerations: [
      { text: "Watch for mood changes" },
      { text: "Vision sides possible (rare)" },
      { text: "Effective PCT compound" },
    ],
  },
];
