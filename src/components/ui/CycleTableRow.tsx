/**
 * @fileoverview CycleTableRow component for individual cycle entries
 * @project     Steroid Guide Site
 * @module      components/ui/CycleTableRow
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipWrapper } from "./TooltipWrapper";
import { IconWithLabel } from "./IconWithLabel";
import { BeakerIcon } from "@heroicons/react/24/outline";

type CycleEntry = {
  id: string;
  compound: string;
  type: string;
  dosage: string;
  frequency: string;
  timing?: string;
  notes?: string;
  color?: string;
};

type CycleTableRowProps = {
  entry: CycleEntry;
  columns: string[];
  className?: string;
  cellClassName?: string;
  isActive?: boolean;
  onClick?: () => void;
};

const CycleTableRow = forwardRef<HTMLDivElement, CycleTableRowProps>(
  (
    { entry, columns, className, cellClassName, isActive, onClick, ...props },
    ref
  ) => {
    const renderCell = (column: string) => {
      switch (column) {
        case "compound":
          return (
            <div className="flex items-center gap-2">
              {entry.color && (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
              )}
              <IconWithLabel
                icon={BeakerIcon}
                label={entry.compound}
                iconColor="primary"
              />
            </div>
          );
        case "type":
          return (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {entry.type}
            </span>
          );
        case "dosage":
          return (
            <span className="font-medium text-gray-900 dark:text-white">
              {entry.dosage}
            </span>
          );
        case "frequency":
          return (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {entry.frequency}
            </span>
          );
        case "timing":
          return entry.timing ? (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {entry.timing}
            </span>
          ) : null;
        default:
          return null;
      }
    };

    const content = (
      <div
        ref={ref}
        className={twMerge(
          "grid items-center gap-4 p-4 transition-colors border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 dark:border-gray-700",
          isActive && "bg-blue-50 dark:bg-blue-900/20",
          className
        )}
        style={{
          gridTemplateColumns: columns.map(() => "1fr").join(" "),
        }}
        onClick={onClick}
        role="row"
        {...props}
      >
        {columns.map((column) => (
          <div
            key={column}
            className={twMerge("flex items-center", cellClassName)}
            role="cell"
          >
            {renderCell(column)}
          </div>
        ))}
      </div>
    );

    return entry.notes ? (
      <TooltipWrapper content={entry.notes}>{content}</TooltipWrapper>
    ) : (
      content
    );
  }
);

CycleTableRow.displayName = "CycleTableRow";

export type { CycleTableRowProps, CycleEntry };
export { CycleTableRow };
