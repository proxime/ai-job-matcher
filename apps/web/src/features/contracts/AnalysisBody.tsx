import { PageTitle } from "../../ui/PageTitle.tsx";
import type { OfferDraft } from "./types.ts";

interface AnalysisBodyProps {
  meta: string;
  offer: Pick<OfferDraft, "title" | "company" | "analysis">;
}

export function AnalysisBody({ meta, offer }: AnalysisBodyProps) {
  const { analysis } = offer;

  return (
    <>
      <header>
        <p className="mb-2 text-jc-text-muted">{meta}</p>
        <PageTitle size="lg">{offer.title}</PageTitle>
        <p className="mt-1.5 text-[19px] text-jc-text-body">{offer.company}</p>
      </header>

      <p className="text-xl leading-[1.55]">{analysis.summary}</p>

      <section>
        <h2 className="mb-3 text-[21px] font-bold text-jc-teal">Your edge</h2>
        <ul className="flex list-disc flex-col gap-2.5 pl-5.5 leading-[1.55] text-jc-text-body">
          {analysis.strengths.map((strength) => (
            <li key={strength}>{strength}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-[21px] font-bold text-jc-pink-soft">Risks</h2>
        <ul className="flex list-disc flex-col gap-2.5 pl-5.5 leading-[1.55] text-jc-text-body">
          {analysis.gaps.map((gap) => (
            <li key={gap}>{gap}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
