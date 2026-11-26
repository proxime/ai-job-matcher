export type OfferStatus =
  | "to-send"
  | "sent"
  | "contact"
  | "hr"
  | "task"
  | "tech"
  | "offer"
  | "rejected"
  | "no-reply";

export type Recommendation = "apply" | "quick-shot" | "skip";
export type RateVsMinimum = "above" | "within" | "below" | "unknown";
export type OfferSource = "extension" | "url" | "paste";

export interface Objective {
  text: string;
  done: boolean;
}

export interface Analysis {
  score: number;
  recommendation: Recommendation;
  strengths: string[];
  gaps: string[];
  rateVsMinimum: RateVsMinimum;
  prep: Objective[];
  summary: string;
}

export interface Offer {
  id: string;
  number: number;
  company: string;
  title: string;
  url?: string;
  rate?: string;
  workMode?: string;
  source: OfferSource;
  rawText?: string;
  status: OfferStatus;
  appliedAt?: string;
  notes?: string;
  analysis: Analysis;
  createdAt: string;
}

export type OfferDraft = Omit<
  Offer,
  "id" | "number" | "status" | "appliedAt" | "notes"
>;

export type ContractPatch = Partial<
  Pick<Offer, "status" | "appliedAt" | "notes">
> & { prep?: Objective[] };
