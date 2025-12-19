import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-800 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-400" />
            <span className="font-bold text-white">ZK Vote</span>
          </div>

          <nav className="flex gap-8">
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Documentation
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              GitHub
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Twitter
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Discord
            </a>
          </nav>

          <p className="text-slate-500 text-sm">&copy; 2025 ZK Vote. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
