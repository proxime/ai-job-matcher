import clsx from "clsx";
import { useId } from "react";
import { Link } from "react-router";
import { formatContractNumber } from "../../lib/format.ts";
import {
  isStrongScore,
  rateVsMinimumInfo,
  recommendationLabel,
  statusInfo,
  statusOrder,
} from "./status.ts";
import type { Offer, OfferStatus } from "./types.ts";

interface ContractPreviewProps {
  contract: Offer;
  minRate?: number;
  onStatusChange: (id: string, status: OfferStatus) => void;
}

export function ContractPreview({
  contract,
  minRate,
  onStatusChange,
}: ContractPreviewProps) {
  const statusSelectId = useId();
  const { analysis } = contract;
  const strong = isStrongScore(analysis.score);
  const rate = rateVsMinimumInfo[analysis.rateVsMinimum];
  const objectivesDone = analysis.prep.filter(
    (objective) => objective.done,
  ).length;
  const meta = [
    contract.company,
    contract.workMode,
    `contract ${formatContractNumber(contract.number)}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      aria-label={`${contract.title}, ${contract.company}`}
      className="flex min-w-0 flex-1 flex-col gap-6 rounded-jc-lg bg-jc-surface p-8"
    >
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0 flex-1">
          <p className="text-jc-text-muted">{meta}</p>
          <h2 className="mt-2 font-display text-[38px] leading-[1.08]">
            {contract.title}
          </h2>
        </div>
        <div className="shrink-0 text-right">
          <p
            className={clsx("font-display text-[64px] leading-[0.95]", {
              "text-jc-pink text-shadow-glow-score": strong,
              "text-jc-text-muted": !strong,
            })}
          >
            <span className="sr-only">Match </span>
            {analysis.score}%
          </p>
          <p className="mt-1.5 inline-flex rounded-full bg-jc-amber px-3.5 py-1.5 font-bold text-jc-bg">
            {recommendationLabel[analysis.recommendation]}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-4 border-y border-jc-line py-4.5">
        <div>
          <dt className="text-sm text-jc-text-muted">Payout</dt>
          <dd className="mt-1 font-bold">{contract.rate ?? "no range"}</dd>
        </div>
        <div>
          <dt className="text-sm text-jc-text-muted">
            vs your {minRate ?? "minimum"}
          </dt>
          <dd className={clsx("mt-1 font-bold", rate.className)}>
            {rate.label}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-jc-text-muted">Objectives</dt>
          <dd className="mt-1 font-bold">
            {objectivesDone} of {analysis.prep.length} done
          </dd>
        </div>
      </dl>

      <p className="text-[19px] leading-[1.55]">{analysis.summary}</p>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="mb-2.5 text-lg font-bold text-jc-teal">Your edge</h3>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-jc-text-body">
            {analysis.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2.5 text-lg font-bold text-jc-pink-soft">Risks</h3>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-jc-text-body">
            {analysis.gaps.map((gap) => (
              <li key={gap}>{gap}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-jc-line pt-5">
        <label htmlFor={statusSelectId} className="text-jc-text-muted">
          Status
        </label>
        <select
          id={statusSelectId}
          value={contract.status}
          onChange={(event) =>
            onStatusChange(contract.id, event.target.value as OfferStatus)
          }
          className="min-h-11.5 rounded-jc border border-jc-border bg-jc-bg px-3 text-jc-text"
        >
          {statusOrder.map((status) => (
            <option key={status} value={status}>
              {statusInfo[status].label}
            </option>
          ))}
        </select>
        <Link
          to={`/contracts/${contract.id}`}
          className="ml-auto inline-flex min-h-11.5 items-center rounded-jc bg-jc-pink px-5.5 font-bold text-jc-bg no-underline hover:text-jc-bg"
        >
          Open full contract
        </Link>
      </div>
    </article>
  );
}
