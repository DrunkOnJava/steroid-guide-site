/**
 * @fileoverview ConsiderationsList component for displaying compound considerations
 * @project     Steroid Guide Site
 * @module      components/ui/ConsiderationsList
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipList } from "./TooltipList";
import { CategoryHeader } from "./CategoryHeader";
import {
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

type Consideration = {
  id: string | number;
  consideration: string;
  description?: string;
  severity?: "critical" | "warning" | "note";
};

type ConsiderationsListProps = {
  considerations: Consideration[];
  className?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
};

const ConsiderationsList = forwardRef<HTMLDivElement, ConsiderationsListProps>(
  (
    {
      considerations,
      className,
      showHeader = true,
      headerTitle = "Considerations",
      headerDescription = "Important factors and potential concerns",
      ...props
    },
    ref
  ) => {
    const severityColors = {
      critical: "text-red-600 dark:text-red-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      note: "text-blue-600 dark:text-blue-400",
    };

    const items = considerations.map((consideration) => ({
      id: consideration.id,
      content: (
        <div className="flex items-start gap-2">
          <ExclamationTriangleIcon
            className={twMerge(
              "w-5 h-5 mt-0.5",
              consideration.severity
                ? severityColors[consideration.severity]
                : severityColors.warning
            )}
          />
          <span>{consideration.consideration}</span>
        </div>
      ),
      tooltip: consideration.description,
    }));

    return (
      <div ref={ref} className={twMerge("space-y-4", className)} {...props}>
        {showHeader && (
          <CategoryHeader
            title={headerTitle}
            description={headerDescription}
            icon={ShieldExclamationIcon}
            iconColor="warning"
          />
        )}
        <TooltipList
          items={items}
          className="p-4 bg-white rounded-lg shadow dark:bg-gray-800"
          itemClassName="py-2"
        />
      </div>
    );
  }
);

ConsiderationsList.displayName = "ConsiderationsList";

export type { ConsiderationsListProps, Consideration };
export { ConsiderationsList };
