"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-12 px-6 relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative">
        <div className="relative rounded-3xl border border-zinc-200/80 bg-white p-10 md:p-14 text-center overflow-hidden shadow-sm">
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
            <Link href="/verify">
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
