import clsx from "clsx";
import { rateVsMinimumInfo, sourceLabel } from "./status.ts";
import type { OfferDraft } from "./types.ts";

interface FactsGridProps {
  offer: Pick<OfferDraft, "rate" | "workMode" | "source" | "analysis">;
  minRate?: number;
  className?: string;
}

export function FactsGrid({ offer, minRate, className }: FactsGridProps) {
  const rate = rateVsMinimumInfo[offer.analysis.rateVsMinimum];
  const facts = [
    { term: "Payout", value: offer.rate ?? "no range" },
    {
      term: `vs your ${minRate ?? "minimum"}`,
      value: rate.label,
      className: rate.className,
    },
    { term: "Mode", value: offer.workMode ?? "not stated" },
    { term: "Source", value: sourceLabel[offer.source] },
  ];

  return (
    <dl className={clsx("grid grid-cols-2 gap-x-3 gap-y-3.5", className)}>
      {facts.map((fact) => (
        <div key={fact.term}>
          <dt className="text-sm text-jc-text-muted">{fact.term}</dt>
          <dd className={clsx("mt-1 font-bold", fact.className)}>
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
