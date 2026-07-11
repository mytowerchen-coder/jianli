// BI 数据看板 - 跨境电商多平台聚合数据
// 数据来源：模拟 Quick BI 多店铺销售财务大盘

export interface PlatformData {
  name: string
  color: string
  sales: number       // 销售额（万元）
  cost: number        // 成本（万元）
  profit: number      // 利润（万元）
  orders: number      // 订单量
  profitRate: number  // 利润率 %
}

export interface StoreData {
  rank: number
  name: string
  platform: string
  sales: number       // 销售额（万元）
  growth: number      // 环比增长 %
}

export interface MonthlyTrend {
  month: string
  sales: number
  cost: number
  profit: number
}

export interface AdMetrics {
  platform: string
  spend: number       // 广告花费（万元）
  acos: number        // ACoS %
  roas: number        // ROAS
  clicks: number      // 点击量
  impressions: number // 曝光量
}

export interface KPIData {
  label: string
  value: string
  unit: string
  change: number      // 环比变化 %
  icon: string
}

export const kpiData: KPIData[] = [
  { label: "总销售额", value: "1,286.5", unit: "万元", change: 12.3, icon: "DollarSign" },
  { label: "总利润", value: "312.8", unit: "万元", change: 8.7, icon: "TrendingUp" },
  { label: "广告 ROAS", value: "4.2", unit: "", change: 15.1, icon: "Target" },
  { label: "综合利润率", value: "24.3", unit: "%", change: -1.2, icon: "Percent" },
]

export const platformData: PlatformData[] = [
  { name: "Shopee", color: "#FF6B35", sales: 482.3, cost: 361.7, profit: 120.6, orders: 28450, profitRate: 25.0 },
  { name: "美客多", color: "#FFE600", sales: 356.8, cost: 278.3, profit: 78.5, orders: 15230, profitRate: 22.0 },
  { name: "TEMU", color: "#FB7701", sales: 268.4, cost: 214.7, profit: 53.7, orders: 42100, profitRate: 20.0 },
  { name: "TikTok Shop", color: "#25F4EE", sales: 179.0, cost: 119.0, profit: 60.0, orders: 11860, profitRate: 33.5 },
]

export const storeRanking: StoreData[] = [
  { rank: 1, name: "SH-MY-旗舰店A", platform: "Shopee", sales: 156.2, growth: 18.5 },
  { rank: 2, name: "MC-巴西-旗舰B", platform: "美客多", sales: 132.8, growth: 12.3 },
  { rank: 3, name: "SH-TH-旗舰店C", platform: "Shopee", sales: 118.5, growth: 22.1 },
  { rank: 4, name: "TEMU-全托管-01", platform: "TEMU", sales: 105.6, growth: 35.6 },
  { rank: 5, name: "TT-东南亚-旗舰D", platform: "TikTok Shop", sales: 98.3, growth: 42.8 },
  { rank: 6, name: "SH-PH-旗舰店E", platform: "Shopee", sales: 87.2, growth: 8.4 },
  { rank: 7, name: "MC-墨西哥-旗舰F", platform: "美客多", sales: 76.5, growth: -3.2 },
  { rank: 8, name: "TEMU-半托管-02", platform: "TEMU", sales: 68.9, growth: 28.7 },
  { rank: 9, name: "SH-SG-旗舰店G", platform: "Shopee", sales: 62.4, growth: 5.1 },
  { rank: 10, name: "TT-美区-旗舰H", platform: "TikTok Shop", sales: 55.8, growth: 56.3 },
]

export const monthlyTrend: MonthlyTrend[] = [
  { month: "2026-05", sales: 385.2, cost: 296.4, profit: 88.8 },
  { month: "2026-06", sales: 428.6, cost: 328.1, profit: 100.5 },
  { month: "2026-07", sales: 472.7, cost: 349.2, profit: 123.5 },
]

export const adMetrics: AdMetrics[] = [
  { platform: "Shopee", spend: 38.5, acos: 18.2, roas: 5.5, clicks: 524000, impressions: 12800000 },
  { platform: "美客多", spend: 28.3, acos: 22.5, roas: 4.4, clicks: 312000, impressions: 8600000 },
  { platform: "TEMU", spend: 15.2, acos: 25.8, roas: 3.9, clicks: 680000, impressions: 21500000 },
  { platform: "TikTok Shop", spend: 22.6, acos: 15.6, roas: 6.4, clicks: 890000, impressions: 35200000 },
]

