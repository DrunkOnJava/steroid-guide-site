export interface Benefit {
  text: string;
}

export interface Consideration {
  text: string;
}

export interface CompoundDetails {
  name: string;
  type: string;
  halfLife: string;
  schedule: string;
  ratio?: string;
  benefits: Benefit[];
  considerations: Consideration[];
  storage?: string;
}
