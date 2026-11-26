import type {
  OfferSource,
  OfferStatus,
  RateVsMinimum,
  Recommendation,
} from "./types.ts";

export type StatusFilter = "active" | "closed";

interface StatusInfo {
  label: string;
  group: string;
  dotClass: string;
  filter: StatusFilter;
}

export const statusInfo: Record<OfferStatus, StatusInfo> = {
  "to-send": {
    label: "To send",
    group: "To send",
    dotClass: "bg-jc-amber",
    filter: "active",
  },
  sent: {
    label: "Sent",
    group: "Sent",
    dotClass: "bg-jc-teal",
    filter: "active",
  },
  contact: {
    label: "Contact",
    group: "Interviews",
    dotClass: "bg-jc-lavender",
    filter: "active",
  },
  hr: {
    label: "HR interview",
    group: "Interviews",
    dotClass: "bg-jc-lavender",
    filter: "active",
  },
  task: {
    label: "Task",
    group: "Interviews",
    dotClass: "bg-jc-lavender",
    filter: "active",
  },
  tech: {
    label: "Tech interview",
    group: "Interviews",
    dotClass: "bg-jc-lavender",
    filter: "active",
  },
  offer: {
    label: "Offer",
    group: "Offer",
    dotClass: "bg-jc-green",
    filter: "active",
  },
  rejected: {
    label: "Rejected",
    group: "Rejected",
    dotClass: "bg-jc-pink-soft",
    filter: "closed",
  },
  "no-reply": {
    label: "No reply",
    group: "No reply",
    dotClass: "bg-jc-grey",
    filter: "closed",
  },
};

export const statusOrder = Object.keys(statusInfo) as OfferStatus[];

export const recommendationLabel: Record<Recommendation, string> = {
  apply: "Take it",
  "quick-shot": "Quick shot",
  skip: "Pass",
};

export const rateVsMinimumInfo: Record<
  RateVsMinimum,
  { label: string; className: string }
> = {
  above: { label: "▲ above", className: "text-jc-teal" },
  within: { label: "● within", className: "text-jc-text" },
  below: { label: "▼ below", className: "text-jc-pink-soft" },
  unknown: { label: "— unknown", className: "text-jc-text-muted" },
};

export const recommendationHeadline: Record<Recommendation, string> = {
  apply: "Take this contract",
  "quick-shot": "Worth a quick shot",
  skip: "Pass on this one",
};

export const sourceLabel: Record<OfferSource, string> = {
  extension: "Extension",
  url: "Link",
  paste: "Pasted text",
};

export const isStrongScore = (score: number) => score >= 60;
