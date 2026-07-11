import {
  LayoutDashboard,
  Globe,
  Store,
  CalendarRange,
  Megaphone,
  Wallet,
  Package,
  Boxes,
} from "lucide-react"

export interface TabDef {
  key: string
  label: string
  icon: React.ReactNode
}

export const TABS: TabDef[] = [
  { key: "overview", label: "总览", icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: "platform", label: "平台分析", icon: <Globe className="w-4 h-4" /> },
  { key: "store", label: "店铺分析", icon: <Store className="w-4 h-4" /> },
  { key: "time", label: "时间趋势", icon: <CalendarRange className="w-4 h-4" /> },
  { key: "ad", label: "广告分析", icon: <Megaphone className="w-4 h-4" /> },
  { key: "finance", label: "财务大盘", icon: <Wallet className="w-4 h-4" /> },
  { key: "procurement", label: "采购分析", icon: <Package className="w-4 h-4" /> },
  { key: "inventory", label: "库存分析", icon: <Boxes className="w-4 h-4" /> },
]

interface TabBarProps {
  active: string
  onChange: (key: string) => void
}

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-6 border-b border-border pb-3">
      {TABS.map((tab) => {
        const isActive = active === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
              isActive
                ? "bg-primary/15 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
