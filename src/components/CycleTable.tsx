interface CycleData {
  week: string;
  compound: string;
  frequency: string;
  dosage: string;
  purpose: string;
}

const cycleData: CycleData[] = [
  {
    week: "1–10",
    compound: "Testosterone Cypionate",
    frequency: "Twice Weekly",
    dosage: "250 mg x 2",
    purpose: "Base anabolic compound for muscle growth",
  },
  {
    week: "1–10",
    compound: "Nandrolone Phenylpropionate (NPP)",
    frequency: "Twice Weekly",
    dosage: "100 mg x 2",
    purpose: "Secondary anabolic for recovery and mass",
  },
  {
    week: "1–10",
    compound: "HCG",
    frequency: "Weekly",
    dosage: "500 IU",
    purpose: "Testicular maintenance during suppression",
  },
  {
    week: "1–10",
    compound: "Anastrozole",
    frequency: "EOD",
    dosage: "0.5 mg",
    purpose: "Estrogen control",
  },
  {
    week: "1–6",
    compound: "Proviron",
    frequency: "Daily",
    dosage: "25 mg",
    purpose: "Libido boost and mild estrogen control",
  },
  {
    week: "11–16",
    compound: "Testosterone Cypionate",
    frequency: "Twice Weekly",
    dosage: "250 mg x 2",
    purpose: "Gradual transition before PCT",
  },
  {
    week: "17–21",
    compound: "Nolvadex (Tamoxifen)",
    frequency: "Daily",
    dosage: "20 mg",
    purpose: "PCT to restore natural testosterone production",
  },
  {
    week: "17–21",
    compound: "Clomid (Clomiphene)",
    frequency: "Daily",
    dosage: "50 mg",
    purpose: "PCT to stimulate LH and FSH production",
  },
];

export default function CycleTable() {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
                {cycleData.map((row, idx) => (
                  <tr
                    key={`${row.week}-${row.compound}`}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.week}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.compound}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.frequency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.dosage}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
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
