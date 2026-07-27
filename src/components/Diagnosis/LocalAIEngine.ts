/**
 * 本地AI分析引擎
 * 彻底解决静态部署下的AI诊断问题
 * 每份报告都根据用户答案动态生成，绝不重复
 */

import { DiagnosisData, DiagnosisResult } from "./DiagnosisModal"

// 分析引擎主函数
export function analyzeDiagnosis(formData: DiagnosisData): DiagnosisResult {
  // 第一步：计算各维度评分
  const scores = calculateScores(formData)

  // 第二步：识别核心问题
  const problems = identifyProblems(formData, scores)

  // 第三步：评估风险
  const risks = evaluateRisks(formData, scores, problems)

  // 第四步：生成结论依据
  const conclusionBasis = generateConclusionBasis(formData, scores)

  // 第五步：生成升级路径
  const upgradePath = generateUpgradePath(formData, scores)

  // 第六步：生成收益预测
  const benefits = generateBenefits(formData, scores, problems)

  // 第七步：动态排序解决方案
  const solutions = rankSolutions(formData, scores, problems)

  // 第八步：生成不建议事项
  const warnings = generateWarnings(formData, scores)

  // 第九步：生成执行摘要
  const executiveSummary = generateExecutiveSummary(formData, scores, problems)

  // 第十步：生成下一步建议
  const nextSteps = generateNextSteps(formData, scores)

  return {
    maturityScore: scores.overall,
    maturityLevel: getMaturityLevel(scores.overall),
    maturityComment: generateMaturityComment(scores, problems),
    executiveSummary,
    conclusionBasis,
    problems,
    risks,
    upgradePath,
    priorityAction: solutions[0]?.title || "统一经营数据",
    benefits,
    solutions,
    warnings,
    nextSteps
  }
}

// 计算各维度评分
function calculateScores(formData: DiagnosisData) {
  let dataFoundation = 0      // 数据基础
  let processAutomation = 0   // 流程自动化
  let aiMaturity = 0         // AI成熟度
  let dataDriven = 0         // 数据驱动

  // 数据基础评分
  if (formData.dataView === "有统一的数据看板") dataFoundation += 40
  else if (formData.dataView === "有固定统计表") dataFoundation += 25
  else if (formData.dataView === "每个人自己做Excel") dataFoundation += 10

  if (formData.dataSharing === "基本已经打通") dataFoundation += 35
  else if (formData.dataSharing === "Excel互传") dataFoundation += 20
  else if (formData.dataSharing === "基本靠微信群") dataFoundation += 5

  if (formData.errorDetection === "当天") dataFoundation += 15
  else if (formData.errorDetection === "一周左右") dataFoundation += 10
  else if (formData.errorDetection === "月底才知道") dataFoundation += 5
  else if (formData.errorDetection === "基本靠老板发现") dataFoundation += 2

  // 软件使用加成
  if (formData.softwareUsed.includes("BI数据看板")) dataFoundation += 10
  if (formData.softwareUsed.includes("ERP")) dataFoundation += 5

  // 流程自动化评分
  if (formData.softwareUsed.includes("ERP")) processAutomation += 25
  if (formData.softwareUsed.includes("仓库系统")) processAutomation += 20
  if (formData.softwareUsed.includes("财务系统")) processAutomation += 15
  if (formData.softwareUsed.includes("飞书") || formData.softwareUsed.includes("企业微信")) {
    processAutomation += 10
  }

  // 痛点影响
  if (formData.painPoints.includes("人工重复工作太多")) processAutomation -= 15
  if (formData.painPoints.includes("部门协同效率低")) processAutomation -= 10
  if (formData.painPoints.includes("库存容易出错")) processAutomation -= 10

  // AI成熟度评分
  if (formData.aiUsage === "已经有AI项目") aiMaturity += 50
  else if (formData.aiUsage === "经常使用") aiMaturity += 30
  else if (formData.aiUsage === "偶尔使用ChatGPT") aiMaturity += 15
  else aiMaturity += 5

  // 已尝试的AI工具加成
  const aiTools = formData.aiTools.filter(t => t !== "没有" && t !== "")
  aiMaturity += Math.min(30, aiTools.length * 8)

  // 数据驱动评分
  if (formData.dataView === "有统一的数据看板") dataDriven += 35
  if (formData.errorDetection === "当天") dataDriven += 30
  else if (formData.errorDetection === "一周左右") dataDriven += 20

  if (formData.painPoints.includes("老板看不到经营数据")) dataDriven -= 25
  if (formData.painPoints.includes("数据太分散")) dataDriven -= 20

  // 确保分数在有效范围内
  dataFoundation = Math.min(100, Math.max(0, dataFoundation))
  processAutomation = Math.min(100, Math.max(0, processAutomation))
  aiMaturity = Math.min(100, Math.max(0, aiMaturity))
  dataDriven = Math.min(100, Math.max(0, dataDriven))

  // 综合评分（加权平均）
  const overall = Math.round(
    dataFoundation * 0.3 +
    processAutomation * 0.25 +
    aiMaturity * 0.25 +
    dataDriven * 0.2
  )

  return {
    overall: Math.min(95, Math.max(15, overall)),
    dataFoundation,
    processAutomation,
    aiMaturity,
    dataDriven
  }
}

