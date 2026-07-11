// 团队建设与核心招聘 — 数据层

// ─── Section 1: 团队结构概览 ───

export interface TeamRole {
  role: string
  count: number
  color: string
  description: string
}

export interface TeamGrowthPoint {
  date: string
  headcount: number
  event: string
}

export interface RoleCoverage {
  role: string
  required: number
  actual: number
  coverageRate: number
}

// ─── Section 2: 核心招聘成果 ───

export interface RecruitmentFunnel {
  stage: string
  count: number
  fill: string
}

export interface HiringTimeline {
  date: string
  role: string
  name: string
  source: string
}

export interface ChannelEffectiveness {
  channel: string
  resumes: number
  interviews: number
  offers: number
  hired: number
  costPerHire: number
  avgDays: number
}

export interface RecruitmentCycle {
  role: string
  requirementDays: number
  sourcingDays: number
  interviewDays: number
  offerDays: number
  onboardDays: number
  totalDays: number
}

// ─── Section 3: 团队留存与成长 ───

export interface RetentionTrend {
  period: string
  retentionRate: number
  turnoverCount: number
}

export interface TrainingRecord {
  category: string
  planned: number
  completed: number
  participants: number
  satisfactionScore: number
}

export interface PerformanceDistribution {
  level: string
  count: number
  percentage: number
  fill: string
}

export interface PromotionPath {
  fromRole: string
  toRole: string
  count: number
  avgMonths: number
}

// ─── Section 4: 团队效能指标 ───

export interface ProductivityMetric {
  period: string
  perCapitaOutput: number
  teamTarget: number
}

export interface KpiAchievement {
  dimension: string
  target: number
  actual: number
  achievementRate: number
  fill: string
}

export interface CrossDeptProject {
  project: string
  teamRole: string
  participants: number
  duration: string
  outcome: string
  satisfactionScore: number
}

// ═══════════════════════════════════════
// 数据常量
// ═══════════════════════════════════════

import { NEON_PALETTE } from "@/lib/chartTheme"

// ─── 1. 团队角色构成 (BI=7, DE=2, RPA=2, PE=1, Lead=1 = 13) ───
export const teamRoles: TeamRole[] = [
  { role: "BI 分析师", count: 7, color: NEON_PALETTE[1], description: "数据可视化、报表开发、业务洞察" },
  { role: "数据工程师", count: 2, color: NEON_PALETTE[0], description: "数据管道、ETL、数仓建模" },
  { role: "RPA 开发", count: 2, color: NEON_PALETTE[2], description: "流程自动化、脚本开发" },
  { role: "流程专家", count: 1, color: NEON_PALETTE[3], description: "SOP 标准化、迁移考核" },
  { role: "数据组长", count: 1, color: NEON_PALETTE[4], description: "团队管理、架构设计" },
]

// ─── 2. 团队规模时间线（半年度，4→13） ───
export const teamGrowthTimeline: TeamGrowthPoint[] = [
  { date: "2022-H1", headcount: 4, event: "核心团队组建" },
  { date: "2022-H2", headcount: 7, event: "BI 与 RPA 加入" },
  { date: "2023-H1", headcount: 10, event: "二期扩充" },
  { date: "2023-H2", headcount: 11, event: "架构补强" },
  { date: "2024-H1", headcount: 12, event: "BI 深化" },
  { date: "2024-H2", headcount: 13, event: "团队满编" },
]

// ─── 3. 关键角色覆盖率 ───
export const roleCoverage: RoleCoverage[] = [
  { role: "BI 分析师", required: 7, actual: 7, coverageRate: 100 },
  { role: "数据工程师", required: 2, actual: 2, coverageRate: 100 },
  { role: "RPA 开发", required: 2, actual: 2, coverageRate: 100 },
  { role: "流程专家", required: 1, actual: 1, coverageRate: 100 },
  { role: "数据组长", required: 1, actual: 1, coverageRate: 100 },
]

// ─── 4. 招聘漏斗 ───
export const recruitmentFunnel: RecruitmentFunnel[] = [
  { stage: "需求发布", count: 320, fill: NEON_PALETTE[0] },
  { stage: "简历筛选", count: 180, fill: NEON_PALETTE[1] },
  { stage: "初面", count: 85, fill: NEON_PALETTE[2] },
  { stage: "复面", count: 42, fill: NEON_PALETTE[3] },
  { stage: "Offer", count: 22, fill: NEON_PALETTE[4] },
  { stage: "入职", count: 13, fill: NEON_PALETTE[6] },
]

