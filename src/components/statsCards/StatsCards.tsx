import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { dashboardStats } from "@/context/DataContext"

interface StatCard {
  title: string
  value: string | number
  icon: React.ComponentType<any>
  trend?: {
    value: number
    isPositive: boolean
  }
  color: string
}

const stats: StatCard[] = [
  {
    title: "Total Students",
    value: dashboardStats.totalStudents,
    icon: Users,
    trend: {
      value: 12,
      isPositive: true
    },
    color: "text-blue-500"
  },
  {
    title: "Total Teachers",
    value: dashboardStats.totalTeachers,
    icon: GraduationCap,
    trend: {
      value: 2,
      isPositive: true
    },
    color: "text-green-500"
  },
  {
    title: "Active Courses",
    value: dashboardStats.totalCourses,
    icon: BookOpen,
    color: "text-purple-500"
  },
  {
    title: "Monthly Revenue",
    value: `$${(dashboardStats.totalRevenue / 1000).toFixed(0)}K`,
    icon: DollarSign,
    trend: {
      value: dashboardStats.monthlyGrowth,
      isPositive: true
    },
    color: "text-yellow-500"
  }
]

export function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend?.isPositive ? TrendingUp : TrendingDown
        
        return (
          <Card key={stat.title} className="glass-card border-primary/20 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.trend && (
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <TrendIcon className={`h-3 w-3 ${stat.trend.isPositive ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={stat.trend.isPositive ? 'text-green-500' : 'text-red-500'}>
                    {stat.trend.value}%
                  </span>
                  <span>from last month</span>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}