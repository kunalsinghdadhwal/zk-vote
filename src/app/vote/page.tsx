'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SelfVerification } from '@/components/self-verification'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, Radio } from '@/components/ui/radio-group'
import {
  Shield,
  ArrowLeft,
  Check,
  Vote,
  Fingerprint,
  CircleDot,
  Lock,
  ArrowRight,
} from 'lucide-react'

const proposals = [
  {
    id: '1',
    title: 'Community Treasury Allocation',
    description: 'Allocate 25% of treasury funds to ecosystem development grants for Q3 2026.',
    tag: 'Treasury',
  },
  {
    id: '2',
    title: 'Protocol Upgrade v2.5',
    description: 'Implement the proposed protocol upgrade including improved ZK circuit efficiency.',
    tag: 'Protocol',
  },
  {
    id: '3',
    title: 'Governance Threshold Update',
    description: 'Lower the proposal submission threshold from 100k to 50k tokens.',
    tag: 'Governance',
  },
]

type Phase = 'verify' | 'vote' | 'confirmed'

const stepsMeta = [
  { key: 'verify', label: 'Verify', icon: Fingerprint },
  { key: 'vote', label: 'Vote', icon: CircleDot },
  { key: 'confirmed', label: 'Done', icon: Check },
] as const

export default function VotePage() {
  const [phase, setPhase] = useState<Phase>('verify')
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)

  const phaseIndex = stepsMeta.findIndex((s) => s.key === phase)

  return (
    <main className="min-h-dvh bg-stone-50 text-zinc-900">
      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-lg">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="size-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <Shield className="size-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-zinc-900 tracking-tight">ZK Vote</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Progress stepper -- always visible */}
          <div className="flex items-center justify-center gap-0 mb-12 opacity-0 animate-fade-in">
            {stepsMeta.map((step, i) => {
              const isComplete = i < phaseIndex
              const isCurrent = i === phaseIndex
              const StepIcon = step.icon
              return (
                <div key={step.key} className="flex items-center">
                  {i > 0 && (
                    <div className={`w-12 sm:w-20 h-px mx-2 transition-all duration-700 ${
                      isComplete ? 'bg-emerald-400' : 'bg-zinc-200'
                    }`} />
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <div className={`size-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isComplete
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                          ? 'bg-violet-600 text-white'
                          : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                    }`}>
                      {isComplete ? (
                        <Check className="size-4.5" strokeWidth={2.5} />
                      ) : (
                        <StepIcon className="size-4.5" />
                      )}
                    </div>
                    <span className={`text-xs font-medium transition-colors duration-500 ${
                      isComplete
                        ? 'text-emerald-600'
                        : isCurrent
                          ? 'text-violet-600'
                          : 'text-zinc-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ===================== VERIFY PHASE ===================== */}
          {phase === 'verify' && (
            <SelfVerification onVerified={() => setPhase('vote')} />
          )}

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
                  <p className="text-xs text-emerald-600/80">Aadhaar verified via zero-knowledge proof</p>
                </div>
              </div>

              {/* Section heading */}
              <div className="opacity-0 animate-fade-in-up delay-100 mb-6">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-1.5">
                  Choose a proposal
                </h2>
                <p className="text-sm text-zinc-500">
                  Your vote is private and verified with a ZK proof.
                </p>
              </div>

              {/* Proposal cards */}
              <RadioGroup
                className="opacity-0 animate-fade-in-up delay-200 !gap-2.5"
                value={selectedProposal ?? ''}
                onValueChange={(val) => setSelectedProposal(val as string)}
              >
                {proposals.map((proposal) => {
                  const isSelected = selectedProposal === proposal.id
                  return (
                    <label key={proposal.id} className="cursor-pointer block">
                      <div className={`relative rounded-xl border px-5 py-4 transition-all duration-200 ${
                        isSelected
                          ? 'border-violet-400 bg-violet-50/50 shadow-sm shadow-violet-100/50'
                          : 'border-zinc-200 bg-white hover:border-zinc-300'
                      }`}>
                        <div className="flex items-start gap-4">
                          {/* Radio */}
                          <div className="pt-0.5 flex-shrink-0">
                            <Radio value={proposal.id} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2.5 mb-1">
                              <h3 className="text-[15px] font-semibold text-zinc-800">{proposal.title}</h3>
                              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-violet-100 text-violet-600'
                                  : 'bg-zinc-100 text-zinc-500'
                              }`}>
                                {proposal.tag}
                              </span>
                            </div>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                              {proposal.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  )
                })}
              </RadioGroup>

              {/* Submit area */}
              <div className="opacity-0 animate-fade-in-up delay-300 mt-8">
                <Button
                  onClick={() => {
                    if (selectedProposal) setPhase('confirmed')
                  }}
                  disabled={!selectedProposal}
                  variant="default"
                  size="lg"
                  className="w-full"
                >
                  <Lock className="size-3.5" />
                  Cast private vote
                  <ArrowRight className="size-3.5" />
                </Button>
                <p className="text-center text-xs text-zinc-400 mt-3">
                  Your choice is encrypted and cannot be traced back to you.
                </p>
              </div>
            </div>
          )}

          {/* ===================== CONFIRMED PHASE ===================== */}
          {phase === 'confirmed' && (
            <div className="max-w-md mx-auto text-center opacity-0 animate-scale-in">
              {/* Success icon */}
              <div className="relative mx-auto size-16 mb-6">
                <div className="absolute inset-0 rounded-full bg-emerald-200/50 animate-pulse scale-125" />
                <div className="relative size-full rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="size-7 text-white" strokeWidth={2.5} />
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
                Vote submitted
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-8 max-w-xs mx-auto text-pretty">
                Your vote has been recorded and verified with a zero-knowledge proof. It cannot be altered or traced.
              </p>

              {/* Receipt card */}
              <div className="rounded-xl border border-zinc-200 bg-white p-5 mb-6 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="size-3.5 text-violet-500" />
                  <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Receipt</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-zinc-400">Proposal</span>
                    <span className="text-sm text-zinc-800 font-medium text-right max-w-[60%]">
                      {proposals.find((p) => p.id === selectedProposal)?.title}
                    </span>
                  </div>
                  <Separator className="!bg-zinc-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Status</span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                      <div className="size-1.5 rounded-full bg-emerald-500" />
                      Verified
                    </span>
                  </div>
                  <Separator className="!bg-zinc-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Privacy</span>
                    <span className="text-sm text-zinc-600">ZK-encrypted</span>
                  </div>
                </div>
              </div>

              <Link href="/">
                <Button variant="outline" size="lg" className="w-full">
                  <ArrowLeft className="size-3.5" />
                  Back to home
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
