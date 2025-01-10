/**
 * @fileoverview React Tooltip component for displaying additional information
 * @project     Steroid Guide Site (v0.0.0)
 * @module      components/ui/Tooltip.tsx
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
 * A Tooltip component that displays additional information when hovering over elements.
 * Features include:
 * - Multiple positions (top, right, bottom, left)
 * - Automatic positioning based on viewport edges
 * - Fade in/out animations
 * - Full TypeScript support with proper type definitions
 * - Tailwind CSS integration for styling
 *
 * @example
 * ```js
 * import { Tooltip } from './Tooltip';
 *
 * function ExampleTooltip() {
 *   return (
 *     <Tooltip content="Detailed explanation here">
 *       <span className="underline">Hover me</span>
 *     </Tooltip>
 *   );
 * }
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - tailwind-merge@2.6.0
 *
 * @requirements
 * - React 18 or higher
 * - Tailwind CSS configuration
 * - TypeScript for type definitions
 */

import { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type TooltipProps = Omit<React.HTMLAttributes<HTMLDivElement>, "content"> & {
  content: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  maxWidth?: string;
  children: React.ReactElement;
};

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      content,
      position = "top",
      maxWidth = "15rem",
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState(position);

    const positions = {
      top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-2 mb-2",
      right: "left-full top-1/2 -translate-y-1/2 translate-x-2 ml-2",
      bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 -translate-x-2 mr-2",
    };

    const arrows = {
      top: "bottom-[-5px] left-1/2 -translate-x-1/2 border-t-gray-800/95 dark:border-t-gray-100/95 border-l-transparent border-r-transparent border-b-transparent",
      right:
        "left-[-5px] top-1/2 -translate-y-1/2 border-r-gray-800/95 dark:border-r-gray-100/95 border-t-transparent border-b-transparent border-l-transparent",
      bottom:
        "top-[-5px] left-1/2 -translate-x-1/2 border-b-gray-800/95 dark:border-b-gray-100/95 border-l-transparent border-r-transparent border-t-transparent",
      left: "right-[-5px] top-1/2 -translate-y-1/2 border-l-gray-800/95 dark:border-l-gray-100/95 border-t-transparent border-b-transparent border-r-transparent",
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      // Check viewport position and adjust tooltip position if needed
      const rect = e.currentTarget.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newPosition = position;

      if (position === "top" && rect.top < 100) {
        newPosition = "bottom";
      } else if (position === "bottom" && rect.bottom > viewportHeight - 100) {
        newPosition = "top";
      } else if (position === "left" && rect.left < 100) {
        newPosition = "right";
      } else if (position === "right" && rect.right > viewportWidth - 100) {
        newPosition = "left";
      }

      setTooltipPosition(newPosition);
      setIsVisible(true);
    };

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
        {...props}
      >
        {children}
        {isVisible && (
          <div
            role="tooltip"
            style={{ maxWidth }}
            className={twMerge(
              "absolute z-50 animate-in fade-in zoom-in-95 duration-200",
              positions[tooltipPosition],
              className
            )}
          >
            <div className="relative">
              <div className="px-3 py-2 text-sm font-medium text-white border rounded-lg shadow-lg bg-gray-800/95 dark:bg-gray-100/95 backdrop-blur-sm dark:text-gray-900 shadow-black/10 dark:shadow-white/10 border-white/10 dark:border-black/10">
                {content}
              </div>
              <div
                className={twMerge(
                  "absolute border-[5px]",
                  arrows[tooltipPosition]
                )}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export type { TooltipProps };
export { Tooltip };
