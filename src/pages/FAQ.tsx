/**
 * @fileoverview FAQ page component
 */

import FAQSection from "../components/FAQSection";

export default function FAQ() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="text-muted">
          Find answers to common questions about cycles, compounds, safety, and
          more. Use the search bar or category filters to find specific
          information.
        </p>
      </div>
      <FAQSection />
    </div>
  );
}
