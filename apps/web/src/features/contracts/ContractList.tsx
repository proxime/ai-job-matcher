import clsx from "clsx";
import { Link } from "react-router";
import { isStrongScore, statusInfo } from "./status.ts";
import type { Offer } from "./types.ts";

interface ContractListProps {
  contracts: Offer[];
  selectedId?: string;
  linkTo: (contract: Offer) => string;
  replaceHistory?: boolean;
}

export function ContractList({
  contracts,
  selectedId,
  linkTo,
  replaceHistory,
}: ContractListProps) {
  if (contracts.length === 0) {
    return <p className="py-6 text-jc-text-muted">No contracts match.</p>;
  }

  return (
    <ul className="flex flex-col gap-1.5">
      {contracts.map((contract) => {
        const selected = contract.id === selectedId;
        const strong = isStrongScore(contract.analysis.score);
        const status = statusInfo[contract.status];

        return (
          <li key={contract.id}>
            <Link
              to={linkTo(contract)}
              replace={replaceHistory}
              preventScrollReset
              aria-current={selected ? "true" : undefined}
              className={clsx(
                "flex items-center gap-3.5 rounded-jc-md border px-4 py-3.5 text-jc-text no-underline hover:text-jc-text",
                {
                  "border-jc-glow-selected bg-jc-surface-active shadow-glow-selected":
                    selected,
                  "border-transparent bg-jc-surface hover:bg-jc-surface-active":
                    !selected,
                },
              )}
            >
              <span
                className={clsx(
                  "w-12 font-display text-3xl lg:w-10 lg:text-[26px]",
                  { "text-jc-pink": strong, "text-jc-text-muted": !strong },
                )}
              >
                <span className="sr-only">Match </span>
                {contract.analysis.score}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold">
                  {contract.company}
                </span>
                <span className="block truncate text-sm text-jc-text-muted">
                  <span className="hidden lg:inline">{contract.title}</span>
                  <span className="lg:hidden">
                    {contract.rate ?? "no range"}
                  </span>
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-jc-text-muted">
                <span
                  aria-hidden="true"
                  className={clsx("size-2.5 rounded-full", status.dotClass)}
                />
                {status.group}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
