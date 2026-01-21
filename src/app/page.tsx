import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { WhyZK } from "@/components/why-zk"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-dvh bg-zinc-950 text-white relative overflow-x-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <WhyZK />
      <CTASection />
      <Footer />
    </main>
  )
}