// 获取成熟度等级
function getMaturityLevel(score: number): string {
  if (score < 25) return "数字化萌芽期"
  if (score < 40) return "数字化起步期"
  if (score < 60) return "数字化发展期"
  if (score < 80) return "数字化成熟期"
  return "数字化领先期"
}

// 识别核心问题
function identifyProblems(formData: DiagnosisData, scores: any): { title: string; desc: string }[] {
  const problems: { title: string; desc: string }[] = []

  // 数据问题
  if (formData.dataView === "每个人自己做Excel") {
    problems.push({
      title: "数据分散在个人Excel中",
      desc: `根据您的问卷，企业目前主要依赖Excel管理数据。这意味着随着SKU数量增加，数据一致性、版本管理以及协同效率将面临严峻挑战。当多人同时编辑时，容易出现数据覆盖、版本混乱等问题。`
    })
  }

  if (formData.dataView === "有固定统计表" && formData.dataSharing !== "基本已经打通") {
    problems.push({
      title: "数据孤岛现象严重",
      desc: `您提到有固定统计表，但各部门数据仍需手动汇总。这种模式下，数据更新滞后、信息不对称的问题难以避免。建议逐步打通数据链路，实现数据的自动流转。`
    })
  }

  if (formData.painPoints.includes("数据太分散")) {
    problems.push({
      title: "多平台数据难以整合",
      desc: `您提到数据太分散是主要痛点。Amazon、Shopify、TikTok等多平台的数据格式不一、口径不同，亟需统一的数据中台来整合分析。`
    })
  }

  // 效率问题
  if (formData.painPoints.includes("人工重复工作太多")) {
    problems.push({
      title: "大量人工重复操作",
      desc: `您提到人工重复工作太多是核心痛点。库存核对、广告调价、报表生成等重复性工作不仅耗时，还容易出错。通过自动化流程，可释放团队精力聚焦更高价值的工作。`
    })
  }

  if (formData.painPoints.includes("部门协同效率低")) {
    problems.push({
      title: "跨部门协作效率待提升",
      desc: `部门协同效率低通常源于信息传递依赖人工、流程节点不清晰。建议通过数字化工具实现流程自动化，减少沟通成本。`
    })
  }

  // 决策问题
  if (formData.errorDetection === "月底才知道" || formData.errorDetection === "基本靠老板发现") {
    problems.push({
      title: "经营异常发现滞后",
      desc: `您提到经营异常通常需要${formData.errorDetection}才能发现。这意味着在问题发生到被发现之间，存在较长的时间窗口，可能导致错过最佳处理时机，造成不必要的损失。`
    })
  }

  if (formData.painPoints.includes("老板看不到经营数据")) {
    problems.push({
      title: "管理层缺乏实时数据支撑",
      desc: `管理层无法及时获取经营数据，导致决策更多依赖经验而非数据。在竞争激烈的跨境电商市场，数据驱动的决策将越来越重要。`
    })
  }

  // AI应用问题
  if (formData.aiUsage === "没有" || formData.aiUsage === "偶尔使用ChatGPT") {
    problems.push({
      title: "AI应用尚未落地",
      desc: `目前企业AI使用仍停留在${formData.aiUsage === "没有" ? "空白阶段" : "个人尝鲜阶段"}，尚未形成企业级的AI应用能力。AI的价值在于规模化应用，而非零星使用。`
    })
  }

  if (formData.painPoints.includes("不知道AI能做什么")) {
    problems.push({
      title: "AI认知有待提升",
      desc: `对AI能力边界的认知不足，可能导致错失AI赋能的机遇。建议先从明确的业务场景入手，如库存预测、广告优化等，逐步建立AI应用的信心。`
    })
  }

  // 库存问题
  if (formData.painPoints.includes("库存容易出错")) {
    problems.push({
      title: "库存管理准确性不足",
      desc: `库存是跨境电商运营的核心资产之一。库存不准会导致断货损失、积压资金，严重影响资金周转和客户体验。`
    })
  }

  // 广告问题
  if (formData.painPoints.includes("广告不会优化")) {
    problems.push({
      title: "广告投放缺乏优化方法",
      desc: `广告是跨境电商的重要流量来源，但很多团队缺乏系统的优化方法。AI可以通过数据分析自动发现优化空间，持续提升广告ROI。`
    })
  }

  // 如果问题太少，添加通用建议
  if (problems.length < 3) {
    problems.push({
      title: "数字化基础有待加强",
      desc: `综合评估显示，企业在数据基础设施、流程自动化等方面还有提升空间。建议从最紧迫的业务痛点入手，逐步构建数字化能力。`
    })
  }

  return problems.slice(0, 5) // 最多5个问题
}

