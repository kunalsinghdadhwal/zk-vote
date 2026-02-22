"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative">
        <div className="relative rounded-3xl border border-zinc-200/80 bg-white p-10 md:p-14 text-center overflow-hidden shadow-sm">
          {/* Subtle inner highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] rounded-full pointer-events-none bg-violet-100/40" />

          {/* Badge */}
          <div className="relative mb-8">
            <Badge variant="outline" className="!rounded-full !bg-violet-50 !border-violet-200 !text-violet-600 !h-auto px-4 py-2 gap-2">
              <div className="size-1.5 rounded-full bg-violet-500" />
              Early Access
            </Badge>
          </div>

          {/* Heading */}
          <h2 className="relative text-3xl md:text-4xl font-semibold text-zinc-900 mb-5 text-balance">
            Ready to Vote{" "}
            <span className="font-serif italic text-violet-600">Privately</span>?
          </h2>

          {/* Description */}
          <p className="relative text-zinc-500 mb-10 max-w-md mx-auto font-normal leading-relaxed text-pretty">
            Experience truly private, verifiable voting powered by zero-knowledge proofs and Aadhaar verification.
          </p>

          {/* CTA */}
          <div className="relative flex justify-center">
            <Link href="/vote">
              <Button variant="default" size="lg">
                Get Started
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
