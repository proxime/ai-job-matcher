import type { Profile } from "@jm/shared";
import { fakeDelay } from "../../lib/fake-delay.ts";

let profile: Profile = {
  headline: "Senior Frontend / Fullstack TypeScript",
  yearsOfExperience: 6,
  skills: ["React", "TypeScript", "Next.js", "Node.js", "GraphQL", "Claude Code"],
  minRatePlnPerHour: 130,
  preferences: { remoteOnly: true, contract: ["B2B"] },
};

export async function getProfile(): Promise<Profile> {
  await fakeDelay();
  return profile;
}

export async function saveProfile(next: Profile): Promise<Profile> {
  await fakeDelay();
  profile = next;
  return profile;
}