// ─── 5. 关键岗位入职时间线 (DE=2, BI=7, RPA=2, PE=1, Lead=1) ───
export const hiringTimeline: HiringTimeline[] = [
  { date: "2022-01", role: "数据组长", name: "TL-01", source: "猎头" },
  { date: "2022-03", role: "数据工程师", name: "DE-01", source: "猎聘" },
  { date: "2022-04", role: "数据工程师", name: "DE-02", source: "Boss直聘" },
  { date: "2022-06", role: "BI 分析师", name: "BI-01", source: "内推" },
  { date: "2022-07", role: "BI 分析师", name: "BI-02", source: "Boss直聘" },
  { date: "2022-09", role: "RPA 开发", name: "RPA-01", source: "Boss直聘" },
  { date: "2022-10", role: "流程专家", name: "SOP-01", source: "内推" },
  { date: "2022-12", role: "BI 分析师", name: "BI-03", source: "技术社区" },
  { date: "2023-02", role: "BI 分析师", name: "BI-04", source: "猎聘" },
  { date: "2023-04", role: "BI 分析师", name: "BI-05", source: "Boss直聘" },
  { date: "2023-07", role: "RPA 开发", name: "RPA-02", source: "内推" },
  { date: "2024-01", role: "BI 分析师", name: "BI-06", source: "猎聘" },
  { date: "2024-06", role: "BI 分析师", name: "BI-07", source: "技术社区" },
]

// ─── 6. 渠道效果对比 ───
export const channelEffectiveness: ChannelEffectiveness[] = [
  { channel: "猎聘", resumes: 95, interviews: 32, offers: 8, hired: 4, costPerHire: 8500, avgDays: 32 },
  { channel: "Boss直聘", resumes: 110, interviews: 45, offers: 10, hired: 4, costPerHire: 3200, avgDays: 25 },
  { channel: "内推", resumes: 35, interviews: 22, offers: 6, hired: 3, costPerHire: 5000, avgDays: 18 },
  { channel: "猎头", resumes: 25, interviews: 12, offers: 4, hired: 2, costPerHire: 25000, avgDays: 40 },
  { channel: "技术社区", resumes: 55, interviews: 18, offers: 3, hired: 2, costPerHire: 1500, avgDays: 35 },
]

// ─── 7. 招聘周期分解 ───
export const recruitmentCycle: RecruitmentCycle[] = [
  { role: "数据工程师", requirementDays: 3, sourcingDays: 10, interviewDays: 7, offerDays: 5, onboardDays: 10, totalDays: 35 },
  { role: "BI 分析师", requirementDays: 2, sourcingDays: 8, interviewDays: 6, offerDays: 4, onboardDays: 8, totalDays: 28 },
  { role: "RPA 开发", requirementDays: 3, sourcingDays: 12, interviewDays: 8, offerDays: 6, onboardDays: 12, totalDays: 41 },
  { role: "流程专家", requirementDays: 2, sourcingDays: 7, interviewDays: 5, offerDays: 3, onboardDays: 7, totalDays: 24 },
]

// ─── 8. 留存率趋势（均值 = 92.3%） ───
export const retentionTrend: RetentionTrend[] = [
  { period: "2022-H1", retentionRate: 100, turnoverCount: 0 },
  { period: "2022-H2", retentionRate: 100, turnoverCount: 0 },
  { period: "2023-H1", retentionRate: 95, turnoverCount: 1 },
  { period: "2023-H2", retentionRate: 92, turnoverCount: 1 },
  { period: "2024-H1", retentionRate: 83, turnoverCount: 2 },
  { period: "2024-H2", retentionRate: 84, turnoverCount: 1 },
]

// ─── 9. 培训完成情况 ───
export const trainingRecords: TrainingRecord[] = [
  { category: "数据技能", planned: 12, completed: 11, participants: 52, satisfactionScore: 92 },
  { category: "业务理解", planned: 8, completed: 8, participants: 38, satisfactionScore: 88 },
  { category: "工具使用", planned: 10, completed: 9, participants: 45, satisfactionScore: 95 },
  { category: "流程规范", planned: 6, completed: 6, participants: 30, satisfactionScore: 90 },
]