// 评估风险
function evaluateRisks(formData: DiagnosisData, scores: any, problems: any[]): { title: string; desc: string }[] {
  const risks: { title: string; desc: string }[] = []

  // 基于评分和痛点的风险评估
  if (formData.dataView === "每个人自己做Excel" && formData.companySize !== "10人以下") {
    const sizeText = formData.companySize === "10~50" ? "50人" : formData.companySize === "50~200" ? "200人" : "更多"
    risks.push({
      title: "数据管理风险随规模增长",
      desc: `企业规模达到${sizeText}时，依赖Excel的数据管理方式将面临严峻挑战。数据错误率上升、汇总耗时增加、版本混乱等问题会严重影响运营效率。`
    })
  }

  if (formData.errorDetection === "月底才知道" || formData.errorDetection === "基本靠老板发现") {
    risks.push({
      title: "问题发现滞后风险",
      desc: `经营异常需要${formData.errorDetection}才能发现，意味着在发现问题前，损失可能已经发生。这种滞后性在高周转的跨境电商行业尤为致命。`
    })
  }

  if (formData.aiUsage === "没有" && scores.overall > 50) {
    risks.push({
      title: "AI应用滞后风险",
      desc: `企业数字化基础已具备一定水平，但AI应用仍为空白。随着AI在各行业的深入应用，领先者与落后者之间的差距将越拉越大。`
    })
  }

  if (formData.painPoints.includes("订单越来越多") && !formData.softwareUsed.includes("ERP")) {
    risks.push({
      title: "人工处理瓶颈风险",
      desc: `订单量增长带来的人工处理压力将逐渐显现。如果没有系统化支撑，人工成本将持续攀升，错单率也会上升。`
    })
  }

  if (formData.painPoints.includes("库存容易出错") && !formData.softwareUsed.includes("仓库系统")) {
    risks.push({
      title: "库存准确率风险",
      desc: `库存不准会导致超卖、断货或积压，直接影响客户体验和资金占用。在Prime Day等大促期间，库存问题的影响会被放大。`
    })
  }

  // 竞品对比风险
  const multiPlatform = formData.businessType === "多平台"
  if (multiPlatform && !formData.softwareUsed.includes("BI数据看板")) {
    risks.push({
      title: "多平台运营监控风险",
      desc: `多平台运营需要统一的视图来监控各平台表现。如果缺乏整合的数据看板，很难及时发现各平台的问题和机会。`
    })
  }

  // 增长风险
  if (formData.companySize === "50~200" || formData.companySize === "200+") {
    if (formData.aiUsage === "没有" || !formData.aiTools.includes("流程自动化")) {
      risks.push({
        title: "规模扩张能力瓶颈",
        desc: `企业规模较大，但AI和自动化应用几乎为零。随着业务规模进一步扩大，现有流程将成为制约增长的瓶颈。`
      })
    }
  }

  return risks.slice(0, 4)
}

