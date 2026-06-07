import { Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/common/SocialIcons";
import { profile } from "@/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-card/50 backdrop-blur-sm">
      <div className="container-max section-padding !py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-xs">DK</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{profile.name}</p>
              <p className="text-xs text-muted-foreground">{profile.role}</p>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com/in/kashyap-dheeraj"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10 transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="https://github.com/dheekash"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-lg text-muted-foreground hover:text-amber-400 hover:bg-amber-500/10 transition-all"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            © {currentYear} {profile.name}. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
