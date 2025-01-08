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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-red-600">
        <ExclamationTriangleIcon className="h-12 w-12 mb-4" />
        <p className="text-lg font-medium">Failed to load content</p>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="markdown-content relative">
      <ReactMarkdown
        className="prose prose-blue max-w-none prose-headings:scroll-mt-20 prose-h1:text-4xl prose-h1:font-extrabold prose-h2:text-3xl prose-h2:font-bold prose-h3:text-2xl prose-h3:font-semibold"
        components={{
          // Headers with enhanced styling
          h1: ({ ...props }) => (
            <h1
              className="text-4xl font-extrabold mb-8 pb-4 border-b-2 border-gray-200"
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              className="text-3xl font-bold mt-12 mb-6 text-gray-800"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className="text-2xl font-semibold mt-8 mb-4 text-gray-700"
              {...props}
            />
          ),
          // Lists with better hierarchy and spacing
          ul: ({ ...props }) => (
            <ul
              className="space-y-2 my-6 list-disc pl-6 marker:text-blue-500"
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <ol
              className="space-y-2 my-6 list-decimal pl-6 marker:text-blue-500"
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
                className="min-w-full divide-y divide-gray-200 border"
                {...props}
              />
            </div>
          ),
          th: ({ ...props }) => (
            <th
              className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td
              className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 border-t"
              {...props}
            />
          ),
          // Enhanced blockquotes for important notes
          blockquote: ({ ...props }) => (
            <blockquote
              className="my-6 pl-6 border-l-4 border-blue-500 bg-blue-50 py-4 pr-4 rounded-r-lg text-gray-700 italic"
              {...props}
            />
          ),
          // Special styling for code and technical terms
          code: ({ ...props }) => (
            <code
              className="px-2 py-1 rounded bg-gray-100 text-sm font-mono text-blue-600"
              {...props}
            />
          ),
          pre: ({ ...props }) => (
            <pre
              className="my-6 p-4 bg-gray-800 rounded-lg overflow-x-auto text-gray-100"
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
                <li className="my-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
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
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
