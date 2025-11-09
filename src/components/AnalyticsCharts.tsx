import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts'

export function AnalyticsCharts() {
  // Mock data for charts
  const threadStateData = [
    { name: 'RUNNING', value: 45, count: 45 },
    { name: 'WAITING', value: 89, count: 89 },
    { name: 'BLOCKED', value: 23, count: 23 },
    { name: 'TIMED_WAITING', value: 67, count: 67 },
    { name: 'TERMINATED', value: 12, count: 12 }
  ]

  const performanceOverTime = [
    { time: '00:00', cpu: 45, memory: 67, threads: 234 },
    { time: '00:15', cpu: 52, memory: 71, threads: 245 },
    { time: '00:30', cpu: 48, memory: 69, threads: 238 },
    { time: '00:45', cpu: 61, memory: 73, threads: 252 },
    { time: '01:00', cpu: 58, memory: 75, threads: 247 },
    { time: '01:15', cpu: 63, memory: 78, threads: 261 },
    { time: '01:30', cpu: 55, memory: 72, threads: 243 }
  ]

  const topThreadsByCpuTime = [
    { name: 'GC-Thread', cpuTime: 3456, blockedTime: 0 },
    { name: 'HTTP-Request-Handler', cpuTime: 2341, blockedTime: 234 },
    { name: 'main', cpuTime: 1234, blockedTime: 45 },
    { name: 'Thread-Pool-Worker-1', cpuTime: 856, blockedTime: 89 },
    { name: 'Database-Connection-Pool-1', cpuTime: 456, blockedTime: 12 }
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Thread States Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Thread States Distribution</CardTitle>
          <CardDescription>
            Current distribution of thread states in the dump
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={threadStateData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {threadStateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics Over Time</CardTitle>
          <CardDescription>
            CPU usage, memory consumption, and thread count trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory %" />
              <Line type="monotone" dataKey="threads" stroke="#ffc658" name="Thread Count" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Threads by CPU Time */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Top Threads by CPU Time</CardTitle>
          <CardDescription>
            Threads consuming the most CPU time with their blocked time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topThreadsByCpuTime} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cpuTime" fill="#8884d8" name="CPU Time (ms)" />
              <Bar dataKey="blockedTime" fill="#82ca9d" name="Blocked Time (ms)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}