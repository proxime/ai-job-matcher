import { Outlet } from "react-router";

// Shared frame for every screen. The header with the logo and navigation comes in the next step;
// <Outlet /> is where the router renders the page that matches the current URL.
export function AppLayout() {
  return (
    <main className="mx-auto max-w-310 px-5 py-4.5 sm:px-10 sm:py-7">
      <Outlet />
    </main>
  );
}