// 汇总财务大盘
export const financialSummary = {
  totalRevenue: 1286.5,
  totalCost: 973.7,
  totalProfit: 312.8,
  totalOrders: 97640,
  avgOrderValue: 131.8,
  totalAdSpend: 104.6,
  overallROAS: 4.2,
  overallACoS: 23.8,
}

// ========== 新增数据结构 ==========

// 日销售趋势（汇总）
export interface DailyTrend {
  date: string
  sales: number
  cost: number
  profit: number
  orders: number
}

// 各平台日趋势
export interface DailyTrendByPlatform {
  date: string
  platform: string
  sales: number
}

// 店铺月度明细
export interface StoreMonthly {
  storeName: string
  platform: string
  month: string
  sales: number
  cost: number
  profit: number
  orders: number
}

// 品类树图
export interface CategoryTreemap {
  name: string
  size?: number
  children?: CategoryTreemap[]
}

// 平台雷达指标（归一化 0-100）
export interface PlatformRadar {
  metric: string
  Shopee: number
  "美客多": number
  TEMU: number
  "TikTok Shop": number
}

// 广告活动明细
export interface AdCampaign {
  campaign: string
  platform: string
  spend: number
  revenue: number
  acos: number
  roas: number
  clicks: number
  impressions: number
  conversions: number
  ctr: number
}

// 广告周花费趋势
export interface AdWeeklySpend {
  week: string
  platform: string
  spend: number
  revenue: number
}

// 财务月度明细
export interface FinancialMonthly {
  month: string
  platform: string
  revenue: number
  productCost: number
  shippingCost: number
  adSpend: number
  platformFee: number
  profit: number
}

// 转化漏斗
export interface FunnelItem {
  stage: string
  value: number
  fill: string
}

// 广告散点数据
export interface AdScatterPoint {
  name: string
  spend: number
  revenue: number
  platform: string
  roas: number
}

// ========== 新增数据 ==========

// 辅助：生成日期序列
function generateDates(start: string, days: number): string[] {
  const dates: string[] = []
  const d = new Date(start)
  for (let i = 0; i < days; i++) {
    dates.push(d.toISOString().slice(0, 10))
    d.setDate(d.getDate() + 1)
  }
  return dates
}

// 辅助：带波动的伪随机
function pseudoRandom(base: number, variance: number, seed: number): number {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  const r = s - Math.floor(s)
  return Math.round((base + (r - 0.5) * variance) * 10) / 10
}

const dates = generateDates("2026-05-01", 92) // May 1 – Jul 31 = 92 天
const platforms = ["Shopee", "美客多", "TEMU", "TikTok Shop"]
const platformBases = { sales: [16, 12, 9, 6], cost: [12, 9.3, 7.2, 4] }

// 日销售趋势（汇总）
export const dailyTrend: DailyTrend[] = dates.map((date, i) => {
  const weekday = new Date(date).getDay()
  const weekendBoost = (weekday === 0 || weekday === 6) ? 1.15 : 1
  const trendBoost = 1 + i * 0.002 // 逐月微增
  const sales = pseudoRandom(14 * weekendBoost * trendBoost, 4, i)
  const cost = Math.round(sales * 0.75 * 10) / 10
  const profit = Math.round((sales - cost) * 10) / 10
  const orders = Math.round(sales * 75)
  return { date, sales, cost, profit, orders }
})

// 各平台日趋势
export const dailyTrendByPlatform: DailyTrendByPlatform[] = dates.flatMap((date, i) => {
  const weekday = new Date(date).getDay()
  const weekendBoost = (weekday === 0 || weekday === 6) ? 1.12 : 1
  const trendBoost = 1 + i * 0.0018
  return platforms.map((p, pi) => ({
    date,
    platform: p,
    sales: pseudoRandom(platformBases.sales[pi] * weekendBoost * trendBoost, 3, i * 10 + pi),
  }))
})

