import { Shield, Eye, CheckCircle2, Zap, Lock, Globe } from "lucide-react"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"

function RingsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-40 group-hover:opacity-60 transition-opacity duration-500">
      {[120, 200, 280].map((size) => (
        <div
          key={size}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/25"
          style={{ width: size, height: size }}
        />
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 rounded-full bg-violet-400/15 blur-sm" />
    </div>
  )
}

function GridDotsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(96,165,250,0.3) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-1/3 right-1/4 size-20 rounded-full bg-blue-400/10 blur-2xl" />
    </div>
  )
}

function HexagonBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-35 group-hover:opacity-55 transition-opacity duration-500">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        <path d="M200 40 L240 65 L240 115 L200 140 L160 115 L160 65 Z" fill="none" stroke="rgba(52,211,153,0.25)" strokeWidth="1" />
        <path d="M200 60 L225 75 L225 105 L200 120 L175 105 L175 75 Z" fill="none" stroke="rgba(52,211,153,0.35)" strokeWidth="1" />
        <circle cx="200" cy="90" r="3" fill="rgba(52,211,153,0.4)" />
        <line x1="200" y1="90" x2="240" y2="65" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
        <line x1="200" y1="90" x2="160" y2="115" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
      </svg>
    </div>
  )
}

function SpeedLinesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500">
      {[30, 50, 70, 90, 110].map((top) => (
        <div
          key={top}
          className="absolute h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"
          style={{ top: `${top}px`, left: "10%", right: "10%" }}
        />
      ))}
      <div className="absolute top-16 right-1/3 size-16 rounded-full bg-amber-400/10 blur-xl" />
    </div>
  )
}

function ChainBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-35 group-hover:opacity-55 transition-opacity duration-500">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        {[
          { cx: 140, cy: 80 },
          { cx: 200, cy: 100 },
          { cx: 260, cy: 80 },
        ].map((p, i, arr) => (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r="18" fill="none" stroke="rgba(244,63,94,0.2)" strokeWidth="1.5" />
            <circle cx={p.cx} cy={p.cy} r="4" fill="rgba(244,63,94,0.3)" />
            {i < arr.length - 1 && (
              <line x1={p.cx + 18} y1={p.cy} x2={arr[i + 1].cx - 18} y2={arr[i + 1].cy} stroke="rgba(244,63,94,0.15)" strokeWidth="1.5" />
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}

function ConstellationBackground() {
  const nodes = [
    { x: 80, y: 50 }, { x: 180, y: 30 }, { x: 280, y: 60 },
    { x: 130, y: 110 }, { x: 230, y: 100 }, { x: 320, y: 90 },
    { x: 160, y: 150 },
  ]
  const edges = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [3, 6], [4, 6]]

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="rgba(129,140,248,0.25)" strokeWidth="1" />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={i % 3 === 0 ? 4 : 2.5} fill={`rgba(129,140,248,${i % 3 === 0 ? 0.4 : 0.25})`} />
        ))}
      </svg>
    </div>
  )
}

const features = [
  {
    Icon: Shield,
    name: "Zero-Knowledge Privacy",
    description: "Votes are cryptographically hidden while still being verifiable by anyone.",
    href: "/vote",
    cta: "Start voting",
    background: <RingsBackground />,
    className: "lg:col-span-2",
  },
  {
    Icon: Eye,
    name: "Full Transparency",
    description: "All vote tallies are publicly auditable without revealing individual choices.",
    href: "/vote",
    cta: "Learn more",
    background: <GridDotsBackground />,
    className: "lg:col-span-1",
  },
  {
    Icon: CheckCircle2,
    name: "Mathematically Verified",
    description: "Every vote is proven valid through cryptographic proofs, eliminating fraud.",
    href: "/vote",
    cta: "See how",
    background: <HexagonBackground />,
    className: "lg:col-span-1",
  },
  {
    Icon: Zap,
    name: "Instant Results",
    description: "Results are available immediately after voting ends with full verification.",
    href: "/vote",
    cta: "Try it now",
    background: <SpeedLinesBackground />,
    className: "lg:col-span-1",
  },
  {
    Icon: Lock,
    name: "Tamper-Proof",
    description: "Once cast, votes cannot be altered, deleted, or manipulated by anyone.",
    href: "/vote",
    cta: "Learn more",
    background: <ChainBackground />,
    className: "lg:col-span-1",
  },
  {
    Icon: Globe,
    name: "Decentralized",
    description: "No single entity controls the system. Trust is distributed across the network.",
    href: "/vote",
    cta: "Explore",
    background: <ConstellationBackground />,
    className: "lg:col-span-3",
  },
]

export function Features() {
  return (
    <section className="py-12 px-6 relative">
      <div className="max-w-4xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 mb-5 text-balance">
            Why <span className="font-serif italic text-violet-600">ZK Vote</span>?
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-lg font-light leading-relaxed text-pretty">
            Built on cutting-edge zero-knowledge technology to ensure every vote is private, verifiable, and secure.
          </p>
        </div>

        <BentoGrid className="auto-rows-[12rem] lg:grid-cols-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
