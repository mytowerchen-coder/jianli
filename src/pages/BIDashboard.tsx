import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, BarChart3 } from "lucide-react"
import { FilterProvider } from "@/components/bi/FilterContext"
import { FilterBar } from "@/components/bi/FilterBar"
import { TabBar } from "@/components/bi/TabBar"
import { OverviewTab } from "@/components/bi/tabs/OverviewTab"
import { PlatformTab } from "@/components/bi/tabs/PlatformTab"
import { StoreTab } from "@/components/bi/tabs/StoreTab"
import { TimeTrendTab } from "@/components/bi/tabs/TimeTrendTab"
import { AdAnalysisTab } from "@/components/bi/tabs/AdAnalysisTab"
import { FinanceTab } from "@/components/bi/tabs/FinanceTab"
import { ProcurementTab } from "@/components/bi/tabs/ProcurementTab"
import { InventoryTab } from "@/components/bi/tabs/InventoryTab"

export default function BIDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")

  const renderTab = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab />
      case "platform": return <PlatformTab />
      case "store": return <StoreTab />
      case "time": return <TimeTrendTab />
      case "ad": return <AdAnalysisTab />
      case "finance": return <FinanceTab />
      case "procurement": return <ProcurementTab />
      case "inventory": return <InventoryTab />
      default: return <OverviewTab />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* 顶部导航 */}
      <div className="max-w-7xl mx-auto mb-5 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border surface-elevated hover:border-primary/40 transition-all text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </button>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">
            跨境电商 BI 数据看板
          </h1>
        </div>
        <div className="text-xs text-muted-foreground">
          数据周期：2025年3月 - 5月
        </div>
      </div>

      {/* 筛选 + 标签 + 内容 */}
      <div className="max-w-7xl mx-auto">
        <FilterProvider>
          <FilterBar />
          <TabBar active={activeTab} onChange={setActiveTab} />
          <div className="animate-fade-in" key={activeTab}>
            {renderTab()}
          </div>
        </FilterProvider>
      </div>
    </div>
  )
}
