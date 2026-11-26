import type { ReactNode } from "react";

export function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="font-display text-4xl leading-[1.1]">{children}</h1>;
}
