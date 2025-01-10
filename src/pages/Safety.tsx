/**
 * @fileoverview Safety guidelines and protocols page
 * @project     Steroid Guide Site (v0.0.0)
 * @module      Safety
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
 * Comprehensive safety information page covering essential protocols,
 * emergency procedures, and preventive measures for steroid usage.
 * Organized into clear sections with visual indicators for importance.
 *
 * Safety Categories:
 * - Pre-cycle requirements and testing
 * - Emergency protocols and warning signs
 * - Required equipment and supplies
 * - Preventive measures and monitoring
 *
 * Medical Information:
 * - Blood work requirements
 * - Health markers to monitor
 * - Warning signs and symptoms
 * - Emergency response protocols
 *
 * Equipment Guidelines:
 * - Injection supplies
 * - Safety equipment
 * - Monitoring tools
 * - Proper disposal methods
 *
 * @example
 * ```tsx
 * import Safety from './pages/Safety';
 *
 * function App() {
 *   return (
 *     <Router>
 *       <Route path="/safety" element={<Safety />} />
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
 * - SafetySection component
 * - Modern browser features
 */

import BloodworkSection from "../components/BloodworkSection";
import HealthMarkersSection from "../components/HealthMarkersSection";
import EmergencyProtocolsSection from "../components/EmergencyProtocolsSection";
import EquipmentSection from "../components/EquipmentSection";
import PreventiveMeasuresSection from "../components/PreventiveMeasuresSection";

export default function Safety() {
  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
        Safety Considerations
      </h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        Safety should always be your top priority. Review and follow these
        guidelines carefully.
      </p>
      <div className="space-y-8">
        <BloodworkSection />
        <HealthMarkersSection />
        <EmergencyProtocolsSection />
        <EquipmentSection />
        <PreventiveMeasuresSection />
      </div>
    </div>
  );
}
