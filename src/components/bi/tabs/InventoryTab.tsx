import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis,
  AreaChart, Area, ReferenceLine,
} from "recharts"
import { ChartCard } from "../ChartCard"
import { KpiCard } from "../KpiCard"
import { useFilteredData } from "../FilterContext"
import { tooltipStyle, axisTickStyle, gridProps, PLATFORM_COLORS, NEON_PALETTE } from "@/lib/chartTheme"

const AGING_COLORS = ["hsl(142 71% 45%)", "hsl(38 92% 50%)", "hsl(25 95% 53%)", "hsl(0 72% 51%)"]

const fmtWan = (v: unknown) => [`${v} 万`]
const fmtWanLabel = (v: unknown) => [`${v} 万`, "库存值"]

export function InventoryTab() {
  const {
    inventoryByWarehouse, inventoryTurnoverMonthly, inventoryAging,
    stockVsSales, safetyStockData, inventoryHoldingCost, reorderAlerts,
    inventoryKpi,
  } = useFilteredData()

  const platformInventory = inventoryByWarehouse.reduce<Record<string, number>>((acc, d) => {
    acc[d.platform] = (acc[d.platform] || 0) + d.totalValue
    return acc
  }, {})
  const pieData = Object.entries(platformInventory).map(([name, value]) => ({
    name, value: Math.round(value * 10) / 10,
  }))

  const warehouseDetail = [...inventoryByWarehouse].sort((a, b) => a.totalValue - b.totalValue)

  const turnoverByMonth = inventoryTurnoverMonthly.reduce<Record<string, { month: string; turnover: number; days: number; count: number }>>((acc, d) => {
    if (!acc[d.month]) acc[d.month] = { month: d.month, turnover: 0, days: 0, count: 0 }
    acc[d.month].turnover += d.turnoverRate
    acc[d.month].days += d.daysOfStock
    acc[d.month].count += 1
    return acc
  }, {})
  const turnoverTrend = Object.values(turnoverByMonth).map((d) => ({
    month: d.month,
    turnover: Math.round((d.turnover / d.count) * 10) / 10,
    days: Math.round(d.days / d.count),
  }))

  const agingBuckets = ["0-30天", "31-60天", "61-90天", "90天以上"]
  const agingChart = [...new Set(inventoryByWarehouse.map((d) => d.platform))].map((platform) => {
    const row: Record<string, string | number> = { platform }
    agingBuckets.forEach((bucket) => {
      const item = inventoryAging.find((d) => d.platform === platform && d.agingBucket === bucket)
      row[bucket] = item ? Math.round(item.value * 10) / 10 : 0
    })
    return row
  })

  const holdingByMonth = inventoryHoldingCost.reduce<Record<string, { month: string; storageFee: number; insurance: number; depreciation: number; handlingFee: number }>>((acc, d) => {
    if (!acc[d.month]) acc[d.month] = { month: d.month, storageFee: 0, insurance: 0, depreciation: 0, handlingFee: 0 }
    acc[d.month].storageFee += d.storageFee
    acc[d.month].insurance += d.insurance
    acc[d.month].depreciation += d.depreciation
    acc[d.month].handlingFee += d.handlingFee
    return acc
  }, {})
  const holdingTrend = Object.values(holdingByMonth).map((d) => ({
    ...d,
    storageFee: Math.round(d.storageFee * 100) / 100,
    insurance: Math.round(d.insurance * 100) / 100,
    depreciation: Math.round(d.depreciation * 100) / 100,
    handlingFee: Math.round(d.handlingFee * 100) / 100,
  }))

  const safetyChart = [...safetyStockData].sort((a, b) => a.currentStock - b.currentStock).slice(0, 12)
  const avgSafety = safetyStockData.length > 0
    ? Math.round(safetyStockData.reduce((s, d) => s + d.safetyStock, 0) / safetyStockData.length)
    : 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="库存总值" value={String(inventoryKpi.totalValue)} unit="万元" change={2.1} icon="Warehouse" delay={0} />
        <KpiCard label="平均周转率" value={String(inventoryKpi.avgTurnover)} unit="次" change={5.8} icon="RefreshCw" delay={80} />
        <KpiCard label="平均库存天数" value={String(inventoryKpi.avgDaysOfStock)} unit="天" change={-4.2} icon="CalendarDays" delay={160} />
        <KpiCard label="缺货率" value={String(inventoryKpi.stockoutRate)} unit="%" change={-1.5} icon="AlertTriangle" delay={240} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="各平台库存分布" subtitle="PieChart" className="lg:col-span-2" delay={300}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                {pieData.map((d, i) => (
                  <Cell key={i} fill={PLATFORM_COLORS[d.name] ?? NEON_PALETTE[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={fmtWan} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="仓库库存明细" subtitle="BarChart" className="lg:col-span-3" delay={400}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={warehouseDetail} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis type="number" tick={axisTickStyle} />
              <YAxis type="category" dataKey="warehouse" tick={{ ...axisTickStyle, fontSize: 10 }} width={90} />
              <Tooltip contentStyle={tooltipStyle} formatter={fmtWanLabel} />
              <Bar dataKey="totalValue" name="库存值(万)" radius={[0, 4, 4, 0]}>
                {warehouseDetail.map((d, i) => (
                  <Cell key={i} fill={PLATFORM_COLORS[d.platform] ?? NEON_PALETTE[i % NEON_PALETTE.length]} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="库存周转率趋势" subtitle="ComposedChart 双轴" delay={500}>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={turnoverTrend} margin={{ left: 10, right: 20 }}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="month" tick={axisTickStyle} />
            <YAxis yAxisId="left" tick={axisTickStyle} label={{ value: "周转率", angle: -90, position: "insideLeft", fill: "hsl(215 12% 55%)", fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} label={{ value: "天数", angle: 90, position: "insideRight", fill: "hsl(215 12% 55%)", fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Bar yAxisId="left" dataKey="turnover" name="周转率(次)" fill={NEON_PALETTE[0]} radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" dataKey="days" name="库存天数" stroke={NEON_PALETTE[3]} strokeWidth={2} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="库存账龄分析" subtitle="BarChart 堆叠" className="lg:col-span-3" delay={600}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={agingChart} margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="platform" tick={{ ...axisTickStyle, fontSize: 10 }} />
              <YAxis tick={axisTickStyle} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              {agingBuckets.map((bucket, i) => (
                <Bar key={bucket} dataKey={bucket} stackId="a" fill={AGING_COLORS[i]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="库存持有成本趋势" subtitle="AreaChart 堆叠" className="lg:col-span-2" delay={700}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={holdingTrend} margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} />
              <YAxis tick={axisTickStyle} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Area type="monotone" dataKey="storageFee" name="仓储费" stackId="1" fill={NEON_PALETTE[0]} stroke={NEON_PALETTE[0]} fillOpacity={0.6} />
              <Area type="monotone" dataKey="insurance" name="保险费" stackId="1" fill={NEON_PALETTE[1]} stroke={NEON_PALETTE[1]} fillOpacity={0.6} />
              <Area type="monotone" dataKey="depreciation" name="折旧" stackId="1" fill={NEON_PALETTE[2]} stroke={NEON_PALETTE[2]} fillOpacity={0.6} />
              <Area type="monotone" dataKey="handlingFee" name="操作费" stackId="1" fill={NEON_PALETTE[4]} stroke={NEON_PALETTE[4]} fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="库存量 vs 销售速度" subtitle="ScatterChart" className="lg:col-span-2" delay={800}>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="stockLevel" name="库存量" tick={axisTickStyle} />
              <YAxis dataKey="salesVelocity" name="日均销量" tick={axisTickStyle} />
              <ZAxis dataKey="daysOfStock" range={[40, 300]} name="可售天数" />
              <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={stockVsSales}>
                {stockVsSales.map((d, i) => (
                  <Cell key={i} fill={PLATFORM_COLORS[d.platform] ?? NEON_PALETTE[0]} fillOpacity={0.75} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {Object.entries(PLATFORM_COLORS).map(([name, color]) => (
              <span key={name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                {name}
              </span>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="安全库存监控" subtitle="BarChart + ReferenceLine" className="lg:col-span-3" delay={900}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={safetyChart} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis type="number" tick={axisTickStyle} />
              <YAxis type="category" dataKey="skuName" tick={{ ...axisTickStyle, fontSize: 9 }} width={100} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <ReferenceLine x={avgSafety} stroke="hsl(38 92% 50%)" strokeDasharray="5 5" label={{ value: "平均安全线", fill: "hsl(38 92% 50%)", fontSize: 10, position: "top" }} />
              <Bar dataKey="currentStock" name="当前库存" radius={[0, 4, 4, 0]}>
                {safetyChart.map((d, i) => (
                  <Cell key={i} fill={d.status === "critical" ? "hsl(0 72% 51%)" : d.status === "warning" ? "hsl(38 92% 50%)" : "hsl(142 71% 45%)"} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {reorderAlerts.length > 0 && (
        <ChartCard title="补货预警列表" subtitle={`${reorderAlerts.length} 项需关注`} delay={1000}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-2 px-3">SKU</th>
                  <th className="text-left py-2 px-3">平台</th>
                  <th className="text-right py-2 px-3">当前库存</th>
                  <th className="text-right py-2 px-3">补货点</th>
                  <th className="text-right py-2 px-3">建议采购量</th>
                  <th className="text-center py-2 px-3">紧急度</th>
                </tr>
              </thead>
              <tbody>
                {reorderAlerts.map((alert, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-2 px-3 text-foreground font-medium">{alert.skuName}</td>
                    <td className="py-2 px-3">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ background: PLATFORM_COLORS[alert.platform] ?? NEON_PALETTE[0] }} />
                        <span className="text-muted-foreground">{alert.platform}</span>
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right text-foreground">{alert.currentStock}</td>
                    <td className="py-2 px-3 text-right text-muted-foreground">{alert.reorderPoint}</td>
                    <td className="py-2 px-3 text-right text-primary font-medium">{alert.suggestedQty}</td>
                    <td className="py-2 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        alert.urgency === "high" ? "bg-red-500/20 text-red-400" :
                        alert.urgency === "medium" ? "bg-amber-500/20 text-amber-400" :
                        "bg-emerald-500/20 text-emerald-400"
                      }`}>
                        {alert.urgency === "high" ? "紧急" : alert.urgency === "medium" ? "警告" : "正常"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      )}
    </div>
  )
}
