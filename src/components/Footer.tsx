import { Mail, Github, Linkedin, Globe } from "lucide-react"

const socialLinks = [
  { icon: Mail, label: "邮箱", href: "mailto:contact@example.com" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Globe, label: "网站", href: "#" },
]

export function Footer() {
  return (
    <footer id="contact" className="py-16 px-6 border-t border-border surface-2">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Apple风格简洁联系标题 */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold tracking-tight">
            联系我
          </h3>
          <p className="text-secondary">
            对我的经历感兴趣？期待与您交流
          </p>
        </div>

        {/* 社交链接 - Apple简洁风格 */}
        <div className="flex items-center justify-center gap-3">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-muted flex items-center justify-center text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
              title={label}
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* 版权信息 */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} 陈先生 · 跨境电商数据运营经理
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Built with React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
