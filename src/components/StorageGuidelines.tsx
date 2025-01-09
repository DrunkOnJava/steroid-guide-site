/**
 * @fileoverview Component for displaying compound storage and handling guidelines
 * @project     Steroid Guide Site (v0.0.0)
 * @module      StorageGuidelines
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
 * A comprehensive component for displaying storage and handling guidelines for compounds.
 * Features sections for general storage practices and injection safety tips with
 * visual icons and clear formatting.
 *
 * Component Features:
 * - Customizable guideline sections
 * - Default guidelines provided
 * - Icon integration for visual context
 * - Responsive grid layout
 *
 * Content Organization:
 * - Categorized sections (storage, injection tips)
 * - Bullet-point guidelines
 * - Clear visual hierarchy
 * - Consistent spacing
 *
 * Visual Elements:
 * - Custom SVG icons
 * - Gradient text effects
 * - Card-based layout
 * - Color-coded elements
 *
 * @example
 * ```tsx
 * import StorageGuidelines from './StorageGuidelines';
 *
 * // Using default guidelines
 * function SafetyPage() {
 *   return <StorageGuidelines />;
 * }
 *
 * // Using custom guidelines
 * const customSections = [
 *   {
 *     title: "Temperature Control",
 *     icon: <ThermometerIcon />,
 *     items: [
 *       { text: "Store between 15-25°C" },
 *       { text: "Avoid direct sunlight" }
 *     ]
 *   }
 * ];
 *
 * function CustomGuidelines() {
 *   return <StorageGuidelines sections={customSections} />;
 * }
 * ```
 *
 * @dependencies
 * - react@18.3.1
 *
 * @requirements
 * - Tailwind CSS for styling
 * - Parent container with appropriate width
 * - SVG support for icons
 */

interface GuidelineItem {
  text: string;
}

interface GuidelineSection {
  title: string;
  icon: JSX.Element;
  items: GuidelineItem[];
}

interface StorageGuidelinesProps {
  sections?: GuidelineSection[];
}

export default function StorageGuidelines({
  sections,
}: StorageGuidelinesProps) {
  const defaultSections: GuidelineSection[] = [
    {
      title: "General Storage",
      icon: (
        <svg
          className="w-6 h-6 mr-2 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      items: [
        { text: "Store all compounds in a cool, dry place" },
        { text: "Keep HCG refrigerated" },
        { text: "Protect from light and heat" },
        { text: "Use sterile practices for injections" },
        { text: "Dispose of needles properly" },
      ],
    },
    {
      title: "Injection Tips",
      icon: (
        <svg
          className="w-6 h-6 mr-2 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
        </svg>
      ),
      items: [
        { text: "Rotate injection sites" },
        { text: "Use appropriate needle sizes" },
        { text: "Always aspirate before injecting" },
        { text: "Maintain sterile technique" },
        { text: "Keep track of injection schedule" },
      ],
    },
  ];

  const displaySections = sections || defaultSections;

  return (
    <div className="p-8 mt-16 bg-white border border-gray-100 shadow-lg dark:bg-gray-900 dark:border-gray-800 rounded-xl">
      <h2 className="mb-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
        Storage and Handling Guidelines
      </h2>
      <div className="grid gap-12 md:grid-cols-2">
        {displaySections.map((section, index) => (
          <div
            key={index}
            className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900/50"
          >
            <h3 className="flex items-center mb-4 text-xl font-bold text-gray-900 dark:text-white">
              {section.icon}
              {section.title}
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
