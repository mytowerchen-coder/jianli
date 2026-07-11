import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts"
import { ChartCard } from "../ChartCard"
import { useFilteredData } from "../FilterContext"
import { financialSummary } from "@/data/biData"
import { tooltipStyle, axisTickStyle, gridProps, NEON_PALETTE } from "@/lib/chartTheme"

function formatNum(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + "万"
  return String(n)
}

export function FinanceTab() {
  const { financialMonthly, platformData } = useFilteredData()

  // 汇总指标
  const totalRevenue = financialMonthly.reduce((s, d) => s + d.revenue, 0)
  const totalCost = financialMonthly.reduce((s, d) => s + d.productCost + d.shippingCost + d.adSpend + d.platformFee, 0)
  const totalProfit = financialMonthly.reduce((s, d) => s + d.profit, 0)
  const totalOrders = financialSummary.totalOrders

  const summaryItems = [
    { label: "总收入", value: `${totalRevenue.toFixed(1)} 万` },
    { label: "总成本", value: `${totalCost.toFixed(1)} 万` },
    { label: "净利润", value: `${totalProfit.toFixed(1)} 万` },
    { label: "总订单", value: `${formatNum(totalOrders)} 单` },
    { label: "客单价", value: `${financialSummary.avgOrderValue} 元` },
    { label: "广告花费", value: `${financialSummary.totalAdSpend} 万` },
    { label: "综合 ROAS", value: String(financialSummary.overallROAS) },
  ]

  // 月度财务结构（堆叠条形 + 折线）
  const months = [...new Set(financialMonthly.map((d) => d.month))].sort()
  const composedData = months.map((m) => {
    const monthRecords = financialMonthly.filter((d) => d.month === m)
    return {
      month: m.replace("2025-", "") + "月",
      产品成本: monthRecords.reduce((s, d) => s + d.productCost, 0),
      物流成本: monthRecords.reduce((s, d) => s + d.shippingCost, 0),
      广告费: monthRecords.reduce((s, d) => s + d.adSpend, 0),
      平台佣金: monthRecords.reduce((s, d) => s + d.platformFee, 0),
      收入: monthRecords.reduce((s, d) => s + d.revenue, 0),
      利润: monthRecords.reduce((s, d) => s + d.profit, 0),
    }
  })

  // 各平台收支对比
  const platformFinance = platformData.map((p) => {
    const records = financialMonthly.filter((d) => d.platform === p.name)
    return {
      name: p.name,
      收入: Math.round(records.reduce((s, d) => s + d.revenue, 0) * 10) / 10,
      成本: Math.round(records.reduce((s, d) => s + d.productCost + d.shippingCost + d.adSpend + d.platformFee, 0) * 10) / 10,
      利润: Math.round(records.reduce((s, d) => s + d.profit, 0) * 10) / 10,
    }
  })

  // 成本结构饼图
  const totalProductCost = financialMonthly.reduce((s, d) => s + d.productCost, 0)
  const totalShipping = financialMonthly.reduce((s, d) => s + d.shippingCost, 0)
  const totalAd = financialMonthly.reduce((s, d) => s + d.adSpend, 0)
  const totalFee = financialMonthly.reduce((s, d) => s + d.platformFee, 0)
  const costPieData = [
    { name: "产品成本", value: Math.round(totalProductCost * 10) / 10, fill: NEON_PALETTE[5] },
    { name: "物流成本", value: Math.round(totalShipping * 10) / 10, fill: NEON_PALETTE[4] },
    { name: "广告费", value: Math.round(totalAd * 10) / 10, fill: NEON_PALETTE[1] },
    { name: "平台佣金", value: Math.round(totalFee * 10) / 10, fill: NEON_PALETTE[2] },
  ]

  // 利润率趋势
  const marginTrend = months.map((m) => {
    const records = financialMonthly.filter((d) => d.month === m)
    const rev = records.reduce((s, d) => s + d.revenue, 0)
    const profit = records.reduce((s, d) => s + d.profit, 0)
    const marginRate = rev > 0 ? Math.round((profit / rev) * 1000) / 10 : 0
    return {
      month: m.replace("2025-", "") + "月",
      利润率: marginRate,
    }
  })

  // 新增：各平台利润率对比
  const platformMargin = platformData.map((p) => {
    const records = financialMonthly.filter((d) => d.platform === p.name)
    const rev = records.reduce((s, d) => s + d.revenue, 0)
    const profit = records.reduce((s, d) => s + d.profit, 0)
    const marginRate = rev > 0 ? Math.round((profit / rev) * 1000) / 10 : 0
    return { name: p.name, 利润率: marginRate, color: p.color }
  })

  // 新增：月度收入增长率
  const revenueGrowth = months.length >= 2
    ? months.slice(1).map((m, i) => {
        const prev = months[i]
        const prevRev = financialMonthly.filter((d) => d.month === prev).reduce((s, d) => s + d.revenue, 0)
        const curRev = financialMonthly.filter((d) => d.month === m).reduce((s, d) => s + d.revenue, 0)
        const rate = prevRev > 0 ? Math.round(((curRev - prevRev) / prevRev) * 1000) / 10 : 0
        return { month: m.replace("2025-", "") + "月", 收入增长率: rate, 收入: Math.round(curRev * 10) / 10 }
      })
    : []

  // 新增：各平台成本趋势对比
  const platformCostTrend = months.map((m) => {
    const row: Record<string, string | number> = { month: m.replace("2025-", "") + "月" }
    platformData.forEach((p) => {
      const record = financialMonthly.find((d) => d.month === m && d.platform === p.name)
      const totalCost = record ? record.productCost + record.shippingCost + record.adSpend + record.platformFee : 0
      row[p.name] = Math.round(totalCost * 10) / 10
    })
    return row
  })

  // 现金流瀑布图
  const waterfallData = (() => {
    const totalRev = financialMonthly.reduce((s, d) => s + d.revenue, 0)
    const totalProduct = financialMonthly.reduce((s, d) => s + d.productCost, 0)
    const totalShipping = financialMonthly.reduce((s, d) => s + d.shippingCost, 0)
    const totalAd = financialMonthly.reduce((s, d) => s + d.adSpend, 0)
    const totalFee = financialMonthly.reduce((s, d) => s + d.platformFee, 0)
    const totalProfit = financialMonthly.reduce((s, d) => s + d.profit, 0)
    const steps = [
      { name: "收入", value: Math.round(totalRev * 10) / 10 },
      { name: "产品成本", value: -Math.round(totalProduct * 10) / 10 },
      { name: "物流成本", value: -Math.round(totalShipping * 10) / 10 },
      { name: "广告费", value: -Math.round(totalAd * 10) / 10 },
      { name: "平台佣金", value: -Math.round(totalFee * 10) / 10 },
      { name: "净利润", value: Math.round(totalProfit * 10) / 10 },
    ]
    let base = 0
    return steps.map((s, i) => {
      if (i === 0) {
        const result = { name: s.name, base: 0, delta: s.value }
        base = s.value
        return result
      }
      if (i === steps.length - 1) {
        return { name: s.name, base: 0, delta: s.value }
      }
      base += s.value
      return { name: s.name, base, delta: Math.abs(s.value) }
    })
  })()

  // 各平台费用率对比
  const feeRateData = platformData.map((p) => {
    const records = financialMonthly.filter((d) => d.platform === p.name)
    const rev = records.reduce((s, d) => s + d.revenue, 0)
    const adSpend = records.reduce((s, d) => s + d.adSpend, 0)
    const fee = records.reduce((s, d) => s + d.platformFee, 0)
    const shipping = records.reduce((s, d) => s + d.shippingCost, 0)
    return {
      name: p.name,
      广告费率: rev > 0 ? Math.round((adSpend / rev) * 1000) / 10 : 0,
      平台费率: rev > 0 ? Math.round((fee / rev) * 1000) / 10 : 0,
      物流费率: rev > 0 ? Math.round((shipping / rev) * 1000) / 10 : 0,
    }
  })

  return (
    <div className="space-y-6">
      {/* 财务汇总 */}
      <ChartCard title="财务大盘汇总" delay={100}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {summaryItems.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
              <div className="text-base font-bold text-foreground">{item.value}</div>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* 月度财务结构 */}
      <ChartCard title="月度财务结构" subtitle="成本分项堆叠 + 收入/利润折线" delay={200}>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={composedData}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="产品成本" stackId="cost" fill={NEON_PALETTE[5]} radius={[0, 0, 0, 0]} barSize={40} />
            <Bar dataKey="物流成本" stackId="cost" fill={NEON_PALETTE[4]} barSize={40} />
            <Bar dataKey="广告费" stackId="cost" fill={NEON_PALETTE[1]} barSize={40} />
            <Bar dataKey="平台佣金" stackId="cost" fill={NEON_PALETTE[2]} radius={[3, 3, 0, 0]} barSize={40} />
            <Line type="monotone" dataKey="收入" stroke={NEON_PALETTE[0]} strokeWidth={2.5} dot={{ fill: NEON_PALETTE[0], r: 5 }} />
            <Line type="monotone" dataKey="利润" stroke={NEON_PALETTE[3]} strokeWidth={2.5} dot={{ fill: NEON_PALETTE[3], r: 5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 平台收支 + 成本结构 + 利润率 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="各平台收支对比" className="lg:col-span-2" delay={300}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={platformFinance}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="收入" fill={NEON_PALETTE[0]} radius={[3, 3, 0, 0]} barSize={16} />
              <Bar dataKey="成本" fill={NEON_PALETTE[5]} radius={[3, 3, 0, 0]} barSize={16} />
              <Bar dataKey="利润" fill={NEON_PALETTE[3]} radius={[3, 3, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="成本结构占比" className="lg:col-span-1" delay={400}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={costPieData} cx="50%" cy="45%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value" stroke="none">
                {costPieData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
              <Legend verticalAlign="bottom" iconType="circle" iconSize={7} wrapperStyle={{ fontSize: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="利润率趋势" className="lg:col-span-2" delay={500}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={marginTrend}>
              <defs>
                <linearGradient id="marginGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={NEON_PALETTE[3]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={NEON_PALETTE[3]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "利润率"]} />
              <Area type="monotone" dataKey="利润率" stroke={NEON_PALETTE[3]} fill="url(#marginGrad)" strokeWidth={2.5} dot={{ fill: NEON_PALETTE[3], r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 平台利润率 + 收入增长率 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="各平台利润率对比" subtitle="BarChart" delay={600}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={platformMargin} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid {...gridProps} horizontal={false} />
              <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" />
              <YAxis type="category" dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "利润率"]} />
              <Bar dataKey="利润率">
                {platformMargin.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="月度收入增长率" subtitle="ComposedChart" delay={700}>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={revenueGrowth}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={axisTickStyle} axisLine={false} tickLine={false} unit=" 万" />
              <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar yAxisId="left" dataKey="收入" fill={NEON_PALETTE[0]} radius={[3, 3, 0, 0]} barSize={28} fillOpacity={0.6} />
              <Line yAxisId="right" type="monotone" dataKey="收入增长率" stroke={NEON_PALETTE[4]} strokeWidth={2.5} dot={{ fill: NEON_PALETTE[4], r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 各平台成本趋势 */}
      <ChartCard title="各平台成本趋势对比" subtitle="AreaChart · 堆叠" delay={800}>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={platformCostTrend}>
            <defs>
              {platformData.map((p) => (
                <linearGradient key={p.name} id={`costGrad-${p.name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={p.color} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={p.color} stopOpacity={0.05} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            {platformData.map((p) => (
              <Area key={p.name} type="monotone" dataKey={p.name} stackId="1" stroke={p.color} fill={`url(#costGrad-${p.name})`} strokeWidth={1.5} />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 现金流瀑布 + 费用率对比 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="现金流瀑布图" subtitle="BarChart" className="lg:col-span-3" delay={900}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waterfallData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" tick={{ ...axisTickStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [`${v} 万元`]} />
              <Bar dataKey="base" stackId="a" fill="transparent" />
              <Bar dataKey="delta" stackId="a" radius={[3, 3, 0, 0]} barSize={36}>
                {waterfallData.map((_, i) => (
                  <Cell key={i} fill={i === 0 || i === waterfallData.length - 1 ? NEON_PALETTE[3] : NEON_PALETTE[5]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="各平台费用率对比" subtitle="分组条形图" className="lg:col-span-2" delay={1000}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feeRateData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" tick={{ ...axisTickStyle, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [`${v}%`]} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="广告费率" fill={NEON_PALETTE[1]} radius={[3, 3, 0, 0]} barSize={14} />
              <Bar dataKey="平台费率" fill={NEON_PALETTE[2]} radius={[3, 3, 0, 0]} barSize={14} />
              <Bar dataKey="物流费率" fill={NEON_PALETTE[4]} radius={[3, 3, 0, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