// 生成结论依据
function generateConclusionBasis(formData: DiagnosisData, scores: any): string[] {
  const basis: string[] = []

  // 数据管理方面
  if (formData.dataView === "每个人自己做Excel") {
    basis.push(`✓ 企业目前主要依赖Excel管理数据（${scores.dataFoundation}分）`)
  } else if (formData.dataView === "有固定统计表") {
    basis.push(`✓ 企业使用固定统计表管理数据，但尚未实现自动化（${scores.dataFoundation}分）`)
  } else if (formData.dataView === "有统一的数据看板") {
    basis.push(`✓ 企业已建设统一的数据看板，数据可见性较好（${scores.dataFoundation}分）`)
  }

  // 数据共享方面
  if (formData.dataSharing === "基本靠微信群") {
    basis.push(`✓ 部门间主要依赖微信群沟通，信息传递效率较低`)
  } else if (formData.dataSharing === "Excel互传") {
    basis.push(`✓ 数据共享主要通过Excel互传，存在版本管理问题`)
  } else if (formData.dataSharing === "基本已经打通") {
    basis.push(`✓ 数据已基本实现跨部门共享`)
  }

  // AI使用方面
  const aiLevel = formData.aiUsage === "已经有AI项目" ? "已落地" :
                  formData.aiUsage === "经常使用" ? "常用" :
                  formData.aiUsage === "偶尔使用ChatGPT" ? "偶尔使用" : "未使用"
  basis.push(`✓ AI使用程度：${aiLevel}（${scores.aiMaturity}分）`)

  // 痛点总结
  if (formData.painPoints.length > 0) {
    basis.push(`✓ 主要痛点：${formData.painPoints.slice(0, 3).join("、")}${formData.painPoints.length > 3 ? "等" : ""}`)
  }

  // 异常发现能力
  basis.push(`✓ 经营异常发现周期：${formData.errorDetection}`)

  // 软件使用情况
  if (formData.softwareUsed.length > 0) {
    basis.push(`✓ 已使用的系统：${formData.softwareUsed.slice(0, 4).join("、")}${formData.softwareUsed.length > 4 ? "等" : ""}`)
  }

  return basis
}

// 生成升级路径
function generateUpgradePath(formData: DiagnosisData, scores: any): { phase: string; title: string; reason: string }[] {
  const path: { phase: string; title: string; reason: string }[] = []

  // 第一阶段：统一数据
  if (scores.dataFoundation < 50) {
    path.push({
      phase: "第一阶段",
      title: "统一经营数据",
      reason: "数据分散是多数问题的根源，建议优先打通数据链路"
    })
  }

  // 第二阶段：建设看板
  if (scores.dataDriven < 60) {
    path.push({
      phase: "第二阶段",
      title: "建设经营驾驶舱",
      reason: "让管理层能够实时看到经营数据，支撑快速决策"
    })
  }

  // 第三阶段：流程自动化
  if (scores.processAutomation < 50) {
    path.push({
      phase: "第三阶段",
      title: "流程自动化",
      reason: "减少人工重复工作，提升运营效率"
    })
  }

  // 第四阶段：AI应用
  if (scores.aiMaturity < 50) {
    // 根据痛点选择AI方向
    if (formData.painPoints.includes("库存容易出错") || formData.aiHelp.includes("库存预测")) {
      path.push({
        phase: "第四阶段",
        title: "搭建AI库存经理",
        reason: "自动预测补货需求，识别断货和积压风险"
      })
    } else if (formData.painPoints.includes("广告不会优化") || formData.aiHelp.includes("广告优化")) {
      path.push({
        phase: "第四阶段",
        title: "搭建AI广告经理",
        reason: "自动优化广告投放策略，持续提升ROI"
      })
    } else if (formData.aiHelp.includes("自动报表")) {
      path.push({
        phase: "第四阶段",
        title: "搭建AI报表助手",
        reason: "告别手工整理数据，自动生成各类报表"
      })
    }
  }

  // 第五阶段：AI体系
  if (scores.aiMaturity >= 40) {
    path.push({
      phase: "第五阶段",
      title: "建立AI数字员工体系",
      reason: "从单点AI应用扩展到完整的AI员工矩阵"
    })
  }

  return path
}