// 店铺月度明细
export const storeMonthlyData: StoreMonthly[] = (() => {
  const stores = [
    { name: "SH-MY-旗舰店A", platform: "Shopee", base: 48 },
    { name: "MC-巴西-旗舰B", platform: "美客多", base: 41 },
    { name: "SH-TH-旗舰店C", platform: "Shopee", base: 36 },
    { name: "TEMU-全托管-01", platform: "TEMU", base: 29 },
    { name: "TT-东南亚-旗舰D", platform: "TikTok Shop", base: 26 },
    { name: "SH-PH-旗舰店E", platform: "Shopee", base: 28 },
    { name: "MC-墨西哥-旗舰F", platform: "美客多", base: 26 },
    { name: "TEMU-半托管-02", platform: "TEMU", base: 20 },
    { name: "SH-SG-旗舰店G", platform: "Shopee", base: 20 },
    { name: "TT-美区-旗舰H", platform: "TikTok Shop", base: 14 },
  ]
  const months = ["2026-05", "2026-06", "2026-07"]
  const result: StoreMonthly[] = []
  stores.forEach((store, si) => {
    months.forEach((month, mi) => {
      const growth = 1 + mi * 0.06 + (si % 3) * 0.02
      const sales = Math.round(store.base * growth * 10) / 10
      const cost = Math.round(sales * 0.74 * 10) / 10
      const profit = Math.round((sales - cost) * 10) / 10
      const orders = Math.round(sales * 72)
      result.push({ storeName: store.name, platform: store.platform, month, sales, cost, profit, orders })
    })
  })
  return result
})()

// 品类树图数据
export const categoryTreemap: CategoryTreemap[] = [
  {
    name: "Shopee",
    children: [
      { name: "电子配件", size: 135 },
      { name: "家居用品", size: 98 },
      { name: "美妆个护", size: 86 },
      { name: "服饰箱包", size: 72 },
      { name: "户外运动", size: 51 },
      { name: "玩具母婴", size: 40 },
    ],
  },
  {
    name: "美客多",
    children: [
      { name: "电子配件", size: 96 },
      { name: "家居用品", size: 78 },
      { name: "美妆个护", size: 58 },
      { name: "服饰箱包", size: 52 },
      { name: "户外运动", size: 42 },
      { name: "玩具母婴", size: 31 },
    ],
  },
  {
    name: "TEMU",
    children: [
      { name: "电子配件", size: 72 },
      { name: "家居用品", size: 65 },
      { name: "美妆个护", size: 42 },
      { name: "服饰箱包", size: 38 },
      { name: "户外运动", size: 30 },
      { name: "玩具母婴", size: 21 },
    ],
  },
  {
    name: "TikTok Shop",
    children: [
      { name: "美妆个护", size: 56 },
      { name: "服饰箱包", size: 42 },
      { name: "电子配件", size: 32 },
      { name: "家居用品", size: 24 },
      { name: "户外运动", size: 15 },
      { name: "玩具母婴", size: 10 },
    ],
  },
]

// 平台雷达指标（归一化 0-100）
export const platformRadarData: PlatformRadar[] = [
  { metric: "销售额", Shopee: 95, "美客多": 72, TEMU: 55, "TikTok Shop": 38 },
  { metric: "利润率", Shopee: 68, "美客多": 60, TEMU: 52, "TikTok Shop": 92 },
  { metric: "订单量", Shopee: 72, "美客多": 38, TEMU: 98, "TikTok Shop": 30 },
  { metric: "客单价", Shopee: 78, "美客多": 85, TEMU: 35, "TikTok Shop": 72 },
  { metric: "广告ROAS", Shopee: 82, "美客多": 65, TEMU: 58, "TikTok Shop": 95 },
  { metric: "增长率", Shopee: 55, "美客多": 42, TEMU: 78, "TikTok Shop": 90 },
]

