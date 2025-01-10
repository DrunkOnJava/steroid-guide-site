/**
 * @fileoverview IconWithLabel component for consistent icon+text layouts
 * @project     Steroid Guide Site
 * @module      components/ui/IconWithLabel
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "./Icon";
import type { IconProps } from "./Icon";

type IconWithLabelProps = {
  icon: IconProps["icon"];
  label: string;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  iconPosition?: "left" | "right";
  iconColor?: IconProps["color"];
  iconSize?: IconProps["size"];
};

const IconWithLabel = forwardRef<HTMLDivElement, IconWithLabelProps>(
  (
    {
      icon,
      label,
      className,
      iconClassName,
      labelClassName,
      iconPosition = "left",
      iconColor = "default",
      iconSize = "md",
      ...props
    },
    ref
  ) => {
    const iconElement = (
      <Icon
        icon={icon}
        className={twMerge("text-gray-500 dark:text-gray-400", iconClassName)}
        color={iconColor}
        size={iconSize}
      />
    );

    return (
      <div
        ref={ref}
        className={twMerge(
          "flex items-center gap-2",
          iconPosition === "right" && "flex-row-reverse",
          className
        )}
        {...props}
      >
        {iconElement}
        <span
          className={twMerge(
            "text-sm font-medium text-gray-700 dark:text-gray-300",
            labelClassName
          )}
        >
          {label}
        </span>
      </div>
    );
  }
);

IconWithLabel.displayName = "IconWithLabel";

export type { IconWithLabelProps };
export { IconWithLabel };
