import { Activity, AlertTriangle, Clock, Cpu, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

export function MetricsOverview() {
  const metrics = [
    {
      title: 'Total Threads',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      description: 'Active threads detected'
    },
    {
      title: 'Blocked Threads',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: AlertTriangle,
      description: 'Threads waiting for resources'
    },
    {
      title: 'CPU Usage',
      value: '73.2%',
      change: '+8%',
      trend: 'up',
      icon: Cpu,
      description: 'Average CPU utilization'
    },
    {
      title: 'Response Time',
      value: '45ms',
      change: '-12%',
      trend: 'down',
      icon: Clock,
      description: 'Average response time'
    },
    {
      title: 'Deadlocks',
      value: '2',
      change: '0%',
      trend: 'neutral',
      icon: Activity,
      description: 'Potential deadlock situations'
    },
    {
      title: 'Performance Score',
      value: '8.4/10',
      change: '+0.3',
      trend: 'up',
      icon: TrendingUp,
      description: 'Overall system performance'
    }
  ]

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-muted-foreground'
    }
  }

  const getTrendBadgeVariant = (trend: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (trend) {
      case 'up': return 'default'
      case 'down': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <Badge variant={getTrendBadgeVariant(metric.trend)} className="text-xs">
                  {metric.change}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}