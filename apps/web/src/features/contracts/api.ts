import { ApiError } from "../../lib/api-error.ts";
import { fakeDelay } from "../../lib/fake-delay.ts";
import { sampleContracts } from "./sample-contracts.ts";
import type { ContractPatch, Offer, OfferDraft } from "./types.ts";

let contracts: Offer[] = sampleContracts;

export function applyPatch(
  contract: Offer,
  { prep, ...fields }: ContractPatch,
): Offer {
  return {
    ...contract,
    ...fields,
    analysis: prep ? { ...contract.analysis, prep } : contract.analysis,
  };
}

export async function listContracts(): Promise<Offer[]> {
  await fakeDelay();
  return contracts;
}

export async function getContract(id: string): Promise<Offer> {
  await fakeDelay();
  const contract = contracts.find((candidate) => candidate.id === id);
  if (!contract) {
    throw new ApiError("NOT_FOUND");
  }
  return contract;
}

export async function createContract(draft: OfferDraft): Promise<Offer> {
  await fakeDelay();
  const number = Math.max(0, ...contracts.map((contract) => contract.number));
  const contract: Offer = {
    ...draft,
    id: crypto.randomUUID(),
    number: number + 1,
    status: "to-send",
  };
  contracts = [...contracts, contract];
  return contract;
}

export async function updateContract(
  id: string,
  patch: ContractPatch,
): Promise<Offer> {
  await fakeDelay();
  const contract = contracts.find((candidate) => candidate.id === id);
  if (!contract) {
    throw new ApiError("NOT_FOUND");
  }
  const updated = applyPatch(contract, patch);
  contracts = contracts.map((candidate) =>
    candidate.id === id ? updated : candidate,
  );
  return updated;
}

export async function deleteContract(id: string): Promise<void> {
  await fakeDelay();
  contracts = contracts.filter((candidate) => candidate.id !== id);
}
