import type { ReactNode } from "react"

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  delay?: number
  className?: string
}

export function ChartCard({ title, subtitle, children, delay = 0, className = "" }: ChartCardProps) {
  return (
    <div
      className={`p-5 rounded-xl border border-border surface-elevated animate-fade-in-up ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  )
}
