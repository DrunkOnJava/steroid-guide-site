/**
 * @fileoverview Medication scheduling and tracking page
 * @project     Steroid Guide Site (v0.0.0)
 * @module      Schedule
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
 * Page component for displaying and managing medication schedules throughout
 * the cycle. Provides a clear timeline of compound administration and dosing
 * schedules.
 *
 * Schedule Features:
 * - Daily medication tracking
 * - Dosage information
 * - Administration timing
 * - Visual schedule display
 *
 * Medication Management:
 * - Compound administration times
 * - Dosage tracking
 * - Schedule adherence
 * - Cycle progression
 *
 * User Interface:
 * - Clear timeline display
 * - Visual scheduling aids
 * - Responsive layout
 * - Intuitive navigation
 *
 * @example
 * ```tsx
 * import Schedule from './pages/Schedule';
 *
 * function App() {
 *   return (
 *     <Router>
 *       <Route path="/schedule" element={<Schedule />} />
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
 * - MedicationSchedule component
 * - Modern browser features
 */

import React from "react";
import MedicationSchedule from "../components/MedicationSchedule";

const Schedule: React.FC = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Cycle Schedule
      </h1>
      <MedicationSchedule />
    </div>
  );
};

export default Schedule;
