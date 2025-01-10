/**
 * @fileoverview Reusable safety information card component
 * @project     Steroid Guide Site
 * @module      SafetyCard
 */

import React from "react";

interface SafetyCardProps {
  title: string;
  type: "checklist" | "warning" | "info";
  children: React.ReactNode;
}

export default function SafetyCard({ title, type, children }: SafetyCardProps) {
  const getBgColor = () => {
    switch (type) {
      case "warning":
        return "bg-red-50 dark:bg-red-900/20";
      case "info":
        return "bg-blue-50 dark:bg-blue-900/20";
      default:
        return "bg-gray-50 dark:bg-gray-800/50";
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "warning":
        return "border-red-200 dark:border-red-800";
      case "info":
        return "border-blue-200 dark:border-blue-800";
      default:
        return "border-gray-200 dark:border-gray-700";
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case "warning":
        return "text-red-800 dark:text-red-400";
      case "info":
        return "text-blue-800 dark:text-blue-400";
      default:
        return "text-gray-900 dark:text-white";
    }
  };

  return (
    <div
      className={`p-6 rounded-lg border ${getBgColor()} ${getBorderColor()}`}
    >
      <h3 className={`text-xl font-semibold mb-4 ${getTitleColor()}`}>
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
