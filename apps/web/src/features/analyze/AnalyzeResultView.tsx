import { useState } from "react";
import { formatDate } from "../../lib/format.ts";
import { button } from "../../ui/styles.ts";
import { AnalysisBody } from "../contracts/AnalysisBody.tsx";
import { FactsGrid } from "../contracts/FactsGrid.tsx";
import { ObjectiveList } from "../contracts/ObjectiveList.tsx";
import { ScorePanel } from "../contracts/ScorePanel.tsx";
import type { Objective, OfferDraft } from "../contracts/types.ts";

interface AnalyzeResultViewProps {
  draft: OfferDraft;
  minRate?: number;
  saving: boolean;
  onAccept: (objectives: Objective[]) => void;
  onPass: () => void;
}

export function AnalyzeResultView({
  draft,
  minRate,
  saving,
  onAccept,
  onPass,
}: AnalyzeResultViewProps) {
  const [objectives, setObjectives] = useState(draft.analysis.prep);

  return (
    <div className="mx-auto flex max-w-260 flex-col gap-12 text-[17px] lg:flex-row lg:items-start">
      <ScorePanel analysis={draft.analysis}>
        <FactsGrid offer={draft} minRate={minRate} />
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            disabled={saving}
            onClick={() => onAccept(objectives)}
            className={button.primary}
          >
            Accept contract
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={onPass}
            className={button.secondary}
          >
            Pass
          </button>
        </div>
      </ScorePanel>

      <article className="flex max-w-165 min-w-0 flex-1 flex-col gap-8">
        <AnalysisBody
          meta={`Briefing · analyzed ${formatDate(draft.createdAt)}`}
          offer={draft}
        />
        <ObjectiveList objectives={objectives} onChange={setObjectives} />
      </article>
    </div>
  );
}
