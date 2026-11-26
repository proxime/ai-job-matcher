import clsx from "clsx";
import { Link, NavLink, Outlet } from "react-router";
import { AnalyzeLink } from "../ui/AnalyzeLink.tsx";

const navItems = [
  { to: "/contracts", label: "Contracts" },
  { to: "/analyze", label: "Analyze" },
  { to: "/profile", label: "Profile" },
];

export function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-10 focus:rounded-jc focus:bg-jc-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <header className="flex items-center justify-between gap-4 border-b border-jc-line px-5 py-3.5 sm:px-10 sm:py-4">
        <Link
          to="/contracts"
          className="font-display text-[22px] italic no-underline sm:text-[26px]"
        >
          <span className="text-jc-pink">JOB</span>{" "}
          <span className="text-jc-teal">COAST</span>
        </Link>

        <nav aria-label="Main" className="hidden gap-7 font-medium sm:flex">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx("border-b-3 pb-1 no-underline hover:text-jc-text", {
                  "border-jc-pink text-jc-text": isActive,
                  "border-transparent text-jc-text-muted": !isActive,
                })
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <AnalyzeLink className="flex sm:hidden" />
      </header>

      <main
        id="main"
        className="mx-auto w-full max-w-310 flex-1 px-5 pt-4.5 pb-24 sm:px-10 sm:py-7"
      >
        <Outlet />
      </main>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 grid grid-cols-3 border-t border-jc-line bg-jc-surface pb-[env(safe-area-inset-bottom)] sm:hidden"
      >
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx("flex min-h-15 items-center justify-center no-underline", {
                "font-bold text-jc-pink hover:text-jc-pink": isActive,
                "text-jc-text-muted hover:text-jc-text": !isActive,
              })
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
