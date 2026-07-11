import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Bar, Line, LineChart, Brush, ReferenceLine,
} from "recharts"
import { ChartCard } from "../ChartCard"
import { useFilteredData } from "../FilterContext"
import { monthlyTrend } from "@/data/biData"
import { tooltipStyle, axisTickStyle, gridProps, NEON_PALETTE } from "@/lib/chartTheme"

export function TimeTrendTab() {
  const { dailyTrend, dailyTrendByPlatform, platformData } = useFilteredData()

  // 堆叠面积图
  const allDates = [...new Set(dailyTrendByPlatform.map((d) => d.date))].sort()
  const stackedData = allDates.map((date) => {
    const row: Record<string, string | number> = { date: date.slice(5) }
    platformData.forEach((p) => {
      const rec = dailyTrendByPlatform.find((d) => d.date === date && d.platform === p.name)
      row[p.name] = rec?.sales ?? 0
    })
    return row
  })

  // 日利润趋势
  const profitTrend = dailyTrend.map((d) => ({ date: d.date.slice(5), profit: d.profit }))
  const avgProfit = profitTrend.length > 0
    ? Math.round((profitTrend.reduce((s, d) => s + d.profit, 0) / profitTrend.length) * 10) / 10
    : 0

  // 日销售额与成本
  const salesCostData = dailyTrend.map((d) => ({
    date: d.date.slice(5), sales: d.sales, cost: d.cost, profit: d.profit,
  }))

  // 平台月度趋势
  const monthlyLineData = monthlyTrend.map((m) => {
    const row: Record<string, string | number> = { month: m.month.replace("2025-", "") + "月" }
    platformData.forEach((p) => {
      const totalSales = platformData.reduce((s, pd) => s + pd.sales, 0)
      const ratio = totalSales > 0 ? p.sales / totalSales : 0.25
      row[p.name] = Math.round(m.sales * ratio * 10) / 10
    })
    return row
  })

  // 新增：日订单量趋势
  const ordersTrend = dailyTrend.map((d) => ({
    date: d.date.slice(5), orders: d.orders,
  }))

  // 新增：客单价趋势（销售额/订单量 * 10000）
  const avgOrderTrend = dailyTrend.map((d) => ({
    date: d.date.slice(5),
    avgOrder: d.orders > 0 ? Math.round((d.sales / d.orders) * 10000 * 10) / 10 : 0,
  }))

  // 新增：周度汇总 & 环比增长率
  const weeklyData = (() => {
    const weeks: { week: string; sales: number; cost: number; profit: number }[] = []
    for (let i = 0; i < dailyTrend.length; i += 7) {
      const chunk = dailyTrend.slice(i, i + 7)
      const label = `W${Math.floor(i / 7) + 1}`
      weeks.push({
        week: label,
        sales: Math.round(chunk.reduce((s, d) => s + d.sales, 0) * 10) / 10,
        cost: Math.round(chunk.reduce((s, d) => s + d.cost, 0) * 10) / 10,
        profit: Math.round(chunk.reduce((s, d) => s + d.profit, 0) * 10) / 10,
      })
    }
    return weeks
  })()

  const weeklyGrowth = weeklyData.slice(1).map((w, i) => {
    const prev = weeklyData[i]
    const rate = prev.sales > 0 ? Math.round(((w.sales - prev.sales) / prev.sales) * 1000) / 10 : 0
    return { week: w.week, 环比增长率: rate, 销售额: w.sales }
  })

  // 7日移动平均
  const movingAvgData = dailyTrend.map((d, i) => {
    const window = dailyTrend.slice(Math.max(0, i - 6), i + 1)
    const avg = window.length > 0 ? Math.round((window.reduce((s, w) => s + w.sales, 0) / window.length) * 10) / 10 : 0
    return { date: d.date.slice(5), sales: d.sales, 移动平均: avg }
  })

  // 累计销售额
  const cumulativeData = (() => {
    let cum = 0
    return dailyTrend.map((d) => {
      cum += d.sales
      return { date: d.date.slice(5), 累计销售额: Math.round(cum * 10) / 10 }
    })
  })()

  return (
    <div className="space-y-6">
      {/* 堆叠面积图 + Brush */}
      <ChartCard title="各平台日销售趋势（堆叠面积图）" subtitle="支持底部 Brush 缩放" delay={100}>
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={stackedData}>
            <defs>
              {platformData.map((p) => (
                <linearGradient key={p.name} id={`grad-${p.name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={p.color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={p.color} stopOpacity={0.05} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="date" tick={axisTickStyle} axisLine={false} tickLine={false} interval={6} />
            <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            {platformData.map((p) => (
              <Area key={p.name} type="monotone" dataKey={p.name} stackId="1" stroke={p.color} fill={`url(#grad-${p.name})`} strokeWidth={1.5} />
            ))}
            <Brush dataKey="date" height={28} stroke="hsl(190 90% 55%)" fill="hsl(230 18% 12%)" tickFormatter={(v) => v} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 日利润 + 日销售额成本 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="日利润趋势" subtitle={`均值 ${avgProfit} 万元`} className="lg:col-span-2" delay={200}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={profitTrend}>
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={NEON_PALETTE[3]} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={NEON_PALETTE[3]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="date" tick={axisTickStyle} axisLine={false} tickLine={false} interval={6} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
              <ReferenceLine y={avgProfit} stroke="hsl(38 92% 50%)" strokeDasharray="4 4" label={{ value: `均值 ${avgProfit}`, fill: "hsl(38 92% 50%)", fontSize: 10, position: "insideTopRight" }} />
              <Area type="monotone" dataKey="profit" stroke={NEON_PALETTE[3]} fill="url(#profitGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="日销售额与成本对比" subtitle="ComposedChart" className="lg:col-span-3" delay={300}>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={salesCostData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="date" tick={axisTickStyle} axisLine={false} tickLine={false} interval={6} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="sales" name="销售额" fill={NEON_PALETTE[0]} radius={[2, 2, 0, 0]} barSize={6} />
              <Line type="monotone" dataKey="cost" name="成本" stroke={NEON_PALETTE[5]} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="profit" name="利润" stroke={NEON_PALETTE[3]} strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 新增：日订单量 + 客单价趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="日订单量趋势" subtitle="AreaChart" delay={400}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={ordersTrend}>
              <defs>
                <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={NEON_PALETTE[1]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={NEON_PALETTE[1]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="date" tick={axisTickStyle} axisLine={false} tickLine={false} interval={6} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 单`, "订单量"]} />
              <Area type="monotone" dataKey="orders" stroke={NEON_PALETTE[1]} fill="url(#ordersGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="客单价趋势" subtitle="日均销售额 / 订单量" delay={500}>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={avgOrderTrend}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="date" tick={axisTickStyle} axisLine={false} tickLine={false} interval={6} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} unit=" 元" />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 元`, "客单价"]} />
              <Bar dataKey="avgOrder" name="客单价" fill={NEON_PALETTE[2]} radius={[2, 2, 0, 0]} barSize={6} fillOpacity={0.5} />
              <Line type="monotone" dataKey="avgOrder" name="趋势" stroke={NEON_PALETTE[4]} strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 新增：周度环比增长率 + 平台月度趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="周度环比增长率" subtitle="BarChart + LineChart" className="lg:col-span-2" delay={600}>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={weeklyGrowth}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="week" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="环比增长率" fill={NEON_PALETTE[4]} radius={[3, 3, 0, 0]} barSize={14} />
              <ReferenceLine y={0} stroke="hsl(215 12% 55%)" strokeDasharray="3 3" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="平台月度趋势对比" subtitle="LineChart" className="lg:col-span-3" delay={700}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyLineData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              {platformData.map((p) => (
                <Line key={p.name} type="monotone" dataKey={p.name} stroke={p.color} strokeWidth={2.5} dot={{ fill: p.color, r: 5 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 7日移动平均 + 累计销售额 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="7日移动平均" subtitle="LineChart" className="lg:col-span-3" delay={800}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={movingAvgData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="date" tick={axisTickStyle} axisLine={false} tickLine={false} interval={6} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [`${v} 万元`]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="sales" name="日销售额" stroke={NEON_PALETTE[1]} strokeWidth={1.5} dot={false} opacity={0.5} />
              <Line type="monotone" dataKey="移动平均" stroke={NEON_PALETTE[4]} strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="累计销售额" subtitle="AreaChart" className="lg:col-span-2" delay={900}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={cumulativeData}>
              <defs>
                <linearGradient id="cumGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={NEON_PALETTE[0]} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={NEON_PALETTE[0]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="date" tick={axisTickStyle} axisLine={false} tickLine={false} interval={6} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown) => [`${v} 万元`, "累计销售额"]} />
              <Area type="monotone" dataKey="累计销售额" stroke={NEON_PALETTE[0]} fill="url(#cumGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
