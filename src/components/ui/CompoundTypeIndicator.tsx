/**
 * @fileoverview CompoundTypeIndicator component for type styling
 * @project     Steroid Guide Site
 * @module      components/ui/CompoundTypeIndicator
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipWrapper } from "./TooltipWrapper";
import { BeakerIcon } from "@heroicons/react/24/outline";

type CompoundType = "anabolic" | "peptide" | "sarm" | "ancillary" | "custom";

type CompoundTypeIndicatorProps = {
  type: CompoundType;
  label?: string;
  description?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "badge" | "icon" | "dot";
  showIcon?: boolean;
};

const CompoundTypeIndicator = forwardRef<
  HTMLDivElement,
  CompoundTypeIndicatorProps
>(
  (
    {
      type,
      label,
      description,
      className,
      size = "md",
      variant = "badge",
      showIcon = true,
      ...props
    },
    ref
  ) => {
    const colors = {
      anabolic: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      peptide:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      sarm: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      ancillary:
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      custom:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    };

    const sizes = {
      sm: {
        badge: "px-2 py-0.5 text-xs",
        icon: "w-4 h-4",
        dot: "w-2 h-2",
      },
      md: {
        badge: "px-2.5 py-1 text-sm",
        icon: "w-5 h-5",
        dot: "w-3 h-3",
      },
      lg: {
        badge: "px-3 py-1.5 text-base",
        icon: "w-6 h-6",
        dot: "w-4 h-4",
      },
    };

    const variants = {
      badge: twMerge(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        sizes[size].badge
      ),
      icon: twMerge("inline-flex", sizes[size].icon),
      dot: twMerge("block rounded-full", sizes[size].dot),
    };

    const content = (
      <div
        ref={ref}
        className={twMerge(
          variants[variant],
          colors[type],
          variant === "badge" && "select-none",
          className
        )}
        {...props}
      >
        {variant === "badge" && (
          <>
            {showIcon && (
              <BeakerIcon className={sizes[size].icon} aria-hidden="true" />
            )}
            <span>{label || type}</span>
          </>
        )}
        {variant === "icon" && (
          <BeakerIcon className="w-full h-full" aria-hidden="true" />
        )}
      </div>
    );

    return description ? (
      <TooltipWrapper content={description}>{content}</TooltipWrapper>
    ) : (
      content
    );
  }
);

CompoundTypeIndicator.displayName = "CompoundTypeIndicator";

export type { CompoundTypeIndicatorProps, CompoundType };
export { CompoundTypeIndicator };
