import clsx from "clsx";
import { Link } from "react-router";
import { button } from "./styles.ts";

interface InstallExtensionLinkProps {
  label?: string;
  variant?: keyof typeof button;
  className?: string;
}

export function InstallExtensionLink({
  label = "Install the extension",
  variant = "teal",
  className,
}: InstallExtensionLinkProps) {
  return (
    <Link to="/extension" className={clsx(button[variant], className)}>
      {label}
    </Link>
  );
}
