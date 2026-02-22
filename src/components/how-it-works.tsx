import { ScanLine, Vote, FileCheck, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const steps = [
  {
    num: "01",
    icon: ScanLine,
    title: "Verify Identity",
    description: "Scan the QR code with the Self app to verify your Aadhaar identity using zero-knowledge proofs.",
    accent: "violet",
  },
  {
    num: "02",
    icon: Vote,
    title: "Cast Your Vote",
    description: "Once verified, select your choice. Your vote is encrypted locally before submission.",
    accent: "indigo",
  },
  {
    num: "03",
    icon: FileCheck,
    title: "Generate ZK Proof",
    description: "A zero-knowledge proof is created to verify your vote is valid without revealing your choice.",
    accent: "blue",
  },
  {
    num: "04",
    icon: CheckCircle,
    title: "Verify & Confirm",
    description: "Your vote is recorded on-chain. Anyone can verify the tally without seeing individual votes.",
    accent: "emerald",
  },
]

const accentMap: Record<string, { icon: string; num: string; dot: string; iconBg: string }> = {
  violet: {
    icon: "text-violet-600",
    num: "text-violet-300/30",
    dot: "bg-violet-500",
    iconBg: "bg-violet-50 border-violet-100",
  },
  indigo: {
    icon: "text-indigo-600",
    num: "text-indigo-300/30",
    dot: "bg-indigo-500",
    iconBg: "bg-indigo-50 border-indigo-100",
  },
  blue: {
    icon: "text-blue-600",
    num: "text-blue-300/30",
    dot: "bg-blue-500",
    iconBg: "bg-blue-50 border-blue-100",
  },
  emerald: {
    icon: "text-emerald-600",
    num: "text-emerald-300/30",
    dot: "bg-emerald-500",
    iconBg: "bg-emerald-50 border-emerald-100",
  },
}

export function HowItWorks() {
  return (
    <section className="py-20 px-6 relative">
      {/* Subtle section background */}
      <div className="absolute inset-0 pointer-events-none bg-indigo-50/40" />

      <div className="max-w-5xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-14">
          <Badge variant="outline" className="!rounded-full !bg-zinc-100 !border-zinc-200 !text-zinc-500 !h-auto px-4 py-1.5 mb-8 uppercase text-xs tracking-wider">
            Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 mb-5 text-balance">
            How It <span className="font-serif italic text-violet-600">Works</span>
          </h2>
          <p className="text-zinc-500 text-lg font-light text-pretty">
            Four simple steps to cast a completely private, verifiable vote.
          </p>
        </div>

        {/* Horizontal connecting line - desktop only */}
        <div className="hidden md:block absolute top-[calc(50%+60px)] left-[8%] right-[8%] h-px z-0">
          <div className="w-full h-full bg-gradient-to-r from-violet-300/40 via-indigo-300/30 to-emerald-300/40" />
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
          {steps.map((step) => {
            const colors = accentMap[step.accent]
            return (
              <div
                key={step.num}
                className="group relative rounded-2xl border border-zinc-200/80 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/50 hover:border-zinc-300 overflow-hidden"
              >
                {/* Large watermark number */}
                <span className={`absolute -top-4 -right-2 text-[7rem] font-bold leading-none ${colors.num} select-none pointer-events-none transition-all duration-500 group-hover:scale-105`}>
                  {step.num}
                </span>

                {/* Timeline dot - visible on desktop */}
                <div className="hidden md:flex absolute -bottom-[7px] left-1/2 -translate-x-1/2 z-20">
                  <div className={`size-3.5 rounded-full ${colors.dot} ring-4 ring-stone-50 transition-all duration-300 group-hover:scale-125`} />
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`size-12 rounded-xl ${colors.iconBg} border flex items-center justify-center mb-5 transition-all duration-300`}>
                    <step.icon className={`size-5.5 ${colors.icon} transition-all duration-300`} />
                  </div>

                  {/* Step label */}
                  <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-medium mb-2 block">
                    Step {step.num}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-zinc-800 mb-2.5">{step.title}</h3>

                  {/* Description */}
                  <p className="text-zinc-500 text-sm leading-relaxed font-normal text-pretty">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
