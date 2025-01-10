/**
 * @fileoverview TooltipWrapper component for consistent tooltip usage across the application
 * @project     Steroid Guide Site
 * @module      components/ui/TooltipWrapper
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Tooltip, TooltipProps } from "./Tooltip";
import { Icon } from "./Icon";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

type TooltipWrapperProps = Omit<TooltipProps, "children"> & {
  label?: string;
  showIcon?: boolean;
  className?: string;
  labelClassName?: string;
  children?: React.ReactNode;
};

const TooltipWrapper = forwardRef<HTMLDivElement, TooltipWrapperProps>(
  (
    {
      content,
      label,
      showIcon = true,
      position = "top",
      className,
      labelClassName,
      children,
      ...props
    },
    ref
  ) => {
    const tooltipContent = (
      <span className="inline-flex items-center gap-2">
        {label && (
          <span className={twMerge("text-sm font-medium", labelClassName)}>
            {label}
          </span>
        )}
        {showIcon && (
          <Icon
            icon={InformationCircleIcon}
            className="w-4 h-4 text-gray-400 dark:text-gray-500"
          />
        )}
        {children}
      </span>
    );

    return (
      <Tooltip
        ref={ref}
        content={content}
        position={position}
        className={className}
        {...props}
      >
        <span className="inline-flex items-center cursor-help">
          {tooltipContent}
        </span>
      </Tooltip>
    );
  }
);

TooltipWrapper.displayName = "TooltipWrapper";

export type { TooltipWrapperProps };
export { TooltipWrapper };
