import { z } from "zod";

export const Profile = z.object({
  headline: z.string(),
  yearsOfExperience: z.number(),
  skills: z.array(z.string()),
  minRatePlnPerHour: z.number(),
});
export type Profile = z.infer<typeof Profile>;