// 广告活动明细
export const adCampaignData: AdCampaign[] = [
  { campaign: "SH-品牌推广", platform: "Shopee", spend: 15.2, revenue: 88.5, acos: 17.2, roas: 5.8, clicks: 210000, impressions: 5200000, conversions: 8400, ctr: 4.0 },
  { campaign: "SH-搜索广告", platform: "Shopee", spend: 12.8, revenue: 62.3, acos: 20.5, roas: 4.9, clicks: 180000, impressions: 4100000, conversions: 5600, ctr: 4.4 },
  { campaign: "SH-联盟营销", platform: "Shopee", spend: 10.5, revenue: 58.2, acos: 18.0, roas: 5.5, clicks: 134000, impressions: 3500000, conversions: 5200, ctr: 3.8 },
  { campaign: "MC-品牌推广", platform: "美客多", spend: 11.6, revenue: 52.8, acos: 22.0, roas: 4.6, clicks: 128000, impressions: 3600000, conversions: 3800, ctr: 3.6 },
  { campaign: "MC-搜索广告", platform: "美客多", spend: 9.8, revenue: 42.5, acos: 23.1, roas: 4.3, clicks: 102000, impressions: 2800000, conversions: 3100, ctr: 3.6 },
  { campaign: "MC-展示广告", platform: "美客多", spend: 6.9, revenue: 32.6, acos: 21.2, roas: 4.7, clicks: 82000, impressions: 2200000, conversions: 2400, ctr: 3.7 },
  { campaign: "TM-全托管推广", platform: "TEMU", spend: 8.2, revenue: 30.5, acos: 26.9, roas: 3.7, clicks: 320000, impressions: 10500000, conversions: 6100, ctr: 3.0 },
  { campaign: "TM-新品推广", platform: "TEMU", spend: 4.2, revenue: 16.8, acos: 25.0, roas: 4.0, clicks: 195000, impressions: 6200000, conversions: 3400, ctr: 3.1 },
  { campaign: "TM-品牌曝光", platform: "TEMU", spend: 2.8, revenue: 10.5, acos: 26.7, roas: 3.8, clicks: 165000, impressions: 4800000, conversions: 2100, ctr: 3.4 },
  { campaign: "TT-短视频推广", platform: "TikTok Shop", spend: 10.2, revenue: 68.5, acos: 14.9, roas: 6.7, clicks: 420000, impressions: 18500000, conversions: 6800, ctr: 2.3 },
  { campaign: "TT-直播带货", platform: "TikTok Shop", spend: 7.5, revenue: 45.2, acos: 16.6, roas: 6.0, clicks: 280000, impressions: 10200000, conversions: 4500, ctr: 2.7 },
  { campaign: "TT-达人合作", platform: "TikTok Shop", spend: 4.9, revenue: 32.8, acos: 14.9, roas: 6.7, clicks: 190000, impressions: 6500000, conversions: 3200, ctr: 2.9 },
]

// 广告周花费趋势（13 周 × 4 平台）
export const adWeeklySpend: AdWeeklySpend[] = (() => {
  const result: AdWeeklySpend[] = []
  const bases = { Shopee: 2.8, "美客多": 2.1, TEMU: 1.1, "TikTok Shop": 1.7 }
  for (let w = 0; w < 13; w++) {
    const weekLabel = `W${w + 1}`
    platforms.forEach((p, pi) => {
      const base = bases[p as keyof typeof bases]
      const spend = pseudoRandom(base, 0.8, w * 10 + pi)
      const revenue = pseudoRandom(spend * 4.5, spend * 2, w * 10 + pi + 50)
      result.push({ week: weekLabel, platform: p, spend: Math.max(0.5, spend), revenue: Math.max(2, revenue) })
    })
  }
  return result
})()

