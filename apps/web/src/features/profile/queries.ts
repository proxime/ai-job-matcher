import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, saveProfile } from "./api.ts";

const profileKey = ["profile"] as const;

export function useProfile() {
  return useQuery({ queryKey: profileKey, queryFn: getProfile });
}

export function useSaveProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveProfile,
    onSuccess: (profile) => queryClient.setQueryData(profileKey, profile),
  });
}
