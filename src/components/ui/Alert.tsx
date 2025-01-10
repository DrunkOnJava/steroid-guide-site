/**
 * @fileoverview React Alert component for displaying important messages
 * @project     Steroid Guide Site (v0.0.0)
 * @module      components/ui/Alert.tsx
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
 * A flexible Alert component for displaying important messages, warnings, and notifications.
 * Features include:
 * - Multiple variants: info, warning, success, error
 * - Optional icon support
 * - Dismissible alerts with animation
 * - Full TypeScript support with proper type definitions
 * - Tailwind CSS integration for styling
 *
 * @example
 * ```js
 * import { Alert } from './Alert';
 *
 * function ExampleAlert() {
 *   return (
 *     <Alert
 *       variant="warning"
 *       title="Important Safety Notice"
 *       dismissible
 *     >
 *       Always consult with a healthcare provider before starting any cycle.
 *     </Alert>
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
import { Icon } from "./Icon";
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "warning" | "success" | "error";
  title?: string;
  dismissible?: boolean;
  icon?: boolean;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "info",
      title,
      dismissible = false,
      icon = true,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    const variants = {
      info: {
        container:
          "bg-gradient-to-r from-blue-50 to-blue-50/80 dark:from-blue-900/20 dark:to-blue-900/10 border-blue-200 dark:border-blue-800 hover:shadow-lg hover:shadow-blue-100/50 dark:hover:shadow-blue-900/30",
        title: "text-blue-900 dark:text-blue-100",
        text: "text-blue-800 dark:text-blue-200",
        icon: InformationCircleIcon,
      },
      warning: {
        container:
          "bg-gradient-to-r from-yellow-50 to-yellow-50/80 dark:from-yellow-900/20 dark:to-yellow-900/10 border-yellow-200 dark:border-yellow-800 hover:shadow-lg hover:shadow-yellow-100/50 dark:hover:shadow-yellow-900/30",
        title: "text-yellow-900 dark:text-yellow-100",
        text: "text-yellow-800 dark:text-yellow-200",
        icon: ExclamationTriangleIcon,
      },
      success: {
        container:
          "bg-gradient-to-r from-green-50 to-green-50/80 dark:from-green-900/20 dark:to-green-900/10 border-green-200 dark:border-green-800 hover:shadow-lg hover:shadow-green-100/50 dark:hover:shadow-green-900/30",
        title: "text-green-900 dark:text-green-100",
        text: "text-green-800 dark:text-green-200",
        icon: CheckCircleIcon,
      },
      error: {
        container:
          "bg-gradient-to-r from-red-50 to-red-50/80 dark:from-red-900/20 dark:to-red-900/10 border-red-200 dark:border-red-800 hover:shadow-lg hover:shadow-red-100/50 dark:hover:shadow-red-900/30",
        title: "text-red-900 dark:text-red-100",
        text: "text-red-800 dark:text-red-200",
        icon: XCircleIcon,
      },
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          "relative flex gap-4 rounded-xl border p-5 transition-all duration-200 ease-in-out backdrop-blur-[2px]",
          variants[variant].container,
          className
        )}
        role="alert"
        {...props}
      >
        {icon && (
          <div className="flex-shrink-0 pt-0.5">
            <Icon
              icon={variants[variant].icon}
              className={variants[variant].title}
              size="lg"
            />
          </div>
        )}

        <div className="flex-1">
          {title && (
            <h5
              className={twMerge(
                "mb-2 font-semibold tracking-tight",
                variants[variant].title
              )}
            >
              {title}
            </h5>
          )}
          <div className={variants[variant].text}>{children}</div>
        </div>

        {dismissible && (
          <button
            type="button"
            className={twMerge(
              "absolute right-3 top-3 rounded-full p-1.5 opacity-70 transition-all duration-200 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 hover:scale-110",
              variants[variant].title
            )}
            onClick={() => setIsVisible(false)}
            aria-label="Close alert"
          >
            <Icon icon={XMarkIcon} size="sm" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export type { AlertProps };
export { Alert };
