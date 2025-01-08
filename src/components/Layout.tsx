import { ReactNode, useEffect, useState } from "react";
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
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-200 ease-out"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ReadingProgress />
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  First Cycle Guide
                </h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-3">
              <div className="bg-white shadow-lg rounded-xl border border-gray-100 sticky top-24">
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
                            ? "text-blue-600 bg-blue-50/80 border-r-4 border-blue-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-r-4 hover:border-gray-200"
                        }`}
                      >
                        <Icon
                          className="mr-3 h-5 w-5 flex-shrink-0"
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
              <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-8">
                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md">
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
