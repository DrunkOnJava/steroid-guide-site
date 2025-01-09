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

import SafetySection from "../components/SafetySection";

export default function Safety() {
  const safetyContent = [
    {
      title: "Pre-Cycle Requirements",
      type: "checklist" as const,
      items: (
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-semibold dark:text-white">
              Essential Blood Work
            </h4>
            <ul className="pl-5 space-y-1 list-disc dark:text-gray-300">
              <li>Total and Free Testosterone</li>
              <li>Estradiol (E2)</li>
              <li>Prolactin</li>
              <li>LH/FSH</li>
              <li>SHBG</li>
              <li>Thyroid (TSH, T3, T4)</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold dark:text-white">
              Health Markers
            </h4>
            <ul className="pl-5 space-y-1 list-disc dark:text-gray-300">
              <li>Complete Blood Count (CBC)</li>
              <li>Comprehensive Metabolic Panel (CMP)</li>
              <li>Lipid Panel</li>
              <li>PSA (if over 30)</li>
              <li>Blood Pressure</li>
              <li>ECG (recommended)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Emergency Protocols",
      type: "warning" as const,
      items: (
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-semibold text-red-600 dark:text-red-400">
              Immediate Medical Attention Required
            </h4>
            <ul className="pl-5 space-y-1 text-red-700 list-disc dark:text-red-400">
              <li>Severe chest pain/pressure</li>
              <li>Difficulty breathing</li>
              <li>Extreme blood pressure ({">"}160/100)</li>
              <li>Severe headaches</li>
              <li>Unusual heart rhythms</li>
              <li>Vision changes/problems</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Required Equipment",
      type: "info" as const,
      items: (
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-semibold dark:text-white">
              Injection Supplies
            </h4>
            <ul className="pl-5 space-y-1 list-disc dark:text-gray-300">
              <li>Proper gauge needles (23g-25g)</li>
              <li>Drawing needles (18g-20g)</li>
              <li>Sterile syringes</li>
              <li>Alcohol swabs</li>
              <li>Sharps container</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Preventive Measures",
      type: "checklist" as const,
      items: (
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-semibold dark:text-white">
              Daily Practice
            </h4>
            <ul className="pl-5 space-y-1 list-disc dark:text-gray-300">
              <li>30 min cardio minimum</li>
              <li>Blood pressure monitoring</li>
              <li>Heart rate tracking</li>
              <li>Proper hydration</li>
              <li>Fish oil supplementation</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
        Safety Considerations
      </h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        Safety should always be your top priority. Review and follow these
        guidelines carefully.
      </p>
      <SafetySection content={safetyContent} />
    </div>
  );
}