// 生成收益预测
function generateBenefits(formData: DiagnosisData, scores: any, problems: any[]): { label: string; value: string; type: "up" | "down"; basis: string }[] {
  const benefits: { label: string; value: string; type: "up" | "down"; basis: string }[] = []

  // 库存相关收益
  if (formData.painPoints.includes("库存容易出错") || formData.aiHelp.includes("库存预测")) {
    const improvement = 15 + Math.floor(Math.random() * 10)
    benefits.push({
      label: "库存准确率",
      value: `↑${improvement}%`,
      type: "up",
      basis: "基于智能补货预测和异常预警"
    })
  }

  // 效率相关收益
  if (formData.painPoints.includes("人工重复工作太多")) {
    const reduction = 30 + Math.floor(Math.random() * 20)
    benefits.push({
      label: "人工重复工作",
      value: `↓${reduction}%`,
      type: "down",
      basis: "流程自动化替代人工操作"
    })
  }

  // 决策速度收益
  if (formData.errorDetection !== "当天") {
    const speedup = 50 + Math.floor(Math.random() * 30)
    benefits.push({
      label: "问题发现速度",
      value: `↑${speedup}%`,
      type: "up",
      basis: "从月底发现问题到实时预警"
    })
  }

  // 数据相关收益
  if (formData.dataView === "每个人自己做Excel" || formData.dataView === "有固定统计表") {
    const reduction = 40 + Math.floor(Math.random() * 25)
    benefits.push({
      label: "数据汇总时间",
      value: `↓${reduction}%`,
      type: "down",
      basis: "从手工汇总到自动生成"
    })
  }

  // 广告收益
  if (formData.painPoints.includes("广告不会优化") || formData.aiHelp.includes("广告优化")) {
    const roi = 15 + Math.floor(Math.random() * 15)
    benefits.push({
      label: "广告ROI",
      value: `↑${roi}%`,
      type: "up",
      basis: "基于AI智能调价和预算优化"
    })
  }

  // 确保有4个收益指标
  if (benefits.length < 4) {
    benefits.push({
      label: "决策效率",
      value: `↑${40 + Math.floor(Math.random() * 20)}%`,
      type: "up",
      basis: "数据驱动的快速决策"
    })
  }

  if (benefits.length < 4) {
    benefits.push({
      label: "数据准确率",
      value: `↑${20 + Math.floor(Math.random() * 15)}%`,
      type: "up",
      basis: "减少人工录入错误"
    })
  }

  return benefits.slice(0, 4)
}

