'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SelfVerification } from '@/components/self-verification'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, Radio } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  useProposalCount,
  useProposal,
  useProposalOptions,
  useHasVoted,
  useCreateProposal,
  useCastVote,
  useInitiateTally,
  useRevealResults,
} from '@/hooks/use-voting-contract'
import {
  Shield,
  ArrowLeft,
  Check,
  Fingerprint,
  CircleDot,
  Lock,
  ArrowRight,
  Wallet,
  Plus,
  X,
  Clock,
  Loader2,
  BarChart3,
  ExternalLink,
} from 'lucide-react'

type Phase = 'connect' | 'verify' | 'vote' | 'confirmed'

const stepsMeta = [
  { key: 'connect', label: 'Connect', icon: Wallet },
  { key: 'verify', label: 'Verify', icon: Fingerprint },
  { key: 'vote', label: 'Vote', icon: CircleDot },
  { key: 'confirmed', label: 'Done', icon: Check },
] as const

export default function VotePage() {
  const { isConnected, address } = useAccount()
  const [phase, setPhase] = useState<Phase>('connect')
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)

  // Auto-advance from connect phase when wallet connects
  useEffect(() => {
    if (isConnected && phase === 'connect') {
      setPhase('verify')
    }
    if (!isConnected && phase !== 'connect') {
      setPhase('connect')
    }
  }, [isConnected, phase])

  const phaseIndex = stepsMeta.findIndex((s) => s.key === phase)

  return (
    <main className="min-h-dvh bg-stone-50 text-zinc-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-lg">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="size-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <Shield className="size-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-zinc-900 tracking-tight">ZK Vote</span>
          </Link>

          <div className="flex items-center gap-3">
            {isConnected && (
              <div className="hidden sm:block">
                <ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
              </div>
            )}
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
            >
              <ArrowLeft className="size-3.5" />
              Back
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress stepper */}
          <div className="flex items-center justify-center gap-0 mb-12 opacity-0 animate-fade-in">
            {stepsMeta.map((step, i) => {
              const isComplete = i < phaseIndex
              const isCurrent = i === phaseIndex
              const StepIcon = step.icon
              return (
                <div key={step.key} className="flex items-center">
                  {i > 0 && (
                    <div
                      className={`w-8 sm:w-14 h-px mx-1.5 transition-all duration-700 ${
                        isComplete ? 'bg-emerald-400' : 'bg-zinc-200'
                      }`}
                    />
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`size-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isComplete
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                            ? 'bg-violet-600 text-white'
                            : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                      }`}
                    >
                      {isComplete ? (
                        <Check className="size-4.5" strokeWidth={2.5} />
                      ) : (
                        <StepIcon className="size-4.5" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium transition-colors duration-500 ${
                        isComplete
                          ? 'text-emerald-600'
                          : isCurrent
                            ? 'text-violet-600'
                            : 'text-zinc-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ===================== CONNECT PHASE ===================== */}
          {phase === 'connect' && (
            <div className="max-w-md mx-auto text-center opacity-0 animate-fade-in-up">
              <div className="mb-8">
                <div className="size-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-5">
                  <Wallet className="size-7 text-violet-600" />
                </div>
                <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Connect your wallet</h2>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">
                  Connect a wallet on Base Sepolia to participate in private on-chain voting.
                </p>
              </div>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          )}

          {/* ===================== VERIFY PHASE ===================== */}
          {phase === 'verify' && <SelfVerification onVerified={() => setPhase('vote')} />}

          {/* ===================== VOTE PHASE ===================== */}
          {phase === 'vote' && (
            <div className="max-w-xl mx-auto">
              {/* Verified confirmation */}
              <div className="opacity-0 animate-fade-in-down flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200/60 px-4 py-3 mb-10">
                <div className="size-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Check className="size-4 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-800">Identity verified</p>
                  <p className="text-xs text-emerald-600/80">
                    Aadhaar verified via zero-knowledge proof
                  </p>
                </div>
              </div>

              {/* Section heading */}
              <div className="opacity-0 animate-fade-in-up delay-100 mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-900 mb-1.5">Proposals</h2>
                  <p className="text-sm text-zinc-500">
                    Vote on active proposals or create a new one.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreateForm(!showCreateForm)}
                >
                  {showCreateForm ? <X className="size-3.5" /> : <Plus className="size-3.5" />}
                  {showCreateForm ? 'Cancel' : 'New'}
                </Button>
              </div>

              {/* Create Proposal Form */}
              {showCreateForm && (
                <div className="opacity-0 animate-fade-in-up mb-8">
                  <CreateProposalForm
                    onCreated={() => setShowCreateForm(false)}
                  />
                </div>
              )}

              {/* Proposals list */}
              <div className="opacity-0 animate-fade-in-up delay-200">
                <ProposalsList
                  selectedProposal={selectedProposal}
                  selectedOption={selectedOption}
                  onSelectProposal={setSelectedProposal}
                  onSelectOption={setSelectedOption}
                  onVoteConfirmed={(hash) => {
                    setTxHash(hash)
                    setPhase('confirmed')
                  }}
                />
              </div>
            </div>
          )}

          {/* ===================== CONFIRMED PHASE ===================== */}
          {phase === 'confirmed' && (
            <div className="max-w-md mx-auto text-center opacity-0 animate-scale-in">
              <div className="relative mx-auto size-16 mb-6">
                <div className="absolute inset-0 rounded-full bg-emerald-200/50 animate-pulse scale-125" />
                <div className="relative size-full rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="size-7 text-white" strokeWidth={2.5} />
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Vote submitted</h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-8 max-w-xs mx-auto text-pretty">
                Your encrypted vote has been recorded on-chain. It cannot be altered or traced back
                to you.
              </p>

              {/* Receipt card */}
              <div className="rounded-xl border border-zinc-200 bg-white p-5 mb-6 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="size-3.5 text-violet-500" />
                  <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                    Receipt
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Status</span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                      <div className="size-1.5 rounded-full bg-emerald-500" />
                      Confirmed
                    </span>
                  </div>
                  <Separator className="!bg-zinc-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Privacy</span>
                    <span className="text-sm text-zinc-600">FHE-encrypted (Inco)</span>
                  </div>
                  <Separator className="!bg-zinc-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Network</span>
                    <span className="text-sm text-zinc-600">Base Sepolia</span>
                  </div>
                  {txHash && (
                    <>
                      <Separator className="!bg-zinc-100" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Tx</span>
                        <a
                          href={`https://sepolia.basescan.org/tx/${txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-violet-600 font-mono hover:underline inline-flex items-center gap-1"
                        >
                          {txHash.slice(0, 8)}...{txHash.slice(-6)}
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    setSelectedProposal(null)
                    setSelectedOption(null)
                    setTxHash(null)
                    setPhase('vote')
                  }}
                >
                  Vote again
                </Button>
                <Link href="/" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    <ArrowLeft className="size-3.5" />
                    Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

// --- Proposals List ---

function ProposalsList({
  selectedProposal,
  selectedOption,
  onSelectProposal,
  onSelectOption,
  onVoteConfirmed,
}: {
  selectedProposal: number | null
  selectedOption: string | null
  onSelectProposal: (id: number | null) => void
  onSelectOption: (option: string | null) => void
  onVoteConfirmed: (hash: string) => void
}) {
  const { data: count, isLoading } = useProposalCount()
  const proposalCount = count ? Number(count) : 0

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 gap-3">
        <Loader2 className="size-5 text-violet-500 animate-spin" />
        <span className="text-sm text-zinc-400">Loading proposals...</span>
      </div>
    )
  }

  if (proposalCount === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-zinc-200 rounded-xl">
        <CircleDot className="size-8 text-zinc-300 mx-auto mb-3" />
        <p className="text-sm text-zinc-400">No proposals yet. Create the first one!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: proposalCount }, (_, i) => (
        <ProposalCard
          key={i}
          proposalId={BigInt(i)}
          isExpanded={selectedProposal === i}
          selectedOption={selectedProposal === i ? selectedOption : null}
          onToggle={() => {
            if (selectedProposal === i) {
              onSelectProposal(null)
              onSelectOption(null)
            } else {
              onSelectProposal(i)
              onSelectOption(null)
            }
          }}
          onSelectOption={onSelectOption}
          onVoteConfirmed={onVoteConfirmed}
        />
      ))}
    </div>
  )
}

// --- Single Proposal Card ---

function ProposalCard({
  proposalId,
  isExpanded,
  selectedOption,
  onToggle,
  onSelectOption,
  onVoteConfirmed,
}: {
  proposalId: bigint
  isExpanded: boolean
  selectedOption: string | null
  onToggle: () => void
  onSelectOption: (option: string | null) => void
  onVoteConfirmed: (hash: string) => void
}) {
  const { data: proposal } = useProposal(proposalId)
  const { data: options } = useProposalOptions(proposalId)
  const { data: voted } = useHasVoted(proposalId)
  const { castVote, isPending, isEncrypting } = useCastVote()
  const { initiateTally, isPending: isTallying } = useInitiateTally()
  const { reveal, isRevealing, results } = useRevealResults()

  if (!proposal) return null

  const [title, description, deadline, creator, tallied, optionCount] = proposal
  const deadlineMs = Number(deadline) * 1000
  const isEnded = Date.now() > deadlineMs
  const timeLeft = deadlineMs - Date.now()

  const handleCastVote = async () => {
    if (selectedOption === null) return
    try {
      const hash = await castVote(proposalId, parseInt(selectedOption))
      if (hash) onVoteConfirmed(hash)
    } catch (err) {
      console.error('Vote failed:', err)
    }
  }

  const handleTally = async () => {
    try {
      await initiateTally(proposalId)
    } catch (err) {
      console.error('Tally failed:', err)
    }
  }

  const handleReveal = async () => {
    try {
      await reveal(proposalId, Number(optionCount))
    } catch (err) {
      console.error('Reveal failed:', err)
    }
  }

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isExpanded
          ? 'border-violet-300 bg-violet-50/30 shadow-sm'
          : 'border-zinc-200 bg-white hover:border-zinc-300'
      }`}
    >
      {/* Header -- always shown */}
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 text-left flex items-start justify-between gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1">
            <h3 className="text-[15px] font-semibold text-zinc-800 truncate">{title}</h3>
            {voted && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 flex-shrink-0">
                Voted
              </span>
            )}
            {isEnded && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 flex-shrink-0">
                Ended
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">{description}</p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-1.5 text-xs text-zinc-400 pt-0.5">
          <Clock className="size-3" />
          {isEnded ? 'Ended' : formatTimeLeft(timeLeft)}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && options && (
        <div className="px-5 pb-5">
          <Separator className="!bg-zinc-200/60 mb-4" />

          {/* Options */}
          {!voted && !isEnded && (
            <>
              <RadioGroup
                className="!gap-2"
                value={selectedOption ?? ''}
                onValueChange={(val) => onSelectOption(val as string)}
              >
                {options.map((opt, i) => (
                  <label key={i} className="cursor-pointer block">
                    <div
                      className={`relative rounded-lg border px-4 py-3 transition-all duration-150 ${
                        selectedOption === String(i)
                          ? 'border-violet-400 bg-violet-50/60'
                          : 'border-zinc-200 bg-white hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Radio value={String(i)} />
                        <span className="text-sm text-zinc-700">{opt}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <div className="mt-4">
                <Button
                  onClick={handleCastVote}
                  disabled={selectedOption === null || isPending || isEncrypting}
                  variant="default"
                  size="default"
                  className="w-full"
                >
                  {isEncrypting ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Encrypting vote...
                    </>
                  ) : isPending ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Confirming tx...
                    </>
                  ) : (
                    <>
                      <Lock className="size-3.5" />
                      Cast private vote
                      <ArrowRight className="size-3.5" />
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-zinc-400 mt-2">
                  Your choice is FHE-encrypted and cannot be traced back to you.
                </p>
              </div>
            </>
          )}

          {/* Already voted state */}
          {voted && !isEnded && (
            <div className="flex items-center gap-3 py-3">
              <div className="size-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <Check className="size-4 text-emerald-600" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-700">You already voted</p>
                <p className="text-xs text-zinc-400">
                  Waiting for deadline to pass before tallying
                </p>
              </div>
            </div>
          )}

          {/* Tally & Reveal for ended proposals */}
          {isEnded && (
            <div className="space-y-3">
              {!tallied && (
                <Button
                  onClick={handleTally}
                  disabled={isTallying}
                  variant="outline"
                  size="default"
                  className="w-full"
                >
                  {isTallying ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Initiating tally...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="size-3.5" />
                      Initiate tally
                    </>
                  )}
                </Button>
              )}

              {tallied && !results && (
                <Button
                  onClick={handleReveal}
                  disabled={isRevealing}
                  variant="outline"
                  size="default"
                  className="w-full"
                >
                  {isRevealing ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Revealing results...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="size-3.5" />
                      Reveal results
                    </>
                  )}
                </Button>
              )}

              {results && options && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                    Results
                  </p>
                  {options.map((opt, i) => {
                    const count = Number(results[i] ?? 0)
                    const total = results.reduce((s, v) => s + Number(v), 0)
                    const pct = total > 0 ? (count / total) * 100 : 0
                    return (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-700">{opt}</span>
                          <span className="text-zinc-500 font-mono text-xs">
                            {count} ({pct.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-violet-500 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// --- Create Proposal Form ---

function CreateProposalForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [deadlineHours, setDeadlineHours] = useState('24')
  const { createProposal, isPending } = useCreateProposal()

  const addOption = () => setOptions([...options, ''])
  const removeOption = (i: number) => {
    if (options.length <= 2) return
    setOptions(options.filter((_, idx) => idx !== i))
  }
  const updateOption = (i: number, val: string) => {
    const next = [...options]
    next[i] = val
    setOptions(next)
  }

  const isValid =
    title.trim() &&
    options.filter((o) => o.trim()).length >= 2 &&
    Number(deadlineHours) > 0

  const handleSubmit = async () => {
    if (!isValid) return
    const deadlineTimestamp = BigInt(
      Math.floor(Date.now() / 1000) + Number(deadlineHours) * 3600,
    )
    const validOptions = options.filter((o) => o.trim())
    try {
      await createProposal(title.trim(), description.trim(), validOptions, deadlineTimestamp)
      onCreated()
    } catch (err) {
      console.error('Create proposal failed:', err)
    }
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
      <div>
        <Label className="mb-1.5 text-sm">Title</Label>
        <Input
          placeholder="Proposal title"
          value={title}
          onChange={(ev) => setTitle((ev.target as HTMLInputElement).value)}
        />
      </div>
      <div>
        <Label className="mb-1.5 text-sm">Description</Label>
        <Textarea
          placeholder="What is this proposal about?"
          value={description}
          onChange={(ev) => setDescription((ev.target as HTMLTextAreaElement).value)}
        />
      </div>
      <div>
        <Label className="mb-1.5 text-sm">Options</Label>
        <div className="space-y-2">
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(ev) => updateOption(i, (ev.target as HTMLInputElement).value)}
              />
              {options.length > 2 && (
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeOption(i)}
                >
                  <X className="size-3" />
                </Button>
              )}
            </div>
          ))}
          {options.length < 10 && (
            <Button variant="ghost" size="xs" onClick={addOption}>
              <Plus className="size-3" />
              Add option
            </Button>
          )}
        </div>
      </div>
      <div>
        <Label className="mb-1.5 text-sm">Voting duration (hours)</Label>
        <Input
          type="number"
          min="1"
          value={deadlineHours}
          onChange={(ev) => setDeadlineHours((ev.target as HTMLInputElement).value)}
        />
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!isValid || isPending}
        variant="default"
        className="w-full"
      >
        {isPending ? (
          <>
            <Loader2 className="size-3.5 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Plus className="size-3.5" />
            Create proposal
          </>
        )}
      </Button>
    </div>
  )
}

// --- Helpers ---

function formatTimeLeft(ms: number): string {
  if (ms <= 0) return 'Ended'
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  if (hours > 24) return `${Math.floor(hours / 24)}d ${hours % 24}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}
