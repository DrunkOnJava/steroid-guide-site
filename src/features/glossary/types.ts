/**
 * @fileoverview Type definitions for glossary feature
 */

export interface GlossaryTerm {
  term: string;
  definition: string;
  category?: string;
  abbreviation?: string;
  relatedTerms?: string[];
}

export interface GlossarySection {
  title: string;
  subtitle?: string;
  terms: Record<string, GlossaryTerm[]>;
}

export interface GlossaryData {
  sections: GlossarySection[];
}
