/**
 * @fileoverview CycleLegend component for displaying compound type indicators
 * @project     Steroid Guide Site
 * @module      components/ui/CycleLegend
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipWrapper } from "./TooltipWrapper";
import { BeakerIcon } from "@heroicons/react/24/outline";

type CompoundType = {
  id: string;
  name: string;
  color: string;
  description?: string;
};

type CycleLegendProps = {
  types: CompoundType[];
  className?: string;
  showIcon?: boolean;
  orientation?: "horizontal" | "vertical";
};

const CycleLegend = forwardRef<HTMLDivElement, CycleLegendProps>(
  (
    { types, className, showIcon = true, orientation = "horizontal", ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "p-4 bg-white rounded-lg shadow dark:bg-gray-800",
          className
        )}
        {...props}
      >
        <div
          className={twMerge(
            "flex gap-4",
            orientation === "vertical" && "flex-col"
          )}
        >
          {types.map((type) => {
            const content = (
              <div key={type.id} className="flex items-center gap-2">
                <div className={twMerge("w-4 h-4 rounded-full", type.color)} />
                {showIcon && (
                  <BeakerIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {type.name}
                </span>
              </div>
            );

            return type.description ? (
              <TooltipWrapper key={type.id} content={type.description}>
                {content}
              </TooltipWrapper>
            ) : (
              content
            );
          })}
        </div>
      </div>
    );
  }
);

CycleLegend.displayName = "CycleLegend";

export type { CycleLegendProps, CompoundType };
export { CycleLegend };
