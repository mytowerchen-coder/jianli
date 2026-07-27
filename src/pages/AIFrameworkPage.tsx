import { useEffect } from "react"
import { ArrowLeft, Server, Cpu, UserCheck, ArrowDown, ShoppingCart, FileText, Package, BarChart3, Layers, Database, Link2, TrendingUp, AlertTriangle, FileSpreadsheet, Gauge, Bot, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function AIFrameworkPage() {
  const navigate = useNavigate()

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // AI基础设施数据
  const infrastructureItems = [
    { icon: ShoppingCart, name: "Amazon API / MCP", desc: "亚马逊平台数据连接" },
    { icon: ShoppingCart, name: "Shopify API / MCP", desc: "Shopify独立站数据对接" },
    { icon: FileText, name: "ERP系统", desc: "领星、马帮、店小秘" },
    { icon: Package, name: "WMS / OMS", desc: "仓储与订单管理系统" },
    { icon: BarChart3, name: "财务系统", desc: "金蝶、用友等财务数据" },
    { icon: Layers, name: "协作平台", desc: "飞书、企业微信" },
    { icon: Link2, name: "广告平台", desc: "Amazon DSP、Google Ads" },
    { icon: Database, name: "数据仓库", desc: "阿里云RDS、数据湖" },
  ]

  // Business SDK 九宫格
  const businessCapabilities = [
    {
      icon: Package,
      name: "库存分析",
      desc: "自动识别断货风险、库存积压及补货建议",
      details: "基于历史销售数据和市场趋势，智能预测补货时机，减少断货损失和库存积压。"
    },
    {
      icon: TrendingUp,
      name: "广告分析",
      desc: "多维度广告效果分析，自动发现优化空间",
      details: "追踪ACoS、TACoS、ROAS等核心指标，自动识别高曝光低转化问题，输出优化建议。"
    },
    {
      icon: BarChart3,
      name: "利润分析",
      desc: "自动识别利润下降原因，拆解影响因素",
      details: "从广告、物流、采购、平台费用多维度拆解利润变化，定位真正亏损SKU。"
    },
    {
      icon: Package,
      name: "供应链分析",
      desc: "全链路供应链健康度分析",
      details: "从采购到入仓到出库全流程追踪，识别物流瓶颈和仓储成本优化空间。"
    },
    {
      icon: TrendingUp,
      name: "销量预测",
      desc: "基于历史数据和市场趋势的智能预测",
      details: "结合季节性、促销活动、市场趋势，预测未来销量，指导备货决策。"
    },
    {
      icon: AlertTriangle,
      name: "经营诊断",
      desc: "自动分析经营健康度，定位问题来源",
      details: "从财务、运营、库存多角度诊断企业经营状况，发现隐藏风险和机会。"
    },
    {
      icon: AlertTriangle,
      name: "异常预警",
      desc: "关键指标异常实时预警",
      details: "利润异常、库存异常、差评激增等情况自动预警，触发处理流程。"
    },
    {
      icon: FileSpreadsheet,
      name: "自动报表",
      desc: "按需生成日报、周报、月报",
      details: "告别手工整理数据，自动生成结构化报表，按时推送给相关人员。"
    },
    {
      icon: Gauge,
      name: "数据驾驶舱",
      desc: "企业级经营看板，实时全局掌控",
      details: "一屏掌握企业核心经营指标，支持多维度下钻和实时数据刷新。"
    },
  ]

  // AI数字员工
  const aiEmployees = [
    {
      icon: Bot,
      name: "AI广告经理",
      inputs: "每天分析广告数据",
      outputs: ["自动发现效果异常", "输出优化建议", "生成广告周报"],
      duties: "负责广告投放效果监控、问题诊断、优化建议生成、定期报告输出。"
    },
    {
      icon: Bot,
      name: "AI供应链经理",
      inputs: "监控库存与物流",
      outputs: ["预测补货需求", "预警断货风险", "优化库存周转"],
      duties: "负责供应链健康度监控、库存周转优化、采购建议生成。"
    },
    {
      icon: Bot,
      name: "AI运营经理",
      inputs: "巡检店铺运营",
      outputs: ["发现异常订单", "追踪差评原因", "推动客服整改"],
      duties: "负责店铺运营健康度监控、异常订单追踪、差评原因分析。"
    },
    {
      icon: Bot,
      name: "AI数据分析师",
      inputs: "处理数据需求",
      outputs: ["快速响应查询", "自动生成分析", "输出数据洞察"],
      duties: "负责数据需求响应、临时分析需求、常规数据提取。"
    },
    {
      icon: Bot,
      name: "AI数字化负责人",
      inputs: "每天巡检经营数据",
      outputs: ["分析利润变化", "生成经营报告", "推动跨部门整改"],
      duties: "负责企业经营全局监控、跨部门协调推动、战略级分析报告。"
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Button>
          <h1 className="text-lg font-semibold">企业AI数字化能力体系</h1>
          <div className="w-20" />
        </div>
      </div>

      {/* 主内容 */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">

        {/* ─── 核心观点 ─── */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">核心观点</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            企业购买的不是AI
            <br />
            <span className="text-primary">而是业务能力</span>
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            从数据连接，到业务能力，再到AI员工，
            帮助跨境电商企业完成真正的AI数字化升级。
          </p>
        </section>

        {/* ─── 架构流程图 ─── */}
        <section className="flex justify-center">
          <div className="inline-block bg-surface-2 rounded-2xl p-8">
            <h3 className="text-sm font-medium text-muted-foreground text-center mb-6">企业AI数字化升级路径</h3>
            <div className="flex flex-col items-center gap-3">
              {[
                { label: "企业系统", icon: Layers, color: "bg-muted" },
                { label: "AI基础设施", icon: Server, color: "bg-blue-100" },
                { label: "Business SDK", icon: Cpu, color: "bg-green-100" },
                { label: "AI数字员工", icon: UserCheck, color: "bg-purple-100" },
                { label: "企业经营增长", icon: TrendingUp, color: "bg-primary/20" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`flex items-center gap-3 px-6 py-3 ${step.color} rounded-xl`}>
                    <step.icon className="w-5 h-5 text-foreground" />
                    <span className="text-sm font-semibold">{step.label}</span>
                  </div>
                  {i < 4 && (
                    <ArrowDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 第一层：AI基础设施 ─── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Server className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-bold flex items-center justify-center">1</span>
                <h3 className="text-2xl font-bold">AI基础设施</h3>
              </div>
              <p className="text-muted-foreground">连接企业所有数据，让AI真正拥有"双手"</p>
            </div>
          </div>

          <div className="bg-surface-2 rounded-2xl p-8">
            <p className="text-secondary mb-6">
              这一层负责完成数据连接、权限管理、接口封装、MCP能力建设，为AI提供统一的数据访问能力。
              <strong className="text-foreground">打通企业数据孤岛。</strong>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {infrastructureItems.map((item, i) => (
                <div key={i} className="bg-background rounded-xl p-4 border border-border hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 第二层：Business SDK ─── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <Cpu className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 text-sm font-bold flex items-center justify-center">2</span>
                <h3 className="text-2xl font-bold">Business SDK</h3>
              </div>
              <p className="text-muted-foreground">把数据转换成企业真正需要的经营能力</p>
            </div>
          </div>

          {/* 核心理念 */}
          <div className="text-center mb-8 p-6 bg-primary/5 rounded-2xl">
            <p className="text-lg text-primary font-medium">
              企业真正购买的不是API，而是经营能力。
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              不是调用API，而是沉淀企业数字化能力
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessCapabilities.map((cap, i) => (
              <div key={i} className="bg-surface-2 rounded-2xl p-6 hover:shadow-apple-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-4">
                  <cap.icon className="w-6 h-6 text-foreground" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{cap.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{cap.desc}</p>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-secondary leading-relaxed">{cap.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── AI库存经理Demo ─── */}
        <section>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              看看AI库存经理每天在做什么？
            </h3>
            <p className="text-muted-foreground">
              每天自动巡检库存、预测销量、识别风险、生成补货方案
            </p>
          </div>

          <div className="bg-surface-2 rounded-2xl p-6">
            {/* 模拟演示界面 */}
            <div className="bg-background rounded-xl border border-border overflow-hidden">
              {/* 模拟浏览器顶部栏 */}
              <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground">ai-inventory-manager.demo</span>
                </div>
              </div>

              {/* 模拟仪表盘内容 */}
              <div className="p-6 space-y-4">
                {/* 指标卡片行 */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">SKU总数</div>
                    <div className="text-xl font-bold">2,847</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-xs text-green-600 mb-1">巡检状态</div>
                    <div className="text-xl font-bold text-green-600">已完成</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="text-xs text-red-600 mb-1">风险SKU</div>
                    <div className="text-xl font-bold text-red-600">12</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-blue-600 mb-1">预计节省</div>
                    <div className="text-xl font-bold text-blue-600">¥48.2K</div>
                  </div>
                </div>

                {/* 健康度进度条 */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">库存健康度</span>
                    <span className="font-semibold">91/100</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '91%' }} />
                  </div>
                </div>

                {/* AI发现的风险 */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">AI发现的问题</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-sm">ASIN-B8X92 库销比异常，预计15天后断货</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">ASIN-M4K27 库龄超90天，库存周转率偏低</span>
                    </div>
                  </div>
                </div>

                {/* 补货方案预览 */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">AI补货方案</div>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="text-left p-2 font-medium">ASIN</th>
                          <th className="text-right p-2 font-medium">建议补货</th>
                          <th className="text-right p-2 font-medium">紧急度</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-border">
                          <td className="p-2">ASIN-B8X92</td>
                          <td className="p-2 text-right">500件</td>
                          <td className="p-2 text-right text-red-500">高</td>
                        </tr>
                        <tr className="border-t border-border bg-muted/10">
                          <td className="p-2">ASIN-M4K27</td>
                          <td className="p-2 text-right">200件</td>
                          <td className="p-2 text-right text-yellow-500">中</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* 查看完整演示按钮 */}
            <div className="mt-6 text-center">
              <Button
                onClick={() => navigate("/ai-inventory-demo")}
                size="lg"
                className="rounded-full px-8 gap-2"
              >
                <Bot className="w-5 h-5" />
                查看完整演示
              </Button>
            </div>
          </div>
        </section>

        {/* ─── 第三层：AI数字员工 ─── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
              <UserCheck className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 text-sm font-bold flex items-center justify-center">3</span>
                <h3 className="text-2xl font-bold">AI数字员工</h3>
              </div>
              <p className="text-muted-foreground">让AI真正承担岗位职责，而不仅仅回答问题</p>
            </div>
          </div>

          <div className="text-center mb-8 p-6 bg-primary/5 rounded-2xl">
            <p className="text-lg text-primary font-medium">
              我提供的是AI落地应用能力
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {aiEmployees.map((emp, i) => (
              <div key={i} className="bg-surface-2 rounded-2xl p-5">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <emp.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-base font-semibold text-center mb-3">{emp.name}</h4>

                <div className="space-y-3">
                  <div className="text-xs">
                    <span className="text-muted-foreground">职责：</span>
                    <p className="text-secondary mt-1">{emp.duties}</p>
                  </div>

                  <div className="pt-3 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">典型输入：</span>
                    <p className="text-sm text-foreground mt-1">{emp.inputs}</p>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground">典型输出：</span>
                    <div className="mt-2 space-y-1">
                      {emp.outputs.map((out, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                          <span className="text-secondary">{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 底部总结 ─── */}
        <section className="text-center py-12 border-t border-border">
          <h3 className="text-2xl font-bold mb-4">您需要的不只是系统</h3>
          <p className="text-xl text-primary font-medium mb-6">
            而是真正能够落地的数字化能力
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/#chat")}
            className="rounded-full px-8"
          >
            了解更多合作方式
          </Button>
        </section>

      </div>
    </div>
  )
}
