import clsx from "clsx";
import type { Objective } from "./types.ts";

interface ObjectiveListProps {
  objectives: Objective[];
  showProgress?: boolean;
  onChange: (objectives: Objective[]) => void;
}

export function ObjectiveList({
  objectives,
  showProgress,
  onChange,
}: ObjectiveListProps) {
  const done = objectives.filter((objective) => objective.done).length;

  const toggle = (index: number) => {
    onChange(
      objectives.map((objective, position) =>
        position === index
          ? { ...objective, done: !objective.done }
          : objective,
      ),
    );
  };

  return (
    <section>
      <h2 className="mb-3 text-[21px] font-bold text-jc-amber">
        Objectives
        {showProgress && ` · ${done} of ${objectives.length} done`}
      </h2>
      <ul className="flex flex-col gap-1.5">
        {objectives.map((objective, index) => (
          <li key={objective.text}>
            <label className="flex min-h-12 cursor-pointer items-center gap-3.5 rounded-jc-sm bg-jc-surface px-4 py-2">
              <input
                type="checkbox"
                checked={objective.done}
                onChange={() => toggle(index)}
                className="size-5 shrink-0 accent-jc-pink"
              />
              <span
                className={clsx({
                  "text-jc-text-muted line-through": objective.done,
                })}
              >
                {objective.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
