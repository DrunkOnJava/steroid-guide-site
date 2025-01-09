/**
 * @fileoverview TypeScript interface definitions for compound data structures
 * @project     Steroid Guide Site (v0.0.0)
 * @module      compounds-types
 *
 * @author      Steroid Guide Team <team@steroidguide.com>
 * @contributors
 * @maintainer  Steroid Guide Team <team@steroidguide.com>
 *
 * @created     2024-03-19
 * @modified    2024-03-19
 * @version     1.0.0
 *
 * @license     MIT - see LICENSE.md file in root directory
 * @copyright   Copyright (c) 2024 Steroid Guide
 *
 * @description
 * Type definitions for compound-related data structures used throughout
 * the application. Defines interfaces for compound details, benefits,
 * and considerations with strict typing for data consistency.
 *
 * Type Definitions:
 * - CompoundDetails (main compound information)
 * - Benefit (compound benefits)
 * - Consideration (usage considerations)
 *
 * Data Properties:
 * - Basic information (name, type)
 * - Pharmacological data (half-life, schedule)
 * - Usage details (benefits, considerations)
 * - Optional properties (ratio, storage)
 *
 * Type Usage:
 * - Component props typing
 * - Data structure validation
 * - API response typing
 *
 * @example
 * ```tsx
 * import { CompoundDetails } from './types/compounds';
 *
 * interface CompoundCardProps {
 *   compound: CompoundDetails;
 *   onSelect: (compound: CompoundDetails) => void;
 * }
 *
 * function CompoundCard({ compound, onSelect }: CompoundCardProps) {
 *   return (
 *     <div onClick={() => onSelect(compound)}>
 *       <h2>{compound.name}</h2>
 *       <p>{compound.type}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @dependencies
 * None - Pure TypeScript definitions
 *
 * @requirements
 * - TypeScript compilation
 * - Strict type checking
 */

export interface Benefit {
  text: string;
}

export interface Consideration {
  text: string;
}

export interface CompoundDetails {
  name: string;
  type: string;
  halfLife: string;
  schedule: string;
  ratio?: string;
  benefits: Benefit[];
  considerations: Consideration[];
  storage?: string;
}
