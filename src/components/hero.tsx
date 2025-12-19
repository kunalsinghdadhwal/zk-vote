import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 via-slate-950 to-slate-950" />

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 border border-indigo-500/30 rounded-full" />
        <div className="absolute top-40 right-20 w-96 h-96 border border-indigo-400/20 rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 border border-indigo-600/25 rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <Badge variant="outline" className="mb-6 border-indigo-500/50 text-indigo-300 bg-indigo-500/10">
          <Shield className="w-3 h-3 mr-1" />
          Powered by Zero-Knowledge Proofs
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
          <span className="text-white">Private Voting.</span>
          <br />
          <span className="text-indigo-400">Public Trust.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 text-pretty">
          ZK Vote enables verifiable, anonymous elections using zero-knowledge cryptography. Your vote counts, but no
          one knows how you voted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Launch App
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
          >
            Read Documentation
          </Button>
        </div>
      </div>
    </section>
  )
}
