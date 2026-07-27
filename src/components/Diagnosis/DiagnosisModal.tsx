import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, Check, Loader2, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { analyzeDiagnosis } from "./LocalAIEngine"

// 诊断数据接口
export interface DiagnosisData {
  businessType: string
  companySize: string
  painPoints: string[]
  dataView: string
  dataSharing: string
  errorDetection: string
  softwareUsed: string[]
  otherHelp: string
}

// AI分析结果接口（动态结构）
export interface DiagnosisResult {
  maturityScore: number
  maturityLevel: string
  maturityComment: string
  executiveSummary: string
  conclusionBasis: string[]
  problems: { title: string; desc: string }[]
  risks: { title: string; desc: string }[]
  upgradePath: { phase: string; title: string; reason: string }[]
  priorityAction: string
  benefits: { label: string; value: string; type: "up" | "down"; basis: string }[]
  solutions: { title: string; desc: string; link: string; priority: string }[]
  warnings: string[]
  nextSteps: string
}

interface DiagnosisModalProps {
  isOpen: boolean
  onClose: () => void
}

// DeepSeek API 端点（部署 Cloudflare Worker 后替换）
// 格式: https://your-worker.your-subdomain.workers.dev/api/diagnosis
const API_URL = "https://jianli-diagnosis-api.mytowerchen.workers.dev/api/diagnosis"

// 问卷内容定义
const questions = {
  stage1: {
    title: "企业基本情况",
    questions: [
      {
        id: "businessType",
        question: "您的企业主要做什么？",
        type: "single",
        options: ["Amazon", "Shopify独立站", "TikTok Shop", "Temu", "Walmart", "多平台"]
      },
      {
        id: "companySize",
        question: "公司规模",
        type: "single",
        options: ["10人以下", "10~50", "50~200", "200+"]
      },
      {
        id: "painPoints",
        question: "主要痛点（可多选）",
        type: "multi",
        options: [
          "订单越来越多",
          "库存容易出错",
          "广告不会优化",
          "数据太分散",
          "人工重复工作太多",
          "老板看不到经营数据",
          "部门协同效率低",
          "其它"
        ]
      }
    ]
  },
  stage2: {
    title: "数字化基础",
    subtitle: "下面几个问题，没有标准答案",
    questions: [
      {
        id: "dataView",
        question: "公司的经营数据平时怎么看？",
        type: "single",
        options: ["每个人自己做Excel", "有固定统计表", "有统一的数据看板", "不清楚"]
      },
      {
        id: "dataSharing",
        question: "各部门的数据是否能够互相共享？",
        type: "single",
        options: ["基本靠微信群", "Excel互传", "基本已经打通", "不清楚"]
      },
      {
        id: "errorDetection",
        question: "出现经营异常时，一般多久发现？",
        type: "single",
        options: ["当天", "一周左右", "月底才知道", "基本靠老板发现"]
      },
      {
        id: "softwareUsed",
        question: "目前最常用的软件有哪些？",
        type: "multi",
        options: ["ERP", "仓库系统", "财务系统", "飞书", "企业微信", "BI数据看板", "不知道", "其它"]
      }
    ]
  },
  stage3: {
    title: "最希望改善什么？",
    subtitle: "最多选择三个",
    questions: [
      {
        id: "aiHelp",
        question: "最希望改善什么问题？",
        type: "multi",
        options: [
          "库存预测",
          "广告优化",
          "经营分析",
          "自动报表",
          "订单处理",
          "财务对账",
          "数据分析",
          "老板驾驶舱",
          "其它"
        ],
        maxSelect: 3
      },
      {
        id: "otherHelp",
        question: "还有什么希望改善的？",
        type: "text",
        placeholder: "请输入您的想法..."
      }
    ]
  }
}

// 分析动画文案
const analysisMessages = [
  "正在分析企业数字化基础……",
  "正在识别流程瓶颈……",
  "正在匹配解决方案……",
  "正在生成诊断报告……"
]

