import { Lock, Eye, Scale } from "lucide-react"

const benefits = [
  {
    icon: Lock,
    title: "Privacy",
    description: "Your vote is your secret. ZK proofs ensure no one can link your identity to your choice.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Anyone can verify the election results are accurate without compromising voter privacy.",
  },
  {
    icon: Scale,
    title: "Fairness",
    description: "Cryptographic guarantees prevent vote manipulation, coercion, and double voting.",
  },
]

export function WhyZK() {
  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Power of Zero-Knowledge</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Zero-knowledge proofs solve the fundamental tension between privacy and transparency in voting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
              <p className="text-slate-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
