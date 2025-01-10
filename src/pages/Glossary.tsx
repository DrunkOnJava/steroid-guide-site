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
import { glossaryTerms } from "../data/glossaryTerms";

export default function Glossary() {
  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
        Glossary of Terms
      </h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        A comprehensive guide to commonly used terms and abbreviations in the
        field. Each term includes detailed explanations and related concepts to
        help build a complete understanding.
      </p>
      <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Compounds
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Steroids, peptides, and ancillary medications used in cycles.
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Basic Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Fundamental concepts and general terminology in the field.
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Cycle Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Protocol-related terminology and cycle management concepts.
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Hormone Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Endocrine system and hormone-related terminology.
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Side Effects
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Common side effects and related medical terminology.
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Training Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Exercise and training-related terminology.
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Health Markers
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Important health monitoring metrics and measurements.
          </p>
        </div>
      </div>
      <GlossarySection terms={glossaryTerms} />
    </div>
  );
}
