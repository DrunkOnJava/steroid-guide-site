[object Promise]import { basicsFaqs } from "./basics";
import { healthFaqs } from "./health";
import { compoundsFaqs } from "./compounds";
import { pctFaqs } from "./pct";
import { safetyFaqs } from "./safety";
import { storageFaqs } from "./storage";
import { nutritionFaqs } from "./nutrition";
import { trainingFaqs } from "./training";

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const categories = [
  { id: "all", name: "All" },
  { id: "basics", name: "Basics" },
  { id: "pct", name: "PCT" },
  { id: "safety", name: "Safety" },
  { id: "health", name: "Health" },
  { id: "storage", name: "Storage" },
  { id: "nutrition", name: "Nutrition" },
  { id: "training", name: "Training" },
  { id: "compounds", name: "Compounds" },
];

export const faqs: FAQItem[] = [
  ...basicsFaqs,
  ...healthFaqs,
  ...compoundsFaqs,
  ...pctFaqs,
  ...safetyFaqs,
  ...storageFaqs,
  ...nutritionFaqs,
  ...trainingFaqs,
];
