import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { resumeData } from "@/data/resume"
import { CheckCircle2, ChevronRight, BarChart3, Users, Database, Layers, ArrowRight, FolderOpen } from "lucide-react"

/* ─── 成就模块组件 ─── */
export function AchievementsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const navigate = useNavigate()

  const isQuickBI = (id: number) => id === 4
  const isTeamBuilding = (id: number) => id === 1
  const isRdsArch = (id: number) => id === 2
  const isBusinessData = (id: number) => id === 3
  const isProjects = (id: number) => id === 5

  return (
    <section id="achievements" className="py-24 px-6 surface-2">
      <div className="max-w-4xl mx-auto">
        {/* Apple风格标题 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-3">
            我如何帮助企业落地数字化？
          </h2>
          <p className="text-secondary">
            从零到一的企业级数据体系建设经验
          </p>
        </div>

        {/* Apple风格卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 原有四个成就模块 - 2列布局 */}
          {resumeData.achievements.map((item, i) => {
            const isExpanded = expandedId === item.id
            const quickBI = isQuickBI(item.id)
            const teamBuilding = isTeamBuilding(item.id)
            const rdsArch = isRdsArch(item.id)
            const businessData = isBusinessData(item.id)
            const projects = isProjects(item.id)
            const navigable = quickBI || teamBuilding || rdsArch || businessData || projects

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (quickBI) {
                    navigate("/bi-dashboard")
                  } else if (teamBuilding) {
                    navigate("/team-building")
                  } else if (rdsArch) {
                    navigate("/rds-architecture")
                  } else if (businessData) {
                    navigate("/business-data-design")
                  } else if (projects) {
                    navigate("/projects")
                  } else {
                    setExpandedId(isExpanded ? null : item.id)
                  }
                }}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 animate-apple-up ${
                  isExpanded
                    ? "border-primary/30 shadow-apple-md"
                    : "border-border hover:border-border/80"
                } bg-background ${navigable ? "cursor-pointer" : ""}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    {/* 标题 */}
                    <div className="flex items-start gap-3">
                      <h3 className="text-lg font-semibold text-primary leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    {/* 状态标签 */}
                    {quickBI ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        <BarChart3 className="w-3 h-3" />
                        查看看板
                      </span>
                    ) : teamBuilding ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        <Users className="w-3 h-3" />
                        查看详情
                      </span>
                    ) : rdsArch ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        <Database className="w-3 h-3" />
                        查看架构
                      </span>
                    ) : businessData ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        <Layers className="w-3 h-3" />
                        查看设计
                      </span>
                    ) : projects ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        <FolderOpen className="w-3 h-3" />
                        查看项目
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3" />
                        {item.status}
                      </span>
                    )}

                    {/* 描述文字 */}
                    <p className="text-sm text-secondary leading-relaxed">
                      {item.description}
                    </p>

                    {/* 展开详情 */}
                    {!navigable && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded
                            ? "max-h-96 opacity-100 pt-3"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm text-primary/80 leading-relaxed whitespace-pre-line">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 箭头指示器 */}
                  {navigable ? (
                    <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <ChevronRight
                      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
