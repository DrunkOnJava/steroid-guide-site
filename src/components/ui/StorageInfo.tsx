/**
 * @fileoverview StorageInfo component for displaying compound storage details
 * @project     Steroid Guide Site
 * @module      components/ui/StorageInfo
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { CategoryHeader } from "./CategoryHeader";
import { TooltipWrapper } from "./TooltipWrapper";
import { IconWithLabel } from "./IconWithLabel";
import {
  BeakerIcon,
  SunIcon,
  ArchiveBoxIcon,
  CalendarIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

type StorageCondition = {
  type: "temperature" | "light" | "container" | "expiration" | "precaution";
  value: string;
  description?: string;
};

type StorageInfoProps = {
  conditions: StorageCondition[];
  className?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
};

const StorageInfo = forwardRef<HTMLDivElement, StorageInfoProps>(
  (
    {
      conditions,
      className,
      showHeader = true,
      headerTitle = "Storage Guidelines",
      headerDescription = "Proper storage conditions and handling instructions",
      ...props
    },
    ref
  ) => {
    const icons = {
      temperature: BeakerIcon,
      light: SunIcon,
      container: ArchiveBoxIcon,
      expiration: CalendarIcon,
      precaution: ShieldExclamationIcon,
    };

    const labels = {
      temperature: "Temperature",
      light: "Light Exposure",
      container: "Container Type",
      expiration: "Expiration",
      precaution: "Precautions",
    };

    const colors = {
      temperature: "primary",
      light: "warning",
      container: "default",
      expiration: "error",
      precaution: "warning",
    } as const;

    return (
      <div ref={ref} className={twMerge("space-y-4", className)} {...props}>
        {showHeader && (
          <CategoryHeader
            title={headerTitle}
            description={headerDescription}
            icon={ArchiveBoxIcon}
            iconColor="primary"
          />
        )}
        <div className="grid gap-4 p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:grid-cols-2">
          {conditions.map((condition, index) => {
            const Icon = icons[condition.type];
            const content = (
              <div className="flex items-start gap-3 p-3 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <IconWithLabel
                  icon={Icon}
                  label={labels[condition.type]}
                  iconColor={colors[condition.type]}
                />
                <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">
                  {condition.value}
                </div>
              </div>
            );

            return condition.description ? (
              <TooltipWrapper key={index} content={condition.description}>
                {content}
              </TooltipWrapper>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>
      </div>
    );
  }
);

StorageInfo.displayName = "StorageInfo";

export type { StorageInfoProps, StorageCondition };
export { StorageInfo };
