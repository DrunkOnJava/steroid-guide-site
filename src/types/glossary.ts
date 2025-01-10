/**
 * @fileoverview Type definitions for glossary terms
 * @project     Steroid Guide Site
 * @module      types/glossary
 */

/**
 * Represents a term in the glossary
 */
export interface GlossaryTerm {
  /** Unique identifier for the term */
  id: string;
  /** The term itself */
  term: string;
  /** Detailed explanation of the term */
  definition: string;
  /** Category the term belongs to (e.g., 'protocols', 'medications', etc.) */
  category: string;
  /** Optional additional information about the term */
  additionalInfo?: {
    /** Related term or concept */
    term: string;
    /** Explanation of how it relates to the main term */
    explanation: string;
  }[];
}

/**
 * Categories for organizing glossary terms
 */
export type GlossaryCategory =
  | "compounds"
  | "protocols"
  | "medications"
  | "health"
  | "training"
  | "nutrition"
  | "equipment"
  | "general";
