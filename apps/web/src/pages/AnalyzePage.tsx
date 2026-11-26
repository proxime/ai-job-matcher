import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AnalyzeForm } from "../features/analyze/AnalyzeForm.tsx";
import { AnalyzeProgress } from "../features/analyze/AnalyzeProgress.tsx";
import { AnalyzeResultView } from "../features/analyze/AnalyzeResultView.tsx";
import { analyzeOffer } from "../features/analyze/api.ts";
import type { AnalyzeFormValues } from "../features/analyze/schema.ts";
import { useCreateContract } from "../features/contracts/queries.ts";
import type { Objective } from "../features/contracts/types.ts";
import { useProfile } from "../features/profile/queries.ts";
import { ApiError } from "../lib/api-error.ts";
import { InstallExtensionLink } from "../ui/InstallExtensionLink.tsx";
import { PageTitle } from "../ui/PageTitle.tsx";
import { StateCard } from "../ui/StateCard.tsx";
import { button, glow } from "../ui/styles.ts";

const linkSteps = [
  "Fetching the page",
  "Reading the offer",
  "Comparing with your profile",
  "Writing objectives",
];
const textSteps = linkSteps.slice(1);

const emptyValues: AnalyzeFormValues = { mode: "link", url: "", text: "" };

export function AnalyzePage() {
  const [values, setValues] = useState(emptyValues);
  const analyze = useMutation({ mutationFn: analyzeOffer });
  const createContract = useCreateContract();
  const profile = useProfile();
  const navigate = useNavigate();

  const analyzeText = ({ url, text }: AnalyzeFormValues, force?: boolean) => {
    analyze.mutate({ source: "paste", text, url: url || undefined, force });
  };

  const submit = (next: AnalyzeFormValues) => {
    setValues(next);
    if (next.mode === "link") {
      analyze.mutate({ source: "url", url: next.url });
    } else {
      analyzeText(next);
    }
  };

  const pageTitle = <title>Analyze – Job Coast</title>;

  if (analyze.isPending) {
    return (
      <>
        {pageTitle}
        <AnalyzeProgress
          steps={values.mode === "link" ? linkSteps : textSteps}
        />
      </>
    );
  }

  if (analyze.isError) {
    const unreadable =
      analyze.error instanceof ApiError &&
      (analyze.error.code === "FETCH_BLOCKED" ||
        analyze.error.code === "NO_CONTENT");

    if (!unreadable) {
      return (
        <StateCard accent="amber" title="Something went wrong">
          {pageTitle}
          <p className="leading-[1.55] text-jc-text-body">
            The analysis didn't finish. Your input is still here.
          </p>
          <button
            type="button"
            onClick={() => analyze.reset()}
            className={clsx(button.primary, "mt-2 self-start")}
          >
            Try again
          </button>
        </StateCard>
      );
    }

    return (
      <StateCard accent="amber" title="We couldn't read this page">
        {pageTitle}
        <p className="leading-[1.55] text-jc-text-body">
          The site blocks automated access, so we can't fetch the offer from
          the link. Nothing is lost — pick another way:
        </p>
        <div className="mt-2 flex flex-col gap-2.5">
          <InstallExtensionLink label="Use the extension" variant="primary" />
          <button
            type="button"
            onClick={() => {
              analyze.reset();
              setValues({ ...values, mode: "text" });
            }}
            className={button.secondary}
          >
            Paste the text instead
          </button>
        </div>
        <p className="text-[15px] text-jc-text-muted">
          Your link is kept with the pasted text.
        </p>
      </StateCard>
    );
  }

  if (analyze.data && !analyze.data.isJobOffer) {
    return (
      <StateCard accent="lavender" title="This doesn't look like a job offer">
        {pageTitle}
        <p className="leading-[1.55] text-jc-text-body">
          We found no role, requirements or company in this text. Check that
          you copied the whole ad, not just the page header.
        </p>
        <div className="mt-2 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => {
              analyze.reset();
              setValues({ ...values, text: "" });
            }}
            className={button.primary}
          >
            Try another offer
          </button>
          <button
            type="button"
            onClick={() => analyzeText(values, true)}
            className={button.secondary}
          >
            Analyze anyway
          </button>
        </div>
      </StateCard>
    );
  }

  if (analyze.data?.isJobOffer) {
    const { draft } = analyze.data;

    const accept = (prep: Objective[]) => {
      createContract.mutate(
        { ...draft, analysis: { ...draft.analysis, prep } },
        { onSuccess: (contract) => navigate(`/contracts/${contract.id}`) },
      );
    };

    const pass = () => {
      analyze.reset();
      setValues(emptyValues);
    };

    return (
      <>
        {pageTitle}
        <AnalyzeResultView
          draft={draft}
          minRate={profile.data?.minRatePlnPerHour}
          saving={createContract.isPending}
          onAccept={accept}
          onPass={pass}
        />
      </>
    );
  }

  return (
    <div className="mx-auto flex max-w-260 flex-col gap-12 text-[17px] lg:flex-row lg:items-start">
      {pageTitle}

      <section className="flex max-w-170 min-w-0 flex-1 flex-col gap-6">
        <div>
          <PageTitle size="lg">Analyze an offer</PageTitle>
          <p className="mt-2 leading-[1.55] text-jc-text-body">
            We compare the offer with your profile and tell you if it is worth
            your time.
          </p>
        </div>

        <AnalyzeForm defaultValues={values} onSubmit={submit} />

        <div className="border-t border-jc-line pt-6">
          <h2 className="mb-3 text-xl font-bold text-jc-amber">What you get</h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5.5 leading-[1.55] text-jc-text-body">
            <li>
              A match score and a clear verdict: take it, quick shot or pass
            </li>
            <li>Your edge and the risks, in plain words</li>
            <li>Objectives to prepare before the interview</li>
          </ol>
        </div>
      </section>

      <aside
        className={clsx(
          glow.teal,
          "flex w-full flex-col gap-3.5 p-6.5 lg:w-85 lg:shrink-0",
        )}
      >
        <h2 className="font-display text-[26px]">Faster: one click</h2>
        <p className="leading-[1.55] text-jc-text-body">
          The browser extension reads the offer you already have open and
          analyzes it without copying anything.
        </p>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-jc-text-body">
          <li>Works on every job board</li>
          <li>Shows a badge when it spots an offer</li>
          <li>Saves straight to your contracts</li>
        </ul>
        <InstallExtensionLink />
      </aside>
    </div>
  );
}
