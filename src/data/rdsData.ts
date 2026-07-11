// 业务数据基础建设 — 数据层

// ─── Section 1: 数据架构分层 ───

export interface ArchLayer {
  layer: string
  label: string
  tableCount: number
  dataVolume: string
  description: string
  color: string
}

export interface DataSource {
  source: string
  type: string
  tables: number
  dailyRows: string
  color: string
}

export interface LayerGrowth {
  month: string
  ods: number
  dwd: number
  dws: number
  ads: number
}

// ─── Section 2: ETL 管道 ───

export interface EtlJobMetric {
  category: string
  count: number
  successRate: number
  avgDuration: number
}

export interface EtlDailyRun {
  date: string
  totalRuns: number
  successRuns: number
  failedRuns: number
  avgDuration: number
}

// ─── Section 3: 多平台数据集成 ───

export interface PlatformIntegration {
  platform: string
  stores: number
  totalOrders: string
  totalGMV: string
  dataPoints: string
  color: string
}

export interface IntegrationTimeline {
  date: string
  platform: string
  milestone: string
  storesConnected: number
}

export interface StoreDataCoverage {
  platform: string
  totalStores: number
  connectedStores: number
  coverageRate: number
}

// ─── 业务数据处理趋势（月度） ───

export interface MonthlyBusinessFlow {
  month: string
  erpVolume: number
  rpaVolume: number
  offlineVolume: number
  total: number
}

// ═══════════════════════════════════════
// 数据常量
// ═══════════════════════════════════════

import { NEON_PALETTE } from "@/lib/chartTheme"

// ─── KPI 汇总 ───
export const rdsKpiSummary = {
  totalDataVolume: "12.8",
  tableCount: 286,
  etlJobCount: 45,
  availabilityRate: 99.7,
}

// ─── 1. 数据架构 4 层 ───
export const archLayers: ArchLayer[] = [
  {
    layer: "ODS",
    label: "原始数据层",
    tableCount: 92,
    dataVolume: "5.2 TB",
    description: "多源原始数据 1:1 采集入库，保留完整业务字段",
    color: NEON_PALETTE[0],
  },
  {
    layer: "DWD",
    label: "明细层",
    tableCount: 78,
    dataVolume: "3.8 TB",
    description: "数据清洗、标准化、去重，统一时区/币种/编码",
    color: NEON_PALETTE[1],
  },
  {
    layer: "DWS",
    label: "汇总层",
    tableCount: 68,
    dataVolume: "2.4 TB",
    description: "按业务主题聚合：销售/广告/财务/库存/物流",
    color: NEON_PALETTE[3],
  },
  {
    layer: "ADS",
    label: "应用层",
    tableCount: 48,
    dataVolume: "1.4 TB",
    description: "面向 BI 看板和业务报表，直接支撑管理决策",
    color: NEON_PALETTE[4],
  },
]

// ─── 2. 数据源接入 ───
export const dataSources: DataSource[] = [
  { source: "马帮ERP API", type: "ERP系统", tables: 58, dailyRows: "120 万", color: NEON_PALETTE[0] },
  { source: "影刀RPA", type: "自动化采集", tables: 42, dailyRows: "85 万", color: NEON_PALETTE[1] },
  { source: "线下表格", type: "人工录入", tables: 24, dailyRows: "15 万", color: NEON_PALETTE[3] },
]

// ─── 3. 各层数据增长趋势（月度 GB） ───
export const layerGrowth: LayerGrowth[] = [
  { month: "2022-06", ods: 120, dwd: 80, dws: 40, ads: 15 },
  { month: "2022-09", ods: 380, dwd: 260, dws: 140, ads: 55 },
  { month: "2022-12", ods: 720, dwd: 480, dws: 280, ads: 110 },
  { month: "2023-03", ods: 1100, dwd: 760, dws: 460, ads: 190 },
  { month: "2023-06", ods: 1580, dwd: 1050, dws: 640, ads: 280 },
  { month: "2023-09", ods: 2100, dwd: 1420, dws: 880, ads: 380 },
  { month: "2023-12", ods: 2800, dwd: 1900, dws: 1180, ads: 520 },
  { month: "2024-03", ods: 3600, dwd: 2450, dws: 1520, ads: 680 },
  { month: "2024-06", ods: 4500, dwd: 3100, dws: 1920, ads: 860 },
]

// ─── 4. ETL 作业分类 ───
export const etlJobMetrics: EtlJobMetric[] = [
  { category: "数据采集", count: 12, successRate: 99.5, avgDuration: 18 },
  { category: "数据清洗", count: 10, successRate: 98.8, avgDuration: 25 },
  { category: "数据转换", count: 8, successRate: 99.2, avgDuration: 32 },
  { category: "数据同步", count: 9, successRate: 99.6, avgDuration: 12 },
  { category: "定时调度", count: 6, successRate: 99.8, avgDuration: 8 },
]

