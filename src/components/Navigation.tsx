import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "首页", href: "#" },
  { label: "成就", href: "#achievements" },
  { label: "对话", href: "#chat" },
  { label: "联系我", href: "#contact" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 shadow-apple-sm"
          : "py-5"
      }`}
      style={{
        background: scrolled
          ? "hsl(var(--background) / 0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
      }}
    >
      {/* Apple极简分隔线 - 滚动时显示 */}
      {scrolled && <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />}

      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        {/* Logo - 极简纯文字 */}
        <button
          onClick={() => handleNav("#")}
          className="text-lg font-semibold text-primary tracking-tight hover:opacity-80 transition-opacity"
        >
          陈先生
        </button>

        {/* Desktop links - Apple风格链接 */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm text-secondary hover:text-primary transition-colors link-underline"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle - 简洁图标 */}
        <button
          className="md:hidden p-2 -mr-2 text-secondary hover:text-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu - 简洁下拉 */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border animate-apple-in">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="block w-full text-left text-sm text-secondary hover:text-primary transition-colors py-3"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
