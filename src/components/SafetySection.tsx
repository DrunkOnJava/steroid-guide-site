import { useState } from "react";
import {
  ChevronDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

interface SafetyItemProps {
  title: string;
  children: React.ReactNode;
  type?: "warning" | "checklist" | "info";
}

const SafetyItem = ({ title, children, type = "info" }: SafetyItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const bgColors = {
    warning: "bg-red-50 hover:bg-red-100",
    checklist: "bg-green-50 hover:bg-green-100",
    info: "bg-blue-50 hover:bg-blue-100",
  };

  const iconColors = {
    warning: "text-red-500",
    checklist: "text-green-500",
    info: "text-blue-500",
  };

  const Icon = {
    warning: ExclamationTriangleIcon,
    checklist: CheckCircleIcon,
    info: ShieldCheckIcon,
  }[type];

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 rounded-lg ${bgColors[type]} transition-colors duration-200 flex items-center justify-between`}
      >
        <div className="flex items-center space-x-3">
          <Icon className={`h-6 w-6 ${iconColors[type]}`} />
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        <ChevronDownIcon
          className={`h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-white rounded-lg shadow-inner">
          {children}
        </div>
      )}
    </div>
  );
};

interface SafetySectionProps {
  content: {
    title: string;
    type: "warning" | "checklist" | "info";
    items: React.ReactNode;
  }[];
}

export default function SafetySection({ content }: SafetySectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {content.map((section, index) => (
          <SafetyItem key={index} title={section.title} type={section.type}>
            {section.items}
          </SafetyItem>
        ))}
      </div>
    </div>
  );
}
