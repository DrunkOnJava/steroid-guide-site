interface GuidelineItem {
  text: string;
}

interface GuidelineSection {
  title: string;
  icon: JSX.Element;
  items: GuidelineItem[];
}

interface StorageGuidelinesProps {
  sections?: GuidelineSection[];
}

export default function StorageGuidelines({
  sections,
}: StorageGuidelinesProps) {
  const defaultSections: GuidelineSection[] = [
    {
      title: "General Storage",
      icon: (
        <svg
          className="w-6 h-6 mr-2 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      items: [
        { text: "Store all compounds in a cool, dry place" },
        { text: "Keep HCG refrigerated" },
        { text: "Protect from light and heat" },
        { text: "Use sterile practices for injections" },
        { text: "Dispose of needles properly" },
      ],
    },
    {
      title: "Injection Tips",
      icon: (
        <svg
          className="w-6 h-6 mr-2 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
        </svg>
      ),
      items: [
        { text: "Rotate injection sites" },
        { text: "Use appropriate needle sizes" },
        { text: "Always aspirate before injecting" },
        { text: "Maintain sterile technique" },
        { text: "Keep track of injection schedule" },
      ],
    },
  ];

  const displaySections = sections || defaultSections;

  return (
    <div className="mt-16 bg-white rounded-xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
        Storage and Handling Guidelines
      </h2>
      <div className="grid md:grid-cols-2 gap-12">
        {displaySections.map((section, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              {section.icon}
              {section.title}
            </h3>
            <ul className="space-y-3 text-gray-600">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
