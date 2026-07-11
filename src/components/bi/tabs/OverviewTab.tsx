import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, RadialBarChart, RadialBar,
  ComposedChart, Line, Legend,
} from "recharts"
import { ChartCard } from "../ChartCard"
import { KpiCard } from "../KpiCard"
import { useFilteredData } from "../FilterContext"
import { tooltipStyle, axisTickStyle, gridProps, NEON_PALETTE, PLATFORM_COLORS } from "@/lib/chartTheme"
import { categoryTreemap } from "@/data/biData"

export function OverviewTab() {
  const data = useFilteredData()
  const { platformData, storeRanking, dailyTrend, kpiSummary } = data

  const kpis = [
    { label: "总销售额", value: kpiSummary.totalSales.toFixed(1), unit: "万元", change: 12.3, icon: "DollarSign" },
    { label: "总利润", value: kpiSummary.totalProfit.toFixed(1), unit: "万元", change: 8.7, icon: "TrendingUp" },
    { label: "广告 ROAS", value: String(kpiSummary.roas), unit: "", change: 15.1, icon: "Target" },
    { label: "综合利润率", value: String(kpiSummary.profitRate), unit: "%", change: -1.2, icon: "Percent" },
  ]

  const pieData = platformData.map((p) => ({ name: p.name, value: p.sales, color: p.color }))

  const barData = [...storeRanking]
    .reverse()
    .map((s) => ({
      name: s.name.length > 14 ? s.name.slice(0, 14) + "\u2026" : s.name,
      sales: s.sales,
    }))

  const areaData = dailyTrend.slice(-30).map((d) => ({
    date: d.date.slice(5),
    sales: d.sales,
  }))

  const gaugeData = platformData.map((p) => ({
    name: p.name, value: p.profitRate, fill: p.color,
  }))

  // 新增：日订单量趋势
  const ordersTrend = dailyTrend.slice(-30).map((d) => ({
    date: d.date.slice(5),
    orders: d.orders,
  }))

  // 新增：平台销售额 & 利润对比
  const platformCompare = platformData.map((p) => ({
    name: p.name,
    销售额: p.sales,
    成本: p.cost,
    利润: p.profit,
  }))

  // 新增：平台订单量对比
  const ordersCompare = platformData.map((p) => ({
    name: p.name,
    orders: p.orders,
    avgOrder: Math.round((p.sales / p.orders) * 10000 * 10) / 10,
  }))

  // 品类销售增长率排行
  const categoryGrowthData = (() => {
    const firstPlatform = categoryTreemap[0]
    if (!firstPlatform?.children) return []
    return firstPlatform.children.map((cat) => {
      const salesAll = categoryTreemap.reduce((sum, p) => {
        const c = p.children?.find((ch) => ch.name === cat.name)
        return sum + (c?.size ?? 0)
      }, 0)
      const p1 = categoryTreemap[0].children?.find((ch) => ch.name === cat.name)?.size ?? 0
      const p2 = categoryTreemap[1]?.children?.find((ch) => ch.name === cat.name)?.size ?? 0
      const growth = (p1 + p2) > 0 ? Math.round(((salesAll - p1) / (p1 + p2)) * 100 * 10) / 10 : 0
      return { name: cat.name, 增长率: growth }
    }).sort((a, b) => a.增长率 - b.增长率)
  })()

  // 平台销售目标完成度
  const targetData = platformData.map((p, i) => ({
    name: p.name,
    完成度: Math.round((p.sales / (p.sales * 1.1)) * 1000) / 10,
    fill: PLATFORM_COLORS[p.name] ?? NEON_PALETTE[i % NEON_PALETTE.length],
  }))

  return (
    <div className="space-y-6">
      {/* KPI 卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <KpiCard key={k.label} {...k} delay={i * 80} />
        ))}
      </div>

      {/* 环形图 + 店铺排行 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="平台销售占比" className="lg:col-span-2" delay={300}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value" stroke="none">
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`, "销售额"]} />
              <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={tooltipStyle as React.CSSProperties} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {platformData.map((p) => (
              <div key={p.name} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                <span className="text-muted-foreground truncate">{p.name}</span>
                <span className="text-foreground font-medium ml-auto">{p.profitRate}%</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="店铺销售 TOP 10" className="lg:col-span-3" delay={400}>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} horizontal={false} />
              <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={120} tick={{ ...axisTickStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`, "销售额"]} />
              <Bar dataKey="sales" fill={NEON_PALETTE[0]} radius={[0, 4, 4, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 面积图 + 仪表盘 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="日销售额趋势（近30天）" delay={500}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={NEON_PALETTE[0]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={NEON_PALETTE[0]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="date" tick={axisTickStyle} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
              <Area type="monotone" dataKey="sales" stroke={NEON_PALETTE[0]} fill="url(#salesGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="平台利润率仪表盘" subtitle="RadialBarChart" delay={600}>
          <ResponsiveContainer width="100%" height={260}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="25%" outerRadius="90%" data={gaugeData} startAngle={180} endAngle={0}>
              <RadialBar background={{ fill: "hsl(230 16% 18%)" }} dataKey="value" cornerRadius={6} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "利润率"]} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: "11px", color: "hsl(215 12% 55%)" }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 新增：日订单量趋势 + 平台销售利润对比 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="日订单量趋势（近30天）" subtitle="ComposedChart · 柱形+折线" delay={700}>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={ordersTrend}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="date" tick={axisTickStyle} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 单`, "订单量"]} />
              <Bar dataKey="orders" fill={NEON_PALETTE[1]} radius={[2, 2, 0, 0]} barSize={8} fillOpacity={0.6} />
              <Line type="monotone" dataKey="orders" stroke={NEON_PALETTE[4]} strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="平台销售额 & 利润对比" subtitle="分组条形图" delay={800}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={platformCompare}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="销售额" fill={NEON_PALETTE[0]} radius={[3, 3, 0, 0]} barSize={18} />
              <Bar dataKey="成本" fill={NEON_PALETTE[5]} radius={[3, 3, 0, 0]} barSize={18} />
              <Bar dataKey="利润" fill={NEON_PALETTE[3]} radius={[3, 3, 0, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 新增：平台订单量 & 客单价 */}
      <ChartCard title="平台订单量 & 客单价对比" subtitle="ComposedChart · 柱形+折线双轴" delay={900}>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={ordersCompare}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={axisTickStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} axisLine={false} tickLine={false} unit=" 元" />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar yAxisId="left" dataKey="orders" name="订单量" fill={NEON_PALETTE[1]} radius={[3, 3, 0, 0]} barSize={32} />
            <Line yAxisId="right" type="monotone" dataKey="avgOrder" name="客单价(元)" stroke={NEON_PALETTE[4]} strokeWidth={2.5} dot={{ fill: NEON_PALETTE[4], r: 5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 品类增长率 + 目标完成度 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="品类销售增长率排行" className="lg:col-span-2" delay={1000}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryGrowthData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} horizontal={false} />
              <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" />
              <YAxis type="category" dataKey="name" width={80} tick={{ ...axisTickStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [`${v}%`, "增长率"]} />
              <Bar dataKey="增长率" radius={[0, 4, 4, 0]} barSize={16}>
                {categoryGrowthData.map((d, i) => (
                  <Cell key={i} fill={d.增长率 >= 0 ? NEON_PALETTE[3] : NEON_PALETTE[5]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="平台销售目标完成度" subtitle="RadialBarChart" className="lg:col-span-3" delay={1100}>
          <ResponsiveContainer width="100%" height={280}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={targetData} startAngle={180} endAngle={0}>
              <RadialBar background={{ fill: "hsl(230 16% 18%)" }} dataKey="完成度" cornerRadius={6} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [`${v}%`, "完成度"]} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
