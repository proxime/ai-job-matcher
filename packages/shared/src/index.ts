import { z } from "zod";

export const MAX_OFFER_TEXT_LENGTH = 20_000;

export const ContractType = z.enum(["B2B", "UoP"]);
export type ContractType = z.infer<typeof ContractType>;

export const Profile = z.object({
  headline: z.string().trim().min(1, "Describe yourself in a few words."),
  yearsOfExperience: z
    .number({ error: "Enter your years of experience." })
    .min(0, "This can't be negative.")
    .max(60, "Enter 60 or fewer."),
  skills: z.array(z.string()).min(1, "Add at least one skill."),
  minRatePlnPerHour: z
    .number({ error: "Enter your minimum rate." })
    .min(1, "Enter a rate above zero."),
  preferences: z.object({
    remoteOnly: z.boolean(),
    contract: z.array(ContractType),
  }),
});
export type Profile = z.infer<typeof Profile>;

export const OfferStatus = z.enum([
  "to-send",
  "sent",
  "contact",
  "hr",
  "task",
  "tech",
  "offer",
  "rejected",
  "no-reply",
]);
export type OfferStatus = z.infer<typeof OfferStatus>;

export const Recommendation = z.enum(["apply", "quick-shot", "skip"]);
export type Recommendation = z.infer<typeof Recommendation>;

export const RateVsMinimum = z.enum(["above", "within", "below", "unknown"]);
export type RateVsMinimum = z.infer<typeof RateVsMinimum>;

export const OfferSource = z.enum(["extension", "url", "paste"]);
export type OfferSource = z.infer<typeof OfferSource>;

export const Objective = z.object({
  text: z.string().min(1),
  done: z.boolean(),
});
export type Objective = z.infer<typeof Objective>;

export const Analysis = z.object({
  score: z.int().min(0).max(100),
  recommendation: Recommendation,
  strengths: z.array(z.string()),
  gaps: z.array(z.string()),
  rateVsMinimum: RateVsMinimum,
  prep: z.array(Objective),
  summary: z.string(),
});
export type Analysis = z.infer<typeof Analysis>;

export const Offer = z.object({
  id: z.string().min(1),
  number: z.int().positive(),
  company: z.string().min(1),
  title: z.string().min(1),
  url: z.url().optional(),
  rate: z.string().optional(),
  workMode: z.string().optional(),
  source: OfferSource,
  rawText: z.string().max(MAX_OFFER_TEXT_LENGTH).optional(),
  status: OfferStatus,
  appliedAt: z.iso.date().optional(),
  notes: z.string().optional(),
  analysis: Analysis,
  createdAt: z.iso.datetime(),
});
export type Offer = z.infer<typeof Offer>;

export const OfferDraft = Offer.omit({
  id: true,
  number: true,
  status: true,
  appliedAt: true,
  notes: true,
});
export type OfferDraft = z.infer<typeof OfferDraft>;

export const OfferPatch = Offer.pick({
  status: true,
  appliedAt: true,
  notes: true,
})
  .partial()
  .extend({ prep: z.array(Objective).optional() });
export type OfferPatch = z.infer<typeof OfferPatch>;
