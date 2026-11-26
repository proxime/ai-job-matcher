import clsx from "clsx";
import { useNavigate } from "react-router";
import { ProfileForm } from "../features/profile/ProfileForm.tsx";
import { useProfile, useSaveProfile } from "../features/profile/queries.ts";
import { InstallExtensionLink } from "../ui/InstallExtensionLink.tsx";
import { PageTitle } from "../ui/PageTitle.tsx";
import { glow } from "../ui/styles.ts";

export function ProfilePage() {
  const profile = useProfile();
  const saveProfile = useSaveProfile();
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-260 flex-col gap-12 text-[17px] lg:flex-row lg:items-start">
      <title>Profile – Job Coast</title>

      <section className="flex max-w-170 min-w-0 flex-1 flex-col gap-6">
        <div>
          <p className="mb-1.5 text-jc-text-muted">Step 1 of 2</p>
          <PageTitle size="lg">Your profile</PageTitle>
          <p className="mt-2 leading-[1.55] text-jc-text-body">
            Every offer is compared with this profile. You can change it any
            time.
          </p>
        </div>

        {profile.isPending && (
          <p className="text-jc-text-muted">Loading profile…</p>
        )}
        {profile.isError && (
          <p role="alert" className="text-jc-text-body">
            We couldn't load your profile. Try again in a moment.
          </p>
        )}
        {profile.data && (
          <ProfileForm
            profile={profile.data}
            saving={saveProfile.isPending}
            onSave={(next) =>
              saveProfile.mutate(next, {
                onSuccess: () => navigate("/analyze"),
              })
            }
          />
        )}
      </section>

      <aside className="flex w-full flex-col gap-5 lg:w-85 lg:shrink-0">
        <div className={clsx(glow.amber, "p-6.5")}>
          <h2 className="font-display text-2xl">Why we ask</h2>
          <p className="mt-2.5 leading-[1.55] text-jc-text-body">
            Your skills, years and minimum rate decide the match score and the
            payout check on every contract.
          </p>
        </div>
        <div className={clsx(glow.teal, "flex flex-col gap-3 p-6.5")}>
          <h2 className="font-display text-2xl">Step 2: the extension</h2>
          <p className="leading-[1.55] text-jc-text-body">
            Analyze offers in one click, right on the job board.
          </p>
          <InstallExtensionLink />
        </div>
      </aside>
    </div>
  );
}