// 财务月度明细
export const financialMonthly: FinancialMonthly[] = [
  { month: "2026-05", platform: "Shopee", revenue: 145.2, productCost: 72.6, shippingCost: 21.8, adSpend: 12.5, platformFee: 8.7, profit: 29.6 },
  { month: "2026-05", platform: "美客多", revenue: 108.5, productCost: 56.4, shippingCost: 16.3, adSpend: 8.7, platformFee: 6.5, profit: 20.6 },
  { month: "2026-05", platform: "TEMU", revenue: 78.3, productCost: 43.1, shippingCost: 10.2, adSpend: 4.4, platformFee: 4.7, profit: 15.9 },
  { month: "2026-05", platform: "TikTok Shop", revenue: 53.2, productCost: 23.4, shippingCost: 6.4, adSpend: 6.5, platformFee: 3.2, profit: 13.7 },
  { month: "2026-06", platform: "Shopee", revenue: 158.6, productCost: 79.3, shippingCost: 23.8, adSpend: 13.0, platformFee: 9.5, profit: 33.0 },
  { month: "2026-06", platform: "美客多", revenue: 116.8, productCost: 60.7, shippingCost: 17.5, adSpend: 9.4, platformFee: 7.0, profit: 22.2 },
  { month: "2026-06", platform: "TEMU", revenue: 88.5, productCost: 48.7, shippingCost: 11.5, adSpend: 5.1, platformFee: 5.3, profit: 17.9 },
  { month: "2026-06", platform: "TikTok Shop", revenue: 64.7, productCost: 28.5, shippingCost: 7.8, adSpend: 7.8, platformFee: 3.9, profit: 16.7 },
  { month: "2026-07", platform: "Shopee", revenue: 178.5, productCost: 89.3, shippingCost: 26.8, adSpend: 13.0, platformFee: 10.7, profit: 38.7 },
  { month: "2026-07", platform: "美客多", revenue: 131.5, productCost: 68.4, shippingCost: 19.7, adSpend: 10.2, platformFee: 7.9, profit: 25.3 },
  { month: "2026-07", platform: "TEMU", revenue: 101.6, productCost: 55.9, shippingCost: 13.2, adSpend: 5.7, platformFee: 6.1, profit: 20.7 },
  { month: "2026-07", platform: "TikTok Shop", revenue: 61.1, productCost: 26.8, shippingCost: 7.4, adSpend: 8.3, platformFee: 3.7, profit: 14.9 },
]

// 转化漏斗
export const conversionFunnel: FunnelItem[] = [
  { stage: "曝光", value: 78100000, fill: "hsl(190 90% 55%)" },
  { stage: "点击", value: 2406000, fill: "hsl(190 90% 48%)" },
  { stage: "加购", value: 385000, fill: "hsl(217 91% 60%)" },
  { stage: "下单", value: 115600, fill: "hsl(265 80% 65%)" },
  { stage: "付款", value: 97640, fill: "hsl(142 71% 45%)" },
]

// 广告散点数据（花费 vs 收入）
export const adScatterData: AdScatterPoint[] = adCampaignData.map((c) => ({
  name: c.campaign,
  spend: c.spend,
  revenue: c.revenue,
  platform: c.platform,
  roas: c.roas,
}))

// ========== 采购分析数据 ==========

export interface Supplier {
  name: string
  platform: string
  category: string
  purchaseAmount: number  // 万元
  orderCount: number
  avgLeadTime: number     // 天
  onTimeRate: number      // %
  qualityScore: number    // 0-100
  riskLevel: "low" | "medium" | "high"
}

export interface PurchaseOrderMonthly {
  month: string
  platform: string
  amount: number          // 万元
  orderCount: number
  avgLeadTime: number
  onTimeRate: number
}

export interface ProcurementCostBreakdown {
  month: string
  platform: string
  productCost: number
  shippingCost: number
  tariff: number
  inspectionFee: number
}

export interface DeliveryPerformance {
  month: string
  platform: string
  onTime: number
  delayed: number
  pending: number
}

export interface ProductPriceTrend {
  month: string
  productName: string
  unitPrice: number       // 元/件
  quantity: number
}

export interface SupplierRiskRadar {
  dimension: string
  [supplier: string]: number | string
}

const SUPPLIER_NAMES = [
  "深圳华强电子", "东莞精密五金", "广州白云皮具", "义乌小商品城",
  "杭州丝绸纺织", "汕头澄海玩具", "厦门集美电子", "佛山顺德家电",
  "宁波北仑模具", "苏州昆山光电", "泉州晋江鞋服", "中山古镇灯饰",
]
const SUPPLIER_CATEGORIES = [
  "电子配件", "五金配件", "皮具箱包", "家居用品", "纺织面料", "玩具母婴",
  "电子配件", "家电配件", "模具零件", "光电器件", "服饰箱包", "灯饰照明",
]
const SUPPLIER_PLATFORMS = [
  "Shopee", "Shopee", "Shopee",
  "美客多", "美客多", "美客多",
  "TEMU", "TEMU", "TEMU",
  "TikTok Shop", "TikTok Shop", "TikTok Shop",
]

