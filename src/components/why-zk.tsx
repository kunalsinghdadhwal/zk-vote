import { Lock, Eye, Scale } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const pillars = [
  {
    num: "01",
    icon: Lock,
    title: "Privacy",
    subtitle: "Your secret, mathematically guaranteed",
    description: "ZK proofs ensure no one can link your identity to your choice. Your vote remains yours alone.",
    color: "text-violet-600",
    dot: "bg-violet-500",
    line: "from-violet-400/60",
    numColor: "text-violet-200",
    align: "md:mr-auto" as const,
  },
  {
    num: "02",
    icon: Eye,
    title: "Transparency",
    subtitle: "Verifiable by anyone, anywhere",
    description: "Anyone can verify the election results are accurate without compromising voter privacy.",
    color: "text-blue-600",
    dot: "bg-blue-500",
    line: "from-blue-400/60",
    numColor: "text-blue-200",
    align: "md:ml-auto" as const,
  },
  {
    num: "03",
    icon: Scale,
    title: "Fairness",
    subtitle: "Cryptographic certainty",
    description: "Mathematical guarantees prevent vote manipulation, coercion, and double voting.",
    color: "text-emerald-600",
    dot: "bg-emerald-500",
    line: "from-emerald-400/60",
    numColor: "text-emerald-200",
    align: "md:mx-auto" as const,
  },
]

export function WhyZK() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="!rounded-full !bg-zinc-100 !border-zinc-200 !text-zinc-500 !h-auto px-4 py-1.5 mb-8 uppercase text-xs tracking-wider">
            Technology
          </Badge>
          <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 mb-5 text-balance">
            The Power of{" "}
            <span className="font-serif italic text-violet-600">Zero-Knowledge</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-lg font-light leading-relaxed text-pretty">
            Zero-knowledge proofs solve the fundamental tension between privacy and transparency in voting.
          </p>
        </div>

        {/* Staggered editorial blocks */}
        <div className="relative">
          {/* Vertical connector -- desktop only */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-zinc-200 via-zinc-200 to-transparent" />

          <div className="space-y-8 md:space-y-0">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.num}
                className={`group relative md:w-[55%] ${pillar.align}`}
                style={{ marginTop: i > 0 ? '-1rem' : undefined }}
              >
                {/* Connector dot on the vertical line -- desktop */}
                <div className={`hidden md:block absolute top-10 ${
                  i === 0 ? '-right-[calc(50%/55*45+6px)]' : i === 1 ? '-left-[calc(50%/55*45+6px)]' : 'left-1/2 -translate-x-1/2 -top-4'
                }`}>
                  <div className={`size-3 rounded-full ${pillar.dot} ring-4 ring-stone-50`} />
                </div>

                {/* Card */}
                <div className="relative rounded-2xl border border-zinc-200/80 bg-white p-8 md:p-10 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/40 hover:border-zinc-300/80 overflow-hidden">
                  {/* Large decorative number */}
                  <span className={`absolute top-4 right-6 text-[5.5rem] md:text-[7rem] font-serif italic leading-none ${pillar.numColor} select-none pointer-events-none transition-all duration-500 group-hover:scale-[1.03]`}>
                    {pillar.num}
                  </span>

                  {/* Content */}
                  <div className="relative">
                    {/* Icon + title row */}
                    <div className="flex items-center gap-3 mb-4">
                      <pillar.icon className={`size-5 ${pillar.color}`} />
                      <h3 className={`text-2xl md:text-3xl font-semibold ${pillar.color}`}>{pillar.title}</h3>
                    </div>

                    {/* Subtitle */}
                    <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                      {pillar.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-zinc-600 leading-relaxed text-[15px] max-w-sm">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom equation */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-3 md:gap-5 text-sm font-medium text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-violet-500" />
              Privacy
            </span>
            <span className="text-zinc-300 text-lg">+</span>
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue-500" />
              Transparency
            </span>
            <span className="text-zinc-300 text-lg">=</span>
            <span className="flex items-center gap-2 text-zinc-800 font-semibold">
              <span className="size-2 rounded-full bg-emerald-500" />
              Trust
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
