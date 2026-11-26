import clsx from "clsx";
import { Link } from "react-router";
import { StateCard } from "../ui/StateCard.tsx";
import { button } from "../ui/styles.ts";

export function ExtensionPage() {
  return (
    <StateCard accent="teal" title="The extension is on its way">
      <title>Extension – Job Coast</title>
      <p className="leading-[1.55] text-jc-text-body">
        The browser extension will analyze the offer you have open, in one
        click. Until it ships, paste a link or the text of the ad.
      </p>
      <Link
        to="/analyze"
        className={clsx(button.primary, "mt-2 self-start")}
      >
        Analyze an offer
      </Link>
    </StateCard>
  );
}
