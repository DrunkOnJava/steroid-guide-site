/**
 * @fileoverview StatsCard component for displaying statistics in a consistent format
 * @project     Steroid Guide Site
 * @module      components/ui/StatsCard
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Card } from "./Card";
import { TooltipWrapper } from "./TooltipWrapper";
import { IconWithLabel } from "./IconWithLabel";
import type { IconProps } from "./Icon";

type StatsCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: IconProps["icon"];
  trend?: {
    value: number;
    label: string;
    direction: "up" | "down" | "neutral";
  };
  tooltip?: string;
  className?: string;
  iconColor?: IconProps["color"];
};

const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(
  (
    {
      title,
      value,
      description,
      icon,
      trend,
      tooltip,
      className,
      iconColor = "primary",
      ...props
    },
    ref
  ) => {
    const trendColors = {
      up: "text-green-600",
      down: "text-red-600",
      neutral: "text-gray-600",
    };

    const content = (
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div>
            {icon && (
              <IconWithLabel
                icon={icon}
                label={title}
                iconColor={iconColor}
                className="mb-1"
              />
            )}
            {!icon && (
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {title}
              </h3>
            )}
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {value}
              </p>
              {trend && (
                <span
                  className={twMerge(
                    "text-sm font-medium",
                    trendColors[trend.direction]
                  )}
                >
                  {trend.value}% {trend.label}
                </span>
              )}
            </div>
          </div>
        </div>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    );

    return (
      <Card
        ref={ref}
        className={twMerge(
          "p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50",
          className
        )}
        {...props}
      >
        {tooltip ? (
          <TooltipWrapper content={tooltip}>{content}</TooltipWrapper>
        ) : (
          content
        )}
      </Card>
    );
  }
);

StatsCard.displayName = "StatsCard";

export type { StatsCardProps };
export { StatsCard };
