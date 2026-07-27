import { useNavigate } from "react-router-dom"
import { resumeData } from "@/data/resume"
import { Target, ArrowRight, FolderOpen } from "lucide-react"

/* ─── 代表性项目案例入口组件 ─── */
export function ProjectsSection() {
  const navigate = useNavigate()

  const projectRoutes = ["/project-ad-analysis", "/project-inventory-forecast", "/project-inventory-optimization"]
  const projectDescriptions = [
    "ACOS 偏高、ROI 偏低问题的完整假设检验分析过程",
    "需求波动建模、安全库存与滚动预测体系",
    "库存结构失衡、销量结构不合理的综合诊断与优化"
  ]

  return (
    <section id="projects" className="py-24 px-6 bg-surface-1">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-3">
            代表性项目案例
          </h2>
          <p className="text-secondary">
            三大核心项目的完整分析思路、方法论与落地成果
          </p>
        </div>

        {/* 项目入口列表 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resumeData.projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => navigate(projectRoutes[index])}
              className="group relative p-6 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-apple-md transition-all duration-300 text-left animate-apple-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* 项目编号 */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-lg font-bold text-primary">{project.id}</span>
              </div>

              {/* 项目名称 */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.name}
              </h3>

              {/* 业务目标 */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary mb-3">
                <Target className="w-3 h-3" />
                <span>{project.businessGoal}</span>
              </div>

              {/* 简短描述 */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {projectDescriptions[index]}
              </p>

              {/* 查看详情 */}
              <div className="flex items-center gap-1.5 text-sm text-primary font-medium">
                <FolderOpen className="w-4 h-4" />
                <span>点击查看完整项目</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10 text-center">
          <p className="text-sm text-secondary">
            每个项目均可点击查看完整内容 · 包含业务背景、分析方法、假设验证与优化结果
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
