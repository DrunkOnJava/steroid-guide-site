/**
 * @fileoverview Application entry point that bootstraps React and renders the root component
 * @project     Steroid Guide Site (v0.0.0)
 * @module      main
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
 * Main entry point for the Steroid Guide application. This file:
 * - Initializes the React application
 * - Sets up React Strict Mode for development best practices
 * - Mounts the root App component to the DOM
 * - Imports global styles from index.css
 * Uses TypeScript for type safety, particularly in DOM element selection.
 *
 * @example
 * ```html
 * <!-- index.html -->
 * <!DOCTYPE html>
 * <html>
 *   <head>
 *     <title>Steroid Guide</title>
 *   </head>
 *   <body>
 *     <div id="root"></div>
 *     <script type="module" src="/src/main.tsx"></script>
 *   </body>
 * </html>
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - react-dom@18.3.1
 * - ./App
 * - ./index.css
 *
 * @requirements
 * - Node.js 18 or higher
 * - Modern browser with ES modules support
 * - DOM element with id="root"
 * - Vite build system
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
