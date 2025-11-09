import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { motion, AnimatePresence } from 'motion/react'
import { 
  ArrowLeft, 
  Download, 
  Users, 
  AlertTriangle, 
  Cpu, 
  Clock, 
  Lock, 
  TrendingUp,
  TrendingDown,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Target,
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Share2,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart as RechartsPieChart,
  Cell
} from 'recharts'

const COLORS = ['#8884d8', '#00c49f', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface DetailedMetricViewProps {
  metricType: string
  onBack: () => void
}

const getMetricData = (metricType: string) => {
  switch (metricType) {
    case 'Total Threads':
      return {
        title: 'Total Threads Analysis',
        icon: <Users className="w-8 h-8" />,
        color: 'blue',
        value: '126',
        description: 'Comprehensive analysis of all active threads in the system with detailed performance insights',
        summary: 'Your application currently has 126 active threads distributed across 8 thread pools and execution contexts. Analysis shows healthy thread distribution with 84% utilization efficiency. Main execution pools are operating within optimal parameters, with GC threads consuming 31% CPU due to heap pressure. Current thread-to-core ratio is 15.75:1, indicating good parallelization for your 8-core system.',
        keyMetrics: [
          { label: 'Active Threads', value: '126', change: '+5%', trend: 'up' },
          { label: 'Peak Threads Today', value: '134', change: '+2%', trend: 'up' },
          { label: 'Max Pool Capacity', value: '200', change: '0%', trend: 'stable' },
          { label: 'Thread Utilization', value: '84%', change: '+3%', trend: 'up' },
          { label: 'Daemon Threads', value: '89', change: '+1%', trend: 'up' },
          { label: 'User Threads', value: '37', change: '+8%', trend: 'up' },
          { label: 'Avg Thread Lifespan', value: '2.3h', change: '-5%', trend: 'down' },
          { label: 'Thread Creation Rate', value: '12/min', change: '+15%', trend: 'up' }
        ],
        
        // Enhanced thread pool analysis
        threadPoolAnalysis: [
          {
            name: 'HTTP Request Handler Pool',
            currentThreads: 32,
            maxThreads: 50,
            coreThreads: 20,
            queueSize: 245,
            maxQueueSize: 1000,
            utilization: '85%',
            avgResponseTime: '1.2s',
            peakResponseTime: '4.8s',
            requestsPerSecond: 156,
            poolEfficiency: '89%',
            healthStatus: 'Good',
            recommendations: ['Consider increasing core threads to 25', 'Monitor queue buildup during peak hours'],
            taskTypes: ['User API requests', 'File uploads', 'Authentication', 'Session management'],
            averageTaskDuration: '850ms',
            longestRunningTask: '12.3s (Large file upload)',
            threadCreationPattern: 'On-demand with 2s keepalive'
          },
          {
            name: 'Database Connection Pool',
            currentThreads: 18,
            maxThreads: 25,
            coreThreads: 10,
            queueSize: 89,
            maxQueueSize: 500,
            utilization: '72%',
            avgResponseTime: '2.1s',
            peakResponseTime: '8.7s',
            requestsPerSecond: 45,
            poolEfficiency: '76%',
            healthStatus: 'Warning',
            recommendations: ['Optimize slow queries', 'Consider connection pooling tuning', 'Review transaction isolation levels'],
            taskTypes: ['SELECT queries', 'INSERT operations', 'UPDATE statements', 'Transaction management'],
            averageTaskDuration: '1.8s',
            longestRunningTask: '45.2s (Complex report query)',
            threadCreationPattern: 'Pre-allocated with connection reuse'
          },
          {
            name: 'Background Processing Pool',
            currentThreads: 15,
            maxThreads: 30,
            coreThreads: 8,
            queueSize: 1234,
            maxQueueSize: 5000,
            utilization: '50%',
            avgResponseTime: '3.4s',
            peakResponseTime: '15.6s',
            requestsPerSecond: 12,
            poolEfficiency: '92%',
            healthStatus: 'Good',
            recommendations: ['Queue management is healthy', 'Consider batch processing for efficiency'],
            taskTypes: ['Email notifications', 'Report generation', 'Data cleanup', 'Cache refresh'],
            averageTaskDuration: '2.8s',
            longestRunningTask: '2.1m (Monthly report generation)',
            threadCreationPattern: 'Scheduled with 5m keepalive'
          },
          {
            name: 'Async I/O Pool',
            currentThreads: 12,
            maxThreads: 20,
            coreThreads: 8,
            queueSize: 567,
            maxQueueSize: 2000,
            utilization: '60%',
            avgResponseTime: '890ms',
            peakResponseTime: '3.2s',
            requestsPerSecond: 78,
            poolEfficiency: '88%',
            healthStatus: 'Good',
            recommendations: ['I/O performance is optimal', 'Monitor file system latency'],
            taskTypes: ['File operations', 'Network calls', 'External API calls', 'Log writing'],
            averageTaskDuration: '650ms',
            longestRunningTask: '18.7s (Large file transfer)',
            threadCreationPattern: 'Dynamic scaling with NIO'
          }
        ],
        
        // Thread lifecycle analysis
        threadLifecycleAnalysis: {
          creationRate: {
            perSecond: 0.2,
            perMinute: 12,
            perHour: 720,
            peakPerMinute: 45,
            trend: 'Increasing (+15% from yesterday)'
          },
          destructionRate: {
            perSecond: 0.18,
            perMinute: 11,
            perHour: 660,
            peakPerMinute: 38,
            trend: 'Stable'
          },
          avgLifespan: {
            overall: '2h 18m',
            daemon: '4h 12m',
            userThreads: '1h 45m',
            shortestLived: '23s (HTTP handler)',
            longestLived: '6h 34m (Main application thread)'
          },
          threadStates: {
            runnable: { count: 72, percentage: 57.1, avgDuration: '1.2s' },
            waiting: { count: 31, percentage: 24.6, avgDuration: '3.8s' },
            blocked: { count: 23, percentage: 18.3, avgDuration: '2.3s' },
            timedWaiting: { count: 15, percentage: 11.9, avgDuration: '5.1s' },
            new: { count: 2, percentage: 1.6, avgDuration: '0.1s' },
            terminated: { count: 3, percentage: 2.4, avgDuration: 'N/A' }
          }
        },
        
        // Resource consumption patterns
        resourceConsumption: {
          memory: {
            totalAllocated: '2.34 GB',
            heapUsage: '1.89 GB',
            nonHeapUsage: '450 MB',
            avgPerThread: '18.5 MB',
            topConsumers: [
              { thread: 'HTTP-Handler-Pool', usage: '456 MB', percentage: 19.5 },
              { thread: 'Database-Pool', usage: '234 MB', percentage: 10.0 },
              { thread: 'Background-Tasks', usage: '189 MB', percentage: 8.1 },
              { thread: 'Cache-Workers', usage: '123 MB', percentage: 5.3 }
            ],
            gcImpact: {
              majorGCFrequency: '2.3 times/hour',
              minorGCFrequency: '45 times/hour',
              avgGCPause: '23ms',
              maxGCPause: '156ms',
              gcCpuOverhead: '8.2%'
            }
          },
          cpu: {
            totalUsage: '78%',
            userSpace: '63%',
            kernelSpace: '15%',
            avgPerThread: '0.62%',
            contextSwitches: '1,247/sec',
            topConsumers: [
              { thread: 'GC-Thread-0', usage: '31%', state: 'RUNNABLE' },
              { thread: 'HTTP-Handler-1', usage: '18%', state: 'BLOCKED' },
              { thread: 'Background-Processor', usage: '15%', state: 'RUNNABLE' },
              { thread: 'Database-Worker-1', usage: '12%', state: 'WAITING' }
            ]
          },
          diskIO: {
            readOperations: '1,234/sec',
            writeOperations: '567/sec',
            totalThroughput: '45.6 MB/sec',
            avgLatency: '12ms',
            topIOThreads: [
              { thread: 'Log-Writer', operations: '234/sec', type: 'Write' },
              { thread: 'Cache-Loader', operations: '189/sec', type: 'Read' },
              { thread: 'Backup-Service', operations: '123/sec', type: 'Write' }
            ]
          },
          network: {
            connections: 1456,
            activeConnections: 234,
            dataTransfer: '12.3 MB/sec',
            avgLatency: '34ms',
            topNetworkThreads: [
              { thread: 'HTTP-Acceptor', connections: 89, bandwidth: '4.5 MB/sec' },
              { thread: 'API-Gateway', connections: 67, bandwidth: '3.2 MB/sec' },
              { thread: 'WebSocket-Handler', connections: 45, bandwidth: '2.1 MB/sec' }
            ]
          }
        },
        
        // Thread contention analysis
        contentionAnalysis: {
          lockContention: {
            totalLocks: 2456,
            contentedLocks: 89,
            contentionRate: '3.6%',
            avgWaitTime: '2.3ms',
            maxWaitTime: '456ms',
            hotspots: [
              {
                lock: 'ConnectionPool.lock',
                waitingThreads: 12,
                avgWaitTime: '45ms',
                maxWaitTime: '234ms',
                contentionFrequency: '67/min'
              },
              {
                lock: 'CacheManager.updateLock',
                waitingThreads: 8,
                avgWaitTime: '23ms',
                maxWaitTime: '189ms',
                contentionFrequency: '34/min'
              },
              {
                lock: 'SessionRegistry.accessLock',
                waitingThreads: 6,
                avgWaitTime: '12ms',
                maxWaitTime: '67ms',
                contentionFrequency: '89/min'
              }
            ]
          },
          deadlockDetection: {
            detected: 0,
            suspiciousPatterns: 3,
            potentialRisks: [
              'Database connection + Cache lock circular dependency',
              'Session lock + User data lock ordering',
              'File handle + Memory buffer lock contention'
            ],
            lastDeadlock: 'None detected in last 24h',
            preventionMeasures: [
              'Lock ordering protocol in place',
              'Timeout-based lock acquisition',
              'Deadlock detection thread active'
            ]
          }
        },
        
        // Performance insights and recommendations
        performanceInsights: {
          efficiency: {
            overall: '84%',
            cpuEfficiency: '78%',
            memoryEfficiency: '91%',
            ioEfficiency: '67%',
            threadPoolEfficiency: '82%'
          },
          bottlenecks: [
            {
              type: 'CPU Bound',
              description: 'GC pressure causing high CPU usage',
              affectedThreads: ['GC-Thread-0', 'GC-Thread-1'],
              impact: 'High',
              solution: 'Tune heap size and GC parameters',
              priority: 'Critical'
            },
            {
              type: 'I/O Bound',
              description: 'Database query optimization needed',
              affectedThreads: ['DB-Worker-1', 'DB-Worker-2', 'DB-Worker-3'],
              impact: 'Medium',
              solution: 'Add database indexes, optimize query plans',
              priority: 'High'
            },
            {
              type: 'Lock Contention',
              description: 'Connection pool lock causing wait times',
              affectedThreads: ['HTTP-Handler pool'],
              impact: 'Medium',
              solution: 'Implement lock-free connection pooling',
              priority: 'Medium'
            }
          ],
          recommendations: [
            {
              category: 'Thread Pool Optimization',
              items: [
                'Increase HTTP handler core threads from 20 to 25',
                'Implement adaptive thread pool sizing',
                'Add thread pool monitoring and alerting',
                'Consider virtual threads for I/O bound operations'
              ]
            },
            {
              category: 'Memory Management',
              items: [
                'Increase heap size to 4GB to reduce GC frequency',
                'Implement G1GC for better pause times',
                'Add memory leak detection monitoring',
                'Optimize object lifecycle management'
              ]
            },
            {
              category: 'Performance Monitoring',
              items: [
                'Implement real-time thread metrics dashboard',
                'Add automated performance regression detection',
                'Set up alerting for thread pool exhaustion',
                'Enable detailed thread dump collection'
              ]
            }
          ]
        },
        
        // Real-time monitoring data
        realTimeMetrics: {
          threadCreationEvents: [
            { time: '14:30:45', action: 'Created', thread: 'HTTP-Handler-34', pool: 'HTTP Pool' },
            { time: '14:30:42', action: 'Created', thread: 'Background-Task-67', pool: 'Background Pool' },
            { time: '14:30:38', action: 'Terminated', thread: 'HTTP-Handler-31', pool: 'HTTP Pool' },
            { time: '14:30:35', action: 'Created', thread: 'DB-Worker-23', pool: 'Database Pool' }
          ],
          systemHealth: {
            overallStatus: 'Healthy',
            cpuHealth: 'Warning (High usage)',
            memoryHealth: 'Good',
            threadHealth: 'Good',
            ioHealth: 'Good'
          }
        },
        
        chartData: [
          { name: 'HTTP Pool', count: 32, utilization: 85, priority: 5, memoryUsage: 456, efficiency: 89, queueDepth: 245 },
          { name: 'Database Pool', count: 18, utilization: 72, priority: 7, memoryUsage: 234, efficiency: 76, queueDepth: 89 },
          { name: 'Background Pool', count: 15, utilization: 50, priority: 3, memoryUsage: 189, efficiency: 92, queueDepth: 1234 },
          { name: 'I/O Pool', count: 12, utilization: 60, priority: 4, memoryUsage: 123, efficiency: 88, queueDepth: 567 },
          { name: 'Cache Pool', count: 8, utilization: 55, priority: 4, memoryUsage: 67, efficiency: 85, queueDepth: 34 },
          { name: 'Scheduler Pool', count: 8, utilization: 70, priority: 8, memoryUsage: 45, efficiency: 91, queueDepth: 12 },
          { name: 'System Pool', count: 23, utilization: 45, priority: 10, memoryUsage: 89, efficiency: 94, queueDepth: 5 },
          { name: 'Monitoring Pool', count: 10, utilization: 35, priority: 2, memoryUsage: 23, efficiency: 87, queueDepth: 8 }
        ],
        
        threadDetails: [
          { id: 'TH-001', name: 'main', state: 'RUNNABLE', cpu: '23%', memory: '45MB', priority: 5, age: '4.2h', pool: 'Main', stackDepth: 12 },
          { id: 'TH-002', name: 'GC Thread#0', state: 'RUNNABLE', cpu: '31%', memory: '12MB', priority: 10, age: '4.2h', pool: 'System', stackDepth: 8 },
          { id: 'TH-003', name: 'GC Thread#1', state: 'WAITING', cpu: '0%', memory: '8MB', priority: 10, age: '4.2h', pool: 'System', stackDepth: 5 },
          { id: 'TH-047', name: 'HTTP-Request-Handler-1', state: 'BLOCKED', cpu: '18%', memory: '23MB', priority: 5, age: '1.8h', pool: 'HTTP', stackDepth: 15 },
          { id: 'TH-048', name: 'HTTP-Request-Handler-2', state: 'RUNNABLE', cpu: '15%', memory: '21MB', priority: 5, age: '1.6h', pool: 'HTTP', stackDepth: 18 },
          { id: 'TH-089', name: 'Database-Pool-Worker-1', state: 'WAITING', cpu: '12%', memory: '18MB', priority: 7, age: '3.1h', pool: 'Database', stackDepth: 22 },
          { id: 'TH-090', name: 'Database-Pool-Worker-2', state: 'TIMED_WAITING', cpu: '8%', memory: '16MB', priority: 7, age: '2.9h', pool: 'Database', stackDepth: 19 },
          { id: 'TH-156', name: 'Cache-Manager', state: 'RUNNABLE', cpu: '8%', memory: '25MB', priority: 4, age: '4.1h', pool: 'Cache', stackDepth: 11 },
          { id: 'TH-234', name: 'Background-Task-1', state: 'WAITING', cpu: '5%', memory: '12MB', priority: 3, age: '2.3h', pool: 'Background', stackDepth: 14 },
          { id: 'TH-235', name: 'Background-Task-2', state: 'RUNNABLE', cpu: '7%', memory: '14MB', priority: 3, age: '1.9h', pool: 'Background', stackDepth: 16 }
        ],
        
        timelineData: [
          { time: '00:00', total: 98, active: 67, waiting: 23, blocked: 8, new: 2, terminated: 1, efficiency: 78 },
          { time: '04:00', total: 103, active: 72, waiting: 24, blocked: 7, new: 3, terminated: 2, efficiency: 81 },
          { time: '08:00', total: 126, active: 89, waiting: 28, blocked: 9, new: 5, terminated: 3, efficiency: 84 },
          { time: '12:00', total: 134, active: 95, waiting: 32, blocked: 7, new: 8, terminated: 4, efficiency: 87 },
          { time: '16:00', total: 129, active: 91, waiting: 29, blocked: 9, new: 6, terminated: 5, efficiency: 85 },
          { time: '20:00', total: 112, active: 78, waiting: 26, blocked: 8, new: 4, terminated: 3, efficiency: 82 }
        ]
      }

    case 'Runnable Threads':
      return {
        title: 'Runnable Threads Analysis',
        icon: <Cpu className="w-8 h-8" />,
        color: 'green',
        value: '82',
        description: 'Comprehensive analysis of threads in RUNNABLE state with performance insights',
        summary: '82 threads are currently in RUNNABLE state, indicating they are ready to execute or actively running. This represents 65% of total threads, showing good utilization of system resources. CPU-bound threads are efficiently distributed across cores.',
        keyMetrics: [
          { label: 'Runnable Threads', value: '82', change: '+8%', trend: 'up' },
          { label: 'CPU Utilization', value: '78%', change: '+5%', trend: 'up' },
          { label: 'Avg Execution Time', value: '1.2s', change: '-3%', trend: 'down' },
          { label: 'Context Switches', value: '1,247/s', change: '+12%', trend: 'up' },
          { label: 'Core Utilization', value: '89%', change: '+7%', trend: 'up' },
          { label: 'Queue Efficiency', value: '94%', change: '+2%', trend: 'up' },
          { label: 'Thread Affinity', value: '67%', change: '+5%', trend: 'up' },
          { label: 'Priority Distribution', value: 'Balanced', change: '0%', trend: 'stable' }
        ],
        chartData: [
          { name: 'HTTP Handlers', count: 28, cpu: 65, priority: 5, efficiency: 89 },
          { name: 'Background Tasks', count: 24, cpu: 45, priority: 3, efficiency: 92 },
          { name: 'Database Workers', count: 18, cpu: 80, priority: 7, efficiency: 76 },
          { name: 'I/O Processors', count: 12, cpu: 55, priority: 4, efficiency: 88 }
        ]
      }

    case 'Blocked/waiting/timed-waiting Threads':
      return {
        title: 'Blocked & Waiting Threads Analysis',
        icon: <AlertTriangle className="w-8 h-8" />,
        color: 'orange',
        value: '31',
        description: 'Analysis of threads waiting for resources with contention insights',
        summary: '31 threads are currently blocked, waiting, or timed-waiting for resources. Main causes include database connections and lock contention. Average wait time has increased by 8% indicating potential bottlenecks in resource allocation.',
        keyMetrics: [
          { label: 'Blocked Threads', value: '31', change: '+15%', trend: 'up' },
          { label: 'Avg Wait Time', value: '2.3s', change: '+8%', trend: 'up' },
          { label: 'Lock Contention', value: '3.6%', change: '+2%', trend: 'up' },
          { label: 'Resource Conflicts', value: '89', change: '+12%', trend: 'up' },
          { label: 'Timeout Rate', value: '2.1%', change: '+5%', trend: 'up' },
          { label: 'Queue Backlog', value: '156', change: '+18%', trend: 'up' },
          { label: 'Recovery Time', value: '890ms', change: '+3%', trend: 'up' },
          { label: 'Starvation Events', value: '7', change: '+40%', trend: 'up' }
        ],
        chartData: [
          { name: 'Database Locks', value: 12, waitTime: 3.4, severity: 'High' },
          { name: 'Connection Pool', value: 8, waitTime: 2.1, severity: 'Medium' },
          { name: 'File I/O', value: 6, waitTime: 1.8, severity: 'Medium' },
          { name: 'Cache Access', value: 5, waitTime: 1.2, severity: 'Low' }
        ]
      }

    case 'Deadlock Threads':
      return {
        title: 'Deadlock Threads Analysis',
        icon: <Lock className="w-8 h-8" />,
        color: 'red',
        value: '2',
        description: 'Critical analysis of deadlocked threads requiring immediate attention',
        summary: '2 threads are currently involved in deadlock situations. Critical issue requiring immediate attention to prevent system lockup. Deadlock detection algorithms are active and monitoring circular wait conditions.',
        keyMetrics: [
          { label: 'Deadlocked Threads', value: '2', change: '+100%', trend: 'up' },
          { label: 'Detection Time', value: '23ms', change: '-5%', trend: 'down' },
          { label: 'Resolution Time', value: '156ms', change: '+20%', trend: 'up' },
          { label: 'False Positives', value: '0', change: '0%', trend: 'stable' },
          { label: 'Circular Waits', value: '1', change: '+100%', trend: 'up' },
          { label: 'Lock Hierarchy', value: 'Violated', change: 'N/A', trend: 'stable' },
          { label: 'Recovery Success', value: '100%', change: '0%', trend: 'stable' },
          { label: 'Prevention Score', value: '87%', change: '-3%', trend: 'down' }
        ],
        chartData: [
          { name: 'Database Deadlocks', value: 1, severity: 'Critical', impact: 'High' },
          { name: 'Cache Deadlocks', value: 1, severity: 'High', impact: 'Medium' },
          { name: 'File Lock Deadlocks', value: 0, severity: 'Low', impact: 'Low' },
          { name: 'Network Deadlocks', value: 0, severity: 'Low', impact: 'Low' }
        ]
      }

    case 'Stuck Threads':
      return {
        title: 'Stuck Threads Analysis',
        icon: <Clock className="w-8 h-8" />,
        color: 'purple',
        value: '8',
        description: 'Analysis of long-running threads and potential performance bottlenecks',
        summary: '8 threads have been running for an unusually long time without completing. These may indicate performance bottlenecks, infinite loops, or resource starvation. Average stuck time has increased significantly.',
        keyMetrics: [
          { label: 'Stuck Threads', value: '8', change: '+60%', trend: 'up' },
          { label: 'Avg Stuck Time', value: '12.3m', change: '+25%', trend: 'up' },
          { label: 'Longest Stuck', value: '45.2m', change: '+15%', trend: 'up' },
          { label: 'Auto Recovery', value: '3', change: '+50%', trend: 'up' },
          { label: 'Timeout Triggers', value: '12', change: '+33%', trend: 'up' },
          { label: 'Performance Impact', value: 'Medium', change: 'N/A', trend: 'stable' },
          { label: 'Resource Usage', value: '78%', change: '+12%', trend: 'up' },
          { label: 'Intervention Rate', value: '37%', change: '+8%', trend: 'up' }
        ],
        chartData: [
          { name: 'Long DB Queries', value: 3, duration: 45.2, type: 'Database' },
          { name: 'File Processing', value: 2, duration: 23.1, type: 'I/O' },
          { name: 'Network Calls', value: 2, duration: 18.7, type: 'Network' },
          { name: 'Computation', value: 1, duration: 12.3, type: 'CPU' }
        ]
      }

    case 'Daemon and Non-Daemon':
      return {
        title: 'Daemon vs Non-Daemon Threads',
        icon: <Brain className="w-8 h-8" />,
        color: 'blue',
        value: '89:37',
        description: 'Analysis of daemon and user threads distribution and efficiency',
        summary: '89 daemon threads and 37 non-daemon threads are active. Daemon threads handle background tasks while non-daemon threads process user requests. The ratio shows a healthy balance with daemon threads managing system maintenance efficiently.',
        keyMetrics: [
          { label: 'Daemon Threads', value: '89', change: '+3%', trend: 'up' },
          { label: 'Non-Daemon Threads', value: '37', change: '+8%', trend: 'up' },
          { label: 'Daemon Ratio', value: '70.6%', change: '-2%', trend: 'down' },
          { label: 'User Thread Efficiency', value: '92%', change: '+5%', trend: 'up' },
          { label: 'Background Load', value: '45%', change: '+2%', trend: 'up' },
          { label: 'Foreground Response', value: '1.2s', change: '-3%', trend: 'down' },
          { label: 'Service Availability', value: '99.8%', change: '+0.1%', trend: 'up' },
          { label: 'Thread Lifecycle', value: 'Optimal', change: 'N/A', trend: 'stable' }
        ],
        chartData: [
          { name: 'Daemon Threads', value: 89, type: 'daemon', priority: 'Background', efficiency: 87 },
          { name: 'User Threads', value: 37, type: 'user', priority: 'Foreground', efficiency: 92 }
        ]
      }

    default:
      return {
        title: 'Metric Analysis',
        icon: <BarChart3 className="w-8 h-8" />,
        color: 'blue',
        value: 'N/A',
        description: 'Detailed analysis not available',
        summary: 'No detailed analysis available for this metric.',
        keyMetrics: [],
        chartData: []
      }
  }
}

const getThreadStateColor = (state: string) => {
  switch (state.toUpperCase()) {
    case 'RUNNABLE': return 'bg-green-500 text-white'
    case 'BLOCKED': return 'bg-red-500 text-white'
    case 'WAITING': return 'bg-yellow-500 text-white'
    case 'TIMED_WAITING': return 'bg-blue-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

export function DetailedMetricView({ metricType, onBack }: DetailedMetricViewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const data = getMetricData(metricType)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleExportReport = () => {
    // Simulate report export
    const reportData = {
      metric: metricType,
      timestamp: new Date().toISOString(),
      data: data
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${metricType.toLowerCase().replace(/\s+/g, '-')}-analysis-report.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded w-80 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-60 animate-pulse"></div>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-40 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="h-80 bg-gray-200 rounded animate-pulse"></div>
            </Card>
            <Card className="p-6">
              <div className="h-80 bg-gray-200 rounded animate-pulse"></div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onBack}
                className="flex items-center space-x-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Overview</span>
              </Button>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-${data.color}-100`}>
                {data.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
                <p className="text-gray-600 mt-1">{data.description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share Analysis</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleExportReport}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Analysis Summary</h3>
                <p className="text-blue-800 leading-relaxed">{data.summary}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{data.value}</div>
                <div className="text-sm text-blue-700">Current Value</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-gray-200 hover:border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-700">{metric.label}</h4>
                  <div className={`flex items-center space-x-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                    {metric.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-b border-gray-200"
        >
          <nav className="-mb-px flex space-x-8">
            {['overview', 'charts', 'recommendations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Primary Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Primary Distribution Analysis</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey={Object.keys(data.chartData[0] || {}).find(key => key !== 'name') || 'count'} fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Thread Details List */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Critical Thread Details</h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {(data.threadDetails || [
                      { name: 'main', id: 'TH-001', state: 'RUNNABLE', cpu: '23%' },
                      { name: 'HTTP-Request-Handler', id: 'TH-047', state: 'BLOCKED', cpu: '18%' },
                      { name: 'Database-Pool-Worker', id: 'TH-089', state: 'WAITING', cpu: '12%' },
                      { name: 'GC-Thread', id: 'TH-002', state: 'RUNNABLE', cpu: '31%' },
                      { name: 'Cache-Manager', id: 'TH-156', state: 'TIMED_WAITING', cpu: '8%' },
                      { name: 'Background-Task', id: 'TH-234', state: 'WAITING', cpu: '5%' }
                    ]).slice(0, 10).map((thread, index) => (
                      <motion.div
                        key={thread.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div>
                            <div className="font-medium text-gray-900">{thread.name}</div>
                            <div className="text-sm text-gray-500">{thread.id}</div>
                            {thread.age && <div className="text-xs text-gray-400">Age: {thread.age}</div>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={`${getThreadStateColor(thread.state)} text-xs`}>
                            {thread.state}
                          </Badge>
                          <div className="text-sm font-medium text-gray-600">{thread.cpu}</div>
                          {thread.memory && <div className="text-xs text-gray-500">{thread.memory}</div>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Timeline Analysis (if available) */}
              {data.timelineData && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">24-Hour Timeline Analysis</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.timelineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="active" stroke="#00c49f" strokeWidth={2} />
                        <Line type="monotone" dataKey="waiting" stroke="#FFBB28" strokeWidth={2} />
                        <Line type="monotone" dataKey="blocked" stroke="#FF8042" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}

              {/* Total Threads Specific Analysis */}
              {metricType === 'Total Threads' && (
                <>
                  {/* Thread Pool Analysis */}
                  {data.threadPoolAnalysis && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Thread Pool Detailed Analysis</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {data.threadPoolAnalysis.map((pool, index) => (
                          <Card key={pool.name} className="p-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900">{pool.name}</h4>
                                <Badge className={`${
                                  pool.healthStatus === 'Good' ? 'bg-green-100 text-green-800' :
                                  pool.healthStatus === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {pool.healthStatus}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600">Current/Max Threads:</span>
                                  <div className="font-medium">{pool.currentThreads}/{pool.maxThreads}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Utilization:</span>
                                  <div className="font-medium">{pool.utilization}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Queue Size:</span>
                                  <div className="font-medium">{pool.queueSize}/{pool.maxQueueSize}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Efficiency:</span>
                                  <div className="font-medium">{pool.poolEfficiency}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Avg Response:</span>
                                  <div className="font-medium">{pool.avgResponseTime}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Requests/sec:</span>
                                  <div className="font-medium">{pool.requestsPerSecond}</div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="text-sm text-gray-600">Task Types:</div>
                                <div className="flex flex-wrap gap-1">
                                  {pool.taskTypes.map((task, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {task}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="text-sm text-gray-600">Recommendations:</div>
                                <ul className="text-xs text-gray-700 space-y-1">
                                  {pool.recommendations.map((rec, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <span className="text-blue-500 mr-1">•</span>
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'charts' && (
            <motion.div
              key="charts"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Detailed Performance Charts</h3>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="count" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="utilization" stackId="2" stroke="#00c49f" fill="#00c49f" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Total Threads Specific Recommendations */}
              {metricType === 'Total Threads' && data.performanceInsights?.recommendations && (
                <>
                  {/* Performance Insights Summary */}
                  <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold mb-4 text-blue-700">📊 Performance Efficiency Analysis</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                      {Object.entries(data.performanceInsights.efficiency).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{value}</div>
                          <div className="text-sm text-blue-700 capitalize">{key.replace('Efficiency', '')}</div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Categorized Recommendations */}
                  {data.performanceInsights.recommendations.map((category, categoryIndex) => (
                    <Card key={categoryIndex} className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">
                        {category.category === 'Thread Pool Optimization' && '⚡ '}
                        {category.category === 'Memory Management' && '🧠 '}
                        {category.category === 'Performance Monitoring' && '📈 '}
                        {category.category}
                      </h3>
                      <div className="space-y-3">
                        {category.items.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (categoryIndex * 0.2) + (itemIndex * 0.1) }}
                            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="text-gray-700">{item}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </>
              )}

              {/* Default recommendations for other metrics */}
              {metricType !== 'Total Threads' && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Optimization Recommendations</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-1">Monitor Thread Pool Utilization</h4>
                        <p className="text-yellow-700 text-sm">
                          Keep an eye on thread pool usage to prevent resource exhaustion and ensure optimal performance.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Implement Performance Monitoring</h4>
                        <p className="text-blue-700 text-sm">
                          Set up comprehensive monitoring to track thread performance metrics and identify bottlenecks early.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800 mb-1">Optimize Resource Allocation</h4>
                        <p className="text-green-700 text-sm">
                          Review and adjust thread pool configurations based on actual usage patterns and performance requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Export Button at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center pt-8 pb-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={handleExportReport}
              size="lg"
              className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span>Export Complete Analysis Report</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}