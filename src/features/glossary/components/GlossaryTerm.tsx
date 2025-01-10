/**
 * @fileoverview Individual glossary term component with definition
 */

import React from "react";
import { GlossaryTerm as GlossaryTermType } from "../types";

interface Props {
  term: GlossaryTermType;
  className?: string;
}

export const GlossaryTerm: React.FC<Props> = ({ term, className = "" }) => {
  return (
    <li className={`space-y-1 ${className}`}>
      <div className="flex items-baseline gap-2">
        <strong className="text-lg font-medium">{term.term}</strong>
        {term.abbreviation && (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({term.abbreviation})
          </span>
        )}
      </div>
      <p className="text-gray-700 dark:text-gray-300">{term.definition}</p>
      {term.relatedTerms && term.relatedTerms.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Related: {term.relatedTerms.join(", ")}
        </div>
      )}
    </li>
  );
};

export default GlossaryTerm;
