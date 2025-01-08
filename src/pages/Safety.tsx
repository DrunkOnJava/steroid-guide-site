import SafetySection from "../components/SafetySection";

export default function Safety() {
  const safetyContent = [
    {
      title: "Pre-Cycle Requirements",
      type: "checklist" as const,
      items: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Essential Blood Work</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Total and Free Testosterone</li>
              <li>Estradiol (E2)</li>
              <li>Prolactin</li>
              <li>LH/FSH</li>
              <li>SHBG</li>
              <li>Thyroid (TSH, T3, T4)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Health Markers</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Complete Blood Count (CBC)</li>
              <li>Comprehensive Metabolic Panel (CMP)</li>
              <li>Lipid Panel</li>
              <li>PSA (if over 30)</li>
              <li>Blood Pressure</li>
              <li>ECG (recommended)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Emergency Protocols",
      type: "warning" as const,
      items: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 text-red-600">
              Immediate Medical Attention Required
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-red-700">
              <li>Severe chest pain/pressure</li>
              <li>Difficulty breathing</li>
              <li>Extreme blood pressure ({">"}160/100)</li>
              <li>Severe headaches</li>
              <li>Unusual heart rhythms</li>
              <li>Vision changes/problems</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Required Equipment",
      type: "info" as const,
      items: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Injection Supplies</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Proper gauge needles (23g-25g)</li>
              <li>Drawing needles (18g-20g)</li>
              <li>Sterile syringes</li>
              <li>Alcohol swabs</li>
              <li>Sharps container</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Preventive Measures",
      type: "checklist" as const,
      items: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Daily Practice</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>30 min cardio minimum</li>
              <li>Blood pressure monitoring</li>
              <li>Heart rate tracking</li>
              <li>Proper hydration</li>
              <li>Fish oil supplementation</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Safety Considerations
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Safety should always be your top priority. Review and follow these
        guidelines carefully.
      </p>
      <SafetySection content={safetyContent} />
    </div>
  );
}
