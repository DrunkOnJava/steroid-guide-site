/**
 * @fileoverview Health markers monitoring section component
 * @project     Steroid Guide Site
 * @module      HealthMarkersSection
 */

import { Tooltip } from "./ui";
import SafetyCard from "./SafetyCard";
import safetyProtocols from "../data/safetyProtocols";

export default function HealthMarkersSection() {
  return (
    <SafetyCard title="Health Markers" type="checklist">
      <ul className="pl-5 space-y-1 list-disc dark:text-gray-300">
        {safetyProtocols.healthMarkers.map((marker, index) => (
          <li key={index}>
            <Tooltip content={marker.tooltip}>
              <span className="cursor-help">{marker.name}</span>
            </Tooltip>
          </li>
        ))}
      </ul>
    </SafetyCard>
  );
}
