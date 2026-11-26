import clsx from "clsx";
import type { ReactNode } from "react";

interface PageTitleProps {
  size?: "md" | "lg";
  children: ReactNode;
}

export function PageTitle({ size = "md", children }: PageTitleProps) {
  return (
    <h1
      className={clsx("font-display", {
        "text-4xl leading-[1.1]": size === "md",
        "text-[46px] leading-[1.05]": size === "lg",
      })}
    >
      {children}
    </h1>
  );
}