export const supplierData: Supplier[] = SUPPLIER_NAMES.map((name, i) => {
  const baseAmount = pseudoRandom(80, 50, i * 7 + 1)
  return {
    name,
    platform: SUPPLIER_PLATFORMS[i],
    category: SUPPLIER_CATEGORIES[i],
    purchaseAmount: Math.max(15, baseAmount),
    orderCount: Math.round(pseudoRandom(45, 25, i * 7 + 2)),
    avgLeadTime: Math.round(pseudoRandom(14, 8, i * 7 + 3)),
    onTimeRate: Math.min(99, Math.max(65, pseudoRandom(85, 15, i * 7 + 4))),
    qualityScore: Math.min(98, Math.max(60, Math.round(pseudoRandom(82, 18, i * 7 + 5)))),
    riskLevel: (i % 5 === 0 ? "high" : i % 3 === 0 ? "medium" : "low") as Supplier["riskLevel"],
  }
})

const months = ["2026-05", "2026-06", "2026-07"]

export const purchaseOrderMonthly: PurchaseOrderMonthly[] = months.flatMap((month, mi) =>
  platforms.map((p, pi) => {
    const base = [120, 90, 68, 45][pi]
    const growth = 1 + mi * 0.05
    return {
      month, platform: p,
      amount: Math.round(pseudoRandom(base * growth, 15, mi * 10 + pi + 200) * 10) / 10,
      orderCount: Math.round(pseudoRandom(base * 0.4 * growth, 8, mi * 10 + pi + 201)),
      avgLeadTime: Math.round(pseudoRandom(14, 6, mi * 10 + pi + 202)),
      onTimeRate: Math.min(98, Math.max(70, pseudoRandom(85, 12, mi * 10 + pi + 203))),
    }
  })
)

export const procurementCostBreakdown: ProcurementCostBreakdown[] = months.flatMap((month, mi) =>
  platforms.map((p, pi) => {
    const total = [95, 72, 54, 36][pi] * (1 + mi * 0.05)
    return {
      month, platform: p,
      productCost: Math.round(total * pseudoRandom(0.63, 0.06, mi * 10 + pi + 300) * 10) / 10,
      shippingCost: Math.round(total * pseudoRandom(0.19, 0.04, mi * 10 + pi + 301) * 10) / 10,
      tariff: Math.round(total * pseudoRandom(0.12, 0.03, mi * 10 + pi + 302) * 10) / 10,
      inspectionFee: Math.round(total * pseudoRandom(0.05, 0.02, mi * 10 + pi + 303) * 10) / 10,
    }
  })
)

export const deliveryPerformance: DeliveryPerformance[] = months.flatMap((month, mi) =>
  platforms.map((p, pi) => {
    const base = [55, 42, 32, 20][pi]
    return {
      month, platform: p,
      onTime: Math.round(pseudoRandom(base * 0.8, 8, mi * 10 + pi + 400)),
      delayed: Math.round(Math.max(1, pseudoRandom(base * 0.14, 5, mi * 10 + pi + 401))),
      pending: Math.round(Math.max(0, pseudoRandom(base * 0.06, 3, mi * 10 + pi + 402))),
    }
  })
)

const PRODUCT_NAMES = ["蓝牙耳机", "手机壳", "LED灯带", "瑜伽垫", "不锈钢水杯", "儿童积木"]
const PRODUCT_BASES = [28.5, 6.8, 12.3, 18.6, 15.2, 22.8]

export const productPriceTrend: ProductPriceTrend[] = months.flatMap((month, mi) =>
  PRODUCT_NAMES.map((productName, pi) => ({
    month, productName,
    unitPrice: Math.round(pseudoRandom(PRODUCT_BASES[pi], PRODUCT_BASES[pi] * 0.1, mi * 10 + pi + 500) * 10) / 10,
    quantity: Math.round(pseudoRandom([3200, 8500, 4200, 2100, 2800, 1600][pi], 500, mi * 10 + pi + 501)),
  }))
)

const RADAR_DIMENSIONS = ["交期稳定", "质量合格", "价格竞争", "响应速度", "供货能力", "财务健康"]
const TOP_SUPPLIERS = SUPPLIER_NAMES.slice(0, 6)

export const supplierRiskRadar: SupplierRiskRadar[] = RADAR_DIMENSIONS.map((dim, di) => {
  const row: SupplierRiskRadar = { dimension: dim }
  TOP_SUPPLIERS.forEach((s, si) => {
    row[s] = Math.min(98, Math.max(40, Math.round(pseudoRandom(75, 30, di * 10 + si + 600))))
  })
  return row
})

// ========== 库存分析数据 ==========

