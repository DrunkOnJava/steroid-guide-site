/**
 * @fileoverview Component for displaying daily medications with tooltips
 */

import {
  BeakerIcon,
  CheckCircleIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import { Tooltip, MedicationTooltip } from "./ui";
import { isInjection, isPill } from "../utils/medicationUtils";

import { Medication } from "../utils/medicationUtils";

interface MedicationListProps {
  medications: Medication[];
}

export default function MedicationList({ medications }: MedicationListProps) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 p-6 transform transition-all duration-200 hover:scale-[1.01]">
      <div className="flex items-center mb-2 space-x-3">
        <CheckCircleIcon className="w-6 h-6 text-green-600" />
        <h2 className="mt-0 text-xl font-bold text-gray-800 dark:text-white">
          <Tooltip content="Compounds and dosages scheduled for administration today">
            <span className="cursor-help">
              Medications/Instructions for Today
            </span>
          </Tooltip>
        </h2>
      </div>
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {medications.map((med, idx) => (
          <li
            key={idx}
            className="flex items-center px-2 py-3 space-x-3 transition-colors duration-150 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <span className="flex-shrink-0">
              {isInjection(med) ? (
                <BeakerIcon className="w-5 h-5 text-blue-500" />
              ) : isPill(med) ? (
                <CircleStackIcon className="w-5 h-5 text-purple-500" />
              ) : (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              )}
            </span>
            <MedicationTooltip med={med.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
