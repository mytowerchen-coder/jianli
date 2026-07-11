import { useState, useEffect } from "react"
import { resumeData } from "@/data/resume"
import { Terminal, ChevronDown, Laptop, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ─── Floating Career Card on Curve ─── */
function CareerNode({
  year,
  company,
  role,
  scale,
  marketCap,
  teamSize,
  highlight,
  floatClass,
  delayMs,
  left,
  top,
}: {
  year: string
  company: string
  role: string
  scale: string
  marketCap: string
  teamSize: string
  highlight: boolean
  floatClass: string
  delayMs: number
  left: string
  top: string
}) {
  return (
    <div
      className="absolute opacity-0 animate-fade-in-up"
      style={{
        left,
        top,
        animationDelay: `${delayMs}ms`,
        animationFillMode: "forwards",
      }}
    >
      <div className={floatClass}>
        <div
          className={`relative p-3.5 rounded-xl border backdrop-blur-md transition-all duration-300 w-52 ${
            highlight
              ? "border-primary/30 glow-neon bg-primary/[0.06]"
              : "border-border/50 bg-card/40"
          }`}
        >
          {/* Year badge */}
          <div
            className={`absolute -top-3 left-4 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
              highlight
                ? "bg-primary text-primary-foreground"
                : "bg-muted/80 text-muted-foreground border border-border/50"
            }`}
          >
            {year}
          </div>

          {highlight && (
            <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-primary/60" />
          )}

          <div className="flex items-start gap-2.5 mt-1">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                highlight
                  ? "bg-primary/15 text-primary"
                  : "bg-muted/60 text-muted-foreground"
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-0.5">
              <h4
                className={`text-[13px] font-semibold leading-tight ${
                  highlight ? "text-foreground" : "text-foreground/80"
                }`}
              >
                {company}
              </h4>
              <p className="text-[11px] text-primary font-medium">{role}</p>
            </div>
          </div>

          {(scale || marketCap || teamSize) && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {scale && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] bg-muted/50 text-muted-foreground">
                  <Users className="w-2 h-2" />
                  {scale}
                </span>
              )}
              {marketCap && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] bg-muted/50 text-muted-foreground">
                  <TrendingUp className="w-2 h-2" />
                  {marketCap}
                </span>
              )}
              {teamSize && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] bg-muted/50 text-muted-foreground">
                  <Users className="w-2 h-2" />
                  {teamSize}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── SVG Curve Chart ─── */
function CareerCurve() {
  return (
    <svg
      viewBox="0 0 420 380"
      className="absolute inset-0 w-full h-full"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(190, 90%, 55%)" stopOpacity="0.7" />
          <stop offset="50%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(265, 80%, 65%)" stopOpacity="0.7" />
        </linearGradient>
        <filter id="curveGlow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main curve */}
      <path
        d="M 40 120 C 100 40, 170 50, 210 140 S 340 300, 390 220"
        stroke="url(#curveGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#curveGlow)"
        strokeDasharray="600"
        strokeDashoffset="600"
        style={{ animation: "curve-draw 2s ease-out 0.3s forwards" }}
      />
      {/* Glow layer */}
      <path
        d="M 40 120 C 100 40, 170 50, 210 140 S 340 300, 390 220"
        stroke="url(#curveGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.1"
        strokeDasharray="600"
        strokeDashoffset="600"
        style={{ animation: "curve-draw 2s ease-out 0.3s forwards" }}
      />

      {/* Node 1: 2022 */}
      <circle cx="40" cy="120" r="10" fill="none" stroke="hsl(190,90%,55%)" strokeWidth="1.5" opacity="0"
        style={{ animation: "node-pulse 2s ease-in-out 1s infinite" }} />
      <circle cx="40" cy="120" r="5" fill="hsl(190,90%,55%)" stroke="hsl(190,90%,55%)" strokeWidth="2" opacity="0"
        style={{ animation: "node-appear 0.4s ease-out 0.8s forwards" }} />
      <text x="40" y="148" textAnchor="middle" fill="hsl(215,12%,55%)" fontSize="11" fontWeight="700" opacity="0"
        style={{ animation: "node-appear 0.4s ease-out 0.9s forwards" }}>2022</text>

      {/* Node 2: 2024 */}
      <circle cx="210" cy="140" r="10" fill="none" stroke="hsl(217,91%,60%)" strokeWidth="1.5" opacity="0"
        style={{ animation: "node-pulse 2s ease-in-out 1.2s infinite" }} />
      <circle cx="210" cy="140" r="5" fill="hsl(230,20%,14%)" stroke="hsl(217,91%,60%)" strokeWidth="2" opacity="0"
        style={{ animation: "node-appear 0.4s ease-out 1s forwards" }} />
      <text x="210" y="168" textAnchor="middle" fill="hsl(215,12%,55%)" fontSize="11" fontWeight="700" opacity="0"
        style={{ animation: "node-appear 0.4s ease-out 1.1s forwards" }}>2024</text>

      {/* Node 3: 2026 */}
      <circle cx="390" cy="220" r="10" fill="none" stroke="hsl(265,80%,65%)" strokeWidth="1.5" opacity="0"
        style={{ animation: "node-pulse 2s ease-in-out 1.4s infinite" }} />
      <circle cx="390" cy="220" r="5" fill="hsl(230,20%,14%)" stroke="hsl(265,80%,65%)" strokeWidth="2" opacity="0"
        style={{ animation: "node-appear 0.4s ease-out 1.2s forwards" }} />
      <text x="390" y="248" textAnchor="middle" fill="hsl(215,12%,55%)" fontSize="11" fontWeight="700" opacity="0"
        style={{ animation: "node-appear 0.4s ease-out 1.3s forwards" }}>2026</text>
    </svg>
  )
}

