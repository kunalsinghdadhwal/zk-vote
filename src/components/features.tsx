import { Shield, Eye, CheckCircle2, Zap, Lock, Globe } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Zero-Knowledge Privacy",
    description: "Votes are cryptographically hidden while still being verifiable by anyone.",
    accent: "violet",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "All vote tallies are publicly auditable without revealing individual choices.",
    accent: "blue",
  },
  {
    icon: CheckCircle2,
    title: "Mathematically Verified",
    description: "Every vote is proven valid through cryptographic proofs, eliminating fraud.",
    accent: "emerald",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Results are available immediately after voting ends with full verification.",
    accent: "amber",
  },
  {
    icon: Lock,
    title: "Tamper-Proof",
    description: "Once cast, votes cannot be altered, deleted, or manipulated by anyone.",
    accent: "rose",
  },
  {
    icon: Globe,
    title: "Decentralized",
    description: "No single entity controls the system. Trust is distributed across the network.",
    accent: "indigo",
  },
]

const accentColors: Record<string, { icon: string; glow: string; border: string }> = {
  violet: {
    icon: "text-violet-400",
    glow: "group-hover:shadow-violet-500/10",
    border: "group-hover:border-violet-500/20",
  },
  blue: {
    icon: "text-blue-400",
    glow: "group-hover:shadow-blue-500/10",
    border: "group-hover:border-blue-500/20",
  },
  emerald: {
    icon: "text-emerald-400",
    glow: "group-hover:shadow-emerald-500/10",
    border: "group-hover:border-emerald-500/20",
  },
  amber: {
    icon: "text-amber-400",
    glow: "group-hover:shadow-amber-500/10",
    border: "group-hover:border-amber-500/20",
  },
  rose: {
    icon: "text-rose-400",
    glow: "group-hover:shadow-rose-500/10",
    border: "group-hover:border-rose-500/20",
  },
  indigo: {
    icon: "text-indigo-400",
    glow: "group-hover:shadow-indigo-500/10",
    border: "group-hover:border-indigo-500/20",
  },
}

export function Features() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-slate-400 uppercase mb-8">
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 text-balance">
            Why <span className="text-violet-400">ZK Vote</span>?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg font-light leading-relaxed text-pretty">
            Built on cutting-edge zero-knowledge technology to ensure every vote is private, verifiable, and secure.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const colors = accentColors[feature.accent]
            return (
              <div
                key={feature.title}
                className={`group relative p-7 rounded-2xl glass glass-hover transition-all duration-200 ${colors.glow} ${colors.border} hover:shadow-lg`}
              >
                {/* Icon */}
                <div className="relative size-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6 transition-all duration-200 group-hover:bg-white/[0.05] group-hover:border-white/[0.1]">
                  <feature.icon className={`size-5 ${colors.icon} transition-all duration-200`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-medium text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light text-pretty">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
