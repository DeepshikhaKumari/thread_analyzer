import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Layers, 
  Activity, 
  Cpu, 
  Trash2, 
  MemoryStick, 
  GitBranch,
  List,
  Play,
  Pause,
  RefreshCw,
  Download,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts'

interface ThreadAnalysisViewsProps {
  viewType: string
  isMobile?: boolean
}

const COLORS = ['#8884d8', '#00c49f', '#FFBB28', '#FF8042', '#0088FE', '#8DD1E1']

export function ThreadAnalysisViews({ viewType, isMobile = false }: ThreadAnalysisViewsProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [filterTerm, setFilterTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [threadsPerPage, setThreadsPerPage] = useState(10)
  const [isChangingPage, setIsChangingPage] = useState(false)

  // Reset page when view type changes
  useEffect(() => {
    setCurrentPage(1)
  }, [viewType])

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (viewType === 'all-threads') {
        switch (event.key) {
          case 'ArrowLeft':
            if (event.ctrlKey) {
              event.preventDefault()
              handlePrevious()
            }
            break
          case 'ArrowRight':
            if (event.ctrlKey) {
              event.preventDefault()
              handleNext()
            }
            break
          case 'Home':
            if (event.ctrlKey) {
              event.preventDefault()
              handleFirst()
            }
            break
          case 'End':
            if (event.ctrlKey) {
              event.preventDefault()
              handleLast()
            }
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [viewType, currentPage])

  const handleStartAnalysis = () => {
    setIsAnalyzing(true)
    setCurrentPage(1) // Reset to first page when refreshing
    setTimeout(() => setIsAnalyzing(false), 3000)
  }

  const getViewConfig = (type: string) => {
    switch (type) {
      case 'all-threads':
        return {
          title: 'All Threads Overview',
          icon: <List className="w-6 h-6" />,
          color: 'blue',
          description: 'Complete list of all threads with detailed information',
          data: [
            { 
              threadId: 'T-001', 
              threadName: 'main', 
              nid: '0x1a2b', 
              state: 'RUNNABLE', 
              priority: 5, 
              daemon: false, 
              stackTrace: 'java.lang.Thread.run(Thread.java:748)'
            },
            { 
              threadId: 'T-002', 
              threadName: 'GC Task Thread#0 (ParallelGC)', 
              nid: '0x1a2c', 
              state: 'RUNNABLE', 
              priority: 9, 
              daemon: true, 
              stackTrace: 'ParallelGC.processObjects(ParallelGC.java:215)'
            },
            { 
              threadId: 'T-003', 
              threadName: 'GC Task Thread#1 (ParallelGC)', 
              nid: '0x1a2d', 
              state: 'RUNNABLE', 
              priority: 9, 
              daemon: true, 
              stackTrace: 'ParallelGC.processObjects(ParallelGC.java:215)'
            },
            { 
              threadId: 'T-004', 
              threadName: 'VM Thread', 
              nid: '0x1a2e', 
              state: 'RUNNABLE', 
              priority: 10, 
              daemon: true, 
              stackTrace: 'VMThread.loop(VMThread.java:445)'
            },
            { 
              threadId: 'T-005', 
              threadName: 'Reference Handler', 
              nid: '0x1a2f', 
              state: 'WAITING', 
              priority: 10, 
              daemon: true, 
              stackTrace: 'java.lang.Object.wait(Native Method)'
            },
            { 
              threadId: 'T-006', 
              threadName: 'Finalizer', 
              nid: '0x1a30', 
              state: 'WAITING', 
              priority: 8, 
              daemon: true, 
              stackTrace: 'java.lang.Object.wait(Native Method)'
            },
            { 
              threadId: 'T-007', 
              threadName: 'Signal Dispatcher', 
              nid: '0x1a31', 
              state: 'RUNNABLE', 
              priority: 9, 
              daemon: true, 
              stackTrace: 'SignalDispatcher.dispatch(SignalDispatcher.java:112)'
            },
            { 
              threadId: 'T-008', 
              threadName: 'Attach Listener', 
              nid: '0x1a32', 
              state: 'WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'AttachListener.doit(AttachListener.java:342)'
            },
            { 
              threadId: 'T-009', 
              threadName: 'C2 CompilerThread0', 
              nid: '0x1a33', 
              state: 'WAITING', 
              priority: 9, 
              daemon: true, 
              stackTrace: 'CompilerThread.loop(CompilerThread.java:333)'
            },
            { 
              threadId: 'T-010', 
              threadName: 'C1 CompilerThread0', 
              nid: '0x1a34', 
              state: 'WAITING', 
              priority: 9, 
              daemon: true, 
              stackTrace: 'CompilerThread.loop(CompilerThread.java:333)'
            },
            { 
              threadId: 'T-011', 
              threadName: 'Sweeper thread', 
              nid: '0x1a35', 
              state: 'WAITING', 
              priority: 9, 
              daemon: true, 
              stackTrace: 'SweeperThread.sweep(SweeperThread.java:198)'
            },
            { 
              threadId: 'T-012', 
              threadName: 'Common-Cleaner', 
              nid: '0x1a36', 
              state: 'TIMED_WAITING', 
              priority: 8, 
              daemon: true, 
              stackTrace: 'java.lang.Object.wait(Native Method)'
            },
            { 
              threadId: 'T-013', 
              threadName: 'ForkJoinPool.commonPool-worker-1', 
              nid: '0x1a37', 
              state: 'WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'ForkJoinPool.scan(ForkJoinPool.java:1655)'
            },
            { 
              threadId: 'T-014', 
              threadName: 'ForkJoinPool.commonPool-worker-2', 
              nid: '0x1a38', 
              state: 'WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'ForkJoinPool.scan(ForkJoinPool.java:1655)'
            },
            { 
              threadId: 'T-015', 
              threadName: 'pool-1-thread-1', 
              nid: '0x1a39', 
              state: 'WAITING', 
              priority: 5, 
              daemon: false, 
              stackTrace: 'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)'
            },
            { 
              threadId: 'T-016', 
              threadName: 'pool-1-thread-2', 
              nid: '0x1a3a', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: false, 
              stackTrace: 'java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1054)'
            },
            { 
              threadId: 'T-017', 
              threadName: 'Catalina-utility-1', 
              nid: '0x1a3b', 
              state: 'WAITING', 
              priority: 1, 
              daemon: true, 
              stackTrace: 'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)'
            },
            { 
              threadId: 'T-018', 
              threadName: 'Catalina-utility-2', 
              nid: '0x1a3c', 
              state: 'TIMED_WAITING', 
              priority: 1, 
              daemon: true, 
              stackTrace: 'java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1054)'
            },
            { 
              threadId: 'T-019', 
              threadName: 'container-0', 
              nid: '0x1a3d', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.lang.Thread.sleep(Native Method)'
            },
            { 
              threadId: 'T-020', 
              threadName: 'ContainerBackgroundProcessor[StandardEngine[Catalina]]', 
              nid: '0x1a3e', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.lang.Thread.sleep(Native Method)'
            },
            { 
              threadId: 'T-021', 
              threadName: 'HTTP-1.1-Processor-1', 
              nid: '0x1a3f', 
              state: 'RUNNABLE', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.net.SocketInputStream.socketRead0(Native Method)'
            },
            { 
              threadId: 'T-022', 
              threadName: 'HTTP-1.1-Processor-2', 
              nid: '0x1a40', 
              state: 'RUNNABLE', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.net.SocketInputStream.socketRead0(Native Method)'
            },
            { 
              threadId: 'T-023', 
              threadName: 'MySQL Statement Cancellation Timer', 
              nid: '0x1a41', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.lang.Object.wait(Native Method)'
            },
            { 
              threadId: 'T-024', 
              threadName: 'MySQL Statement Cancellation Timer', 
              nid: '0x1a42', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.lang.Object.wait(Native Method)'
            },
            { 
              threadId: 'T-025', 
              threadName: 'pool-2-thread-1', 
              nid: '0x1a43', 
              state: 'WAITING', 
              priority: 5, 
              daemon: false, 
              stackTrace: 'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)'
            },
            { 
              threadId: 'T-026', 
              threadName: 'pool-2-thread-2', 
              nid: '0x1a44', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: false, 
              stackTrace: 'java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1054)'
            },
            { 
              threadId: 'T-027', 
              threadName: 'pool-3-thread-1', 
              nid: '0x1a45', 
              state: 'WAITING', 
              priority: 1, 
              daemon: true, 
              stackTrace: 'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)'
            },
            { 
              threadId: 'T-028', 
              threadName: 'pool-3-thread-2', 
              nid: '0x1a46', 
              state: 'TIMED_WAITING', 
              priority: 1, 
              daemon: true, 
              stackTrace: 'java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1054)'
            },
            { 
              threadId: 'T-029', 
              threadName: 'Scheduler-Worker-1', 
              nid: '0x1a47', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.lang.Thread.sleep(Native Method)'
            },
            { 
              threadId: 'T-030', 
              threadName: 'Scheduler-Worker-2', 
              nid: '0x1a48', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.lang.Thread.sleep(Native Method)'
            },
            { 
              threadId: 'T-031', 
              threadName: 'AsyncFileHandlerWriter-1', 
              nid: '0x1a49', 
              state: 'WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)'
            },
            { 
              threadId: 'T-032', 
              threadName: 'AsyncFileHandlerWriter-2', 
              nid: '0x1a4a', 
              state: 'WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)'
            },
            { 
              threadId: 'T-033', 
              threadName: 'DestroyJavaVM', 
              nid: '0x1a4b', 
              state: 'WAITING', 
              priority: 5, 
              daemon: false, 
              stackTrace: 'java.lang.Object.wait(Native Method)'
            },
            { 
              threadId: 'T-034', 
              threadName: 'ApplicationShutdownHooks', 
              nid: '0x1a4c', 
              state: 'WAITING', 
              priority: 5, 
              daemon: false, 
              stackTrace: 'java.lang.Object.wait(Native Method)'
            },
            { 
              threadId: 'T-035', 
              threadName: 'Timer-1', 
              nid: '0x1a4d', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.lang.Object.wait(Native Method)'
            },
            { 
              threadId: 'T-036', 
              threadName: 'Timer-2', 
              nid: '0x1a4e', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.lang.Object.wait(Native Method)'
            },
            { 
              threadId: 'T-037', 
              threadName: 'NioBlockingSelector.BlockPoller-1', 
              nid: '0x1a4f', 
              state: 'RUNNABLE', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'sun.nio.ch.WindowsSelectorImpl$SubSelector.poll0(Native Method)'
            },
            { 
              threadId: 'T-038', 
              threadName: 'NioBlockingSelector.BlockPoller-2', 
              nid: '0x1a50', 
              state: 'RUNNABLE', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'sun.nio.ch.WindowsSelectorImpl$SubSelector.poll0(Native Method)'
            },
            { 
              threadId: 'T-039', 
              threadName: 'Acceptor-80', 
              nid: '0x1a51', 
              state: 'RUNNABLE', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.net.DualStackPlainSocketImpl.accept0(Native Method)'
            },
            { 
              threadId: 'T-040', 
              threadName: 'Acceptor-443', 
              nid: '0x1a52', 
              state: 'RUNNABLE', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.net.DualStackPlainSocketImpl.accept0(Native Method)'
            },
            { 
              threadId: 'T-041', 
              threadName: 'ClientPoller-1', 
              nid: '0x1a53', 
              state: 'RUNNABLE', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'sun.nio.ch.WindowsSelectorImpl$SubSelector.poll0(Native Method)'
            },
            { 
              threadId: 'T-042', 
              threadName: 'ClientPoller-2', 
              nid: '0x1a54', 
              state: 'RUNNABLE', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'sun.nio.ch.WindowsSelectorImpl$SubSelector.poll0(Native Method)'
            },
            { 
              threadId: 'T-043', 
              threadName: 'ContainerBackgroundProcessor[StandardEngine[Catalina].StandardHost[localhost]]', 
              nid: '0x1a55', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.lang.Thread.sleep(Native Method)'
            },
            { 
              threadId: 'T-044', 
              threadName: 'ContainerBackgroundProcessor[StandardEngine[Catalina].StandardHost[localhost].StandardContext[/app]]', 
              nid: '0x1a56', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.lang.Thread.sleep(Native Method)'
            },
            { 
              threadId: 'T-045', 
              threadName: 'pool-4-thread-1', 
              nid: '0x1a57', 
              state: 'WAITING', 
              priority: 5, 
              daemon: false, 
              stackTrace: 'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)'
            },
            { 
              threadId: 'T-046', 
              threadName: 'pool-4-thread-2', 
              nid: '0x1a58', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: false, 
              stackTrace: 'java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1054)'
            },
            { 
              threadId: 'T-047', 
              threadName: 'Background-Task-Executor-1', 
              nid: '0x1a59', 
              state: 'WAITING', 
              priority: 1, 
              daemon: true, 
              stackTrace: 'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)'
            },
            { 
              threadId: 'T-048', 
              threadName: 'Background-Task-Executor-2', 
              nid: '0x1a5a', 
              state: 'TIMED_WAITING', 
              priority: 1, 
              daemon: true, 
              stackTrace: 'java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1054)'
            },
            { 
              threadId: 'T-049', 
              threadName: 'Metrics-Collector-Thread', 
              nid: '0x1a5b', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.lang.Thread.sleep(Native Method)'
            },
            { 
              threadId: 'T-050', 
              threadName: 'Health-Check-Thread', 
              nid: '0x1a5c', 
              state: 'TIMED_WAITING', 
              priority: 5, 
              daemon: true, 
              stackTrace: 'java.lang.Thread.sleep(Native Method)'
            }
          ],
          chartData: [
            { state: 'RUNNABLE', count: 12, percentage: 24 },
            { state: 'WAITING', count: 23, percentage: 46 },
            { state: 'TIMED_WAITING', count: 15, percentage: 30 }
          ]
        }

      case 'identical-stack-trace':
        return {
          title: 'Identical Stack Trace Analysis',
          icon: <Layers className="w-6 h-6" />,
          color: 'blue',
          description: 'Threads grouped by identical stack traces with thread count analysis',
          data: [
            { 
              stackTrace: 'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)', 
              threadCount: 8, 
              threads: ['pool-1-thread-1', 'pool-2-thread-1', 'pool-4-thread-1', 'Catalina-utility-1', 'ForkJoinPool.commonPool-worker-1', 'ForkJoinPool.commonPool-worker-2', 'Background-Task-Executor-1', 'AsyncFileHandlerWriter-1'],
              state: 'WAITING'
            },
            { 
              stackTrace: 'java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1054)', 
              threadCount: 6, 
              threads: ['pool-1-thread-2', 'pool-2-thread-2', 'pool-4-thread-2', 'Catalina-utility-2', 'Background-Task-Executor-2'],
              state: 'TIMED_WAITING'
            },
            { 
              stackTrace: 'java.lang.Object.wait(Native Method)', 
              threadCount: 5, 
              threads: ['Reference Handler', 'Finalizer', 'DestroyJavaVM', 'ApplicationShutdownHooks', 'MySQL Statement Cancellation Timer'],
              state: 'WAITING'
            },
            { 
              stackTrace: 'java.lang.Thread.sleep(Native Method)', 
              threadCount: 4, 
              threads: ['container-0', 'ContainerBackgroundProcessor[StandardEngine[Catalina]]', 'Scheduler-Worker-1', 'Scheduler-Worker-2'],
              state: 'TIMED_WAITING'
            },
            { 
              stackTrace: 'sun.nio.ch.WindowsSelectorImpl$SubSelector.poll0(Native Method)', 
              threadCount: 4, 
              threads: ['NioBlockingSelector.BlockPoller-1', 'NioBlockingSelector.BlockPoller-2', 'ClientPoller-1', 'ClientPoller-2'],
              state: 'RUNNABLE'
            },
            { 
              stackTrace: 'java.net.SocketInputStream.socketRead0(Native Method)', 
              threadCount: 2, 
              threads: ['HTTP-1.1-Processor-1', 'HTTP-1.1-Processor-2'],
              state: 'RUNNABLE'
            },
            { 
              stackTrace: 'java.net.DualStackPlainSocketImpl.accept0(Native Method)', 
              threadCount: 2, 
              threads: ['Acceptor-80', 'Acceptor-443'],
              state: 'RUNNABLE'
            },
            { 
              stackTrace: 'CompilerThread.loop(CompilerThread.java:333)', 
              threadCount: 2, 
              threads: ['C2 CompilerThread0', 'C1 CompilerThread0'],
              state: 'WAITING'
            }
          ],
          chartData: [
            { stackTrace: 'LockSupport.park()', threadCount: 8, state: 'WAITING' },
            { stackTrace: 'ThreadPoolExecutor.getTask()', threadCount: 6, state: 'TIMED_WAITING' },
            { stackTrace: 'Object.wait(Native)', threadCount: 5, state: 'WAITING' },
            { stackTrace: 'Thread.sleep(Native)', threadCount: 4, state: 'TIMED_WAITING' },
            { stackTrace: 'WindowsSelectorImpl.poll0()', threadCount: 4, state: 'RUNNABLE' },
            { stackTrace: 'SocketInputStream.socketRead0()', threadCount: 2, state: 'RUNNABLE' },
            { stackTrace: 'PlainSocketImpl.accept0()', threadCount: 2, state: 'RUNNABLE' },
            { stackTrace: 'CompilerThread.loop()', threadCount: 2, state: 'WAITING' }
          ]
        }

      case 'most-used-methods':
        return {
          title: 'Most Used Methods Analysis',
          icon: <Activity className="w-6 h-6" />,
          color: 'green',
          description: 'Analyze frequently executed methods across all threads',
          data: [
            { method: 'java.sql.Connection.prepareStatement()', calls: 1245, cpuTime: '890ms', threads: 8 },
            { method: 'java.util.HashMap.get()', calls: 982, cpuTime: '234ms', threads: 15 },
            { method: 'java.lang.String.equals()', calls: 756, cpuTime: '123ms', threads: 23 },
            { method: 'org.springframework.web.method.HandlerMethod.invoke()', calls: 543, cpuTime: '567ms', threads: 6 }
          ],
          chartData: [
            { time: '00:00', calls: 234, cpuUsage: 23 },
            { time: '04:00', calls: 456, cpuUsage: 34 },
            { time: '08:00', calls: 789, cpuUsage: 45 },
            { time: '12:00', calls: 1245, cpuUsage: 67 },
            { time: '16:00', calls: 987, cpuUsage: 56 },
            { time: '20:00', calls: 654, cpuUsage: 43 }
          ]
        }

      case 'cpu-threads':
        return {
          title: 'CPU Intensive Threads Analysis',
          icon: <Cpu className="w-6 h-6" />,
          color: 'orange',
          description: 'Monitor and analyze CPU-intensive thread behavior',
          data: [
            { thread: 'GC Thread#0', cpuUsage: 31.5, coreAffinity: 'Core 0-1', priority: 10, state: 'RUNNABLE' },
            { thread: 'HTTP-Request-Handler-1', cpuUsage: 18.2, coreAffinity: 'Core 2-3', priority: 5, state: 'RUNNABLE' },
            { thread: 'Database-Query-Processor', cpuUsage: 15.7, coreAffinity: 'Core 4-5', priority: 7, state: 'RUNNABLE' },
            { thread: 'Background-Batch-Processor', cpuUsage: 12.3, coreAffinity: 'Core 6-7', priority: 3, state: 'RUNNABLE' }
          ],
          chartData: [
            { time: '00:00', cpuUsage: 45, temperature: 62 },
            { time: '04:00', cpuUsage: 52, temperature: 65 },
            { time: '08:00', cpuUsage: 78, temperature: 71 },
            { time: '12:00', cpuUsage: 85, temperature: 74 },
            { time: '16:00', cpuUsage: 82, temperature: 73 },
            { time: '20:00', cpuUsage: 67, temperature: 68 }
          ]
        }

      case 'finalizer-threads':
        return {
          title: 'Finalizer Threads Analysis',
          icon: <Trash2 className="w-6 h-6" />,
          color: 'red',
          description: 'Track object finalization processes and cleanup operations',
          data: [
            { finalizer: 'Finalizer Thread', objectsFinalized: 1247, avgTime: '2.3ms', queueSize: 45, state: 'ACTIVE' },
            { finalizer: 'Reference Handler', referencesProcessed: 892, avgTime: '0.8ms', queueSize: 12, state: 'ACTIVE' },
            { finalizer: 'Cleaner Thread', cleanupTasks: 234, avgTime: '5.1ms', queueSize: 8, state: 'WAITING' }
          ],
          chartData: [
            { time: '00:00', finalized: 89, queue: 23 },
            { time: '04:00', finalized: 156, queue: 34 },
            { time: '08:00', finalized: 234, queue: 45 },
            { time: '12:00', finalized: 345, queue: 52 },
            { time: '16:00', finalized: 278, queue: 41 },
            { time: '20:00', finalized: 198, queue: 32 }
          ]
        }

      case 'gc-threads':
        return {
          title: 'Garbage Collection Threads Analysis',
          icon: <MemoryStick className="w-6 h-6" />,
          color: 'purple',
          description: 'Monitor garbage collection performance and memory management',
          data: [
            { gcThread: 'G1 Young Generation', collections: 145, totalTime: '2.3s', avgTime: '15.9ms', memoryFreed: '1.2GB' },
            { gcThread: 'G1 Old Generation', collections: 23, totalTime: '890ms', avgTime: '38.7ms', memoryFreed: '890MB' },
            { gcThread: 'G1 Concurrent Thread', collections: 67, totalTime: '1.1s', avgTime: '16.4ms', memoryFreed: '567MB' }
          ],
          chartData: [
            { time: '00:00', heapUsage: 45, gcTime: 12 },
            { time: '04:00', heapUsage: 62, gcTime: 18 },
            { time: '08:00', heapUsage: 78, gcTime: 23 },
            { time: '12:00', heapUsage: 85, gcTime: 31 },
            { time: '16:00', heapUsage: 72, gcTime: 19 },
            { time: '20:00', heapUsage: 58, gcTime: 15 }
          ]
        }

      case 'dependency-graph':
        return {
          title: 'Thread Dependency Graph',
          icon: <GitBranch className="w-6 h-6" />,
          color: 'indigo',
          description: 'Visualize thread dependencies and blocking relationships',
          data: [
            { source: 'HTTP-Handler-1', target: 'DB-Connection-Pool', type: 'WAITS_FOR', duration: '2.3s' },
            { source: 'Background-Task-1', target: 'Cache-Lock', type: 'BLOCKED_BY', duration: '890ms' },
            { source: 'GC-Thread', target: 'Application-Threads', type: 'STOPS', duration: '15ms' },
            { source: 'DB-Connection-Pool', target: 'Transaction-Manager', type: 'DEPENDS_ON', duration: '1.2s' }
          ],
          chartData: [
            { dependency: 'DB Dependencies', count: 12, avgWait: 2.3 },
            { dependency: 'Cache Dependencies', count: 8, avgWait: 0.9 },
            { dependency: 'GC Dependencies', count: 15, avgWait: 0.015 },
            { dependency: 'Lock Dependencies', count: 6, avgWait: 1.8 }
          ]
        }

      default:
        return {
          title: 'Thread Analysis',
          icon: <Activity className="w-6 h-6" />,
          color: 'gray',
          description: 'Select a specific analysis type',
          data: [],
          chartData: []
        }
    }
  }

  const config = getViewConfig(viewType)

  // Special rendering for "all-threads" view
  if (viewType === 'all-threads') {
    const config = getViewConfig(viewType)
    
    // Pagination logic
    const totalThreads = config.data.length
    const totalPages = Math.ceil(totalThreads / threadsPerPage)
    const startIndex = (currentPage - 1) * threadsPerPage
    const endIndex = startIndex + threadsPerPage
    const currentThreads = config.data.slice(startIndex, endIndex)
    
    const handlePageChange = (page: number) => {
      setIsChangingPage(true)
      setTimeout(() => {
        setCurrentPage(page)
        setIsChangingPage(false)
      }, 150)
    }
    
    const handlePrevious = () => {
      if (currentPage > 1) {
        setIsChangingPage(true)
        setTimeout(() => {
          setCurrentPage(currentPage - 1)
          setIsChangingPage(false)
        }, 150)
      }
    }
    
    const handleNext = () => {
      if (currentPage < totalPages) {
        setIsChangingPage(true)
        setTimeout(() => {
          setCurrentPage(currentPage + 1)
          setIsChangingPage(false)
        }, 150)
      }
    }
    
    const handleFirst = () => {
      setIsChangingPage(true)
      setTimeout(() => {
        setCurrentPage(1)
        setIsChangingPage(false)
      }, 150)
    }
    
    const handleLast = () => {
      setIsChangingPage(true)
      setTimeout(() => {
        setCurrentPage(totalPages)
        setIsChangingPage(false)
      }, 150)
    }
    
    // Generate page numbers for pagination
    const getPageNumbers = () => {
      const pageNumbers = []
      const maxVisiblePages = isMobile ? 3 : 5
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        const halfVisible = Math.floor(maxVisiblePages / 2)
        let startPage = Math.max(1, currentPage - halfVisible)
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
        
        if (endPage - startPage + 1 < maxVisiblePages) {
          startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i)
        }
      }
      
      return pageNumbers
    }
    return (
      <div className="space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-blue-100">
              {config.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{config.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{config.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={handleStartAnalysis}
              disabled={isAnalyzing}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Refresh Data
                </>
              )}
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* All Threads Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Thread Details</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">
                  {totalThreads} total threads
                </Badge>
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto relative">
              {isChangingPage && (
                <motion.div
                  className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center space-x-2 text-blue-600">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-medium">Loading threads...</span>
                  </div>
                </motion.div>
              )}
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Thread ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Thread Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">NID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">State</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Daemon</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Stack Trace</th>
                  </tr>
                </thead>
                <tbody>
                  {currentThreads.map((thread, index) => (
                    <motion.tr
                      key={thread.threadId}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        backgroundColor: '#f8fafc',
                        scale: 1.005,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <td className="py-3 px-4 text-sm font-mono text-blue-600">{thread.threadId}</td>
                      <td className="py-3 px-4 text-sm font-medium">{thread.threadName}</td>
                      <td className="py-3 px-4 text-sm font-mono text-gray-600">{thread.nid}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={
                            thread.state === 'RUNNABLE' ? 'default' :
                            thread.state === 'WAITING' ? 'secondary' :
                            'outline'
                          }
                          className={
                            thread.state === 'RUNNABLE' ? 'bg-green-100 text-green-800' :
                            thread.state === 'WAITING' ? 'bg-yellow-100 text-yellow-800' :
                            thread.state === 'TIMED_WAITING' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {thread.state}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-center">{thread.priority}</td>
                      <td className="py-3 px-4 text-sm text-center">
                        <Badge variant={thread.daemon ? 'secondary' : 'outline'}>
                          {thread.daemon ? 'Yes' : 'No'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm font-mono text-gray-600 max-w-xs truncate" title={thread.stackTrace}>
                        {thread.stackTrace}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4 relative">
              {isChangingPage && (
                <motion.div
                  className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center space-x-2 text-blue-600">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-medium">Loading...</span>
                  </div>
                </motion.div>
              )}
              {currentThreads.map((thread, index) => (
                <motion.div
                  key={thread.threadId}
                  className="bg-gray-50 rounded-lg p-4 space-y-3 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f1f5f9'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-blue-600 font-semibold">{thread.threadId}</span>
                    <Badge 
                      variant={
                        thread.state === 'RUNNABLE' ? 'default' :
                        thread.state === 'WAITING' ? 'secondary' :
                        'outline'
                      }
                      className={
                        thread.state === 'RUNNABLE' ? 'bg-green-100 text-green-800' :
                        thread.state === 'WAITING' ? 'bg-yellow-100 text-yellow-800' :
                        thread.state === 'TIMED_WAITING' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {thread.state}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{thread.threadName}</p>
                    <p className="text-sm text-gray-600">NID: {thread.nid}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Priority: {thread.priority}</span>
                    <Badge variant={thread.daemon ? 'secondary' : 'outline'}>
                      {thread.daemon ? 'Daemon' : 'User'}
                    </Badge>
                  </div>
                  <div className="text-xs font-mono text-gray-500 bg-white p-2 rounded border">
                    {thread.stackTrace}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Clean Interactive Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white rounded-xl border border-gray-200 shadow-lg p-6"
        >
          {/* Top Section: Thread Info & Page Size Selector */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 mb-6">
            {/* Thread Count Display */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md">
                <span className="font-semibold">
                  {startIndex + 1}-{Math.min(endIndex, totalThreads)}
                </span>
                <span className="mx-2 opacity-90">of</span>
                <span className="font-bold">{totalThreads}</span>
              </div>
              <span className="text-gray-600 font-medium">threads</span>
            </motion.div>

            {/* Page Size Selector */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-gray-600 font-medium">Show:</span>
              <div className="relative">
                <select
                  value={threadsPerPage}
                  onChange={(e) => {
                    setThreadsPerPage(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-2 pr-8 font-semibold text-gray-700 shadow-sm hover:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-blue-500 pointer-events-none" />
              </div>
              <span className="text-gray-600">per page</span>
            </motion.div>
          </div>

          {/* Main Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
              {/* First Page */}
              <motion.button
                onClick={handleFirst}
                disabled={currentPage === 1}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white shadow-md hover:bg-blue-600 hover:shadow-lg'
                }`}
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
              >
                <ChevronsLeft className="w-5 h-5" />
              </motion.button>

              {/* Previous Page */}
              <motion.button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white shadow-md hover:bg-blue-600 hover:shadow-lg'
                }`}
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Page Numbers */}
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
              {getPageNumbers().map((pageNum, index) => (
                <motion.button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`flex items-center justify-center min-w-[44px] h-[44px] rounded-lg font-semibold transition-all duration-200 ${
                    pageNum === currentPage
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-300'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -1
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {pageNum}
                </motion.button>
              ))}
            </div>

            {/* Next/Last Buttons */}
            <div className="flex items-center space-x-2">
              {/* Next Page */}
              <motion.button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white shadow-md hover:bg-blue-600 hover:shadow-lg'
                }`}
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              {/* Last Page */}
              <motion.button
                onClick={handleLast}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white shadow-md hover:bg-blue-600 hover:shadow-lg'
                }`}
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
              >
                <ChevronsRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Bottom Section: Quick Jump & Progress */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-gray-200 space-y-3 sm:space-y-0">
            {/* Quick Jump */}
            {totalPages > 5 && (
              <motion.div 
                className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-gray-600 font-medium">Jump to:</span>
                <motion.input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value)
                    if (page >= 1 && page <= totalPages) {
                      handlePageChange(page)
                    }
                  }}
                  className="w-16 px-3 py-1 text-center bg-white border border-gray-200 rounded-md font-semibold text-gray-700 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200"
                  whileFocus={{ scale: 1.02 }}
                />
                <span className="text-gray-500">of {totalPages}</span>
              </motion.div>
            )}

            {/* Progress Bar */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-sm text-gray-600 font-medium">Progress:</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentPage / totalPages) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-sm text-gray-500 font-medium">
                {Math.round((currentPage / totalPages) * 100)}%
              </span>
            </motion.div>

            {/* Keyboard Shortcuts Hint */}
            {!isMobile && (
              <motion.div 
                className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="hidden lg:inline">
                  💡 Ctrl + ← → for navigation
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-blue-100">
            {config.icon}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{config.title}</h2>
            <p className="text-gray-600 text-sm mt-1">{config.description}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Analysis
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Analysis Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Data Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Analysis Results</h3>
            <Badge variant="outline">
              {config.data.length} items found
            </Badge>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {config.data.map((item, index) => (
              <motion.div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {Object.entries(item).map(([key, value], idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                    </span>
                    <span className="text-sm text-gray-900 font-mono">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Chart Visualization */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Visualization</h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <TrendingUp className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {viewType === 'identical-stack-trace' ? (
                <BarChart data={config.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="stackTrace" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={10}
                  />
                  <YAxis 
                    label={{ value: 'Thread Count', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [value, 'Thread Count']}
                    labelFormatter={(label) => `Stack Trace: ${label}`}
                  />
                  <Bar 
                    dataKey="threadCount" 
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  >
                    {config.chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.state === 'RUNNABLE' ? '#00c49f' : 
                              entry.state === 'WAITING' ? '#8884d8' : 
                              entry.state === 'TIMED_WAITING' ? '#FFBB28' : '#FF8042'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              ) : viewType === 'most-used-methods' || viewType === 'cpu-threads' ? (
                <LineChart data={config.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey={viewType === 'most-used-methods' ? 'calls' : 'cpuUsage'} 
                    stroke="#8884d8" 
                    strokeWidth={2}
                  />
                  {viewType === 'cpu-threads' && (
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#ff7300" 
                      strokeWidth={2}
                    />
                  )}
                </LineChart>
              ) : (
                <AreaChart data={config.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey={Object.keys(config.chartData[0] || {})[1]} 
                    stackId="1" 
                    stroke="#8884d8" 
                    fill="#8884d8"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Performance Impact</p>
              <p className="text-2xl font-bold text-green-600">Good</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Analysis Time</p>
              <p className="text-2xl font-bold text-blue-600">2.3s</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Optimization Potential</p>
              <p className="text-2xl font-bold text-orange-600">Medium</p>
            </div>
            <Zap className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Consider optimizing database connection pooling
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  High similarity in database access patterns suggests opportunity for connection reuse
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-green-900">
                  Thread pool configuration is well optimized
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Current thread distribution shows good load balancing
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}