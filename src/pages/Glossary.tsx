/**
 * @fileoverview Comprehensive terminology reference and definitions page
 * @project     Steroid Guide Site (v0.0.0)
 * @module      Glossary
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
 * A comprehensive glossary page providing definitions and explanations for
 * commonly used terms in steroid usage and related fields. Terms are organized
 * by categories for easier reference.
 *
 * Term Categories:
 * - Compounds (steroids, peptides, ancillaries)
 * - Basic Terms (general terminology)
 * - Cycle Terms (protocol-related)
 * - Hormone Terms (endocrine system)
 * - Side Effects (potential issues)
 * - Training Terms (exercise-related)
 * - Health Markers (monitoring metrics)
 *
 * Content Features:
 * - Categorized term organization
 * - Clear definitions
 * - Common abbreviations
 * - Technical explanations
 *
 * Educational Value:
 * - Basic terminology introduction
 * - Technical term clarification
 * - Protocol understanding
 * - Health awareness
 *
 * @example
 * ```tsx
 * import Glossary from './pages/Glossary';
 *
 * function App() {
 *   return (
 *     <Router>
 *       <Route path="/glossary" element={<Glossary />} />
 *     </Router>
 *   );
 * }
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - react-router-dom@7.1.1
 *
 * @requirements
 * - Tailwind CSS for styling
 * - GlossarySection component
 * - Modern browser features
 */

import GlossarySection from "../components/GlossarySection";

export default function Glossary() {
  const glossaryTerms = [
    {
      term: "Test Cyp",
      definition:
        "Testosterone Cypionate - long-acting injectable testosterone ester used as the primary anabolic compound",
      category: "Compounds",
    },
    {
      term: "NPP",
      definition:
        "Nandrolone Phenylpropionate - short-acting nandrolone ester for enhanced recovery and mass gains",
      category: "Compounds",
    },
    {
      term: "HCG",
      definition:
        "Human Chorionic Gonadotropin - peptide hormone that maintains testicular function during cycle",
      category: "Compounds",
    },
    {
      term: "Anabolic",
      definition:
        "Relating to the building of muscle tissue and growth processes",
      category: "Basic Terms",
    },
    {
      term: "Androgenic",
      definition: "Relating to the development of male sex characteristics",
      category: "Basic Terms",
    },
    {
      term: "AAS",
      definition:
        "Anabolic-Androgenic Steroids - compounds that promote muscle growth and androgenic effects",
      category: "Basic Terms",
    },
    {
      term: "PCT",
      definition:
        "Post-Cycle Therapy - protocol used to restore natural hormone production after cycle",
      category: "Cycle Terms",
    },
    {
      term: "AI",
      definition:
        "Aromatase Inhibitor - medication that prevents conversion of testosterone to estrogen",
      category: "Cycle Terms",
    },
    {
      term: "LH",
      definition:
        "Luteinizing Hormone - pituitary hormone that stimulates testosterone production",
      category: "Hormone Terms",
    },
    {
      term: "FSH",
      definition:
        "Follicle Stimulating Hormone - pituitary hormone important for sperm production",
      category: "Hormone Terms",
    },
    {
      term: "Gyno",
      definition:
        "Development of breast tissue in males due to elevated estrogen",
      category: "Side Effects",
    },
    {
      term: "MPB",
      definition: "Male Pattern Baldness accelerated by DHT-derived compounds",
      category: "Side Effects",
    },
    {
      term: "Hypertrophy",
      definition:
        "The increase in muscle size through training and enhanced protein synthesis",
      category: "Training Terms",
    },
    {
      term: "TDEE",
      definition:
        "Total Daily Energy Expenditure - total calories burned in a day",
      category: "Training Terms",
    },
    {
      term: "BP",
      definition:
        "Blood Pressure - vital sign that needs regular monitoring during cycle",
      category: "Health Markers",
    },
    {
      term: "HCT",
      definition: "Hematocrit - percentage of red blood cells in blood",
      category: "Health Markers",
    },
  ];

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
        Glossary of Terms
      </h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        A comprehensive guide to commonly used terms and abbreviations in the
        field.
      </p>
      <GlossarySection terms={glossaryTerms} />
    </div>
  );
}
