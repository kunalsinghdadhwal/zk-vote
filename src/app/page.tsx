import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-dvh bg-stone-50 text-zinc-900 relative overflow-x-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <CTASection />
      <Footer />
    </main>
  )
}
