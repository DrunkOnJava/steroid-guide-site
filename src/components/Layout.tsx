import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpenIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Introduction", href: "/", icon: DocumentTextIcon },
  {
    name: "Cycle Overview",
    href: "/cycle-overview",
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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  First Cycle Guide
                </h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-3">
              <div className="bg-white shadow-sm rounded-lg">
                <nav className="space-y-1 py-2">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center px-4 py-2 text-sm font-medium ${
                          isActive
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
              <div className="bg-white shadow-sm rounded-lg p-6">
                <div className="prose max-w-none">{children}</div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
