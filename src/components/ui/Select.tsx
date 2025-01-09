/**
 * @fileoverview React Select component with enhanced dropdown functionality
 * @project     Steroid Guide Site (v0.0.0)
 * @module      components/ui/Select.tsx
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
 * A customized Select component that enhances the native HTML select with additional features.
 * Features include:
 * - Strongly typed options with value/label pairs
 * - Optional placeholder with disabled state
 * - Support for disabled options
 * - Custom dropdown icon using HeroIcons
 * - Error state with validation message display
 * - Helper text for additional context
 * - Full width option
 * - Accessible by default with ARIA attributes
 * - Tailwind CSS styling with focus and disabled states
 * - TypeScript support with proper type definitions
 *
 * @example
 * ```js
 * import { Select } from './Select';
 *
 * function CountrySelect() {
 *   const options = [
 *     { value: 'us', label: 'United States' },
 *     { value: 'ca', label: 'Canada' },
 *     { value: 'mx', label: 'Mexico', disabled: true }
 *   ];
 *
 *   return (
 *     <Select
 *       label="Country"
 *       options={options}
 *       placeholder="Select a country"
 *       helperText="Please select your country of residence"
 *       fullWidth
 *     />
 *   );
 * }
 *
 * function ValidationExample() {
 *   return (
 *     <Select
 *       label="Category"
 *       options={[
 *         { value: '1', label: 'Category 1' },
 *         { value: '2', label: 'Category 2' }
 *       ]}
 *       error="Please select a category"
 *     />
 *   );
 * }
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - tailwind-merge@2.6.0
 * - @heroicons/react@2.2.0
 *
 * @requirements
 * - React 18 or higher
 * - Tailwind CSS configuration
 * - TypeScript for type definitions
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      options,
      placeholder,
      fullWidth = false,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={twMerge("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={twMerge(
              "block w-full rounded-lg border bg-white px-4 py-2 text-base text-gray-900 appearance-none",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
              error ? "border-red-300 focus:ring-red-500" : "border-gray-300",
              fullWidth && "w-full",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                ? `${selectId}-description`
                : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none">
            <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
        {error && (
          <p
            className="text-sm text-red-600"
            id={`${selectId}-error`}
            role="alert"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-sm text-gray-500" id={`${selectId}-description`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export type { SelectProps, SelectOption };
export { Select };