/* ─── Floating Particles ─── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30 particle-drift"
          style={{
            left: `${15 + i * 14}%`,
            bottom: `${10 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ─── Hero Section ─── */
export function HeroSection() {
  const [displayedTitle, setDisplayedTitle] = useState("")
  const [showSubtitle, setShowSubtitle] = useState(false)
  const fullTitle = resumeData.title

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, i))
        i++
      } else {
        clearInterval(timer)
        setTimeout(() => setShowSubtitle(true), 300)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [])

  const scrollToChat = () => {
    document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" })
  }

  const floatClasses = ["career-float-1", "career-float-2", "career-float-3"]
  const delayMsList = [300, 500, 700]
  const nodePositions = [
    { left: "0%", top: "0%" },
    { left: "42%", top: "50%" },
    { left: "57%", top: "2%" },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(/images/hero-bg.png)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--neon-cyan)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--neon-cyan)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px"
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full animate-glow-pulse" style={{
        background: `radial-gradient(circle, hsl(var(--neon-cyan) / 0.12), transparent 70%)`,
        filter: "blur(60px)"
      }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full animate-glow-pulse animate-delay-300" style={{
        background: `radial-gradient(circle, hsl(var(--neon-purple) / 0.1), transparent 70%)`,
        filter: "blur(60px)"
      }} />

      <FloatingParticles />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Intro */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border surface-elevated animate-fade-in mx-auto lg:mx-0">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground tracking-wider uppercase">
                Interactive Resume
              </span>
            </div>

            <div className="space-y-2 animate-fade-in-up animate-delay-100">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-gradient-neon">{resumeData.name}</span>
              </h1>
            </div>

            <div className="h-10 flex items-center justify-center lg:justify-start animate-fade-in-up animate-delay-200">
              <span className="text-lg md:text-xl text-foreground/80 font-light">
                {displayedTitle}
                <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-typing-cursor align-middle" />
              </span>
            </div>

            {showSubtitle && (
              <div className="flex items-center justify-center lg:justify-start gap-3 animate-fade-in">
                {resumeData.subtitles.map((sub, i) => (
                  <span
                    key={sub}
                    className="px-3 py-1 rounded-md text-xs border border-border surface-elevated text-muted-foreground animate-fade-in-up"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    {sub}
                  </span>
                ))}
              </div>
            )}

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed animate-fade-in-up animate-delay-400">
              {resumeData.summary}
            </p>

            <div className="animate-fade-in-up animate-delay-500">
              <Button variant="neon" size="lg" onClick={scrollToChat}>
                AI了解我可以为您的企业带来什么？
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right: Floating curve career chart */}
          <div className="relative w-full h-[420px] lg:h-[440px]">
            <CareerCurve />

            {resumeData.career.map((job, i) => (
              <CareerNode
                key={job.company}
                {...job}
                floatClass={floatClasses[i]}
                delayMs={delayMsList[i]}
                left={nodePositions[i].left}
                top={nodePositions[i].top}
              />
            ))}

            <div className="absolute bottom-0 right-0 text-[10px] text-muted-foreground/50 tracking-widest uppercase opacity-0 animate-fade-in animate-delay-800">
              Career Path
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 animate-float">
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  )
}
