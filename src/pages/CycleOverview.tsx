import CycleTable from "../components/CycleTable";

export default function CycleOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Cycle Overview
        </h1>
        <p className="text-gray-600 mb-8">
          A comprehensive breakdown of your first steroid cycle, including
          compound timing, dosages, and purposes.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Weekly Breakdown
        </h2>
        <CycleTable />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cycle Phases</h2>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Phase 1: Main Cycle (Weeks 1-10)
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Focus on building lean mass and strength</li>
              <li>Combined effects of Testosterone Cypionate and NPP</li>
              <li>
                Support compounds (HCG, Anastrozole, Proviron) for side effect
                management
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Phase 2: Transition (Weeks 11-16)
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Tapering off secondary compounds</li>
              <li>Maintaining low-dose Testosterone Cypionate</li>
              <li>Preparing body for PCT</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Phase 3: Post-Cycle Therapy (Weeks 17-21)
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Implementation of Nolvadex and Clomid</li>
              <li>Focus on restoring natural hormone production</li>
              <li>Maintaining gains while transitioning off cycle</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Notes</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Always maintain consistent injection schedules</li>
            <li>
              Monitor for side effects and adjust AI (Anastrozole) dosage as
              needed
            </li>
            <li>Keep HCG administration consistent throughout the cycle</li>
            <li>Have all PCT medications ready before starting the cycle</li>
            <li>
              Regular blood work is essential for monitoring health markers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
