/**
 * @fileoverview React Badge component for displaying status, labels, and tags
 * @project     Steroid Guide Site (v0.0.0)
 * @module      components/ui/Badge.tsx
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
 * A versatile Badge component for displaying status indicators, labels, or tags.
 * Features include:
 * - Multiple variants: default, secondary, outline, success, warning, error
 * - Three size options: sm, md, lg
 * - Configurable border radius: none, sm, md, full
 * - Tailwind CSS color schemes for different states
 * - Full TypeScript support with proper type definitions
 *
 * @example
 * ```js
 * import { Badge } from './Badge';
 *
 * function StatusBadges() {
 *   return (
 *     <div className="space-x-2">
 *       <Badge>Default</Badge>
 *       <Badge variant="success" size="lg">Success</Badge>
 *       <Badge variant="warning">Warning</Badge>
 *       <Badge variant="error" size="sm">Error</Badge>
 *       <Badge variant="outline">Outline</Badge>
 *     </div>
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

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "full";
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      rounded = "full",
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
      secondary:
        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      outline:
        "border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-300",
      success:
        "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
      warning:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
      error: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-sm",
      lg: "px-3 py-1 text-base",
    };

    const roundedStyles = {
      none: "rounded-none",
      sm: "rounded",
      md: "rounded-md",
      full: "rounded-full",
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          "inline-flex items-center font-medium",
          variants[variant],
          sizes[size],
          roundedStyles[rounded],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export type { BadgeProps };
export { Badge };
