import { ScanLine, Vote, FileCheck, CheckCircle } from "lucide-react"

const steps = [
  {
    num: "01",
    icon: ScanLine,
    title: "Verify Identity",
    description: "Scan the QR code with the Self app to verify your Aadhaar identity using zero-knowledge proofs.",
  },
  {
    num: "02",
    icon: Vote,
    title: "Cast Your Vote",
    description: "Once verified, select your choice. Your vote is encrypted locally before submission.",
  },
  {
    num: "03",
    icon: FileCheck,
    title: "Generate ZK Proof",
    description: "A zero-knowledge proof is created to verify your vote is valid without revealing your choice.",
  },
  {
    num: "04",
    icon: CheckCircle,
    title: "Verify & Confirm",
    description: "Your vote is recorded on-chain. Anyone can verify the tally without seeing individual votes.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 px-6 relative">
      <div className="max-w-3xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 mb-5 text-balance">
            How It <span className="font-serif italic text-violet-600">Works</span>
          </h2>
          <p className="text-zinc-500 text-lg font-light text-pretty">
            Four simple steps to cast a completely private, verifiable vote.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center thread -- desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-zinc-200" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={step.num}
                  className={`relative md:flex md:items-start ${
                    i > 0 ? 'md:mt-16' : ''
                  }`}
                >
                  {/* Center dot */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 z-10">
                    <div className="size-2.5 rounded-full bg-zinc-400 ring-4 ring-stone-50" />
                  </div>

                  {/* Content -- alternates sides */}
                  <div className={`md:w-1/2 ${
                    isLeft
                      ? 'md:pr-12 md:text-right'
                      : 'md:pl-12 md:ml-auto'
                  }`}>
                    {/* Number + icon row */}
                    <div className={`flex items-center gap-3 mb-3 ${
                      isLeft ? 'md:justify-end' : ''
                    }`}>
                      {isLeft ? (
                        <>
                          <step.icon className="size-4 text-zinc-400 md:order-2" />
                          <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest md:order-1">{step.num}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">{step.num}</span>
                          <step.icon className="size-4 text-zinc-400" />
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-zinc-800 mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[15px] text-zinc-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
