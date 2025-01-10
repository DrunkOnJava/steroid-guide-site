/**
 * @fileoverview Equipment and supplies section component
 * @project     Steroid Guide Site
 * @module      EquipmentSection
 */

import { Tooltip } from "./ui";
import SafetyCard from "./SafetyCard";
import safetyProtocols from "../data/safetyProtocols";

export default function EquipmentSection() {
  const { injectionSupplies, safetyEquipment } = safetyProtocols.equipment;

  return (
    <SafetyCard title="Required Equipment" type="info">
      <div className="space-y-6">
        <div>
          <h4 className="mb-2 font-semibold dark:text-white">
            Injection Supplies
          </h4>
          <ul className="pl-5 space-y-1 list-disc dark:text-gray-300">
            {injectionSupplies.map((item, index) => (
              <li key={index}>
                <Tooltip content={item.tooltip}>
                  <span className="cursor-help">{item.name}</span>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold dark:text-white">
            Safety Equipment
          </h4>
          <ul className="pl-5 space-y-1 list-disc dark:text-gray-300">
            {safetyEquipment.map((item, index) => (
              <li key={index}>
                <Tooltip content={item.tooltip}>
                  <span className="cursor-help">{item.name}</span>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SafetyCard>
  );
}
