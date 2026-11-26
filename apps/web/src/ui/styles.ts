import clsx from "clsx";

const buttonBase =
  "inline-flex cursor-pointer items-center justify-center rounded-jc no-underline disabled:cursor-not-allowed disabled:opacity-60";

export const button = {
  primary: clsx(
    buttonBase,
    "min-h-13 bg-jc-pink px-7 font-bold text-jc-bg hover:text-jc-bg",
  ),
  secondary: clsx(
    buttonBase,
    "min-h-12.5 border border-jc-border px-5 font-medium text-jc-text hover:bg-jc-surface-active hover:text-jc-text",
  ),
  teal: clsx(
    buttonBase,
    "min-h-12 border border-jc-teal px-5 font-bold text-jc-teal hover:text-jc-teal",
  ),
};

const inputBase =
  "min-h-12.5 w-full rounded-jc border border-jc-border px-3.5 text-jc-text placeholder:text-jc-text-muted aria-invalid:border-jc-pink-soft";

export const input = {
  onPage: clsx(inputBase, "bg-jc-surface"),
  onSurface: clsx(inputBase, "bg-jc-bg"),
};

const glowBase = "rounded-jc-lg border bg-jc-surface";

export const glow = {
  pink: clsx(glowBase, "border-jc-glow-pink shadow-glow-pink"),
  teal: clsx(glowBase, "border-jc-glow-teal shadow-glow-teal"),
  amber: clsx(glowBase, "border-jc-glow-amber shadow-glow-amber"),
  lavender: clsx(glowBase, "border-jc-glow-lavender shadow-glow-lavender"),
};
