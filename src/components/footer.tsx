import { Shield, Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative py-16 px-6">
      {/* Top border gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/80 to-indigo-500/80 flex items-center justify-center">
              <Shield className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-medium text-lg text-white tracking-tight">ZK Vote</span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <a
              href="#"
              className="text-slate-400 hover:text-white text-sm font-light transition-colors duration-300"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white text-sm font-light transition-colors duration-300 flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white text-sm font-light transition-colors duration-300 flex items-center gap-2"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-slate-500 text-sm font-light">&copy; 2025 ZK Vote</p>
        </div>

        {/* Bottom tagline */}
        <div className="mt-12 pt-8 border-t border-white/[0.04] flex justify-center">
          <p className="text-xs text-slate-600 font-light tracking-wide">
            Built with zero-knowledge proofs for a more private future
          </p>
        </div>
      </div>
    </footer>
  )
}