// ─── 5. ETL 每日运行趋势（近30天模拟） ───
export const etlDailyRun: EtlDailyRun[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(2024, 5, i + 1)
  const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  const total = 120 + Math.round(Math.sin(i * 0.5) * 15 + i * 0.8)
  const failed = Math.round(Math.random() * 3)
  const success = total - failed
  const duration = 28 + Math.round(Math.sin(i * 0.3) * 5)
  return { date: dateStr, totalRuns: total, successRuns: success, failedRuns: failed, avgDuration: duration }
})

// ─── 6. 业务数据处理量趋势（月度 GB） ───
export const monthlyBusinessFlow: MonthlyBusinessFlow[] = [
  { month: "2026-01", erpVolume: 320, rpaVolume: 180, offlineVolume: 45, total: 545 },
  { month: "2026-02", erpVolume: 350, rpaVolume: 210, offlineVolume: 52, total: 612 },
  { month: "2026-03", erpVolume: 400, rpaVolume: 250, offlineVolume: 60, total: 710 },
  { month: "2026-04", erpVolume: 460, rpaVolume: 310, offlineVolume: 68, total: 838 },
  { month: "2026-05", erpVolume: 520, rpaVolume: 380, offlineVolume: 75, total: 975 },
  { month: "2026-06", erpVolume: 580, rpaVolume: 440, offlineVolume: 82, total: 1102 },
  { month: "2026-07", erpVolume: 640, rpaVolume: 510, offlineVolume: 90, total: 1240 },
  { month: "2026-08", erpVolume: 710, rpaVolume: 590, offlineVolume: 98, total: 1398 },
  { month: "2026-09", erpVolume: 780, rpaVolume: 660, offlineVolume: 108, total: 1548 },
  { month: "2026-10", erpVolume: 850, rpaVolume: 740, offlineVolume: 118, total: 1708 },
  { month: "2026-11", erpVolume: 930, rpaVolume: 820, offlineVolume: 130, total: 1880 },
  { month: "2026-12", erpVolume: 1020, rpaVolume: 910, offlineVolume: 142, total: 2072 },
  { month: "2027-01", erpVolume: 1100, rpaVolume: 1000, offlineVolume: 155, total: 2255 },
  { month: "2027-02", erpVolume: 1180, rpaVolume: 1080, offlineVolume: 168, total: 2428 },
  { month: "2027-03", erpVolume: 1270, rpaVolume: 1170, offlineVolume: 182, total: 2622 },
  { month: "2027-04", erpVolume: 1360, rpaVolume: 1260, offlineVolume: 196, total: 2816 },
  { month: "2027-05", erpVolume: 1460, rpaVolume: 1360, offlineVolume: 212, total: 3032 },
  { month: "2027-06", erpVolume: 1560, rpaVolume: 1460, offlineVolume: 228, total: 3248 },
]

// ─── 7. 各渠道集成概况 ───
export const platformIntegration: PlatformIntegration[] = [
  { platform: "马帮ERP", stores: 48, totalOrders: "668 万", totalGMV: "2.99 亿", dataPoints: "1.03 亿", color: NEON_PALETTE[0] },
  { platform: "影刀RPA", stores: 30, totalOrders: "420 万", totalGMV: "1.85 亿", dataPoints: "6800 万", color: NEON_PALETTE[1] },
  { platform: "线下表格", stores: 0, totalOrders: "—", totalGMV: "—", dataPoints: "1200 万", color: NEON_PALETTE[3] },
]

// ─── 8. 平台接入时间线（2026-04 起） ───
export const integrationTimeline: IntegrationTimeline[] = [
  { date: "2026-04", platform: "马帮ERP", milestone: "核心 ERP 系统接入，订单/库存/财务全链路数据打通", storesConnected: 48 },
  { date: "2026-05", platform: "影刀RPA", milestone: "首批 Shopee 店铺自动化采集上线，替代人工导出", storesConnected: 12 },
  { date: "2026-06", platform: "影刀RPA", milestone: "TikTok Shop & 美客多数据采集自动化，多币种自动换算", storesConnected: 30 },
  { date: "2026-07", platform: "线下表格", milestone: "广告投放与供应商数据标准化录入，三大数据渠道全覆盖", storesConnected: 30 },
]

// ─── 9. 数据渠道覆盖率 ───
export const storeDataCoverage: StoreDataCoverage[] = [
  { platform: "马帮ERP", totalStores: 48, connectedStores: 48, coverageRate: 100 },
  { platform: "影刀RPA", totalStores: 30, connectedStores: 30, coverageRate: 100 },
  { platform: "线下表格", totalStores: 15, connectedStores: 15, coverageRate: 100 },
]
