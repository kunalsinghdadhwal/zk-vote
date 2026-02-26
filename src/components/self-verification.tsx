'use client'

import { useEffect, useState } from 'react'
import { SelfQRcodeWrapper, SelfAppBuilder } from '@selfxyz/qrcode'
import { ethers } from 'ethers'
import { Loader2, Fingerprint, Lock, Eye } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

interface SelfVerificationProps {
  sessionId: string
  onVerified: () => void
}

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
      {error && (
        <div className="opacity-0 animate-fade-in-up mb-6">
          <Alert variant="error" className="!bg-red-50 !border-red-200 !text-red-700">
            <AlertTitle className="!text-red-700 text-sm">Error</AlertTitle>
            <AlertDescription className="!text-red-600 text-xs">{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* QR Card */}
      <div className="opacity-0 animate-fade-in-up delay-200 rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        {claiming ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="size-6 text-emerald-500 animate-spin" />
            <p className="text-sm text-zinc-500">Completing verification...</p>
          </div>
        ) : selfApp ? (
          <div className="flex flex-col items-center">
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
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-zinc-500">Waiting for scan</span>
              </div>
              <span className="text-xs text-zinc-400">Self Protocol</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="size-6 text-violet-500 animate-spin" />
            <p className="text-sm text-zinc-400">Initializing...</p>
          </div>
        )}
      </div>

      {/* Trust indicators */}
      <div className="opacity-0 animate-fade-in delay-400 mt-6 flex items-center justify-center gap-6 text-zinc-400">
        {[
          { icon: Fingerprint, label: 'Aadhaar' },
          { icon: Lock, label: 'Encrypted' },
          { icon: Eye, label: 'No data stored' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <item.icon className="size-3 text-zinc-300" />
            <span className="text-[11px]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
