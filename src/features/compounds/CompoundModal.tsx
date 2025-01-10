/**
 * @fileoverview Modal component for displaying detailed compound information
 */

import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { CompoundDetails } from "./types";
import { CompoundHeader } from "./";
import { CompoundMetadata } from "./";
import { CompoundTypeSchedule } from "./";

interface CompoundModalProps {
  compound: CompoundDetails;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompoundModal({
  compound,
  isOpen,
  onClose,
}: CompoundModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl p-6 mx-auto bg-white rounded-xl dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <CompoundHeader
              name={compound.name}
              type={
                compound.type as "anabolic" | "peptide" | "sarm" | "ancillary"
              }
            />
            <button
              onClick={onClose}
              className="p-1 ml-4 text-gray-400 transition-colors rounded-lg hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Close dialog"
              aria-label="Close dialog"
            >
              <XMarkIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4">
            <CompoundMetadata compound={compound} />
          </div>

          <div className="mt-6">
            <CompoundTypeSchedule
              name={compound.name}
              type={compound.type}
              schedule={{
                frequency: compound.schedule,
                duration: "Based on cycle phase",
                timing: "As prescribed",
              }}
              halfLife={compound.halfLife}
            />
          </div>

          <div className="mt-6 space-y-4">
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Description
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {compound.description}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Usage Guidelines
              </h3>
              <ul className="mt-2 ml-4 space-y-2 text-gray-600 list-disc dark:text-gray-300">
                {compound.guidelines.map((guideline: string, index: number) => (
                  <li key={index}>{guideline}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Safety Considerations
              </h3>
              <ul className="mt-2 ml-4 space-y-2 text-gray-600 list-disc dark:text-gray-300">
                {compound.safetyInfo.map((info: string, index: number) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </section>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
