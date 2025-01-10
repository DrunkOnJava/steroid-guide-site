/**
 * @fileoverview BenefitsList component for displaying compound benefits
 * @project     Steroid Guide Site
 * @module      components/ui/BenefitsList
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipList } from "./TooltipList";
import { CategoryHeader } from "./CategoryHeader";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

type Benefit = {
  id: string | number;
  benefit: string;
  description?: string;
  impact?: "high" | "medium" | "low";
};

type BenefitsListProps = {
  benefits: Benefit[];
  className?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
};

const BenefitsList = forwardRef<HTMLDivElement, BenefitsListProps>(
  (
    {
      benefits,
      className,
      showHeader = true,
      headerTitle = "Benefits",
      headerDescription = "Key advantages and positive effects",
      ...props
    },
    ref
  ) => {
    const impactColors = {
      high: "text-green-600 dark:text-green-400",
      medium: "text-blue-600 dark:text-blue-400",
      low: "text-gray-600 dark:text-gray-400",
    };

    const items = benefits.map((benefit) => ({
      id: benefit.id,
      content: (
        <div className="flex items-start gap-2">
          <CheckCircleIcon
            className={twMerge(
              "w-5 h-5 mt-0.5",
              benefit.impact
                ? impactColors[benefit.impact]
                : impactColors.medium
            )}
          />
          <span>{benefit.benefit}</span>
        </div>
      ),
      tooltip: benefit.description,
    }));

    return (
      <div ref={ref} className={twMerge("space-y-4", className)} {...props}>
        {showHeader && (
          <CategoryHeader
            title={headerTitle}
            description={headerDescription}
            icon={CheckCircleIcon}
            iconColor="success"
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

BenefitsList.displayName = "BenefitsList";

export type { BenefitsListProps, Benefit };
export { BenefitsList };
