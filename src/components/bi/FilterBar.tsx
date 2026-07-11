import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"
import { useFilters, ALL_PLATFORMS } from "./FilterContext"
import { storeRanking } from "@/data/biData"
import { PLATFORM_COLORS } from "@/lib/chartTheme"

const MONTHS = [
  { value: "2026-01", label: "2026年1月" },
  { value: "2026-02", label: "2026年2月" },
  { value: "2026-03", label: "2026年3月" },
  { value: "2026-04", label: "2026年4月" },
  { value: "2026-05", label: "2026年5月" },
  { value: "2026-06", label: "2026年6月" },
  { value: "2026-07", label: "2026年7月" },
]

export function FilterBar() {
  const { filters, setStartMonth, setEndMonth, togglePlatform, setSelectedStore } = useFilters()
  const [platOpen, setPlatOpen] = useState(false)
  const platRef = useRef<HTMLDivElement>(null)

  // 点击外部关闭下拉
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (platRef.current && !platRef.current.contains(e.target as Node)) {
        setPlatOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const platLabel =
    filters.platforms.length === ALL_PLATFORMS.length
      ? "全部平台"
      : filters.platforms.length === 1
        ? filters.platforms[0]
        : `${filters.platforms[0]} +${filters.platforms.length - 1}`

  return (
    <div className="flex flex-wrap items-center gap-3 mb-5">
      {/* 日期范围 */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">日期</span>
        <select
          value={filters.startMonth}
          onChange={(e) => setStartMonth(e.target.value)}
          className="bg-background border border-border rounded-lg px-3 py-1.5 text-foreground text-xs focus:outline-none focus:border-primary/50 transition-colors"
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <span className="text-muted-foreground">至</span>
        <select
          value={filters.endMonth}
          onChange={(e) => setEndMonth(e.target.value)}
          className="bg-background border border-border rounded-lg px-3 py-1.5 text-foreground text-xs focus:outline-none focus:border-primary/50 transition-colors"
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* 平台多选 */}
      <div ref={platRef} className="relative">
        <button
          onClick={() => setPlatOpen(!platOpen)}
          className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-1.5 text-foreground text-xs hover:border-primary/40 transition-colors"
        >
          <span>{platLabel}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${platOpen ? "rotate-180" : ""}`} />
        </button>
        {platOpen && (
          <div className="absolute top-full left-0 mt-1 w-44 rounded-lg border border-border surface-elevated shadow-lg z-50 py-1 animate-fade-in">
            {ALL_PLATFORMS.map((p) => {
              const checked = filters.platforms.includes(p)
              return (
                <button
                  key={p}
                  onClick={() => togglePlatform(p)}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-muted/50 transition-colors text-left"
                >
                  <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${checked ? "bg-primary border-primary" : "border-border"}`}>
                    {checked && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: PLATFORM_COLORS[p] }}
                  />
                  <span className="text-foreground">{p}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* 店铺筛选 */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">店铺</span>
        <select
          value={filters.selectedStore ?? ""}
          onChange={(e) => setSelectedStore(e.target.value || null)}
          className="bg-background border border-border rounded-lg px-3 py-1.5 text-foreground text-xs focus:outline-none focus:border-primary/50 transition-colors max-w-[180px]"
        >
          <option value="">全部店铺</option>
          {storeRanking.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
