/**
 * @fileoverview React Card component implementation with flexible styling options
 * @project     Steroid Guide Site (v0.0.0)
 * @module      components/ui/Card.tsx
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
 * A flexible Card component that serves as a container for content with various styling options.
 * Features include:
 * - Multiple variants: default, hover, and interactive
 * - Configurable padding sizes
 * - Optional border and shadow
 * - Subcomponents: CardHeader, CardContent, and CardFooter for structured layout
 * - Full TypeScript support with proper type definitions
 * - Tailwind CSS integration for styling
 *
 * @example
 * ```js
 * import { Card, CardHeader, CardContent, CardFooter } from './Card';
 *
 * function ExampleCard() {
 *   return (
 *     <Card variant="interactive">
 *       <CardHeader
 *         title="Example Card"
 *         description="This is a sample card component"
 *       />
 *       <CardContent>
 *         Main content goes here
 *       </CardContent>
 *       <CardFooter>
 *         Footer content
 *       </CardFooter>
 *     </Card>
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

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  shadow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      border = true,
      shadow = true,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl";

    const variants = {
      default: "",
      hover:
        "transition-all duration-200 hover:shadow-lg dark:hover:shadow-gray-900/50",
      interactive:
        "transition-all duration-200 hover:shadow-lg dark:hover:shadow-gray-900/50 hover:scale-[1.02]",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          baseStyles,
          variants[variant],
          paddings[padding],
          border && "border border-gray-100/50 dark:border-gray-700/50",
          shadow && "shadow-lg shadow-gray-100/20 dark:shadow-gray-900/30",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge("flex flex-col space-y-1.5 pb-4", className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white">
            {title}
          </h3>
          {action && <div>{action}</div>}
        </div>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={twMerge("pt-0", className)} {...props} />;
});

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge("flex items-center pt-4", className)}
      {...props}
    />
  );
});

CardFooter.displayName = "CardFooter";

// Export components and types
export type { CardProps, CardHeaderProps };
export { Card, CardHeader, CardContent, CardFooter };
