import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area, ScatterChart, Scatter, Cell, ZAxis, Treemap,
  RadialBarChart, RadialBar, FunnelChart, Funnel, LabelList, ComposedChart, Line,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts"
import { ChartCard } from "../ChartCard"
import { KpiCard } from "../KpiCard"
import { useFilteredData } from "../FilterContext"
import { conversionFunnel } from "@/data/biData"
import { tooltipStyle, axisTickStyle, gridProps, PLATFORM_COLORS, NEON_PALETTE } from "@/lib/chartTheme"

function formatNum(n: number): string {
  if (n >= 10000000) return (n / 10000).toFixed(0) + "万"
  if (n >= 10000) return (n / 10000).toFixed(1) + "万"
  if (n >= 1000) return (n / 1000).toFixed(1) + "k"
  return String(n)
}

export function AdAnalysisTab() {
  const { adMetrics, adCampaignData, adWeeklySpend, adScatterData, platformData } = useFilteredData()

  // KPI
  const totalSpend = adMetrics.reduce((s, d) => s + d.spend, 0)
  const totalClicks = adMetrics.reduce((s, d) => s + d.clicks, 0)
  const totalRevenue = adCampaignData.reduce((s, d) => s + d.revenue, 0)
  const overallROAS = totalSpend > 0 ? Math.round((totalRevenue / totalSpend) * 10) / 10 : 0
  const overallACoS = totalRevenue > 0 ? Math.round((totalSpend / totalRevenue) * 1000) / 10 : 0

  const kpis = [
    { label: "总广告花费", value: totalSpend.toFixed(1), unit: "万元", icon: "DollarSign" },
    { label: "综合 ACoS", value: String(overallACoS), unit: "%", icon: "Percent" },
    { label: "综合 ROAS", value: String(overallROAS), unit: "", icon: "Target" },
    { label: "总点击量", value: formatNum(totalClicks), unit: "", icon: "MousePointerClick" },
  ]

  // 漏斗图
  const funnelData = conversionFunnel

  // 广告活动对比（纵向分组条形图）
  const campaignBarData = adCampaignData.map((c) => ({
    name: c.campaign.length > 12 ? c.campaign.slice(0, 12) + "\u2026" : c.campaign,
    花费: c.spend,
    收入: c.revenue,
  }))

  // 广告周花费堆叠面积
  const weeks = [...new Set(adWeeklySpend.map((d) => d.week))]
  const weeklyAreaData = weeks.map((w) => {
    const row: Record<string, string | number> = { week: w }
    platformData.forEach((p) => {
      const rec = adWeeklySpend.find((d) => d.week === w && d.platform === p.name)
      row[p.name] = rec?.spend ?? 0
    })
    return row
  })

  // ROAS 仪表盘
  const roasGauge = adMetrics.map((a) => ({
    name: a.platform,
    value: Math.round(a.roas * 15),
    rawValue: a.roas,
    fill: PLATFORM_COLORS[a.platform] ?? NEON_PALETTE[0],
  }))

  // 新增：曝光量 & 点击量对比
  const exposureClickData = adMetrics.map((a) => ({
    name: a.platform,
    曝光量: Math.round(a.impressions / 10000),
    点击量: Math.round(a.clicks / 10000),
    CTR: Math.round((a.clicks / a.impressions) * 1000) / 10,
  }))

  // 新增：各平台 ACoS 对比
  const acosCompare = adMetrics.map((a) => ({
    name: a.platform,
    ACoS: a.acos,
    ROAS: a.roas,
  }))

  // 新增：广告雷达图（归一化）
  const adRadar = [
    { metric: "花费", ...Object.fromEntries(adMetrics.map((a) => [a.platform, Math.round((a.spend / 40) * 100)])) },
    { metric: "ROAS", ...Object.fromEntries(adMetrics.map((a) => [a.platform, Math.round(a.roas * 15)])) },
    { metric: "点击量", ...Object.fromEntries(adMetrics.map((a) => [a.platform, Math.round((a.clicks / 900000) * 100)])) },
    { metric: "CTR", ...Object.fromEntries(adMetrics.map((a) => [a.platform, Math.round((a.clicks / a.impressions) * 2500)])) },
    { metric: "转化率", ...Object.fromEntries(adMetrics.map((a) => [a.platform, Math.round((100 - a.acos) * 1.2)])) },
    { metric: "低ACoS", ...Object.fromEntries(adMetrics.map((a) => [a.platform, Math.round((100 - a.acos) * 1.3)])) },
  ]

  // 广告预算分配 Treemap
  const treemapSpend = adCampaignData.map((c) => ({
    name: c.campaign.length > 12 ? c.campaign.slice(0, 12) + "\u2026" : c.campaign,
    size: c.spend,
    fill: PLATFORM_COLORS[c.platform] ?? NEON_PALETTE[0],
  }))

  // CPC & CPM 对比
  const cpcCpmData = adMetrics.map((a) => ({
    name: a.platform,
    CPC: a.clicks > 0 ? Math.round((a.spend / a.clicks) * 10000 * 100) / 100 : 0,
    CPM: a.impressions > 0 ? Math.round((a.spend / a.impressions) * 10000 * 100) / 100 : 0,
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k, i) => <KpiCard key={k.label} {...k} delay={i * 80} />)}
      </div>

      {/* 漏斗 + 活动对比 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="广告转化漏斗" subtitle="FunnelChart" className="lg:col-span-2" delay={200}>
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [formatNum(v as number), "数量"]} />
              <Funnel dataKey="value" data={funnelData} isAnimationActive>
                {funnelData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} stroke="none" />
                ))}
                <LabelList position="center" fill="hsl(210 20% 92%)" fontSize={11} />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="广告活动效果对比" subtitle="花费 vs 收入" className="lg:col-span-3" delay={300}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignBarData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" tick={{ ...axisTickStyle, fontSize: 9 }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={50} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="花费" fill={NEON_PALETTE[5]} radius={[3, 3, 0, 0]} barSize={14} />
              <Bar dataKey="收入" fill={NEON_PALETTE[0]} radius={[3, 3, 0, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 散点图 + 周花费趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="广告花费 vs 收入" subtitle="气泡大小 = ROAS" className="lg:col-span-2" delay={400}>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid {...gridProps} />
              <XAxis type="number" dataKey="spend" name="花费" unit="万" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis type="number" dataKey="revenue" name="收入" unit="万" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <ZAxis type="number" dataKey="roas" range={[60, 400]} name="ROAS" />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v, name) => [name === "ROAS" ? String(v) : `${v} 万元`, name]}
                labelFormatter={() => ""}
              />
              <Scatter data={adScatterData}>
                {adScatterData.map((d, i) => (
                  <Cell key={i} fill={PLATFORM_COLORS[d.platform] ?? NEON_PALETTE[0]} fillOpacity={0.8} />
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

        <ChartCard title="广告周花费趋势" subtitle="堆叠面积图" className="lg:col-span-3" delay={500}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={weeklyAreaData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="week" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} 万元`]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              {platformData.map((p) => (
                <Area key={p.name} type="monotone" dataKey={p.name} stackId="1" stroke={p.color} fill={p.color} fillOpacity={0.25} strokeWidth={1.5} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ROAS 仪表盘 */}
      <ChartCard title="各平台 ROAS 仪表盘" subtitle="RadialBarChart" delay={600}>
        <ResponsiveContainer width="100%" height={280}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="85%" data={roasGauge} startAngle={180} endAngle={0}>
            <RadialBar background={{ fill: "hsl(230 16% 18%)" }} dataKey="value" cornerRadius={6} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}`, "ROAS 指数"]} />
            <Legend iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 曝光点击对比 + ACoS对比 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="各平台曝光量 & 点击量" subtitle="ComposedChart · 万为单位" className="lg:col-span-3" delay={700}>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={exposureClickData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar yAxisId="left" dataKey="曝光量" fill={NEON_PALETTE[1]} radius={[3, 3, 0, 0]} barSize={24} />
              <Bar yAxisId="left" dataKey="点击量" fill={NEON_PALETTE[0]} radius={[3, 3, 0, 0]} barSize={24} />
              <Line yAxisId="right" type="monotone" dataKey="CTR" name="CTR(%)" stroke={NEON_PALETTE[4]} strokeWidth={2.5} dot={{ fill: NEON_PALETTE[4], r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="ACoS & ROAS 对比" subtitle="分组条形图" className="lg:col-span-2" delay={800}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={acosCompare}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" tick={{ ...axisTickStyle, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [name === "ACoS" ? `${v}%` : String(v), name]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="ACoS" fill={NEON_PALETTE[5]} radius={[3, 3, 0, 0]} barSize={16} />
              <Bar dataKey="ROAS" fill={NEON_PALETTE[3]} radius={[3, 3, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* 广告能力雷达 */}
      <ChartCard title="平台广告能力雷达" subtitle="RadarChart · 多维度对比" delay={900}>
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={adRadar} cx="50%" cy="50%" outerRadius="72%">
            <PolarGrid stroke="hsl(230 16% 22%)" />
            <PolarAngleAxis dataKey="metric" tick={{ ...axisTickStyle, fontSize: 11 }} />
            <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
            {platformData.map((p) => (
              <Radar key={p.name} name={p.name} dataKey={p.name} stroke={p.color} fill={p.color} fillOpacity={0.12} strokeWidth={2} />
            ))}
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 广告预算分配 + CPC CPM 对比 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ChartCard title="广告预算分配" subtitle="Treemap" className="lg:col-span-2" delay={1000}>
          <ResponsiveContainer width="100%" height={280}>
            <Treemap data={treemapSpend} dataKey="size" aspectRatio={4 / 3} stroke="hsl(230 16% 20%)" />
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="CPC & CPM 对比" subtitle="ComposedChart · 双轴" className="lg:col-span-3" delay={1100}>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={cpcCpmData}>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={axisTickStyle} axisLine={false} tickLine={false} unit=" 元" />
              <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} axisLine={false} tickLine={false} unit=" 元" />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: unknown, name: unknown) => [`${v} 元`, name as string]} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar yAxisId="left" dataKey="CPC" fill={NEON_PALETTE[1]} radius={[3, 3, 0, 0]} barSize={28} />
              <Line yAxisId="right" type="monotone" dataKey="CPM" stroke={NEON_PALETTE[4]} strokeWidth={2.5} dot={{ fill: NEON_PALETTE[4], r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
