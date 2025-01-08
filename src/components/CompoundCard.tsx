import { BeakerIcon, ClockIcon, ScaleIcon } from "@heroicons/react/24/outline";

interface CompoundBenefit {
  text: string;
}

interface CompoundConsideration {
  text: string;
}

export interface CompoundDetails {
  name: string;
  type: string;
  halfLife: string;
  schedule: string;
  ratio?: string;
  benefits: CompoundBenefit[];
  considerations: CompoundConsideration[];
  storage?: string;
}

interface CompoundCardProps {
  compound: CompoundDetails;
  onSelect: (compound: CompoundDetails) => void;
}

export default function CompoundCard({
  compound,
  onSelect,
}: CompoundCardProps) {
  return (
    <div
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-100 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onSelect(compound)}
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <h3 className="text-2xl font-extrabold text-white mb-3 relative">
          {compound.name}
        </h3>
        <div className="flex items-center text-blue-50 relative">
          <BeakerIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium tracking-wide">{compound.type}</span>
        </div>
      </div>

      {/* Quick Info */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center group/item">
            <ClockIcon className="h-5 w-5 text-blue-500/70 mr-3 flex-shrink-0 group-hover/item:text-blue-600 transition-colors duration-200" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500 mb-0.5">
                Half-Life
              </span>
              <span className="text-sm text-gray-900 font-medium truncate">
                {compound.halfLife}
              </span>
            </div>
          </div>
          <div className="flex items-center group/item">
            <ScaleIcon className="h-5 w-5 text-blue-500/70 mr-3 flex-shrink-0 group-hover/item:text-blue-600 transition-colors duration-200" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500 mb-0.5">
                {compound.ratio ? "Ratio" : "Schedule"}
              </span>
              <span className="text-sm text-gray-900 font-medium truncate">
                {compound.ratio || compound.schedule}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Benefits */}
      <div className="px-6 py-4">
        <div className="text-sm">
          <span className="font-semibold text-gray-900 mr-1">Benefits:</span>
          <span className="text-gray-600">{compound.benefits[0].text}...</span>
        </div>
      </div>
    </div>
  );
}
