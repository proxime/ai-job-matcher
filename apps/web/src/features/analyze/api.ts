import { ApiError } from "../../lib/api-error.ts";
import { fakeDelay } from "../../lib/fake-delay.ts";
import type { OfferDraft } from "../contracts/types.ts";

const MIN_OFFER_TEXT_LENGTH = 200;

export type AnalyzeRequest =
  | { source: "url"; url: string }
  | { source: "paste"; text: string; url?: string; force?: boolean };

export type AnalyzeResult =
  | { isJobOffer: false }
  | { isJobOffer: true; draft: OfferDraft };

const sampleDraft: Omit<OfferDraft, "source" | "url" | "rawText" | "createdAt"> =
  {
    company: "Brightline Software",
    title: "Senior React Engineer",
    rate: "150–170 PLN/h",
    workMode: "Remote",
    analysis: {
      score: 84,
      recommendation: "apply",
      rateVsMinimum: "above",
      summary:
        "The stack is a close match and the payout clears your minimum. Design-system ownership is the one area to prepare for.",
      strengths: [
        "React and TypeScript as the core stack",
        "Experience with microfrontends at scale",
        "GraphQL on the client side",
      ],
      gaps: ["Expects ownership of a design system"],
      prep: [
        { text: "Prepare a design-system story from past work", done: false },
        { text: "Review GraphQL caching strategies", done: false },
      ],
    },
  };

export async function analyzeOffer(
  request: AnalyzeRequest,
): Promise<AnalyzeResult> {
  await fakeDelay(2400);

  if (request.source === "url") {
    if (new URL(request.url).hostname.includes("linkedin.")) {
      throw new ApiError("FETCH_BLOCKED");
    }
  } else if (
    !request.force &&
    request.text.trim().length < MIN_OFFER_TEXT_LENGTH
  ) {
    return { isJobOffer: false };
  }

  return {
    isJobOffer: true,
    draft: {
      ...sampleDraft,
      source: request.source,
      url: request.url,
      rawText: request.source === "paste" ? request.text : undefined,
      createdAt: new Date().toISOString(),
    },
  };
}
