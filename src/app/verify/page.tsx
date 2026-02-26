'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SelfVerification } from '@/components/self-verification'
import {
  Shield,
  ArrowLeft,
  Fingerprint,
  Vote,
  Check,
  ShieldCheck,
} from 'lucide-react'

type Phase = 'verify' | 'success'

export default function VerifyPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('verify')
  const sessionId = useMemo(() => crypto.randomUUID(), [])

  const handleVerified = () => {
    setPhase('success')
    // Brief pause to show success state, then redirect
    setTimeout(() => router.push('/vote'), 1200)
  }

  return (
    <main className="min-h-dvh bg-stone-50 text-zinc-900 relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(113,113,122) 0.5px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-400/[0.06] blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-lg border-b border-zinc-100">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="size-7 rounded-lg bg-violet-600 flex items-center justify-center shadow-sm shadow-violet-600/20">
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
      <div className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-lg mx-auto">

          {/* Stepper */}
          <div className="flex items-center justify-center gap-0 mb-14 opacity-0 animate-fade-in">
            {[
              { key: 'verify', label: 'Verify', icon: Fingerprint },
              { key: 'vote', label: 'Vote', icon: Vote },
            ].map((step, i) => {
              const isActive = step.key === 'verify'
              const isComplete = phase === 'success' && step.key === 'verify'
              const StepIcon = step.icon
              return (
                <div key={step.key} className="flex items-center">
                  {i > 0 && (
                    <div
                      className={`w-12 sm:w-20 h-px mx-2 transition-all duration-700 ${
                        isComplete ? 'bg-emerald-400' : 'bg-zinc-200'
                      }`}
                    />
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`size-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isComplete
                          ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/25'
                          : isActive
                            ? 'bg-violet-600 text-white shadow-sm shadow-violet-600/25'
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
                      className={`text-xs font-medium tracking-wide transition-colors duration-500 ${
                        isComplete
                          ? 'text-emerald-600'
                          : isActive
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

          {/* === VERIFY PHASE === */}
          {phase === 'verify' && (
            <>
              {/* Heading */}
              <div className="text-center mb-10">
                <h1 className="opacity-0 animate-fade-in-up text-3xl md:text-4xl font-semibold text-zinc-900 mb-3 text-balance">
                  Prove you're{' '}
                  <span className="font-serif italic text-violet-600">human</span>
                </h1>
                <p className="opacity-0 animate-fade-in-up delay-100 text-[15px] text-zinc-500 leading-relaxed max-w-sm mx-auto text-pretty">
                  Scan the QR code with the Self app. Your Aadhaar identity is verified
                  using zero-knowledge proofs -- nothing is stored.
                </p>
              </div>

              {/* QR verification */}
              <SelfVerification sessionId={sessionId} onVerified={handleVerified} />
            </>
          )}

          {/* === SUCCESS PHASE === */}
          {phase === 'success' && (
            <div className="text-center opacity-0 animate-scale-in">
              <div className="relative mx-auto size-20 mb-8">
                <div className="absolute inset-0 rounded-full bg-emerald-200/40 animate-pulse scale-150" />
                <div className="absolute inset-0 rounded-full bg-emerald-300/30 animate-pulse scale-125" style={{ animationDelay: '150ms' }} />
                <div className="relative size-full rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <ShieldCheck className="size-9 text-white" strokeWidth={1.8} />
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
                Identity verified
              </h2>
              <p className="text-sm text-zinc-500 mb-6">
                Redirecting to voting...
              </p>
              <div className="flex justify-center">
                <div className="h-1 w-32 rounded-full bg-zinc-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-[grow_1.2s_ease-in-out_forwards]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes grow {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </main>
  )
}
