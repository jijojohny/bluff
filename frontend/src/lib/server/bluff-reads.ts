import { getBluffPublicClient, bluffContract } from "./bluff-contract";

export async function readProtocolStats() {
  const client = getBluffPublicClient();
  return client.readContract({
    ...bluffContract,
    functionName: "getProtocolStats",
  });
}

export async function readConfessionCounter() {
  const client = getBluffPublicClient();
  return client.readContract({
    ...bluffContract,
    functionName: "confessionCounter",
  });
}

export async function readLatestConfessionPreviews(count: number) {
  const client = getBluffPublicClient();
  return client.readContract({
    ...bluffContract,
    functionName: "getLatestConfessionPreviews",
    args: [BigInt(count)],
  });
}

export async function readConfessionPreview(id: number) {
  const client = getBluffPublicClient();
  return client.readContract({
    ...bluffContract,
    functionName: "getConfessionPreview",
    args: [BigInt(id)],
  });
}

export async function readConfessionFull(id: number, viewer: `0x${string}`) {
  const client = getBluffPublicClient();
  return client.readContract({
    ...bluffContract,
    functionName: "getConfessionFull",
    args: [BigInt(id)],
    account: viewer,
  });
}

export async function readCheckUnlocked(confessionId: number, user: `0x${string}`) {
  const client = getBluffPublicClient();
  return client.readContract({
    ...bluffContract,
    functionName: "checkUnlocked",
    args: [BigInt(confessionId), user],
  });
}

export async function readAllStateStats() {
  const client = getBluffPublicClient();
  return client.readContract({
    ...bluffContract,
    functionName: "getAllStateStats",
  });
}

export async function readAllCategoryStats() {
  const client = getBluffPublicClient();
  return client.readContract({
    ...bluffContract,
    functionName: "getAllCategoryStats",
  });
}
