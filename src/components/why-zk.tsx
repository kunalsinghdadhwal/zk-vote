import { Lock, Eye, Scale } from "lucide-react"

const benefits = [
  {
    icon: Lock,
    title: "Privacy",
    description: "Your vote is your secret. ZK proofs ensure no one can link your identity to your choice.",
    accent: "violet",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Anyone can verify the election results are accurate without compromising voter privacy.",
    accent: "blue",
  },
  {
    icon: Scale,
    title: "Fairness",
    description: "Cryptographic guarantees prevent vote manipulation, coercion, and double voting.",
    accent: "emerald",
  },
]

const accentColors: Record<string, string> = {
  violet: "text-violet-400",
  blue: "text-blue-400",
  emerald: "text-emerald-400",
}

export function WhyZK() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-slate-400 uppercase tracking-[0.15em] mb-8">
            Technology
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
            The Power of{" "}
            <span className="gradient-text">Zero-Knowledge</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Zero-knowledge proofs solve the fundamental tension between privacy and transparency in voting.
          </p>
        </div>

        {/* Benefits grid - refined cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group text-center p-8 rounded-2xl glass glass-hover transition-all duration-500"
            >
              {/* Icon container */}
              <div className="relative inline-flex mb-8">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/[0.06] flex items-center justify-center transition-all duration-500 group-hover:border-white/[0.1] group-hover:from-white/[0.06]">
                  <benefit.icon className={`w-7 h-7 ${accentColors[benefit.accent]} transition-all duration-500`} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium text-white mb-4 tracking-tight">{benefit.title}</h3>
              <p className="text-slate-400 leading-relaxed font-light text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Visual flow diagram - refined */}
        <div className="mt-20 flex justify-center">
          <div className="inline-flex items-center gap-4 md:gap-6 px-6 md:px-8 py-4 rounded-2xl glass">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-violet-400/60" />
              <span className="text-sm text-slate-400 font-light">Vote</span>
            </div>
            <div className="text-slate-600 text-xs">
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="text-slate-600">
                <path d="M19.354 4.354a.5.5 0 000-.708L16.172.464a.5.5 0 10-.707.708L18.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 4.5h19v-1H0v1z" fill="currentColor" fillOpacity="0.3"/>
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-400/60" />
              <span className="text-sm text-slate-400 font-light">ZK Proof</span>
            </div>
            <div className="text-slate-600 text-xs">
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="text-slate-600">
                <path d="M19.354 4.354a.5.5 0 000-.708L16.172.464a.5.5 0 10-.707.708L18.293 4l-2.828 2.828a.5.5 0 10.707.708l3.182-3.182zM0 4.5h19v-1H0v1z" fill="currentColor" fillOpacity="0.3"/>
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
              <span className="text-sm text-slate-400 font-light">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
