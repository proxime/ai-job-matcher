import { useId } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AnalysisBody } from "../features/contracts/AnalysisBody.tsx";
import { FactsGrid } from "../features/contracts/FactsGrid.tsx";
import { NotesField } from "../features/contracts/NotesField.tsx";
import { ObjectiveList } from "../features/contracts/ObjectiveList.tsx";
import {
  useContract,
  useDeleteContract,
  useUpdateContract,
} from "../features/contracts/queries.ts";
import { ScorePanel } from "../features/contracts/ScorePanel.tsx";
import { statusInfo, statusOrder } from "../features/contracts/status.ts";
import type {
  ContractPatch,
  OfferStatus,
} from "../features/contracts/types.ts";
import { useProfile } from "../features/profile/queries.ts";
import { formatContractNumber, formatDate } from "../lib/format.ts";
import { button, input } from "../ui/styles.ts";
import { NotFoundPage } from "./NotFoundPage.tsx";

export function ContractDetailsPage() {
  const { contractId = "" } = useParams();
  const contractQuery = useContract(contractId);
  const profile = useProfile();
  const updateContract = useUpdateContract();
  const deleteContract = useDeleteContract();
  const navigate = useNavigate();
  const statusId = useId();
  const appliedId = useId();

  if (contractQuery.isPending) {
    return <p className="text-jc-text-muted">Loading contract…</p>;
  }

  if (contractQuery.isError) {
    return <NotFoundPage />;
  }

  const contract = contractQuery.data;

  const patch = (changes: ContractPatch) => {
    updateContract.mutate({ id: contract.id, patch: changes });
  };

  const remove = () => {
    if (window.confirm(`Delete the ${contract.company} contract?`)) {
      deleteContract.mutate(contract.id, {
        onSuccess: () => navigate("/contracts"),
      });
    }
  };

  return (
    <div className="mx-auto flex max-w-260 flex-col gap-6 text-[17px]">
      <title>{`${contract.title} – Job Coast`}</title>

      <Link
        to="/contracts"
        className="self-start text-[15px] text-jc-text-muted no-underline hover:text-jc-text"
      >
        ← All contracts
      </Link>

      <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
        <ScorePanel analysis={contract.analysis}>
          <div className="flex flex-col gap-2">
            <label htmlFor={statusId} className="text-[15px] font-medium">
              Status
            </label>
            <select
              id={statusId}
              value={contract.status}
              onChange={(event) =>
                patch({ status: event.target.value as OfferStatus })
              }
              className={input.onSurface}
            >
              {statusOrder.map((status) => (
                <option key={status} value={status}>
                  {statusInfo[status].label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={appliedId} className="text-[15px] font-medium">
              Applied on
            </label>
            <input
              id={appliedId}
              type="date"
              value={contract.appliedAt ?? ""}
              onChange={(event) =>
                patch({ appliedAt: event.target.value || undefined })
              }
              className={input.onSurface}
            />
          </div>

          <FactsGrid
            offer={contract}
            minRate={profile.data?.minRatePlnPerHour}
            className="border-t border-jc-line pt-4"
          />

          {contract.url && (
            <a
              href={contract.url}
              target="_blank"
              rel="noreferrer"
              className={button.secondary}
            >
              Open the job ad ↗
            </a>
          )}

          <button
            type="button"
            onClick={remove}
            disabled={deleteContract.isPending}
            className="min-h-11 cursor-pointer text-[15px] text-jc-pink-soft hover:text-jc-pink-hover disabled:opacity-60"
          >
            Delete contract
          </button>
        </ScorePanel>

        <article className="flex max-w-165 min-w-0 flex-1 flex-col gap-7.5">
          <AnalysisBody
            meta={`Contract ${formatContractNumber(contract.number)} · analyzed ${formatDate(contract.createdAt)}`}
            offer={contract}
          />

          <ObjectiveList
            objectives={contract.analysis.prep}
            showProgress
            onChange={(prep) => patch({ prep })}
          />

          <NotesField
            key={contract.id}
            initialNotes={contract.notes ?? ""}
            onSave={(notes) => patch({ notes })}
          />

          {contract.rawText && (
            <details className="rounded-jc bg-jc-surface px-4.5">
              <summary className="flex min-h-13 cursor-pointer items-center font-medium">
                Original job ad
              </summary>
              <p className="pb-4.5 leading-[1.55] whitespace-pre-line text-jc-text-body">
                {contract.rawText}
              </p>
            </details>
          )}
        </article>
      </div>
    </div>
  );
}
