"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const [email, setEmail] = useState("")

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-950 to-indigo-950/30">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Vote Privately?</h2>
        <p className="text-slate-400 mb-8">
          Join the waitlist to be notified when ZK Vote launches. Be among the first to experience truly private voting.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500"
          />
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Join Waitlist
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </form>
      </div>
    </section>
  )
}
