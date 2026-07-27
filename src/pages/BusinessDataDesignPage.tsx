import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft, Database, ChevronRight, Layers, BarChart3, Activity,
  ArrowRight, ArrowDownRight, ArrowDown, Key, Link2,
} from "lucide-react"
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, Line,
  Legend, LabelList, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts"
import { ChartCard } from "@/components/bi/ChartCard"
import { KpiCard } from "@/components/bi/KpiCard"
import {
  tooltipStyle, tooltipLabelStyle, tooltipItemStyle,
  axisTickStyle, gridProps, NEON_PALETTE,
} from "@/lib/chartTheme"
import {
  businessKpiSummary, businessModules, tableSchemas, moduleRelations,
  moduleStats, fieldTypeDistribution, dataScaleTrend,
  relationshipDensity, moduleComplexity,
} from "@/data/businessData"

const fmtPct = (v: unknown) => [`${v}%`]
const fmtNum = (v: unknown) => [`${v}`]
const fmtWan = (v: unknown) => [`${v} 万条`]

export default function BusinessDataDesignPage() {
  const navigate = useNavigate()
  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const kpis = [
    { label: "业务模块数", value: String(businessKpiSummary.moduleCount), unit: "个", icon: "Layers" },
    { label: "核心数据表", value: String(businessKpiSummary.tableCount), unit: "张", icon: "Database" },
    { label: "关键字段数", value: businessKpiSummary.fieldCount, unit: "个", icon: "HardDrive" },
    { label: "数据关联度", value: String(businessKpiSummary.relationshipRate), unit: "%", icon: "Activity" },
  ]

  // Chart data
  const statsBarData = moduleStats.map((s) => ({
    name: s.moduleName,
    表数量: s.tableCount,
    字段数: s.fieldCount,
    color: s.color,
  }))

  const typePieData = fieldTypeDistribution.map((t) => ({
    name: t.typeName,
    value: t.count,
    color: t.color,
  }))

  const scaleData = dataScaleTrend.map((d) => ({
    month: d.month.slice(2),
    总记录数: d.totalRecords,
    日增量: d.dailyIncrement,
    存储量: d.storageSize,
  }))

  const complexityData = moduleComplexity.map((m) => ({
    name: m.moduleName,
    字段数: m.fieldCount,
    关联度: m.relationshipCount,
    color: m.color,
  }))

  // ER diagram: split into 3 rows
  const row1Modules = businessModules.filter((m) =>
    ["product", "procurement", "warehouse", "order", "logistics"].includes(m.id)
  )
  const returnModule = businessModules.find((m) => m.id === "return")!
  const financeModule = businessModules.find((m) => m.id === "finance")!

  // Relations for display
  const mainFlowRelations = moduleRelations.filter((r) =>
    ["product", "procurement", "warehouse", "order", "logistics"].includes(r.fromModuleId) &&
    ["procurement", "warehouse", "order", "logistics"].includes(r.toModuleId)
  )
  const branchRelations = moduleRelations.filter((r) =>
    r.fromModuleId === "order" && r.toModuleId === "return"
  )
  const convergeRelations = moduleRelations.filter((r) =>
    r.toModuleId === "finance"
  )

  // Get module by id helper
  const getModule = (id: string) => businessModules.find((m) => m.id === id)!
  const getModuleTables = (id: string) => tableSchemas.filter((t) => t.moduleId === id)

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
            跨境电商业务流程数据设计
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

        {/* ═══════ Section 1: 业务流程 ER 关系图 ═══════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">业务流程 ER 关系图</h2>
          </div>

          {/* 1.1 ER 关系图 */}
          <ChartCard title="七大模块数据流关系" subtitle="产品开发 → 采购 → 仓储 → 订单 → 物流 → 财务利润" delay={100}>
            <div className="space-y-4">
              {/* Row 1: 主链路 5 节点 */}
              <div className="grid grid-cols-1 md:grid-cols-9 gap-2 items-center">
                {row1Modules.map((mod, i) => (
                  <div key={mod.id} className="contents">
                    <div
                      className="md:col-span-1 p-3 rounded-xl border surface-elevated animate-fade-in-up"
                      style={{
                        borderColor: `${mod.color}40`,
                        animationDelay: `${100 + i * 80}ms`,
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                          style={{ background: `${mod.color}25`, color: mod.color }}
                        >
                          {mod.name}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {mod.tables.map((t) => (
                          <div key={t} className="text-[10px] text-muted-foreground truncate">{t}</div>
                        ))}
                      </div>
                      <div className="mt-2 text-[10px] text-foreground font-medium">
                        {getModuleTables(mod.id).length} 表 · {getModuleTables(mod.id).flatMap((t) => t.fields).length} 字段
                      </div>
                    </div>
                    {i < row1Modules.length - 1 && (
                      <div className="hidden md:flex col-span-1 items-center justify-center">
                        <div className="flex flex-col items-center gap-0.5">
                          <ArrowRight className="w-4 h-4 text-primary/60" />
                          <span className="text-[8px] text-muted-foreground">
                            {mainFlowRelations[i]?.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Arrow down from 订单 to 退货退款 */}
              <div className="flex justify-center md:justify-start md:pl-[42%]">
                <div className="flex flex-col items-center gap-0.5">
                  <ArrowDown className="w-4 h-4 text-primary/60" />
                  <span className="text-[8px] text-muted-foreground">
                    {branchRelations[0]?.label}
                  </span>
                </div>
              </div>

              {/* Row 2: 退货退款 */}
              <div className="flex justify-center md:justify-start md:pl-[36%]">
                <div
                  className="p-3 rounded-xl border surface-elevated animate-fade-in-up w-48"
                  style={{
                    borderColor: `${returnModule.color}40`,
                    animationDelay: "500ms",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                      style={{ background: `${returnModule.color}25`, color: returnModule.color }}
                    >
                      {returnModule.name}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {returnModule.tables.map((t) => (
                      <div key={t} className="text-[10px] text-muted-foreground truncate">{t}</div>
                    ))}
                  </div>
                  <div className="mt-2 text-[10px] text-foreground font-medium">
                    {getModuleTables("return").length} 表 · {getModuleTables("return").flatMap((t) => t.fields).length} 字段
                  </div>
                </div>
              </div>

              {/* Arrow down to 财务利润 */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-0.5">
                  <ArrowDownRight className="w-4 h-4 text-primary/60" />
                  <span className="text-[8px] text-muted-foreground">refund_id</span>
                </div>
              </div>

              {/* Row 3: 财务利润 */}
              <div className="flex justify-center">
                <div
                  className="p-3 rounded-xl border surface-elevated animate-fade-in-up w-64"
                  style={{
                    borderColor: `${financeModule.color}40`,
                    animationDelay: "650ms",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                      style={{ background: `${financeModule.color}25`, color: financeModule.color }}
                    >
                      {financeModule.name}
                    </span>
                    <span className="text-[9px] text-muted-foreground ml-auto">
                      汇聚 {convergeRelations.length} 条链路
                    </span>
                  </div>
                  <div className="space-y-1">
                    {financeModule.tables.map((t) => (
                      <div key={t} className="text-[10px] text-muted-foreground truncate">{t}</div>
                    ))}
                  </div>
                  <div className="mt-2 text-[10px] text-foreground font-medium">
                    {getModuleTables("finance").length} 表 · {getModuleTables("finance").flatMap((t) => t.fields).length} 字段
                  </div>
                </div>
              </div>
            </div>

            {/* 数据流摘要 */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-border surface-elevated">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-foreground">正向链路</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  产品→采购→仓储→订单→物流，5 个节点 4 条边
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border surface-elevated">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowDownRight className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-foreground">逆向链路</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  退货退款↔仓储/订单，售后回流处理
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border surface-elevated">
                <div className="flex items-center gap-2 mb-1">
                  <Link2 className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-foreground">汇聚链路</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  订单+物流+退货+采购+仓储→财务利润
                </p>
              </div>
            </div>
          </ChartCard>
        </section>

        {/* ═══════ Section 2: 数据统计分析 ═══════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">数据统计分析</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* 2.1 模块表与字段数量 */}
            <ChartCard title="各模块数据表与字段数量" className="lg:col-span-3" delay={200}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statsBarData} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid {...gridProps} horizontal={false} />
                  <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={72} tick={{ ...axisTickStyle, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={fmtNum} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="表数量" radius={[0, 4, 4, 0]} barSize={14}>
                    {statsBarData.map((d, i) => (
                      <Cell key={i} fill={d.color} fillOpacity={0.8} />
                    ))}
                    <LabelList dataKey="表数量" position="right" style={{ fill: "hsl(210 20% 92%)", fontSize: 10 }} />
                  </Bar>
                  <Bar dataKey="字段数" radius={[0, 4, 4, 0]} barSize={14} fillOpacity={0.5}>
                    {statsBarData.map((d, i) => (
                      <Cell key={i} fill={d.color} fillOpacity={0.45} />
                    ))}
                    <LabelList dataKey="字段数" position="right" style={{ fill: "hsl(210 20% 92%)", fontSize: 10 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 2.2 字段类型分布 */}
            <ChartCard title="字段类型分布" subtitle="按数据类型统计" className="lg:col-span-2" delay={300}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={typePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {typePieData.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={(v: unknown) => [`${v} 个`, "字段数"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-1 grid grid-cols-2 gap-1.5">
                {fieldTypeDistribution.map((t) => (
                  <div key={t.typeName} className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: t.color }} />
                    <span className="text-muted-foreground">{t.typeName}</span>
                    <span className="text-foreground font-medium ml-auto">{t.count}</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </section>

        {/* ═══════ Section 3: 数据规模与关联分析 ═══════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">数据规模与关联分析</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* 3.1 数据规模增长趋势 */}
            <ChartCard title="数据规模增长趋势" subtitle="月度记录数 (万条) & 日增量" className="lg:col-span-3" delay={400}>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={scaleData}>
                  <defs>
                    <linearGradient id="bizGrad-records" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={NEON_PALETTE[0]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={NEON_PALETTE[0]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={axisTickStyle} axisLine={false} tickLine={false} unit=" 万" />
                  <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} axisLine={false} tickLine={false} unit=" 万/日" />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={fmtWan} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Area yAxisId="left" type="monotone" dataKey="总记录数" stackId="1" stroke={NEON_PALETTE[0]} fill="url(#bizGrad-records)" strokeWidth={2} />
                  <Area yAxisId="left" type="monotone" dataKey="存储量" stackId="1" stroke={NEON_PALETTE[3]} fill={NEON_PALETTE[3]} fillOpacity={0.3} />
                  <Line yAxisId="right" type="monotone" dataKey="日增量" stroke={NEON_PALETTE[4]} strokeWidth={2} dot={{ fill: NEON_PALETTE[4], r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 3.2 模块关联密度雷达 */}
            <ChartCard title="模块关联密度" subtitle="各模块关联参与度" className="lg:col-span-2" delay={500}>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={relationshipDensity} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="hsl(230 16% 20%)" />
                  <PolarAngleAxis dataKey="dimension" tick={{ ...axisTickStyle, fontSize: 10 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                  <Radar
                    dataKey="value"
                    stroke={NEON_PALETTE[0]}
                    fill={NEON_PALETTE[0]}
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={fmtPct} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* 3.3 模块复杂度分析 */}
          <ChartCard title="模块复杂度分析" subtitle="字段数量(柱) vs 关联度(线)" delay={600}>
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={complexityData}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={axisTickStyle} axisLine={false} tickLine={false} unit=" 个" />
                <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} axisLine={false} tickLine={false} unit=" 条" />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar yAxisId="left" dataKey="字段数" radius={[4, 4, 0, 0]} barSize={28}>
                  {complexityData.map((d, i) => (
                    <Cell key={i} fill={d.color} fillOpacity={0.7} />
                  ))}
                </Bar>
                <Line yAxisId="right" type="monotone" dataKey="关联度" stroke={NEON_PALETTE[4]} strokeWidth={2} strokeDasharray="5 5" dot={{ fill: NEON_PALETTE[4], r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        {/* ═══════ Section 4: 七大模块数据表详情 ═══════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">七大模块数据表详情</h2>
          </div>

          {/* 模块选择卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {businessModules.map((mod, i) => {
              const isActive = expandedModule === mod.id
              const tables = getModuleTables(mod.id)
              const fieldCount = tables.flatMap((t) => t.fields).length
              return (
                <button
                  key={mod.id}
                  onClick={() => setExpandedModule(isActive ? null : mod.id)}
                  className={`p-3 rounded-xl border surface-elevated transition-all animate-fade-in-up text-left ${
                    isActive ? "border-primary/60 ring-1 ring-primary/30" : "border-border hover:border-primary/30"
                  }`}
                  style={{ animationDelay: `${700 + i * 60}ms` }}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                      style={{ background: `${mod.color}25`, color: mod.color }}
                    >
                      {mod.name}
                    </span>
                    <ChevronRight
                      className={`w-3 h-3 text-muted-foreground ml-auto transition-transform ${
                        isActive ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {tables.length} 表 · {fieldCount} 字段
                  </div>
                </button>
              )
            })}
          </div>

          {/* 详情面板 */}
          {expandedModule && (() => {
            const mod = getModule(expandedModule)
            const tables = getModuleTables(expandedModule)
            return (
              <ChartCard
                title={`${mod.name} — 数据表结构`}
                subtitle={mod.description}
                delay={0}
              >
                <div className="space-y-5">
                  {tables.map((table) => (
                    <div key={table.tableNameEn} className="p-4 rounded-lg border border-border surface-elevated">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-bold text-foreground">{table.tableName}</span>
                        <span className="text-xs text-muted-foreground font-mono">{table.tableNameEn}</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {table.fields.map((field) => {
                          const isPk = field.isPrimary
                          const isFk = field.isForeignKey
                          const refMod = isFk && field.refModule ? getModule(field.refModule) : null
                          return (
                            <div
                              key={field.name}
                              className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[11px] border ${
                                isPk
                                  ? "border-primary/50 bg-primary/10"
                                  : isFk
                                    ? "border-amber-500/30 bg-amber-500/5"
                                    : "border-border bg-background"
                              }`}
                            >
                              {isPk && <Key className="w-2.5 h-2.5 text-primary shrink-0" />}
                              {isFk && !isPk && <Link2 className="w-2.5 h-2.5 text-amber-400 shrink-0" />}
                              <span className={`font-mono truncate ${isPk ? "text-primary font-medium" : isFk ? "text-amber-300" : "text-foreground"}`}>
                                {field.name}
                              </span>
                              <span className="text-muted-foreground ml-auto shrink-0 text-[10px]">
                                {field.type}
                              </span>
                              {refMod && (
                                <span
                                  className="text-[8px] px-1 rounded shrink-0"
                                  style={{ background: `${refMod.color}20`, color: refMod.color }}
                                >
                                  {refMod.name}
                                </span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {/* 图例 */}
                <div className="mt-4 flex items-center gap-4 text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Key className="w-2.5 h-2.5 text-primary" />
                    <span>主键 (PK)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link2 className="w-2.5 h-2.5 text-amber-400" />
                    <span>外键 (FK)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm border border-border" />
                    <span>普通字段</span>
                  </div>
                </div>
              </ChartCard>
            )
          })()}
        </section>
      </div>
    </div>
  )
}
