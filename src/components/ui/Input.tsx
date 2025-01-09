/**
 * @fileoverview React Input component with comprehensive form control features
 * @project     Steroid Guide Site (v0.0.0)
 * @module      components/ui/Input.tsx
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
 * A feature-rich Input component that extends HTML input with additional functionality.
 * Features include:
 * - Optional label with automatic ID generation
 * - Error state with validation message display
 * - Helper text for additional context
 * - Left and right icon support
 * - Full width option
 * - Accessible by default with ARIA attributes
 * - Tailwind CSS styling with focus and disabled states
 * - TypeScript support extending native input props
 *
 * @example
 * ```js
 * import { Input } from './Input';
 * import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
 *
 * function SearchInput() {
 *   return (
 *     <Input
 *       label="Search"
 *       placeholder="Search items..."
 *       leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
 *       helperText="Enter keywords to search"
 *       fullWidth
 *     />
 *   );
 * }
 *
 * function ValidationExample() {
 *   return (
 *     <Input
 *       label="Email"
 *       type="email"
 *       error="Please enter a valid email address"
 *     />
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

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={twMerge("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none dark:text-gray-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={twMerge(
              "block rounded-lg border bg-white px-4 py-2 text-base text-gray-900 dark:bg-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400",
              "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 dark:disabled:bg-gray-800 dark:disabled:text-gray-600",
              error
                ? "border-red-300 focus:ring-red-500 dark:border-red-700 dark:focus:ring-red-400"
                : "border-gray-300 dark:border-gray-700",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              fullWidth && "w-full",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-description`
                : undefined
            }
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none dark:text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            className="text-sm text-red-600 dark:text-red-400"
            id={`${inputId}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            className="text-sm text-gray-500 dark:text-gray-400"
            id={`${inputId}-description`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export type { InputProps };
export { Input };
