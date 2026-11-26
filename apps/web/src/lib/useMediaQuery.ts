import { useCallback, useSyncExternalStore } from "react";

// Tailwind's `lg` breakpoint: from here up Contracts shows the list and the preview side by side.
export const WIDE_SCREEN = "(min-width: 64rem)";

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onChange);
      return () => mediaQueryList.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches);
}
