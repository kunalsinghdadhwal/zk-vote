'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
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

// Strong ease-out for UI interactions (Emil: custom curves, not built-in)
const ease = [0.23, 1, 0.32, 1] as const

export default function VerifyPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('verify')
  const sessionId = useMemo(() => crypto.randomUUID(), [])
  const reduced = useReducedMotion()

  const handleVerified = () => {
    setPhase('success')
    setTimeout(() => router.push('/vote'), 1400)
  }

  const steps = [
    { key: 'verify', label: 'Verify', icon: Fingerprint },
    { key: 'vote', label: 'Vote', icon: Vote },
  ]

  // When reduced motion is preferred, keep opacity transitions only
  const enterY = reduced ? 0 : 12
  const exitY = reduced ? 0 : -10

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

      {/* Top ambient glow -- purely decorative, no motion needed */}
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000 ${
          phase === 'success' ? 'bg-emerald-400/[0.08]' : 'bg-red-400/[0.06]'
        }`}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease }}
        className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-lg border-b border-zinc-100"
      >
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="size-7 rounded-lg bg-red-600 flex items-center justify-center shadow-sm shadow-red-600/20">
              <Shield className="size-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-zinc-900 tracking-tight">ZK Vote</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors duration-150"
          >
            <ArrowLeft className="size-3.5" />
            Back
          </Link>
        </div>
      </motion.header>

      {/* Content */}
      <div className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-lg mx-auto">

          {/* Stepper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.05, ease }}
            className="flex items-center justify-center gap-0 mb-14"
          >
            {steps.map((step, i) => {
              const isActive = step.key === 'verify'
              const isComplete = phase === 'success' && step.key === 'verify'
              const StepIcon = step.icon
              return (
                <div key={step.key} className="flex items-center">
                  {i > 0 && (
                    <motion.div
                      className="w-12 sm:w-20 h-px mx-2"
                      animate={{
                        backgroundColor: isComplete
                          ? 'rgb(52, 211, 153)'
                          : 'rgb(228, 228, 231)',
                      }}
                      transition={{ duration: 0.3, ease }}
                    />
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <motion.div
                      className="size-10 rounded-full flex items-center justify-center"
                      animate={{
                        backgroundColor: isComplete
                          ? 'rgb(16, 185, 129)'
                          : isActive
                            ? 'rgb(220, 38, 38)'
                            : 'rgb(244, 244, 245)',
                        color: isComplete || isActive
                          ? 'rgb(255, 255, 255)'
                          : 'rgb(161, 161, 170)',
                        boxShadow: isComplete
                          ? '0 1px 3px rgba(16, 185, 129, 0.25)'
                          : isActive
                            ? '0 1px 3px rgba(220, 38, 38, 0.25)'
                            : '0 0 0 1px rgb(228, 228, 231)',
                      }}
                      transition={{ duration: 0.25, ease }}
                    >
                      <AnimatePresence mode="wait">
                        {isComplete ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            transition={{ duration: 0.2, ease }}
                          >
                            <Check className="size-4.5" strokeWidth={2.5} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="icon"
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                          >
                            <StepIcon className="size-4.5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <motion.span
                      className="text-xs font-medium tracking-wide"
                      animate={{
                        color: isComplete
                          ? 'rgb(5, 150, 105)'
                          : isActive
                            ? 'rgb(220, 38, 38)'
                            : 'rgb(161, 161, 170)',
                      }}
                      transition={{ duration: 0.25, ease }}
                    >
                      {step.label}
                    </motion.span>
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Phase content -- asymmetric: enter 350ms, exit 200ms */}
          <AnimatePresence mode="wait">
            {/* === VERIFY PHASE === */}
            {phase === 'verify' && (
              <motion.div
                key="verify"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: exitY, filter: reduced ? undefined : 'blur(4px)' }}
                transition={{ duration: 0.25, ease }}
              >
                {/* Heading */}
                <div className="text-center mb-10">
                  <motion.h1
                    initial={{ opacity: 0, y: enterY }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08, ease }}
                    className="text-3xl md:text-4xl font-semibold text-zinc-900 mb-3 text-balance"
                  >
                    Prove you&apos;re{' '}
                    <span className="font-serif italic text-red-600">human</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: enterY }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.14, ease }}
                    className="text-[15px] text-zinc-500 leading-relaxed max-w-sm mx-auto text-pretty"
                  >
                    Scan the QR code with the Self app. Your Aadhaar identity is verified
                    using zero-knowledge proofs -- nothing is stored.
                  </motion.p>
                </div>

                {/* QR verification */}
                <motion.div
                  initial={{ opacity: 0, y: enterY }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease }}
                >
                  <SelfVerification sessionId={sessionId} onVerified={handleVerified} />
                </motion.div>
              </motion.div>
            )}

            {/* === SUCCESS PHASE === */}
            {phase === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease }}
                className="text-center"
              >
                <div className="relative mx-auto size-20 mb-8">
                  {/* Pulse ring -- single, subtle */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-emerald-200/40"
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                  {/* Icon */}
                  <motion.div
                    className="relative size-full rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease, delay: 0.05 }}
                  >
                    <ShieldCheck className="size-9 text-white" strokeWidth={1.8} />
                  </motion.div>
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1, ease }}
                  className="text-2xl font-semibold text-zinc-900 mb-2"
                >
                  Identity verified
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.16 }}
                  className="text-sm text-zinc-500 mb-6"
                >
                  Redirecting to voting...
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.22 }}
                  className="flex justify-center"
                >
                  <div className="h-1 w-32 rounded-full bg-zinc-100 overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
