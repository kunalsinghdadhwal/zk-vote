"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail } from "lucide-react"

export function CTASection() {
  const [email, setEmail] = useState("")

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative">
        {/* Card container */}
        <div className="relative p-10 md:p-14 rounded-3xl glass text-center overflow-hidden">
          {/* Subtle inner highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] rounded-full pointer-events-none bg-violet-500/[0.04]" />

          {/* Badge */}
          <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/15 mb-8">
            <div className="size-1.5 rounded-full bg-violet-400" />
            <span className="text-sm text-violet-300/90 font-light">Early Access</span>
          </div>

          {/* Heading */}
          <h2 className="relative text-3xl md:text-4xl font-semibold text-white mb-5 text-balance">
            Ready to Vote{" "}
            <span className="text-violet-400">Privately</span>?
          </h2>

          {/* Description */}
          <p className="relative text-slate-400 mb-10 max-w-md mx-auto font-light leading-relaxed text-pretty">
            Join the waitlist to be notified when ZK Vote launches. Be among the first to experience truly private voting.
          </p>

          {/* Email form */}
          <form onSubmit={(e) => e.preventDefault()} className="relative flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 h-12 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-slate-500 focus:border-violet-500/40 focus:bg-white/[0.05] transition-all duration-200 rounded-xl font-light"
              />
            </div>
            <Button
              type="submit"
              variant="ghost"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-white/30 bg-transparent px-6 font-medium text-white transition-all duration-100 [box-shadow:5px_5px_rgb(255_255_255_/_0.2)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(255_255_255_/_0.2)]"
            >
              <span className="flex items-center gap-2">
                Join Waitlist
                <ArrowRight className="size-4" />
              </span>
            </Button>
          </form>

          {/* Trust note */}
          <p className="relative mt-6 text-xs text-slate-500 font-light">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
