'use client'

import { useReadContract, useWriteContract, useAccount, usePublicClient } from 'wagmi'
import { parseAbi } from 'viem'
import type { Hex } from 'viem'
import { VOTING_ABI } from '@/lib/contracts/voting-abi'
import { VOTING_CONTRACT_ADDRESS } from '@/lib/contracts/addresses'
import { encryptVote, revealTallies, getZap } from '@/hooks/use-inco'
import { useCallback, useState } from 'react'

const contractConfig = {
  address: VOTING_CONTRACT_ADDRESS,
  abi: VOTING_ABI,
} as const

export function useProposalCount() {
  return useReadContract({
    ...contractConfig,
    functionName: 'proposalCount',
  })
}

export function useProposal(id: bigint) {
  return useReadContract({
    ...contractConfig,
    functionName: 'getProposal',
    args: [id],
  })
}

export function useProposalOptions(id: bigint) {
  return useReadContract({
    ...contractConfig,
    functionName: 'getProposalOptions',
    args: [id],
  })
}

export function useHasVoted(proposalId: bigint) {
  const { address } = useAccount()
  return useReadContract({
    ...contractConfig,
    functionName: 'hasVoted',
    args: [proposalId, address!],
    query: { enabled: !!address },
  })
}

export function useCreateProposal() {
  const { writeContractAsync, isPending, isSuccess, data: hash } = useWriteContract()

  const createProposal = useCallback(
    async (title: string, description: string, options: string[], deadline: bigint) => {
      return writeContractAsync({
        ...contractConfig,
        functionName: 'createProposal',
        args: [title, description, options, deadline],
      })
    },
    [writeContractAsync],
  )

  return { createProposal, isPending, isSuccess, hash }
}

export function useCastVote() {
  const { writeContractAsync, isPending, isSuccess, data: hash } = useWriteContract()
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const [isEncrypting, setIsEncrypting] = useState(false)

  const castVote = useCallback(
    async (proposalId: bigint, optionIndex: number) => {
      if (!address || !publicClient) throw new Error('Wallet not connected')

      setIsEncrypting(true)
      try {
        // Encrypt the vote option
        const encrypted = await encryptVote(
          optionIndex,
          address,
          VOTING_CONTRACT_ADDRESS,
        )

        // Read the Inco fee from the executor contract
        const zap = await getZap()
        const fee = await publicClient.readContract({
          address: zap.executorAddress as `0x${string}`,
          abi: parseAbi(['function getFee() view returns (uint256)']),
          functionName: 'getFee',
        })

        // Read proposal to get option count for fee calculation
        const proposal = await publicClient.readContract({
          ...contractConfig,
          functionName: 'getProposal',
          args: [proposalId],
        })
        const optionCount = proposal[5] // optionCount is the 6th return value
        // Fee: 1 newEuint256 + 3*optionCount (eq + select + add per option)
        const totalFee = fee * (BigInt(1) + BigInt(3) * optionCount)

        setIsEncrypting(false)

        return writeContractAsync({
          ...contractConfig,
          functionName: 'castVote',
          args: [proposalId, encrypted],
          value: totalFee,
        })
      } catch (err) {
        setIsEncrypting(false)
        throw err
      }
    },
    [address, publicClient, writeContractAsync],
  )

  return { castVote, isPending, isEncrypting, isSuccess, hash }
}

export function useInitiateTally() {
  const { writeContractAsync, isPending, isSuccess, data: hash } = useWriteContract()

  const initiateTally = useCallback(
    async (proposalId: bigint) => {
      return writeContractAsync({
        ...contractConfig,
        functionName: 'initiateTally',
        args: [proposalId],
      })
    },
    [writeContractAsync],
  )

  return { initiateTally, isPending, isSuccess, hash }
}

export function useRevealResults() {
  const publicClient = usePublicClient()
  const [isRevealing, setIsRevealing] = useState(false)
  const [results, setResults] = useState<bigint[] | null>(null)

  const reveal = useCallback(
    async (proposalId: bigint, optionCount: number) => {
      if (!publicClient) throw new Error('No public client')

      setIsRevealing(true)
      try {
        // Read tally handles for each option
        const handles: Hex[] = []
        for (let i = 0; i < optionCount; i++) {
          const handle = await publicClient.readContract({
            ...contractConfig,
            functionName: 'getTallyHandle',
            args: [proposalId, BigInt(i)],
          })
          handles.push(handle as Hex)
        }

        // Use Inco's attestedReveal to get plaintext values
        const plaintext = await revealTallies(handles)
        setResults(plaintext)
        setIsRevealing(false)
        return plaintext
      } catch (err) {
        setIsRevealing(false)
        throw err
      }
    },
    [publicClient],
  )

  return { reveal, isRevealing, results }
}
