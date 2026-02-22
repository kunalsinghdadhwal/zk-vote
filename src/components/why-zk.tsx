import { Lock, Eye, Scale, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const benefits = [
  {
    icon: Lock,
    title: "Privacy",
    description: "Your vote is your secret. ZK proofs ensure no one can link your identity to your choice.",
    accent: "violet",
    colors: {
      iconBg: "bg-violet-50",
      iconBorder: "border-violet-100",
      icon: "text-violet-600",
      bar: "bg-violet-500",
      hover: "group-hover:border-violet-200",
    },
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Anyone can verify the election results are accurate without compromising voter privacy.",
    accent: "blue",
    colors: {
      iconBg: "bg-blue-50",
      iconBorder: "border-blue-100",
      icon: "text-blue-600",
      bar: "bg-blue-500",
      hover: "group-hover:border-blue-200",
    },
  },
  {
    icon: Scale,
    title: "Fairness",
    description: "Cryptographic guarantees prevent vote manipulation, coercion, and double voting.",
    accent: "emerald",
    colors: {
      iconBg: "bg-emerald-50",
      iconBorder: "border-emerald-100",
      icon: "text-emerald-600",
      bar: "bg-emerald-500",
      hover: "group-hover:border-emerald-200",
    },
  },
]

export function WhyZK() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-14">
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

        {/* Benefits - horizontal cards with left accent bar */}
        <div className="space-y-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className={`group relative flex items-start gap-6 rounded-2xl border border-zinc-200/80 bg-white p-7 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/50 ${benefit.colors.hover} overflow-hidden`}
            >
              {/* Left accent bar */}
              <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full ${benefit.colors.bar} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`flex-shrink-0 size-14 rounded-xl ${benefit.colors.iconBg} ${benefit.colors.iconBorder} border flex items-center justify-center transition-all duration-300`}>
                <benefit.icon className={`size-6 ${benefit.colors.icon}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-zinc-800 mb-2">{benefit.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-normal text-[15px] text-pretty">{benefit.description}</p>
              </div>

              {/* Hover arrow */}
              <div className="hidden md:flex items-center self-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="size-5 text-zinc-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Visual flow diagram */}
        <div className="mt-14 flex justify-center">
          <div className="inline-flex items-center gap-4 md:gap-6 rounded-full border border-zinc-200 bg-white px-6 md:px-8 py-3.5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="size-2.5 rounded-full bg-violet-500" />
              <span className="text-sm text-zinc-600 font-medium">Vote</span>
            </div>
            <Separator orientation="horizontal" className="!w-8 !bg-zinc-200" />
            <div className="flex items-center gap-2.5">
              <div className="size-2.5 rounded-full bg-indigo-500" />
              <span className="text-sm text-zinc-600 font-medium">ZK Proof</span>
            </div>
            <Separator orientation="horizontal" className="!w-8 !bg-zinc-200" />
            <div className="flex items-center gap-2.5">
              <div className="size-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm text-zinc-600 font-medium">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
