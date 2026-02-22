import { Shield, Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative py-16 px-6">
      {/* Top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-px bg-zinc-200" />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-violet-600 flex items-center justify-center">
              <Shield className="size-[18px] text-white" />
            </div>
            <span className="font-medium text-lg text-zinc-900">ZK Vote</span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <a
              href="#"
              className="text-zinc-500 hover:text-zinc-900 text-sm font-normal transition-colors duration-200"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-zinc-500 hover:text-zinc-900 text-sm font-normal transition-colors duration-200 flex items-center gap-2"
            >
              <Github className="size-4" />
              GitHub
            </a>
            <a
              href="#"
              className="text-zinc-500 hover:text-zinc-900 text-sm font-normal transition-colors duration-200 flex items-center gap-2"
            >
              <Twitter className="size-4" />
              Twitter
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-zinc-400 text-sm">2025 ZK Vote</p>
        </div>

        {/* Bottom tagline */}
        <div className="mt-12 pt-8 border-t border-zinc-100 flex justify-center">
          <p className="text-xs text-zinc-400 font-light">
            Built with zero-knowledge proofs for a more private future
          </p>
        </div>
      </div>
    </footer>
  )
}
