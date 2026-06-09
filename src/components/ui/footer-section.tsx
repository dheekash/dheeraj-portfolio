"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Mail, Send } from "lucide-react"
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons"

const socialLinks = [
  {
    href: "https://linkedin.com/in/kashyap-dheeraj",
    icon: <LinkedinIcon size={16} />,
    label: "LinkedIn",
    tip: "Connect on LinkedIn",
    external: true,
  },
  {
    href: "https://github.com/dheekash",
    icon: <GithubIcon size={16} />,
    label: "GitHub",
    tip: "View GitHub",
    external: true,
  },
  {
    href: "mailto:kash.dheeraj.yap@gmail.com",
    icon: <Mail className="h-4 w-4" />,
    label: "Email",
    tip: "Send an email",
    external: false,
  },
]

function Footerdemo() {
  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Newsletter */}
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
            <p className="mb-6 text-muted-foreground">
              Get notified about new projects and analytics insights.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 !h-8 !w-8 rounded-full"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              {[
                { label: "Impact",         href: "#impact" },
                { label: "Projects",       href: "#projects" },
                { label: "Experience",     href: "#experience" },
                { label: "Skills",         href: "#skills" },
                { label: "Certifications", href: "#certifications" },
                { label: "Contact",        href: "#contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <address className="space-y-2 text-sm not-italic text-muted-foreground">
              <p>Bengaluru, India</p>
              <p>
                <a
                  href="mailto:kash.dheeraj.yap@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  kash.dheeraj.yap@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="https://linkedin.com/in/kashyap-dheeraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  linkedin.com/in/kashyap-dheeraj
                </a>
              </p>
              <p>
                <a
                  href="https://github.com/dheekash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  github.com/dheekash
                </a>
              </p>
            </address>
          </div>

          {/* Social */}
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <div className="mb-6 flex space-x-3">
              <TooltipProvider>
                {socialLinks.map(({ href, icon, label, tip, external }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger
                      render={
                        <a
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border bg-background hover:bg-muted transition-colors"
                          aria-label={label}
                        >
                          {icon}
                        </a>
                      }
                    />
                    <TooltipContent><p>{tip}</p></TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Open to full-time roles, contract engagements, and analytics consulting across Europe &amp; India.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dheeraj Kashyap · Built with Next.js &amp; Tailwind CSS
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="/deck" className="transition-colors hover:text-primary">
              Portfolio Deck
            </a>
            <a href="#contact" className="transition-colors hover:text-primary">
              Get in Touch
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
