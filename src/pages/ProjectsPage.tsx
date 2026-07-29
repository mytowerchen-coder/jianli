import { ProjectsSection } from "@/components/ProjectsSection"
import { Footer } from "@/components/Footer"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ProjectsPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </button>
        </div>
      </nav>
      <main>
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  )
}
