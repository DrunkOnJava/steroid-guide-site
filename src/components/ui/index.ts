/**
 * @fileoverview Central export point for all UI components
 * @project     Steroid Guide Site (v0.0.0)
 * @module      components/ui/index.ts
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
 * This file serves as the main entry point for all UI components in the project.
 * It re-exports all components and their TypeScript types, enabling users to import
 * any UI component from a single location. This centralized approach:
 * - Simplifies imports through a single entry point
 * - Provides better discoverability of available components
 * - Makes it easier to manage component versioning and dependencies
 * - Ensures consistent usage of components across the application
 *
 * @example
 * ```typescript
 * // Import multiple components
 * import { Button, Card, Input, Select } from "./components/ui";
 *
 * // Import with types
 * import type { ButtonProps, CardProps } from "./components/ui";
 *
 * function MyComponent() {
 *   return (
 *     <Card>
 *       <Input placeholder="Enter text" />
 *       <Button>Submit</Button>
 *     </Card>
 *   );
 * }
 * ```
 *
 * @dependencies
 * No direct dependencies - serves as a re-export module
 *
 * @requirements
 * - TypeScript for type definitions
 */

export { Badge } from "./Badge";
export type { BadgeProps } from "./Badge";

export { Button } from "./Button";
export type { ButtonProps } from "./Button";

export { Card, CardHeader, CardContent, CardFooter } from "./Card";
export type { CardProps, CardHeaderProps } from "./Card";

export { Container } from "./Container";
export type { ContainerProps } from "./Container";

export { Icon } from "./Icon";
export type { IconProps } from "./Icon";

export { Input } from "./Input";
export type { InputProps } from "./Input";

export { Select } from "./Select";
export type { SelectProps, SelectOption } from "./Select";
