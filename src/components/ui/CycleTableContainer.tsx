/**
 * @fileoverview CycleTableContainer component for responsive table wrapper
 * @project     Steroid Guide Site
 * @module      components/ui/CycleTableContainer
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { CycleTableHeader } from "./CycleTableHeader";
import { CycleLegend } from "./CycleLegend";
import type { HeaderColumn } from "./CycleTableHeader";
import type { CompoundType } from "./CycleLegend";

type CycleTableContainerProps = {
  children: React.ReactNode;
  className?: string;
  columns: HeaderColumn[];
  legend?: CompoundType[];
  showLegend?: boolean;
  stickyHeader?: boolean;
  maxHeight?: string;
  emptyState?: React.ReactNode;
};

const CycleTableContainer = forwardRef<
  HTMLDivElement,
  CycleTableContainerProps
>(
  (
    {
      children,
      className,
      columns,
      legend,
      showLegend = true,
      stickyHeader = true,
      maxHeight,
      emptyState,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "flex flex-col space-y-4 bg-white rounded-lg shadow dark:bg-gray-800",
          className
        )}
        {...props}
      >
        {showLegend && legend && legend.length > 0 && (
          <div className="p-4 border-b dark:border-gray-700">
            <CycleLegend types={legend} />
          </div>
        )}
        <div
          className="relative overflow-auto"
          style={maxHeight ? { maxHeight } : undefined}
        >
          <CycleTableHeader columns={columns} sticky={stickyHeader} />
          {children}
          {!children && emptyState && (
            <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
              {emptyState}
            </div>
          )}
        </div>
      </div>
    );
  }
);

CycleTableContainer.displayName = "CycleTableContainer";

export type { CycleTableContainerProps };
export { CycleTableContainer };
