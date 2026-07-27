import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft, Users, UserPlus, Heart, Gauge, ChevronRight,
} from "lucide-react"
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, RadialBarChart, RadialBar,
  ComposedChart, Line, Legend, FunnelChart, Funnel, LabelList,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts"
import { ChartCard } from "@/components/bi/ChartCard"
import { KpiCard } from "@/components/bi/KpiCard"
import {
  tooltipStyle, tooltipLabelStyle, tooltipItemStyle,
  axisTickStyle, gridProps, NEON_PALETTE,
} from "@/lib/chartTheme"
import {
  teamRoles, teamGrowthTimeline, roleCoverage,
  recruitmentFunnel, hiringTimeline, channelEffectiveness, recruitmentCycle,
  retentionTrend, trainingRecords, performanceDistribution, promotionPaths,
  productivityMetrics, kpiAchievement, crossDeptProjects,
  teamKpiSummary, crossDeptRadar,
} from "@/data/teamData"

// Formatter helpers (recharts v3: v must be unknown)
const fmtPct = (v: unknown) => [`${v}%`]
const fmtNum = (v: unknown) => [`${v} 人`]
const fmtDays = (v: unknown) => [`${v} 天`]

export default function TeamBuildingPage() {
  const navigate = useNavigate()

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // KPI cards
  const kpis = [
    { label: "团队规模", value: teamKpiSummary.teamSizeDisplay, unit: "人", icon: "Users" },
    { label: "核心留存率", value: String(teamKpiSummary.avgRetentionRate), unit: "%", change: 5.2, icon: "Heart" },
    { label: "平均招聘周期", value: String(teamKpiSummary.avgHireDays), unit: "天", change: -15, icon: "Clock" },
    { label: "KPI 达成率", value: String(teamKpiSummary.kpiAchievementRate), unit: "%", change: 3.8, icon: "Award" },
  ]

  // Pie data
  const pieData = teamRoles.map((r) => ({ name: r.role, value: r.count, color: r.color }))

  // Area chart: team growth (use full date to avoid duplicate labels)
  const growthData = teamGrowthTimeline.map((p) => ({
    period: p.date,
    headcount: p.headcount,
    event: p.event,
  }))

  // Role coverage bar
  const coverageData = roleCoverage.map((r) => ({
    name: r.role,
    coverageRate: r.coverageRate,
    required: r.required,
    actual: r.actual,
  }))

  // Channel effectiveness grouped bar
  const channelData = channelEffectiveness.map((c) => ({
    name: c.channel,
    简历: c.resumes,
    面试: c.interviews,
    入职: c.hired,
  }))

  // Recruitment cycle stacked bar
  const cycleData = recruitmentCycle.map((c) => ({
    name: c.role,
    需求确认: c.requirementDays,
    寻访: c.sourcingDays,
    面试: c.interviewDays,
    Offer: c.offerDays,
    入职等待: c.onboardDays,
  }))

  // Retention trend composed
  const retentionData = retentionTrend.map((r) => ({
    period: r.period,
    retentionRate: r.retentionRate,
    turnoverCount: r.turnoverCount,
  }))

  // Productivity composed (teamTarget instead of industryBenchmark)
  const productivityData = productivityMetrics.map((m) => ({
    period: m.period,
    perCapitaOutput: m.perCapitaOutput,
    teamTarget: m.teamTarget,
  }))

  // Radial bar for KPI
  const kpiRadialData = kpiAchievement.map((k) => ({
    name: k.dimension,
    value: k.achievementRate,
    fill: k.fill,
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
          <Users className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">
            团队建设与核心招聘
          </h1>
        </div>
        <div className="text-xs text-muted-foreground">
          跨境电商数据运营 · 数据IT负责人 从业历程
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* KPI 卡片行 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((k, i) => (
            <KpiCard key={k.label} {...k} delay={i * 80} />
          ))}
        </div>

        {/* ═══════ Section 1: 团队结构概览 ═══════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">团队结构概览</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* 1.1 团队角色构成 PieChart */}
            <ChartCard title="团队角色构成" className="lg:col-span-2" delay={100}>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {pieData.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={fmtNum} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {teamRoles.map((r) => (
                  <div key={r.role} className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: r.color }} />
                    <span className="text-muted-foreground truncate">{r.role}</span>
                    <span className="text-foreground font-medium ml-auto">{r.count}人</span>
                  </div>
                ))}
              </div>
            </ChartCard>

            {/* 1.2 团队规模增长时间线 AreaChart */}
            <ChartCard title="团队规模增长时间线" subtitle="从 4 人到 13 人的完整历程" className="lg:col-span-3" delay={200}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="teamGrad-growth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={NEON_PALETTE[0]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={NEON_PALETTE[0]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="period" tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
                    itemStyle={tooltipItemStyle}
                    formatter={(v, _name, props) => {
                      const evt = props?.payload?.event as string | undefined
                      return evt ? [`${v} 人 · ${evt}`, "团队规模"] : [`${v} 人`, "团队规模"]
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="headcount"
                    stroke={NEON_PALETTE[0]}
                    fill="url(#teamGrad-growth)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* 1.3 关键角色覆盖率 BarChart */}
          <ChartCard title="关键角色覆盖率" subtitle="编制需求 vs 实际到位" delay={300}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={coverageData} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid {...gridProps} horizontal={false} />
                <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" domain={[0, 120]} />
                <YAxis type="category" dataKey="name" width={90} tick={{ ...axisTickStyle, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={fmtPct} />
                <Bar dataKey="coverageRate" radius={[0, 4, 4, 0]} barSize={20}>
                  {coverageData.map((d, i) => (
                    <Cell key={i} fill={d.coverageRate >= 100 ? NEON_PALETTE[3] : NEON_PALETTE[4]} />
                  ))}
                  <LabelList dataKey="coverageRate" position="right" formatter={(v: unknown) => `${v}%`} style={{ fill: "hsl(210 20% 92%)", fontSize: 11 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        {/* ═══════ Section 2: 核心招聘成果 ═══════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">核心招聘成果</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* 2.1 招聘漏斗 FunnelChart */}
            <ChartCard title="招聘漏斗" subtitle="从需求到入职的全链路转化" className="lg:col-span-2" delay={400}>
              <ResponsiveContainer width="100%" height={300}>
                <FunnelChart>
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={fmtNum} />
                  <Funnel dataKey="count" data={recruitmentFunnel} isAnimationActive>
                    {recruitmentFunnel.map((e, i) => (
                      <Cell key={i} fill={e.fill} />
                    ))}
                    <LabelList position="right" fill="hsl(210 20% 92%)" stroke="none" dataKey="stage" fontSize={11} />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 2.2 渠道效果对比 BarChart */}
            <ChartCard title="招聘渠道效果对比" subtitle="简历→面试→入职转化" className="lg:col-span-3" delay={500}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={channelData}>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="简历" fill={NEON_PALETTE[0]} radius={[3, 3, 0, 0]} barSize={16} />
                  <Bar dataKey="面试" fill={NEON_PALETTE[1]} radius={[3, 3, 0, 0]} barSize={16} />
                  <Bar dataKey="入职" fill={NEON_PALETTE[3]} radius={[3, 3, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* 2.3 招聘周期分解 BarChart */}
            <ChartCard title="招聘周期分解" subtitle="各岗位平均招聘天数" className="lg:col-span-2" delay={600}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={cycleData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid {...gridProps} horizontal={false} />
                  <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} unit="天" />
                  <YAxis type="category" dataKey="name" width={80} tick={{ ...axisTickStyle, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={fmtDays} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Bar dataKey="需求确认" stackId="a" fill={NEON_PALETTE[0]} barSize={18} />
                  <Bar dataKey="寻访" stackId="a" fill={NEON_PALETTE[1]} barSize={18} />
                  <Bar dataKey="面试" stackId="a" fill={NEON_PALETTE[2]} barSize={18} />
                  <Bar dataKey="Offer" stackId="a" fill={NEON_PALETTE[4]} barSize={18} />
                  <Bar dataKey="入职等待" stackId="a" fill={NEON_PALETTE[3]} barSize={18} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 2.4 关键岗位入职时间线 (HTML) */}
            <ChartCard title="关键岗位入职时间线" subtitle="13 位核心成员的加入历程" className="lg:col-span-3" delay={700}>
              <div className="relative pl-6 space-y-3 max-h-[280px] overflow-y-auto pr-2">
                <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-primary/20" />
                {hiringTimeline.map((h, i) => (
                  <div
                    key={i}
                    className="relative flex items-start gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${700 + i * 60}ms` }}
                  >
                    <div className="absolute left-[-17px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                    <span className="text-xs text-muted-foreground w-16 shrink-0 pt-0.5">{h.date}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{h.role}</span>
                        <span className="text-xs text-muted-foreground">({h.name})</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground shrink-0">
                      {h.source}
                    </span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </section>

        {/* ═══════ Section 3: 团队留存与成长 ═══════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">团队留存与成长</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* 3.1 留存率趋势 ComposedChart */}
            <ChartCard title="留存率趋势" subtitle="留存率 & 离职人数双轴" className="lg:col-span-3" delay={800}>
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={retentionData}>
                  <defs>
                    <linearGradient id="teamGrad-retention" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={NEON_PALETTE[3]} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={NEON_PALETTE[3]} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="period" tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={axisTickStyle} axisLine={false} tickLine={false} unit="%" domain={[70, 105]} />
                  <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} axisLine={false} tickLine={false} unit="人" />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="retentionRate"
                    name="留存率(%)"
                    stroke={NEON_PALETTE[3]}
                    fill="url(#teamGrad-retention)"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="turnoverCount"
                    name="离职人数"
                    stroke={NEON_PALETTE[5]}
                    strokeWidth={2}
                    dot={{ fill: NEON_PALETTE[5], r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 3.2 绩效分布 BarChart */}
            <ChartCard title="绩效分布" subtitle="S/A/B/C 四档评定" className="lg:col-span-2" delay={900}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={performanceDistribution}>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="level" tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={fmtNum} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                    {performanceDistribution.map((d, i) => (
                      <Cell key={i} fill={d.fill} />
                    ))}
                    <LabelList dataKey="count" position="top" style={{ fill: "hsl(210 20% 92%)", fontSize: 12 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* 3.3 培训完成情况 信息卡片 */}
            <ChartCard title="培训完成情况" subtitle="4 大培训类别" className="lg:col-span-2" delay={1000}>
              <div className="grid grid-cols-2 gap-3">
                {trainingRecords.map((t) => {
                  const pct = Math.round((t.completed / t.planned) * 100)
                  return (
                    <div key={t.category} className="p-3 rounded-lg border border-border surface-elevated">
                      <div className="text-sm font-medium text-foreground mb-2">{t.category}</div>
                      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mb-2">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: NEON_PALETTE[0] }}
                        />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          {t.completed}/{t.planned} 场
                        </span>
                        <span className="text-foreground font-medium">{t.satisfactionScore}分</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {t.participants} 人次参与
                      </div>
                    </div>
                  )
                })}
              </div>
            </ChartCard>

            {/* 3.4 晋升路径 自定义卡片 */}
            <ChartCard title="晋升路径" subtitle="核心成员成长轨迹" className="lg:col-span-3" delay={1100}>
              <div className="space-y-4">
                {promotionPaths.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border surface-elevated animate-fade-in-up"
                    style={{ animationDelay: `${1100 + i * 100}ms` }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-muted text-xs text-foreground font-medium">
                          {p.fromRole}
                        </span>
                        <ChevronRight className="w-4 h-4 text-primary" />
                        <span className="px-2.5 py-1 rounded-full bg-primary/15 text-xs text-primary font-medium border border-primary/20">
                          {p.toRole}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-semibold text-foreground">{p.count} 人</div>
                      <div className="text-xs text-muted-foreground">平均 {p.avgMonths} 个月</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 额外信息：跨部门协作总结 */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground mb-3">跨部门项目参与概况</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{crossDeptProjects.length}</div>
                    <div className="text-xs text-muted-foreground">参与项目</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">
                      {Math.round(crossDeptProjects.reduce((s, p) => s + p.satisfactionScore, 0) / crossDeptProjects.length)}
                    </div>
                    <div className="text-xs text-muted-foreground">平均满意度</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">
                      {crossDeptProjects.filter((p) => p.outcome === "优秀").length}
                    </div>
                    <div className="text-xs text-muted-foreground">优秀评级</div>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        </section>

        {/* ═══════ Section 4: 团队效能指标 ═══════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">团队效能指标</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* 4.1 人均产出趋势 ComposedChart (teamTarget instead of industryBenchmark) */}
            <ChartCard title="人均产出趋势" subtitle="团队产出 vs 团队目标" className="lg:col-span-3" delay={1200}>
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={productivityData}>
                  <CartesianGrid {...gridProps} />
                  <XAxis dataKey="period" tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar
                    dataKey="perCapitaOutput"
                    name="团队产出指数"
                    fill={NEON_PALETTE[0]}
                    radius={[3, 3, 0, 0]}
                    barSize={28}
                    fillOpacity={0.7}
                  />
                  <Line
                    type="monotone"
                    dataKey="teamTarget"
                    name="团队目标"
                    stroke={NEON_PALETTE[4]}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: NEON_PALETTE[4], r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 4.2 KPI 达成率 RadialBarChart */}
            <ChartCard title="KPI 达成率" subtitle="5 大考核维度" className="lg:col-span-2" delay={1300}>
              <ResponsiveContainer width="100%" height={280}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="20%"
                  outerRadius="90%"
                  data={kpiRadialData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar background={{ fill: "hsl(230 16% 18%)" }} dataKey="value" cornerRadius={6} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={fmtPct} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* 4.3 跨部门协作雷达图 RadarChart */}
          <ChartCard title="跨部门协作能力雷达" subtitle="6 维度综合评估" delay={1400}>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={crossDeptRadar}>
                <PolarGrid stroke="hsl(230 16% 20%)" />
                <PolarAngleAxis dataKey="dimension" tick={{ ...axisTickStyle, fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ ...axisTickStyle, fontSize: 10 }} />
                <Radar
                  name="综合评分"
                  dataKey="value"
                  stroke={NEON_PALETTE[0]}
                  fill={NEON_PALETTE[0]}
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} formatter={fmtNum} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>
      </div>
    </div>
  )
}
