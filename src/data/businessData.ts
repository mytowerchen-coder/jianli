// 跨境电商业务流程数据设计 — 数据层

import { NEON_PALETTE } from "@/lib/chartTheme"

// ─── 接口定义 ───

export interface FieldDef {
  name: string
  type: "INT" | "VARCHAR" | "DECIMAL" | "DATETIME" | "TEXT" | "ENUM" | "JSON"
  isPrimary: boolean
  isForeignKey: boolean
  refModule?: string
}

export interface TableSchema {
  tableName: string
  tableNameEn: string
  moduleId: string
  fields: FieldDef[]
}

export interface BusinessModule {
  id: string
  name: string
  icon: string
  color: string
  description: string
  tables: string[]
}

export interface ModuleRelation {
  fromModuleId: string
  toModuleId: string
  label: string
  description: string
}

export interface ModuleStats {
  moduleId: string
  moduleName: string
  tableCount: number
  fieldCount: number
  foreignKeyCount: number
  relationshipCount: number
  color: string
}

export interface FieldTypeDistribution {
  typeName: string
  count: number
  color: string
}

export interface DataScaleTrend {
  month: string
  totalRecords: number
  dailyIncrement: number
  storageSize: number
}

export interface RelationshipDensity {
  dimension: string
  value: number
  fullMark: number
}

export interface ModuleComplexity {
  moduleName: string
  fieldCount: number
  relationshipCount: number
  color: string
}

// ═══════════════════════════════════════
// 数据常量
// ═══════════════════════════════════════

// ─── KPI 汇总 ───
export const businessKpiSummary = {
  moduleCount: 7,
  tableCount: 20,
  fieldCount: "~140",
  relationshipRate: 85,
}

// ─── 7 大业务模块 ───
export const businessModules: BusinessModule[] = [
  {
    id: "product",
    name: "产品开发",
    icon: "Package",
    color: NEON_PALETTE[0],
    description: "产品立项、变体管理、竞品分析",
    tables: ["产品信息表", "产品变体表", "竞品分析表"],
  },
  {
    id: "procurement",
    name: "采购",
    icon: "ShoppingCart",
    color: NEON_PALETTE[1],
    description: "采购下单、供应商管理、入库质检",
    tables: ["采购订单表", "供应商表", "采购入库表"],
  },
  {
    id: "warehouse",
    name: "仓储",
    icon: "Warehouse",
    color: NEON_PALETTE[3],
    description: "库存管理、多仓调拨、出入库流水",
    tables: ["库存明细表", "仓库表", "出入库流水表"],
  },
  {
    id: "order",
    name: "订单",
    icon: "ShoppingCart",
    color: NEON_PALETTE[4],
    description: "多平台订单汇聚、明细拆分、支付流水",
    tables: ["订单主表", "订单明细表", "支付流水表"],
  },
  {
    id: "logistics",
    name: "物流",
    icon: "Truck",
    color: NEON_PALETTE[7],
    description: "物流商管理、运单跟踪、运费核算",
    tables: ["物流商表", "运单跟踪表", "运费核算表"],
  },
  {
    id: "return",
    name: "退货退款",
    icon: "RefreshCw",
    color: NEON_PALETTE[5],
    description: "售后退货、退款处理、原因分析",
    tables: ["退货单", "退款单"],
  },
  {
    id: "finance",
    name: "财务利润",
    icon: "DollarSign",
    color: NEON_PALETTE[2],
    description: "利润核算、费用归集、汇率管理",
    tables: ["利润核算表", "费用明细表", "汇率记录表"],
  },
]

