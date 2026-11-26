import clsx from "clsx";
import { Link } from "react-router";

export function AnalyzeLink({ className }: { className: string }) {
  return (
    <Link
      to="/analyze"
      aria-label="Analyze new offer"
      className={clsx(
        "size-11 shrink-0 items-center justify-center rounded-jc bg-jc-pink text-[26px] font-bold text-jc-bg no-underline shadow-glow-cta hover:text-jc-bg",
        className,
      )}
    >
      <span aria-hidden="true">+</span>
    </Link>
  );
}
