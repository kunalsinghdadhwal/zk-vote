import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    step: "01",
    title: "Connect Wallet",
    description: "Link your Web3 wallet to verify your identity without revealing personal information.",
  },
  {
    step: "02",
    title: "Cast Your Vote",
    description: "Select your choice. Your vote is encrypted locally before being submitted.",
  },
  {
    step: "03",
    title: "Generate ZK Proof",
    description: "A zero-knowledge proof is created to verify your vote is valid without revealing your choice.",
  },
  {
    step: "04",
    title: "Verify & Confirm",
    description: "Your vote is recorded on-chain. Anyone can verify the tally without seeing individual votes.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-slate-400">Four simple steps to cast a completely private, verifiable vote.</p>
        </div>

        <div className="space-y-4">
          {steps.map((item, index) => (
            <Card key={item.step} className="bg-slate-950 border-slate-800">
              <CardContent className="p-6 flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
