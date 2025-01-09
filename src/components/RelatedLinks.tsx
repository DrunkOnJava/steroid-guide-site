/**
 * @fileoverview Related content navigation component with visual indicators
 * @project     Steroid Guide Site (v0.0.0)
 * @module      RelatedLinks
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
 * A component for displaying related content links with visual enhancements.
 *
 * Navigation Features:
 * - Grid-based layout for multiple links
 * - Icon integration for visual context
 * - Hover effects for better interaction
 * - Responsive design across breakpoints
 *
 * Visual Elements:
 * - Card-based link presentation
 * - Color transitions on hover
 * - Icon placement and styling
 * - Typography hierarchy
 *
 * Content Structure:
 * - Title and description for each link
 * - Consistent spacing and alignment
 * - Clear visual hierarchy
 * - Proper link targeting
 *
 * @example
 * ```tsx
 * import RelatedLinks from './RelatedLinks';
 * import { BeakerIcon, BookOpenIcon } from '@heroicons/react/24/outline';
 *
 * const links = [
 *   {
 *     title: "Compound Information",
 *     description: "Learn about different compounds and their effects",
 *     path: "/compounds",
 *     icon: <BeakerIcon className="w-6 h-6" />
 *   },
 *   {
 *     title: "Training Guide",
 *     description: "Optimize your training routine",
 *     path: "/training",
 *     icon: <BookOpenIcon className="w-6 h-6" />
 *   }
 * ];
 *
 * function ContentPage() {
 *   return <RelatedLinks links={links} />;
 * }
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - react-router-dom@7.1.1
 *
 * @requirements
 * - Tailwind CSS for styling
 * - React Router for navigation
 * - Parent container with appropriate width
 * - Icon components for visual indicators
 */

import { Link } from "react-router-dom";

interface RelatedLink {
  title: string;
  description: string;
  path: string;
  icon: JSX.Element;
}

interface RelatedLinksProps {
  links: RelatedLink[];
}

export default function RelatedLinks({ links }: RelatedLinksProps) {
  return (
    <div className="p-8 mt-12 border shadow-lg bg-white/90 border-gray-100/50 backdrop-blur-sm dark:bg-gray-900/90 dark:border-gray-800/50 rounded-xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Related Information
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="block p-6 transition-all duration-200 rounded-lg group bg-gray-50/80 dark:bg-gray-900/30 hover:bg-blue-50/80 dark:hover:bg-blue-950/50 hover:shadow-md dark:hover:shadow-black/30"
          >
            <div className="flex items-center mb-3">
              <div className="text-blue-600 transition-colors duration-200 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                {link.icon}
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900 transition-colors duration-200 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300">
                {link.title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
