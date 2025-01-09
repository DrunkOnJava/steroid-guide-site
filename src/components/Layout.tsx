/**
 * @fileoverview Main layout component providing navigation and page structure
 * @project     Steroid Guide Site (v0.0.0)
 * @module      Layout
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
 * Primary layout component that provides the structural foundation for the application.
 *
 * Core Features:
 * - Responsive navigation sidebar with active state indicators
 * - Reading progress indicator for long-form content
 * - Sticky header with branding
 * - Grid-based content layout
 * - Tailwind Typography styling for content
 *
 * Navigation System:
 * - Icon-based navigation items
 * - Visual feedback for active and hover states
 * - Smooth transitions and animations
 * - Proper spacing and hierarchy
 *
 * Content Presentation:
 * - Main content area with consistent padding
 * - Typography optimization for readability
 * - Responsive breakpoints for different screen sizes
 * - Proper content width constraints
 *
 * Visual Design:
 * - Gradient backgrounds
 * - Shadow effects for depth
 * - Consistent color scheme
 * - Border treatments for separation
 *
 * @example
 * ```tsx
 * import Layout from './Layout';
 * import { BrowserRouter } from 'react-router-dom';
 *
 * function App() {
 *   return (
 *     <BrowserRouter>
 *       <Layout>
 *         <h1>Welcome to the Guide</h1>
 *         <p>This content will be properly styled and positioned.</p>
 *       </Layout>
 *     </BrowserRouter>
 *   );
 * }
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - react-router-dom@7.1.1
 * - @heroicons/react@2.2.0
 *
 * @requirements
 * - Tailwind CSS with Typography plugin
 * - React Router for navigation
 * - Modern browser with CSS Grid and position:sticky support
 * - Proper viewport meta tags for responsive design
 * - Parent BrowserRouter component
 */

import { ReactNode, useEffect, useState } from "react";
import DarkModeToggle from "./ui/DarkModeToggle";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpenIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

interface LayoutProps {
  children: ReactNode;
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop ? (scrollTop / docHeight) * 100 : 0;
      setProgress(progress);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-0.5 bg-gray-100 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="h-full transition-all duration-200 ease-out bg-gradient-to-r from-blue-500 to-blue-600"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

const navigation = [
  { name: "Today", href: "/", icon: CalendarDaysIcon },
  { name: "Introduction", href: "/introduction", icon: DocumentTextIcon },
  {
    name: "Cycle Overview",
    href: "/cycle-overview",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: ClipboardDocumentListIcon,
  },
  { name: "Compounds", href: "/compounds", icon: BeakerIcon },
  {
    name: "Training & Nutrition",
    href: "/training-nutrition",
    icon: BookOpenIcon,
  },
  { name: "Glossary", href: "/glossary", icon: DocumentTextIcon },
  { name: "Safety", href: "/safety", icon: ClipboardDocumentListIcon },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <ReadingProgress />
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:bg-gray-950/90 dark:border-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200">
                First Cycle Guide
              </h1>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </nav>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-3">
              <div className="sticky border border-gray-100 shadow-lg bg-white/90 rounded-xl top-24 backdrop-blur-sm dark:bg-gray-950/90 dark:border-gray-800">
                <nav className="space-y-0.5 py-4">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "text-blue-600 bg-blue-50/80 border-r-4 border-blue-600 dark:text-blue-400 dark:bg-blue-900/30"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-r-4 hover:border-gray-200 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-200"
                        }`}
                      >
                        <Icon
                          className="flex-shrink-0 w-5 h-5 mr-3"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main content */}
            <main className="col-span-12 md:col-span-9">
              <div className="p-8 border border-gray-100 shadow-lg bg-white/90 rounded-xl backdrop-blur-sm dark:bg-gray-950/90 dark:border-gray-800">
                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md dark:prose-invert dark:prose-a:text-blue-400 dark:prose-strong:text-gray-100 dark:prose-code:text-blue-400 dark:prose-code:bg-gray-800">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
