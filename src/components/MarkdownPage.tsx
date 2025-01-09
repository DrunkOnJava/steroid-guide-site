/**
 * @fileoverview Enhanced markdown content renderer with custom styling and features
 * @project     Steroid Guide Site (v0.0.0)
 * @module      MarkdownPage
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
 * Advanced markdown rendering component with custom styling and enhanced features.
 *
 * Content Rendering:
 * - Custom component overrides for all markdown elements
 * - Enhanced typography with proper hierarchy
 * - Special styling for glossary terms and safety warnings
 * - Responsive table handling
 * - Code block formatting
 *
 * User Experience:
 * - Loading state with spinner
 * - Error handling with visual feedback
 * - Scroll to top button
 * - Smooth scrolling behavior
 *
 * Styling Features:
 * - Custom blockquote styling for important notes
 * - Enhanced list styling with special cases
 * - Proper spacing and margins
 * - Responsive design considerations
 *
 * Special Enhancements:
 * - Automatic glossary term formatting (term: definition)
 * - Warning/caution text highlighting
 * - Table overflow handling
 * - Code block syntax highlighting
 *
 * @example
 * ```tsx
 * import MarkdownPage from './MarkdownPage';
 *
 * // Basic usage
 * function IntroductionPage() {
 *   return <MarkdownPage filePath="/content/introduction.md" />;
 * }
 *
 * // Example markdown content structure:
 * // # Introduction
 * //
 * // ## Important Terms
 * // PCT: Post Cycle Therapy - Recovery protocol
 * //
 * // > Warning: Always consult healthcare professionals
 * //
 * // ```js
 * // const example = "code block";
 * // ```
 * ```
 *
 * @dependencies
 * - react@18.3.1
 * - react-markdown@9.0.3
 * - @heroicons/react@2.2.0
 *
 * @requirements
 * - Tailwind CSS with Typography plugin
 * - Properly formatted markdown files
 * - Public directory for markdown content
 * - Modern browser with fetch API
 * - Proper CORS configuration for file access
 */

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  ArrowUpIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface MarkdownPageProps {
  filePath: string;
}

export default function MarkdownPage({ filePath }: MarkdownPageProps) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load content (${response.status})`);
        }
        return response.text();
      })
      .then((text) => {
        setContent(text);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading markdown:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [filePath]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-red-600">
        <ExclamationTriangleIcon className="w-12 h-12 mb-4" />
        <p className="text-lg font-medium">Failed to load content</p>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative markdown-content">
      <ReactMarkdown
        className="prose prose-blue max-w-none prose-headings:scroll-mt-20 prose-h1:text-4xl prose-h1:font-extrabold prose-h2:text-3xl prose-h2:font-bold prose-h3:text-2xl prose-h3:font-semibold"
        components={{
          // Headers with enhanced styling
          h1: ({ ...props }) => (
            <h1
              className="pb-4 mb-8 text-4xl font-extrabold border-b-2 border-gray-200"
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              className="mt-12 mb-6 text-3xl font-bold text-gray-800"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className="mt-8 mb-4 text-2xl font-semibold text-gray-700"
              {...props}
            />
          ),
          // Lists with better hierarchy and spacing
          ul: ({ ...props }) => (
            <ul
              className="pl-6 my-6 space-y-2 list-disc marker:text-blue-500"
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <ol
              className="pl-6 my-6 space-y-2 list-decimal marker:text-blue-500"
              {...props}
            />
          ),
          // Enhanced paragraph styling
          p: ({ ...props }) => (
            <p className="my-4 leading-7 text-gray-600" {...props} />
          ),
          // Special styling for training routines
          table: ({ ...props }) => (
            <div className="my-8 overflow-x-auto">
              <table
                className="min-w-full border divide-y divide-gray-200"
                {...props}
              />
            </div>
          ),
          th: ({ ...props }) => (
            <th
              className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td
              className="px-4 py-3 text-sm text-gray-600 border-t whitespace-nowrap"
              {...props}
            />
          ),
          // Enhanced blockquotes for important notes
          blockquote: ({ ...props }) => (
            <blockquote
              className="py-4 pl-6 pr-4 my-6 italic text-gray-700 border-l-4 border-blue-500 rounded-r-lg bg-blue-50"
              {...props}
            />
          ),
          // Special styling for code and technical terms
          code: ({ ...props }) => (
            <code
              className="px-2 py-1 font-mono text-sm text-blue-600 bg-gray-100 rounded"
              {...props}
            />
          ),
          pre: ({ ...props }) => (
            <pre
              className="p-4 my-6 overflow-x-auto text-gray-100 bg-gray-800 rounded-lg"
              {...props}
            />
          ),
          // Enhanced list items
          li: ({ ...props }) => {
            const text = props.children?.toString() || "";
            // Check if this is a glossary term
            if (text.includes(": ")) {
              const [term, definition] = text.split(": ");
              return (
                <li className="my-4">
                  <span className="font-semibold text-gray-900">{term}: </span>
                  <span className="text-gray-600">{definition}</span>
                </li>
              );
            }
            // Check if this is a safety warning
            if (
              text.toLowerCase().includes("warning") ||
              text.toLowerCase().includes("caution") ||
              text.toLowerCase().includes("danger")
            ) {
              return (
                <li className="p-4 my-4 border-l-4 border-red-500 rounded-r-lg bg-red-50">
                  {props.children}
                </li>
              );
            }
            // Default list item styling
            return <li className="my-2 text-gray-600" {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed p-3 text-white transition-colors bg-blue-500 rounded-full shadow-lg bottom-8 right-8 hover:bg-blue-600"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
