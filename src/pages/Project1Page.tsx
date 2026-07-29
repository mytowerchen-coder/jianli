import { Footer } from "@/components/Footer"
import { ArrowLeft, Target, Lightbulb, CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Project1Page() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </button>
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            项目列表
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* 项目标题 */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            项目一 · 业务目标：需求效率
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            基于假设检验的亚马逊广告效果分析与优化（脱敏）
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Amazon US · Home & Kitchen</span>
            <span>·</span>
            <span>30+ ASIN</span>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="space-y-12">

          {/* 一、业务背景 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">一</span>
              业务背景（Business Context）
            </h2>
            <div className="bg-muted/30 rounded-2xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary font-medium shrink-0">平台：</span>
                <span>Amazon US</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-medium shrink-0">类目：</span>
                <span>Home & Kitchen（家居收纳细分类目）</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-medium shrink-0">广告覆盖 ASIN：</span>
                <span>30+</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-medium shrink-0">广告类型：</span>
                <span>SP（自动 + 手动）</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-medium shrink-0">广告投入占比（脱敏）：</span>
                <span>约 10%–20%</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary font-medium shrink-0">广告销售占比：</span>
                <span>约 30%–45%</span>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 二、分析目标 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">二</span>
              分析目标（明确"要解决什么问题"）
            </h2>
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <p className="text-lg leading-relaxed">
                在广告规模基本稳定的前提下，
                <br />
                <span className="text-primary font-semibold">解释并改善 ACOS 偏高、ROI 偏低的问题。</span>
              </p>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 三、问题定义 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">三</span>
              问题定义（Problem Statement）
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">在连续 8 周广告监控中发现：</p>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>多个 ASIN：</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>ACOS 高于预期区间（25%–40%）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>ROI 偏低</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>广告消耗增长，但销售提升不明显</span>
                </li>
              </ul>
              <div className="bg-yellow-50/50 border border-yellow-200 rounded-xl p-4 mt-6">
                <p className="font-semibold text-yellow-800">👉 核心问题：</p>
                <p className="text-yellow-700 mt-1">ACOS 成本高是"哪一层出了问题"？</p>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 四、第一层假设 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">四</span>
              第一层假设：ACOS 成本高的可能原因是什么？
            </h2>
            <div className="space-y-6">
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-2">指标公式拆解（分析前提）</p>
                <p className="text-xl font-mono font-bold">ACOS = CPC ÷ (转化率 × 客单价)</p>
              </div>
              <p className="text-muted-foreground">因此提出 <span className="text-primary font-semibold">三组互斥假设：</span></p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                  <p className="font-semibold text-blue-700">H1</p>
                  <p className="text-sm text-blue-600 mt-1">CPC 偏高导致 ACOS 高</p>
                </div>
                <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-4">
                  <p className="font-semibold text-purple-700">H2</p>
                  <p className="text-sm text-purple-600 mt-1">转化率偏低导致 ACOS 高</p>
                </div>
                <div className="bg-green-50/50 border border-green-100 rounded-xl p-4">
                  <p className="font-semibold text-green-700">H3</p>
                  <p className="text-sm text-green-600 mt-1">客单价偏低 / 不合理导致 ACOS 高</p>
                </div>
              </div>
              <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4">
                <p className="font-semibold text-blue-800">👉 后续分析的目标：</p>
                <p className="text-blue-700 mt-1">逐一验证 / 排除这三种假设</p>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 五、假设检验一 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">五</span>
              假设检验一：是否是「客单价问题」（H1）
            </h2>
            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-3">验证方法</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>对比分析周期内：</span>
                  </li>
                  <li className="flex items-start gap-2 pl-6">
                    <span>- ASIN 定价</span>
                  </li>
                  <li className="flex items-start gap-2 pl-6">
                    <span>- 广告销售客单价</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>对比自然销售与广告销售客单价</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-3">验证结果（脱敏）</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                    <span>ASIN 定价区间稳定（$35–45）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                    <span>广告与自然销售客单价无显著差异</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                    <span>分析周期内无调价行为</span>
                  </li>
                </ul>
              </div>
              <div className="bg-red-50/50 border border-red-200 rounded-xl p-4">
                <p className="font-semibold text-red-700">结论</p>
                <p className="text-red-600 mt-1">❌ 排除 H1：不是客单价变化导致 ACOS 上升</p>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 六、假设检验二 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">六</span>
              假设检验二：是否是「CPC 偏高」（H2）
            </h2>
            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-3 text-purple-700">二级假设拆解（非常关键）</p>
                <p className="text-muted-foreground mb-3">如果是 CPC 偏高，进一步拆为：</p>
                <div className="space-y-2">
                  <div className="bg-purple-50/50 border border-purple-100 rounded-lg p-3">
                    <span className="font-semibold text-purple-700">H2-1：</span>
                    <span className="text-purple-600">整体 CPC 平均值偏高（市场 / 竞价环境）</span>
                  </div>
                  <div className="bg-purple-50/50 border border-purple-100 rounded-lg p-3">
                    <span className="font-semibold text-purple-700">H2-2：</span>
                    <span className="text-purple-600">关键词结构问题导致平均 CPC 被拉高</span>
                  </div>
                </div>
              </div>

              {/* 验证 H2-1 */}
              <div className="bg-muted/20 rounded-xl p-5">
                <p className="font-semibold text-purple-700 mb-4">验证 H2-1：整体 CPC 是否异常？</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">方法</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span>-</span>
                        <span>对比：</span>
                      </li>
                      <li className="flex items-start gap-2 pl-4">
                        <span>- 当前周期 vs 历史周期平均 CPC</span>
                      </li>
                      <li className="flex items-start gap-2 pl-4">
                        <span>- 核心功能词 CPC 变化</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">结果</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span>-</span>
                        <span>整体平均 CPC 小幅上升</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>-</span>
                        <span>核心功能词 CPC 基本稳定</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50/50 border border-yellow-200 rounded-lg p-3 mt-3">
                    <p className="text-yellow-700 text-sm">👉 不支持"全面 CPC 失控"假设</p>
                  </div>
                </div>
              </div>

              {/* 验证 H2-2 */}
              <div className="bg-muted/20 rounded-xl p-5">
                <p className="font-semibold text-purple-700 mb-4">验证 H2-2：是否是关键词结构问题？</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">方法</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span>-</span>
                        <span>拆解 CPC 按关键词类型分布：</span>
                      </li>
                      <li className="flex items-start gap-2 pl-4">
                        <span>- 核心功能词</span>
                      </li>
                      <li className="flex items-start gap-2 pl-4">
                        <span>- 泛词 / 场景词</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>-</span>
                        <span>分析：</span>
                      </li>
                      <li className="flex items-start gap-2 pl-4">
                        <span>- 点击占比</span>
                      </li>
                      <li className="flex items-start gap-2 pl-4">
                        <span>- 消耗占比</span>
                      </li>
                      <li className="flex items-start gap-2 pl-4">
                        <span>- CPC 均值</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">结果（脱敏）</p>
                    <div className="space-y-3">
                      <div className="bg-red-50/50 rounded-lg p-3">
                        <p className="font-medium text-red-700">泛词：</p>
                        <ul className="text-sm text-red-600 mt-1 space-y-1">
                          <li>CPC 明显高于核心词</li>
                          <li>点击占比、消耗占比上升</li>
                        </ul>
                      </div>
                      <div className="bg-green-50/50 rounded-lg p-3">
                        <p className="font-medium text-green-700">核心词：</p>
                        <ul className="text-sm text-green-600 mt-1 space-y-1">
                          <li>CPC 稳定</li>
                          <li>转化率更高</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 mt-4">
                    <p className="font-semibold text-green-700">结论</p>
                    <p className="text-green-600 mt-1">✅ 部分验证 H2：</p>
                    <p className="text-green-700 mt-1 text-sm">CPC 偏高主要由关键词结构问题导致，而非整体竞价环境恶化</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 七、假设检验三 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">七</span>
              假设检验三：是否是「转化率问题」（H3）
            </h2>
            <div className="space-y-6">
              <div>
                <p className="font-semibold mb-3 text-green-700">二级假设拆解</p>
                <p className="text-muted-foreground mb-3">如果转化率偏低，可能来自：</p>
                <div className="space-y-2">
                  <div className="bg-green-50/50 border border-green-100 rounded-lg p-3">
                    <span className="font-semibold text-green-700">H3-1：</span>
                    <span className="text-green-600">广告流量质量问题</span>
                  </div>
                  <div className="bg-green-50/50 border border-green-100 rounded-lg p-3">
                    <span className="font-semibold text-green-700">H3-2：</span>
                    <span className="text-green-600">Listing / 价格承接问题</span>
                  </div>
                </div>
              </div>

              {/* 验证 H3-1 */}
              <div className="bg-muted/20 rounded-xl p-5">
                <p className="font-semibold text-green-700 mb-4">验证 H3-1：广告流 vs 自然流对比</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">方法</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span>-</span>
                        <span>对比：</span>
                      </li>
                      <li className="flex items-start gap-2 pl-4">
                        <span>- 广告流 CVR</span>
                      </li>
                      <li className="flex items-start gap-2 pl-4">
                        <span>- 自然流 CVR</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>-</span>
                        <span>看是否同步变化</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">结果</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span>-</span>
                        <span>广告流 CVR ↓</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>-</span>
                        <span>自然流 CVR 同期 ↓</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-50/50 border border-red-200 rounded-lg p-3 mt-3">
                    <p className="text-red-700 text-sm">❌ 排除"纯广告流量问题"</p>
                  </div>
                </div>
              </div>

              {/* 验证 H3-2 */}
              <div className="bg-muted/20 rounded-xl p-5">
                <p className="font-semibold text-green-700 mb-4">验证 H3-2：Listing / 价格承接问题</p>
                <div className="space-y-4">
                  <div className="bg-blue-50/50 rounded-lg p-4">
                    <p className="font-medium text-blue-700 mb-2">方法 1｜关键词意图分层</p>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>品牌词 / ASIN 定向 CVR：高</li>
                      <li>核心功能词 CVR：下降</li>
                      <li>泛词 CVR：始终偏低</li>
                    </ul>
                    <div className="bg-yellow-50/50 border border-yellow-200 rounded-lg p-3 mt-3">
                      <p className="text-yellow-700 text-sm">👉 说明页面对"非强意图用户"说服力不足</p>
                    </div>
                  </div>
                  <div className="bg-purple-50/50 rounded-lg p-4">
                    <p className="font-medium text-purple-700 mb-2">方法 2｜促销对照验证（脱敏）</p>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>无促销周期 CVR：低</li>
                      <li>有促销周期 CVR：明显改善</li>
                      <li>CTR 变化不大</li>
                    </ul>
                  </div>
                  <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 mt-4">
                    <p className="font-semibold text-green-700">结论</p>
                    <p className="text-green-600 mt-1">✅ 验证 H3：转化率下降主要受价格竞争力与承接能力影响</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 八、综合分析结论 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">八</span>
              综合分析结论（Analytical Conclusion）
            </h2>
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-5">
                <p className="font-semibold mb-2">1. ACOS 偏高不是单一因素导致，而是：</p>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>关键词结构推高 CPC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>转化率下降放大成本</span>
                  </li>
                </ul>
              </div>
              <div className="bg-muted/30 rounded-xl p-5">
                <p className="font-semibold mb-2">2. ROI 偏低集中在：</p>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>高消耗、低转化 ASIN</span>
                  </li>
                </ul>
              </div>
              <div className="bg-muted/30 rounded-xl p-5">
                <p className="font-semibold mb-2">3. 在当前价格与转化水平下：</p>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>部分 ASIN 存在天然 ACOS 上限</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 九、决策建议 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">九</span>
              决策建议
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                <p className="font-semibold text-blue-700 mb-3">决策 1｜广告结构调整</p>
                <ul className="space-y-2 text-blue-600">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>降低泛词、宽匹配出价</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>将高转化词转精准</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>削减低 ROI ASIN 预算</span>
                  </li>
                </ul>
              </div>
              <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-5">
                <p className="font-semibold text-purple-700 mb-3">决策 2｜业务侧联动</p>
                <ul className="space-y-2 text-purple-600">
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>推动 Listing 优化</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>配合促销改善价格竞争力</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>-</span>
                    <span>广告与库存联动，避免断货浪费</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 十、优化后结果 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">十</span>
              优化后结果（脱敏、可信）
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-green-700 font-medium">ACOS：下降约 15%–20%</span>
              </div>
              <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-green-700 font-medium">转化率：提升约 8%–12%</span>
              </div>
              <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-green-700 font-medium">广告投入占比：稳定在 10%–15%</span>
              </div>
              <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-green-700 font-medium">ROI 明显改善，结构更健康</span>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 十一、项目方法论总结 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">十一</span>
              项目方法论总结
            </h2>
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <p className="text-primary leading-relaxed">
                本项目采用<span className="font-semibold">假设驱动分析方法</span>，通过公式拆解 → 假设提出 → 数据验证 → 排除归因，避免主观判断，确保每一项决策都有数据支撑。
              </p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
