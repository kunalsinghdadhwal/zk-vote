"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"
import Silk from "./Silk"

export function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Silk background - full coverage */}
      <div className="absolute inset-0 z-0">
        <Silk
          speed={3}
          scale={1.2}
          color="#6366f1"
          noiseIntensity={1.2}
          rotation={0.2}
        />
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-zinc-950/60 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="opacity-0 animate-fade-in-down inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-10">
          <div className="flex items-center justify-center size-6 rounded-full bg-violet-500/15">
            <Shield className="size-3.5 text-violet-400" />
          </div>
          <span className="text-sm text-white/90">Powered by Zero-Knowledge Proofs</span>
        </div>

        {/* Main heading */}
        <h1 className="opacity-0 animate-fade-in-up delay-100 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.1] mb-8 text-balance">
          <span className="text-white">Private Voting.</span>
          <br />
          <span className="text-white">Public Trust.</span>
        </h1>

        {/* Subtitle */}
        <p className="opacity-0 animate-fade-in-up delay-200 text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-14 leading-relaxed font-light text-pretty">
          Verifiable, anonymous elections using zero-knowledge cryptography.
          <span className="text-white"> Your vote counts, but no one knows how you voted.</span>
        </p>

        {/* CTA Buttons */}
        <div className="opacity-0 animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="ghost"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 !bg-white px-6 font-medium !text-neutral-800 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
          >
            <span className="flex items-center gap-2">
              Launch App
              <ArrowRight className="size-4" />
            </span>
          </Button>
          <Button
            variant="ghost"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 !bg-white px-6 font-medium !text-neutral-800 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
          >
            Read Documentation
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="opacity-0 animate-fade-in delay-500 mt-20 flex items-center justify-center gap-10 text-white/70 text-sm">
          <div className="flex items-center gap-2.5">
            <div className="size-1.5 rounded-full bg-emerald-400/60" />
            <span>Audited</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2.5">
            <div className="size-1.5 rounded-full bg-emerald-400/60" />
            <span>Open Source</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2.5">
            <div className="size-1.5 rounded-full bg-violet-400/60" />
            <span>On-chain</span>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-30 bg-zinc-950/90 pointer-events-none" />
    </section>
  )
}