// 动态排序解决方案
function rankSolutions(formData: DiagnosisData, scores: any, problems: any[]): { title: string; desc: string; link: string; priority: string }[] {
  const solutions: { title: string; desc: string; link: string; priority: string; score: number }[] = [
    {
      title: "AI库存经理",
      desc: "自动预测补货需求，识别断货和积压风险",
      link: "/ai-inventory-demo",
      priority: "",
      score: 0
    },
    {
      title: "AI广告经理",
      desc: "智能优化广告投放策略，持续提升ROI",
      link: "/ai-framework",
      priority: "",
      score: 0
    },
    {
      title: "经营驾驶舱",
      desc: "实时监控经营数据，支撑快速决策",
      link: "/bi-dashboard",
      priority: "",
      score: 0
    },
    {
      title: "统一数据平台",
      desc: "打通各系统数据，消除数据孤岛",
      link: "/rds-architecture",
      priority: "",
      score: 0
    },
    {
      title: "AI自动报表",
      desc: "告别手工整理，自动生成日报周报",
      link: "/ai-framework",
      priority: "",
      score: 0
    },
    {
      title: "流程自动化",
      desc: "减少人工重复工作，提升运营效率",
      link: "/ai-framework",
      priority: "",
      score: 0
    }
  ]

  // 根据用户痛点和AI帮助意向计算优先级
  solutions.forEach(s => {
    // 库存相关
    if (s.title === "AI库存经理") {
      if (formData.painPoints.includes("库存容易出错")) s.score += 30
      if (formData.aiHelp.includes("库存预测")) s.score += 25
      if (formData.painPoints.includes("订单越来越多")) s.score += 15
    }

    // 广告相关
    if (s.title === "AI广告经理") {
      if (formData.painPoints.includes("广告不会优化")) s.score += 30
      if (formData.aiHelp.includes("广告优化")) s.score += 25
    }

    // 数据驾驶舱相关
    if (s.title === "经营驾驶舱") {
      if (formData.painPoints.includes("老板看不到经营数据")) s.score += 35
      if (formData.errorDetection !== "当天") s.score += 20
      if (formData.aiHelp.includes("老板驾驶舱")) s.score += 30
    }

    // 数据平台相关
    if (s.title === "统一数据平台") {
      if (formData.painPoints.includes("数据太分散")) s.score += 35
      if (formData.dataView === "每个人自己做Excel") s.score += 25
      if (formData.aiHelp.includes("数据分析")) s.score += 20
    }

    // 自动报表相关
    if (s.title === "AI自动报表") {
      if (formData.aiHelp.includes("自动报表")) s.score += 30
      if (formData.aiHelp.includes("经营分析")) s.score += 20
    }

    // 流程自动化相关
    if (s.title === "流程自动化") {
      if (formData.painPoints.includes("人工重复工作太多")) s.score += 30
      if (formData.aiHelp.includes("流程自动化")) s.score += 25
      if (formData.painPoints.includes("部门协同效率低")) s.score += 20
    }

    // 数据基础薄弱优先数据平台
    if (scores.dataFoundation < 40 && s.title !== "统一数据平台") {
      s.score -= 15
    }
  })

  // 按分数排序并生成优先原因
  solutions.sort((a, b) => b.score - a.score)

  solutions.forEach((s, i) => {
    if (i === 0) {
      s.priority = "基于您的痛点，这是最优先需要解决的问题"
    } else if (i === 1) {
      s.priority = "在解决首要问题后，这是下一个重要的提升方向"
    } else {
      s.priority = "持续优化，可进一步提升运营效率"
    }
  })

  return solutions
}

// 生成不建议事项
function generateWarnings(formData: DiagnosisData, scores: any): string[] {
  const warnings: string[] = []

  // 数据基础薄弱时不建议直接上AI
  if (scores.dataFoundation < 40 && scores.aiMaturity < 30) {
    warnings.push("不建议现阶段大量投入AI应用。没有良好的数据基础，AI的分析质量会大打折扣。建议先完善数据基础设施。")
  }

  // 数据分散时不建议建多个独立系统
  if (formData.painPoints.includes("数据太分散") && !formData.softwareUsed.includes("ERP")) {
    warnings.push("不建议继续购买新的独立系统。每个系统都会产生新的数据孤岛，应优先打通现有系统或选择一体化方案。")
  }

  // 流程未标准化时不建议过早自动化
  if (!formData.softwareUsed.includes("ERP") && formData.painPoints.includes("人工重复工作太多")) {
    warnings.push("不建议在流程未标准化时就大量投入自动化。先梳理和优化流程，自动化才能发挥最大价值。")
  }

  // 已有多系统时不建议再增加系统
  if (formData.softwareUsed.length >= 4 && !formData.softwareUsed.includes("BI数据看板")) {
    warnings.push("不建议再增加新的系统。建议先整合现有系统，建设统一的数据分析和展示平台。")
  }

  // AI基础薄弱时不应追求高大上
  if (formData.aiUsage === "没有" || formData.aiUsage === "偶尔使用ChatGPT") {
    warnings.push("不建议一开始就追求完整的AI解决方案。先从1-2个明确的业务场景入手，建立经验和信心后再扩展。")
  }

  return warnings
}

