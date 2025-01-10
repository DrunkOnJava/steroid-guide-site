/**
 * @fileoverview Section component for grouping related glossary terms
 */

import React from "react";
import { GlossarySection as GlossarySectionType } from "../types";
import GlossaryTerm from "./GlossaryTerm";

interface Props {
  section: GlossarySectionType;
  className?: string;
}

export const GlossarySection: React.FC<Props> = ({
  section,
  className = "",
}) => {
  return (
    <section className={`mb-12 ${className}`}>
      <h2 className="mb-6 text-3xl font-semibold">{section.title}</h2>
      {section.subtitle && (
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {section.subtitle}
        </p>
      )}

      {Object.entries(section.terms).map(([letter, terms]) => (
        <div key={letter} className="mb-8">
          <h3 className="mb-4 text-2xl font-medium">{letter}</h3>
          <ul className="space-y-3">
            {terms.map((term) => (
              <GlossaryTerm key={term.term} term={term} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default GlossarySection;
