'use client'

import '@rainbow-me/rainbowkit/styles.css'

import { type ReactNode } from 'react'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'

const config = getDefaultConfig({
  appName: 'ZK Vote',
  projectId: 'zk-vote-local', // WalletConnect not needed for extension wallets
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http('https://base-sepolia-rpc.publicnode.com'),
  },
  ssr: true,
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
