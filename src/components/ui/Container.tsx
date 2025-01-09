/**
 * @fileoverview React Container component for consistent layout and spacing
 * @project     Steroid Guide Site (v0.0.0)
 * @module      components/ui/Container.tsx
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
 * A flexible Container component that provides consistent layout constraints and spacing.
 * Features include:
 * - Multiple size presets: sm (768px), md (1024px), lg (1280px), xl (1536px), full (100%)
 * - Configurable horizontal padding: none, sm, md, lg
 * - Optional automatic horizontal centering
 * - Responsive design support through Tailwind CSS
 * - TypeScript support with proper type definitions
 *
 * @example
 * ```js
 * import { Container } from './Container';
 *
 * // Basic usage with default settings (lg size, md padding, centered)
 * function PageLayout() {
 *   return (
 *     <Container>
 *       <h1>Page Content</h1>
 *       <p>This content will be constrained to max-width-7xl with medium padding</p>
 *     </Container>
 *   );
 * }
 *
 * // Custom configuration
 * function FullWidthSection() {
 *   return (
 *     <Container
 *       size="full"
 *       padding="lg"
 *       centered={false}
 *       className="bg-gray-100"
 *     >
 *       <div>Full-width content with large padding</div>
 *     </Container>
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

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  centered?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size = "lg",
      padding = "md",
      centered = true,
      children,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      xl: "max-w-[96rem]",
      full: "max-w-none",
    };

    const paddings = {
      none: "px-0",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          sizes[size],
          paddings[padding],
          centered && "mx-auto",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export type { ContainerProps };
export { Container };
