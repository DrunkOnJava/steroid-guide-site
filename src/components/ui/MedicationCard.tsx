/**
 * @fileoverview MedicationCard component for displaying daily medications
 * @project     Steroid Guide Site
 * @module      components/ui/MedicationCard
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipWrapper } from "./TooltipWrapper";
import { CompoundTypeIndicator } from "./CompoundTypeIndicator";
import { FrequencyCell } from "./FrequencyCell";
import { BeakerIcon } from "@heroicons/react/24/outline";

type MedicationDetails = {
  id: string;
  name: string;
  type: "anabolic" | "peptide" | "sarm" | "ancillary" | "custom";
  dosage: string;
  frequency: {
    type: "daily" | "eod" | "weekly" | "biweekly" | "custom";
    value: string;
    description?: string;
    timing?: string;
  };
  notes?: string;
  warning?: string;
};

type MedicationCardProps = {
  medication: MedicationDetails;
  className?: string;
  isActive?: boolean;
  showType?: boolean;
  showTiming?: boolean;
  onClick?: () => void;
};

const MedicationCard = forwardRef<HTMLDivElement, MedicationCardProps>(
  (
    {
      medication,
      className,
      isActive,
      showType = true,
      showTiming = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const content = (
      <div
        ref={ref}
        className={twMerge(
          "p-4 bg-white rounded-lg shadow transition-colors cursor-pointer hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50",
          isActive && "ring-2 ring-blue-500 dark:ring-blue-400",
          className
        )}
        onClick={onClick}
        {...props}
      >
        <div className="flex flex-col space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <BeakerIcon className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {medication.name}
              </h3>
            </div>
            {showType && (
              <TooltipWrapper
                content={
                  <div>
                    <p className="mb-1 font-medium">
                      {medication.type.charAt(0).toUpperCase() +
                        medication.type.slice(1)}{" "}
                      Compound
                    </p>
                    <p className="text-sm text-gray-200">
                      {medication.type === "anabolic" &&
                        "Synthetic hormone for muscle growth"}
                      {medication.type === "peptide" &&
                        "Amino acid chain for various benefits"}
                      {medication.type === "sarm" &&
                        "Selective androgen receptor modulator"}
                      {medication.type === "ancillary" &&
                        "Support compound for cycle management"}
                      {medication.type === "custom" && "Custom compound type"}
                    </p>
                  </div>
                }
                position="left"
              >
                <CompoundTypeIndicator
                  type={medication.type}
                  size="sm"
                  variant="badge"
                />
              </TooltipWrapper>
            )}
          </div>

          <div className="flex items-center justify-between">
            <TooltipWrapper
              content={`Recommended dosage: ${medication.dosage}. Always follow prescribed guidelines and never exceed recommended amounts.`}
              position="top"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dosage:
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {medication.dosage}
                </span>
              </div>
            </TooltipWrapper>
            <TooltipWrapper
              content={
                <div className="space-y-1">
                  <p>
                    Frequency:{" "}
                    {medication.frequency.description ||
                      medication.frequency.value}
                  </p>
                  {medication.frequency.timing && (
                    <p className="text-sm text-gray-200">
                      Optimal timing: {medication.frequency.timing}
                    </p>
                  )}
                </div>
              }
              position="top"
            >
              <FrequencyCell
                frequency={medication.frequency}
                showIcon={false}
                showTiming={showTiming}
              />
            </TooltipWrapper>
          </div>

          {medication.warning && (
            <div className="px-3 py-2 text-sm text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900/50 dark:text-yellow-200">
              {medication.warning}
            </div>
          )}
        </div>
      </div>
    );

    return medication.notes ? (
      <TooltipWrapper content={medication.notes}>{content}</TooltipWrapper>
    ) : (
      content
    );
  }
);

MedicationCard.displayName = "MedicationCard";

export type { MedicationCardProps, MedicationDetails };
export { MedicationCard };
