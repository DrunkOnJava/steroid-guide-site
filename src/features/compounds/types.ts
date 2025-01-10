export interface CompoundBenefit {
  text: string;
}

export interface CompoundConsideration {
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
  description: string;
  guidelines: string[];
  safetyInfo: string[];
}
