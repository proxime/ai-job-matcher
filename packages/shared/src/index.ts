import { z } from "zod";

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
