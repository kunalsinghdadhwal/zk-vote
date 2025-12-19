import { Card, CardContent } from "@/components/ui/card"
import { Shield, Eye, CheckCircle2, Zap, Lock, Globe } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Zero-Knowledge Privacy",
    description: "Votes are cryptographically hidden while still being verifiable by anyone.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "All vote tallies are publicly auditable without revealing individual choices.",
  },
  {
    icon: CheckCircle2,
    title: "Mathematically Verified",
    description: "Every vote is proven valid through cryptographic proofs, eliminating fraud.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Results are available immediately after voting ends with full verification.",
  },
  {
    icon: Lock,
    title: "Tamper-Proof",
    description: "Once cast, votes cannot be altered, deleted, or manipulated by anyone.",
  },
  {
    icon: Globe,
    title: "Decentralized",
    description: "No single entity controls the system. Trust is distributed across the network.",
  },
]

export function Features() {
  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why ZK Vote?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Built on cutting-edge zero-knowledge technology to ensure every vote is private, verifiable, and secure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
