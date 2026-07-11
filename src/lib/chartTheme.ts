// Recharts 统一暗色主题样式常量

export const tooltipStyle: React.CSSProperties = {
  background: "hsl(230 18% 12%)",
  border: "1px solid hsl(230 16% 20%)",
  borderRadius: "8px",
  color: "hsl(210 20% 92%)",
  fontSize: "12px",
  padding: "8px 12px",
}

export const tooltipLabelStyle = {
  color: "hsl(210 20% 92%)",
  fontWeight: 600,
}

export const tooltipItemStyle = {
  color: "hsl(210 20% 92%)",
}

export const axisTickStyle = {
  fill: "hsl(215 12% 55%)",
  fontSize: 11,
}

export const gridProps = {
  strokeDasharray: "3 3",
  stroke: "hsl(230 16% 20%)",
}

export const legendStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "hsl(215 12% 55%)",
}

export const PLATFORM_COLORS: Record<string, string> = {
  Shopee: "#FF6B35",
  "美客多": "#FFE600",
  TEMU: "#FB7701",
  "TikTok Shop": "#25F4EE",
}

export const NEON_PALETTE = [
  "hsl(190 90% 55%)",  // cyan
  "hsl(217 91% 60%)",  // blue
  "hsl(265 80% 65%)",  // purple
  "hsl(142 71% 45%)",  // green
  "hsl(38 92% 50%)",   // amber
  "hsl(0 72% 51%)",    // red
  "hsl(330 81% 60%)",  // pink
  "hsl(172 66% 50%)",  // teal
]

export const chartMargin = { top: 5, right: 20, bottom: 5, left: 0 }
