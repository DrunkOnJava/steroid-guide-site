/**
 * @fileoverview CompoundHeader component for consistent compound headers
 * @project     Steroid Guide Site
 * @module      components/ui/CompoundHeader
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type CompoundType = "anabolic" | "peptide" | "sarm" | "ancillary";

type CompoundHeaderProps = {
  name: string;
  type: CompoundType;
  aliases?: string[];
  description?: string;
  className?: string;
  actions?: React.ReactNode;
};

const CompoundHeader = forwardRef<HTMLDivElement, CompoundHeaderProps>(
  ({ name, type, aliases, description, className, actions, ...props }, ref) => {
    const typeColors = {
      anabolic:
        "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/50",
      peptide:
        "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/50",
      sarm: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50",
      ancillary:
        "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/50",
    };

    const typeLabels = {
      anabolic: "Anabolic Steroid",
      peptide: "Peptide",
      sarm: "SARM",
      ancillary: "Ancillary",
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          "p-4 bg-white rounded-lg shadow dark:bg-gray-800",
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {name}
              </h1>
              <span
                className={twMerge(
                  "px-2.5 py-0.5 text-xs font-medium rounded-full",
                  typeColors[type]
                )}
              >
                {typeLabels[type]}
              </span>
            </div>
            {aliases && aliases.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {aliases.map((alias, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm text-gray-600 bg-gray-100 rounded dark:text-gray-400 dark:bg-gray-700"
                  >
                    {alias}
                  </span>
                ))}
              </div>
            )}
            {description && (
              <p className="text-gray-600 dark:text-gray-300">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 sm:ml-4">{actions}</div>
          )}
        </div>
      </div>
    );
  }
);

CompoundHeader.displayName = "CompoundHeader";

export type { CompoundHeaderProps, CompoundType };
export { CompoundHeader };
