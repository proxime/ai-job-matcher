import clsx from "clsx";
import type { ReactNode } from "react";
import { glow } from "./styles.ts";

interface StateCardProps {
  accent: keyof typeof glow;
  title: string;
  children: ReactNode;
}

export function StateCard({ accent, title, children }: StateCardProps) {
  return (
    <section
      className={clsx(
        glow[accent],
        "mx-auto flex w-full max-w-140 flex-col gap-4 p-8 text-[17px]",
      )}
    >
      <h1 className="font-display text-[32px] leading-[1.15]">{title}</h1>
      {children}
    </section>
  );
}
