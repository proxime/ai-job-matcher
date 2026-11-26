import { Link } from "react-router";
import { PageTitle } from "../ui/PageTitle.tsx";

export function NotFoundPage() {
  return (
    <>
      <title>Page not found – Job Coast</title>
      <PageTitle>Page not found</PageTitle>
      <p className="mt-4 text-jc-text-body">
        This address doesn't lead anywhere. <Link to="/contracts">Back to contracts</Link>
      </p>
    </>
  );
}
