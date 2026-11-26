import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  applyPatch,
  createContract,
  deleteContract,
  getContract,
  listContracts,
  updateContract,
} from "./api.ts";
import type { ContractPatch, Offer } from "./types.ts";

const contractKeys = {
  all: ["contracts"] as const,
  list: ["contracts", "list"] as const,
  detail: (id: string) => ["contracts", "detail", id] as const,
};

export function useContracts() {
  return useQuery({ queryKey: contractKeys.list, queryFn: listContracts });
}

export function useContract(id: string) {
  return useQuery({
    queryKey: contractKeys.detail(id),
    queryFn: () => getContract(id),
    retry: false,
  });
}

export function useCreateContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContract,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: contractKeys.all }),
  });
}

export function useUpdateContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: ContractPatch }) =>
      updateContract(id, patch),
    onMutate: async ({ id, patch }) => {
      await queryClient.cancelQueries({ queryKey: contractKeys.all });

      const previousList = queryClient.getQueryData<Offer[]>(
        contractKeys.list,
      );
      const previousDetail = queryClient.getQueryData<Offer>(
        contractKeys.detail(id),
      );

      queryClient.setQueryData<Offer[]>(contractKeys.list, (current) =>
        current?.map((contract) =>
          contract.id === id ? applyPatch(contract, patch) : contract,
        ),
      );
      queryClient.setQueryData<Offer>(contractKeys.detail(id), (current) =>
        current ? applyPatch(current, patch) : current,
      );

      return { previousList, previousDetail };
    },
    onError: (_error, { id }, onMutateResult) => {
      queryClient.setQueryData(
        contractKeys.list,
        onMutateResult?.previousList,
      );
      queryClient.setQueryData(
        contractKeys.detail(id),
        onMutateResult?.previousDetail,
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: contractKeys.all }),
  });
}

export function useDeleteContract() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContract,
    onSuccess: (_result, id) => {
      queryClient.removeQueries({ queryKey: contractKeys.detail(id) });
      return queryClient.invalidateQueries({ queryKey: contractKeys.list });
    },
  });
}
