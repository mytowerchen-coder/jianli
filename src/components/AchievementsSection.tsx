import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { resumeData } from "@/data/resume"
import { CheckCircle2, Sparkles, ChevronRight, BarChart3, ExternalLink, Users, Database, Layers } from "lucide-react"

export function AchievementsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const navigate = useNavigate()

  const isQuickBI = (id: number) => id === 4
  const isTeamBuilding = (id: number) => id === 1
  const isRdsArch = (id: number) => id === 2
  const isBusinessData = (id: number) => id === 3

  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">
            我可以给您的企业带来什么？
          </h2>
        </div>

        <div className="space-y-4">
          {resumeData.achievements.map((item, i) => {
            const isExpanded = expandedId === item.id
            const quickBI = isQuickBI(item.id)
            const teamBuilding = isTeamBuilding(item.id)
            const rdsArch = isRdsArch(item.id)
            const businessData = isBusinessData(item.id)
            const navigable = quickBI || teamBuilding || rdsArch || businessData
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
                  } else {
                    setExpandedId(isExpanded ? null : item.id)
                  }
                }}
                className={`w-full text-left p-5 rounded-lg border transition-all duration-300 animate-fade-in-up hover-lift ${
                  isExpanded
                    ? "border-primary/40 glow-neon"
                    : "border-border"
                } surface-elevated ${navigable ? "cursor-pointer" : ""}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-foreground">
                        {item.id}. {item.title}
                      </h3>
                      {quickBI ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-primary/15 text-primary border border-primary/20">
                          <BarChart3 className="w-3 h-3" />
                          查看看板
                        </span>
                      ) : teamBuilding ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-primary/15 text-primary border border-primary/20">
                          <Users className="w-3 h-3" />
                          查看数据
                        </span>
                      ) : rdsArch ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-primary/15 text-primary border border-primary/20">
                          <Database className="w-3 h-3" />
                          查看架构
                        </span>
                      ) : businessData ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-primary/15 text-primary border border-primary/20">
                          <Layers className="w-3 h-3" />
                          查看设计
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>

                    {/* Expanded details */}
                    {!navigable && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded
                            ? "max-h-96 opacity-100 mt-4"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {navigable ? (
                    <ExternalLink className="w-5 h-5 text-primary shrink-0 ml-4 mt-1" />
                  ) : (
                    <ChevronRight
                      className={`w-5 h-5 text-muted-foreground shrink-0 ml-4 mt-1 transition-transform duration-300 ${
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
