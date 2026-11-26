import clsx from "clsx";
import { useId, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ContractList } from "../features/contracts/ContractList.tsx";
import { ContractPreview } from "../features/contracts/ContractPreview.tsx";
import {
  useContracts,
  useUpdateContract,
} from "../features/contracts/queries.ts";
import { statusInfo, type StatusFilter } from "../features/contracts/status.ts";
import type { OfferStatus } from "../features/contracts/types.ts";
import { useProfile } from "../features/profile/queries.ts";
import { useMediaQuery, WIDE_SCREEN } from "../lib/useMediaQuery.ts";
import { AnalyzeLink } from "../ui/AnalyzeLink.tsx";
import { InstallExtensionLink } from "../ui/InstallExtensionLink.tsx";
import { PageTitle } from "../ui/PageTitle.tsx";
import { StateCard } from "../ui/StateCard.tsx";
import { button } from "../ui/styles.ts";

const filters: { value: StatusFilter; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "closed", label: "Closed" },
];

export function ContractsPage() {
  const contractsQuery = useContracts();
  const profile = useProfile();
  const updateContract = useUpdateContract();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("active");
  const [searchParams] = useSearchParams();
  const isWide = useMediaQuery(WIDE_SCREEN);
  const searchInputId = useId();

  if (contractsQuery.isPending) {
    return (
      <>
        <title>Contracts – Job Coast</title>
        <PageTitle>Contracts</PageTitle>
        <p className="mt-4 text-jc-text-muted">Loading contracts…</p>
      </>
    );
  }

  if (contractsQuery.isError) {
    return (
      <>
        <title>Contracts – Job Coast</title>
        <PageTitle>Contracts</PageTitle>
        <p role="alert" className="mt-4 text-jc-text-body">
          We couldn't load your contracts. Try again in a moment.
        </p>
      </>
    );
  }

  const contracts = contractsQuery.data;

  if (contracts.length === 0) {
    return (
      <StateCard accent="teal" title="No contracts yet">
        <title>Contracts – Job Coast</title>
        <p className="leading-[1.55] text-jc-text-body">
          Analyze your first offer. Every contract you accept lands here with
          its score, payout and status.
        </p>
        <div className="mt-2 flex flex-wrap gap-2.5">
          <Link to="/analyze" className={button.primary}>
            Analyze an offer
          </Link>
          <InstallExtensionLink />
        </div>
      </StateCard>
    );
  }

  const query = search.trim().toLowerCase();
  const visible = contracts
    .filter((contract) => statusInfo[contract.status].filter === filter)
    .filter(
      (contract) =>
        !query ||
        contract.company.toLowerCase().includes(query) ||
        contract.title.toLowerCase().includes(query),
    )
    .toSorted((a, b) => b.analysis.score - a.analysis.score);

  const selected = isWide
    ? (visible.find(
        (contract) => contract.id === searchParams.get("selected"),
      ) ?? visible[0])
    : undefined;

  const changeStatus = (id: string, status: OfferStatus) => {
    updateContract.mutate({ id, patch: { status } });
  };

  return (
    <div className="flex flex-col gap-7 lg:flex-row lg:items-start">
      <title>Contracts – Job Coast</title>

      <section
        aria-label="Contract list"
        className="flex flex-col gap-3 lg:w-100 lg:shrink-0"
      >
        <div className="flex items-center justify-between gap-3">
          <PageTitle>Contracts</PageTitle>
          <AnalyzeLink className="hidden sm:flex" />
        </div>

        <div className="hidden sm:block">
          <label htmlFor={searchInputId} className="sr-only">
            Search contracts
          </label>
          <input
            id={searchInputId}
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search company or role"
            className="min-h-11.5 w-full rounded-jc border border-jc-border bg-jc-surface px-3.5 text-jc-text placeholder:text-jc-text-muted"
          />
        </div>

        <div
          role="group"
          aria-label="Filter by status"
          className="flex flex-wrap gap-2"
        >
          {filters.map(({ value, label }) => {
            const count = contracts.filter(
              (contract) => statusInfo[contract.status].filter === value,
            ).length;

            return (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
                className={clsx(
                  "min-h-11 cursor-pointer rounded-full px-3.5 lg:min-h-9 lg:px-3",
                  {
                    "bg-jc-text font-bold text-jc-bg": filter === value,
                    "border border-jc-border text-jc-text hover:bg-jc-surface":
                      filter !== value,
                  },
                )}
              >
                {label} · {count}
              </button>
            );
          })}
        </div>

        <ContractList
          contracts={visible}
          selectedId={selected?.id}
          linkTo={(contract) =>
            isWide
              ? `/contracts?selected=${contract.id}`
              : `/contracts/${contract.id}`
          }
          replaceHistory={isWide}
        />
      </section>

      {isWide &&
        (selected ? (
          <ContractPreview
            contract={selected}
            minRate={profile.data?.minRatePlnPerHour}
            onStatusChange={changeStatus}
          />
        ) : (
          <p className="flex-1 rounded-jc-lg bg-jc-surface p-8 text-jc-text-muted">
            Nothing to preview. Change the filter or the search.
          </p>
        ))}
    </div>
  );
}
