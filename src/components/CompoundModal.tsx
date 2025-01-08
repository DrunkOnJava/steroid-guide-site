import Modal from "./Modal";
import { CompoundDetails } from "./CompoundCard";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface CompoundModalProps {
  compound: CompoundDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompoundModal({
  compound,
  isOpen,
  onClose,
}: CompoundModalProps) {
  if (!compound) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={compound.name}>
      <div className="space-y-6">
        {/* Type and Schedule */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Type</h4>
              <p className="mt-1 text-sm text-gray-900">{compound.type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Schedule</h4>
              <p className="mt-1 text-sm text-gray-900">{compound.schedule}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Half-Life</h4>
              <p className="mt-1 text-sm text-gray-900">{compound.halfLife}</p>
            </div>
            {compound.ratio && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Ratio</h4>
                <p className="mt-1 text-sm text-gray-900">{compound.ratio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
            Key Benefits
          </h4>
          <ul className="space-y-2">
            {compound.benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-start text-gray-600 pl-5 relative"
              >
                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-green-500" />
                {benefit.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Considerations */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mr-2" />
            Considerations
          </h4>
          <ul className="space-y-2">
            {compound.considerations.map((consideration, index) => (
              <li
                key={index}
                className="flex items-start text-gray-600 pl-5 relative"
              >
                <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
                {consideration.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Storage Info if available */}
        {compound.storage && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">
              Storage Requirements
            </h4>
            <p className="text-sm text-blue-700">{compound.storage}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
