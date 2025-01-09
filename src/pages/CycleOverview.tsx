/**
 * @fileoverview Cycle planning and phase breakdown page
 * @project     Steroid Guide Site (v0.0.0)
 * @module      CycleOverview
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
 * Comprehensive overview of steroid cycle planning, including phase breakdowns,
 * compound timing, and important considerations. Features a detailed weekly
 * schedule and phase-specific information.
 *
 * Content Sections:
 * - Weekly compound schedule
 * - Phase breakdowns (Main, Transition, PCT)
 * - Key considerations and notes
 * - Health monitoring guidelines
 *
 * Cycle Information:
 * - Compound timing and dosages
 * - Phase-specific objectives
 * - Support compound usage
 * - PCT protocol details
 *
 * Safety Guidelines:
 * - Injection scheduling
 * - Side effect monitoring
 * - Blood work requirements
 * - PCT preparation
 *
 * @example
 * ```tsx
 * import CycleOverview from './pages/CycleOverview';
 *
 * function App() {
 *   return (
 *     <Router>
 *       <Route path="/cycle-overview" element={<CycleOverview />} />
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
 * - CycleTable component
 * - Modern browser features
 */

import CycleTable from "../components/CycleTable";

export default function CycleOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Cycle Overview
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          A comprehensive breakdown of your first steroid cycle, including
          compound timing, dosages, and purposes.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Weekly Breakdown
        </h2>
        <CycleTable />
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Cycle Phases
        </h2>

        <div className="space-y-6">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-800">
            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              Phase 1: Main Cycle (Weeks 1-10)
            </h3>
            <ul className="pl-5 space-y-2 text-gray-600 list-disc dark:text-gray-300">
              <li>Focus on building lean mass and strength</li>
              <li>Combined effects of Testosterone Cypionate and NPP</li>
              <li>
                Support compounds (HCG, Anastrozole, Proviron) for side effect
                management
              </li>
            </ul>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-800">
            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              Phase 2: Transition (Weeks 11-16)
            </h3>
            <ul className="pl-5 space-y-2 text-gray-600 list-disc dark:text-gray-300">
              <li>Tapering off secondary compounds</li>
              <li>Maintaining low-dose Testosterone Cypionate</li>
              <li>Preparing body for PCT</li>
            </ul>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-800">
            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              Phase 3: Post-Cycle Therapy (Weeks 17-21)
            </h3>
            <ul className="pl-5 space-y-2 text-gray-600 list-disc dark:text-gray-300">
              <li>Implementation of Nolvadex and Clomid</li>
              <li>Focus on restoring natural hormone production</li>
              <li>Maintaining gains while transitioning off cycle</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Key Notes
        </h2>
        <div className="p-6 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-950/50 dark:border-blue-900">
          <ul className="pl-5 space-y-2 text-gray-700 list-disc dark:text-gray-300">
            <li>Always maintain consistent injection schedules</li>
            <li>
              Monitor for side effects and adjust AI (Anastrozole) dosage as
              needed
            </li>
            <li>Keep HCG administration consistent throughout the cycle</li>
            <li>Have all PCT medications ready before starting the cycle</li>
            <li>
              Regular blood work is essential for monitoring health markers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
