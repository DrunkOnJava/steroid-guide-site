/**
 * @fileoverview Component for displaying compound metadata
 */

import { CompoundTypeIndicator } from "./";
import type { CompoundDetails } from "./types";

interface CompoundMetadataProps {
  compound: CompoundDetails;
}

export default function CompoundMetadata({ compound }: CompoundMetadataProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          Type
        </h4>
        <CompoundTypeIndicator type={compound.type} />
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          Half Life
        </h4>
        <p className="text-gray-900 dark:text-white">{compound.halfLife}</p>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          Schedule
        </h4>
        <p className="text-gray-900 dark:text-white">{compound.schedule}</p>
      </div>

      {compound.ratio && (
        <div>
          <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Ratio
          </h4>
          <p className="text-gray-900 dark:text-white">{compound.ratio}</p>
        </div>
      )}

      {compound.storage && (
        <div className="sm:col-span-2">
          <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            Storage
          </h4>
          <p className="text-gray-900 dark:text-white">{compound.storage}</p>
        </div>
      )}
    </div>
  );
}
