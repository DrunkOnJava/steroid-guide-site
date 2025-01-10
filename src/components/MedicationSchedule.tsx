/**
 * @fileoverview Comprehensive medication schedule display component
 */

import React from "react";
import { useUserPreferences } from "../contexts/userPreferences.hooks";
import { PrintControls } from "./ui/PrintControls";
import { QRCodeDisplay } from "./ui/QRCodeDisplay";
import { ScheduleLegend } from "./ui/ScheduleLegend";
import { PhaseSection } from "./ui/PhaseSection";
import { generatePhaseSchedules } from "../data/phaseSchedules";

const MedicationSchedule: React.FC = () => {
  const { preferences, togglePrintMode } = useUserPreferences();
  const [showQR, setShowQR] = React.useState(false);

  const phases = React.useMemo(() => generatePhaseSchedules(), []);

  return (
    <div
      className={`px-4 py-8 mx-auto max-w-7xl ${
        preferences.printMode ? "print-schedule" : ""
      }`}
    >
      {/* Print and Share Controls */}
      <div className="flex items-center justify-end gap-2 mb-4 print:hidden">
        <PrintControls
          onPrint={togglePrintMode}
          onShare={() => {
            const mailtoUrl = `mailto:?subject=Medication Schedule&body=Please find my medication schedule attached.%0D%0A%0D%0AAccess the digital version at: ${window.location.href}`;
            window.open(mailtoUrl);
          }}
          onShowQR={() => setShowQR(true)}
        />
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <QRCodeDisplay
            url={window.location.href}
            onClose={() => setShowQR(false)}
          />
        </div>
      )}

      <div className="p-6 mb-8 bg-white shadow-sm dark:bg-gray-900 rounded-xl print:shadow-none print:p-2 print:mb-4">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white print:text-black">
          Cycle Schedule
        </h2>
        <ScheduleLegend className="print:hidden" />
      </div>

      {phases.map((phase, index) => (
        <PhaseSection key={index} phase={phase} className="mb-8" />
      ))}
    </div>
  );
};

export default MedicationSchedule;
