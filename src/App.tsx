/**
 * @fileoverview Main application component handling routing and layout structure
 * @project     Steroid Guide Site (v0.0.0)
 * @module      App
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
 * Root application component that sets up the routing structure and layout for the Steroid Guide site.
 * Implements React Router for navigation between different sections including:
 * - Today's overview
 * - Introduction content
 * - Cycle planning and overview
 * - Compound information
 * - Training and nutrition guidance
 * - Safety information
 * - Glossary of terms
 * - Schedule management
 * All routes are wrapped in a common Layout component for consistent UI structure.
 *
 * @example
 * ```js
 * import App from './App';
 * import { createRoot } from 'react-dom/client';
 *
 * const root = createRoot(document.getElementById('root'));
 * root.render(<App />);
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - react-router-dom@7.1.1
 * - ./components/Layout
 * - ./components/MarkdownPage
 * - ./pages/* (various page components)
 *
 * @requirements
 * - React 18 or higher
 * - React Router v7
 * - Browser with modern JavaScript support
 * - Content markdown files in /public/content/
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import Layout from "./components/Layout";
import MarkdownPage from "./components/MarkdownPage";
import Today from "./pages/Today";
import TrainingNutrition from "./pages/TrainingNutrition";
import CycleOverview from "./pages/CycleOverview";
import Safety from "./pages/Safety";
import Glossary from "./pages/Glossary";
import Compounds from "./pages/Compounds";
import Schedule from "./pages/Schedule";
import ComponentDemo from "./pages/ComponentDemo";

export default function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Today />} />
            <Route
              path="/introduction"
              element={<MarkdownPage filePath="/content/01_introduction.md" />}
            />
            <Route path="/cycle-overview" element={<CycleOverview />} />
            <Route path="/compounds" element={<Compounds />} />
            <Route path="/training-nutrition" element={<TrainingNutrition />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/components" element={<ComponentDemo />} />
          </Routes>
        </Layout>
      </Router>
    </DarkModeProvider>
  );
}
