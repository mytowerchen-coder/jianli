import { Footer } from "@/components/Footer"
import { ArrowLeft, Shield, Table, CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Project2Page() {
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
            <Shield className="w-4 h-4" />
            项目二 · 业务目标：风险控制
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            基于需求波动与安全库存模型的库存预测、回溯与滚动优化（脱敏）
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>海运补货 · 提前期 28-35 天</span>
            <span>·</span>
            <span>多 SKU 跨境卖家</span>
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
              <p className="text-muted-foreground leading-relaxed">
                公司为跨境电商卖家，SKU 数量较多，核心 ASIN 依赖海运补货，
                <br />
                补货提前期长（约 28–35 天），需求存在明显波动。
              </p>
              <p className="font-medium">在原有以经验为主的补货模式下，存在以下问题：</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  <span>核心 ASIN 周期性断货，影响销售与广告效率</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  <span>长尾 ASIN 库存积压，占用现金流</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  <span>预测结果不可回溯，补货决策不可复盘</span>
                </li>
              </ul>
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 mt-6">
                <p className="text-primary font-medium">
                  因此，需要构建一套 以需求波动为核心、可回溯、可滚动优化的库存预测体系，支撑稳定、可解释的补货决策。
                </p>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 二、项目目标 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">二</span>
              项目目标
            </h2>
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 space-y-3">
              <p className="leading-relaxed">在需求不确定性客观存在的前提下，</p>
              <p className="leading-relaxed">通过需求波动建模与安全库存机制，</p>
              <p className="leading-relaxed">在<span className="text-primary font-semibold">控制断货风险的同时提升库存周转效率</span>，</p>
              <p className="leading-relaxed">并确保预测结果可回溯、可调整、可复用。</p>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 三、预测周期与分析粒度设计 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">三</span>
              预测周期与分析粒度设计
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-xl p-4">
                  <p className="font-medium text-primary mb-2">预测粒度</p>
                  <p className="text-muted-foreground">ASIN × 仓库</p>
                </div>
                <div className="bg-muted/30 rounded-xl p-4">
                  <p className="font-medium text-primary mb-2">预测周期</p>
                  <p className="text-muted-foreground">30 天</p>
                </div>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                  <span>与补货提前期匹配</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                  <span>可直接指导补货数量决策</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span>回溯单位：完整预测周期（30 天）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span>滚动窗口：最近 60–90 天历史销量</span>
                </li>
              </ul>
              <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 mt-4">
                <p className="text-blue-700 text-sm">所有预测与回溯均以"完整周期"为判断单位，避免短期波动干扰库存决策。</p>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 四、数据口径与业务侧治理 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">四</span>
              数据口径与业务侧治理
            </h2>
            <div className="space-y-4">
              <p className="font-medium">在建模前，首先统一业务侧数据口径：</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>使用真实成交销量（日级）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>剔除以下异常数据：</span>
                </li>
                <li className="flex items-start gap-3 pl-6">
                  <span className="text-red-500">-</span>
                  <span>断货期间的 0 销量（非真实需求）</span>
                </li>
                <li className="flex items-start gap-3 pl-6">
                  <span className="text-red-500">-</span>
                  <span>极端促销 / 清仓日期（非日常需求）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                  <span>保留反映"正常经营状态"的销量数据</span>
                </li>
              </ul>
              <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 mt-4">
                <p className="text-green-700 text-sm">所有指标通过文档与 BI 看板固化，避免人工随意取数。</p>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 五、需求波动模型 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">五</span>
              需求波动模型
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">5.1 核心指标定义</h3>
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-xl p-4">
                    <p className="font-medium text-primary mb-2">需求均值 μ</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li><span className="font-medium">含义：</span>ASIN 在当前阶段的典型日销量</li>
                      <li><span className="font-medium">口径：</span>清洗后历史日销量的算术平均值</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4">
                    <p className="font-medium text-primary mb-2">需求波动 σ</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li><span className="font-medium">含义：</span>日销量围绕均值的波动程度</li>
                      <li><span className="font-medium">口径：</span>清洗后历史日销量的标准差</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">5.2 脱敏示例（单 ASIN）</h3>
                <div className="bg-blue-50/50 border border-blue-200 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-blue-100/50">
                      <tr>
                        <th className="text-left p-3 font-medium text-blue-700">指标</th>
                        <th className="text-right p-3 font-medium text-blue-700">数值（脱敏）</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100">
                      <tr>
                        <td className="p-3 text-muted-foreground">最近 60 天累计销量</td>
                        <td className="p-3 text-right font-medium">≈ 1,200 件</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">日均销量 μ</td>
                        <td className="p-3 text-right font-medium">≈ 20 件</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">日销量标准差 σ</td>
                        <td className="p-3 text-right font-medium">≈ 5 件</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 六、安全库存模型 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">六</span>
              安全库存模型（Safety Stock Model）
            </h2>
            <div className="space-y-6">
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
                <h3 className="font-semibold text-primary mb-3">6.1 安全库存公式（明确写入）</h3>
                <p className="text-2xl font-mono font-bold text-center">安全库存 SS = Z × σ × √L</p>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>其中：</p>
                  <ul className="space-y-1 ml-4">
                    <li><span className="font-medium">Z：</span>服务水平系数（由业务风险偏好决定）</li>
                    <li><span className="font-medium">σ：</span>需求标准差</li>
                    <li><span className="font-medium">L：</span>补货提前期（天）</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">6.2 服务水平设定（业务决策）</h3>
                <div className="bg-muted/30 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 font-medium">服务水平</th>
                        <th className="text-right p-3 font-medium">Z 值</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr><td className="p-3">90%</td><td className="p-3 text-right font-mono">1.28</td></tr>
                      <tr><td className="p-3">95%</td><td className="p-3 text-right font-mono">1.65</td></tr>
                      <tr><td className="p-3">97.5%</td><td className="p-3 text-right font-mono">1.96</td></tr>
                      <tr><td className="p-3">99%</td><td className="p-3 text-right font-mono">2.33</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /><span>高毛利 / 核心 ASIN → 较高服务水平</span></p>
                  <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500" /><span>长尾 / 低毛利 ASIN → 较低服务水平</span></p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">6.3 脱敏计算示例</h3>
                <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-5 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">μ =</span> 20 件/天</div>
                    <div><span className="font-medium">σ =</span> 5</div>
                    <div><span className="font-medium">L =</span> 30 天</div>
                    <div><span className="font-medium">服务水平 =</span> 95%（Z = 1.65）</div>
                  </div>
                  <div className="border-t border-purple-200 pt-3">
                    <p className="text-sm text-muted-foreground mb-1">计算：</p>
                    <p className="font-mono font-bold">SS = 1.65 × 5 × √30 ≈ 45 件</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">6.4 30 天补货需求测算（脱敏）</h3>
                <div className="bg-green-50/50 border border-green-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    <span>预测需求量：20 × 30 = <strong>600 件</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    <span>安全库存：≈ <strong>45 件</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span>建议补货量：≈ <strong>645 件</strong>（区间化执行）</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 七、回溯预测机制 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">七</span>
              回溯预测机制
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-semibold text-blue-700 mb-3">7.1 回溯的核心目的</h3>
                <p className="text-blue-600 leading-relaxed">
                  回溯预测并非为了提高单次预测精度，
                  <br />
                  而是判断当前模型是否仍然适配业务现状，
                  <br />
                  从而决定是否触发滚动预测。
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">7.2 回溯预测中的偏差类型判定</h3>
                <p className="text-muted-foreground mb-4">
                  在每一个完整预测周期（30 天）结束后，
                  根据预测值与实际值的偏差，将结果归纳为以下几类：
                </p>

                <div className="space-y-4">
                  {/* 偏差类型一 */}
                  <div className="bg-muted/30 rounded-xl p-5 border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-700 mb-3">偏差类型一：随机波动型偏差</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">特征：</p>
                        <ul className="space-y-1 text-muted-foreground ml-4">
                          <li>- 仅出现于单一周期</li>
                          <li>- 偏差方向不稳定</li>
                          <li>- 幅度通常 &lt;10%</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">决策：</p>
                        <ul className="space-y-1 text-green-600 ml-4">
                          <li>- 不调整模型</li>
                          <li>- 持续观察</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 偏差类型二 */}
                  <div className="bg-muted/30 rounded-xl p-5 border-l-4 border-yellow-400">
                    <h4 className="font-semibold text-yellow-700 mb-3">偏差类型二：疑似趋势型偏差</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">特征：</p>
                        <ul className="space-y-1 text-muted-foreground ml-4">
                          <li>- 连续 2 个完整周期</li>
                          <li>- 偏差方向一致</li>
                          <li>- 幅度约 10%</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">决策：</p>
                        <ul className="space-y-1 text-yellow-600 ml-4">
                          <li>- 标记重点观察</li>
                          <li>- 暂不滚动预测</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 偏差类型三 */}
                  <div className="bg-muted/30 rounded-xl p-5 border-l-4 border-orange-400">
                    <h4 className="font-semibold text-orange-700 mb-3">偏差类型三：结构性偏差</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">特征：</p>
                        <ul className="space-y-1 text-muted-foreground ml-4">
                          <li>- 连续 ≥3 个完整周期</li>
                          <li>- 偏差方向一致</li>
                          <li>- 排除促销等异常因素</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">决策：</p>
                        <ul className="space-y-1 text-orange-600 ml-4">
                          <li>- 触发滚动预测</li>
                          <li>- 更新模型参数</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 偏差类型四 */}
                  <div className="bg-muted/30 rounded-xl p-5 border-l-4 border-purple-400">
                    <h4 className="font-semibold text-purple-700 mb-3">偏差类型四：波动结构变化型偏差</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">特征：</p>
                        <ul className="space-y-1 text-muted-foreground ml-4">
                          <li>- 均值变化不明显</li>
                          <li>- 但 σ 持续放大或收敛</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground mb-1">决策：</p>
                        <ul className="space-y-1 text-purple-600 ml-4">
                          <li>- 保持 μ 不变</li>
                          <li>- 调整安全库存水平</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">7.3 连续周期脱敏示例</h3>
                <div className="bg-blue-50/50 border border-blue-200 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-blue-100/50">
                      <tr>
                        <th className="text-left p-3 font-medium text-blue-700">周期</th>
                        <th className="text-right p-3 font-medium text-blue-700">实际 30 天销量</th>
                        <th className="text-right p-3 font-medium text-blue-700">实际日均</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100">
                      <tr><td className="p-3 text-muted-foreground">T-90 ~ T-60</td><td className="p-3 text-right">≈ 630</td><td className="p-3 text-right">21</td></tr>
                      <tr><td className="p-3 text-muted-foreground">T-60 ~ T-30</td><td className="p-3 text-right">≈ 690</td><td className="p-3 text-right">23</td></tr>
                      <tr><td className="p-3 text-muted-foreground">T-30 ~ T0</td><td className="p-3 text-right">≈ 720</td><td className="p-3 text-right">24</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-yellow-50/50 border border-yellow-200 rounded-lg p-3 mt-3">
                  <p className="text-yellow-700 text-sm">👉 连续 3 个周期同向偏差，判定为需求结构性上移。</p>
                </div>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 八、滚动预测执行 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">八</span>
              滚动预测执行
            </h2>
            <div className="space-y-6">
              <div className="bg-muted/30 rounded-xl p-5">
                <h3 className="font-semibold text-primary mb-3">8.1 触发条件</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><span>连续 ≥3 个完整预测周期</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><span>偏差方向一致</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><span>偏差可被业务解释</span></li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-xl p-5">
                <h3 className="font-semibold text-primary mb-3">8.2 执行方式</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><span>更新历史窗口（最近 60–90 天）</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><span>重新计算：</span></li>
                  <li className="flex items-start gap-3 pl-6"><span>- μ（需求均值）</span></li>
                  <li className="flex items-start gap-3 pl-6"><span>- σ（需求波动）</span></li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" /><span>基于新参数重新计算安全库存与补货量</span></li>
                </ul>
                <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="text-blue-700 text-sm">滚动预测本质是参数更新，而非频繁更换模型。</p>
                </div>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 九、执行策略 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">九</span>
              执行策略
            </h2>
            <div className="space-y-6">
              <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-5">
                <h3 className="font-semibold text-purple-700 mb-3">1. 分层管理</h3>
                <ul className="space-y-2 text-purple-600">
                  <li className="flex items-start gap-2"><span>·</span><span>核心 ASIN：高服务水平 + 高频回溯</span></li>
                  <li className="flex items-start gap-2"><span>·</span><span>长尾 ASIN：简化模型 + 控制库存</span></li>
                </ul>
              </div>
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                <h3 className="font-semibold text-blue-700 mb-3">2. 节奏控制</h3>
                <ul className="space-y-2 text-blue-600">
                  <li className="flex items-start gap-2"><span>·</span><span>回溯：每 30 天一次</span></li>
                  <li className="flex items-start gap-2"><span>·</span><span>滚动：满足条件才触发</span></li>
                </ul>
              </div>
              <div className="bg-green-50/50 border border-green-100 rounded-xl p-5">
                <h3 className="font-semibold text-green-700 mb-3">3. 结果固化</h3>
                <ul className="space-y-2 text-green-600">
                  <li className="flex items-start gap-2"><span>·</span><span>预测口径文档化</span></li>
                  <li className="flex items-start gap-2"><span>·</span><span>参数与回溯结果 BI 看板固化</span></li>
                  <li className="flex items-start gap-2"><span>·</span><span>避免人为随意改数</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* 分隔线 */}
          <div className="border-t border-dashed border-border" />

          {/* 十、优化后成果 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">十</span>
              优化后成果（脱敏）
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-green-700">核心 ASIN 非计划性断货明显下降</span>
              </div>
              <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-green-700">库存结构更贴近真实需求</span>
              </div>
              <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-green-700">补货决策从经验驱动转为模型驱动</span>
              </div>
              <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-green-700">库存预测结果可回溯、可复盘、可持续优化</span>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
