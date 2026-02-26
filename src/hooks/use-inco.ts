import { Lightning } from '@inco/js/lite'
import { handleTypes } from '@inco/js'
import type { Hex } from 'viem'

let zapPromise: ReturnType<typeof Lightning.latest> | null = null

export function getZap() {
  if (!zapPromise) {
    // Base Sepolia testnet (chainId 84532)
    zapPromise = Lightning.latest('testnet', 84532)
  }
  return zapPromise
}

export async function encryptVote(
  optionIndex: number,
  accountAddress: string,
  dappAddress: string,
): Promise<Hex> {
  const zap = await getZap()
  const encrypted = await zap.encrypt(BigInt(optionIndex), {
    accountAddress,
    dappAddress,
    handleType: handleTypes.euint256,
  })
  return encrypted as Hex
}

export async function revealTallies(handles: Hex[]) {
  const zap = await getZap()
  const results = await zap.attestedReveal(handles)
  return results.map((r) => r.plaintext.value as bigint)
}

export { handleTypes }
