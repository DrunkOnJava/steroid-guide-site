/**
 * @fileoverview Implementation file for eslint.config.js
 * @project     Steroid Guide Site (v1.0.0)
 * @module      eslint.config.js
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

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
