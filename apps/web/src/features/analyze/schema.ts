import { z } from "zod";
import { MAX_OFFER_TEXT_LENGTH } from "./api.ts";

const offerLink = z
  .string()
  .min(1, "Paste the link to the offer.")
  .pipe(
    z.url({
      protocol: /^https?$/,
      error: "Enter a full link that starts with https://",
    }),
  );

const offerText = z
  .string()
  .trim()
  .min(1, "Paste the text of the offer.")
  .max(MAX_OFFER_TEXT_LENGTH, "The text is too long. Paste only the job ad.");

export const analyzeFormSchema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("link"), url: offerLink, text: z.string() }),
  z.object({ mode: z.literal("text"), url: z.string(), text: offerText }),
]);

export type AnalyzeFormValues = z.infer<typeof analyzeFormSchema>;
export type AnalyzeMode = AnalyzeFormValues["mode"];
