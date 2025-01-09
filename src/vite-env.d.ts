/**
 * @fileoverview TypeScript declaration file for Vite client types
 * @project     Steroid Guide Site (v0.0.0)
 * @module      vite-env
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
 * TypeScript declaration file that provides type definitions for Vite-specific features
 * and environment variables. This file ensures proper TypeScript support for:
 * - Vite's client utilities and APIs
 * - Environment variables prefixed with VITE_
 * - Import assertions for various file types
 * - Hot Module Replacement (HMR) types
 *
 * @example
 * ```ts
 * /// <reference types="vite/client" />
 *
 * // Environment variables are now properly typed
 * const apiKey = import.meta.env.VITE_API_KEY;
 *
 * // HMR interface is available
 * if (import.meta.hot) {
 *   import.meta.hot.accept();
 * }
 * ```
 *
 * @dependencies
 * - vite@6.0.5
 * - typescript@5.6.2
 *
 * @requirements
 * - TypeScript 5.6 or higher
 * - Vite 6.x configuration
 * - tsconfig.json with proper compiler options
 */

/// <reference types="vite/client" />
