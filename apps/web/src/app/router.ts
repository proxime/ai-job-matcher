import { createBrowserRouter, redirect } from "react-router";
import { AnalyzePage } from "../pages/AnalyzePage.tsx";
import { ContractDetailsPage } from "../pages/ContractDetailsPage.tsx";
import { ContractsPage } from "../pages/ContractsPage.tsx";
import { ExtensionPage } from "../pages/ExtensionPage.tsx";
import { NotFoundPage } from "../pages/NotFoundPage.tsx";
import { ProfilePage } from "../pages/ProfilePage.tsx";
import { SignInPage } from "../pages/SignInPage.tsx";
import { AppLayout } from "./AppLayout.tsx";

export const router = createBrowserRouter([
  { path: "/sign-in", Component: SignInPage },
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, loader: () => redirect("/contracts") },
      { path: "contracts", Component: ContractsPage },
      { path: "contracts/:contractId", Component: ContractDetailsPage },
      { path: "analyze", Component: AnalyzePage },
      { path: "profile", Component: ProfilePage },
      { path: "extension", Component: ExtensionPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
