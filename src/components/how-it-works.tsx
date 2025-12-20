import { Wallet, Vote, FileCheck, CheckCircle } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Wallet,
    title: "Connect Wallet",
    description: "Link your Web3 wallet to verify your identity without revealing personal information.",
  },
  {
    step: "02",
    icon: Vote,
    title: "Cast Your Vote",
    description: "Select your choice. Your vote is encrypted locally before being submitted.",
  },
  {
    step: "03",
    icon: FileCheck,
    title: "Generate ZK Proof",
    description: "A zero-knowledge proof is created to verify your vote is valid without revealing your choice.",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Verify & Confirm",
    description: "Your vote is recorded on-chain. Anyone can verify the tally without seeing individual votes.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-32 px-6 relative">
      {/* Subtle section background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(99, 102, 241, 0.02) 50%, transparent 100%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-slate-400 uppercase tracking-[0.15em] mb-8">
            Process
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-slate-400 text-lg font-light">
            Four simple steps to cast a completely private, verifiable vote.
          </p>
        </div>

        {/* Steps timeline */}
        <div className="relative">
          {/* Connecting line - refined */}
          <div className="absolute left-[27px] md:left-[31px] top-8 bottom-8 w-px bg-gradient-to-b from-violet-500/30 via-indigo-500/20 to-transparent hidden md:block" />

          <div className="space-y-4">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className="group relative flex items-start gap-6 p-6 md:p-7 rounded-2xl glass glass-hover transition-all duration-500 hover:shadow-lg hover:shadow-violet-500/5"
              >
                {/* Step indicator */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/[0.06] flex items-center justify-center transition-all duration-500 group-hover:border-white/[0.1] group-hover:from-white/[0.06] group-hover:to-white/[0.03]">
                    <item.icon className="w-6 h-6 md:w-7 md:h-7 text-violet-400/80 transition-all duration-500 group-hover:text-violet-400" />
                  </div>
                  {/* Step number - subtle badge */}
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#0a0a0f] border border-white/10 flex items-center justify-center">
                    <span className="text-[10px] font-medium text-slate-400">{index + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5 md:pt-3">
                  <h3 className="text-lg md:text-xl font-medium text-white mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light text-sm md:text-base">{item.description}</p>
                </div>

                {/* Arrow indicator for next step */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -bottom-2 left-[27px] w-px h-4 bg-gradient-to-b from-white/10 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
