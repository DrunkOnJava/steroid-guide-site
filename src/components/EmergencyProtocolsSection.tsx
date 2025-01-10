/**
 * @fileoverview Emergency protocols section component
 * @project     Steroid Guide Site
 * @module      EmergencyProtocolsSection
 */

import SafetyCard from "./SafetyCard";
import safetyProtocols from "../data/safetyProtocols";

export default function EmergencyProtocolsSection() {
  const { symptoms, actions } = safetyProtocols.emergencyProtocols;

  return (
    <SafetyCard title="Emergency Protocols" type="warning">
      <div className="space-y-6">
        <div>
          <h4 className="mb-2 font-semibold text-red-600 dark:text-red-400">
            Immediate Medical Attention Required
          </h4>
          <ul className="pl-5 space-y-1 text-red-700 list-disc dark:text-red-400">
            {symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-red-600 dark:text-red-400">
            Emergency Actions
          </h4>
          <ul className="pl-5 space-y-1 text-red-700 list-disc dark:text-red-400">
            {actions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
      </div>
    </SafetyCard>
  );
}
