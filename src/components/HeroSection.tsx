import { useState, useEffect } from "react"
import { ChevronDown, TrendingUp, AlertCircle, HardDrive, PieChart, Timer, Users, HelpCircle, Code, Target, Lightbulb } from "lucide-react"
import { resumeData } from "@/data/resume"

/* ─── 数字化咨询公司官网风格 Hero Section ─── */
export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* 主内容区 */}
      <div className={`w-full max-w-4xl mx-auto px-6 py-20 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

        {/* 状态标签 */}
        <div className="mb-8 animate-apple-up text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-muted-foreground bg-muted rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            支持全职加入 · 项目合作 · 数字化咨询
          </span>
        </div>

        {/* 主标题 */}
        <div className="mb-6 animate-apple-up text-center" style={{ animationDelay: '100ms' }}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            帮助中小跨境电商企业完成
            <br />
            <span className="text-primary">"数据驱动业务决策"</span>
            <br />
            的开荒-可用-可信-稳定
          </h1>
        </div>

        {/* 企业履历 */}
        <div className="mb-8 animate-apple-up" style={{ animationDelay: '150ms' }}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {resumeData.career.map((job, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all ${
                  job.highlight
                    ? "bg-primary/5 border-primary/20 text-primary"
                    : "bg-muted/50 border-transparent text-muted-foreground"
                }`}
              >
                <span className="font-semibold">{job.year}</span>
                <span className="text-muted-foreground/50">·</span>
                <span className="font-medium">{job.company}</span>
                <span className="text-muted-foreground/50">·</span>
                <span>{job.role}</span>
                {job.highlight && (
                  <>
                    <span className="text-muted-foreground/50">·</span>
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary">{job.scale}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 痛点小标题 */}
        <div className="mb-6 animate-apple-up text-center" style={{ animationDelay: '180ms' }}>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-sm font-medium text-amber-800 shadow-sm">
            <HelpCircle className="w-4 h-4" />
            您的企业是否和我过往履历遇到的部分代表性问题类似？
          </span>
        </div>

        {/* 痛点小卡片 */}
        <div className="mb-8 animate-apple-up" style={{ animationDelay: '200ms' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50/50 border border-red-100">
              <HardDrive className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-sm text-red-700">数据源分散在ERP、Excel、多维表、RPA</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50/50 border border-orange-100">
              <Users className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <span className="text-sm text-orange-700">不同系统人工拼凑数据，运营每天要花非主业时间去维护</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-50/50 border border-yellow-100">
              <PieChart className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <span className="text-sm text-yellow-700">管理层看到的数据不一致，质疑数据究竟怎么算的</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-100">
              <Timer className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span className="text-sm text-amber-700">业务数据量变大，飞书、钉钉多维表卡顿打转</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-100">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span className="text-sm text-amber-700">管理层和业财想看的数据不一样，指标怎么覆盖全面，权限怎么划分</span>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-100">
              <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <span className="text-sm text-amber-700">业务看完报表，不确定下一步要做什么优化动作</span>
            </div>
          </div>
        </div>

        {/* 价值描述 - 蓝色小卡片 */}
        <div className="mb-8 animate-apple-up" style={{ animationDelay: '300ms' }}>
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700">
              <TrendingUp className="w-4 h-4" />
              60人初创 - 200人小型 - 3000人中型上市，因地制宜不同阶段跨境企业数据建设经验
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700">
              <Users className="w-4 h-4" />
              非纯管理，从团队搭建-数据成体系，亲自争取资源、经费实现全流程
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700">
              <Code className="w-4 h-4" />
              既能写代码，又能做团队管理
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700">
              <Target className="w-4 h-4" />
              3年，一步步从普通数据专员到数据经理
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700">
              <Lightbulb className="w-4 h-4" />
              初创跨境企业踩的数据建设坑、中型企业成熟数据应用，都有相对较好复刻经验
            </span>
          </div>
        </div>

        {/* 底部价值表达 */}
        <div className="mt-12 text-center animate-apple-up" style={{ animationDelay: '400ms' }}>
          <p className="text-sm text-muted-foreground/70 italic">
            您需要的不只是系统，而是真正能够落地的数字化能力。
          </p>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