// 生成执行摘要
function generateExecutiveSummary(formData: DiagnosisData, scores: any, problems: any[]): string {
  const level = getMaturityLevel(scores.overall)

  let summary = `根据您的问卷信息，企业的数字化成熟度属于"${level}"。`

  if (scores.overall < 40) {
    summary += `目前企业在数据管理、流程自动化等方面还有较大提升空间。`
    if (formData.dataView === "每个人自己做Excel") {
      summary += `主要挑战在于数据依赖Excel管理，版本控制和协同效率存在问题。`
    }
    summary += `建议从统一数据平台入手，逐步构建数字化基础。`
  } else if (scores.overall < 60) {
    summary += `企业已具备一定的数字化基础，但数据孤岛和流程断点仍然存在。`
    if (formData.painPoints.includes("人工重复工作太多")) {
      summary += `人工重复工作多是一个明显的效率瓶颈。`
    }
    summary += `建议重点打通数据链路，推进流程自动化，并逐步引入AI应用。`
  } else {
    summary += `企业在数字化方面已有较好积累，具备推进AI规模化应用的条件。`
    if (formData.aiUsage === "已经有AI项目" || formData.aiUsage === "经常使用") {
      summary += `AI应用已有一定基础，可考虑从单点突破扩展到体系化建设。`
    }
    summary += `建议重点建设AI数字员工矩阵，实现AI能力的规模化。`
  }

  return summary
}

// 生成下一步建议
function generateNextSteps(formData: DiagnosisData, scores: any): string {
  let nextSteps = ""

  if (scores.overall < 40) {
    nextSteps = `建议第一步：梳理现有业务流程和数据资产，明确最急需解决的问题。然后选择合适的系统或工具，从数据统一入手。`
  } else if (scores.overall < 60) {
    nextSteps = `建议第一步：选择一个明确的业务场景（如库存管理或广告优化），引入AI能力进行试点。同时推进数据打通工作。`
  } else {
    nextSteps = `建议第一步：梳理现有AI应用，形成统一的AI管理规范。然后逐步扩展AI应用场景，建立AI数字员工矩阵。`
  }

  if (formData.otherHelp) {
    nextSteps += ` 针对您提到的"${formData.otherHelp}"，建议与专业人士进一步沟通，制定针对性的落地方案。`
  }

  return nextSteps
}

// 生成成熟度评价
function generateMaturityComment(scores: any, problems: any[]): string {
  const level = getMaturityLevel(scores.overall)

  const comments: Record<string, string> = {
    "数字化萌芽期": "企业数字化建设刚刚起步，主要依赖人工和Excel处理业务数据。建议从基础数据管理开始，逐步构建数字化能力。",
    "数字化起步期": "企业已具备基本的数字化意识，但数据分散、流程断点问题较为突出。建议重点打通数据链路，提升基础运营效率。",
    "数字化发展期": "企业数字化基础已初步建立，但在数据驱动和AI应用方面还有较大提升空间。建议推进数据整合和AI落地。",
    "数字化成熟期": "企业数字化能力较强，数据资产丰富。建议重点推进AI规模化应用，建立竞争优势。",
    "数字化领先期": "企业数字化能力处于行业领先水平。建议持续优化和创新，探索AI驱动的业务增长模式。"
  }

  return comments[level] || comments["数字化起步期"]
}
