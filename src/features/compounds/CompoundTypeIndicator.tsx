/**
 * @fileoverview Component for displaying compound type indicators
 */

import {
  BeakerIcon,
  CircleStackIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "../shared/ui";

interface CompoundTypeIndicatorProps {
  type: string;
  className?: string;
}

export default function CompoundTypeIndicator({
  type,
  className = "",
}: CompoundTypeIndicatorProps) {
  const getTypeInfo = () => {
    switch (type.toLowerCase()) {
      case "injectable":
        return {
          icon: BeakerIcon,
          color: "text-blue-500",
          tooltip: "Injectable compound - requires proper sterile technique",
        };
      case "oral":
        return {
          icon: CircleStackIcon,
          color: "text-purple-500",
          tooltip: "Oral compound - take with food unless otherwise specified",
        };
      case "ancillary":
        return {
          icon: ShieldCheckIcon,
          color: "text-green-500",
          tooltip:
            "Support compound - helps manage side effects and optimize results",
        };
      default:
        return {
          icon: BeakerIcon,
          color: "text-gray-500",
          tooltip: "Compound type not specified",
        };
    }
  };

  const { icon: Icon, color, tooltip } = getTypeInfo();

  return (
    <Tooltip content={tooltip}>
      <div className={`flex items-center space-x-1 cursor-help ${className}`}>
        <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {type}
        </span>
      </div>
    </Tooltip>
  );
}
