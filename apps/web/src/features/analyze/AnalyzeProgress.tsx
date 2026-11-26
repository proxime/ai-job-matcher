import clsx from "clsx";
import { useEffect, useState } from "react";
import { StateCard } from "../../ui/StateCard.tsx";

const STEP_INTERVAL_MS = 650;

const stepMark = { done: "✓", active: "●", todo: "○" };

export function AnalyzeProgress({ steps }: { steps: string[] }) {
  const [active, setActive] = useState(0);
  const lastStep = steps.length - 1;

  useEffect(() => {
    const timer = setInterval(
      () => setActive((current) => Math.min(current + 1, lastStep)),
      STEP_INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [lastStep]);

  const stateOf = (index: number) => {
    if (index < active) {
      return "done";
    }
    return index === active ? "active" : "todo";
  };

  return (
    <div role="status">
      <StateCard accent="pink" title="Compiling the briefing…">
        <div
          aria-hidden="true"
          className="h-2 overflow-hidden rounded-full bg-jc-line"
        >
          <div
            className="h-full bg-jc-pink transition-[width] duration-500 motion-reduce:transition-none"
            style={{ width: `${((active + 0.5) / steps.length) * 100}%` }}
          />
        </div>
        <ol className="flex flex-col gap-2.5">
          {steps.map((step, index) => {
            const state = stateOf(index);

            return (
              <li
                key={step}
                aria-current={state === "active" ? "step" : undefined}
                className={clsx({
                  "text-jc-teal": state === "done",
                  "text-jc-text-muted": state === "todo",
                })}
              >
                <span aria-hidden="true">{stepMark[state]} </span>
                {step}
              </li>
            );
          })}
        </ol>
        <p className="mt-2 text-[15px] text-jc-text-muted">
          Usually takes a few seconds
        </p>
      </StateCard>
    </div>
  );
}
