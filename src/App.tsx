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
import { UserPreferencesProvider } from "./contexts/UserPreferencesContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { lazy, Suspense, useEffect } from "react";
import "./styles/print.css";
import Layout from "./components/Layout";
import Safety from "./pages/Safety"; // Keep Safety eagerly loaded for emergency access

// Lazy load other components
const MarkdownPage = lazy(() => import("./components/MarkdownPage"));
const Today = lazy(() => import("./pages/Today"));
const TrainingNutrition = lazy(() => import("./pages/TrainingNutrition"));
const CycleOverview = lazy(() => import("./pages/CycleOverview"));
const Glossary = lazy(() => import("./pages/Glossary"));
const Compounds = lazy(() => import("./pages/Compounds"));
const Schedule = lazy(() => import("./pages/Schedule"));
const ComponentDemo = lazy(() => import("./pages/ComponentDemo"));
const FAQ = lazy(() => import("./pages/FAQ"));

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-16 h-16 border-4 border-blue-200 rounded-full border-t-blue-600 animate-spin" />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    // Add mobile viewport meta tag
    const viewport = document.createElement("meta");
    viewport.name = "viewport";
    viewport.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    document.head.appendChild(viewport);

    // Register service worker for offline support
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("SW registered:", registration);
          })
          .catch((error) => {
            console.log("SW registration failed:", error);
          });
      });
    }

    return () => {
      // Cleanup viewport meta tag on unmount
      document.head.removeChild(viewport);
    };
  }, []);

  return (
    <DarkModeProvider>
      <UserPreferencesProvider>
        <ProfileProvider>
          <Router>
            <Layout>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Today />} />
                  <Route
                    path="/introduction"
                    element={
                      <MarkdownPage filePath="/content/01_introduction.md" />
                    }
                  />
                  <Route path="/cycle-overview" element={<CycleOverview />} />
                  <Route path="/compounds" element={<Compounds />} />
                  <Route
                    path="/training-nutrition"
                    element={<TrainingNutrition />}
                  />
                  <Route path="/glossary" element={<Glossary />} />
                  <Route path="/safety" element={<Safety />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/components" element={<ComponentDemo />} />
                  <Route path="/faq" element={<FAQ />} />
                </Routes>
              </Suspense>
            </Layout>
          </Router>
        </ProfileProvider>
      </UserPreferencesProvider>
    </DarkModeProvider>
  );
}
