/**
 * @fileoverview Blood work requirements section component
 * @project     Steroid Guide Site
 * @module      BloodworkSection
 */

import { Tooltip } from "./ui";
import SafetyCard from "./SafetyCard";
import safetyProtocols from "../data/safetyProtocols";

export default function BloodworkSection() {
  return (
    <SafetyCard title="Essential Blood Work" type="checklist">
      <ul className="pl-5 space-y-1 list-disc dark:text-gray-300">
        {safetyProtocols.bloodwork.map((item, index) => (
          <li key={index}>
            <Tooltip content={item.tooltip}>
              <span className="cursor-help">{item.name}</span>
            </Tooltip>
          </li>
        ))}
      </ul>
    </SafetyCard>
  );
}
