import { QueryClient } from "@tanstack/react-query";

// One client for the whole app: it owns the cache of server data.
// No queries use it yet — they arrive with the API (step 3).
export const queryClient = new QueryClient();
