/**
 * @fileoverview InfoList component for displaying lists of information with icons
 * @project     Steroid Guide Site
 * @module      components/ui/InfoList
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipList } from "./TooltipList";
import { CategoryHeader } from "./CategoryHeader";
import type { IconProps } from "./Icon";

type InfoItem = {
  id: string | number;
  content: string;
  description?: string;
  status?: "positive" | "negative" | "neutral" | "warning";
};

type InfoListProps = {
  items: InfoItem[];
  icon: IconProps["icon"];
  title?: string;
  description?: string;
  className?: string;
  itemClassName?: string;
  showHeader?: boolean;
  iconColor?: IconProps["color"];
};

const InfoList = forwardRef<HTMLDivElement, InfoListProps>(
  (
    {
      items,
      icon: Icon,
      title,
      description,
      className,
      itemClassName,
      showHeader = true,
      iconColor = "primary",
      ...props
    },
    ref
  ) => {
    const statusColors = {
      positive: "text-green-600 dark:text-green-400",
      negative: "text-red-600 dark:text-red-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      neutral: "text-blue-600 dark:text-blue-400",
    };

    const listItems = items.map((item) => ({
      id: item.id,
      content: (
        <div className="flex items-start gap-2">
          <Icon
            className={twMerge(
              "w-5 h-5 mt-0.5",
              item.status ? statusColors[item.status] : statusColors.neutral
            )}
          />
          <span>{item.content}</span>
        </div>
      ),
      tooltip: item.description,
    }));

    return (
      <div ref={ref} className={twMerge("space-y-4", className)} {...props}>
        {showHeader && title && (
          <CategoryHeader
            title={title}
            description={description}
            icon={Icon}
            iconColor={iconColor}
          />
        )}
        <TooltipList
          items={listItems}
          className="p-4 bg-white rounded-lg shadow dark:bg-gray-800"
          itemClassName={twMerge("py-2", itemClassName)}
        />
      </div>
    );
  }
);

InfoList.displayName = "InfoList";

export type { InfoListProps, InfoItem };
export { InfoList };