// ─── 20 张核心数据表 ───
export const tableSchemas: TableSchema[] = [
  // ── 产品开发 (3) ──
  {
    tableName: "产品信息表",
    tableNameEn: "product_info",
    moduleId: "product",
    fields: [
      { name: "product_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "sku", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "name", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "category", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "cost_price", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "selling_price", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "status", type: "ENUM", isPrimary: false, isForeignKey: false },
      { name: "created_at", type: "DATETIME", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "产品变体表",
    tableNameEn: "product_variant",
    moduleId: "product",
    fields: [
      { name: "variant_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "product_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "product" },
      { name: "color", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "size", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "weight", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "fba_sku", type: "VARCHAR", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "竞品分析表",
    tableNameEn: "competitor_analysis",
    moduleId: "product",
    fields: [
      { name: "competitor_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "product_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "product" },
      { name: "competitor_sku", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "price", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "rating", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "sales_rank", type: "INT", isPrimary: false, isForeignKey: false },
      { name: "analyzed_at", type: "DATETIME", isPrimary: false, isForeignKey: false },
    ],
  },

  // ── 采购 (3) ──
  {
    tableName: "采购订单表",
    tableNameEn: "purchase_order",
    moduleId: "procurement",
    fields: [
      { name: "po_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "supplier_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "procurement" },
      { name: "product_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "product" },
      { name: "quantity", type: "INT", isPrimary: false, isForeignKey: false },
      { name: "unit_cost", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "total_cost", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "status", type: "ENUM", isPrimary: false, isForeignKey: false },
      { name: "order_date", type: "DATETIME", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "供应商表",
    tableNameEn: "supplier",
    moduleId: "procurement",
    fields: [
      { name: "supplier_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "name", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "country", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "contact", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "rating", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "payment_terms", type: "VARCHAR", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "采购入库表",
    tableNameEn: "purchase_inbound",
    moduleId: "procurement",
    fields: [
      { name: "inbound_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "po_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "procurement" },
      { name: "warehouse_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "warehouse" },
      { name: "received_qty", type: "INT", isPrimary: false, isForeignKey: false },
      { name: "quality_rate", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "inbound_date", type: "DATETIME", isPrimary: false, isForeignKey: false },
    ],
  },

  // ── 仓储 (3) ──
  {
    tableName: "库存明细表",
    tableNameEn: "inventory_detail",
    moduleId: "warehouse",
    fields: [
      { name: "inventory_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "sku", type: "VARCHAR", isPrimary: false, isForeignKey: true, refModule: "product" },
      { name: "warehouse_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "warehouse" },
      { name: "available_qty", type: "INT", isPrimary: false, isForeignKey: false },
      { name: "locked_qty", type: "INT", isPrimary: false, isForeignKey: false },
      { name: "in_transit_qty", type: "INT", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "仓库表",
    tableNameEn: "warehouse",
    moduleId: "warehouse",
    fields: [
      { name: "warehouse_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "name", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "country", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "type", type: "ENUM", isPrimary: false, isForeignKey: false },
      { name: "capacity", type: "INT", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "出入库流水表",
    tableNameEn: "inventory_flow",
    moduleId: "warehouse",
    fields: [
      { name: "flow_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "sku", type: "VARCHAR", isPrimary: false, isForeignKey: true, refModule: "product" },
      { name: "warehouse_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "warehouse" },
      { name: "type", type: "ENUM", isPrimary: false, isForeignKey: false },
      { name: "quantity", type: "INT", isPrimary: false, isForeignKey: false },
      { name: "reason", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "created_at", type: "DATETIME", isPrimary: false, isForeignKey: false },
    ],
  },

  // ── 订单 (3) ──
  {
    tableName: "订单主表",
    tableNameEn: "order_main",
    moduleId: "order",
    fields: [
      { name: "order_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "platform", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "store_id", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "buyer_id", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "order_amount", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "currency", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "status", type: "ENUM", isPrimary: false, isForeignKey: false },
      { name: "order_time", type: "DATETIME", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "订单明细表",
    tableNameEn: "order_item",
    moduleId: "order",
    fields: [
      { name: "item_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "order_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "order" },
      { name: "sku", type: "VARCHAR", isPrimary: false, isForeignKey: true, refModule: "product" },
      { name: "quantity", type: "INT", isPrimary: false, isForeignKey: false },
      { name: "unit_price", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "discount", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "platform_fee", type: "DECIMAL", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "支付流水表",
    tableNameEn: "payment_flow",
    moduleId: "order",
    fields: [
      { name: "payment_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "order_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "order" },
      { name: "method", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "amount", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "currency", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "exchange_rate", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "paid_at", type: "DATETIME", isPrimary: false, isForeignKey: false },
    ],
  },

  // ── 物流 (3) ──
  {
    tableName: "物流商表",
    tableNameEn: "carrier",
    moduleId: "logistics",
    fields: [
      { name: "carrier_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "name", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "type", type: "ENUM", isPrimary: false, isForeignKey: false },
      { name: "country_coverage", type: "TEXT", isPrimary: false, isForeignKey: false },
      { name: "avg_days", type: "INT", isPrimary: false, isForeignKey: false },
      { name: "rating", type: "DECIMAL", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "运单跟踪表",
    tableNameEn: "shipment_tracking",
    moduleId: "logistics",
    fields: [
      { name: "tracking_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "order_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "order" },
      { name: "carrier_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "logistics" },
      { name: "status", type: "ENUM", isPrimary: false, isForeignKey: false },
      { name: "origin", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "destination", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "shipped_at", type: "DATETIME", isPrimary: false, isForeignKey: false },
      { name: "delivered_at", type: "DATETIME", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "运费核算表",
    tableNameEn: "shipping_cost",
    moduleId: "logistics",
    fields: [
      { name: "cost_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "carrier_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "logistics" },
      { name: "zone", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "weight_range", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "unit_cost", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "effective_date", type: "DATETIME", isPrimary: false, isForeignKey: false },
    ],
  },

  // ── 退货退款 (2) ──
  {
    tableName: "退货单",
    tableNameEn: "return_order",
    moduleId: "return",
    fields: [
      { name: "return_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "order_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "order" },
      { name: "sku", type: "VARCHAR", isPrimary: false, isForeignKey: true, refModule: "product" },
      { name: "reason", type: "TEXT", isPrimary: false, isForeignKey: false },
      { name: "quantity", type: "INT", isPrimary: false, isForeignKey: false },
      { name: "status", type: "ENUM", isPrimary: false, isForeignKey: false },
      { name: "created_at", type: "DATETIME", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "退款单",
    tableNameEn: "refund_order",
    moduleId: "return",
    fields: [
      { name: "refund_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "return_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "return" },
      { name: "order_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "order" },
      { name: "refund_amount", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "method", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "processed_at", type: "DATETIME", isPrimary: false, isForeignKey: false },
    ],
  },

  // ── 财务利润 (3) ──
  {
    tableName: "利润核算表",
    tableNameEn: "profit_calculation",
    moduleId: "finance",
    fields: [
      { name: "profit_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "order_id", type: "INT", isPrimary: false, isForeignKey: true, refModule: "order" },
      { name: "revenue", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "product_cost", type: "DECIMAL", isPrimary: false, isForeignKey: true, refModule: "procurement" },
      { name: "shipping_cost", type: "DECIMAL", isPrimary: false, isForeignKey: true, refModule: "logistics" },
      { name: "platform_fee", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "ad_cost", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "profit", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "margin", type: "DECIMAL", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "费用明细表",
    tableNameEn: "expense_detail",
    moduleId: "finance",
    fields: [
      { name: "expense_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "category", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "amount", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "currency", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "period", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "department", type: "VARCHAR", isPrimary: false, isForeignKey: false },
    ],
  },
  {
    tableName: "汇率记录表",
    tableNameEn: "exchange_rate",
    moduleId: "finance",
    fields: [
      { name: "rate_id", type: "INT", isPrimary: true, isForeignKey: false },
      { name: "from_currency", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "to_currency", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "rate", type: "DECIMAL", isPrimary: false, isForeignKey: false },
      { name: "source", type: "VARCHAR", isPrimary: false, isForeignKey: false },
      { name: "recorded_at", type: "DATETIME", isPrimary: false, isForeignKey: false },
    ],
  },
]

// ─── 10 条 ER 关系边 ───
export const moduleRelations: ModuleRelation[] = [
  { fromModuleId: "product", toModuleId: "procurement", label: "product_id", description: "产品信息驱动采购下单" },
  { fromModuleId: "procurement", toModuleId: "warehouse", label: "po_id", description: "采购到货入仓" },
  { fromModuleId: "warehouse", toModuleId: "order", label: "sku", description: "库存支撑订单履约" },
  { fromModuleId: "order", toModuleId: "logistics", label: "order_id", description: "订单触发物流发货" },
  { fromModuleId: "order", toModuleId: "return", label: "order_id", description: "售后退货关联原单" },
  { fromModuleId: "return", toModuleId: "finance", label: "refund_id", description: "退款影响利润核算" },
  { fromModuleId: "order", toModuleId: "finance", label: "order_id", description: "订单收入计入利润" },
  { fromModuleId: "logistics", toModuleId: "finance", label: "shipping_cost", description: "运费计入成本" },
  { fromModuleId: "procurement", toModuleId: "finance", label: "unit_cost", description: "采购成本核算" },
  { fromModuleId: "warehouse", toModuleId: "return", label: "warehouse_id", description: "退货入库回流" },
]

// ─── 模块统计（从 tableSchemas 计算） ───
export const moduleStats: ModuleStats[] = businessModules.map((m) => {
  const tables = tableSchemas.filter((t) => t.moduleId === m.id)
  const allFields = tables.flatMap((t) => t.fields)
  const fkCount = allFields.filter((f) => f.isForeignKey).length
  const relCount = moduleRelations.filter(
    (r) => r.fromModuleId === m.id || r.toModuleId === m.id
  ).length
  return {
    moduleId: m.id,
    moduleName: m.name,
    tableCount: tables.length,
    fieldCount: allFields.length,
    foreignKeyCount: fkCount,
    relationshipCount: relCount,
    color: m.color,
  }
})

// ─── 字段类型分布 ───
export const fieldTypeDistribution: FieldTypeDistribution[] = (() => {
  const allFields = tableSchemas.flatMap((t) => t.fields)
  const counts: Record<string, number> = {}
  for (const f of allFields) {
    counts[f.type] = (counts[f.type] || 0) + 1
  }
  const typeColors: Record<string, string> = {
    INT: NEON_PALETTE[0],
    VARCHAR: NEON_PALETTE[1],
    DECIMAL: NEON_PALETTE[4],
    DATETIME: NEON_PALETTE[3],
    ENUM: NEON_PALETTE[5],
    TEXT: NEON_PALETTE[7],
    JSON: NEON_PALETTE[2],
  }
  return Object.entries(counts).map(([typeName, count]) => ({
    typeName,
    count,
    color: typeColors[typeName] || NEON_PALETTE[6],
  }))
})()

// ─── 数据规模增长趋势（12 个月） ───
export const dataScaleTrend: DataScaleTrend[] = [
  { month: "2026-01", totalRecords: 520, dailyIncrement: 18, storageSize: 28 },
  { month: "2026-02", totalRecords: 680, dailyIncrement: 22, storageSize: 36 },
  { month: "2026-03", totalRecords: 890, dailyIncrement: 28, storageSize: 46 },
  { month: "2026-04", totalRecords: 1150, dailyIncrement: 35, storageSize: 58 },
  { month: "2026-05", totalRecords: 1480, dailyIncrement: 42, storageSize: 72 },
  { month: "2026-06", totalRecords: 1860, dailyIncrement: 48, storageSize: 88 },
  { month: "2026-07", totalRecords: 2300, dailyIncrement: 56, storageSize: 106 },
  { month: "2026-08", totalRecords: 2800, dailyIncrement: 62, storageSize: 126 },
  { month: "2026-09", totalRecords: 3350, dailyIncrement: 70, storageSize: 148 },
  { month: "2026-10", totalRecords: 3960, dailyIncrement: 78, storageSize: 172 },
  { month: "2026-11", totalRecords: 4620, dailyIncrement: 85, storageSize: 198 },
  { month: "2026-12", totalRecords: 5350, dailyIncrement: 92, storageSize: 226 },
]

// ─── 模块关联密度雷达 ───
export const relationshipDensity: RelationshipDensity[] = businessModules.map((m) => {
  const count = moduleRelations.filter(
    (r) => r.fromModuleId === m.id || r.toModuleId === m.id
  ).length
  return {
    dimension: m.name,
    value: Math.round((count / 6) * 100),
    fullMark: 100,
  }
})

// ─── 模块复杂度分析 ───
export const moduleComplexity: ModuleComplexity[] = moduleStats.map((s) => ({
  moduleName: s.moduleName,
  fieldCount: s.fieldCount,
  relationshipCount: s.relationshipCount,
  color: s.color,
}))