// ─── 10. 绩效分布 ───
export const performanceDistribution: PerformanceDistribution[] = [
  { level: "S", count: 3, percentage: 23.1, fill: NEON_PALETTE[3] },
  { level: "A", count: 6, percentage: 46.2, fill: NEON_PALETTE[0] },
  { level: "B", count: 3, percentage: 23.1, fill: NEON_PALETTE[4] },
  { level: "C", count: 1, percentage: 7.7, fill: NEON_PALETTE[5] },
]

// ─── 11. 晋升路径 ───
export const promotionPaths: PromotionPath[] = [
  { fromRole: "初级 BI", toRole: "高级 BI", count: 3, avgMonths: 14 },
  { fromRole: "初级 DE", toRole: "高级 DE", count: 1, avgMonths: 12 },
  { fromRole: "RPA 开发", toRole: "RPA 负责人", count: 1, avgMonths: 10 },
]

// ─── 12. 人均产出趋势（团队目标替代行业基准） ───
export const productivityMetrics: ProductivityMetric[] = [
  { period: "2022-H1", perCapitaOutput: 65, teamTarget: 70 },
  { period: "2022-H2", perCapitaOutput: 78, teamTarget: 75 },
  { period: "2023-H1", perCapitaOutput: 88, teamTarget: 82 },
  { period: "2023-H2", perCapitaOutput: 95, teamTarget: 88 },
  { period: "2024-H1", perCapitaOutput: 102, teamTarget: 93 },
  { period: "2024-H2", perCapitaOutput: 108, teamTarget: 98 },
]

// ─── 13. KPI 达成率 ───
export const kpiAchievement: KpiAchievement[] = [
  { dimension: "数据质量", target: 95, actual: 97, achievementRate: 102.1, fill: NEON_PALETTE[0] },
  { dimension: "交付及时率", target: 90, actual: 92, achievementRate: 102.2, fill: NEON_PALETTE[1] },
  { dimension: "需求响应", target: 85, actual: 88, achievementRate: 103.5, fill: NEON_PALETTE[3] },
  { dimension: "创新贡献", target: 80, actual: 76, achievementRate: 95.0, fill: NEON_PALETTE[4] },
  { dimension: "协作评分", target: 90, actual: 91, achievementRate: 101.1, fill: NEON_PALETTE[2] },
]

// ─── 14. 跨部门项目 ───
export const crossDeptProjects: CrossDeptProject[] = [
  { project: "数据中台建设", teamRole: "架构主导", participants: 8, duration: "6个月", outcome: "优秀", satisfactionScore: 96 },
  { project: "ERP 数据清洗", teamRole: "核心开发", participants: 5, duration: "3个月", outcome: "优秀", satisfactionScore: 93 },
  { project: "Quick BI 看板", teamRole: "数据支撑", participants: 6, duration: "4个月", outcome: "优秀", satisfactionScore: 95 },
  { project: "广告投放优化", teamRole: "数据分析", participants: 4, duration: "2个月", outcome: "良好", satisfactionScore: 88 },
  { project: "财务自动化对账", teamRole: "流程设计", participants: 3, duration: "2个月", outcome: "良好", satisfactionScore: 85 },
  { project: "供应链预测模型", teamRole: "模型开发", participants: 4, duration: "3个月", outcome: "达标", satisfactionScore: 82 },
]

// ─── KPI 汇总 ───
export const teamKpiSummary = {
  teamSizeDisplay: "4~13",
  avgRetentionRate: 92.3,
  avgHireDays: 28,
  kpiAchievementRate: 94.5,
}

// ─── 跨部门协作雷达聚合 ───
export const crossDeptRadar = (() => {
  const total = crossDeptProjects.length
  const avgSat = Math.round(crossDeptProjects.reduce((s, p) => s + p.satisfactionScore, 0) / total * 10) / 10
  const totalParticipants = crossDeptProjects.reduce((s, p) => s + p.participants, 0)
  const maxTeamSize = 13
  const coverage = Math.round((totalParticipants / (maxTeamSize * total)) * 100 * 10) / 10
  const excellentCount = crossDeptProjects.filter((p) => p.outcome === "优秀").length
  const deliveryRate = Math.round((excellentCount / total) * 100 * 10) / 10

  return [
    { dimension: "项目数量", value: Math.round((total / 8) * 100) },
    { dimension: "平均满意度", value: Math.round(avgSat) },
    { dimension: "团队覆盖率", value: Math.round(coverage) },
    { dimension: "交付及时率", value: Math.round(deliveryRate) },
    { dimension: "创新贡献", value: 78 },
    { dimension: "业务影响力", value: Math.round(avgSat * 0.95) },
  ]
})()
