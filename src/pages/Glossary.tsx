import GlossarySection from "../components/GlossarySection";

export default function Glossary() {
  const glossaryTerms = [
    {
      term: "Test Cyp",
      definition:
        "Testosterone Cypionate - long-acting injectable testosterone ester used as the primary anabolic compound",
      category: "Compounds",
    },
    {
      term: "NPP",
      definition:
        "Nandrolone Phenylpropionate - short-acting nandrolone ester for enhanced recovery and mass gains",
      category: "Compounds",
    },
    {
      term: "HCG",
      definition:
        "Human Chorionic Gonadotropin - peptide hormone that maintains testicular function during cycle",
      category: "Compounds",
    },
    {
      term: "Anabolic",
      definition:
        "Relating to the building of muscle tissue and growth processes",
      category: "Basic Terms",
    },
    {
      term: "Androgenic",
      definition: "Relating to the development of male sex characteristics",
      category: "Basic Terms",
    },
    {
      term: "AAS",
      definition:
        "Anabolic-Androgenic Steroids - compounds that promote muscle growth and androgenic effects",
      category: "Basic Terms",
    },
    {
      term: "PCT",
      definition:
        "Post-Cycle Therapy - protocol used to restore natural hormone production after cycle",
      category: "Cycle Terms",
    },
    {
      term: "AI",
      definition:
        "Aromatase Inhibitor - medication that prevents conversion of testosterone to estrogen",
      category: "Cycle Terms",
    },
    {
      term: "LH",
      definition:
        "Luteinizing Hormone - pituitary hormone that stimulates testosterone production",
      category: "Hormone Terms",
    },
    {
      term: "FSH",
      definition:
        "Follicle Stimulating Hormone - pituitary hormone important for sperm production",
      category: "Hormone Terms",
    },
    {
      term: "Gyno",
      definition:
        "Development of breast tissue in males due to elevated estrogen",
      category: "Side Effects",
    },
    {
      term: "MPB",
      definition: "Male Pattern Baldness accelerated by DHT-derived compounds",
      category: "Side Effects",
    },
    {
      term: "Hypertrophy",
      definition:
        "The increase in muscle size through training and enhanced protein synthesis",
      category: "Training Terms",
    },
    {
      term: "TDEE",
      definition:
        "Total Daily Energy Expenditure - total calories burned in a day",
      category: "Training Terms",
    },
    {
      term: "BP",
      definition:
        "Blood Pressure - vital sign that needs regular monitoring during cycle",
      category: "Health Markers",
    },
    {
      term: "HCT",
      definition: "Hematocrit - percentage of red blood cells in blood",
      category: "Health Markers",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Glossary of Terms
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        A comprehensive guide to commonly used terms and abbreviations in the
        field.
      </p>
      <GlossarySection terms={glossaryTerms} />
    </div>
  );
}
