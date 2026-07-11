import {
  DollarSign,
  TrendingUp,
  Target,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  ShoppingCart,
  MousePointerClick,
  Eye,
  Package,
  Truck,
  Clock,
  CheckCircle,
  RefreshCw,
  CalendarDays,
  AlertTriangle,
  Warehouse,
  Users,
  Heart,
  Award,
  UserPlus,
  Database,
  HardDrive,
  Server,
  Activity,
  Layers,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Percent: <Percent className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  MousePointerClick: <MousePointerClick className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  RefreshCw: <RefreshCw className="w-5 h-5" />,
  CalendarDays: <CalendarDays className="w-5 h-5" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5" />,
  Warehouse: <Warehouse className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  UserPlus: <UserPlus className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  HardDrive: <HardDrive className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
}

export interface KpiCardProps {
  label: string
  value: string
  unit?: string
  change?: number
  icon?: string
  delay?: number
}

export function KpiCard({ label, value, unit, change, icon, delay = 0 }: KpiCardProps) {
  return (
    <div
      className="p-5 rounded-xl border border-border surface-elevated hover:border-primary/30 transition-all animate-fade-in-up"
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">{label}</span>
        {icon && (
          <span className="text-primary opacity-60">
            {iconMap[icon] ?? <BarChart3 className="w-5 h-5" />}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1 mt-2">
          {change >= 0 ? (
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
          )}
          <span
            className={`text-xs font-medium ${
              change >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {Math.abs(change)}%
          </span>
          <span className="text-xs text-muted-foreground">环比</span>
        </div>
      )}
    </div>
  )
}