export interface InventoryByWarehouse {
  platform: string
  warehouse: string
  skuCount: number
  totalValue: number      // 万元
  units: number
}

export interface InventoryTurnoverMonthly {
  month: string
  platform: string
  turnoverRate: number
  daysOfStock: number
  beginValue: number
  endValue: number
  cogs: number
}

export interface InventoryAging {
  platform: string
  agingBucket: string
  value: number           // 万元
  skuCount: number
  percentage: number
}

export interface StockVsSalesPoint {
  skuName: string
  platform: string
  stockLevel: number
  salesVelocity: number   // 日均销量
  daysOfStock: number
  category: string
}

export interface SafetyStockMonitor {
  skuName: string
  platform: string
  currentStock: number
  safetyStock: number
  reorderPoint: number
  status: "safe" | "warning" | "critical"
}

export interface InventoryHoldingCost {
  month: string
  platform: string
  storageFee: number
  insurance: number
  depreciation: number
  handlingFee: number
}

export interface ReorderAlert {
  skuName: string
  platform: string
  currentStock: number
  reorderPoint: number
  suggestedQty: number
  urgency: "high" | "medium" | "low"
}

const WAREHOUSE_MAP: Record<string, string[]> = {
  Shopee: ["深圳仓", "海外仓-马来", "海外仓-泰国"],
  "美客多": ["义乌仓", "海外仓-巴西", "海外仓-墨西哥"],
  TEMU: ["广州仓", "海外仓-美国"],
  "TikTok Shop": ["深圳仓", "海外仓-美国"],
}

export const inventoryByWarehouse: InventoryByWarehouse[] = platforms.flatMap((p, pi) => {
  const whs = WAREHOUSE_MAP[p]
  return whs.map((warehouse, wi) => {
    const baseValue = [48, 35, 26, 18][pi] / whs.length
    return {
      platform: p, warehouse,
      skuCount: Math.round(pseudoRandom(120 / whs.length, 40, pi * 10 + wi + 700)),
      totalValue: Math.round(pseudoRandom(baseValue, baseValue * 0.3, pi * 10 + wi + 701) * 10) / 10,
      units: Math.round(pseudoRandom(4500 / whs.length, 1500, pi * 10 + wi + 702)),
    }
  })
})

export const inventoryTurnoverMonthly: InventoryTurnoverMonthly[] = months.flatMap((month, mi) =>
  platforms.map((p, pi) => {
    const baseTurn = [3.8, 3.2, 4.5, 2.8][pi]
    const baseDays = [28, 34, 22, 38][pi]
    const beginV = [52, 38, 28, 20][pi]
    return {
      month, platform: p,
      turnoverRate: Math.round(pseudoRandom(baseTurn + mi * 0.15, 0.6, mi * 10 + pi + 800) * 10) / 10,
      daysOfStock: Math.round(pseudoRandom(baseDays - mi * 1.5, 5, mi * 10 + pi + 801)),
      beginValue: Math.round(beginV * 10) / 10,
      endValue: Math.round((beginV * pseudoRandom(1.02, 0.08, mi * 10 + pi + 802)) * 10) / 10,
      cogs: Math.round(pseudoRandom(beginV * baseTurn / 3, 8, mi * 10 + pi + 803) * 10) / 10,
    }
  })
)

const AGING_BUCKETS = ["0-30天", "31-60天", "61-90天", "90天以上"]
const AGING_PCTS = [0.45, 0.28, 0.17, 0.10]

export const inventoryAging: InventoryAging[] = platforms.flatMap((p, pi) => {
  const totalVal = [55, 40, 30, 22][pi]
  return AGING_BUCKETS.map((bucket, bi) => {
    const pct = AGING_PCTS[bi] + pseudoRandom(0, 0.04, pi * 10 + bi + 900)
    return {
      platform: p, agingBucket: bucket,
      value: Math.round(totalVal * pct * 10) / 10,
      skuCount: Math.round(pseudoRandom(120 * pct, 15, pi * 10 + bi + 901)),
      percentage: Math.round(pct * 1000) / 10,
    }
  })
})

