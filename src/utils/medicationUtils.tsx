/**
 * @fileoverview Utility functions and components for medication handling
 */

import { ReactNode } from "react";
import { Tooltip } from "../components/ui";

interface MedicationTooltipProps {
  med: string;
}

/**
 * Component that wraps medication text with appropriate tooltips based on content
 */
export function MedicationTooltip({ med }: MedicationTooltipProps): ReactNode {
  if (med.includes("Testosterone Cypionate")) {
    return (
      <Tooltip content="Primary anabolic compound - long-acting testosterone ester">
        <span className="cursor-help">{med}</span>
      </Tooltip>
    );
  }
  if (med.includes("Nandrolone")) {
    return (
      <Tooltip content="Secondary anabolic compound for enhanced recovery and joint health">
        <span className="cursor-help">{med}</span>
      </Tooltip>
    );
  }
  if (med.includes("Anastrozole")) {
    return (
      <Tooltip content="Aromatase inhibitor to control estrogen levels">
        <span className="cursor-help">{med}</span>
      </Tooltip>
    );
  }
  if (med.includes("Semaglutide")) {
    return (
      <Tooltip content="GLP-1 receptor agonist for metabolic health and appetite control">
        <span className="cursor-help">{med}</span>
      </Tooltip>
    );
  }
  if (med.includes("HCG")) {
    return (
      <Tooltip content="Human Chorionic Gonadotropin - maintains testicular function">
        <span className="cursor-help">{med}</span>
      </Tooltip>
    );
  }
  if (med.includes("Nolvadex")) {
    return (
      <Tooltip content="Selective Estrogen Receptor Modulator (SERM) for PCT">
        <span className="cursor-help">{med}</span>
      </Tooltip>
    );
  }
  if (med.includes("Clomid")) {
    return (
      <Tooltip content="SERM that helps restore natural hormone production">
        <span className="cursor-help">{med}</span>
      </Tooltip>
    );
  }
  return <span>{med}</span>;
}

/**
 * Determines if a medication is an injection
 */
export function isInjection(med: string): boolean {
  return med.toLowerCase().includes("injection");
}

/**
 * Determines if a medication is a pill
 */
export function isPill(med: string): boolean {
  return med.toLowerCase().includes("pill");
}
