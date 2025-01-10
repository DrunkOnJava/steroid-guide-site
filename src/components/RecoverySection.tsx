/**
 * @fileoverview Component for displaying recovery protocols and markers
 * @project     Steroid Guide Site
 * @module      RecoverySection
 */

import { HeartIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "./ui";
import trainingData from "../data/trainingData";

export default function RecoverySection() {
  const essentialProtocols = trainingData.recoveryProtocols.filter(
    (p) => p.importance === "essential"
  );
  const recommendedProtocols = trainingData.recoveryProtocols.filter(
    (p) => p.importance === "recommended"
  );

  return (
    <div className="p-6 mt-8 bg-white shadow-lg dark:bg-gray-900 rounded-xl">
      <div className="flex items-center mb-6">
        <HeartIcon className="w-6 h-6 mr-2 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Recovery
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Essential Protocols */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
            <Tooltip content="Critical protocols that must be followed for optimal results">
              <span>Essential Protocols</span>
            </Tooltip>
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {essentialProtocols.map((protocol, index) => (
              <li key={index}>
                <Tooltip content={protocol.description}>
                  <span className="underline cursor-help">
                    • {protocol.name}
                    {protocol.frequency && ` (${protocol.frequency})`}
                  </span>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Protocols */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
            <Tooltip content="Additional protocols that can enhance recovery and results">
              <span>Recommended Protocols</span>
            </Tooltip>
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {recommendedProtocols.map((protocol, index) => (
              <li key={index}>
                <Tooltip content={protocol.description}>
                  <span className="underline cursor-help">
                    • {protocol.name}
                    {protocol.frequency && ` (${protocol.frequency})`}
                  </span>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>

        {/* Recovery Markers */}
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
            <Tooltip content="Key indicators to monitor your body's recovery status and readiness to train">
              <span>Recovery Markers</span>
            </Tooltip>
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {trainingData.recoveryProtocols
              .filter(
                (p) =>
                  p.name.includes("Heart Rate") ||
                  p.name.includes("Sleep Quality") ||
                  p.name.includes("Training Performance") ||
                  p.name.includes("Joint Comfort")
              )
              .map((marker, index) => (
                <li key={index}>
                  <Tooltip content={marker.description}>
                    <span className="underline cursor-help">
                      • {marker.name}
                    </span>
                  </Tooltip>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
