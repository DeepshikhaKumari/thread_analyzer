import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts'

interface AnalyticsChartsProps {
  isMobile?: boolean
}

export function AnalyticsCharts({ isMobile = false }: AnalyticsChartsProps) {
  // Enhanced mock data with realistic thread states
  const threadStateData = [
    { name: 'RUNNABLE', value: 45, description: 'Running threads' },
    { name: 'WAITING', value: 89, description: 'Waiting for resources' },
    { name: 'BLOCKED', value: 23, description: 'Blocked threads' },
    { name: 'TIMED_WAITING', value: 67, description: 'Timed waiting' }
  ]

  const performanceData = [
    { time: '00:00', cpu: 45, memory: 67 },
    { time: '00:30', cpu: 52, memory: 71 },
    { time: '01:00', cpu: 48, memory: 69 },
    { time: '01:30', cpu: 61, memory: 73 },
    { time: '02:00', cpu: 58, memory: 75 },
    { time: '02:30', cpu: 55, memory: 78 },
    { time: '03:00', cpu: 62, memory: 76 }
  ]

  const topThreadsData = [
    { name: 'GC-Thread', cpuTime: 3456, state: 'RUNNABLE' },
    { name: 'HTTP-Handler', cpuTime: 2341, state: 'BLOCKED' },
    { name: 'main', cpuTime: 1234, state: 'RUNNABLE' },
    { name: 'Worker-1', cpuTime: 856, state: 'WAITING' },
    { name: 'DB-Pool', cpuTime: 456, state: 'TIMED_WAITING' }
  ]

  // Thread state color mapping based on semantic meaning
  const THREAD_STATE_COLORS = {
    'RUNNABLE': '#10b981',     // Green - running/active (success)
    'WAITING': '#f59e0b',      // Amber - waiting (warning)
    'BLOCKED': '#ef4444',      // Red - blocked (error/destructive)
    'TIMED_WAITING': '#3b82f6' // Blue - timed waiting (info)
  }

  // Performance metrics colors with better contrast
  const PERFORMANCE_COLORS = {
    cpu: '#8b5cf6',    // Purple for CPU
    memory: '#06b6d4'  // Cyan for Memory
  }

  // Function to get color for thread state
  const getThreadStateColor = (state: string) => {
    return THREAD_STATE_COLORS[state as keyof typeof THREAD_STATE_COLORS] || '#6b7280'
  }

  // Enhanced custom tooltip for pie chart
  const renderPieTooltip = (active: any, payload: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">{data.payload.description}</p>
          <p className="text-sm font-semibold" style={{ color: data.color }}>
            {data.value} threads ({((data.value / threadStateData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-4 md:gap-6`}>
      {/* Thread States Distribution - Enhanced */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-blue-50">
          <CardTitle className="text-base md:text-lg font-semibold text-gray-900">Thread States Distribution</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Current thread state breakdown across all {threadStateData.reduce((sum, item) => sum + item.value, 0)} threads
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={isMobile ? 280 : 320}>
            <PieChart>
              <Pie
                data={threadStateData}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 50 : 70}
                outerRadius={isMobile ? 90 : 120}
                paddingAngle={2}
                dataKey="value"
              >
                {threadStateData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getThreadStateColor(entry.name)}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={renderPieTooltip} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Enhanced legend with percentages */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {threadStateData.map((item, index) => {
              const percentage = ((item.value / threadStateData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)
              return (
                <div key={item.name} className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div 
                    className="w-3 h-3 rounded-full border border-white shadow-sm" 
                    style={{ backgroundColor: getThreadStateColor(item.name) }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.value} ({percentage}%)</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Over Time - Enhanced */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-cyan-50">
          <CardTitle className="text-base md:text-lg font-semibold text-gray-900">Resource Usage Over Time</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            CPU and Memory utilization trends
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={isMobile ? 280 : 320}>
            <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" opacity={0.6} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={{ stroke: '#cbd5e1' }}
                label={{ value: 'Usage (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#64748b' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                labelStyle={{ color: '#1f2937', fontWeight: '500' }}
              />
              <Line 
                type="monotone" 
                dataKey="cpu" 
                stroke={PERFORMANCE_COLORS.cpu}
                strokeWidth={3}
                dot={{ fill: PERFORMANCE_COLORS.cpu, strokeWidth: 2, r: 4, stroke: '#ffffff' }}
                activeDot={{ r: 6, stroke: PERFORMANCE_COLORS.cpu, strokeWidth: 2, fill: '#ffffff' }}
                name="CPU Usage (%)"
              />
              <Line 
                type="monotone" 
                dataKey="memory" 
                stroke={PERFORMANCE_COLORS.memory}
                strokeWidth={3}
                dot={{ fill: PERFORMANCE_COLORS.memory, strokeWidth: 2, r: 4, stroke: '#ffffff' }}
                activeDot={{ r: 6, stroke: PERFORMANCE_COLORS.memory, strokeWidth: 2, fill: '#ffffff' }}
                name="Memory Usage (%)"
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="line"
                wrapperStyle={{ paddingBottom: '20px' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Threads by CPU Time - Enhanced with state colors */}
      <Card className={`overflow-hidden ${isMobile ? '' : 'lg:col-span-2'}`}>
        <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-amber-50">
          <CardTitle className="text-base md:text-lg font-semibold text-gray-900">Top Threads by CPU Time</CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Highest CPU consuming threads with their current states
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={isMobile ? 300 : 350}>
            <BarChart 
              data={topThreadsData} 
              margin={{ top: 20, right: 30, left: 20, bottom: isMobile ? 80 : 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" opacity={0.6} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={isMobile ? 100 : 80}
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={{ stroke: '#cbd5e1' }}
                label={{ value: 'CPU Time (ms)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#64748b' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                labelStyle={{ color: '#1f2937', fontWeight: '500' }}
                formatter={(value, name, props) => [
                  `${value} ms`, 
                  `CPU Time (${props.payload.state})`
                ]}
              />
              <Bar 
                dataKey="cpuTime" 
                radius={[4, 4, 0, 0]}
                stroke="#ffffff"
                strokeWidth={1}
              >
                {topThreadsData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getThreadStateColor(entry.state)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* State legend for the bar chart */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200">
            {Object.entries(THREAD_STATE_COLORS).map(([state, color]) => (
              <div key={state} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded border border-white shadow-sm" 
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm font-medium text-gray-700">{state}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}