const SKU_NAMES = [
  "BT-蓝牙5.3耳机", "PC-透明手机壳", "LED-彩色灯带5m", "YG-防滑瑜伽垫",
  "SS-保温水杯500ml", "BL-拼装积木套装", "WC-无线充电器", "KB-机械键盘",
  "SP-太阳能充电宝", "RC-遥控小车", "MH-迷你加湿器", "LS-LED台灯",
  "HG-硅胶厨具5件套", "TS-运动T恤", "SB-智能手环", "CM-化妆镜LED",
  "PK-旅行收纳包", "FM-迷你风扇", "GK-游戏手柄", "HP-头戴式耳机",
  "DP-平板电脑支架", "CW-车载手机架", "BT2-蓝牙音箱", "SC-硅胶表带",
  "TP-钢化膜3件套",
]
const SKU_PLATFORMS = [
  "Shopee", "Shopee", "Shopee", "Shopee", "Shopee", "Shopee", "Shopee",
  "美客多", "美客多", "美客多", "美客多", "美客多", "美客多",
  "TEMU", "TEMU", "TEMU", "TEMU", "TEMU", "TEMU",
  "TikTok Shop", "TikTok Shop", "TikTok Shop", "TikTok Shop", "TikTok Shop", "TikTok Shop",
]
const SKU_CATEGORIES = [
  "电子配件", "电子配件", "灯饰照明", "户外运动", "家居用品", "玩具母婴",
  "电子配件", "电子配件", "电子配件", "玩具母婴", "家居用品", "灯饰照明",
  "家居用品", "服饰箱包", "电子配件", "美妆个护", "服饰箱包", "家居用品",
  "电子配件", "电子配件", "电子配件", "电子配件", "电子配件", "服饰箱包", "电子配件",
]

export const stockVsSales: StockVsSalesPoint[] = SKU_NAMES.map((skuName, i) => {
  const stock = Math.round(pseudoRandom(800, 700, i * 3 + 1000))
  const velocity = Math.max(2, Math.round(pseudoRandom(35, 30, i * 3 + 1001)))
  return {
    skuName,
    platform: SKU_PLATFORMS[i],
    stockLevel: Math.max(50, stock),
    salesVelocity: velocity,
    daysOfStock: Math.round(Math.max(50, stock) / velocity),
    category: SKU_CATEGORIES[i],
  }
})

export const safetyStockData: SafetyStockMonitor[] = stockVsSales.slice(0, 15).map((s) => {
  const safety = Math.round(s.salesVelocity * 7)
  const reorder = Math.round(s.salesVelocity * 10)
  const status: SafetyStockMonitor["status"] =
    s.stockLevel <= safety ? "critical" : s.stockLevel <= reorder ? "warning" : "safe"
  return {
    skuName: s.skuName,
    platform: s.platform,
    currentStock: s.stockLevel,
    safetyStock: safety,
    reorderPoint: reorder,
    status,
  }
})

export const inventoryHoldingCost: InventoryHoldingCost[] = months.flatMap((month, mi) =>
  platforms.map((p, pi) => {
    const totalCost = [2.8, 2.0, 1.5, 1.1][pi] * (1 + mi * 0.03)
    return {
      month, platform: p,
      storageFee: Math.round(totalCost * pseudoRandom(0.48, 0.06, mi * 10 + pi + 1100) * 100) / 100,
      insurance: Math.round(totalCost * pseudoRandom(0.15, 0.03, mi * 10 + pi + 1101) * 100) / 100,
      depreciation: Math.round(totalCost * pseudoRandom(0.25, 0.05, mi * 10 + pi + 1102) * 100) / 100,
      handlingFee: Math.round(totalCost * pseudoRandom(0.12, 0.03, mi * 10 + pi + 1103) * 100) / 100,
    }
  })
)

export const reorderAlerts: ReorderAlert[] = safetyStockData
  .filter((s) => s.status !== "safe")
  .map((s) => {
    const skuInfo = stockVsSales.find((v) => v.skuName === s.skuName)
    const suggestedQty = skuInfo ? Math.round(skuInfo.salesVelocity * 14) : Math.round(s.reorderPoint * 1.5)
    return {
      skuName: s.skuName,
      platform: s.platform,
      currentStock: s.currentStock,
      reorderPoint: s.reorderPoint,
      suggestedQty,
      urgency: (s.status === "critical" ? "high" : "medium") as ReorderAlert["urgency"],
    }
  })
  .sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 }
    return order[a.urgency] - order[b.urgency]
  })
