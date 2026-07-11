import { useNavigate } from "react-router-dom"
import {
  ArrowLeft, Database, ChevronRight, Layers, Zap, Globe,
} from "lucide-react"
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, Line,
  Legend, LabelList,
} from "recharts"
import { ChartCard } from "@/components/bi/ChartCard"
import { KpiCard } from "@/components/bi/KpiCard"
import {
  tooltipStyle, tooltipLabelStyle, tooltipItemStyle,
  axisTickStyle, gridProps, NEON_PALETTE,
} from "@/lib/chartTheme"
import {
  rdsKpiSummary, archLayers, dataSources, layerGrowth,
  etlJobMetrics, etlDailyRun, monthlyBusinessFlow,
  platformIntegration, integrationTimeline, storeDataCoverage,
} from "@/data/rdsData"

const fmtPct = (v: unknown) => [`${v}%`]
const fmtNum = (v: unknown) => [`${v}`]

export default function RdsArchitecturePage() {
  const navigate = useNavigate()

  const kpis = [
    { label: "累计数据量", value: rdsKpiSummary.totalDataVolume, unit: "TB", icon: "Database" },
    { label: "数据表总数", value: String(rdsKpiSummary.tableCount), unit: "张", icon: "HardDrive" },
    { label: "ETL 作业数", value: String(rdsKpiSummary.etlJobCount), unit: "个", icon: "Server" },
    { label: "系统可用性", value: String(rdsKpiSummary.availabilityRate), unit: "%", change: 0.3, icon: "Activity" },
  ]

  // Pie data: data sources by tables
  const sourcePieData = dataSources.map((s) => ({ name: s.source, value: s.tables, color: s.color }))

  // Layer growth for stacked area
  const growthData = layerGrowth.map((g) => ({
    month: g.month.slice(2), // "22-06" etc
    ODS: g.ods,
    DWD: g.dwd,
    DWS: g.dws,
    ADS: g.ads,
  }))

  // ETL job bar
  const etlBarData = etlJobMetrics.map((j) => ({
    name: j.category,
    count: j.count,
    successRate: j.successRate,
  }))

  // ETL daily run
  const dailyRunData = etlDailyRun.map((d) => ({
    date: d.date.slice(5), // MM-DD
    totalRuns: d.totalRuns,
    successRuns: d.successRuns,
    failedRuns: d.failedRuns,
    avgDuration: d.avgDuration,
  }))

  // Monthly business flow data
  const businessFlowData = monthlyBusinessFlow.map((m) => ({
    month: m.month.slice(2),
    ERP数据: m.erpVolume,
    RPA采集: m.rpaVolume,
    线下录入: m.offlineVolume,
    合计: m.total,
  }))

  // Platform integration bar
  const platformBarData = platformIntegration.map((p) => ({
    name: p.platform,
    店铺数: p.stores,
    color: p.color,
  }))

  // Store coverage bar
  const coverageData = storeDataCoverage.map((s) => ({
    name: s.platform,
    coverageRate: s.coverageRate,
    totalStores: s.totalStores,
    connectedStores: s.connectedStores,
  }))

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* 顶部导航 */}
      <div className="max-w-7xl mx-auto mb-5 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border surface-elevated hover:border-primary/40 transition-all text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </button>
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">
            业务数据基础建设
          </h1>
        </div>
        <div className="text-xs text-muted-foreground">
          跨境电商数据运营 · 数据IT负责人
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* KPI 卡片行 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((k, i) => (
            <KpiCard key={k.label} {...k} delay={i * 80} />
          ))}
        </div>

        {/* ═══════ Section 1: 数据架构分层 ═══════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">数据架构分层</h2>
          </div>

          {/* 1.1 架构分层概览 (HTML 流程图) */}
          <ChartCard title="数据仓库四层架构" subtitle="ODS → DWD → DWS → ADS" delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {archLayers.map((layer, i) => (
                <div key={layer.layer} className="relative">
                  <div
                    className="p-4 rounded-xl border surface-elevated animate-fade-in-up"
                    style={{
                      borderColor: `${layer.color}40`,
                      animationDelay: `${100 + i * 100}ms`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold"
                        style={{ background: `${layer.color}25`, color: layer.color }}
                      >
                        {layer.layer}
                      </span>
                      <span className="text-sm font-medium text-foreground">{layer.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      {layer.description}
                    </p>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{layer.tableCount} 张表</span>
                      <span className="text-foreground font-medium">{layer.dataVolume}</span>
                    </div>
                  </div>
                  {i < archLayers.length - 1 && (
                    <div className="hidden md:flex absolute right-[-18px] top-1/2 -translate-y-1/2 z-10">
                      <ChevronRight className="w-5 h-5 text-primary/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ChartCard>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* 1.2 数据源分布 PieChart */}
            <ChartCard title="数据源分布" subtitle="按接入表数量" className="lg:col-span-2" delay={300}>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={sourcePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {sourcePieData.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={(v: unknown) => [`${v} 张`, "表数量"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {dataSources.map((s) => (
                  <div key={s.source} className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                    <span className="text-muted-foreground truncate">{s.source}</span>
                    <span className="text-foreground font-medium ml-auto">{s.dailyRows}/日</span>
                  </div>
                ))}
              </div>
            </ChartCard>

            {/* 1.3 各层数据增长趋势 (stacked AreaChart) */}
            <ChartCard title="各层数据增长趋势" subtitle="数据量 (GB)" className="lg:col-span-3" delay={400}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={growthData}>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} unit=" GB" />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={(v: unknown) => [`${v} GB`]} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Area type="monotone" dataKey="ODS" stackId="1" stroke={NEON_PALETTE[0]} fill={NEON_PALETTE[0]} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="DWD" stackId="1" stroke={NEON_PALETTE[1]} fill={NEON_PALETTE[1]} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="DWS" stackId="1" stroke={NEON_PALETTE[3]} fill={NEON_PALETTE[3]} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="ADS" stackId="1" stroke={NEON_PALETTE[4]} fill={NEON_PALETTE[4]} fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </section>

        {/* ═══════ Section 2: ETL 管道 ═══════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">ETL 数据管道</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* 2.1 ETL 作业分类 BarChart */}
            <ChartCard title="ETL 作业分类" subtitle="作业数 & 成功率" className="lg:col-span-2" delay={500}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={etlBarData} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid {...gridProps} horizontal={false} />
                  <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={80} tick={{ ...axisTickStyle, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={fmtNum} />
                  <Bar dataKey="count" name="作业数" radius={[0, 4, 4, 0]} barSize={20}>
                    {etlBarData.map((_, i) => (
                      <Cell key={i} fill={NEON_PALETTE[i % NEON_PALETTE.length]} />
                    ))}
                    <LabelList dataKey="count" position="right" style={{ fill: "hsl(210 20% 92%)", fontSize: 11 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 2.2 日运行趋势 ComposedChart */}
            <ChartCard title="ETL 日运行趋势" subtitle="近 30 天 · 运行量 & 平均耗时" className="lg:col-span-3" delay={600}>
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={dailyRunData}>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="date" tick={axisTickStyle} axisLine={false} tickLine={false} interval={4} />
                  <YAxis yAxisId="left" tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} axisLine={false} tickLine={false} unit=" min" />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar yAxisId="left" dataKey="successRuns" name="成功" fill={NEON_PALETTE[3]} radius={[2, 2, 0, 0]} barSize={6} fillOpacity={0.6} />
                  <Bar yAxisId="left" dataKey="failedRuns" name="失败" fill={NEON_PALETTE[5]} radius={[2, 2, 0, 0]} barSize={6} />
                  <Line yAxisId="right" type="monotone" dataKey="avgDuration" name="平均耗时(min)" stroke={NEON_PALETTE[4]} strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* 2.3 业务数据处理量趋势 */}
          <ChartCard title="业务数据处理量趋势" subtitle="各渠道月度数据量 (GB)" delay={700}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={businessFlowData}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} unit=" GB" />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={(v: unknown) => [`${v} GB`]} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Area type="monotone" dataKey="ERP数据" stackId="1" stroke={NEON_PALETTE[0]} fill={NEON_PALETTE[0]} fillOpacity={0.6} />
                <Area type="monotone" dataKey="RPA采集" stackId="1" stroke={NEON_PALETTE[1]} fill={NEON_PALETTE[1]} fillOpacity={0.6} />
                <Area type="monotone" dataKey="线下录入" stackId="1" stroke={NEON_PALETTE[3]} fill={NEON_PALETTE[3]} fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        {/* ═══════ Section 3: 多平台数据集成 ═══════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">多平台数据集成</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* 3.1 渠道数据量对比 BarChart */}
            <ChartCard title="数据渠道接入概况" className="lg:col-span-3" delay={800}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={platformBarData}>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
                  <Bar dataKey="店铺数" radius={[4, 4, 0, 0]} barSize={36}>
                    {platformIntegration.map((p, i) => (
                      <Cell key={i} fill={p.color} />
                    ))}
                    <LabelList dataKey="店铺数" position="top" style={{ fill: "hsl(210 20% 92%)", fontSize: 12 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {platformIntegration.map((p) => (
                  <div key={p.platform} className="p-3 rounded-lg border border-border surface-elevated text-center">
                    <div className="text-xs text-muted-foreground mb-1">{p.platform}</div>
                    <div className="text-sm font-bold text-foreground">{p.totalGMV}</div>
                    <div className="text-xs text-muted-foreground">累计 GMV · {p.totalOrders}单</div>
                  </div>
                ))}
              </div>
            </ChartCard>

            {/* 3.2 平台接入时间线 (HTML) */}
            <ChartCard title="平台接入历程" className="lg:col-span-2" delay={900}>
              <div className="relative pl-6 space-y-3 max-h-[340px] overflow-y-auto pr-2">
                <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-primary/20" />
                {integrationTimeline.map((t, i) => (
                  <div
                    key={i}
                    className="relative flex items-start gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${900 + i * 80}ms` }}
                  >
                    <div className="absolute left-[-17px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                    <span className="text-xs text-muted-foreground w-16 shrink-0 pt-0.5">{t.date}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-foreground">{t.platform}</span>
                        {t.storesConnected > 0 && (
                          <span className="px-1.5 py-0.5 rounded bg-primary/15 text-xs text-primary">
                            {t.storesConnected}店
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.milestone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>

          {/* 3.3 数据渠道覆盖率 */}
          <ChartCard title="数据渠道覆盖率" subtitle="各渠道数据接入完整度" delay={1000}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={coverageData} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid {...gridProps} horizontal={false} />
                <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" domain={[0, 110]} />
                <YAxis type="category" dataKey="name" width={100} tick={{ ...axisTickStyle, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={fmtPct} />
                <Bar dataKey="coverageRate" radius={[0, 4, 4, 0]} barSize={22}>
                  {coverageData.map((d, i) => (
                    <Cell key={i} fill={d.coverageRate >= 100 ? NEON_PALETTE[3] : NEON_PALETTE[4]} />
                  ))}
                  <LabelList dataKey="coverageRate" position="right" formatter={(v: unknown) => `${v}%`} style={{ fill: "hsl(210 20% 92%)", fontSize: 11 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>
      </div>
    </div>
  )
}
