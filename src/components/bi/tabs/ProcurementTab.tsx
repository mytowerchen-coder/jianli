import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, PieChart, Pie, Cell, LineChart,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts"
import { ChartCard } from "../ChartCard"
import { KpiCard } from "../KpiCard"
import { useFilteredData } from "../FilterContext"
import { tooltipStyle, axisTickStyle, gridProps, PLATFORM_COLORS, NEON_PALETTE } from "@/lib/chartTheme"

function formatNum(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + "万"
  return String(n)
}

export function ProcurementTab() {
  const {
    supplierData, purchaseOrderMonthly, procurementCostBreakdown,
    deliveryPerformance, productPriceTrend, supplierRiskRadar,
    procurementKpi,
  } = useFilteredData()

  const orderTrendByMonth = purchaseOrderMonthly.reduce<Record<string, { month: string; amount: number; orders: number }>>((acc, d) => {
    if (!acc[d.month]) acc[d.month] = { month: d.month, amount: 0, orders: 0 }
    acc[d.month].amount += d.amount
    acc[d.month].orders += d.orderCount
    return acc
  }, {})
  const orderTrend = Object.values(orderTrendByMonth).map((d) => ({
    ...d, amount: Math.round(d.amount * 10) / 10,
  }))

  const supplierRank = [...supplierData].sort((a, b) => b.purchaseAmount - a.purchaseAmount).slice(0, 8).reverse()

  const costByMonth = procurementCostBreakdown.reduce<Record<string, { month: string; productCost: number; shippingCost: number; tariff: number; inspectionFee: number }>>((acc, d) => {
    if (!acc[d.month]) acc[d.month] = { month: d.month, productCost: 0, shippingCost: 0, tariff: 0, inspectionFee: 0 }
    acc[d.month].productCost += d.productCost
    acc[d.month].shippingCost += d.shippingCost
    acc[d.month].tariff += d.tariff
    acc[d.month].inspectionFee += d.inspectionFee
    return acc
  }, {})
  const costTrend = Object.values(costByMonth).map((d) => ({
    ...d,
    productCost: Math.round(d.productCost * 10) / 10,
    shippingCost: Math.round(d.shippingCost * 10) / 10,
    tariff: Math.round(d.tariff * 10) / 10,
    inspectionFee: Math.round(d.inspectionFee * 10) / 10,
  }))

  const costTotal = costTrend.reduce((acc, d) => ({
    productCost: acc.productCost + d.productCost,
    shippingCost: acc.shippingCost + d.shippingCost,
    tariff: acc.tariff + d.tariff,
    inspectionFee: acc.inspectionFee + d.inspectionFee,
  }), { productCost: 0, shippingCost: 0, tariff: 0, inspectionFee: 0 })
  const costPieData = [
    { name: "产品成本", value: Math.round(costTotal.productCost * 10) / 10 },
    { name: "运输成本", value: Math.round(costTotal.shippingCost * 10) / 10 },
    { name: "关税", value: Math.round(costTotal.tariff * 10) / 10 },
    { name: "质检费", value: Math.round(costTotal.inspectionFee * 10) / 10 },
  ]
  const COST_COLORS = [NEON_PALETTE[0], NEON_PALETTE[1], NEON_PALETTE[3], NEON_PALETTE[4]]

  const platformAmount = purchaseOrderMonthly.reduce<Record<string, number>>((acc, d) => {
    acc[d.platform] = (acc[d.platform] || 0) + d.amount
    return acc
  }, {})
  const platformCompare = Object.entries(platformAmount).map(([platform, amount]) => ({
    platform, amount: Math.round(amount * 10) / 10,
  }))

  const deliveryByMonth = deliveryPerformance.reduce<Record<string, { month: string; onTime: number; delayed: number; pending: number }>>((acc, d) => {
    if (!acc[d.month]) acc[d.month] = { month: d.month, onTime: 0, delayed: 0, pending: 0 }
    acc[d.month].onTime += d.onTime
    acc[d.month].delayed += d.delayed
    acc[d.month].pending += d.pending
    return acc
  }, {})
  const deliveryData = Object.values(deliveryByMonth)

  const productNames = [...new Set(productPriceTrend.map((d) => d.productName))]
  const priceChartData = [...new Set(productPriceTrend.map((d) => d.month))].sort().map((month) => {
    const row: Record<string, string | number> = { month }
    productNames.forEach((name) => {
      const item = productPriceTrend.find((d) => d.month === month && d.productName === name)
      row[name] = item?.unitPrice ?? 0
    })
    return row
  })

  const supplierNames = supplierData.slice(0, 6).map((s) => s.name)

  const fmtWan = (v: unknown) => [`${v} 万`]
  const fmtLabel = (v: unknown) => [`${v} 万`, "采购额"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="采购总额" value={formatNum(procurementKpi.totalAmount)} unit="万元" change={5.2} icon="Package" delay={0} />
        <KpiCard label="供应商数" value={String(procurementKpi.supplierCount)} unit="家" change={0} icon="Truck" delay={80} />
        <KpiCard label="平均交期" value={String(procurementKpi.avgLeadTime)} unit="天" change={-3.5} icon="Clock" delay={160} />
        <KpiCard label="准时交付率" value={String(procurementKpi.avgOnTimeRate)} unit="%" change={1.8} icon="CheckCircle" delay={240} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="采购订单趋势" subtitle="ComposedChart" className="lg:col-span-3" delay={300}>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={orderTrend} margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} />
              <YAxis yAxisId="left" tick={axisTickStyle} />
              <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar yAxisId="left" dataKey="amount" name="采购金额(万)" fill={NEON_PALETTE[0]} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" dataKey="orders" name="订单数" stroke={NEON_PALETTE[3]} strokeWidth={2} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="供应商采购排名 TOP 8" subtitle="BarChart" className="lg:col-span-2" delay={400}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={supplierRank} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis type="number" tick={axisTickStyle} />
              <YAxis type="category" dataKey="name" tick={{ ...axisTickStyle, fontSize: 10 }} width={90} />
              <Tooltip contentStyle={tooltipStyle} formatter={fmtLabel} />
              <Bar dataKey="purchaseAmount" radius={[0, 4, 4, 0]}>
                {supplierRank.map((_, i) => (
                  <Cell key={i} fill={NEON_PALETTE[i % NEON_PALETTE.length]} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="采购成本构成趋势" subtitle="BarChart 堆叠" className="lg:col-span-3" delay={500}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={costTrend} margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} />
              <YAxis tick={axisTickStyle} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="productCost" name="产品成本" stackId="a" fill={NEON_PALETTE[0]} />
              <Bar dataKey="shippingCost" name="运输成本" stackId="a" fill={NEON_PALETTE[1]} />
              <Bar dataKey="tariff" name="关税" stackId="a" fill={NEON_PALETTE[3]} />
              <Bar dataKey="inspectionFee" name="质检费" stackId="a" fill={NEON_PALETTE[4]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="采购成本分项占比" subtitle="PieChart" className="lg:col-span-2" delay={600}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={costPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                {costPieData.map((_, i) => (
                  <Cell key={i} fill={COST_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={fmtWan} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="各平台采购额对比" subtitle="BarChart" className="lg:col-span-2" delay={700}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={platformCompare} margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="platform" tick={{ ...axisTickStyle, fontSize: 10 }} />
              <YAxis tick={axisTickStyle} />
              <Tooltip contentStyle={tooltipStyle} formatter={fmtLabel} />
              <Bar dataKey="amount" name="采购额(万)" radius={[4, 4, 0, 0]}>
                {platformCompare.map((d, i) => (
                  <Cell key={i} fill={PLATFORM_COLORS[d.platform] ?? NEON_PALETTE[i]} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="供应商交付表现" subtitle="BarChart 堆叠" className="lg:col-span-3" delay={800}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={deliveryData} margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} />
              <YAxis tick={axisTickStyle} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="onTime" name="准时" stackId="a" fill={NEON_PALETTE[3]} />
              <Bar dataKey="delayed" name="延迟" stackId="a" fill={NEON_PALETTE[5]} />
              <Bar dataKey="pending" name="待处理" stackId="a" fill={NEON_PALETTE[4]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="重点产品价格走势" subtitle="LineChart" className="lg:col-span-3" delay={900}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={priceChartData} margin={{ left: 10, right: 20 }}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="month" tick={axisTickStyle} />
              <YAxis tick={axisTickStyle} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              {productNames.map((name, i) => (
                <Line key={name} dataKey={name} stroke={NEON_PALETTE[i % NEON_PALETTE.length]} strokeWidth={2} dot={{ r: 3 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {supplierNames.length > 0 && (
          <ChartCard title="供应商综合评估雷达" subtitle="RadarChart" className="lg:col-span-2" delay={1000}>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={supplierRiskRadar} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(230 16% 20%)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: "hsl(215 12% 55%)", fontSize: 10 }} />
                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                {supplierNames.slice(0, 4).map((name, i) => (
                  <Radar key={name} name={name} dataKey={name} stroke={NEON_PALETTE[i]} fill={NEON_PALETTE[i]} fillOpacity={0.15} strokeWidth={2} />
                ))}
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}
      </div>
    </div>
  )
}