export default function DiagnosisModal({ isOpen, onClose }: DiagnosisModalProps) {
  const [stage, setStage] = useState(1)
  const [showEntry, setShowEntry] = useState(true)  // 是否显示入口选择
  const [formData, setFormData] = useState<DiagnosisData>({
    businessType: "",
    companySize: "",
    painPoints: [],
    dataView: "",
    dataSharing: "",
    errorDetection: "",
    softwareUsed: [],
    aiHelp: [],
    otherHelp: ""
  })
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisMessage, setAnalysisMessage] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 模态框打开时禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // 关闭时重置状态
  useEffect(() => {
    if (!isOpen) {
      setStage(1)
      setShowEntry(true)
      setCurrentQuestionIndex(0)
      setIsAnalyzing(false)
      setShowResult(false)
      setResult(null)
      setError(null)
      setFormData({
        businessType: "",
        companySize: "",
        painPoints: [],
        dataView: "",
        dataSharing: "",
        errorDetection: "",
        softwareUsed: [],
        aiHelp: [],
        otherHelp: ""
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  // 获取当前阶段的题目
  const getCurrentStageQuestions = () => {
    switch (stage) {
      case 1: return questions.stage1.questions
      case 2: return questions.stage2.questions
      case 3: return questions.stage3.questions
      default: return []
    }
  }

  const currentQuestion = getCurrentStageQuestions()[currentQuestionIndex]

  // 处理单选
  const handleSingleSelect = (value: string) => {
    setFormData(prev => ({ ...prev, [currentQuestion.id]: value }))
    setTimeout(() => {
      goToNextQuestion()
    }, 300)
  }

  // 处理多选
  const handleMultiSelect = (value: string) => {
    const field = currentQuestion.id as keyof DiagnosisData
    const currentValues = formData[field] as string[]

    if (currentValues.includes(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: currentValues.filter(v => v !== value)
      }))
    } else {
      const maxSelect = (currentQuestion as { maxSelect?: number }).maxSelect
      if (maxSelect && currentValues.length >= maxSelect) {
        return
      }
      setFormData(prev => ({
        ...prev,
        [field]: [...currentValues, value]
      }))
    }
  }

  // 处理文本输入
  const handleTextInput = (value: string) => {
    setFormData(prev => ({ ...prev, [currentQuestion.id]: value }))
  }

  // 全选/取消全选
  const toggleSelectAll = () => {
    const field = currentQuestion.id as keyof DiagnosisData
    const currentValues = formData[field] as string[]

    if (currentValues.length === currentQuestion.options.length) {
      setFormData(prev => ({ ...prev, [field]: [] }))
    } else {
      setFormData(prev => ({ ...prev, [field]: [...currentQuestion.options] }))
    }
  }

  // 下一题
  const goToNextQuestion = () => {
    const questions = getCurrentStageQuestions()
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else if (stage < 3) {
      setStage(prev => prev + 1)
      setCurrentQuestionIndex(0)
    } else {
      submitDiagnosis()
    }
  }

  // 上一题
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    } else if (stage > 1) {
      setStage(prev => prev - 1)
      const prevQuestions = stage === 2 ? questions.stage1.questions : questions.stage2.questions
      setCurrentQuestionIndex(prevQuestions.length - 1)
    }
  }

  // 提交诊断 - 使用本地引擎（即时生成，无需等待）
  const submitDiagnosis = async () => {
    setIsAnalyzing(true)
    setError(null)

    // 播放分析动画
    for (let i = 0; i < analysisMessages.length; i++) {
      setAnalysisMessage(analysisMessages[i])
      await new Promise(resolve => setTimeout(resolve, 1500))
    }

    // 直接使用本地分析引擎生成报告（无需等待API）
    const analysisResult = analyzeDiagnosis(formData)
    setResult(analysisResult)
    setShowResult(true)
  }

  // 直接查看示例报告
  const showSampleReport = async () => {
    setIsAnalyzing(true)
    setError(null)

    // 播放动画
    for (let i = 0; i < analysisMessages.length; i++) {
      setAnalysisMessage(analysisMessages[i])
      await new Promise(resolve => setTimeout(resolve, 1500))
    }

    // 使用示例数据生成报告
    const sampleData: DiagnosisData = {
      businessType: "多平台",
      companySize: "10~50",
      painPoints: ["库存容易出错", "广告不会优化", "数据太分散", "老板看不到经营数据"],
      dataView: "每个人自己做Excel",
      dataSharing: "Excel互传",
      errorDetection: "一周左右",
      softwareUsed: ["ERP", "仓库系统"],
      aiHelp: ["库存预测", "广告优化", "经营分析"],
      otherHelp: ""
    }

    const sampleResult = analyzeDiagnosis(sampleData)
    setResult(sampleResult)
    setShowResult(true)
  }

  // 获取当前问题的值
  const getCurrentValue = () => {
    const field = currentQuestion.id as keyof DiagnosisData
    return formData[field]
  }

  const isMultiQuestion = currentQuestion.type === "multi"
  const isTextQuestion = currentQuestion.type === "text"
  const maxSelect = (currentQuestion as { maxSelect?: number }).maxSelect

  // 获取成熟度等级颜色
  const getMaturityColor = (level: string) => {
    if (level.includes("萌芽") || level.includes("起步")) return "text-red-500"
    if (level.includes("发展")) return "text-yellow-500"
    if (level.includes("成熟")) return "text-green-500"
    if (level.includes("领先")) return "text-purple-500"
    return "text-primary"
  }

  return (
    <div className="fixed inset-0 z-[100] bg-background">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
            <span className="text-sm">退出</span>
          </button>

          {!showResult && !isAnalyzing && !error && !showEntry && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">第 {stage}/3 步</span>
              <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(stage / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="w-16" />
        </div>
      </div>

      {/* 内容区域 */}
      <div className="h-[calc(100vh-73px)] overflow-y-auto">
        {/* 标题区域 */}
        {!showResult && !isAnalyzing && !error && !showEntry && (
          <div className="max-w-3xl mx-auto px-6 pt-8 pb-4 text-center">
            <h2 className="text-2xl font-bold mb-2">
              {stage === 1 && "企业基本情况"}
              {stage === 2 && "数字化基础"}
              {stage === 3 && "最希望改善什么？"}
            </h2>
            {(questions as any)[`stage${stage}`].subtitle && (
              <p className="text-muted-foreground text-sm">
                {(questions as any)[`stage${stage}`].subtitle}
              </p>
            )}
            {maxSelect && (
              <p className="text-muted-foreground text-sm mt-1">
                最多选择 {maxSelect} 个
              </p>
            )}
          </div>
        )}

        {/* 问题内容 */}
        {!showResult && !isAnalyzing && !error && !showEntry && (
          <div className="max-w-3xl mx-auto px-6 pb-24">
            <div className="mb-6">
              <p className="text-lg font-medium mb-6">{currentQuestion.question}</p>

              {isTextQuestion ? (
                <textarea
                  value={getCurrentValue() as string}
                  onChange={(e) => handleTextInput(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full h-32 p-4 rounded-xl border border-border bg-surface-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              ) : (
                <div className="space-y-3">
                  {isMultiQuestion && (
                    <button
                      onClick={toggleSelectAll}
                      className="w-full p-3 rounded-xl border border-dashed border-muted-foreground/30 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      {getCurrentValue().length === currentQuestion.options.length ? "取消全选" : "全选"}
                    </button>
                  )}

                  {currentQuestion.options.map((option) => {
                    const isSelected = isMultiQuestion
                      ? (getCurrentValue() as string[]).includes(option)
                      : getCurrentValue() === option

                    return (
                      <button
                        key={option}
                        onClick={() => isMultiQuestion ? handleMultiSelect(option) : handleSingleSelect(option)}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 入口选择页面 */}
        {showEntry && !isAnalyzing && !showResult && !error && (
          <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-3">1分钟企业数字化诊断</h2>
              <p className="text-muted-foreground">
                分析您的数字化现状，生成个性化升级方案
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* 快速查看示例报告 */}
              <button
                onClick={showSampleReport}
                className="p-6 rounded-2xl border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">快速查看示例报告</h3>
                <p className="text-sm text-muted-foreground">无需填写，直接查看一份典型企业的诊断报告</p>
              </button>

              {/* 开始填写问卷 */}
              <button
                onClick={() => setShowEntry(false)}
                className="p-6 rounded-2xl border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">开始填写问卷</h3>
                <p className="text-sm text-muted-foreground">约1分钟，获得专属诊断报告</p>
              </button>
            </div>
          </div>
        )}

        {/* 分析动画 */}
        {isAnalyzing && (
          <div className="h-full flex flex-col items-center justify-center px-6">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
            <p className="text-xl font-medium text-center">{analysisMessage}</p>
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div className="h-full flex flex-col items-center justify-center px-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-6" />
            <p className="text-xl font-medium text-center mb-4">{error}</p>
            <Button onClick={() => setIsAnalyzing(false)}>返回重试</Button>
          </div>
        )}

        {/* 结果展示 */}
        {showResult && result && (
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">
            {/* 执行摘要 */}
            {result.executiveSummary && (
              <section className="text-center">
                <p className="text-lg text-secondary leading-relaxed max-w-2xl mx-auto">
                  {result.executiveSummary}
                </p>
              </section>
            )}

            {/* 数字化成熟度 */}
            <section className="text-center">
              <h2 className="text-2xl font-bold mb-6">企业数字化成熟度</h2>
              <div className="relative w-56 h-56 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-muted"
                  />
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${result.maturityScore * 6.28} 628`}
                    className="text-primary transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-bold text-primary">{result.maturityScore}</span>
                  <span className="text-sm text-muted-foreground">分</span>
                </div>
              </div>
              {result.maturityLevel && (
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${getMaturityColor(result.maturityLevel)} bg-current/10`}>
                  {result.maturityLevel}
                </span>
              )}
              {result.maturityComment && (
                <p className="text-muted-foreground max-w-md mx-auto mt-4">{result.maturityComment}</p>
              )}
            </section>

            {/* 结论依据 */}
            {result.conclusionBasis && result.conclusionBasis.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-center mb-6">为什么会得到以上结论？</h3>
                <div className="bg-surface-2 rounded-2xl p-6 space-y-3">
                  {result.conclusionBasis.map((basis, i) => (
                    <div key={i} className="flex gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-secondary">{basis}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* AI识别的主要问题 */}
            {result.problems && result.problems.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-center mb-6">核心问题诊断</h3>
                <div className="space-y-4">
                  {result.problems.map((problem, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-surface-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{problem.title}</h4>
                        <p className="text-sm text-muted-foreground">{problem.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 推荐升级路径 */}
            {result.upgradePath && result.upgradePath.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-center mb-6">推荐升级路径</h3>
                <div className="flex flex-col items-center gap-2">
                  {result.upgradePath.map((step, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="px-6 py-3 rounded-xl bg-primary/10 text-primary font-medium max-w-md text-center">
                        <div className="text-sm opacity-70 mb-1">{step.phase}</div>
                        <div>{step.title}</div>
                      </div>
                      {step.reason && (
                        <p className="text-xs text-muted-foreground mt-1 max-w-sm text-center">{step.reason}</p>
                      )}
                      {i < result.upgradePath.length - 1 && (
                        <div className="w-0.5 h-6 bg-border" />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 预计收益 */}
            {result.benefits && result.benefits.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-center mb-6">预计收益</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {result.benefits.map((benefit, i) => (
                    <div key={i} className="p-4 rounded-xl bg-surface-2 text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {benefit.type === "up" ? (
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-green-500" />
                        )}
                        <span className="text-2xl font-bold text-primary">{benefit.value}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{benefit.label}</p>
                      {benefit.basis && (
                        <p className="text-xs text-muted-foreground mt-1">{benefit.basis}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 风险预警 */}
            {result.risks && result.risks.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-center mb-6">风险预警</h3>
                <div className="space-y-3">
                  {result.risks.map((risk, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                      <span className="text-yellow-500 text-lg">⚠</span>
                      <div>
                        <h4 className="font-medium text-yellow-800">{risk.title}</h4>
                        <p className="text-sm text-yellow-700 mt-1">{risk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 不建议事项 */}
            {result.warnings && result.warnings.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-center mb-6">现在不建议做什么</h3>
                <div className="bg-red-50/50 rounded-xl p-6 space-y-3">
                  {result.warnings.map((warning, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-red-400">✕</span>
                      <p className="text-sm text-red-700">{warning}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 推荐解决方案 */}
            {result.solutions && result.solutions.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-center mb-6">推荐解决方案</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.solutions.map((solution, i) => (
                    <a
                      key={i}
                      href={solution.link || "#"}
                      className="p-5 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-bold shrink-0">
                          {i + 1}
                        </span>
                        <div>
                          <h4 className="font-semibold group-hover:text-primary">{solution.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{solution.desc}</p>
                          {solution.priority && (
                            <p className="text-xs text-primary mt-2 bg-primary/5 px-2 py-1 rounded inline-block">
                              优先原因：{solution.priority}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* 下一步 */}
            {result.nextSteps && (
              <section className="text-center pt-4 pb-8">
                <div className="bg-primary/5 rounded-2xl p-6 max-w-2xl mx-auto">
                  <h3 className="text-lg font-bold mb-2">下一步建议</h3>
                  <p className="text-secondary">{result.nextSteps}</p>
                </div>
              </section>
            )}

            {/* 底部操作 */}
            <div className="text-center pt-4 pb-12">
              <Button
                onClick={onClose}
                size="lg"
                className="rounded-full px-8"
              >
                关闭报告
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航（仅问卷阶段显示） */}
      {!showResult && !isAnalyzing && !error && !showEntry && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={goToPrevQuestion}
              disabled={stage === 1 && currentQuestionIndex === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              上一题
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} / {getCurrentStageQuestions().length}
            </span>

            <Button
              onClick={goToNextQuestion}
              disabled={
                isMultiQuestion
                  ? (getCurrentValue() as string[]).length === 0
                  : !getCurrentValue()
              }
              className="gap-2"
            >
              {stage === 3 && currentQuestionIndex === getCurrentStageQuestions().length - 1 ? (
                <>开始分析</>
              ) : (
                <>
                  下一题
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
