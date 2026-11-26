import { createBrowserRouter, redirect } from "react-router";
import { AnalyzePage } from "../pages/AnalyzePage.tsx";
import { ContractsPage } from "../pages/ContractsPage.tsx";
import { NotFoundPage } from "../pages/NotFoundPage.tsx";
import { ProfilePage } from "../pages/ProfilePage.tsx";
import { AppLayout } from "./AppLayout.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, loader: () => redirect("/contracts") },
      { path: "contracts", Component: ContractsPage },
      { path: "analyze", Component: AnalyzePage },
      { path: "profile", Component: ProfilePage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
