/**
 * @fileoverview CategorySection component for grouping glossary terms by category
 * @project     Steroid Guide Site
 * @module      components/ui/CategorySection
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { CategoryHeader } from "./CategoryHeader";
import { TermDefinition, type AdditionalInfoItem } from "./TermDefinition";
import { BookOpenIcon } from "@heroicons/react/24/outline";

type Term = {
  term: string;
  definition: string;
  additionalInfo?: AdditionalInfoItem[];
  tooltip?: string;
};

type CategorySectionProps = {
  category: string;
  description?: string;
  terms: Term[];
  className?: string;
  termClassName?: string;
};

const CategorySection = forwardRef<HTMLDivElement, CategorySectionProps>(
  (
    { category, description, terms, className, termClassName, ...props },
    ref
  ) => {
    return (
      <div ref={ref} className={twMerge("space-y-6", className)} {...props}>
        <CategoryHeader
          title={category}
          description={description}
          icon={BookOpenIcon}
          iconColor="primary"
        />
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {terms.map((term, index) => (
            <TermDefinition
              key={index}
              className={termClassName}
              term={term.term}
              definition={term.definition}
              additionalInfo={term.additionalInfo}
              tooltip={term.tooltip}
            />
          ))}
        </div>
      </div>
    );
  }
);

CategorySection.displayName = "CategorySection";

export type { CategorySectionProps, Term };
export { CategorySection };
