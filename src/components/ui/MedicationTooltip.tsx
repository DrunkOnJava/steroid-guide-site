/**
 * @fileoverview Component for displaying medication tooltips
 */

import { ReactNode } from "react";
import { Tooltip } from "./index";
export interface MedicationTooltipProps {
  med: string;
}

/**
 * Component that wraps medication text with appropriate tooltips based on content
 */
export function MedicationTooltip({ med }: MedicationTooltipProps): ReactNode {
  if (med.includes("Test Cyp")) {
    return (
      <Tooltip content="Primary anabolic compound - long-acting testosterone ester">
        <span className="cursor-help">{med}</span>
      </Tooltip>
    );
  }
  if (med.includes("NPP")) {
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
