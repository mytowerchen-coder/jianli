import { createContext, useContext, useState, useMemo, type ReactNode } from "react"
import {
  platformData as rawPlatformData,
  storeRanking as rawStoreRanking,
  monthlyTrend as rawMonthlyTrend,
  adMetrics as rawAdMetrics,
  dailyTrend as rawDailyTrend,
  dailyTrendByPlatform as rawDailyTrendByPlatform,
  storeMonthlyData as rawStoreMonthlyData,
  adCampaignData as rawAdCampaignData,
  adWeeklySpend as rawAdWeeklySpend,
  financialMonthly as rawFinancialMonthly,
  adScatterData as rawAdScatterData,
  supplierData as rawSupplierData,
  purchaseOrderMonthly as rawPurchaseOrderMonthly,
  procurementCostBreakdown as rawProcurementCostBreakdown,
  deliveryPerformance as rawDeliveryPerformance,
  productPriceTrend as rawProductPriceTrend,
  supplierRiskRadar as rawSupplierRiskRadar,
  inventoryByWarehouse as rawInventoryByWarehouse,
  inventoryTurnoverMonthly as rawInventoryTurnoverMonthly,
  inventoryAging as rawInventoryAging,
  stockVsSales as rawStockVsSales,
  safetyStockData as rawSafetyStockData,
  inventoryHoldingCost as rawInventoryHoldingCost,
  reorderAlerts as rawReorderAlerts,
} from "@/data/biData"

export interface FilterState {
  startMonth: string
  endMonth: string
  platforms: string[]
  selectedStore: string | null
}

interface FilterContextValue {
  filters: FilterState
  setStartMonth: (v: string) => void
  setEndMonth: (v: string) => void
  togglePlatform: (p: string) => void
  setSelectedStore: (v: string | null) => void
}

const ALL_PLATFORMS = ["Shopee", "美客多", "TEMU", "TikTok Shop"]

const defaultFilters: FilterState = {
  startMonth: "2026-05",
  endMonth: "2026-07",
  platforms: [...ALL_PLATFORMS],
  selectedStore: null,
}

const FilterCtx = createContext<FilterContextValue | null>(null)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)

  const value = useMemo<FilterContextValue>(() => ({
    filters,
    setStartMonth: (v) => setFilters((f) => ({ ...f, startMonth: v })),
    setEndMonth: (v) => setFilters((f) => ({ ...f, endMonth: v })),
    togglePlatform: (p) =>
      setFilters((f) => {
        const has = f.platforms.includes(p)
        const next = has ? f.platforms.filter((x) => x !== p) : [...f.platforms, p]
        if (next.length === 0) return f // 至少保留一个平台
        return { ...f, platforms: next }
      }),
    setSelectedStore: (v) => setFilters((f) => ({ ...f, selectedStore: v })),
  }), [filters])

  return <FilterCtx.Provider value={value}>{children}</FilterCtx.Provider>
}

export function useFilters() {
  const ctx = useContext(FilterCtx)
  if (!ctx) throw new Error("useFilters must be inside FilterProvider")
  return ctx
}

// 月份是否在筛选范围内
function inMonthRange(month: string, start: string, end: string) {
  return month >= start && month <= end
}

// 从 daily date 推断月份
function dateToMonth(date: string) {
  return date.slice(0, 7)
}

