"use client"

import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"
import { Shield, GithubIcon, TwitterIcon } from "lucide-react"

type FooterLink = {
  title: string
  href: string
  icon?: ReactNode
}

type FooterSection = {
  label: string
  links: FooterLink[]
}

function KIcon() {
  return (
    <span className="inline-flex items-center justify-center size-4 text-base font-bold leading-none">
      K
    </span>
  )
}

const footerLinks: FooterSection[] = [
  {
    label: "Product",
    links: [
      { title: "Documentation", href: "/docs" },
      { title: "How It Works", href: "#how-it-works" },
      { title: "Blog", href: "https://kxnl.in/blog" },
    ],
  },
  {
    label: "Connect",
    links: [
      {
        title: "GitHub",
        href: "https://github.com/kunalsinghdadhwal",
        icon: <GithubIcon />,
      },
      {
        title: "Twitter",
        href: "https://x.com/0xkun4l",
        icon: <TwitterIcon />,
      },
      {
        title: "Craftsman",
        href: "https://kxnl.in",
        icon: <KIcon />,
      },
    ],
  },
]

export function Footer() {
  return (
    <footer
      className={cn(
        "relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center rounded-t-4xl border-t border-zinc-200 px-6 md:rounded-t-6xl md:px-8"
      )}
    >
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-400/20 blur" />

      <div className="grid w-full gap-8 py-6 md:py-8 lg:grid-cols-3 lg:gap-8">
        <AnimatedContainer className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <Shield className="size-4 text-white" />
            </div>
            <span className="font-medium text-zinc-900">ZK Vote</span>
          </div>
          <p className="text-zinc-500 text-sm">
            Private, verifiable voting powered by zero-knowledge proofs.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 lg:col-span-2 lg:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer delay={0.1 + index * 0.1} key={section.label}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs text-zinc-900">{section.label}</h3>
                <ul className="mt-4 space-y-2 text-zinc-500 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        className="inline-flex items-center duration-250 hover:text-zinc-900 [&_svg]:me-1 [&_svg]:size-4"
                        href={link.href}
                        {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {link.icon}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
      <div className="h-px w-full bg-linear-to-r via-zinc-200" />
      <div className="flex w-full items-center justify-center py-4">
        <p className="text-zinc-400 text-sm">
          &copy; {new Date().getFullYear()} ZK Vote. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: {
  delay?: number
  className?: string
  children: ReactNode
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return children
  }

  return (
    <motion.div
      className={className}
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
    >
      {children}
    </motion.div>
  )
}
