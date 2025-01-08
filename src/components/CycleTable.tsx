import { useState } from "react";

interface CycleData {
  week: string;
  compound: string;
  frequency: string;
  dosage: string;
  purpose: string;
  phase: "main" | "transition" | "pct";
  type: "primary" | "secondary" | "support" | "pct";
  tooltip?: string;
}

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-help border-b border-dotted border-gray-500"
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-10 w-48 px-2 py-1 -mt-1 text-sm text-white bg-gray-900 rounded-md shadow-lg transform -translate-x-1/2 left-1/2">
          {content}
        </div>
      )}
    </div>
  );
}

const cycleData: CycleData[] = [
  {
    week: "1–10",
    compound: "Testosterone Cypionate",
    frequency: "Twice Weekly",
    dosage: "250 mg x 2",
    purpose: "Base anabolic compound for muscle growth",
    phase: "main",
    type: "primary",
  },
  {
    week: "1–10",
    compound: "Nandrolone Phenylpropionate (NPP)",
    frequency: "Twice Weekly",
    dosage: "100 mg x 2",
    purpose: "Secondary anabolic for recovery and mass",
    phase: "main",
    type: "secondary",
  },
  {
    week: "1–10",
    compound: "HCG",
    frequency: "Weekly",
    dosage: "500 IU",
    purpose: "Testicular maintenance during suppression",
    phase: "main",
    type: "support",
    tooltip: "Human Chorionic Gonadotropin - Maintains testicular function",
  },
  {
    week: "1–10",
    compound: "Anastrozole",
    frequency: "EOD",
    dosage: "0.5 mg",
    purpose: "Estrogen control",
    phase: "main",
    type: "support",
    tooltip: "Aromatase Inhibitor - Controls estrogen levels",
  },
  {
    week: "1–6",
    compound: "Proviron",
    frequency: "Daily",
    dosage: "25 mg",
    purpose: "Libido boost and mild estrogen control",
    phase: "main",
    type: "support",
  },
  {
    week: "11–16",
    compound: "Testosterone Cypionate",
    frequency: "Twice Weekly",
    dosage: "250 mg x 2",
    purpose: "Gradual transition before PCT",
    phase: "transition",
    type: "primary",
    tooltip: "Post Cycle Therapy - Recovery phase after cycle",
  },
  {
    week: "17–21",
    compound: "Nolvadex (Tamoxifen)",
    frequency: "Daily",
    dosage: "20 mg",
    purpose: "PCT to restore natural testosterone production",
    phase: "pct",
    type: "pct",
  },
  {
    week: "17–21",
    compound: "Clomid (Clomiphene)",
    frequency: "Daily",
    dosage: "50 mg",
    purpose: "PCT to stimulate LH and FSH production",
    phase: "pct",
    type: "pct",
    tooltip:
      "LH (Luteinizing Hormone) and FSH (Follicle Stimulating Hormone) are key reproductive hormones",
  },
];

const phaseColors = {
  main: "bg-blue-50",
  transition: "bg-yellow-50",
  pct: "bg-green-50",
};

const typeColors = {
  primary: "text-blue-800",
  secondary: "text-purple-800",
  support: "text-gray-800",
  pct: "text-green-800",
};

export default function CycleTable() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span>Primary Compounds</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
          <span>Secondary Compounds</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
          <span>Support Compounds</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span>PCT Compounds</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Week
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Compound
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Frequency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Dosage
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cycleData.map((row) => (
                  <tr
                    key={`${row.week}-${row.compound}`}
                    className={`${
                      phaseColors[row.phase]
                    } hover:bg-opacity-75 transition-colors`}
                  >
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        typeColors[row.type]
                      }`}
                    >
                      {row.week}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        typeColors[row.type]
                      }`}
                    >
                      {row.tooltip ? (
                        <Tooltip content={row.tooltip}>{row.compound}</Tooltip>
                      ) : (
                        row.compound
                      )}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        typeColors[row.type]
                      }`}
                    >
                      {row.frequency === "EOD" ? (
                        <Tooltip content="Every Other Day">
                          {row.frequency}
                        </Tooltip>
                      ) : (
                        row.frequency
                      )}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        typeColors[row.type]
                      }`}
                    >
                      {row.dosage}
                    </td>
                    <td className={`px-6 py-4 text-sm ${typeColors[row.type]}`}>
                      {row.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
