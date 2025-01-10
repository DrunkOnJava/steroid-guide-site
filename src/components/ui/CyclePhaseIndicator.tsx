/**
 * @fileoverview CyclePhaseIndicator component for phase coloring
 * @project     Steroid Guide Site
 * @module      components/ui/CyclePhaseIndicator
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipWrapper } from "./TooltipWrapper";

type PhaseType = "loading" | "maintenance" | "pct" | "bridge" | "custom";

type CyclePhaseIndicatorProps = {
  phase: PhaseType;
  label?: string;
  description?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "badge" | "bar" | "dot";
};

const CyclePhaseIndicator = forwardRef<
  HTMLDivElement,
  CyclePhaseIndicatorProps
>(
  (
    {
      phase,
      label,
      description,
      className,
      size = "md",
      variant = "badge",
      ...props
    },
    ref
  ) => {
    const colors = {
      loading: "bg-blue-500 text-white dark:bg-blue-600",
      maintenance: "bg-green-500 text-white dark:bg-green-600",
      pct: "bg-purple-500 text-white dark:bg-purple-600",
      bridge: "bg-yellow-500 text-white dark:bg-yellow-600",
      custom: "bg-gray-500 text-white dark:bg-gray-600",
    };

    const sizes = {
      sm: {
        badge: "px-2 py-1 text-xs",
        bar: "h-1",
        dot: "w-2 h-2",
      },
      md: {
        badge: "px-3 py-1 text-sm",
        bar: "h-2",
        dot: "w-3 h-3",
      },
      lg: {
        badge: "px-4 py-2 text-base",
        bar: "h-3",
        dot: "w-4 h-4",
      },
    };

    const variants = {
      badge: twMerge(
        "inline-flex items-center rounded-full font-medium",
        sizes[size].badge
      ),
      bar: twMerge("block rounded", sizes[size].bar),
      dot: twMerge("block rounded-full", sizes[size].dot),
    };

    const content = (
      <div
        ref={ref}
        className={twMerge(
          variants[variant],
          colors[phase],
          variant === "badge" && "select-none",
          className
        )}
        {...props}
      >
        {variant === "badge" && (label || phase)}
      </div>
    );

    return description ? (
      <TooltipWrapper content={description}>{content}</TooltipWrapper>
    ) : (
      content
    );
  }
);

CyclePhaseIndicator.displayName = "CyclePhaseIndicator";

export type { CyclePhaseIndicatorProps, PhaseType };
export { CyclePhaseIndicator };