// 派生筛选后数据
export function useFilteredData() {
  const { filters } = useFilters()
  const { startMonth, endMonth, platforms, selectedStore } = filters

  return useMemo(() => {
    const pFiltered = rawPlatformData.filter((d) => platforms.includes(d.name))
    const storeFiltered = rawStoreRanking.filter((d) => platforms.includes(d.platform))
    const monthlyFiltered = rawMonthlyTrend.filter((d) => inMonthRange(d.month, startMonth, endMonth))
    const adFiltered = rawAdMetrics.filter((d) => platforms.includes(d.platform))

    const dailyFiltered = rawDailyTrend.filter((d) => inMonthRange(dateToMonth(d.date), startMonth, endMonth))
    const dailyPlatFiltered = rawDailyTrendByPlatform.filter(
      (d) => platforms.includes(d.platform) && inMonthRange(dateToMonth(d.date), startMonth, endMonth)
    )

    let storeMonthlyFiltered = rawStoreMonthlyData.filter(
      (d) => platforms.includes(d.platform) && inMonthRange(d.month, startMonth, endMonth)
    )
    if (selectedStore) {
      storeMonthlyFiltered = storeMonthlyFiltered.filter((d) => d.storeName === selectedStore)
    }

    const adCampaignFiltered = rawAdCampaignData.filter((d) => platforms.includes(d.platform))
    const adWeeklyFiltered = rawAdWeeklySpend.filter((d) => platforms.includes(d.platform))
    const financialFiltered = rawFinancialMonthly.filter(
      (d) => platforms.includes(d.platform) && inMonthRange(d.month, startMonth, endMonth)
    )
    const adScatterFiltered = rawAdScatterData.filter((d) => platforms.includes(d.platform))

    // 采购数据筛选
    const supplierFiltered = rawSupplierData.filter((d) => platforms.includes(d.platform))
    const purchaseOrderFiltered = rawPurchaseOrderMonthly.filter(
      (d) => platforms.includes(d.platform) && inMonthRange(d.month, startMonth, endMonth)
    )
    const procurementCostFiltered = rawProcurementCostBreakdown.filter(
      (d) => platforms.includes(d.platform) && inMonthRange(d.month, startMonth, endMonth)
    )
    const deliveryFiltered = rawDeliveryPerformance.filter(
      (d) => platforms.includes(d.platform) && inMonthRange(d.month, startMonth, endMonth)
    )
    const productPriceFiltered = rawProductPriceTrend.filter(
      (d) => inMonthRange(d.month, startMonth, endMonth)
    )
    const supplierRadarFiltered = rawSupplierRiskRadar.map((row) => {
      const filtered: Record<string, number | string> = { dimension: row.dimension }
      supplierFiltered.forEach((s) => { if (s.name in row) filtered[s.name] = row[s.name] })
      return filtered
    }).filter((row) => Object.keys(row).length > 1)

    // 库存数据筛选
    const inventoryWhFiltered = rawInventoryByWarehouse.filter((d) => platforms.includes(d.platform))
    const inventoryTurnoverFiltered = rawInventoryTurnoverMonthly.filter(
      (d) => platforms.includes(d.platform) && inMonthRange(d.month, startMonth, endMonth)
    )
    const inventoryAgingFiltered = rawInventoryAging.filter((d) => platforms.includes(d.platform))
    const stockVsSalesFiltered = rawStockVsSales.filter((d) => platforms.includes(d.platform))
    const safetyStockFiltered = rawSafetyStockData.filter((d) => platforms.includes(d.platform))
    const holdingCostFiltered = rawInventoryHoldingCost.filter(
      (d) => platforms.includes(d.platform) && inMonthRange(d.month, startMonth, endMonth)
    )
    const reorderAlertFiltered = rawReorderAlerts.filter((d) => platforms.includes(d.platform))

    // KPI 汇总
    const totalSales = pFiltered.reduce((s, d) => s + d.sales, 0)
    const totalProfit = pFiltered.reduce((s, d) => s + d.profit, 0)
    const totalAdSpend = adFiltered.reduce((s, d) => s + d.spend, 0)
    const totalAdRevenue = adCampaignFiltered.reduce((s, d) => s + d.revenue, 0)
    const profitRate = totalSales > 0 ? Math.round((totalProfit / totalSales) * 1000) / 10 : 0
    const roas = totalAdSpend > 0 ? Math.round((totalAdRevenue / totalAdSpend) * 10) / 10 : 0

    // 采购 KPI
    const procurementTotalAmount = purchaseOrderFiltered.reduce((s, d) => s + d.amount, 0)
    const procurementAvgLeadTime = supplierFiltered.length > 0
      ? Math.round(supplierFiltered.reduce((s, d) => s + d.avgLeadTime, 0) / supplierFiltered.length)
      : 0
    const procurementAvgOnTime = supplierFiltered.length > 0
      ? Math.round(supplierFiltered.reduce((s, d) => s + d.onTimeRate, 0) / supplierFiltered.length * 10) / 10
      : 0

    // 库存 KPI
    const inventoryTotalValue = inventoryWhFiltered.reduce((s, d) => s + d.totalValue, 0)
    const inventoryAvgTurnover = inventoryTurnoverFiltered.length > 0
      ? Math.round(inventoryTurnoverFiltered.reduce((s, d) => s + d.turnoverRate, 0) / inventoryTurnoverFiltered.length * 10) / 10
      : 0
    const inventoryAvgDays = inventoryTurnoverFiltered.length > 0
      ? Math.round(inventoryTurnoverFiltered.reduce((s, d) => s + d.daysOfStock, 0) / inventoryTurnoverFiltered.length)
      : 0
    const stockoutCount = safetyStockFiltered.filter((s) => s.status === "critical").length
    const stockoutRate = safetyStockFiltered.length > 0
      ? Math.round((stockoutCount / safetyStockFiltered.length) * 1000) / 10
      : 0

    return {
      platformData: pFiltered,
      storeRanking: storeFiltered,
      monthlyTrend: monthlyFiltered,
      adMetrics: adFiltered,
      dailyTrend: dailyFiltered,
      dailyTrendByPlatform: dailyPlatFiltered,
      storeMonthlyData: storeMonthlyFiltered,
      adCampaignData: adCampaignFiltered,
      adWeeklySpend: adWeeklyFiltered,
      financialMonthly: financialFiltered,
      adScatterData: adScatterFiltered,
      kpiSummary: { totalSales, totalProfit, totalAdSpend, profitRate, roas },
      // 采购
      supplierData: supplierFiltered,
      purchaseOrderMonthly: purchaseOrderFiltered,
      procurementCostBreakdown: procurementCostFiltered,
      deliveryPerformance: deliveryFiltered,
      productPriceTrend: productPriceFiltered,
      supplierRiskRadar: supplierRadarFiltered,
      procurementKpi: {
        totalAmount: Math.round(procurementTotalAmount * 10) / 10,
        supplierCount: supplierFiltered.length,
        avgLeadTime: procurementAvgLeadTime,
        avgOnTimeRate: procurementAvgOnTime,
      },
      // 库存
      inventoryByWarehouse: inventoryWhFiltered,
      inventoryTurnoverMonthly: inventoryTurnoverFiltered,
      inventoryAging: inventoryAgingFiltered,
      stockVsSales: stockVsSalesFiltered,
      safetyStockData: safetyStockFiltered,
      inventoryHoldingCost: holdingCostFiltered,
      reorderAlerts: reorderAlertFiltered,
      inventoryKpi: {
        totalValue: Math.round(inventoryTotalValue * 10) / 10,
        avgTurnover: inventoryAvgTurnover,
        avgDaysOfStock: inventoryAvgDays,
        stockoutRate,
      },
    }
  }, [startMonth, endMonth, platforms, selectedStore])
}

export { ALL_PLATFORMS }
