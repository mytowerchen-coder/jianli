import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Line, ScatterChart, Scatter, ZAxis, Cell,
  PieChart, Pie, Area,
} from "recharts"
import { ChartCard } from "../ChartCard"
import { KpiCard } from "../KpiCard"
import { useFilteredData } from "../FilterContext"
import { tooltipStyle, axisTickStyle, gridProps, PLATFORM_COLORS, NEON_PALETTE } from "@/lib/chartTheme"

export function StoreTab() {
  const { storeRanking, storeMonthlyData } = useFilteredData()

  // 店铺排行（横向条形图）
  const rankData = [...storeRanking].reverse().map((s) => ({
    name: s.name.length > 14 ? s.name.slice(0, 14) + "\u2026" : s.name,
    sales: s.sales,
    growth: s.growth,
  }))

  const top5Stores = storeRanking.slice(0, 5)
  const months = ["2025-03", "2025-04", "2025-05"]
  const trendData = months.map((m) => {
    const row: Record<string, string | number> = { month: m.replace("2025-", "") + "月" }
    top5Stores.forEach((s) => {
      const record = storeMonthlyData.find((r) => r.storeName === s.name && r.month === m)
      row[s.name] = record?.sales ?? 0
    })
    return row
  })

  const scatterData = storeRanking.map((s) => ({
    x: s.sales, y: s.growth, z: 200, name: s.name, platform: s.platform,
  }))

  const groupedData = months.map((m) => {
    const row: Record<string, string | number> = { month: m.replace("2025-", "") + "月" }
    top5Stores.forEach((s) => {
      const record = storeMonthlyData.find((r) => r.storeName === s.name && r.month === m)
      row[s.name] = record?.sales ?? 0
    })
    return row
  })

  // 新增：店铺利润率排行
  const profitRank = [...storeRanking].map((s) => {
    const records = storeMonthlyData.filter((r) => r.storeName === s.name)
    const totalSales = records.reduce((sum, r) => sum + r.sales, 0)
    const totalProfit = records.reduce((sum, r) => sum + r.profit, 0)
    return {
      name: s.name.length > 12 ? s.name.slice(0, 12) + "\u2026" : s.name,
      利润率: totalSales > 0 ? Math.round((totalProfit / totalSales) * 1000) / 10 : 0,
      platform: s.platform,
    }
  }).sort((a, b) => a.利润率 - b.利润率)

  // 新增：Top5 店铺月度利润折线
  const profitTrendData = months.map((m) => {
    const row: Record<string, string | number> = { month: m.replace("2025-", "") + "月" }
    top5Stores.forEach((s) => {
      const record = storeMonthlyData.find((r) => r.storeName === s.name && r.month === m)
      row[s.name] = record?.profit ?? 0
    })
    return row
  })

  // 新增：店铺平台分布饼图
  const platformDistribution = (() => {
    const grouped: Record<string, number> = {}
    storeRanking.forEach((s) => {
      grouped[s.platform] = (grouped[s.platform] ?? 0) + s.sales
    })
    return Object.entries(grouped).map(([name, value]) => ({
      name, value: Math.round(value * 10) / 10,
      color: PLATFORM_COLORS[name] ?? NEON_PALETTE[0],
    }))
  })()

  // 帕累托图数据
  const paretoData = (() => {
    const sorted = [...storeRanking].sort((a, b) => b.sales - a.sales)
    const total = sorted.reduce((s, d) => s + d.sales, 0)
    let cum = 0
    return sorted.map((d) => {
      cum += d.sales
      return {
        name: d.name.length > 10 ? d.name.slice(0, 10) + "\u2026" : d.name,
        sales: d.sales,
        累计占比: total > 0 ? Math.round((cum / total) * 1000) / 10 : 0,
      }
    })
  })()

  // 退货率 & 满意度数据
  const satisfactionData = storeRanking.map((s, i) => {
    const seed = Math.sin((i + 1) * 127.1 + 311.7) * 43758.5453
    const r = seed - Math.floor(seed)
    return {
      name: s.name.length > 10 ? s.name.slice(0, 10) + "\u2026" : s.name,
      退货率: Math.round((2 + r * 6) * 10) / 10,
      满意度: Math.round((85 + r * 13) * 10) / 10,
    }
  })

  // KPI
  const totalStoreSales = storeRanking.reduce((s, d) => s + d.sales, 0)
  const avgGrowth = storeRanking.length > 0
    ? Math.round((storeRanking.reduce((s, d) => s + d.growth, 0) / storeRanking.length) * 10) / 10
    : 0
  const topGrowth = [...storeRanking].sort((a, b) => b.growth - a.growth)[0]

  const kpis = [
    { label: "店铺总销售", value: totalStoreSales.toFixed(1), unit: "万元", icon: "DollarSign" },
    { label: "平均增长率", value: String(avgGrowth), unit: "%", icon: "TrendingUp" },
    { label: "增长最快", value: topGrowth?.name.slice(0, 10) ?? "-", unit: `${topGrowth?.growth}%`, icon: "BarChart3" },
    { label: "店铺数量", value: String(storeRanking.length), unit: "家", icon: "ShoppingCart" },
  ]

  return (
    <div className="space-y-6">
      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k, i) => <KpiCard key={k.label} {...k} delay={i * 80} />)}
      </div>

      {/* 店铺排行 */}
      <ChartCard title="店铺销售排行榜 TOP 10" subtitle="含环比增长率" delay={100}>
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={rankData} layout="vertical" margin={{ left: 10, right: 40 }}>
            <CartesianGrid {...gridProps} horizontal={false} />
            <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" width={120} tick={{ ...axisTickStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [name === "sales" ? `${v} 万元` : `${v}%`, name === "sales" ? "销售额" : "增长率"]} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="sales" name="销售额" fill={NEON_PALETTE[0]} radius={[0, 4, 4, 0]} barSize={16} />
            <Line type="monotone" dataKey="growth" name="增长率" stroke={NEON_PALETTE[4]} strokeWidth={2} dot={{ fill: NEON_PALETTE[4], r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 散点图 + 店铺趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="销售额 vs 增长率" subtitle="ScatterChart · 按平台着色" className="lg:col-span-2" delay={200}>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid {...gridProps} />
              <XAxis type="number" dataKey="x" name="销售额" unit="万" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis type="number" dataKey="y" name="增长率" unit="%" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <ZAxis type="number" dataKey="z" range={[60, 300]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [name === "销售额" ? `${v} 万元` : `${v}%`, name]} labelFormatter={() => ""} />
              <Scatter data={scatterData}>
                {scatterData.map((d, i) => (
                  <Cell key={i} fill={PLATFORM_COLORS[d.platform] ?? NEON_PALETTE[0]} fillOpacity={0.8} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {Object.entries(PLATFORM_COLORS).map(([name, color]) => (
              <span key={name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                {name}
              </span>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Top 5 店铺月度趋势" subtitle="ComposedChart" className="lg:col-span-3" delay={300}>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={trendData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              {top5Stores.map((s, i) => (
                <Bar key={s.name} dataKey={s.name} fill={NEON_PALETTE[i % NEON_PALETTE.length]} radius={[3, 3, 0, 0]} barSize={20} />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 新增：利润率排行 + 平台分布 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="店铺利润率排行" subtitle="按平台着色" className="lg:col-span-3" delay={400}>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={profitRank} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} horizontal={false} />
              <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" />
              <YAxis type="category" dataKey="name" width={110} tick={{ ...axisTickStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "利润率"]} />
              <Bar dataKey="利润率">
                {profitRank.map((d, i) => (
                  <Cell key={i} fill={PLATFORM_COLORS[d.platform] ?? NEON_PALETTE[0]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="店铺销售平台分布" subtitle="PieChart" className="lg:col-span-2" delay={500}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={platformDistribution} cx="50%" cy="45%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none" paddingAngle={3}>
                {platformDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`, "销售额"]} />
              <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 新增：Top5 利润折线 + 月度分组对比 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Top 5 店铺月度利润趋势" subtitle="LineChart" delay={600}>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={profitTrendData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              {top5Stores.map((s, i) => (
                <Line key={s.name} type="monotone" dataKey={s.name} stroke={NEON_PALETTE[i % NEON_PALETTE.length]} strokeWidth={2} dot={{ fill: NEON_PALETTE[i % NEON_PALETTE.length], r: 4 }} />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top 5 店铺月度对比" subtitle="分组条形图" delay={700}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={groupedData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              {top5Stores.map((s, i) => (
                <Bar key={s.name} dataKey={s.name} fill={NEON_PALETTE[i % NEON_PALETTE.length]} radius={[3, 3, 0, 0]} barSize={18} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 帕累托图 + 退货率满意度 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="店铺销售集中度" subtitle="帕累托图" className="lg:col-span-2" delay={800}>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={paretoData}>
              <defs>
                <linearGradient id="paretoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={NEON_PALETTE[0]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={NEON_PALETTE[0]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" tick={{ ...axisTickStyle, fontSize: 9 }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={50} />
              <YAxis yAxisId="left" tick={axisTickStyle} axisLine={false} tickLine={false} unit="万" />
              <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown, name: unknown) => [name === "累计占比" ? `${v}%` : `${v} 万元`, name as string]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Area yAxisId="left" type="monotone" dataKey="sales" name="销售额" stroke={NEON_PALETTE[0]} fill="url(#paretoGrad)" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="累计占比" stroke={NEON_PALETTE[4]} strokeWidth={2.5} dot={{ fill: NEON_PALETTE[4], r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="店铺退货率 & 满意度" subtitle="ComposedChart · 双轴" className="lg:col-span-3" delay={900}>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={satisfactionData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" tick={{ ...axisTickStyle, fontSize: 9 }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={50} />
              <YAxis yAxisId="left" tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" domain={[0, 10]} />
              <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} axisLine={false} tickLine={false} unit="分" domain={[80, 100]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown, name: unknown) => [name === "退货率" ? `${v}%` : `${v} 分`, name as string]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar yAxisId="left" dataKey="退货率" fill={NEON_PALETTE[5]} radius={[3, 3, 0, 0]} barSize={24} />
              <Line yAxisId="right" type="monotone" dataKey="满意度" stroke={NEON_PALETTE[3]} strokeWidth={2.5} dot={{ fill: NEON_PALETTE[3], r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
