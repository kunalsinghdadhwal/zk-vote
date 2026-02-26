'use client'

import { useEffect, useState } from 'react'
import { SelfQRcodeWrapper, SelfAppBuilder } from '@selfxyz/qrcode'
import { ethers } from 'ethers'
import { motion, AnimatePresence } from 'motion/react'
import { Loader2, Fingerprint, Lock, Eye } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

interface SelfVerificationProps {
  sessionId: string
  onVerified: () => void
}

const ease = [0.16, 1, 0.3, 1] as const

export function SelfVerification({ sessionId, onVerified }: SelfVerificationProps) {
  const [selfApp, setSelfApp] = useState<ReturnType<SelfAppBuilder['build']> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [claiming, setClaiming] = useState(false)

  useEffect(() => {
    const baseEndpoint = process.env.NEXT_PUBLIC_SELF_ENDPOINT
    if (!baseEndpoint) {
      setError('NEXT_PUBLIC_SELF_ENDPOINT is not configured. Set it in .env.local to your ngrok URL + /api/verify.')
      return
    }

    // Append sessionId so /api/verify can correlate this browser session
    const endpoint = `${baseEndpoint}?session=${sessionId}`

    try {
      const app = new SelfAppBuilder({
        version: 2,
        appName: 'ZK Vote',
        scope: 'zk-vote',
        endpoint,
        logoBase64: 'https://i.postimg.cc/mrmVf9hm/self.png',
        userId: ethers.ZeroAddress,
        endpointType: 'https',
        userIdType: 'hex',
        disclosures: {
          minimumAge: 18,
        },
      }).build()

      setSelfApp(app)
    } catch (err) {
      console.error('Failed to initialize Self app:', err)
      setError(err instanceof Error ? err.message : 'Failed to initialize verification')
    }
  }, [sessionId])

  const handleSuccess = async () => {
    console.log('[self] onSuccess fired, claiming cookie...')
    setClaiming(true)
    try {
      const res = await fetch('/api/verify/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        console.log('[self] Cookie claimed successfully')
        onVerified()
      } else {
        console.error('[self] Claim failed:', data)
        setError('Verification succeeded but session claim failed. Please try again.')
        setClaiming(false)
      }
    } catch (err) {
      console.error('[self] Claim error:', err)
      setError('Failed to complete verification. Please try again.')
      setClaiming(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Error state */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.35, ease }}
            className="mb-6 overflow-hidden"
          >
            <Alert variant="error" className="!bg-red-50 !border-red-200 !text-red-700">
              <AlertTitle className="!text-red-700 text-sm">Error</AlertTitle>
              <AlertDescription className="!text-red-600 text-xs">{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Card */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <AnimatePresence mode="wait">
          {claiming ? (
            <motion.div
              key="claiming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <Loader2 className="size-6 text-emerald-500 animate-spin" />
              <p className="text-sm text-zinc-500">Completing verification...</p>
            </motion.div>
          ) : selfApp ? (
            <motion.div
              key="qr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {/* QR Code area */}
              <div className="w-full flex justify-center py-8 px-8">
                <div className="rounded-xl overflow-hidden bg-white">
                  <SelfQRcodeWrapper
                    selfApp={selfApp}
                    onSuccess={handleSuccess}
                    onError={(err) => {
                      console.error('[self] onError:', err)
                      setError(err?.reason || err?.error_code || 'Verification failed on the Self relayer')
                    }}
                    darkMode={false}
                    size={220}
                  />
                </div>
              </div>

              <Separator className="!bg-zinc-100" />

              {/* Status bar */}
              <div className="w-full px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <motion.div
                    className="size-2 rounded-full bg-emerald-500"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span className="text-xs text-zinc-500">Waiting for scan</span>
                </div>
                <span className="text-xs text-zinc-400">Self Protocol</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <Loader2 className="size-6 text-violet-500 animate-spin" />
              <p className="text-sm text-zinc-400">Initializing...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6 flex items-center justify-center gap-6 text-zinc-400"
      >
        {[
          { icon: Fingerprint, label: 'Aadhaar' },
          { icon: Lock, label: 'Encrypted' },
          { icon: Eye, label: 'No data stored' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55 + i * 0.08, ease }}
            className="flex items-center gap-1.5"
          >
            <item.icon className="size-3 text-zinc-300" />
            <span className="text-[11px]">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
