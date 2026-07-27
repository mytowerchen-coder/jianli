import { Routes, Route } from "react-router-dom"
import { Navigation } from "@/components/Navigation"
import { HeroSection } from "@/components/HeroSection"
import { AchievementsSection } from "@/components/AchievementsSection"
import { ChatSection } from "@/components/ChatSection"
import { Footer } from "@/components/Footer"
import BIDashboard from "@/pages/BIDashboard"
import TeamBuildingPage from "@/pages/TeamBuildingPage"
import RdsArchitecturePage from "@/pages/RdsArchitecturePage"
import BusinessDataDesignPage from "@/pages/BusinessDataDesignPage"
import AIInventoryDemo from "@/pages/AIInventoryDemo"
import ProjectsPage from "@/pages/ProjectsPage"
import Project1Page from "@/pages/Project1Page"
import Project2Page from "@/pages/Project2Page"
import Project3Page from "@/pages/Project3Page"

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <AchievementsSection />
        <ChatSection />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bi-dashboard" element={<BIDashboard />} />
      <Route path="/team-building" element={<TeamBuildingPage />} />
      <Route path="/rds-architecture" element={<RdsArchitecturePage />} />
      <Route path="/business-data-design" element={<BusinessDataDesignPage />} />
      <Route path="/ai-inventory-demo" element={<AIInventoryDemo />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/project-ad-analysis" element={<Project1Page />} />
      <Route path="/project-inventory-forecast" element={<Project2Page />} />
      <Route path="/project-inventory-optimization" element={<Project3Page />} />
    </Routes>
  )
}

export default App
