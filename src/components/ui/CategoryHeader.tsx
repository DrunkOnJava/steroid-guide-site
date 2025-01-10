/**
 * @fileoverview CategoryHeader component for consistent section headers
 * @project     Steroid Guide Site
 * @module      components/ui/CategoryHeader
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { IconWithLabel } from "./IconWithLabel";
import { TooltipWrapper } from "./TooltipWrapper";
import type { IconProps } from "./Icon";

type CategoryHeaderProps = {
  title: string;
  description?: string;
  icon?: IconProps["icon"];
  tooltip?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  iconColor?: IconProps["color"];
  actions?: React.ReactNode;
};

const CategoryHeader = forwardRef<HTMLDivElement, CategoryHeaderProps>(
  (
    {
      title,
      description,
      icon,
      tooltip,
      className,
      titleClassName,
      descriptionClassName,
      iconColor = "primary",
      actions,
      ...props
    },
    ref
  ) => {
    const headerContent = (
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon ? (
              <IconWithLabel
                icon={icon}
                label={title}
                iconColor={iconColor}
                labelClassName={twMerge(
                  "text-lg font-semibold text-gray-900 dark:text-white",
                  titleClassName
                )}
              />
            ) : (
              <h2
                className={twMerge(
                  "text-lg font-semibold text-gray-900 dark:text-white",
                  titleClassName
                )}
              >
                {title}
              </h2>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
        {description && (
          <p
            className={twMerge(
              "mt-1 text-sm text-gray-600 dark:text-gray-400",
              descriptionClassName
            )}
          >
            {description}
          </p>
        )}
      </div>
    );

    return (
      <div ref={ref} className={twMerge("mb-4", className)} {...props}>
        {tooltip ? (
          <TooltipWrapper content={tooltip}>{headerContent}</TooltipWrapper>
        ) : (
          headerContent
        )}
      </div>
    );
  }
);

CategoryHeader.displayName = "CategoryHeader";

export type { CategoryHeaderProps };
export { CategoryHeader };
