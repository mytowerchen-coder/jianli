import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis,
  AreaChart, Area, ReferenceLine,
} from "recharts"
import { ChartCard } from "../ChartCard"
import { KpiCard } from "../KpiCard"
import { useFilteredData } from "../FilterContext"
import { tooltipStyle, axisTickStyle, gridProps, PLATFORM_COLORS, NEON_PALETTE } from "@/lib/chartTheme"

const AGING_COLORS = ["hsl(142 71% 45%)", "hsl(38 92% 50%)", "hsl(25 95% 53%)", "hsl(0 72% 51%)", "hsl(0 72% 51%)"]
const ABC_COLORS = ["hsl(142 71% 45%)", "hsl(215 12% 50%)", "hsl(38 92% 50%)"]

const fmtWan = (v: unknown) => [`${v} 万`]
const fmtWanLabel = (v: unknown) => [`${v} 万`, "库存值"]

// 六大步骤标签
const STEPS = [
  { key: "overview", label: "一看总览", icon: "📊", color: "text-blue-600" },
  { key: "value", label: "二看价值", icon: "💰", color: "text-emerald-600" },
  { key: "structure", label: "三看结构", icon: "🏗️", color: "text-purple-600" },
  { key: "turnover", label: "四看动销", icon: "🔄", color: "text-amber-600" },
  { key: "profit", label: "五看效益", icon: "📈", color: "text-rose-600" },
  { key: "action", label: "六看动作", icon: "⚡", color: "text-cyan-600" },
]

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

  // 新增：动销分析数据
  const totalSkus = inventoryKpi.totalSkus || 100
  const activeSkus = Math.round(totalSkus * (inventoryKpi.activeRate || 0.7))
  const slowSkus = totalSkus - activeSkus
  const salesData = [
    { name: "动销SKU", value: activeSkus, color: NEON_PALETTE[0] },
    { name: "滞销SKU", value: slowSkus, color: NEON_PALETTE[2] },
  ]

  // 新增：ABC分类数据
  const abcData = [
    { category: "A类（高价值）", count: 15, percent: "15%", color: ABC_COLORS[0] },
    { category: "B类（中等价值）", count: 35, percent: "35%", color: ABC_COLORS[1] },
    { category: "C类（低价值）", count: 50, percent: "50%", color: ABC_COLORS[2] },
  ]

  // 新增：四象限分析数据
  const quadrantData = [
    { name: "高周转高毛利", x: 8, y: 30, size: 20, color: "hsl(142 71% 45%)", strategy: "重点保障，优先补货" },
    { name: "高周转低毛利", x: 6, y: 10, size: 15, color: "hsl(215 12% 50%)", strategy: "关注利润，优化成本" },
    { name: "低周转高毛利", x: 3, y: 25, size: 18, color: "hsl(38 92% 50%)", strategy: "精准备货，避免过量" },
    { name: "低周转低毛利", x: 2, y: 8, size: 12, color: "hsl(0 72% 51%)", strategy: "重点清理，减少占用" },
  ]

  // 库龄分布饼图
  const agingPieData = agingBuckets.map((bucket, i) => ({
    name: bucket,
    value: agingChart.reduce((sum, d) => sum + (Number(d[bucket]) || 0), 0),
  }))

  // 品类结构数据
  const categoryData = [
    { category: "家居收纳", value: 35, percent: "35%" },
    { category: "厨房用品", value: 25, percent: "25%" },
    { category: "户外运动", value: 20, percent: "20%" },
    { category: "数码配件", value: 12, percent: "12%" },
    { category: "其他", value: 8, percent: "8%" },
  ]

  return (
    <div className="space-y-8">
      {/* 六大步骤框架 */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-4 border border-slate-200">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {STEPS.map((step) => (
            <div key={step.key} className="flex items-center gap-2">
              <span className="text-lg">{step.icon}</span>
              <span className={`text-sm font-medium ${step.color}`}>{step.label}</span>
              {step.key !== "action" && <span className="text-muted-foreground">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 第一步：看总览 - 核心KPI */}
      <div className="border-l-4 border-blue-500 pl-4">
        <h3 className="text-lg font-semibold text-blue-600 mb-3">📊 一看总览 | 核心指标概览</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <KpiCard label="库存总值" value={String(inventoryKpi.totalValue)} unit="万元" change={2.1} icon="Warehouse" delay={0} />
        <KpiCard label="平均周转率" value={String(inventoryKpi.avgTurnover)} unit="次" change={5.8} icon="RefreshCw" delay={80} />
        <KpiCard label="平均库存天数" value={String(inventoryKpi.avgDaysOfStock)} unit="天" change={-4.2} icon="CalendarDays" delay={160} />
        <KpiCard label="缺货率" value={String(inventoryKpi.stockoutRate)} unit="%" change={-1.5} icon="AlertTriangle" delay={240} />
        <KpiCard label="动销率" value="70" unit="%" change={3.2} icon="TrendingUp" delay={320} />
        <KpiCard label="滞销金额" value="28" unit="万元" change={-8.5} icon="AlertCircle" delay={400} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="各平台库存分布" subtitle="库存金额占比" delay={300}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                {pieData.map((d, i) => (
                  <Cell key={i} fill={PLATFORM_COLORS[d.name] ?? NEON_PALETTE[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={fmtWan} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="仓库库存明细" subtitle="各仓库库存金额" delay={400}>
          <ResponsiveContainer width="100%" height={260}>
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

      {/* 第二步：看价值 */}
      <div className="border-l-4 border-emerald-500 pl-4">
        <h3 className="text-lg font-semibold text-emerald-600 mb-3">💰 二看价值 | 库存金额分析</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="品类库存金额占比" subtitle="按品类拆分" delay={500}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis type="number" tick={axisTickStyle} />
              <YAxis type="category" dataKey="category" tick={{ ...axisTickStyle, fontSize: 10 }} width={70} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" name="万元" radius={[0, 4, 4, 0]} fill={NEON_PALETTE[0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="ABC分类分析" subtitle="按金额贡献分类" delay={600}>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={abcData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={2}
                label={({ category, percent }) => `${category} ${percent}`}>
                {abcData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1">
            {abcData.map((d) => (
              <div key={d.category} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  {d.category}
                </span>
                <span className="text-muted-foreground">{d.count}个SKU</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="库存周转率趋势" subtitle="月度变化" delay={700}>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={turnoverTrend} margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} />
              <YAxis yAxisId="left" tick={axisTickStyle} label={{ value: "周转率", angle: -90, position: "insideLeft", fill: "hsl(215 12% 55%)", fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} label={{ value: "天数", angle: 90, position: "insideRight", fill: "hsl(215 12% 55%)", fontSize: 10 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar yAxisId="left" dataKey="turnover" name="周转率(次)" fill={NEON_PALETTE[0]} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" dataKey="days" name="库存天数" stroke={NEON_PALETTE[3]} strokeWidth={2} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 第三步：看结构 */}
      <div className="border-l-4 border-purple-500 pl-4">
        <h3 className="text-lg font-semibold text-purple-600 mb-3">🏗️ 三看结构 | 库龄与品类结构</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="库龄分布结构" subtitle="分层标准：0-30正常 | 31-60关注 | 61-90预警 | 90+高风险" delay={800}>
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
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {agingBuckets.map((bucket, i) => (
              <span key={bucket} className="flex items-center gap-1 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ background: AGING_COLORS[i] }} />
                {bucket}
              </span>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="库龄金额占比" subtitle="饼图视角" delay={900}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={agingPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                {agingPieData.map((d, i) => (
                  <Cell key={i} fill={AGING_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 第四步：看动销 */}
      <div className="border-l-4 border-amber-500 pl-4">
        <h3 className="text-lg font-semibold text-amber-600 mb-3">🔄 四看动销 | 动销率与SKU分析</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="动销 vs 滞销" subtitle="SKU数量维度" className="lg:col-span-2" delay={1000}>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={salesData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {salesData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {salesData.map((d) => (
              <span key={d.name} className="flex items-center gap-1 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                {d.name}：{d.value}个
              </span>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="库存量 vs 销售速度" subtitle="四象限分析" className="lg:col-span-3" delay={1100}>
          <ResponsiveContainer width="100%" height={240}>
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
      </div>

      {/* 第五步：看效益 */}
      <div className="border-l-4 border-rose-500 pl-4">
        <h3 className="text-lg font-semibold text-rose-600 mb-3">📈 五看效益 | 库存毛利回报分析</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="库存毛利回报四象限" subtitle="周转率 × 毛利率" delay={1200}>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="x" name="周转率(次)" tick={axisTickStyle} type="number" domain={[0, 10]} />
              <YAxis dataKey="y" name="毛利率(%)" tick={axisTickStyle} type="number" domain={[0, 35]} />
              <ZAxis dataKey="size" range={[100, 400]} name="SKU数量" />
              <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "3 3" }}
                formatter={(value, name) => name === "x" ? [`${value}次`, "周转率"] : [`${value}%`, "毛利率"]}
              />
              <Scatter data={quadrantData}>
                {quadrantData.map((d, i) => (
                  <Cell key={i} fill={d.color} fillOpacity={0.7} />
                ))}
              </Scatter>
              {/* 添加象限分割线 */}
              <ReferenceLine x={5} stroke="hsl(215 12% 60%)" strokeDasharray="5 5" />
              <ReferenceLine y={15} stroke="hsl(215 12% 60%)" strokeDasharray="5 5" />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {quadrantData.map((d) => (
              <div key={d.name} className="flex items-start gap-2 text-xs p-2 rounded-lg bg-muted/30">
                <span className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: d.color }} />
                <div>
                  <p className="font-medium">{d.name}</p>
                  <p className="text-muted-foreground">{d.strategy}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="库存持有成本趋势" subtitle="仓储费 + 保险 + 折旧 + 操作费" delay={1300}>
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

      {/* 第六步：看动作 */}
      <div className="border-l-4 border-cyan-500 pl-4">
        <h3 className="text-lg font-semibold text-cyan-600 mb-3">⚡ 六看动作 | 安全库存与补货预警</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="安全库存监控" subtitle="TOP 12 SKU" delay={1400}>
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

        {reorderAlerts.length > 0 && (
          <ChartCard title="补货预警列表" subtitle={`${reorderAlerts.length} 项需关注`} delay={1500}>
            <div className="overflow-x-auto max-h-72">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-background">
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 px-2">SKU</th>
                    <th className="text-right py-2 px-2">当前库存</th>
                    <th className="text-right py-2 px-2">补货点</th>
                    <th className="text-right py-2 px-2">建议量</th>
                    <th className="text-center py-2 px-2">紧急度</th>
                  </tr>
                </thead>
                <tbody>
                  {reorderAlerts.slice(0, 10).map((alert, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 px-2 font-medium truncate max-w-[80px]">{alert.skuName}</td>
                      <td className="py-2 px-2 text-right">{alert.currentStock}</td>
                      <td className="py-2 px-2 text-right text-muted-foreground">{alert.reorderPoint}</td>
                      <td className="py-2 px-2 text-right text-primary font-medium">{alert.suggestedQty}</td>
                      <td className="py-2 px-2 text-center">
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

      {/* 核心观点总结 */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h4 className="font-semibold text-amber-800 mb-3">💡 库存分析核心观点</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-700">
          <div className="flex items-start gap-2">
            <span className="text-amber-500">·</span>
            <span>库存金额高 + 低周转 = 真正风险</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500">·</span>
            <span>总库存下降不一定是好事（可能是畅销品断货）</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500">·</span>
            <span>库龄必须与处理动作挂钩</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500">·</span>
            <span>库存不是越少越好，而是要"刚刚好"</span>
          </div>
        </div>
      </div>
    </div>
  )
}
