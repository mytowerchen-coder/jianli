import { useEffect } from "react"
import { ArrowLeft, Package, TrendingUp, AlertTriangle, DollarSign, CheckCircle2, ArrowDown, ChevronRight, Database, ShoppingCart, Truck, CreditCard, BarChart3, Clock, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function AIInventoryDemo() {
  const navigate = useNavigate()

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 今日发现的问题
  const issues = [
    {
      type: "高风险",
      color: "red",
      sku: "A10086",
      content: "预计17天后断货。Prime Day预计销量增长42%。",
      action: "建议立即安排空运500件。",
      savings: "¥68,000",
    },
    {
      type: "中风险",
      color: "yellow",
      sku: "B20315",
      content: "库存积压128天。",
      action: "建议暂停采购。",
      savings: "¥126,000",
    },
    {
      type: "提醒",
      color: "blue",
      sku: "C88502",
      content: "供应商近三个月交付延期率达到21%。",
      action: "建议增加安全库存。",
      savings: null,
    },
  ]

  // AI工作记录
  const workLog = [
    { time: "09:05", action: "完成库存巡检" },
    { time: "09:12", action: "发现18个风险SKU" },
    { time: "09:18", action: "生成补货建议" },
    { time: "09:26", action: "生成采购清单" },
    { time: "09:31", action: "同步采购经理" },
    { time: "09:36", action: "生成今日库存日报" },
  ]

  // 能力说明
  const capabilities = [
    {
      icon: Package,
      title: "自动巡检库存",
      desc: "每天自动检查全部SKU，无需人工导出数据",
    },
    {
      icon: TrendingUp,
      title: "智能补货预测",
      desc: "结合销量、采购、运输等数据自动预测库存需求",
    },
    {
      icon: AlertTriangle,
      title: "经营风险预警",
      desc: "提前识别断货、积压、供应商异常等经营风险",
    },
    {
      icon: DollarSign,
      title: "自动生成采购建议",
      desc: "直接输出采购计划，帮助采购团队快速执行",
    },
  ]

  const getRiskColor = (color: string) => {
    switch (color) {
      case "red": return "bg-red-50 border-red-200 text-red-700"
      case "yellow": return "bg-yellow-50 border-yellow-200 text-yellow-700"
      case "blue": return "bg-blue-50 border-blue-200 text-blue-700"
      default: return ""
    }
  }

  const getRiskDot = (color: string) => {
    switch (color) {
      case "red": return "bg-red-500"
      case "yellow": return "bg-yellow-500"
      case "blue": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Button>
          <h1 className="text-lg font-semibold">AI数字员工Demo</h1>
          <div className="w-20" />
        </div>
      </div>

      {/* 主内容 */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* ─── 页面标题 ─── */}
        <section className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold tracking-tight">AI库存经理</h2>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                正在工作
              </span>
            </div>
            <p className="text-secondary max-w-2xl">
              每天自动巡检库存、预测销量、识别风险、生成补货方案，让库存管理从"发现问题"升级到"提前预防问题"。
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              最近一次巡检：今天09:36
            </p>
          </div>
        </section>

        {/* 数据来源标签 */}
        <div className="text-xs text-muted-foreground/60 bg-muted/50 inline-flex items-center gap-2 px-3 py-1.5 rounded-full">
          <Database className="w-3 h-3" />
          数据来源：Amazon Seller Central | ERP | 采购系统 | 广告平台（实时同步）
        </div>

        {/* ─── 第一部分：今日巡检概览 ─── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-2 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">库存SKU</span>
            </div>
            <div className="text-3xl font-bold">1,286</div>
          </div>
          <div className="bg-surface-2 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm text-muted-foreground">今日完成巡检</span>
            </div>
            <div className="text-3xl font-bold text-green-600">1,286</div>
          </div>
          <div className="bg-surface-2 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">发现风险SKU</span>
            </div>
            <div className="text-3xl font-bold text-yellow-600">18</div>
          </div>
          <div className="bg-surface-2 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">预计节省库存损失</span>
            </div>
            <div className="text-3xl font-bold text-green-600">¥286,000</div>
          </div>
        </section>

        {/* ─── 第二部分：库存健康评分 & 第三部分：AI发现的问题 ─── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 库存健康评分 */}
          <div className="bg-surface-2 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6">库存健康度</h3>
            <div className="text-center py-8">
              <div className="text-7xl font-bold text-green-600 mb-2">91</div>
              <div className="text-lg font-medium text-green-600 mb-4">优秀</div>
              <p className="text-xs text-muted-foreground mb-6">
                AI综合销量、库存、采购周期、运输周期、广告计划等多个维度自动计算
              </p>
            </div>
            {/* 健康条 */}
            <div className="space-y-3">
              {[
                { name: "库存", score: 95 },
                { name: "广告", score: 88 },
                { name: "物流", score: 82 },
                { name: "资金", score: 92 },
                { name: "供应商", score: 85 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-16">{item.name}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.score >= 90 ? 'bg-green-500' : item.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8">{item.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI发现的问题 */}
          <div className="bg-surface-2 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6">AI今日发现的问题</h3>
            <div className="space-y-4">
              {issues.map((issue, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 border ${getRiskColor(issue.color)}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${getRiskDot(issue.color)}`} />
                    <span className="text-sm font-medium">{issue.type}</span>
                    <span className="text-sm text-muted-foreground">SKU：{issue.sku}</span>
                  </div>
                  <p className="text-sm mb-2">{issue.content}</p>
                  <p className="text-sm font-medium mb-1">{issue.action}</p>
                  {issue.savings && (
                    <p className="text-sm text-green-600 font-medium">
                      预计节省：{issue.savings}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 第四部分：AI补货方案 ─── */}
        <section className="bg-surface-2 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6">AI自动生成补货方案</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 左侧：分析流程 */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-4">AI分析过程</h4>
              <div className="flex flex-col items-center gap-2">
                {[
                  { icon: TrendingUp, name: "销量趋势" },
                  { icon: Truck, name: "运输周期" },
                  { icon: Package, name: "供应商交期" },
                  { icon: BarChart3, name: "广告活动" },
                  { icon: Database, name: "库存水位" },
                  { icon: CreditCard, name: "现金流" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 w-full">
                    <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border">
                      <step.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{step.name}</span>
                    </div>
                    {i < 5 && <ArrowDown className="w-4 h-4 text-muted-foreground mx-auto" />}
                  </div>
                ))}
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg mt-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">生成补货方案</span>
                </div>
              </div>
            </div>

            {/* 右侧：输出结果 */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-4">AI输出结果</h4>
              <div className="bg-background rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium">SKU</th>
                      <th className="text-right p-3 font-medium">建议数量</th>
                      <th className="text-right p-3 font-medium">运输方式</th>
                      <th className="text-right p-3 font-medium">预计到货</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { sku: "A10086", qty: "500件", ship: "空运", eta: "5天后" },
                      { sku: "A10234", qty: "200件", ship: "海运", eta: "18天后" },
                      { sku: "B20315", qty: "0件", ship: "暂停采购", eta: "-" },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="p-3 font-medium">{row.sku}</td>
                        <td className="p-3 text-right">{row.qty}</td>
                        <td className="p-3 text-right">{row.ship}</td>
                        <td className="p-3 text-right text-muted-foreground">{row.eta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-3 mt-4">
                <Button className="rounded-lg flex-1">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  查看完整补货方案
                </Button>
                <Button variant="outline" className="rounded-lg gap-2">
                  <Download className="w-4 h-4" />
                  导出Excel
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 第五部分：AI工作记录 ─── */}
        <section className="bg-surface-2 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6">AI今日工作记录</h3>
          <div className="flex flex-col gap-0">
            {workLog.map((log, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
                <span className="text-sm font-medium text-primary w-12">{log.time}</span>
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-secondary">{log.action}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 第六部分：能力说明 ─── */}
        <section className="bg-surface-2 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2">AI不是查看库存，而是承担库存管理岗位职责</h3>
          <p className="text-sm text-muted-foreground mb-6">
            企业需要的不是一个会回答问题的AI，而是一位每天主动工作的AI库存经理
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {capabilities.map((cap, i) => (
              <div key={i} className="bg-background rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <cap.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-semibold mb-1">{cap.title}</h4>
                <p className="text-xs text-muted-foreground">{cap.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── AI数字员工矩阵 ─── */}
        <section className="bg-surface-2 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2">AI数字员工矩阵</h3>
          <p className="text-sm text-muted-foreground mb-6">
            如果库存经理可以AI化，那广告经理、运营经理、采购经理是不是也可以？
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* 已上线 */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-600 font-medium">当前演示</span>
              </div>
              <h4 className="font-semibold text-sm">AI库存经理</h4>
            </div>
            {/* 即将上线 */}
            {[
              "AI广告经理",
              "AI运营经理",
              "AI数据分析师",
              "AI数字化负责人",
            ].map((role, i) => (
              <div key={i} className="bg-muted/50 rounded-xl p-4 opacity-60">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">即将上线</span>
                </div>
                <h4 className="font-semibold text-sm text-muted-foreground">{role}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 底部CTA ─── */}
        <section className="text-center py-12 border-t border-border">
          <p className="text-xl text-secondary mb-4">
            您需要的不只是系统，
          </p>
          <p className="text-2xl font-bold text-primary mb-6">
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
