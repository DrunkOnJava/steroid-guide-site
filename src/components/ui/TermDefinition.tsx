/**
 * @fileoverview TermDefinition component for displaying individual glossary terms
 * @project     Steroid Guide Site
 * @module      components/ui/TermDefinition
 */

import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipWrapper } from "./TooltipWrapper";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type AdditionalInfoItem = {
  term: string;
  explanation: string;
};

type TermDefinitionProps = {
  term: string;
  definition: string;
  additionalInfo?: AdditionalInfoItem[];
  className?: string;
  tooltip?: string;
};

const TermDefinition = forwardRef<HTMLDivElement, TermDefinitionProps>(
  ({ term, definition, additionalInfo, className, tooltip, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const content = (
      <div
        className={twMerge(
          "p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
          className
        )}
        {...props}
        ref={ref}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {term}
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {definition}
            </p>
          </div>
          {additionalInfo && additionalInfo.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 ml-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              aria-expanded={isExpanded}
            >
              <ChevronDownIcon
                className={twMerge(
                  "w-5 h-5 transition-transform",
                  isExpanded && "transform rotate-180"
                )}
              />
            </button>
          )}
        </div>
        {isExpanded && additionalInfo && (
          <div className="pt-3 mt-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
            {additionalInfo.map((info, index) => (
              <div key={index} className="pl-4 border-l-2 border-blue-500">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {info.term}
                </h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {info.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    return tooltip ? (
      <TooltipWrapper content={tooltip}>{content}</TooltipWrapper>
    ) : (
      content
    );
  }
);

TermDefinition.displayName = "TermDefinition";

export type { TermDefinitionProps, AdditionalInfoItem };
export { TermDefinition };
