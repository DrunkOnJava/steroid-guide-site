/**
 * @fileoverview Preventive measures section component
 * @project     Steroid Guide Site
 * @module      PreventiveMeasuresSection
 */

import { Tooltip } from "./ui";
import SafetyCard from "./SafetyCard";
import safetyProtocols from "../data/safetyProtocols";

export default function PreventiveMeasuresSection() {
  return (
    <SafetyCard title="Preventive Measures" type="checklist">
      <div>
        <h4 className="mb-2 font-semibold dark:text-white">Daily Practice</h4>
        <ul className="pl-5 space-y-1 list-disc dark:text-gray-300">
          {safetyProtocols.preventiveMeasures.map((measure, index) => (
            <li key={index}>
              <Tooltip content={measure.tooltip}>
                <span className="cursor-help">{measure.name}</span>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </SafetyCard>
  );
}
