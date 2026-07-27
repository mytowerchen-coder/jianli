import { useState } from "react"
import { ChevronDown, Server, Cpu, UserCheck, ArrowDown, Database, ShoppingCart, FileText, BarChart3, Package, TrendingUp, AlertTriangle, FileSpreadsheet, Gauge, Layers, Bot, Link2 } from "lucide-react"

/* ─── 三层AI数字化能力体系 ─── */
export function AIFrameworkSection() {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(1)

  // AI基础设施数据
  const infrastructureItems = [
    { icon: ShoppingCart, name: "Amazon API / MCP" },
    { icon: ShoppingCart, name: "Shopify API / MCP" },
    { icon: FileText, name: "ERP（领星、马帮、店小秘）" },
    { icon: Package, name: "WMS / OMS" },
    { icon: BarChart3, name: "财务系统" },
    { icon: Layers, name: "飞书 / 企业微信" },
    { icon: Link2, name: "广告平台" },
    { icon: Database, name: "数据仓库" },
  ]

  // Business SDK 九宫格
  const businessCapabilities = [
    { icon: Package, name: "库存分析", desc: "自动识别断货风险、库存积压及补货建议" },
    { icon: TrendingUp, name: "广告分析", desc: "多维度广告效果分析，自动发现优化空间" },
    { icon: BarChart3, name: "利润分析", desc: "自动识别利润下降原因，拆解广告、物流、采购影响因素" },
    { icon: Server, name: "供应链分析", desc: "全链路供应链健康度分析，识别瓶颈环节" },
    { icon: TrendingUp, name: "销量预测", desc: "基于历史数据和市场趋势的智能预测" },
    { icon: AlertTriangle, name: "经营诊断", desc: "自动分析经营健康度，定位真正的问题来源" },
    { icon: AlertTriangle, name: "异常预警", desc: "关键指标异常实时预警，自动触发处理流程" },
    { icon: FileSpreadsheet, name: "自动报表", desc: "按需生成日报、周报、月报，自动推送" },
    { icon: Gauge, name: "数据驾驶舱", desc: "企业级经营看板，实时掌握全局运营状态" },
  ]

  // AI数字员工
  const aiEmployees = [
    {
      icon: Bot,
      name: "AI广告经理",
      inputs: "每天分析广告数据",
      outputs: ["自动发现问题", "输出优化建议", "自动生成广告周报"]
    },
    {
      icon: Bot,
      name: "AI供应链经理",
      inputs: "监控库存与物流",
      outputs: ["预测补货需求", "预警断货风险", "优化库存周转"]
    },
    {
      icon: Bot,
      name: "AI运营经理",
      inputs: "巡检店铺运营",
      outputs: ["发现异常订单", "追踪差评原因", "推动客服整改"]
    },
    {
      icon: Bot,
      name: "AI数据分析师",
      inputs: "处理数据需求",
      outputs: ["快速响应查询", "自动生成分析", "输出数据洞察"]
    },
    {
      icon: Bot,
      name: "AI数字化负责人",
      inputs: "每天巡检经营数据",
      outputs: ["自动分析利润变化", "生成经营分析报告", "推动跨部门整改任务"]
    },
  ]

  const toggleLayer = (layer: number) => {
    setExpandedLayer(expandedLayer === layer ? null : layer)
  }

  return (
    <div className="mt-8 pt-8 border-t border-border/50">
      {/* 模块标题 */}
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold tracking-tight mb-3">
          企业AI数字化能力体系
        </h3>
        <p className="text-secondary text-sm max-w-2xl mx-auto">
          企业购买的不是AI，而是业务能力。
        </p>
      </div>

      {/* ─── 三层金字塔 ─── */}
      <div className="space-y-4">

        {/* 第一层：AI基础设施 */}
        <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${expandedLayer === 1 ? 'border-primary/30 shadow-apple-md' : 'border-border hover:border-border/80'}`}>
          <button
            onClick={() => toggleLayer(1)}
            className="w-full p-6 text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Server className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">1</span>
                  AI基础设施（Infrastructure）
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  连接企业所有数据，让AI真正拥有"双手"
                </p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${expandedLayer === 1 ? 'rotate-180' : ''}`} />
          </button>

          {expandedLayer === 1 && (
            <div className="px-6 pb-6 animate-apple-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {infrastructureItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-xs text-secondary truncate">{item.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/80 bg-muted/30 p-3 rounded-lg">
                这一层负责完成数据连接、权限管理、接口封装、MCP能力建设，为AI提供统一的数据访问能力。<strong className="text-foreground">打通企业数据孤岛。</strong>
              </p>
            </div>
          )}
        </div>

        {/* 第二层：Business SDK */}
        <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${expandedLayer === 2 ? 'border-primary/30 shadow-apple-md' : 'border-border hover:border-border/80'}`}>
          <button
            onClick={() => toggleLayer(2)}
            className="w-full p-6 text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Cpu className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">2</span>
                  Business SDK（业务能力层）
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  把数据转换成企业真正需要的经营能力
                </p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${expandedLayer === 2 ? 'rotate-180' : ''}`} />
          </button>

          {expandedLayer === 2 && (
            <div className="px-6 pb-6 animate-apple-in">
              {/* 核心观点 */}
              <div className="text-center mb-6 p-4 bg-primary/5 rounded-xl">
                <p className="text-primary font-medium">
                  企业真正购买的不是API，而是经营能力。
                </p>
              </div>

              {/* 九宫格能力卡片 */}
              <div className="grid grid-cols-3 gap-3">
                {businessCapabilities.map((cap, i) => (
                  <div key={i} className="p-4 bg-muted/50 rounded-xl text-center">
                    <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center mx-auto mb-2">
                      <cap.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <h5 className="text-sm font-semibold mb-1">{cap.name}</h5>
                    <p className="text-xs text-muted-foreground leading-snug">{cap.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground/80 mt-4 text-center">
                不是调用API，而是沉淀企业数字化能力
              </p>
            </div>
          )}
        </div>

        {/* 第三层：AI数字员工 */}
        <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${expandedLayer === 3 ? 'border-primary/30 shadow-apple-md' : 'border-border hover:border-border/80'}`}>
          <button
            onClick={() => toggleLayer(3)}
            className="w-full p-6 text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">3</span>
                  AI数字员工（AI Workforce）
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  让AI真正承担岗位职责，而不仅仅回答问题
                </p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${expandedLayer === 3 ? 'rotate-180' : ''}`} />
          </button>

          {expandedLayer === 3 && (
            <div className="px-6 pb-6 animate-apple-in">
              {/* AI员工卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {aiEmployees.map((emp, i) => (
                  <div key={i} className="p-4 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <emp.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h5 className="text-sm font-semibold text-center mb-3">{emp.name}</h5>
                    <div className="space-y-2">
                      <div className="text-xs">
                        <span className="text-muted-foreground">输入：</span>
                        <span className="text-secondary">{emp.inputs}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">输出：</span>
                        <div className="mt-1 space-y-0.5">
                          {emp.outputs.map((out, j) => (
                            <div key={j} className="flex items-center gap-1">
                              <span className="w-1 h-1 bg-primary rounded-full" />
                              <span className="text-secondary">{out}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground/80 mt-4 text-center p-3 bg-muted/30 rounded-lg">
                企业招聘的是岗位，我们交付的是AI岗位能力
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ─── 完整架构流程图 ─── */}
      <div className="mt-10 p-6 bg-muted/30 rounded-2xl">
        <h5 className="text-sm font-medium text-muted-foreground text-center mb-6">企业AI数字化升级路径</h5>
        <div className="flex flex-col items-center gap-2">
          {[
            { label: "企业系统", icon: Layers },
            { label: "AI基础设施", icon: Server },
            { label: "Business SDK", icon: Cpu },
            { label: "AI数字员工", icon: UserCheck },
            { label: "企业经营增长", icon: TrendingUp },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-background rounded-lg border border-border">
                <step.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{step.label}</span>
              </div>
              {i < 4 && (
                <ArrowDown className="w-4 h-4 text-muted-foreground animate-bounce" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 底部价值主张 */}
      <div className="mt-8 text-center">
        <p className="text-base text-secondary">
          从数据连接，到业务能力，再到AI员工，帮助跨境电商企业完成真正的AI数字化升级。
        </p>
      </div>
    </div>
  )
}
