'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SelfVerification } from '@/components/self-verification'
import { Shield, ArrowLeft, Fingerprint, CircleDot } from 'lucide-react'

const steps = [
  { key: 'verify', label: 'Verify', icon: Fingerprint },
  { key: 'vote', label: 'Vote', icon: CircleDot },
] as const

export default function VerifyPage() {
  const router = useRouter()

  return (
    <main className="min-h-dvh bg-stone-50 text-zinc-900">
      {/* Header -- identical to vote page */}
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
          {/* Progress stepper -- 2 steps */}
          <div className="flex items-center justify-center gap-0 mb-12 opacity-0 animate-fade-in">
            {steps.map((step, i) => {
              const isCurrent = i === 0
              const StepIcon = step.icon
              return (
                <div key={step.key} className="flex items-center">
                  {i > 0 && (
                    <div className="w-8 sm:w-14 h-px mx-1.5 bg-zinc-200" />
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`size-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isCurrent
                          ? 'bg-violet-600 text-white'
                          : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                      }`}
                    >
                      <StepIcon className="size-4.5" />
                    </div>
                    <span
                      className={`text-xs font-medium transition-colors duration-500 ${
                        isCurrent ? 'text-violet-600' : 'text-zinc-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Self verification component */}
          <SelfVerification onVerified={() => router.push('/vote')} />
        </div>
      </div>
    </main>
  )
}
