/**
 * @fileoverview CycleTableHeader component for consistent cycle table headers
 * @project     Steroid Guide Site
 * @module      components/ui/CycleTableHeader
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipWrapper } from "./TooltipWrapper";
import {
  CalendarIcon,
  BeakerIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

type HeaderColumn = {
  id: string;
  label: string;
  description?: string;
  icon?: "calendar" | "compound" | "dosage" | "none";
  width?: string;
  align?: "left" | "center" | "right";
};

type CycleTableHeaderProps = {
  columns: HeaderColumn[];
  className?: string;
  columnClassName?: string;
  sticky?: boolean;
};

const CycleTableHeader = forwardRef<HTMLDivElement, CycleTableHeaderProps>(
  ({ columns, className, columnClassName, sticky = true, ...props }, ref) => {
    const icons = {
      calendar: CalendarIcon,
      compound: BeakerIcon,
      dosage: ScaleIcon,
      none: undefined,
    };

    const alignments = {
      left: "text-left justify-start",
      center: "text-center justify-center",
      right: "text-right justify-end",
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          "grid gap-4 p-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700",
          sticky && "sticky top-0 z-10",
          className
        )}
        style={{
          gridTemplateColumns: columns
            .map((col) => col.width || "1fr")
            .join(" "),
        }}
        {...props}
      >
        {columns.map((column) => {
          const Icon = column.icon ? icons[column.icon] : undefined;
          const content = (
            <div
              key={column.id}
              className={twMerge(
                "flex items-center gap-2",
                alignments[column.align || "left"],
                columnClassName
              )}
            >
              {Icon && <Icon className="w-4 h-4 text-gray-400" />}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {column.label}
              </span>
            </div>
          );

          return column.description ? (
            <TooltipWrapper key={column.id} content={column.description}>
              {content}
            </TooltipWrapper>
          ) : (
            content
          );
        })}
      </div>
    );
  }
);

CycleTableHeader.displayName = "CycleTableHeader";

export type { CycleTableHeaderProps, HeaderColumn };
export { CycleTableHeader };
