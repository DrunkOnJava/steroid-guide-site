/**
 * @fileoverview Implementation file for vite.config.ts
 * @project     Steroid Guide Site (v1.0.0)
 * @module      vite.config.ts
 *
 * @author      [Your Name] <your.email@example.com>
 * @contributors
 * @maintainer  [Your Name] <your.email@example.com>
 *
 * @created     2025-01-09
 * @modified    2025-01-09
 * @version     1.0.0
 *
 * @license     MIT - see LICENSE.md file in root directory
 * @copyright   Copyright (c) 2025 Steroid Guide
 *
 * @description
 * [Add a description of this file's purpose and functionality]
 *
 * @example
 * ```js
 * // Add usage example here
 * ```
 *
 * @dependencies
 * [List any direct dependencies used in this file]
 *
 * @requirements
 * [List any specific requirements for this file]
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
