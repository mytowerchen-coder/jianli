import { Footer } from "@/components/Footer"
import { ArrowLeft, TrendingUp, Table, CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Project3Page() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回项目列表
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* 项目标题 */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            项目三 · 业务目标：资金效率
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            库存优化与周转提升
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>多 ASIN 跨境卖家</span>
            <span>·</span>
            <span>30+ ASIN</span>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="space-y-12">

          {/* 一、项目背景 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">一</span>
              项目背景
            </h2>
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-5">
                <h3 className="font-semibold mb-3 text-red-600">背景描述（脱敏）</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">·</span>
                    <span>公司为多 ASIN 跨境卖家（30+ ASIN）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">·</span>
                    <span>同时存在：</span>
                  </li>
                  <li className="flex items-start gap-3 pl-6">
                    <span className="text-red-400">-</span>
                    <span>部分 ASIN 断货频繁</span>
                  </li>
                  <li className="flex items-start gap-3 pl-6">
                    <span className="text-red-400">-</span>
                    <span>部分 ASIN 库存积压严重</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">·</span>
                    <span>表现为：</span>
                  </li>
                  <li className="flex items-start gap-3 pl-6">
                    <span className="text-red-400">-</span>
                    <span>仓储费用持续上升</span>
                  </li>
                  <li className="flex items-start gap-3 pl-6">
                    <span className="text-red-400">-</span>
                    <span>资金占用率高</span>
                  </li>
                  <li className="flex items-start gap-3 pl-6">
                    <span className="text-red-400">-</span>
                    <span>广告与库存节奏不匹配</span>
                  </li>
                </ul>
              </div>
              <div className="bg-yellow-50/50 border border-yellow-300 rounded-xl p-5">
                <p className="font-semibold text-yellow-800">👉 这是一个"典型库存失衡问题"，不是简单的"库存多或少"</p>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 二、分析目标 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">二</span>
              分析目标
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                分析目标不是简单降库存，而是在保证不断货的前提下，提升整体库存周转效率，释放现金流。库存周转不是"库存部门问题"，而是 <span className="text-primary font-semibold">销售 × 供应链 × 现金流</span> 的综合结果
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>库存问题的关键不是"库存多"，而是 <span className="text-primary font-semibold">库存结构失衡 + 销量结构不合理</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>目标不是极致周转，而是 <span className="text-primary font-semibold">在保障增长下提升资金回笼效率</span></span>
                </li>
              </ul>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 三、核心指标体系 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">三</span>
              核心指标体系
            </h2>
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-lg">1️⃣ 核心指标</p>
              </div>
              <div className="bg-blue-50/50 border border-blue-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-blue-100/50">
                    <tr>
                      <th className="text-left p-3 font-medium text-blue-700">指标</th>
                      <th className="text-left p-3 font-medium text-blue-700">定义</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100">
                    <tr>
                      <td className="p-3 font-medium">销售成本（COGS）</td>
                      <td className="p-3 text-muted-foreground">实际售出商品的成本</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">平均库存成本</td>
                      <td className="p-3 text-muted-foreground">周期内库存成本的平均值</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">库存周转率</td>
                      <td className="p-3 text-muted-foreground">销售成本 ÷ 平均库存成本</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">库存周转天数</td>
                      <td className="p-3 text-muted-foreground">周期天数 ÷ 库存周转率</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">缺货率</td>
                      <td className="p-3 text-muted-foreground">缺货天数 ÷ 总天数</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">覆盖天数</td>
                      <td className="p-3 text-muted-foreground">当前库存 ÷ 日均销量</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 四、第一层假设 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">四</span>
              第一层假设：库存周转率偏低是否真实存在？
            </h2>
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-5">
                <p className="font-semibold mb-3">假设 H0 / H1</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><span>H0：</span><span>库存周转率处于公司可接受区间</span></li>
                  <li className="flex items-start gap-2"><span>H1：</span><span>库存周转率显著低于目标区间</span></li>
                </ul>
              </div>
              <div className="bg-muted/30 rounded-xl p-5">
                <p className="font-semibold mb-3">做法（脱敏）：</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><span>按 ASIN 计算库存周转率</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><span>与历史周期 / 类目均值对比</span></li>
                </ul>
              </div>
              <div className="bg-yellow-50/50 border border-yellow-300 rounded-xl p-4">
                <p className="font-semibold text-yellow-800 mb-2">👉 结论：</p>
                <ul className="space-y-1 text-yellow-700">
                  <li>- 部分 ASIN 周转率 &lt; 3</li>
                  <li>- 同时库存金额占比 &gt; 50%</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 五、第二层假设 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">五</span>
              第二层假设：是「卖得慢」还是「备货过多」？
            </h2>
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">库存周转率公式</p>
                <p className="font-mono font-bold">库存周转率 = 销售成本 ÷ 平均库存成本</p>
              </div>
              <p className="font-medium">假设拆解：</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4">
                  <p className="font-semibold text-blue-700">H1-1</p>
                  <p className="text-blue-600 text-sm mt-1">销售端问题（销量下降）</p>
                </div>
                <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-4">
                  <p className="font-semibold text-purple-700">H1-2</p>
                  <p className="text-purple-600 text-sm mt-1">供应链端问题（备货过量）</p>
                </div>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 六、核心抓手 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">六</span>
              核心抓手（在做上述假设验证之前，优先做）
            </h2>
            <div className="space-y-6">
              {/* 抓手一 */}
              <div className="bg-red-50/50 border border-red-200 rounded-xl p-5">
                <h3 className="font-semibold text-red-700 mb-3">抓手一｜库存结构重构</h3>
                <ul className="space-y-2 text-red-600">
                  <li className="flex items-start gap-2"><span>·</span><span>按 ASIN × 库龄（0–30 / 31–90 / 91–180 / 180+）分层</span></li>
                  <li className="flex items-start gap-2"><span>·</span><span>明确三类库存：</span></li>
                  <li className="flex items-start gap-3 pl-6"><span className="text-green-500">-</span><span>动销库存（重点保障）</span></li>
                  <li className="flex items-start gap-3 pl-6"><span className="text-yellow-500">-</span><span>慢销库存（限量提速）</span></li>
                  <li className="flex items-start gap-3 pl-6"><span className="text-red-500">-</span><span>呆滞库存（止损优先）</span></li>
                </ul>
                <div className="bg-yellow-50/50 border border-yellow-200 rounded-lg p-3 mt-4">
                  <p className="text-yellow-700 text-sm font-medium">👉 目标：先止血，再优化</p>
                </div>
                <p className="text-sm text-red-500 mt-3 font-medium">第一层假设：销售端出现下降问题</p>
              </div>

              {/* 抓手二 */}
              <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-semibold text-blue-700 mb-3">抓手二｜用"销量结构"拉周转，而不是盲目加广告</h3>
                <p className="text-sm text-blue-600 mb-4">对 ASIN 做 转化率 × 消耗 四象限</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-blue-100/50">
                        <th className="border border-blue-200 p-2 text-left">维度</th>
                        <th className="border border-blue-200 p-2 text-center bg-green-50/50">高</th>
                        <th className="border border-blue-200 p-2 text-center bg-red-50/50">低</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-blue-200 p-2 font-medium">销量</td>
                        <td className="border border-blue-200 p-2 text-center bg-green-50/30">快销</td>
                        <td className="border border-blue-200 p-2 text-center bg-red-50/30">滞销</td>
                      </tr>
                      <tr>
                        <td className="border border-blue-200 p-2 font-medium">周转</td>
                        <td className="border border-blue-200 p-2 text-center bg-green-50/30">高周转</td>
                        <td className="border border-blue-200 p-2 text-center bg-red-50/30">低周转</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="bg-green-50/50 rounded-lg p-3">
                    <p className="font-medium text-green-700">高销量 × 高周转：</p>
                    <p className="text-green-600 text-sm">👉 保证安全库存，防断货</p>
                  </div>
                  <div className="bg-blue-50/50 rounded-lg p-3">
                    <p className="font-medium text-blue-700">高销量 × 低周转：</p>
                    <p className="text-blue-600 text-sm">👉 降低单次补货量，提高补货频率</p>
                  </div>
                  <div className="bg-yellow-50/50 rounded-lg p-3">
                    <p className="font-medium text-yellow-700">低销量 × 高周转：</p>
                    <p className="text-yellow-600 text-sm">👉 控制广告，谨慎补货</p>
                  </div>
                  <div className="bg-red-50/50 rounded-lg p-3">
                    <p className="font-medium text-red-700">低销量 × 低周转：</p>
                    <p className="text-red-600 text-sm">👉 清库存 / 停止补货</p>
                  </div>
                </div>
                <div className="bg-purple-50/50 border border-purple-200 rounded-lg p-3 mt-4">
                  <p className="text-purple-700 text-sm">👉 结论（示例）：多数低周转 ASIN 销量稳定，但单次补货量明显高于历史均值，说明问题主要来自备货策略，而非销售端</p>
                </div>
                <p className="text-sm text-purple-500 mt-3 font-medium">第二层假设：备货策略出现问题（可采用项目二中库存预测方法）</p>
              </div>

              {/* 抓手三 */}
              <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-5">
                <h3 className="font-semibold text-purple-700 mb-3">抓手三｜补货节奏管理（不是少补，而是准补）</h3>
                <ul className="space-y-2 text-purple-600">
                  <li className="flex items-start gap-2"><span>·</span><span>以 覆盖天数 为核心管理指标</span></li>
                  <li className="flex items-start gap-2"><span>·</span><span>覆盖天数 ≈ 补货周期 + 安全缓冲</span></li>
                  <li className="flex items-start gap-2"><span>·</span><span>禁止一次性大批量压货，改为 多批次、滚动补货</span></li>
                </ul>
              </div>

              {/* 抓手四 */}
              <div className="bg-orange-50/50 border border-orange-200 rounded-xl p-5">
                <h3 className="font-semibold text-orange-700 mb-3">抓手四｜呆滞库存止损机制</h3>
                <ul className="space-y-2 text-orange-600">
                  <li className="flex items-start gap-2"><span>·</span><span>明确规则：180 天以上库存必须处理</span></li>
                  <li className="flex items-start gap-2"><span>·</span><span>手段依次为：</span></li>
                </ul>
                <ol className="mt-3 ml-6 space-y-1 text-orange-600 list-decimal">
                  <li>降价</li>
                  <li>广告清仓</li>
                  <li>捆绑</li>
                  <li>停产止损</li>
                </ol>
                <div className="bg-red-100/50 border border-red-300 rounded-lg p-3 mt-4">
                  <p className="text-red-700 text-sm font-medium">原则：宁可一次性亏损，也不长期占用现金</p>
                </div>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 七、落地与结果 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">七</span>
              落地与结果
            </h2>
            <div className="space-y-6">
              <div className="bg-muted/30 rounded-xl p-5">
                <p className="font-semibold mb-3">优化动作：</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><span>调整补货周期（如 90 天 → 45 天）</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><span>降低单次补货量（如 -30%）</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><span>广告与库存联动，避免"没库存还推广告"</span></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-4">优化结果（脱敏区间）：</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-green-700">整体库存周转率提升约 20%–30%</span>
                  </div>
                  <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-green-700">仓储费用下降约 15%+</span>
                  </div>
                  <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-green-700">缺货率显著改善</span>
                  </div>
                  <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-green-700">现金流压力明显缓解</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
