import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, Legend, Treemap,
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  BarChart, PieChart, Pie, Cell, AreaChart, Area, LineChart, ScatterChart, Scatter, ZAxis,
} from "recharts"
import { ChartCard } from "../ChartCard"
import { KpiCard } from "../KpiCard"
import { useFilteredData } from "../FilterContext"
import { categoryTreemap, platformRadarData } from "@/data/biData"
import { tooltipStyle, axisTickStyle, gridProps, PLATFORM_COLORS, NEON_PALETTE } from "@/lib/chartTheme"

// Treemap 自定义渲染
function TreemapContent(props: { x: number; y: number; width: number; height: number; name: string; size: number; fill: string }) {
  const { x, y, width, height, name, size, fill } = props
  if (width < 40 || height < 30) return null
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} stroke="hsl(230 16% 20%)" strokeWidth={1} rx={4} />
      <text x={x + width / 2} y={y + height / 2 - 6} textAnchor="middle" fill="hsl(210 20% 92%)" fontSize={11} fontWeight={600}>
        {name}
      </text>
      <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill="hsl(215 12% 55%)" fontSize={10}>
        {size} 万
      </text>
    </g>
  )
}

export function PlatformTab() {
  const { platformData, monthlyTrend, storeMonthlyData } = useFilteredData()

  // KPI：最佳平台
  const topBySales = [...platformData].sort((a, b) => b.sales - a.sales)[0]
  const topByMargin = [...platformData].sort((a, b) => b.profitRate - a.profitRate)[0]
  const topByOrders = [...platformData].sort((a, b) => b.orders - a.orders)[0]
  const totalOrders = platformData.reduce((s, p) => s + p.orders, 0)

  const kpis = [
    { label: "最高销售额", value: topBySales?.name ?? "-", unit: "万元", icon: "BarChart3" },
    { label: "最高利润率", value: topByMargin?.name ?? "-", unit: `${topByMargin?.profitRate}%`, icon: "TrendingUp" },
    { label: "最多订单平台", value: topByOrders?.name ?? "-", unit: "", icon: "ShoppingCart" },
    { label: "总订单量", value: totalOrders.toLocaleString(), unit: "单", icon: "ShoppingCart" },
  ]

  // 雷达数据（只保留筛选中的平台）
  const radarData = platformRadarData.map((row) => {
    const out: Record<string, string | number> = { metric: row.metric }
    platformData.forEach((p) => {
      out[p.name] = (row as unknown as Record<string, number>)[p.name] ?? 0
    })
    return out
  })

  // Treemap：扁平化 children
  const treemapData = categoryTreemap
    .filter((p) => platformData.some((pd) => pd.name === p.name))
    .flatMap((p) =>
      (p.children ?? []).map((c) => ({ name: c.name, size: c.size ?? 0, fill: PLATFORM_COLORS[p.name] ?? NEON_PALETTE[0] }))
    )

  // 组合图：平台月度对比
  const composedData = monthlyTrend.map((m) => {
    const row: Record<string, string | number> = { month: m.month.replace("2025-", "") + "月" }
    platformData.forEach((p) => {
      const totalSales = platformData.reduce((s, pd) => s + pd.sales, 0)
      const ratio = totalSales > 0 ? p.sales / totalSales : 0.25
      row[p.name] = Math.round(m.sales * ratio * 10) / 10
    })
    row["合计"] = m.sales
    return row
  })

  // 新增：订单量分布饼图
  const ordersPie = platformData.map((p) => ({ name: p.name, value: p.orders, color: p.color }))

  // 新增：平台利润率 & 成本率对比
  const marginCompare = platformData.map((p) => ({
    name: p.name,
    利润率: p.profitRate,
    成本率: Math.round((1 - p.profitRate / 100) * 1000) / 10,
  }))

  // 新增：平台月度增长率
  const growthData = monthlyTrend.length >= 2
    ? monthlyTrend.slice(1).map((m, i) => {
        const prev = monthlyTrend[i]
        const rate = prev.sales > 0 ? Math.round(((m.sales - prev.sales) / prev.sales) * 1000) / 10 : 0
        return { month: m.month.replace("2025-", "") + "月", 环比增长率: rate }
      })
    : []

  // 平台客单价趋势
  const aovTrend = (() => {
    const monthList = [...new Set(storeMonthlyData.map((r) => r.month))].sort()
    return monthList.map((m) => {
      const row: Record<string, string | number> = { month: m.replace("2025-", "") + "月" }
      platformData.forEach((p) => {
        const records = storeMonthlyData.filter((r) => r.platform === p.name && r.month === m)
        const totalSales = records.reduce((sum, r) => sum + r.sales, 0)
        const totalOrders = records.reduce((sum, r) => sum + r.orders, 0)
        row[p.name] = totalOrders > 0 ? Math.round((totalSales / totalOrders) * 10000 * 10) / 10 : 0
      })
      return row
    })
  })()

  // 平台综合得分
  const scoreData = platformData.map((p, i) => ({
    x: p.sales,
    y: p.profitRate,
    z: p.orders,
    name: p.name,
    fill: PLATFORM_COLORS[p.name] ?? NEON_PALETTE[i % NEON_PALETTE.length],
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k, i) => <KpiCard key={k.label} {...k} delay={i * 80} />)}
      </div>

      {/* 雷达图 + 矩形树图 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="平台综合能力雷达" className="lg:col-span-3" delay={200}>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="72%">
              <PolarGrid stroke="hsl(230 16% 22%)" />
              <PolarAngleAxis dataKey="metric" tick={{ ...axisTickStyle, fontSize: 11 }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              {platformData.map((p) => (
                <Radar key={p.name} name={p.name} dataKey={p.name} stroke={p.color} fill={p.color} fillOpacity={0.15} strokeWidth={2} />
              ))}
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="品类销售构成" subtitle="Treemap" className="lg:col-span-2" delay={300}>
          <ResponsiveContainer width="100%" height={320}>
            <Treemap data={treemapData} dataKey="size" aspectRatio={4 / 3} stroke="hsl(230 16% 20%)" content={<TreemapContent x={0} y={0} width={0} height={0} name="" size={0} fill="" />} />
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 组合图 */}
      <ChartCard title="平台月度销售对比" subtitle="ComposedChart" delay={400}>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={composedData}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            {platformData.map((p) => (
              <Bar key={p.name} dataKey={p.name} fill={p.color} radius={[3, 3, 0, 0]} barSize={28} />
            ))}
            <Line type="monotone" dataKey="合计" stroke={NEON_PALETTE[0]} strokeWidth={2} dot={{ fill: NEON_PALETTE[0], r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 订单量分布 + 利润率对比 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="平台订单量分布" subtitle="PieChart" className="lg:col-span-2" delay={500}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={ordersPie} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value" stroke="none" paddingAngle={2}>
                {ordersPie.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${(v as number).toLocaleString()} 单`, "订单量"]} />
              <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="平台利润率 & 成本率" subtitle="分组条形图" className="lg:col-span-3" delay={600}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={marginCompare}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="利润率" fill={NEON_PALETTE[3]} radius={[3, 3, 0, 0]} barSize={24} />
              <Bar dataKey="成本率" fill={NEON_PALETTE[5]} radius={[3, 3, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 月度环比增长率 */}
      {growthData.length > 0 && (
        <ChartCard title="月度环比增长率" subtitle="AreaChart" delay={700}>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={NEON_PALETTE[4]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={NEON_PALETTE[4]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "环比增长率"]} />
              <Area type="monotone" dataKey="环比增长率" stroke={NEON_PALETTE[4]} fill="url(#growthGrad)" strokeWidth={2.5} dot={{ fill: NEON_PALETTE[4], r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      {/* 客单价趋势 + 综合得分 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="平台客单价趋势" subtitle="LineChart" className="lg:col-span-3" delay={800}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={aovTrend}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} unit=" 元" />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [`${v} 元`, "客单价"]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              {platformData.map((p) => (
                <Line key={p.name} type="monotone" dataKey={p.name} stroke={p.color} strokeWidth={2.5} dot={{ fill: p.color, r: 5 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="平台综合得分对比" subtitle="ScatterChart" className="lg:col-span-2" delay={900}>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid {...gridProps} />
              <XAxis type="number" dataKey="x" name="销售额" unit="万" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis type="number" dataKey="y" name="利润率" unit="%" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <ZAxis type="number" dataKey="z" range={[60, 400]} name="订单量" />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: unknown, name: unknown) => [name === "利润率" ? `${v}%` : name === "销售额" ? `${v} 万元` : String(v), name as string]}
                labelFormatter={() => ""}
              />
              <Scatter data={scoreData}>
                {scoreData.map((d, i) => (
                  <Cell key={i} fill={d.fill} fillOpacity={0.8} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {platformData.map((p) => (
              <span key={p.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                {p.name}
              </span>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
