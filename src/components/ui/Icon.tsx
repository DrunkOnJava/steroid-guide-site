/**
 * @fileoverview React Icon component for consistent SVG icon rendering
 * @project     Steroid Guide Site (v0.0.0)
 * @module      components/ui/Icon.tsx
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
 * A flexible Icon component that wraps SVG icons with consistent styling and accessibility.
 * Features include:
 * - Five size variants: xs (12px), sm (16px), md (20px), lg (24px), xl (28px)
 * - Semantic color variants: default, primary, success, warning, error, muted
 * - Proper accessibility support with optional labels
 * - Compatible with HeroIcons and similar SVG icon components
 * - TypeScript support with proper type definitions
 * - Tailwind CSS integration for styling
 *
 * @example
 * ```js
 * import { Icon } from './Icon';
 * import {
 *   CheckCircleIcon,
 *   ExclamationTriangleIcon
 * } from '@heroicons/react/24/outline';
 *
 * function IconExamples() {
 *   return (
 *     <div className="space-x-2">
 *       <Icon
 *         icon={CheckCircleIcon}
 *         color="success"
 *         size="lg"
 *         label="Success indicator"
 *       />
 *       <Icon
 *         icon={ExclamationTriangleIcon}
 *         color="warning"
 *         size="md"
 *       />
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
 * - SVG icon components (e.g., @heroicons/react)
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "default" | "primary" | "success" | "warning" | "error" | "muted";
  label?: string;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      className,
      icon: IconComponent,
      size = "md",
      color = "default",
      label,
      ...props
    },
    ref
  ) => {
    const sizes = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-7 h-7",
    };

    const colors = {
      default: "text-gray-600",
      primary: "text-blue-600",
      success: "text-green-600",
      warning: "text-yellow-600",
      error: "text-red-600",
      muted: "text-gray-400",
    };

    return (
      <IconComponent
        ref={ref}
        className={twMerge(sizes[size], colors[color], className)}
        aria-hidden={label ? "false" : "true"}
        aria-label={label}
        role={label ? "img" : undefined}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export type { IconProps };
export { Icon };
