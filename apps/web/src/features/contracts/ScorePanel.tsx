import clsx from "clsx";
import type { ReactNode } from "react";
import { glow } from "../../ui/styles.ts";
import { isStrongScore, recommendationHeadline } from "./status.ts";
import type { Analysis } from "./types.ts";

interface ScorePanelProps {
  analysis: Analysis;
  children: ReactNode;
}

export function ScorePanel({ analysis, children }: ScorePanelProps) {
  const strong = isStrongScore(analysis.score);

  return (
    <aside
      aria-label="Match and actions"
      className={clsx(
        glow.pink,
        "flex w-full flex-col gap-5 p-7 lg:w-85 lg:shrink-0",
      )}
    >
      <div>
        <p className="text-[15px] text-jc-text-muted">Match</p>
        <p
          className={clsx("font-display text-[80px] leading-[0.95]", {
            "text-jc-pink": strong,
            "text-jc-text-muted": !strong,
          })}
        >
          {analysis.score}%
        </p>
      </div>
      <p className="self-start rounded-full bg-jc-amber px-4 py-2 font-bold text-jc-bg">
        {recommendationHeadline[analysis.recommendation]}
      </p>
      {children}
    </aside>
  );
}
