"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { LineShadowText } from "@/components/ui/line-shadow-text"
import { ArrowRight } from "lucide-react"
import Silk from "./Silk"

export function Hero() {
  return (
    <section className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden bg-stone-50">
      {/* Silk background */}
      <div className="absolute inset-0 z-0 w-screen left-1/2 -translate-x-1/2">
        <Silk
          speed={3}
          scale={1.2}
          color="#6366f1"
          noiseIntensity={1.2}
          rotation={0.2}
        />
      </div>

      {/* Layered overlays */}
      <div className="absolute inset-0 z-10 bg-stone-50/10 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-stone-50 pointer-events-none" />
      {/* Center vignette for text readability */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 40% at 50% 48%, rgba(250,250,249,0.35) 0%, transparent 60%)" }} />

      {/* Main content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        {/* Main heading */}
        <h1 className="opacity-0 animate-fade-in-up delay-100 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.05] mb-8 text-balance">
          <span className="text-zinc-900">Private</span>{' '}
          <LineShadowText shadowColor="rgba(255,255,255,0.5)" className="font-serif italic text-white">Voting.</LineShadowText>
          <br />
          <span className="text-zinc-900">Public</span>{' '}
          <LineShadowText shadowColor="rgba(255,255,255,0.5)" className="font-serif italic text-white">Trust.</LineShadowText>
        </h1>

        {/* Subtitle */}
        <p className="opacity-0 animate-fade-in-up delay-200 text-lg md:text-xl text-zinc-600 max-w-lg mx-auto mb-14 leading-relaxed font-light text-pretty">
          Verifiable, anonymous elections using zero-knowledge cryptography.
          <span className="text-zinc-800 font-normal"> Your vote counts, but no one knows how you voted.</span>
        </p>

        {/* CTA Buttons */}
        <div className="opacity-0 animate-fade-in-up delay-300 flex flex-row gap-3 justify-center">
          <Link href="/verify">
            <Button variant="default" size="lg">
              Launch App
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            <span className="sm:hidden">Documentation</span>
            <span className="hidden sm:inline">Read Documentation</span>
          </Button>
        </div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-30 bg-gradient-to-t from-stone-50 to-transparent pointer-events-none" />
    </section>
  )
}
