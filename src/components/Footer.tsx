import { Mail, Github, Linkedin, Globe } from "lucide-react"

const socialLinks = [
  { icon: Mail, label: "Email", href: "mailto:contact@example.com" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Globe, label: "Website", href: "#" },
]

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="text-sm text-muted-foreground">
          这份交互式简历由 React + TypeScript 构建，部署于 Vercel
        </p>
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border surface-elevated flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
              title={label}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/60">
          &copy; {new Date().getFullYear()} 陈先生. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
