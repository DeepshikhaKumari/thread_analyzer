import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react'
import { useApi } from "../../contexts/ApiContext";
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTrigger
} from './ui/alert-dialog'
// Removed Dialog import - using AlertDialog instead
import { InteractiveFigmaCharts } from './InteractiveFigmaCharts'
import { MetricDetailsModal } from './MetricDetailsModal'
import IdenticalStackTrace from '../../imports/IdenticalStackTrace'
import Group108 from '../../imports/Group108'
import { motion, AnimatePresence } from 'motion/react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts'
import {
  Users,
  AlertTriangle,
  Cpu,
  Clock,
  Lock,
  TrendingUp,
  FileText,
  Download,
  RefreshCw,
  MessageCircle,
  Brain,
  Check,
  X,
  Activity,
  Database,
  Filter,
  ArrowUpDown,
  List,
  Layers,
  Trash2,
  MemoryStick,
  GitBranch,
  Search,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  BarChart3
} from 'lucide-react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'


interface Toast {
  id: string
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  duration?: number
}

function ToastNotification({ toast, onClose }: { toast: Toast; onClose: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id)
    }, toast.duration || 3000)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onClose])

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <Check className="w-4 h-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'error':
        return <X className="w-4 h-4 text-red-600" />
      default:
        return <FileText className="w-4 h-4 text-blue-600" />
    }
  }

  return (
    <div className={`flex items-center space-x-3 p-4 rounded-lg border shadow-lg ${getToastStyles()}`}>
      {getIcon()}
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="opacity-70 hover:opacity-100"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  description: string
  color: string
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'stable'
  onClick?: () => void
}

function MetricCard({ title, value, description, color, icon, trend, onClick }: MetricCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [buttonHovered, setButtonHovered] = useState(false)

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-500" />
    if (trend === 'down') return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
    return null
  }

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-200', glow: 'shadow-green-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:bg-orange-200', glow: 'shadow-orange-200' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-200', glow: 'shadow-blue-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-200', glow: 'shadow-purple-200' },
      red: { bg: 'bg-red-100', text: 'text-red-600', hover: 'hover:bg-red-200', glow: 'shadow-red-200' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', hover: 'hover:bg-yellow-200', glow: 'shadow-yellow-200' }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const colors = getColorClasses(color)

  // Show button if either card or button is hovered
  const showButton = isHovered || buttonHovered

  return (
    <motion.div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="cursor-pointer relative overflow-hidden transition-all duration-300 group-hover:shadow-xl"
        onClick={onClick}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />

        <div className="p-6 space-y-4 relative z-10">
          {/* Header with icon */}
          <div className="flex items-center justify-between">
            <motion.div
              className={`p-3 rounded-xl transition-all duration-300 ${colors.bg} ${colors.hover}`}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                className={`w-6 h-6 ${colors.text}`}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {icon}
              </motion.div>
            </motion.div>

            {trend && (
              <motion.div
                className="flex items-center space-x-1"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {getTrendIcon()}
                <span className="text-xs text-muted-foreground">24h</span>
              </motion.div>
            )}
          </div>

          {/* Title */}
          <motion.div
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
            {/* Click indicator */}
            {isHovered && (
              <motion.p
                className="text-xs text-emerald-600 mt-2 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Click for detailed analysis →
              </motion.p>
            )}
          </motion.div>

          {/* Value */}
          <motion.div
            className="flex items-baseline justify-between"
            animate={{
              y: isHovered ? -4 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className={`text-3xl font-bold ${colors.text}`}>
              {value}
            </span>

            {/* View More Button */}
            <div className="relative">
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className={`${colors.text} border-current transition-all duration-200 shadow-lg z-50 relative pointer-events-auto`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onClick?.()
                      }}
                      onMouseEnter={() => setButtonHovered(true)}
                      onMouseLeave={() => setButtonHovered(false)}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      View More
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Animated border glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-lg border-2 opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${colors.text.replace('text-', 'border-')}`}
          animate={{
            boxShadow: isHovered
              ? `0 0 20px ${colors.text.includes('green') ? '#10b981' :
                colors.text.includes('orange') ? '#f97316' :
                  colors.text.includes('blue') ? '#3b82f6' :
                    colors.text.includes('purple') ? '#8b5cf6' :
                      colors.text.includes('red') ? '#ef4444' : '#eab308'}40`
              : 'none'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Sparkle effects */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${15 + i * 20}%`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

interface DashboardOverviewProps {
  onMetricClick?: (metricType: string) => void
  onThreadViewClick?: (viewType: string) => void
}

// Thread Dependency Chart Component
function ThreadDependencyChart() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)

  // Sample thread dependency data - in real app this would come from thread dump analysis
  const dependencyData = [
    {
      name: 'Lock Contention',
      value: 35,
      color: '#ef4444',
      description: 'Threads waiting for locks',
      count: 42,
      avgWaitTime: '1.2s'
    },
    {
      name: 'Monitor Wait',
      value: 28,
      color: '#f97316',
      description: 'Threads waiting on monitors',
      count: 34,
      avgWaitTime: '0.8s'
    },
    {
      name: 'I/O Operations',
      value: 22,
      color: '#eab308',
      description: 'Threads blocked on I/O',
      count: 26,
      avgWaitTime: '2.1s'
    },
    {
      name: 'Resource Pool',
      value: 10,
      color: '#22c55e',
      description: 'Database connection pool waits',
      count: 12,
      avgWaitTime: '0.5s'
    },
    {
      name: 'Other Dependencies',
      value: 5,
      color: '#8b5cf6',
      description: 'Miscellaneous thread dependencies',
      count: 6,
      avgWaitTime: '0.3s'
    }
  ]

  const handlePieClick = (data: any) => {
    setSelectedSegment(selectedSegment === data.name ? null : data.name)
  }

  const handlePieHover = (data: any) => {
    setHoveredSegment(data?.name || null)
  }

  const handlePieLeave = () => {
    setHoveredSegment(null)
  }

  const selectedData = dependencyData.find(item => item.name === selectedSegment)

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pie Chart */}
        <div className="flex-1 min-h-[400px]">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dependencyData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
                onClick={handlePieClick}
                onMouseEnter={handlePieHover}
                onMouseLeave={handlePieLeave}
              >
                {dependencyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={hoveredSegment === entry.name ? '#fff' : 'transparent'}
                    strokeWidth={hoveredSegment === entry.name ? 3 : 0}
                    style={{
                      filter: hoveredSegment === entry.name ? 'brightness(1.1)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">{data.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{data.description}</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Percentage:</span>
                            <span className="font-medium">{data.value}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Thread Count:</span>
                            <span className="font-medium">{data.count}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg Wait Time:</span>
                            <span className="font-medium">{data.avgWaitTime}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend
                content={({ payload }) => (
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {payload?.map((entry, index) => (
                      <motion.div
                        key={index}
                        className={`flex items-center cursor-pointer transition-all duration-200 ${selectedSegment === entry.value ? 'scale-110' : ''
                          }`}
                        onClick={() => handlePieClick({ name: entry.value })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div
                          className="w-3 h-3 rounded-full mr-2 border-2 border-white shadow-sm"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm font-medium text-gray-700">{entry.value}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Details Panel */}
        <div className="lg:w-80 bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Dependency Analysis</h4>

          {selectedData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: selectedData.color }}
                  />
                  <h5 className="font-semibold text-gray-900">{selectedData.name}</h5>
                </div>
                <p className="text-sm text-gray-600 mb-4">{selectedData.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-2xl font-bold text-gray-900">{selectedData.value}%</div>
                    <div className="text-xs text-gray-500">Distribution</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-2xl font-bold text-gray-900">{selectedData.count}</div>
                    <div className="text-xs text-gray-500">Threads</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="text-sm text-blue-800">
                    <span className="font-medium">Average Wait Time:</span> {selectedData.avgWaitTime}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <GitBranch className="w-8 h-8 mx-auto mb-3 text-gray-400" />
              <p className="text-sm">Click on a chart segment to view detailed dependency information</p>
            </div>
          )}

          {/* Summary Stats */}
          <div className="mt-6 space-y-3">
            <h5 className="font-medium text-gray-900">Quick Stats</h5>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-white rounded border border-gray-200">
                <div className="text-lg font-bold text-gray-900">120</div>
                <div className="text-xs text-gray-500">Total Threads</div>
              </div>
              <div className="text-center p-2 bg-white rounded border border-gray-200">
                <div className="text-lg font-bold text-orange-600">85</div>
                <div className="text-xs text-gray-500">Blocked</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardOverviewComponent({ onMetricClick, onThreadViewClick }: DashboardOverviewProps = {}) {
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [selectedThreadLimit, setSelectedThreadLimit] = useState(5)
  const [stackTraceModalOpen, setStackTraceModalOpen] = useState(false)
  const [selectedThread, setSelectedThread] = useState<any>(null)
  const [metricModalOpen, setMetricModalOpen] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<string>('')
  const [showStackTraceModal, setShowStackTraceModal] = useState(false)
  const [selectedThreadForModal, setSelectedThreadForModal] = useState<any>(null)
  const [showIndividualStackTraceModal, setShowIndividualStackTraceModal] = useState(false)
  const [selectedIndividualThread, setSelectedIndividualThread] = useState<any>(null)
  const [showMethodDetailsModal, setShowMethodDetailsModal] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<any>(null)
  const [showCpuThreadModal, setShowCpuThreadModal] = useState(false)
  const [selectedCpuThread, setSelectedCpuThread] = useState<any>(null)
  const [showFinalizerModal, setShowFinalizerModal] = useState(false)
  const [selectedFinalizer, setSelectedFinalizer] = useState<any>(null)
  const [showDependencyModal, setShowDependencyModal] = useState(false)
  const [selectedDependency, setSelectedDependency] = useState<any>(null)
  const { summary: rawSummary } = useApi();
  const threads = useMemo(() => rawSummary, [rawSummary]);

  // Pagination state for CPU Thread Pool table
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // State for showing all thread pools
  const [showAllThreadPools, setShowAllThreadPools] = useState(false)

  // Refs for scrolling to thread sections
  const threadPoolsRef = useRef<HTMLDivElement>(null)
  const threadsRef = useRef<HTMLDivElement>(null)
  const identicalStackTraceRef = useRef<HTMLDivElement>(null)
  const mostUsedMethodsRef = useRef<HTMLDivElement>(null)
  const cpuThreadsRef = useRef<HTMLDivElement>(null)
  const finalizerThreadsRef = useRef<HTMLDivElement>(null)
  const gcThreadsRef = useRef<HTMLDivElement>(null)
  const dependencyGraphRef = useRef<HTMLDivElement>(null)

  // Ref for analytics section
  const analyticsRef = useRef<HTMLDivElement>(null)

  // Create stable scroll function
  const scrollToThreadView = useCallback((viewType: string) => {
    const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

    switch (viewType) {
      case 'analytics':
        scrollToRef(analyticsRef)
        break
      case 'thread-pools':
        scrollToRef(threadPoolsRef)
        break
      case 'threads':
        scrollToRef(threadsRef)
        break
      case 'all-threads':
        scrollToRef(threadsRef)
        break
      case 'identical-stack-trace':
        scrollToRef(identicalStackTraceRef)
        break
      case 'most-used-methods':
        scrollToRef(mostUsedMethodsRef)
        break
      case 'cpu-threads':
        scrollToRef(cpuThreadsRef)
        break
      case 'finalizer-threads':
        scrollToRef(finalizerThreadsRef)
        break
      case 'gc-threads':
        scrollToRef(gcThreadsRef)
        break
      case 'dependency-graph':
        scrollToRef(dependencyGraphRef)
        break
      default:
        console.log('View not found:', viewType)
    }
  }, [])

  // Expose scroll function to global window
  useEffect(() => {
    console.log('Exposing scrollToThreadView to window', threads);

    window.scrollToThreadView = scrollToThreadView
    return () => {
      delete window.scrollToThreadView
    }
  }, [scrollToThreadView])

  useEffect(() => {
    // Simulate loading with faster staged animations
    const timer = setTimeout(() => setIsLoading(false), 400)

    // Faster staggered animation steps
    const animationTimer = setInterval(() => {
      setAnimationStep(prev => prev + 1)
    }, 50)

    return () => {
      clearTimeout(timer)
      clearInterval(animationTimer)
    }
  }, [])

  const addToast = useCallback((message: string, type: Toast['type'] = 'info', duration?: number) => {
    const id = Math.random().toString(36).substring(7)
    setToasts(prev => [...prev, { id, message, type, duration }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    addToast('Refreshing analysis data...', 'info')

    // Simulate refresh with realistic delay
    setTimeout(() => {
      setRefreshing(false)
      addToast('Analysis data refreshed successfully!', 'success')
    }, 2000)
  }, [addToast])

  const handleExport = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    // Page title
    pdf.setFontSize(18);
    pdf.text("Thread Analysis Overview", 10, 15);

    // DATA (dynamic from props, API…)
    const data = {
      totalThreads: threads.totalThreads,
      runnableThreads: threads.threadStates.RUNNABLE,
      blockedThreads: threads.blockedThreads,
      deadlockThreads: threads.deadlockedThreads.length || 0,
      stuckThreads: threads.threadStates.STUCKED || 0,
      daemonNonDaemon: `${threads.totalDaemonThreads} : ${threads.totalNonDaemonThreads}`
    };
   
    // Card size
    const cardWidth = 90;
    const cardHeight = 35;

    const drawCard = (x, y, title, value, color = [0, 0, 0]) => {
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.2);
      pdf.roundedRect(x, y, cardWidth, cardHeight, 3, 3);

      pdf.setFontSize(12);
      pdf.setTextColor(60, 60, 60);
      pdf.text(title, x + 5, y + 12);

      pdf.setFontSize(20);
      pdf.setTextColor(...color);
      pdf.text(String(value), x + 5, y + 28);
    };

    // Row 1
    drawCard(10, 25, "Total Threads", data.totalThreads, [0, 0, 255]);
    drawCard(110, 25, "Runnable Threads", data.runnableThreads, [0, 128, 0]);

    // Row 2
    drawCard(10, 70, "Blocked Threads", data.blockedThreads, [255, 100, 0]);
    drawCard(110, 70, "Deadlock Threads", data.deadlockThreads, [255, 0, 0]);

    // Row 3
    drawCard(10, 115, "Stuck Threads", data.stuckThreads, [128, 0, 255]);
    drawCard(110, 115, "Daemon / Non-Daemon", data.daemonNonDaemon, [0, 0, 128]);

    // Footer Date
    pdf.setFontSize(10);
    pdf.setTextColor(120, 120, 120);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 10, 200);

    pdf.save("thread-overview.pdf");
  };
  const handleMetricClick = useCallback((metricName: string) => {
    console.log('Metric clicked:', metricName)
    setSelectedMetric(metricName)
    setMetricModalOpen(true)
    addToast(`Opening detailed analysis for ${metricName}...`, 'info')
  }, [addToast])

  const handleCloseMetricModal = useCallback(() => {
    setMetricModalOpen(false)
    setSelectedMetric('')
  }, [])

  const handleMethodClick = useCallback((method: any) => {
    setSelectedMethod(method)
    setShowMethodDetailsModal(true)
    addToast(`Opening detailed analysis for ${method.method.split('.').pop()}...`, 'info')
  }, [addToast])

  const handleCloseMethodModal = useCallback(() => {
    setShowMethodDetailsModal(false)
    setSelectedMethod(null)
  }, [])

  const handleToggleThreadPools = useCallback(() => {
    setShowAllThreadPools(prev => !prev)
    addToast(
      showAllThreadPools
        ? 'Showing top 5 thread pools'
        : 'Showing all 10 thread pools',
      'info'
    )
  }, [showAllThreadPools, addToast])

  // Thread state styling function
  const getThreadStateStyles = useCallback((state: string) => {
    switch (state) {
      case 'RUNNABLE':
        return {
          bgHover: 'hover:bg-green-50',
          borderHover: 'hover:border-l-green-500',
          textAccent: 'text-green-600',
          dotColor: 'bg-green-500',
          badgeClass: 'bg-green-100 text-green-800 border-green-200'
        }
      case 'WAITING':
        return {
          bgHover: 'hover:bg-amber-50',
          borderHover: 'hover:border-l-amber-500',
          textAccent: 'text-amber-600',
          dotColor: 'bg-amber-500',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-200'
        }
      case 'BLOCKED':
        return {
          bgHover: 'hover:bg-red-50',
          borderHover: 'hover:border-l-red-500',
          textAccent: 'text-red-600',
          dotColor: 'bg-red-500',
          badgeClass: 'bg-red-100 text-red-800 border-red-200'
        }
      case 'TIMED_WAITING':
        return {
          bgHover: 'hover:bg-blue-50',
          borderHover: 'hover:border-l-blue-500',
          textAccent: 'text-blue-600',
          dotColor: 'bg-blue-500',
          badgeClass: 'bg-blue-100 text-blue-800 border-blue-200'
        }
      default:
        return {
          bgHover: 'hover:bg-gray-50',
          borderHover: 'hover:border-l-gray-500',
          textAccent: 'text-gray-600',
          dotColor: 'bg-gray-500',
          badgeClass: 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }
  }, [])

  // Define metrics data
  const metricsData = [
    {
      title: 'Total Threads',
      value: threads?.totalThreads ?? '-',
      description: 'Currently active threads',
      color: 'blue',
      icon: <Users className="w-6 h-6" />,
      trend: 'up' as const
    },
    {
      title: 'Runnable Threads',
      value: threads?.totalRunnableThreads ?? 0,
      description: 'Threads ready to execute',
      color: 'green',
      icon: <Cpu className="w-6 h-6" />,
      trend: 'up' as const
    },
    {
      title: 'Blocked/waiting/timed-waiting Threads',
      value: (threads?.threadStates?.BLOCKED || 0) +
        (threads?.threadStates?.TIMED_WAITING || 0) +
        (threads?.threadStates?.WAITING || 0),
      description: 'Threads waiting for resources',
      color: 'orange',
      icon: <AlertTriangle className="w-6 h-6" />,
      trend: 'up' as const
    },
    {
      title: 'Deadlock Threads',
      value: threads?.deadlocks || 0,
      description: 'Critical blocking issues',
      color: 'red',
      icon: <Lock className="w-6 h-6" />,
      trend: 'up' as const
    },
    {
      title: 'Stuck Threads',
      value: threads?.threadStates?.STUCKED || 0,
      description: 'Long-running unresponsive threads',
      color: 'purple',
      icon: <Clock className="w-6 h-6" />,
      trend: 'up' as const
    },
    {
      title: 'Daemon and Non-Daemon',
      value: `${threads?.totalDaemonThreads}:${threads?.totalNonDaemonThreads}`,
      description: 'Daemon vs Non-Daemon threads',
      color: 'blue',
      icon: <Brain className="w-6 h-6" />,
      trend: 'stable' as const
    }
  ]

  // Thread Pool data for pie chart
  const threadPoolData = [
    { name: 'HTTP Worker Pool', value: 42, states: 'RUNNING: 38, WAITING: 4', color: '#3b82f6' },
    { name: 'Database Connection Pool', value: 28, states: 'RUNNING: 24, WAITING: 3, BLOCKED: 1', color: '#10b981' },
    { name: 'JVM GC Pool', value: 18, states: 'RUNNING: 16, TIMED_WAITING: 2', color: '#f59e0b' },
    { name: 'Application Pool', value: 24, states: 'RUNNING: 20, WAITING: 3, BLOCKED: 1', color: '#8b5cf6' },
    { name: 'Background Tasks Pool', value: 14, states: 'RUNNING: 10, WAITING: 4', color: '#ef4444' },
  ]

  // Table data for thread pools - Top 10 Thread Pool Details
  // const threadPoolTableData = [
  //   {
  //     rank: 1,
  //     threadPool: 'HTTP Worker Pool',
  //     count: 42,
  //     cpuUsage: 78.5,
  //     memoryUsage: 245.6,
  //     avgResponseTime: '120ms',
  //     states: {
  //       running: 38,
  //       waiting: 4,
  //       blocked: 0,
  //       timedWaiting: 0
  //     },
  //     priority: 'High',
  //     utilization: 95.2
  //   },
  //   {
  //     rank: 2,
  //     threadPool: 'Database Connection Pool',
  //     count: 28,
  //     cpuUsage: 65.3,
  //     memoryUsage: 189.2,
  //     avgResponseTime: '89ms',
  //     states: {
  //       running: 24,
  //       waiting: 3,
  //       blocked: 1,
  //       timedWaiting: 0
  //     },
  //     priority: 'High',
  //     utilization: 89.7
  //   },
  //   {
  //     rank: 3,
  //     threadPool: 'Application Pool',
  //     count: 24,
  //     cpuUsage: 55.8,
  //     memoryUsage: 167.4,
  //     avgResponseTime: '156ms',
  //     states: {
  //       running: 20,
  //       waiting: 3,
  //       blocked: 1,
  //       timedWaiting: 0
  //     },
  //     priority: 'Medium',
  //     utilization: 83.3
  //   },
  //   {
  //     rank: 4,
  //     threadPool: 'JVM GC Pool',
  //     count: 18,
  //     cpuUsage: 45.2,
  //     memoryUsage: 134.8,
  //     avgResponseTime: '45ms',
  //     states: {
  //       running: 16,
  //       waiting: 0,
  //       blocked: 0,
  //       timedWaiting: 2
  //     },
  //     priority: 'High',
  //     utilization: 88.9
  //   },
  //   {
  //     rank: 5,
  //     threadPool: 'Background Tasks Pool',
  //     count: 14,
  //     cpuUsage: 32.1,
  //     memoryUsage: 98.7,
  //     avgResponseTime: '234ms',
  //     states: {
  //       running: 10,
  //       waiting: 4,
  //       blocked: 0,
  //       timedWaiting: 0
  //     },
  //     priority: 'Low',
  //     utilization: 71.4
  //   },
  //   {
  //     rank: 6,
  //     threadPool: 'Cache Management Pool',
  //     count: 12,
  //     cpuUsage: 28.7,
  //     memoryUsage: 87.3,
  //     avgResponseTime: '67ms',
  //     states: {
  //       running: 9,
  //       waiting: 2,
  //       blocked: 1,
  //       timedWaiting: 0
  //     },
  //     priority: 'Medium',
  //     utilization: 75.0
  //   },
  //   {
  //     rank: 7,
  //     threadPool: 'I/O Operations Pool',
  //     count: 10,
  //     cpuUsage: 22.4,
  //     memoryUsage: 72.1,
  //     avgResponseTime: '298ms',
  //     states: {
  //       running: 7,
  //       waiting: 2,
  //       blocked: 0,
  //       timedWaiting: 1
  //     },
  //     priority: 'Medium',
  //     utilization: 70.0
  //   },
  //   {
  //     rank: 8,
  //     threadPool: 'Async Processing Pool',
  //     count: 8,
  //     cpuUsage: 18.9,
  //     memoryUsage: 56.8,
  //     avgResponseTime: '187ms',
  //     states: {
  //       running: 6,
  //       waiting: 1,
  //       blocked: 0,
  //       timedWaiting: 1
  //     },
  //     priority: 'Low',
  //     utilization: 75.0
  //   },
  //   {
  //     rank: 9,
  //     threadPool: 'Scheduler Pool',
  //     count: 6,
  //     cpuUsage: 15.3,
  //     memoryUsage: 41.2,
  //     avgResponseTime: '145ms',
  //     states: {
  //       running: 4,
  //       waiting: 2,
  //       blocked: 0,
  //       timedWaiting: 0
  //     },
  //     priority: 'Low',
  //     utilization: 66.7
  //   },
  //   {
  //     rank: 10,
  //     threadPool: 'Monitoring Pool',
  //     count: 4,
  //     cpuUsage: 8.1,
  //     memoryUsage: 23.4,
  //     avgResponseTime: '89ms',
  //     states: {
  //       running: 3,
  //       waiting: 1,
  //       blocked: 0,
  //       timedWaiting: 0
  //     },
  //     priority: 'Low',
  //     utilization: 75.0
  //   }
  // ]
  const parsedThreads = threads.threads; // from your parsed dump JSON

  // Utility: detect thread pool name by pattern
  function detectThreadPool(threadName) {
    if (threadName.includes("ExecuteThread")) return "HTTP Worker Pool";
    if (threadName.includes("SMPPSession") || threadName.includes("jTDS")) return "Database Connection Pool";
    if (threadName.includes("GC")) return "JVM GC Pool";
    if (threadName.includes("Async")) return "Async Processing Pool";
    if (threadName.includes("Scheduler")) return "Scheduler Pool";
    if (threadName.includes("Cache")) return "Cache Management Pool";
    if (threadName.includes("IO") || threadName.includes("I/O")) return "I/O Operations Pool";
    if (threadName.includes("Monitor")) return "Monitoring Pool";
    if (threadName.startsWith("Thread-")) return "Background Tasks Pool";
    return "Application Pool"; // fallback
  }

  // Group threads by pool
  const poolMap = {};
  for (const t of parsedThreads) {
    const pool = detectThreadPool(t.name);
    if (!poolMap[pool]) {
      poolMap[pool] = {
        threadPool: pool,
        count: 0,
        cpuUsage: 0,
        memoryUsage: 0,
        avgResponseTime: 0,
        states: { running: 0, waiting: 0, blocked: 0, timedWaiting: 0 },
        prioritySum: 0,
      };
    }

    const poolObj = poolMap[pool];
    poolObj.count++;

    // Simplify CPU/memory usage simulation (replace with actual metrics if available)
    poolObj.cpuUsage += Math.random() * 10 + 20; // mock CPU per thread
    poolObj.memoryUsage += Math.random() * 5 + 40; // mock MB usage

    // Thread state aggregation
    switch (t.state) {
      case "RUNNABLE":
        poolObj.states.running++;
        break;
      case "WAITING":
        poolObj.states.waiting++;
        break;
      case "BLOCKED":
        poolObj.states.blocked++;
        break;
      case "TIMED_WAITING":
        poolObj.states.timedWaiting++;
        break;
    }

    poolObj.prioritySum += t.priority || 5;
  }

  // Transform into array and compute derived metrics
  let rank = 1;
  const threadPoolTableData = Object.values(poolMap)
    .map((p) => {
      const avgCPU = p.cpuUsage / p.count;
      const avgMemory = p.memoryUsage / p.count;
      const utilization = ((p.states.running / p.count) * 100).toFixed(1);
      const avgPriority = p.prioritySum / p.count;

      const priority =
        avgPriority >= 8 ? "High" : avgPriority >= 5 ? "Medium" : "Low";

      return {
        rank: rank++,
        threadPool: p.threadPool,
        count: p.count,
        cpuUsage: parseFloat(avgCPU.toFixed(1)),
        memoryUsage: parseFloat(avgMemory.toFixed(1)),
        avgResponseTime: `${Math.floor(Math.random() * 200) + 50}ms`,
        states: p.states,
        priority,
        utilization: parseFloat(utilization),
      };
    })
    .sort((a, b) => b.count - a.count) // highest thread count first
    .map((p, i) => ({ ...p, rank: i + 1 }));
  // Memoized calculations to prevent expensive recalculations
  const threadPoolStats = useMemo(() => ({
    totalThreads: threadPoolTableData.reduce((sum, pool) => sum + pool.count, 0),
    avgCpuUsage: (threadPoolTableData.reduce((sum, pool) => sum + pool.cpuUsage, 0) / threadPoolTableData.length).toFixed(1),
    totalMemory: threadPoolTableData.reduce((sum, pool) => sum + pool.memoryUsage, 0).toFixed(1),
    avgUtilization: (threadPoolTableData.reduce((sum, pool) => sum + pool.utilization, 0) / threadPoolTableData.length).toFixed(1)
  }), [])

  // Memoized thread pool data calculations
  const threadPoolTotals = useMemo(() => ({
    total: threadPoolData.reduce((sum, item) => sum + item.value, 0)
  }), [])

  // Daemon vs Non-Daemon data
  const daemonData = {
    total: 126,
    daemon: 89,
    nonDaemon: 37,
    daemonTypes: [
      {
        name: 'GC Threads',
        count: 18,
        description: 'Garbage collection background processes',
        color: '#6366f1',
        examples: ['G1 Young Generation', 'G1 Old Generation', 'G1 Concurrent Thread']
      },
      {
        name: 'JVM System Threads',
        count: 12,
        description: 'Java Virtual Machine internal threads',
        color: '#8b5cf6',
        examples: ['VM Thread', 'VM Periodic Task Thread', 'GC task thread']
      },
      {
        name: 'Background Service Threads',
        count: 24,
        description: 'Application background processing threads',
        color: '#06b6d4',
        examples: ['HTTP-Thread-Pool', 'Async-Executor', 'Scheduler-Thread']
      },
      {
        name: 'I/O & Network Threads',
        count: 19,
        description: 'Input/output and network communication threads',
        color: '#10b981',
        examples: ['NIO-Acceptor', 'Socket-Reader', 'HTTP-Connector']
      },
      {
        name: 'Database Connection Threads',
        count: 16,
        description: 'Database connection pool management threads',
        color: '#f59e0b',
        examples: ['Connection-Pool-1', 'DB-Cleanup-Thread', 'Connection-Validator']
      }
    ],
    nonDaemonTypes: [
      {
        name: 'Main Application Thread',
        count: 1,
        description: 'Primary application execution thread',
        color: '#ef4444',
        examples: ['main']
      },
      {
        name: 'User Request Threads',
        count: 24,
        description: 'Threads handling user requests and business logic',
        color: '#f97316',
        examples: ['Request-Handler-1', 'Business-Logic-Thread', 'User-Session-Thread']
      },
      {
        name: 'Critical System Threads',
        count: 8,
        description: 'Essential system threads that must complete',
        color: '#84cc16',
        examples: ['Reference Handler', 'Finalizer', 'Signal Dispatcher']
      },
      {
        name: 'Custom Application Threads',
        count: 4,
        description: 'User-defined application threads',
        color: '#ec4899',
        examples: ['Custom-Worker-1', 'Data-Processor', 'Event-Handler']
      }
    ]
  }

  // Analytics data - memoized to prevent chart flickering
  const analyticsData = useMemo(() => ({
    threadStateData: [
      { name: 'RUNNABLE', value: 45, description: 'Running threads' },
      { name: 'WAITING', value: 89, description: 'Waiting for resources' },
      { name: 'BLOCKED', value: 23, description: 'Blocked threads' },
      { name: 'TIMED_WAITING', value: 67, description: 'Timed waiting' }
    ],
    performanceData: [
      { time: '00:00', cpu: 45, memory: 67 },
      { time: '00:30', cpu: 52, memory: 71 },
      { time: '01:00', cpu: 48, memory: 69 },
      { time: '01:30', cpu: 61, memory: 73 },
      { time: '02:00', cpu: 58, memory: 75 },
      { time: '02:30', cpu: 55, memory: 78 },
      { time: '03:00', cpu: 62, memory: 76 }
    ],
    topThreadsData: [
      { name: 'GC-Thread', cpuTime: 3456, state: 'RUNNABLE' },
      { name: 'HTTP-Handler', cpuTime: 2341, state: 'BLOCKED' },
      { name: 'main', cpuTime: 1234, state: 'RUNNABLE' },
      { name: 'Worker-1', cpuTime: 856, state: 'WAITING' },
      { name: 'DB-Pool', cpuTime: 456, state: 'TIMED_WAITING' }
    ],
    THREAD_STATE_COLORS: {
      'RUNNABLE': '#10b981',     // Green - running/active (success)
      'WAITING': '#f59e0b',      // Amber - waiting (warning)
      'BLOCKED': '#ef4444',      // Red - blocked (error/destructive)
      'TIMED_WAITING': '#3b82f6' // Blue - timed waiting (info)
    },
    PERFORMANCE_COLORS: {
      cpu: '#8b5cf6',    // Purple for CPU
      memory: '#06b6d4'  // Cyan for Memory
    },
    threadPerformanceData: [
      {
        state: 'Active',
        totalThreads: 87,
        percentage: 39.0,
        description: 'Actively running threads',
        color: '#10b981',
        gradient: 'from-green-400 to-emerald-600'
      },
      {
        state: 'Standby',
        totalThreads: 112,
        percentage: 50.2,
        description: 'Threads in standby/waiting state',
        color: '#f59e0b',
        gradient: 'from-amber-400 to-orange-600'
      },
      {
        state: 'Stuck',
        totalThreads: 24,
        percentage: 10.8,
        description: 'Blocked or stuck threads',
        color: '#ef4444',
        gradient: 'from-red-400 to-rose-600'
      }
    ]
  }), [])

  // Enhanced thread data with complete information
  // const allThreadsData = [
  //   {
  //     id: 'T-001',
  //     name: 'main',
  //     nid: '0x1a2b',
  //     state: 'RUNNABLE',
  //     priority: 5,
  //     daemon: false,
  //     stackTrace: 'at java.lang.Thread.sleep(Native Method)\nat com.example.MainApp.main(MainApp.java:42)',
  //     userTime: 987,
  //     blockedTime: 0,
  //     waitedTime: 123
  //   },
  //   {
  //     id: 'T-002',
  //     name: 'GC Task Thread#0 (ParallelGC)',
  //     nid: '0x1a2c',
  //     state: 'RUNNABLE',
  //     priority: 9,
  //     daemon: true,
  //     stackTrace: 'at java.lang.Thread.run(Thread.java:748)\nat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)',
  //     userTime: 2987,
  //     blockedTime: 0,
  //     waitedTime: 12
  //   },
  //   {
  //     id: 'T-003',
  //     name: 'Reference Handler',
  //     nid: '0x1a2f',
  //     state: 'WAITING',
  //     priority: 10,
  //     daemon: true,
  //     stackTrace: 'at java.lang.Object.wait(Native Method)\nat java.lang.ref.Reference.tryHandlePending(Reference.java:191)',
  //     userTime: 1876,
  //     blockedTime: 0,
  //     waitedTime: 45
  //   },
  //   {
  //     id: 'T-004',
  //     name: 'Finalizer',
  //     nid: '0x1a30',
  //     state: 'WAITING',
  //     priority: 8,
  //     daemon: true,
  //     stackTrace: 'at java.lang.Object.wait(Native Method)\nat java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:144)',
  //     userTime: 743,
  //     blockedTime: 0,
  //     waitedTime: 234
  //   },
  //   {
  //     id: 'T-005',
  //     name: 'HTTP-1.1-Processor-1',
  //     nid: '0x1a3f',
  //     state: 'RUNNABLE',
  //     priority: 5,
  //     daemon: true,
  //     stackTrace: 'at java.net.SocketInputStream.socketRead0(Native Method)\nat java.net.SocketInputStream.socketRead(SocketInputStream.java:116)',
  //     userTime: 234,
  //     blockedTime: 0,
  //     waitedTime: 567
  //   },
  //   {
  //     id: 'T-006',
  //     name: 'Database-Connection-Pool-1',
  //     nid: '0x1a40',
  //     state: 'TIMED_WAITING',
  //     priority: 7,
  //     daemon: true,
  //     stackTrace: 'at java.lang.Thread.sleep(Native Method)\nat com.example.db.ConnectionPool.getConnection(ConnectionPool.java:156)',
  //     userTime: 456,
  //     blockedTime: 15,
  //     waitedTime: 89
  //   },
  //   {
  //     id: 'T-007',
  //     name: 'HTTP-Request-Handler',
  //     nid: '0x1a41',
  //     state: 'BLOCKED',
  //     priority: 6,
  //     daemon: true,
  //     stackTrace: 'at com.example.web.RequestHandler.handleRequest(RequestHandler.java:78)\nat java.util.concurrent.FutureTask.run(FutureTask.java:266)',
  //     userTime: 1234,
  //     blockedTime: 234,
  //     waitedTime: 56
  //   },
  //   {
  //     id: 'T-008',
  //     name: 'Thread-pool-Worker-1',
  //     nid: '0x1a42',
  //     state: 'WAITING',
  //     priority: 5,
  //     daemon: true,
  //     stackTrace: 'at sun.misc.Unsafe.park(Native Method)\nat java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)',
  //     userTime: 678,
  //     blockedTime: 0,
  //     waitedTime: 345
  //   },
  //   {
  //     id: 'T-009',
  //     name: 'Async-Task-Executor-1',
  //     nid: '0x1a43',
  //     state: 'RUNNABLE',
  //     priority: 4,
  //     daemon: true,
  //     stackTrace: 'at com.example.async.AsyncTaskExecutor.execute(AsyncTaskExecutor.java:94)\nat java.lang.Thread.run(Thread.java:748)',
  //     userTime: 892,
  //     blockedTime: 0,
  //     waitedTime: 167
  //   },
  //   {
  //     id: 'T-010',
  //     name: 'Cache-Manager-Thread',
  //     nid: '0x1a44',
  //     state: 'TIMED_WAITING',
  //     priority: 3,
  //     daemon: true,
  //     stackTrace: 'at java.lang.Thread.sleep(Native Method)\nat com.example.cache.CacheManager.cleanupExpired(CacheManager.java:203)',
  //     userTime: 345,
  //     blockedTime: 0,
  //     waitedTime: 234
  //   },
  //   {
  //     id: 'T-011',
  //     name: 'Signal Dispatcher',
  //     nid: '0x1a45',
  //     state: 'RUNNABLE',
  //     priority: 9,
  //     daemon: true,
  //     stackTrace: 'Native method stack trace not available',
  //     userTime: 123,
  //     blockedTime: 0,
  //     waitedTime: 0
  //   },
  //   {
  //     id: 'T-012',
  //     name: 'Attach Listener',
  //     nid: '0x1a46',
  //     state: 'WAITING',
  //     priority: 5,
  //     daemon: true,
  //     stackTrace: 'Native method stack trace not available',
  //     userTime: 67,
  //     blockedTime: 0,
  //     waitedTime: 12
  //   },
  //   {
  //     id: 'T-013',
  //     name: 'Service Thread',
  //     nid: '0x1a47',
  //     state: 'RUNNABLE',
  //     priority: 9,
  //     daemon: true,
  //     stackTrace: 'Native method stack trace not available',
  //     userTime: 234,
  //     blockedTime: 0,
  //     waitedTime: 5
  //   },
  //   {
  //     id: 'T-014',
  //     name: 'C2 CompilerThread0',
  //     nid: '0x1a48',
  //     state: 'WAITING',
  //     priority: 9,
  //     daemon: true,
  //     stackTrace: 'at java.lang.Object.wait(Native Method)\nat java.lang.Thread.join(Thread.java:1252)',
  //     userTime: 1456,
  //     blockedTime: 0,
  //     waitedTime: 23
  //   },
  //   {
  //     id: 'T-015',
  //     name: 'VM Periodic Task Thread',
  //     nid: '0x1a49',
  //     state: 'WAITING',
  //     priority: 10,
  //     daemon: true,
  //     stackTrace: 'Native method stack trace not available',
  //     userTime: 89,
  //     blockedTime: 0,
  //     waitedTime: 1
  //   },
  //   {
  //     id: 'T-016',
  //     name: 'Scheduler-Worker-1',
  //     nid: '0x1a4a',
  //     state: 'TIMED_WAITING',
  //     priority: 5,
  //     daemon: true,
  //     stackTrace: 'at java.lang.Thread.sleep(Native Method)\nat com.example.scheduler.SchedulerWorker.run(SchedulerWorker.java:145)',
  //     userTime: 567,
  //     blockedTime: 0,
  //     waitedTime: 123
  //   },
  //   {
  //     id: 'T-017',
  //     name: 'Log4j2-AsyncLogger-1',
  //     nid: '0x1a4b',
  //     state: 'WAITING',
  //     priority: 5,
  //     daemon: true,
  //     stackTrace: 'at sun.misc.Unsafe.park(Native Method)\nat java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)',
  //     userTime: 234,
  //     blockedTime: 0,
  //     waitedTime: 456
  //   },
  //   {
  //     id: 'T-018',
  //     name: 'Session-Cleanup-Thread',
  //     nid: '0x1a4c',
  //     state: 'TIMED_WAITING',
  //     priority: 3,
  //     daemon: true,
  //     stackTrace: 'at java.lang.Thread.sleep(Native Method)\nat com.example.session.SessionCleanup.run(SessionCleanup.java:89)',
  //     userTime: 123,
  //     blockedTime: 0,
  //     waitedTime: 234
  //   },
  //   {
  //     id: 'T-019',
  //     name: 'Metrics-Reporter-Thread',
  //     nid: '0x1a4d',
  //     state: 'RUNNABLE',
  //     priority: 4,
  //     daemon: true,
  //     stackTrace: 'at com.example.metrics.MetricsReporter.report(MetricsReporter.java:67)\nat java.lang.Thread.run(Thread.java:748)',
  //     userTime: 345,
  //     blockedTime: 0,
  //     waitedTime: 78
  //   },
  //   {
  //     id: 'T-020',
  //     name: 'Health-Check-Thread',
  //     nid: '0x1a4e',
  //     state: 'RUNNABLE',
  //     priority: 6,
  //     daemon: true,
  //     stackTrace: 'at com.example.health.HealthChecker.checkHealth(HealthChecker.java:134)\nat java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)',
  //     userTime: 178,
  //     blockedTime: 0,
  //     waitedTime: 23
  //   }
  // ]
  const allThreadsData = threads.threads || [];

  // CPU Thread Pool data for table
  const cpuThreadPoolData = useMemo(() => [
    {
      name: 'GC Thread #0',
      type: 'Garbage Collection',
      cpuUsage: 85.2,
      state: 'RUNNABLE',
      stackTraces: 42,
      priority: 10,
      stackTrace: [
        'java.lang.ref.Reference$ReferenceHandler.run(Reference.java:121)',
        'java.lang.Thread.run(Thread.java:745)',
        'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)',
        'java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2039)'
      ]
    },
    {
      name: 'HTTP-Handler-Pool-1',
      type: 'HTTP Request Handler',
      cpuUsage: 78.9,
      state: 'RUNNABLE',
      stackTraces: 38,
      priority: 8,
      stackTrace: [
        'org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1434)',
        'org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)',
        'java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)',
        'java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)'
      ]
    },
    {
      name: 'Database-Pool-Worker',
      type: 'Database Connection',
      cpuUsage: 72.4,
      state: 'BLOCKED',
      stackTraces: 35,
      priority: 7,
      stackTrace: [
        'com.zaxxer.hikari.pool.HikariPool.getConnection(HikariPool.java:161)',
        'com.zaxxer.hikari.pool.HikariDataSource.getConnection(HikariDataSource.java:100)',
        'org.springframework.jdbc.datasource.DataSourceUtils.fetchConnection(DataSourceUtils.java:151)',
        'org.springframework.jdbc.core.JdbcTemplate.execute(JdbcTemplate.java:376)'
      ]
    },
    {
      name: 'Async-Task-Executor-2',
      type: 'Background Task',
      cpuUsage: 68.7,
      state: 'RUNNABLE',
      stackTraces: 31,
      priority: 6,
      stackTrace: [
        'java.util.concurrent.FutureTask.run(FutureTask.java:266)',
        'java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)',
        'java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)',
        'java.lang.Thread.run(Thread.java:745)'
      ]
    },
    {
      name: 'Cache-Operations-Thread',
      type: 'Cache Management',
      cpuUsage: 61.3,
      state: 'WAITING',
      stackTraces: 28,
      priority: 5,
      stackTrace: [
        'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)',
        'java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2039)',
        'java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)',
        'org.springframework.cache.interceptor.CacheAspectSupport.execute(CacheAspectSupport.java:345)'
      ]
    },
    {
      name: 'JIT-Compiler-Thread-1',
      type: 'JIT Compilation',
      cpuUsage: 58.9,
      state: 'RUNNABLE',
      stackTraces: 26,
      priority: 9,
      stackTrace: [
        'java.lang.Thread.run(Thread.java:745)',
        'sun.misc.Unsafe.park(Native Method)',
        'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)',
        'java.util.concurrent.ForkJoinPool.awaitWork(ForkJoinPool.java:1824)'
      ]
    },
    {
      name: 'I/O-Processor-Thread',
      type: 'I/O Operations',
      cpuUsage: 54.2,
      state: 'RUNNABLE',
      stackTraces: 24,
      priority: 6,
      stackTrace: [
        'java.net.SocketInputStream.socketRead0(Native Method)',
        'java.net.SocketInputStream.socketRead(SocketInputStream.java:116)',
        'java.net.SocketInputStream.read(SocketInputStream.java:171)',
        'java.io.BufferedInputStream.fill(BufferedInputStream.java:246)'
      ]
    },
    {
      name: 'Thread-Pool-Worker-3',
      type: 'General Worker',
      cpuUsage: 49.6,
      state: 'TIMED_WAITING',
      stackTraces: 22,
      priority: 5,
      stackTrace: [
        'java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:215)',
        'java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.awaitNanos(AbstractQueuedSynchronizer.java:2078)',
        'java.util.concurrent.LinkedBlockingQueue.poll(LinkedBlockingQueue.java:467)',
        'java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1073)'
      ]
    },
    {
      name: 'Scheduler-Thread-1',
      type: 'Task Scheduler',
      cpuUsage: 44.8,
      state: 'WAITING',
      stackTraces: 19,
      priority: 4,
      stackTrace: [
        'java.lang.Object.wait(Native Method)',
        'java.lang.Object.wait(Object.java:502)',
        'java.util.TimerThread.mainLoop(Timer.java:526)',
        'java.util.TimerThread.run(Timer.java:505)'
      ]
    },
    {
      name: 'Finalizer-Thread',
      type: 'Object Finalization',
      cpuUsage: 39.1,
      state: 'WAITING',
      stackTraces: 17,
      priority: 8,
      stackTrace: [
        'java.lang.Object.wait(Native Method)',
        'java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:143)',
        'java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:164)',
        'java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:209)'
      ]
    },
    // Additional threads for pagination
    {
      name: 'Security-Manager-Thread',
      type: 'Security Operations',
      cpuUsage: 35.8,
      state: 'RUNNABLE',
      stackTraces: 15,
      priority: 7,
      stackTrace: [
        'java.security.AccessController.doPrivileged(Native Method)',
        'java.security.ProtectionDomain.implies(ProtectionDomain.java:314)',
        'java.security.Policy$PolicyInfo.implies(Policy.java:917)',
        'sun.security.util.SecurityConstants.getProperty(SecurityConstants.java:83)'
      ]
    },
    {
      name: 'Metrics-Collector-1',
      type: 'Performance Monitoring',
      cpuUsage: 32.4,
      state: 'TIMED_WAITING',
      stackTraces: 13,
      priority: 4,
      stackTrace: [
        'java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:215)',
        'java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:1081)',
        'java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:809)',
        'io.micrometer.core.instrument.MeterRegistry.timer(MeterRegistry.java:245)'
      ]
    },
    {
      name: 'Log-Appender-Thread',
      type: 'Logging System',
      cpuUsage: 29.7,
      state: 'BLOCKED',
      stackTraces: 12,
      priority: 3,
      stackTrace: [
        'java.io.FileOutputStream.writeBytes(Native Method)',
        'java.io.FileOutputStream.write(FileOutputStream.java:326)',
        'java.io.BufferedOutputStream.flushBuffer(BufferedOutputStream.java:82)',
        'ch.qos.logback.core.FileAppender.writeOut(FileAppender.java:201)'
      ]
    },
    {
      name: 'WebSocket-Handler-2',
      type: 'WebSocket Connection',
      cpuUsage: 26.9,
      state: 'RUNNABLE',
      stackTraces: 11,
      priority: 6,
      stackTrace: [
        'java.nio.channels.SocketChannel.read(SocketChannel.java:379)',
        'org.eclipse.jetty.io.ChannelEndPoint.fill(ChannelEndPoint.java:176)',
        'org.eclipse.jetty.websocket.common.io.AbstractWebSocketConnection.fillInterested(AbstractWebSocketConnection.java:535)',
        'org.springframework.web.socket.adapter.standard.StandardWebSocketSession.sendMessage(StandardWebSocketSession.java:189)'
      ]
    },
    {
      name: 'Session-Cleanup-Worker',
      type: 'Session Management',
      cpuUsage: 24.1,
      state: 'WAITING',
      stackTraces: 9,
      priority: 3,
      stackTrace: [
        'java.lang.Object.wait(Native Method)',
        'java.util.TimerThread.mainLoop(Timer.java:552)',
        'java.util.TimerThread.run(Timer.java:505)',
        'org.apache.catalina.session.StandardManager.processExpires(StandardManager.java:683)'
      ]
    },
    {
      name: 'Connection-Pool-Manager',
      type: 'Connection Management',
      cpuUsage: 21.8,
      state: 'TIMED_WAITING',
      stackTraces: 8,
      priority: 5,
      stackTrace: [
        'java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:215)',
        'java.util.concurrent.SynchronousQueue$TransferStack.awaitFulfill(SynchronousQueue.java:460)',
        'java.util.concurrent.SynchronousQueue$TransferStack.transfer(SynchronousQueue.java:362)',
        'com.zaxxer.hikari.pool.PoolBase.newConnection(PoolBase.java:358)'
      ]
    },
    {
      name: 'Message-Queue-Consumer',
      type: 'Message Processing',
      cpuUsage: 19.5,
      state: 'BLOCKED',
      stackTraces: 7,
      priority: 6,
      stackTrace: [
        'java.util.concurrent.locks.ReentrantLock.lock(ReentrantLock.java:285)',
        'java.util.concurrent.ArrayBlockingQueue.take(ArrayBlockingQueue.java:389)',
        'org.springframework.jms.listener.DefaultMessageListenerContainer.receiveMessage(DefaultMessageListenerContainer.java:696)',
        'javax.jms.MessageConsumer.receive(MessageConsumer.java:123)'
      ]
    },
    {
      name: 'Health-Check-Monitor',
      type: 'System Monitoring',
      cpuUsage: 17.2,
      state: 'RUNNABLE',
      stackTraces: 6,
      priority: 4,
      stackTrace: [
        'java.lang.management.ManagementFactory.getRuntimeMXBean(ManagementFactory.java:252)',
        'java.lang.management.RuntimeMXBean.getUptime(RuntimeMXBean.java:87)',
        'org.springframework.boot.actuate.health.SystemHealthIndicator.doHealthCheck(SystemHealthIndicator.java:45)',
        'org.springframework.boot.actuate.endpoint.web.WebEndpointResponse.getBody(WebEndpointResponse.java:62)'
      ]
    },
    {
      name: 'Batch-Processing-Worker',
      type: 'Batch Operations',
      cpuUsage: 15.6,
      state: 'WAITING',
      stackTraces: 5,
      priority: 3,
      stackTrace: [
        'java.util.concurrent.locks.LockSupport.park(LockSupport.java:175)',
        'java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2039)',
        'java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)',
        'org.springframework.batch.core.step.tasklet.TaskletStep.doExecute(TaskletStep.java:257)'
      ]
    },
    {
      name: 'API-Rate-Limiter',
      type: 'Rate Limiting',
      cpuUsage: 13.9,
      state: 'TIMED_WAITING',
      stackTraces: 4,
      priority: 5,
      stackTrace: [
        'java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:215)',
        'java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.awaitNanos(AbstractQueuedSynchronizer.java:2078)',
        'java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take(ScheduledThreadPoolExecutor.java:1088)',
        'io.github.bucket4j.Bucket.tryConsume(Bucket.java:156)'
      ]
    },
    {
      name: 'File-Upload-Handler',
      type: 'File Operations',
      cpuUsage: 12.3,
      state: 'RUNNABLE',
      stackTraces: 4,
      priority: 6,
      stackTrace: [
        'java.io.FileInputStream.readBytes(Native Method)',
        'java.io.FileInputStream.read(FileInputStream.java:255)',
        'java.io.BufferedInputStream.read1(BufferedInputStream.java:284)',
        'org.springframework.web.multipart.commons.CommonsMultipartFile.transferTo(CommonsMultipartFile.java:96)'
      ]
    },
    {
      name: 'Template-Renderer-1',
      type: 'Template Processing',
      cpuUsage: 10.8,
      state: 'BLOCKED',
      stackTraces: 3,
      priority: 4,
      stackTrace: [
        'java.util.concurrent.locks.ReentrantReadWriteLock$ReadLock.lock(ReentrantReadWriteLock.java:727)',
        'java.util.HashMap.get(HashMap.java:615)',
        'org.thymeleaf.engine.TemplateManager.parseAndProcess(TemplateManager.java:661)',
        'org.springframework.web.servlet.view.AbstractTemplateView.renderMergedTemplateModel(AbstractTemplateView.java:181)'
      ]
    },
    {
      name: 'Email-Sender-Thread',
      type: 'Email Service',
      cpuUsage: 9.4,
      state: 'WAITING',
      stackTraces: 3,
      priority: 3,
      stackTrace: [
        'java.net.SocketInputStream.socketRead0(Native Method)',
        'java.net.SocketInputStream.socketRead(SocketInputStream.java:116)',
        'javax.mail.internet.MimeMessage.writeTo(MimeMessage.java:1745)',
        'org.springframework.mail.javamail.JavaMailSenderImpl.send(JavaMailSenderImpl.java:362)'
      ]
    },
    {
      name: 'JWT-Token-Processor',
      type: 'Authentication',
      cpuUsage: 8.1,
      state: 'RUNNABLE',
      stackTraces: 2,
      priority: 7,
      stackTrace: [
        'java.security.MessageDigest.digest(MessageDigest.java:392)',
        'javax.crypto.Mac.doFinal(Mac.java:654)',
        'io.jsonwebtoken.impl.crypto.MacProvider.generateKey(MacProvider.java:89)',
        'org.springframework.security.oauth2.jwt.NimbusJwtDecoder.decode(NimbusJwtDecoder.java:119)'
      ]
    }
  ], [])

  // Thread analysis data - memoized to prevent chart flickering
  const threadAnalysisData = useMemo(() => ({
    threads: {
      title: 'Thread Details',
      description: 'Interactive thread analysis with filtering and sorting capabilities',
      threads: allThreadsData.slice(0, 5) // Show only first 5 by default
    },

    'identical-stack-trace': {
      title: 'Identical Stack Trace Analysis',
      description: 'Find threads with similar execution patterns and stack traces',
      icon: <Layers className="w-6 h-6" />,
      color: 'blue',
      data: [
        { pattern: 'Database Connection Pattern', count: 15, threads: ['DB-Worker-1', 'DB-Worker-2', 'DB-Worker-3'], similarity: 98 },
        { pattern: 'HTTP Request Handler Pattern', count: 12, threads: ['HTTP-Handler-1', 'HTTP-Handler-2'], similarity: 95 },
        { pattern: 'Background Task Pattern', count: 8, threads: ['BG-Task-1', 'BG-Task-2'], similarity: 92 },
        { pattern: 'Cache Operations Pattern', count: 6, threads: ['Cache-Worker-1', 'Cache-Worker-2'], similarity: 89 }
      ],
      chartData: [
        { name: 'DB Pattern', value: 15, percentage: 41.7 },
        { name: 'HTTP Pattern', value: 12, percentage: 33.3 },
        { name: 'BG Pattern', value: 8, percentage: 22.2 },
        { name: 'Cache Pattern', value: 6, percentage: 16.7 }
      ],
      stackTraceGroupData: [
        { group: 'Database Pool', threadCount: 28, identicalStackTraces: 15 },
        { group: 'HTTP Workers', threadCount: 24, identicalStackTraces: 12 },
        { group: 'Background Tasks', threadCount: 16, identicalStackTraces: 8 },
        { group: 'Cache Operations', threadCount: 12, identicalStackTraces: 6 },
        { group: 'GC Threads', threadCount: 18, identicalStackTraces: 14 },
        { group: 'I/O Processors', threadCount: 10, identicalStackTraces: 4 }
      ],
      stackTraceChartData: [
        { name: 'Stacktrace1', value: 58, description: 'Database & HTTP processing threads' },
        { name: 'Stacktrace2', value: 35, description: 'Background task & cache operations' },
        { name: 'Stacktrace3', value: 22, description: 'GC & I/O processing threads' }
      ]
    },
    'most-used-methods': {
      title: 'Most Used Methods Analysis',
      description: 'Analyze frequently executed methods across all threads',
      icon: <Activity className="w-6 h-6" />,
      color: 'green',
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
    },
    'cpu-threads': {
      title: 'CPU Intensive Threads Analysis',
      description: 'Monitor and analyze CPU-intensive thread behavior',
      icon: <Cpu className="w-6 h-6" />,
      color: 'orange',
      data: [
        {
          thread: 'GC Thread#0',
          cpuUsage: 31.5,
          coreAffinity: 'Core 0-1',
          priority: 10,
          state: 'RUNNABLE',
          id: 'gc-thread-0',
          description: 'Primary garbage collection thread responsible for memory cleanup and heap management',
          uptime: '2h 34m 12s',
          memoryUsage: '145.3 MB',
          waitTime: '0ms',
          blockedTime: '23ms',
          stackTrace: [
            'java.lang.Thread.run(Thread.java:834)',
            'java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)',
            'java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)',
            'java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:155)',
            'java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:209)',
            'sun.misc.GC.runFinalization(Native Method)',
            'java.lang.System.runFinalization(System.java:355)'
          ]
        },
        {
          thread: 'HTTP-Request-Handler-1',
          cpuUsage: 18.2,
          coreAffinity: 'Core 2-3',
          priority: 5,
          state: 'RUNNABLE',
          id: 'http-handler-1',
          description: 'High-performance HTTP request processing thread handling incoming web requests',
          uptime: '1h 56m 8s',
          memoryUsage: '89.7 MB',
          waitTime: '12ms',
          blockedTime: '5ms',
          stackTrace: [
            'java.lang.Thread.run(Thread.java:834)',
            'org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.run(NioEndpoint.java:1520)',
            'org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:374)',
            'org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1040)',
            'org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:134)',
            'com.example.controller.ApiController.processRequest(ApiController.java:89)',
            'com.example.service.RequestService.handleRequest(RequestService.java:156)'
          ]
        },
        {
          thread: 'Database-Query-Processor',
          cpuUsage: 15.7,
          coreAffinity: 'Core 4-5',
          priority: 7,
          state: 'RUNNABLE',
          id: 'db-query-processor',
          description: 'Dedicated database query processing thread for complex SQL operations and data retrieval',
          uptime: '3h 21m 45s',
          memoryUsage: '234.1 MB',
          waitTime: '45ms',
          blockedTime: '67ms',
          stackTrace: [
            'java.lang.Thread.run(Thread.java:834)',
            'java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)',
            'com.mysql.cj.jdbc.StatementImpl.executeQuery(StatementImpl.java:1201)',
            'org.hibernate.engine.jdbc.internal.ResultSetReturnImpl.extract(ResultSetReturnImpl.java:70)',
            'org.hibernate.loader.Loader.getResultSet(Loader.java:2065)',
            'com.example.dao.UserRepository.findComplexQuery(UserRepository.java:234)',
            'com.example.service.AnalyticsService.processUserData(AnalyticsService.java:178)'
          ]
        },
        {
          thread: 'Background-Batch-Processor',
          cpuUsage: 12.3,
          coreAffinity: 'Core 6-7',
          priority: 3,
          state: 'RUNNABLE',
          id: 'batch-processor',
          description: 'Background batch processing thread for scheduled tasks and data aggregation operations',
          uptime: '4h 12m 33s',
          memoryUsage: '67.8 MB',
          waitTime: '189ms',
          blockedTime: '34ms',
          stackTrace: [
            'java.lang.Thread.run(Thread.java:834)',
            'java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:295)',
            'java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)',
            'com.example.batch.BatchProcessor.processQueue(BatchProcessor.java:145)',
            'com.example.batch.DataAggregator.aggregateMetrics(DataAggregator.java:89)',
            'com.example.service.MetricsCalculationService.calculate(MetricsCalculationService.java:203)',
            'com.example.util.MathUtils.computeComplexStatistics(MathUtils.java:456)'
          ]
        }
      ],
      chartData: [
        { time: '00:00', cpuUsage: 45, temperature: 62 },
        { time: '04:00', cpuUsage: 52, temperature: 65 },
        { time: '08:00', cpuUsage: 78, temperature: 71 },
        { time: '12:00', cpuUsage: 85, temperature: 74 },
        { time: '16:00', cpuUsage: 82, temperature: 73 },
        { time: '20:00', cpuUsage: 67, temperature: 68 }
      ]
    },
    'finalizer-threads': {
      title: 'Finalizer Threads Analysis',
      description: 'Track object finalization processes and cleanup operations',
      icon: <Trash2 className="w-6 h-6" />,
      color: 'red',
      data: [
        {
          finalizer: 'Finalizer Thread',
          objectsFinalized: 1247,
          avgTime: '2.3ms',
          queueSize: 45,
          state: 'ACTIVE',
          description: 'Primary thread responsible for object finalization and garbage collection cleanup'
        },
        {
          finalizer: 'Reference Handler',
          referencesProcessed: 892,
          avgTime: '0.8ms',
          queueSize: 12,
          state: 'ACTIVE',
          description: 'Handles weak, soft, and phantom reference cleanup operations'
        },
        {
          finalizer: 'Cleaner Thread',
          cleanupTasks: 234,
          avgTime: '5.1ms',
          queueSize: 8,
          state: 'WAITING',
          description: 'Manages direct memory cleanup and off-heap resource deallocation'
        }
      ],
      chartData: [
        { time: '00:00', finalized: 89, queue: 23 },
        { time: '04:00', finalized: 156, queue: 34 },
        { time: '08:00', finalized: 234, queue: 45 },
        { time: '12:00', finalized: 345, queue: 52 },
        { time: '16:00', finalized: 278, queue: 41 },
        { time: '20:00', finalized: 198, queue: 32 }
      ]
    },
    'gc-threads': {
      title: 'Garbage Collection Threads Analysis',
      description: 'Monitor garbage collection performance and memory management',
      icon: <MemoryStick className="w-6 h-6" />,
      color: 'purple',
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
    },
    'dependency-graph': {
      title: 'Thread Dependency Graph',
      description: 'Visualize thread dependencies and blocking relationships',
      icon: <GitBranch className="w-6 h-6" />,
      color: 'indigo',
      data: [
        {
          source: 'Thread-25',
          target: 'Thread-31',
          type: 'WAITS_FOR',
          duration: '2.3s',
          lockType: 'ReentrantLock',
          description: 'HTTP request processing thread waiting for database connection lock',
          stackTrace: [
            'java.util.concurrent.locks.ReentrantLock$Sync.parkAndCheckInterrupt(ReentrantLock.java:836)',
            'java.util.concurrent.locks.ReentrantLock$Sync.acquireQueued(ReentrantLock.java:870)',
            'com.weblogic.servlet.internal.WebAppServletContext.execute(WebAppServletContext.java:2473)',
            'weblogic.servlet.internal.ServletRequestImpl.run(ServletRequestImpl.java:1487)'
          ],
          dependencyChain: ['Thread-25', 'Thread-31', 'Thread-40']
        },
        {
          source: 'Thread-31',
          target: 'Thread-40',
          type: 'BLOCKED_BY',
          duration: '890ms',
          lockType: 'synchronized',
          description: 'Database connection thread blocked by transaction manager thread',
          stackTrace: [
            'java.lang.Object.wait(Native Method)',
            'com.oracle.jdbc.driver.OracleConnection.commit(OracleConnection.java:1897)',
            'weblogic.jdbc.wrapper.PoolConnection.commit(PoolConnection.java:178)',
            'com.example.service.DatabaseService.executeTransaction(DatabaseService.java:156)'
          ],
          dependencyChain: ['Thread-31', 'Thread-40']
        },
        {
          source: 'Thread-40',
          target: 'Thread-12',
          type: 'WAITS_FOR',
          duration: '1.2s',
          lockType: 'ReentrantReadWriteLock',
          description: 'Transaction manager waiting for cache lock held by background thread',
          stackTrace: [
            'java.util.concurrent.locks.ReentrantReadWriteLock$WriteLock.lock(ReentrantReadWriteLock.java:943)',
            'com.example.cache.CacheManager.updateCache(CacheManager.java:234)',
            'com.example.transaction.TransactionManager.commit(TransactionManager.java:89)',
            'weblogic.transaction.internal.TransactionImpl.commit(TransactionImpl.java:456)'
          ],
          dependencyChain: ['Thread-40', 'Thread-12']
        },
        {
          source: 'Thread-12',
          target: 'Thread-5',
          type: 'DEPENDS_ON',
          duration: '450ms',
          lockType: 'synchronized',
          description: 'Background cache thread depends on JMS message processor thread',
          stackTrace: [
            'java.lang.Object.wait(Native Method)',
            'weblogic.jms.client.JMSSession.receive(JMSSession.java:678)',
            'com.example.messaging.MessageProcessor.processMessage(MessageProcessor.java:112)',
            'com.example.cache.BackgroundCacheUpdater.run(BackgroundCacheUpdater.java:67)'
          ],
          dependencyChain: ['Thread-12', 'Thread-5']
        }
      ],
      chartData: [
        { dependency: 'DB Dependencies', count: 12, avgWait: 2.3 },
        { dependency: 'Cache Dependencies', count: 8, avgWait: 0.9 },
        { dependency: 'GC Dependencies', count: 15, avgWait: 0.015 },
        { dependency: 'Lock Dependencies', count: 6, avgWait: 1.8 }
      ]
    }
  }), [])

  // Helper functions for analytics
  const getThreadStateColor = (state: string) => {
    return analyticsData.THREAD_STATE_COLORS[state as keyof typeof analyticsData.THREAD_STATE_COLORS] || '#6b7280'
  }

  const renderPieTooltip = (active: any, payload: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">{data.payload.description}</p>
          <p className="text-sm font-semibold" style={{ color: data.color }}>
            {data.value} threads ({((data.value / analyticsData.threadStateData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)
          </p>
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex justify-between items-start animate-pulse">
          <div className="space-y-3">
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-80 animate-shimmer"></div>
            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-60 animate-shimmer"></div>
          </div>
          <div className="space-x-3 flex">
            <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 animate-shimmer"></div>
            <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-36 animate-shimmer"></div>
          </div>
        </div>

        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="animate-pulse"
            >
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-shimmer"></div>
                    <div className="h-4 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 animate-shimmer"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 animate-shimmer"></div>
                  </div>
                  <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 animate-shimmer"></div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Chart Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="animate-pulse"
        >
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 animate-shimmer"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-64 animate-shimmer"></div>
              </div>
              <div className="h-80 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-shimmer"></div>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div id="overview-section" className="space-y-8 scroll-mt-8">
      {/* Toast Notifications */}
      <AnimatePresence>
        {toasts.length > 0 && (
          <motion.div
            className="fixed top-4 right-4 space-y-2 z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            {toasts.map((toast) => (
              <ToastNotification
                key={toast.id}
                toast={toast}
                onClose={removeToast}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metric Details Modal */}
      <AnimatePresence>
        {metricModalOpen && (
          <MetricDetailsModal
            isOpen={metricModalOpen}
            onClose={handleCloseMetricModal}
            metricTitle={selectedMetric}
            threads={threads}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Thread Analysis Overview</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into your application's thread behavior</p>
        </div>

        <div className="flex space-x-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleExport} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Metric Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {metricsData.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <MetricCard
              title={metric.title}
              value={metric.value}
              description={metric.description}
              color={metric.color}
              icon={metric.icon}
              trend={metric.trend}
              onClick={() => handleMetricClick(metric.title)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <InteractiveFigmaCharts threads={threads} />
      </motion.div>

      {/* Enhanced Thread Pools Analysis Section */}
      <motion.div
        ref={threadPoolsRef}
        id="thread-pools-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="scroll-mt-8"
      >
        <Card className="p-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start space-x-6 mb-8">
            <motion.div
              className="p-4 bg-emerald-500 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Layers className="w-8 h-8 text-white" />
            </motion.div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                🧵 Thread Pools Analysis
              </h3>
              <p className="text-emerald-800 leading-relaxed">
                Discover thread pool patterns and performance bottlenecks with real-time analysis
              </p>

              {/* Status indicators */}
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-emerald-700 font-medium">Live Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-3 h-3 text-emerald-600" />
                  <span className="text-xs text-emerald-700 font-medium">High Performance</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-4xl font-bold text-emerald-600 transition-colors duration-300">
                {threadPoolData.length}
              </div>
              <div className="text-sm text-emerald-700 font-medium">Active Pools</div>
            </div>
          </div>

          {/* Reorganized layout with proper spacing and centering */}
          <div className="space-y-8">
            {/* Thread Pool Distribution Section - Centered */}
            <div className="flex justify-center">
              <Card className="p-8 max-w-4xl w-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-emerald-50/30">
                <h4 className="text-xl font-semibold mb-8 flex items-center justify-center space-x-3">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg"></div>
                  <span className="text-emerald-900">Thread Pool Distribution</span>
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Chart Section */}
                  <div className="flex flex-col items-center">
                    {/* Total Threads Display */}
                    <div className="text-center mb-8">
                      <div className="text-5xl font-bold text-emerald-600 mb-2">
                        {threadPoolTotals.total}
                      </div>
                      <div className="text-base text-gray-600 font-medium">Total Threads</div>
                      <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mx-auto mt-3"></div>
                    </div>

                    {/* Enhanced Pie Chart */}
                    <div className="relative">
                      <div className="relative w-72 h-72 drop-shadow-lg">
                        {/* SVG Pie Chart */}
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                          <defs>
                            <linearGradient id="httpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#60a5fa" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                            <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#34d399" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                            <linearGradient id="gcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#fbbf24" />
                              <stop offset="100%" stopColor="#f59e0b" />
                            </linearGradient>
                            <linearGradient id="appGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#a78bfa" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#fb7185" />
                              <stop offset="100%" stopColor="#ef4444" />
                            </linearGradient>
                          </defs>

                          {/* Background circle */}
                          <circle cx="100" cy="100" r="80" fill="none" stroke="#f3f4f6" strokeWidth="3" />

                          {/* Pie segments */}
                          {(() => {
                            const total = threadPoolTotals.total
                            let currentAngle = 0
                            const gradients = ['url(#httpGrad)', 'url(#dbGrad)', 'url(#gcGrad)', 'url(#appGrad)', 'url(#bgGrad)']

                            return threadPoolData.map((item, index) => {
                              const percentage = item.value / total
                              const angle = percentage * 360
                              const startAngle = currentAngle
                              const endAngle = currentAngle + angle

                              // Convert to radians
                              const startAngleRad = (startAngle - 90) * (Math.PI / 180)
                              const endAngleRad = (endAngle - 90) * (Math.PI / 180)

                              // Calculate coordinates
                              const largeArcFlag = angle > 180 ? 1 : 0
                              const x1 = 100 + 70 * Math.cos(startAngleRad)
                              const y1 = 100 + 70 * Math.sin(startAngleRad)
                              const x2 = 100 + 70 * Math.cos(endAngleRad)
                              const y2 = 100 + 70 * Math.sin(endAngleRad)

                              const pathData = [
                                `M 100 100`,
                                `L ${x1} ${y1}`,
                                `A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                `Z`
                              ].join(' ')

                              currentAngle += angle

                              return (
                                <g key={index}>
                                  <path
                                    d={pathData}
                                    fill={gradients[index]}
                                    stroke="white"
                                    strokeWidth="3"
                                    className="hover:opacity-90 transition-all duration-300 cursor-pointer hover:scale-105"
                                    style={{ transformOrigin: '100px 100px' }}
                                  />
                                  {/* Percentage labels */}
                                  {percentage > 0.05 && (() => {
                                    const labelAngle = (startAngle + angle / 2 - 90) * (Math.PI / 180)
                                    const labelX = 100 + 85 * Math.cos(labelAngle)
                                    const labelY = 100 + 85 * Math.sin(labelAngle)

                                    return (
                                      <text
                                        x={labelX}
                                        y={labelY}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="#374151"
                                        fontSize="13"
                                        fontWeight="700"
                                        className="pointer-events-none drop-shadow-sm"
                                      >
                                        {(percentage * 100).toFixed(1)}%
                                      </text>
                                    )
                                  })()}
                                </g>
                              )
                            })
                          })()}

                          {/* Enhanced center hole with glow effect */}
                          <circle cx="100" cy="100" r="32" fill="white" stroke="#e5e7eb" strokeWidth="3" />
                          <circle cx="100" cy="100" r="25" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" opacity="0.7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Legend Section */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-gray-800 mb-6">Pool Breakdown</h5>
                    {threadPoolData.map((entry, index) => {
                      const percentage = ((entry.value / threadPoolData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 }}
                          className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className="w-5 h-5 rounded-full shadow-lg border-2 border-white"
                              style={{ backgroundColor: entry.color }}
                            ></div>
                            <div>
                              <span className="text-sm font-semibold text-gray-800 block">
                                {entry.name}
                              </span>
                              <span className="text-xs text-gray-500">{entry.value} threads</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-emerald-600">
                              {percentage}%
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </Card>
            </div>

            {/* Thread Pool Details Section - Centered and Below */}
            <div className="flex justify-center">
              <Card className="p-8 max-w-4xl w-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-teal-50/30">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xl font-semibold flex items-center space-x-3">
                    <div className="w-4 h-4 bg-teal-500 rounded-full shadow-lg"></div>
                    <span className="text-teal-900">Thread Pool Details</span>
                  </h4>
                  <div className="flex items-center space-x-3 bg-teal-50 px-4 py-2 rounded-full border-2 border-teal-200">
                    <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-teal-700 font-semibold">
                      Showing {showAllThreadPools ? threadPoolTableData.length : Math.min(5, threadPoolTableData.length)} of {threadPoolTableData.length}
                    </span>
                  </div>
                </div>

                {/* Enhanced container with 3.5 rows view */}
                <div className="space-y-4 h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2">
                  <AnimatePresence mode="wait">
                    {threadPoolTableData
                      .slice(0, showAllThreadPools ? threadPoolTableData.length : 5)
                      .map((pool, index) => (
                        <motion.div
                          key={`${pool.rank}-${showAllThreadPools}`}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{
                            delay: index * 0.05,
                            duration: 0.4,
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className={`w-4 h-4 rounded-full shadow-lg ${index === 0 ? 'bg-blue-500' :
                                index === 1 ? 'bg-green-500' :
                                  index === 2 ? 'bg-yellow-500' :
                                    index === 3 ? 'bg-purple-500' : 'bg-red-500'
                                }`}></div>
                              <h5 className="font-bold text-gray-900">{pool.threadPool}</h5>
                            </div>
                            <Badge variant="outline" className="text-sm font-semibold border-2">
                              {pool.count} threads
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mb-4">
                            {pool.states.running > 0 && (
                              <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-700 font-medium">RUNNING: {pool.states.running}</span>
                              </div>
                            )}
                            {pool.states.waiting > 0 && (
                              <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm text-gray-700 font-medium">WAITING: {pool.states.waiting}</span>
                              </div>
                            )}
                            {pool.states.blocked > 0 && (
                              <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-sm text-gray-700 font-medium">BLOCKED: {pool.states.blocked}</span>
                              </div>
                            )}
                            {pool.states.timedWaiting > 0 && (
                              <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-gray-700 font-medium">TIMED_WAITING: {pool.states.timedWaiting}</span>
                              </div>
                            )}
                          </div>

                          {/* Enhanced progress bar showing health */}
                          <div className="mt-4">
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                              <span className="font-medium">Pool Health</span>
                              <span className="font-bold text-emerald-600">{Math.round((pool.states.running / pool.count) * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                              <div
                                className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                                style={{ width: `${(pool.states.running / pool.count) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>

                {/* Enhanced toggle button */}
                <div className="mt-8 pt-6 border-t-2 border-gray-200">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full text-teal-600 border-2 border-teal-200 hover:bg-teal-50 hover:border-teal-300 transition-all duration-300 font-semibold"
                    onClick={handleToggleThreadPools}
                  >
                    <motion.div
                      className="flex items-center justify-center space-x-3"
                      whileTap={{ scale: 0.95 }}
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span>
                        {showAllThreadPools ? 'Show fewer pools' : 'Show all thread pools'}
                      </span>
                      <motion.div
                        animate={{ rotate: showAllThreadPools ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </motion.div>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Top 10 Thread Pool Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
        className="scroll-mt-8"
      >
        <Card className="p-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start space-x-6 mb-8">
            <motion.div
              className="p-4 bg-emerald-500 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <BarChart3 className="w-8 h-8 text-white" />
            </motion.div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                🏆 Top 10 Thread Pool Details
              </h3>
              <p className="text-emerald-800 leading-relaxed">
                Comprehensive performance metrics and resource utilization analysis for the most active thread pools
              </p>

              {/* Status indicators */}
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-emerald-700 font-medium">Live Data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-3 h-3 text-emerald-600" />
                  <span className="text-xs text-emerald-700 font-medium">High Performance</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-4xl font-bold text-emerald-600 transition-colors duration-300">
                {threadPoolTableData.length}
              </div>
              <div className="text-sm text-emerald-700 font-medium">Top Pools</div>
            </div>
          </div>

          <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-semibold flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span>Performance Metrics Overview</span>
                </h4>
                <p className="text-sm text-gray-600 mt-1 flex items-center space-x-2">
                  <BarChart3 className="w-3 h-3 text-emerald-500" />
                  <span>Comprehensive performance metrics and resource utilization</span>
                </p>
              </div>

              {/* Performance indicator */}
              <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-2 rounded-full border border-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-700 font-medium">LIVE DATA</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[60px]">Rank</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[200px]">Thread Pool Name</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[80px]">Count</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[100px]">CPU Usage</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[100px]">Memory (MB)</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[120px]">Avg Response</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[100px]">Utilization</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[80px]">Priority</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[140px]">Thread States</th>
                  </tr>
                </thead>
                <tbody>
                  {threadPoolTableData.map((pool, index) => {
                    const utilStyle = pool.utilization > 90 ? 'text-red-600' : pool.utilization > 75 ? 'text-yellow-600' : 'text-green-600'
                    const cpuStyle = pool.cpuUsage > 70 ? 'text-red-600' : pool.cpuUsage > 50 ? 'text-yellow-600' : 'text-green-600'
                    const priorityStyle = pool.priority === 'High' ? 'bg-red-100 text-red-800' : pool.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'

                    return (
                      <motion.tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-emerald-50/50 transition-colors duration-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.3 }}
                      >
                        {/* Rank */}
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm
                              ${pool.rank <= 3 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                                pool.rank <= 6 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                                  'bg-gradient-to-r from-gray-500 to-gray-600'}
                            `}>
                              {pool.rank}
                            </div>
                          </div>
                        </td>

                        {/* Thread Pool Name */}
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <div>
                              <div className="font-medium text-gray-900">{pool.threadPool}</div>
                              <div className="text-xs text-gray-500">Pool ID: TP-{pool.rank.toString().padStart(3, '0')}</div>
                            </div>
                          </div>
                        </td>

                        {/* Count */}
                        <td className="py-4 px-4">
                          <div className="text-center">
                            <div className="font-bold text-emerald-600 text-lg">{pool.count}</div>
                            <div className="text-xs text-gray-500">threads</div>
                          </div>
                        </td>

                        {/* CPU Usage */}
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1">
                              <div className={`font-semibold ${cpuStyle}`}>{pool.cpuUsage}%</div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                  className={`h-2 rounded-full ${pool.cpuUsage > 70 ? 'bg-red-500' : pool.cpuUsage > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                  style={{ width: `${pool.cpuUsage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Memory Usage */}
                        <td className="py-4 px-4">
                          <div className="text-center">
                            <div className="font-semibold text-blue-600">{pool.memoryUsage}</div>
                            <div className="text-xs text-gray-500">MB</div>
                          </div>
                        </td>

                        {/* Average Response Time */}
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="font-medium text-gray-700">{pool.avgResponseTime}</span>
                          </div>
                        </td>

                        {/* Utilization */}
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1">
                              <div className={`font-semibold ${utilStyle}`}>{pool.utilization}%</div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                  className={`h-2 rounded-full ${pool.utilization > 90 ? 'bg-red-500' : pool.utilization > 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                  style={{ width: `${pool.utilization}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Priority */}
                        <td className="py-4 px-4">
                          <Badge className={`${priorityStyle} border-0 font-medium`}>
                            {pool.priority}
                          </Badge>
                        </td>

                        {/* Thread States */}
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-xs">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-green-700 font-medium">Running: {pool.states.running}</span>
                            </div>
                            {pool.states.waiting > 0 && (
                              <div className="flex items-center space-x-2 text-xs">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-yellow-700 font-medium">Waiting: {pool.states.waiting}</span>
                              </div>
                            )}
                            {pool.states.blocked > 0 && (
                              <div className="flex items-center space-x-2 text-xs">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-red-700 font-medium">Blocked: {pool.states.blocked}</span>
                              </div>
                            )}
                            {pool.states.timedWaiting > 0 && (
                              <div className="flex items-center space-x-2 text-xs">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-blue-700 font-medium">Timed: {pool.states.timedWaiting}</span>
                              </div>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>


          </Card>
        </Card>
      </motion.div>

      {/* Daemon vs Non-Daemon Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="scroll-mt-8"
      >
        <Card className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500">

          <div>
            <div className="flex items-start space-x-6 mb-8">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-indigo-900 mb-2">Daemon vs Non-Daemon Threads</h3>
                <p className="text-indigo-800 leading-relaxed">Understanding thread behavior: daemon threads run in background and don't prevent JVM shutdown, while non-daemon threads must complete before JVM exits</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-indigo-600">{daemonData.total}</div>
                <div className="text-sm text-indigo-700">Total Threads</div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              {/* Main Comparison Chart */}
              <div className="xl:col-span-1">
                <Card className="p-6 h-full bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <span>Thread Distribution</span>
                  </h4>

                  {/* Donut Chart with Center Info */}
                  <div className="relative flex justify-center mb-8">
                    <div className="relative w-56 h-56">
                      <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                        <defs>
                          <linearGradient id="daemonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                          <linearGradient id="nonDaemonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#f97316" />
                          </linearGradient>
                        </defs>

                        {/* Background circle */}
                        <circle cx="100" cy="100" r="85" fill="none" stroke="#f3f4f6" strokeWidth="8" />

                        {/* Daemon segment (70.6%) */}
                        <circle
                          cx="100"
                          cy="100"
                          r="85"
                          fill="none"
                          stroke="url(#daemonGradient)"
                          strokeWidth="16"
                          strokeDasharray={`${(daemonData.daemon / daemonData.total) * 534.07} 534.07`}
                          strokeLinecap="round"
                        />

                        {/* Non-daemon segment (29.4%) */}
                        <circle
                          cx="100"
                          cy="100"
                          r="85"
                          fill="none"
                          stroke="url(#nonDaemonGradient)"
                          strokeWidth="16"
                          strokeDasharray={`${(daemonData.nonDaemon / daemonData.total) * 534.07} 534.07`}
                          strokeDashoffset={`-${(daemonData.daemon / daemonData.total) * 534.07}`}
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* Center Information */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-3xl font-bold text-indigo-600">{Math.round((daemonData.daemon / daemonData.total) * 100)}%</div>
                        <div className="text-sm text-gray-600">Daemon</div>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="space-y-3">
                    <motion.div
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                        <span className="font-medium text-indigo-800">Daemon Threads</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-indigo-600">{daemonData.daemon}</div>
                        <div className="text-xs text-indigo-500">{Math.round((daemonData.daemon / daemonData.total) * 100)}%</div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
                        <span className="font-medium text-orange-800">Non-Daemon Threads</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-orange-600">{daemonData.nonDaemon}</div>
                        <div className="text-xs text-orange-500">{Math.round((daemonData.nonDaemon / daemonData.total) * 100)}%</div>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </div>

              {/* Daemon Thread Types */}
              <div className="xl:col-span-1">
                <Card className="p-6 h-full bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <span>Daemon Thread Types</span>
                  </h4>

                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {daemonData.daemonTypes.map((type, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="p-4 bg-white rounded-lg border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: type.color }}
                            ></div>
                            <h5 className="font-semibold text-gray-900 text-sm">{type.name}</h5>
                          </div>
                          <span className="font-bold text-indigo-600">{type.count}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{type.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {type.examples.slice(0, 2).map((example, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {example}
                            </span>
                          ))}
                          {type.examples.length > 2 && (
                            <span className="text-xs text-gray-500">+{type.examples.length - 2} more</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Non-Daemon Thread Types */}
              <div className="xl:col-span-1">
                <Card className="p-6 h-full bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Non-Daemon Thread Types</span>
                  </h4>

                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {daemonData.nonDaemonTypes.map((type, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.7 }}
                        whileHover={{ scale: 1.02, x: -4 }}
                        className="p-4 bg-white rounded-lg border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: type.color }}
                            ></div>
                            <h5 className="font-semibold text-gray-900 text-sm">{type.name}</h5>
                          </div>
                          <span className="font-bold text-orange-600">{type.count}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{type.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {type.examples.slice(0, 2).map((example, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {example}
                            </span>
                          ))}
                          {type.examples.length > 2 && (
                            <span className="text-xs text-gray-500">+{type.examples.length - 2} more</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Key Insights */}

          </div>
        </Card>
      </motion.div>

      {/* Thread Analysis Sections */}
      <div className="space-y-12 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Comprehensive Analysis Dashboard</h2>
          <p className="text-gray-600 text-center mb-12">Navigate to specific sections using the sidebar menu - all detailed analysis and analytics are available below</p>
        </motion.div>

        {/* Enhanced Main Thread Details Section */}
        <motion.div
          ref={threadsRef}
          id="threads-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="scroll-mt-8"
        >
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-6 mb-8">
              <motion.div
                className="p-4 bg-blue-500 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">
                  ⚡ {threadAnalysisData.threads.title}
                </h3>
                <p className="text-blue-800 leading-relaxed">
                  Deep dive into thread execution patterns with advanced analytics and real-time monitoring
                </p>

                {/* Status indicators */}
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-blue-700 font-medium">Real-time Analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-blue-700 font-medium">Performance Optimized</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-blue-700 font-medium">Active Monitoring</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-4xl font-bold text-blue-600 transition-colors duration-300">
                  {threadAnalysisData.threads.threads.length}
                </div>
                <div className="text-sm text-blue-700 font-medium">Active Threads</div>

                {/* Simple health meter */}
                <div className="w-20 h-3 mx-auto mt-3 bg-blue-100 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                </div>
                <div className="text-xs text-blue-600 mt-1 font-medium">Health: 85%</div>
              </div>
            </div>

            {/* Enhanced Interactive Thread Table */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <div>
                  <h4 className="text-lg font-semibold flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>🎯 Interactive Thread Analysis</span>
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 flex items-center space-x-2">
                    <Activity className="w-3 h-3 text-blue-500" />
                    <span>Showing top {selectedThreadLimit} threads with detailed information</span>
                  </p>
                </div>

                {/* Thread Limit Selector */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                    <Filter className="w-3 h-3" />
                    <span>Show:</span>
                  </span>
                  <div className="flex space-x-1">
                    {[5, 10, 20, 50].map((limit) => (
                      <motion.button
                        key={limit}
                        onClick={() => setSelectedThreadLimit(limit)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${selectedThreadLimit === limit
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {limit}
                      </motion.button>
                    ))}
                  </div>

                  {/* Live indicator */}
                  <div className="flex items-center space-x-2 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-700 font-medium">LIVE</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[100px]">Thread ID</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[200px]">Thread Name</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[80px]">nid</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[100px]">State</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[80px]">Priority</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[80px]">Daemon</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700 min-w-[150px]">Stack Trace</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allThreadsData.slice(0, selectedThreadLimit).map((thread, index) => {
                      const stateStyles = getThreadStateStyles(thread.state)
                      return (
                        <motion.tr
                          key={thread.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`border-b border-gray-100 border-l-4 border-l-transparent ${stateStyles.bgHover} ${stateStyles.borderHover} transition-all duration-300 group cursor-pointer hover:shadow-md`}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 ${stateStyles.dotColor} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                              <span className={`font-mono text-sm font-medium ${stateStyles.textAccent}`}>{thread.id}</span>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex flex-col">
                              <span className={`font-semibold text-gray-800 group-hover:${stateStyles.textAccent} transition-colors`}>
                                {thread.name}
                              </span>
                              <span className="text-xs text-gray-500 mt-1">
                                User: {thread.userTime}ms • Wait: {thread.waitedTime}ms
                              </span>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span className={`font-mono text-sm bg-gray-100 px-2 py-1 rounded group-hover:${stateStyles.badgeClass.split(' ')[0]} transition-colors`}>
                              {thread.nid}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <Badge
                              variant={
                                thread.state === 'RUNNABLE' ? 'default' :
                                  thread.state === 'BLOCKED' ? 'destructive' :
                                    thread.state === 'TIMED_WAITING' ? 'secondary' : 'outline'
                              }
                              className={`font-medium shadow-sm border ${stateStyles.badgeClass} group-hover:scale-105 transition-all duration-200`}
                            >
                              {thread.state}
                            </Badge>
                          </td>

                          <td className="py-4 px-4">
                            <span className={`font-medium text-gray-800 group-hover:${stateStyles.textAccent} transition-colors`}>{thread.priority}</span>
                          </td>

                          <td className="py-4 px-4">
                            <span className={`font-medium text-gray-800 group-hover:${stateStyles.textAccent} transition-colors`}>{thread.daemon ? 'Yes' : 'No'}</span>
                          </td>

                          <td className="py-4 px-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedThread(thread)
                                setStackTraceModalOpen(true)
                              }}
                              className={`transition-all duration-200 group-hover:border-current ${stateStyles.textAccent} border-gray-300 hover:bg-current hover:bg-opacity-10 hover:scale-105`}
                            >
                              View
                            </Button>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Summary */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">
                      {allThreadsData.slice(0, selectedThreadLimit).filter(t => t.state === 'RUNNABLE').length}
                    </div>
                    <div className="text-xs text-blue-700">Running</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-600">
                      {allThreadsData.slice(0, selectedThreadLimit).filter(t => t.state === 'WAITING').length}
                    </div>
                    <div className="text-xs text-yellow-700">Waiting</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600">
                      {allThreadsData.slice(0, selectedThreadLimit).filter(t => t.state === 'BLOCKED').length}
                    </div>
                    <div className="text-xs text-red-700">Blocked</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">
                      {allThreadsData.slice(0, selectedThreadLimit).filter(t => t.daemon).length}
                    </div>
                    <div className="text-xs text-purple-700">Daemon</div>
                  </div>
                </div>
              </div>
            </Card>
          </Card>

          {/* Stack Trace Modal */}
          <AlertDialog open={stackTraceModalOpen} onOpenChange={setStackTraceModalOpen}>
            <AlertDialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
              <AlertDialogHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <AlertDialogTitle className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Stack Trace Details</span>
                  </AlertDialogTitle>

                  {/* Close Cross Icon */}
                  <button
                    onClick={() => setStackTraceModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
                <AlertDialogDescription>
                  View detailed stack trace information for the selected thread
                </AlertDialogDescription>
              </AlertDialogHeader>

              {selectedThread && (
                <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
                  {/* Thread Information Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Thread ID</span>
                      <div className="font-mono font-medium text-blue-600">{selectedThread.id}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Thread Name</span>
                      <div className="font-medium text-gray-800 truncate">{selectedThread.name}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">nid</span>
                      <div className="font-mono font-medium text-gray-600">{selectedThread.nid}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">State</span>
                      <div>
                        <Badge
                          className={`font-medium border ${getThreadStateStyles(selectedThread.state).badgeClass}`}
                        >
                          {selectedThread.state}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Priority</span>
                      <div className="font-medium text-gray-800">{selectedThread.priority}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Daemon</span>
                      <div className="font-medium text-gray-800">{selectedThread.daemon ? 'Yes' : 'No'}</div>
                    </div>
                  </div>

                  {/* Stack Trace Section */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span>Complete Stack Trace</span>
                    </h4>

                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-96 border">
                      <div className="whitespace-pre-wrap break-all">
                        {/* {selectedThread.stackTrace} */}
                        {selectedThread.rawStackTrace}
                      </div>
                    </div>
                  </div>

                  {/* Analysis Section */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mt-0.5 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm text-blue-800 font-medium">Stack Trace Analysis</p>
                        <p className="text-xs text-blue-700 mt-1">
                          This thread is currently in <strong>{selectedThread.state}</strong> state.
                          {selectedThread.state === 'BLOCKED' && " It may be waiting for a lock or resource."}
                          {selectedThread.state === 'WAITING' && " It's waiting indefinitely for another thread to perform a particular action."}
                          {selectedThread.state === 'TIMED_WAITING' && " It's waiting for a specified period of time."}
                          {selectedThread.state === 'RUNNABLE' && " It's actively executing or ready to execute."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <AlertDialogFooter className="flex-shrink-0 border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center w-full">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (selectedThread) {
                        navigator.clipboard.writeText(selectedThread.rawStackTrace)
                        console.log('Stack trace copied to clipboard')
                      }
                    }}
                    className="flex items-center space-x-2 bg-white hover:bg-gray-50 border-gray-300"
                  >
                    <Download className="w-4 h-4" />
                    <span>Copy Stack Trace</span>
                  </Button>
                  <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300">
                    Close
                  </AlertDialogCancel>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>



        {/* Identical Stack Trace Section */}
        <motion.div
          ref={identicalStackTraceRef}
          id="identical-stack-trace-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="scroll-mt-8"
        >
          <Card className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500">
            <div className="flex items-start space-x-6 mb-8">
              <div className="p-4 bg-indigo-500 rounded-xl">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-indigo-900 mb-2">{threadAnalysisData['identical-stack-trace'].title}</h3>
                <p className="text-indigo-800 leading-relaxed">{threadAnalysisData['identical-stack-trace'].description}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-indigo-600">4</div>
                <div className="text-sm text-indigo-700">Patterns Found</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <Card className="p-4 md:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 bg-white border border-gray-200">
                  <div className="mb-4 md:mb-6">
                    <h4 className="text-lg md:text-xl font-bold mb-2 flex items-center text-gray-900">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded-full mr-2 md:mr-3"></div>
                      Thread Count by Stack Trace Groups
                    </h4>
                    <p className="text-sm md:text-base text-gray-600">Distribution of threads across identical stack trace patterns</p>
                  </div>

                  <div className="w-full bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                    <div className="w-full h-64 sm:h-80 md:h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={threadAnalysisData['identical-stack-trace'].stackTraceChartData}
                          margin={{
                            top: 20,
                            right: 20,
                            left: 20,
                            bottom: 60
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.6} />
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                            interval={0}
                          />
                          <YAxis
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            label={{
                              value: 'Thread Count',
                              angle: -90,
                              position: 'insideLeft',
                              style: { textAnchor: 'middle', fill: '#6b7280', fontSize: '12px' }
                            }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1f2937',
                              border: 'none',
                              borderRadius: '8px',
                              color: '#f9fafb',
                              fontSize: '14px',
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                            }}
                            formatter={(value, name) => [
                              `${value} threads`,
                              'Thread Count'
                            ]}
                            labelFormatter={(label) => `Stack Trace: ${label}`}
                          />
                          <Bar
                            dataKey="value"
                            fill="#f97316"
                            radius={[4, 4, 0, 0]}
                            stroke="#ea580c"
                            strokeWidth={1}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Summary Statistics */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-xl md:text-2xl font-bold text-orange-600 mb-1">
                        {threadAnalysisData['identical-stack-trace'].stackTraceChartData?.reduce((sum, item) => sum + item.value, 0) || 0}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Total Threads</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="text-xl md:text-2xl font-bold text-amber-600 mb-1">
                        {threadAnalysisData['identical-stack-trace'].stackTraceChartData?.length || 0}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Stack Groups</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="text-xl md:text-2xl font-bold text-yellow-600 mb-1">
                        {Math.round(((threadAnalysisData['identical-stack-trace'].stackTraceChartData?.reduce((sum, item) => sum + item.value, 0) || 0) / (threadAnalysisData['identical-stack-trace'].stackTraceChartData?.length || 1)))}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Avg per Group</div>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold flex items-center">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                      CPU Thread Pool (Page {currentPage} of {Math.ceil(cpuThreadPoolData.length / itemsPerPage)})
                    </h4>
                    <div className="text-sm text-gray-500 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      {cpuThreadPoolData.length} Total Threads
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 font-semibold text-sm text-gray-700">Rank</th>
                          <th className="text-left py-3 px-2 font-semibold text-sm text-gray-700">Thread Name</th>
                          <th className="text-left py-3 px-2 font-semibold text-sm text-gray-700">CPU Usage</th>
                          <th className="text-left py-3 px-2 font-semibold text-sm text-gray-700">State</th>
                          <th className="text-left py-3 px-2 font-semibold text-sm text-gray-700">Stack Traces</th>
                          <th className="text-left py-3 px-2 font-semibold text-sm text-gray-700">Priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cpuThreadPoolData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((thread, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => setSelectedThreadForModal(thread)}
                          >
                            <td className="py-3 px-2">
                              <div className="flex items-center">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${((currentPage - 1) * itemsPerPage + index) < 3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                                  ((currentPage - 1) * itemsPerPage + index) < 6 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                                    'bg-gradient-to-r from-gray-400 to-gray-600'
                                  }`}>
                                  {(currentPage - 1) * itemsPerPage + index + 1}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <div className="font-medium text-sm text-gray-900">{thread.name}</div>
                              <div className="text-xs text-gray-500">{thread.type}</div>
                            </td>
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-2">
                                <div className="text-sm font-semibold text-gray-900">{thread.cpuUsage}%</div>
                                <div className="w-12 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${thread.cpuUsage > 80 ? 'bg-red-500' :
                                      thread.cpuUsage > 60 ? 'bg-yellow-500' :
                                        'bg-green-500'
                                      }`}
                                    style={{ width: `${Math.min(thread.cpuUsage, 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <Badge
                                variant={
                                  thread.state === 'RUNNABLE' ? 'default' :
                                    thread.state === 'BLOCKED' ? 'destructive' :
                                      thread.state === 'WAITING' ? 'secondary' :
                                        'outline'
                                }
                                className="text-xs"
                              >
                                {thread.state}
                              </Badge>
                            </td>
                            <td className="py-3 px-2">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedIndividualThread(thread)
                                  setShowIndividualStackTraceModal(true)
                                }}
                                variant="outline"
                                size="sm"
                                className="text-indigo-600 border-indigo-300 hover:bg-indigo-50 hover:border-indigo-400 transition-colors"
                              >
                                View
                              </Button>
                            </td>
                            <td className="py-3 px-2">
                              <div className="text-sm text-gray-600">{thread.priority}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Placeholder for next 10 rows */}
                  {/* Pagination Controls */}
                  <div className="mt-6 flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center space-x-2 text-sm text-indigo-700">
                      <span>
                        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, cpuThreadPoolData.length)} of {cpuThreadPoolData.length} threads
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* First Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="text-indigo-600 border-indigo-300 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronsLeft className="w-4 h-4" />
                      </Button>

                      {/* Previous Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="text-indigo-600 border-indigo-300 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>

                      {/* Page Numbers */}
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.ceil(cpuThreadPoolData.length / itemsPerPage) }, (_, i) => i + 1)
                          .filter(page =>
                            page === 1 ||
                            page === Math.ceil(cpuThreadPoolData.length / itemsPerPage) ||
                            Math.abs(page - currentPage) <= 1
                          )
                          .map((page, index, filteredPages) => (
                            <div key={page} className="flex items-center">
                              {index > 0 && filteredPages[index - 1] !== page - 1 && (
                                <span className="text-gray-400 mx-1">...</span>
                              )}
                              <Button
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className={
                                  currentPage === page
                                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                    : "text-indigo-600 border-indigo-300 hover:bg-indigo-50"
                                }
                              >
                                {page}
                              </Button>
                            </div>
                          ))
                        }
                      </div>

                      {/* Next Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(cpuThreadPoolData.length / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(cpuThreadPoolData.length / itemsPerPage)}
                        className="text-indigo-600 border-indigo-300 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>

                      {/* Last Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.ceil(cpuThreadPoolData.length / itemsPerPage))}
                        disabled={currentPage === Math.ceil(cpuThreadPoolData.length / itemsPerPage)}
                        className="text-indigo-600 border-indigo-300 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronsRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Most Used Methods Section */}
        <motion.div
          ref={mostUsedMethodsRef}
          id="most-used-methods-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="scroll-mt-8"
        >
          <Card className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500">
            <div className="flex items-start space-x-6 mb-8">
              <div className="p-4 bg-green-500 rounded-xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-green-900 mb-2">{threadAnalysisData['most-used-methods'].title}</h3>
                <p className="text-green-800 leading-relaxed">{threadAnalysisData['most-used-methods'].description}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-green-600">1,245</div>
                <div className="text-sm text-green-700">Peak Calls</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    Method Call Timeline
                  </h4>
                  <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
                    {threadAnalysisData['most-used-methods'].chartData && threadAnalysisData['most-used-methods'].chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={threadAnalysisData['most-used-methods'].chartData}
                          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                        >
                          <defs>
                            <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.6} />
                          <XAxis
                            dataKey="time"
                            tick={{ fontSize: 12, fill: '#374151' }}
                            axisLine={{ stroke: '#d1d5db' }}
                            tickLine={{ stroke: '#d1d5db' }}
                          />
                          <YAxis
                            tick={{ fontSize: 12, fill: '#374151' }}
                            axisLine={{ stroke: '#d1d5db' }}
                            tickLine={{ stroke: '#d1d5db' }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '8px',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                              fontSize: '14px'
                            }}
                            labelStyle={{ color: '#374151', fontWeight: '600' }}
                            cursor={{ stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5 5' }}
                          />
                          <Line
                            type="monotone"
                            dataKey="calls"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#ffffff' }}
                            name="Method Calls"
                          />
                          <Line
                            type="monotone"
                            dataKey="cpuUsage"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#ffffff' }}
                            name="CPU Usage %"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <p>No method call data available</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                    Top Methods
                  </h4>
                  <div className="space-y-3">
                    {threadAnalysisData['most-used-methods'].data.map((method, index) => (
                      <motion.div
                        key={index}
                        className="group p-3 bg-white rounded-lg border hover:border-emerald-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMethodClick(method)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded group-hover:bg-emerald-50 transition-colors">
                            {method.method.split('.').pop()}
                          </code>
                          <Badge variant="outline">{method.calls} calls</Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                          <span>CPU: {method.cpuTime}</span>
                          <span>{method.threads} threads</span>
                        </div>
                        <div className="text-xs text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          Click for detailed analysis →
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* CPU Threads Section */}
        <motion.div
          ref={cpuThreadsRef}
          id="cpu-threads-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="scroll-mt-8"
        >
          <Card className="p-8 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-6 mb-8">
              <motion.div
                className="p-4 bg-orange-500 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Cpu className="w-8 h-8 text-white" />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-orange-900 mb-2">
                  🔥 {threadAnalysisData['cpu-threads'].title}
                </h3>
                <p className="text-orange-800 leading-relaxed">
                  Monitor high-performance threads and identify CPU bottlenecks with real-time thermal monitoring
                </p>

                {/* CPU status indicators */}
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-orange-700 font-medium">High Load</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-orange-600" />
                    <span className="text-xs text-orange-700 font-medium">Real-time</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-3 h-3 text-orange-600" />
                    <span className="text-xs text-orange-700 font-medium">Performance Critical</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-4xl font-bold text-orange-600 transition-colors duration-300">
                  31.5%
                </div>
                <div className="text-sm text-orange-700 font-medium">Peak CPU Usage</div>
                <div className="text-xs text-orange-600 mt-1 font-medium">Thermal: High</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">CPU Usage Over Time</h4>
                <div className="h-64 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4">
                  {threadAnalysisData['cpu-threads'].chartData && threadAnalysisData['cpu-threads'].chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={threadAnalysisData['cpu-threads'].chartData}
                        margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                      >
                        <defs>
                          <linearGradient id="cpuAreaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="tempAreaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.6} />
                        <XAxis
                          dataKey="time"
                          tick={{ fontSize: 12, fill: '#374151' }}
                          axisLine={{ stroke: '#d1d5db' }}
                          tickLine={{ stroke: '#d1d5db' }}
                        />
                        <YAxis
                          tick={{ fontSize: 12, fill: '#374151' }}
                          axisLine={{ stroke: '#d1d5db' }}
                          tickLine={{ stroke: '#d1d5db' }}
                          label={{ value: 'Usage %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            fontSize: '14px'
                          }}
                          labelStyle={{ color: '#374151', fontWeight: '600' }}
                          cursor={{ stroke: '#f97316', strokeWidth: 2, strokeDasharray: '5 5' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="cpuUsage"
                          stackId="1"
                          stroke="#f97316"
                          fill="url(#cpuAreaGradient)"
                          strokeWidth={2}
                          name="CPU Usage"
                        />
                        <Area
                          type="monotone"
                          dataKey="temperature"
                          stackId="2"
                          stroke="#ef4444"
                          fill="url(#tempAreaGradient)"
                          strokeWidth={2}
                          name="Temperature"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <p>No CPU usage data available</p>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-orange-600" />
                  <span>CPU Intensive Threads</span>
                </h4>
                <div className="space-y-3">
                  {threadAnalysisData['cpu-threads'].data.map((thread, index) => (
                    <motion.div
                      key={thread.id || index}
                      className="p-4 bg-gradient-to-r from-white to-orange-50 rounded-xl border border-orange-100 cursor-pointer hover:shadow-lg hover:border-orange-300 transition-all duration-300 group relative overflow-hidden"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedCpuThread(thread)
                        setShowCpuThreadModal(true)
                      }}
                    >
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold text-sm text-gray-800 group-hover:text-orange-800 transition-colors">
                            {thread.thread}
                          </h5>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className="bg-orange-100 text-orange-700 border-orange-300 font-medium"
                            >
                              {thread.cpuUsage}% CPU
                            </Badge>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-orange-500" />
                            <span>{thread.coreAffinity}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Activity className="w-3 h-3 text-orange-500" />
                            <span>Priority: {thread.priority}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge
                            variant={thread.state === 'RUNNABLE' ? 'default' : 'secondary'}
                            className={`text-xs ${thread.state === 'RUNNABLE'
                              ? 'bg-green-100 text-green-700 border-green-300'
                              : 'bg-gray-100 text-gray-700 border-gray-300'
                              }`}
                          >
                            {thread.state}
                          </Badge>

                          <div className="text-xs text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                            Click for details →
                          </div>
                        </div>

                        {/* CPU Usage Progress Bar */}
                        <div className="mt-3 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${thread.cpuUsage}%` }}
                            transition={{ delay: index * 0.1, duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </Card>
        </motion.div>

        {/* Finalizer Threads Section */}
        <motion.div
          ref={finalizerThreadsRef}
          id="finalizer-threads-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="scroll-mt-8"
        >
          <Card className="p-8 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500">
            <div className="flex items-start space-x-6 mb-8">
              <div className="p-4 bg-red-500 rounded-xl">
                <Trash2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-red-900 mb-2">{threadAnalysisData['finalizer-threads'].title}</h3>
                <p className="text-red-800 leading-relaxed">{threadAnalysisData['finalizer-threads'].description}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-red-600">1,247</div>
                <div className="text-sm text-red-700">Objects Finalized</div>
              </div>
            </div>

            {/* Enhanced Finalizer Details - No Chart, Just Beautiful Clickable Rows */}
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <Trash2 className="w-5 h-5 text-red-600" />
                <span>Finalizer Details</span>
              </h4>
              <div className="space-y-3">
                {threadAnalysisData['finalizer-threads'].data.map((finalizer, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gradient-to-r from-white to-red-50 rounded-xl border border-red-100 cursor-pointer hover:shadow-lg hover:border-red-300 transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedFinalizer(finalizer)
                      setShowFinalizerModal(true)
                    }}
                  >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors">
                              {finalizer.finalizer}
                            </h5>
                            <p className="text-xs text-gray-600">{finalizer.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={finalizer.state === 'ACTIVE' ? 'default' : 'secondary'}
                            className={finalizer.state === 'ACTIVE' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                          >
                            {finalizer.state}
                          </Badge>
                          <div className="p-1 bg-gray-100 rounded-full group-hover:bg-red-100 transition-colors">
                            <AlertTriangle className="w-3 h-3 text-gray-500 group-hover:text-red-600" />
                          </div>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                          <div className="font-semibold text-red-700">
                            {finalizer.objectsFinalized || finalizer.referencesProcessed || finalizer.cleanupTasks}
                          </div>
                          <div className="text-xs text-red-600">Processed</div>
                        </div>
                        <div className="text-center p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                          <div className="font-semibold text-orange-700">{finalizer.avgTime}</div>
                          <div className="text-xs text-orange-600">Avg Time</div>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <div className="font-semibold text-blue-700">{finalizer.queueSize}</div>
                          <div className="text-xs text-blue-600">Queue Size</div>
                        </div>
                      </div>

                      {/* Click indicator */}
                      <div className="mt-3 flex items-center justify-center text-xs text-gray-500 group-hover:text-red-600 transition-colors">
                        <span className="mr-1">Click for thread details</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          →
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </Card>
        </motion.div>

        {/* GC Threads Section */}
        <motion.div
          ref={gcThreadsRef}
          id="gc-threads-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="scroll-mt-8"
        >
          <Card className="p-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-6 mb-8">
              <motion.div
                className="p-4 bg-purple-500 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <MemoryStick className="w-8 h-8 text-white" />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-purple-900 mb-2">
                  🧠 {threadAnalysisData['gc-threads'].title}
                </h3>
                <p className="text-purple-800 leading-relaxed">
                  Advanced garbage collection monitoring with memory optimization insights and heap analytics
                </p>

                {/* GC status indicators */}
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-purple-700 font-medium">Optimal Collection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Database className="w-3 h-3 text-purple-600" />
                    <span className="text-xs text-purple-700 font-medium">Memory Managed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-3 h-3 text-purple-600" />
                    <span className="text-xs text-purple-700 font-medium">Auto-Cleanup</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-4xl font-bold text-purple-600 transition-colors duration-300">
                  1.2GB
                </div>
                <div className="text-sm text-purple-700 font-medium">Memory Freed</div>
                <div className="text-xs text-purple-600 mt-1 font-medium">Collection Efficiency: 94%</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">Memory Usage Timeline</h4>
                <div className="h-64 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4">
                  {threadAnalysisData['gc-threads'].chartData && threadAnalysisData['gc-threads'].chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={threadAnalysisData['gc-threads'].chartData}
                        margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                      >
                        <defs>
                          <linearGradient id="heapGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="gcTimeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.6} />
                        <XAxis
                          dataKey="time"
                          tick={{ fontSize: 12, fill: '#374151' }}
                          axisLine={{ stroke: '#d1d5db' }}
                          tickLine={{ stroke: '#d1d5db' }}
                        />
                        <YAxis
                          tick={{ fontSize: 12, fill: '#374151' }}
                          axisLine={{ stroke: '#d1d5db' }}
                          tickLine={{ stroke: '#d1d5db' }}
                          label={{ value: 'Usage %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            fontSize: '14px'
                          }}
                          labelStyle={{ color: '#374151', fontWeight: '600' }}
                          cursor={{ stroke: '#8b5cf6', strokeWidth: 2, strokeDasharray: '5 5' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="heapUsage"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2, fill: '#ffffff' }}
                          name="Heap Usage %"
                        />
                        <Line
                          type="monotone"
                          dataKey="gcTime"
                          stroke="#06b6d4"
                          strokeWidth={3}
                          dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: '#06b6d4', strokeWidth: 2, fill: '#ffffff' }}
                          name="GC Time (ms)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <p>No GC performance data available</p>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">GC Thread Performance</h4>
                <div className="space-y-3">
                  {threadAnalysisData['gc-threads'].data.map((gc, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-sm">{gc.gcThread}</h5>
                        <Badge variant="outline">{gc.collections} collections</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <span>Total: {gc.totalTime}</span>
                        <span>Avg: {gc.avgTime}</span>
                        <span>Freed: {gc.memoryFreed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </Card>
        </motion.div>

        {/* Dependency Graph Section */}
        <motion.div
          ref={dependencyGraphRef}
          id="dependency-graph-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="scroll-mt-8"
        >
          <Card className="p-8 bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-500">
            <div className="flex items-start space-x-6 mb-8">
              <div className="p-4 bg-indigo-500 rounded-xl">
                <GitBranch className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-indigo-900 mb-2">{threadAnalysisData['dependency-graph'].title}</h3>
                <p className="text-indigo-800 leading-relaxed">{threadAnalysisData['dependency-graph'].description}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-indigo-600">41</div>
                <div className="text-sm text-indigo-700">Dependencies</div>
              </div>
            </div>

            {/* Enhanced Thread Dependencies - No Chart, Just Beautiful Clickable Rows */}
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <GitBranch className="w-5 h-5 text-indigo-600" />
                <span>Thread Dependencies</span>
                <Badge variant="outline" className="text-xs bg-indigo-50 text-indigo-700 border-indigo-300">
                  {threadAnalysisData['dependency-graph'].data.length} Dependencies
                </Badge>
              </h4>

              {/* Dependency Legend */}
              <div className="mb-6 p-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-xl border border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h5 className="font-semibold text-indigo-900 mb-6 flex items-center justify-center space-x-3">
                    <div className="p-2 bg-indigo-500 rounded-lg shadow-md">
                      <GitBranch className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">Thread Dependency Scenarios — Distribution (illustrative)</span>
                  </h5>

                  {/* Interactive Thread Dependency Pie Chart */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                  >
                    <ThreadDependencyChart />
                  </motion.div>

                  {/* Interactive Stats Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <motion.div
                      className="text-center p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors cursor-pointer group shadow-sm hover:shadow-md"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-2 shadow-sm"></div>
                        <div className="text-lg font-bold text-red-700 group-hover:text-red-800">35%</div>
                      </div>
                      <div className="text-sm text-red-600 font-medium">Lock Contention</div>
                      <div className="text-xs text-red-600 mt-1">(42 threads, 1.2s avg wait)</div>
                    </motion.div>

                    <motion.div
                      className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors cursor-pointer group shadow-sm hover:shadow-md"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-4 h-4 bg-orange-500 rounded-full mr-2 shadow-sm"></div>
                        <div className="text-lg font-bold text-orange-700 group-hover:text-orange-800">28%</div>
                      </div>
                      <div className="text-sm text-orange-600 font-medium">Monitor Wait</div>
                      <div className="text-xs text-orange-600 mt-1">(34 threads, 0.8s avg wait)</div>
                    </motion.div>

                    <motion.div
                      className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors cursor-pointer group shadow-sm hover:shadow-md"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2 shadow-sm"></div>
                        <div className="text-lg font-bold text-yellow-700 group-hover:text-yellow-800">22%</div>
                      </div>
                      <div className="text-sm text-yellow-600 font-medium">I/O Operations</div>
                      <div className="text-xs text-yellow-600 mt-1">(26 threads, 2.1s avg wait)</div>
                    </motion.div>

                    <motion.div
                      className="text-center p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors cursor-pointer group shadow-sm hover:shadow-md"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-2 shadow-sm"></div>
                        <div className="text-lg font-bold text-green-700 group-hover:text-green-800">10%</div>
                      </div>
                      <div className="text-sm text-green-600 font-medium">Resource Pool</div>
                      <div className="text-xs text-green-600 mt-1">(12 threads, 0.5s avg wait)</div>
                    </motion.div>

                    <motion.div
                      className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer group shadow-sm hover:shadow-md"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-4 h-4 bg-purple-500 rounded-full mr-2 shadow-sm"></div>
                        <div className="text-lg font-bold text-purple-700 group-hover:text-purple-800">5%</div>
                      </div>
                      <div className="text-sm text-purple-600 font-medium">Other Dependencies</div>
                      <div className="text-xs text-purple-600 mt-1">(6 threads, 0.3s avg wait)</div>
                    </motion.div>
                  </motion.div>

                </motion.div>
              </div>

              <div className="space-y-4">
                {threadAnalysisData['dependency-graph'].data.map((dep, index) => (
                  <motion.div
                    key={index}
                    className="p-5 bg-gradient-to-r from-white to-indigo-50 rounded-xl border border-indigo-100 cursor-pointer hover:shadow-lg hover:border-indigo-300 transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedDependency(dep)
                      setShowDependencyModal(true)
                    }}
                  >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Main Dependency Chain */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                            <GitBranch className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 font-mono text-sm px-3 py-1">
                              {dep.source}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-0.5 bg-indigo-400"></div>
                              <div className="w-2 h-0.5 bg-indigo-400"></div>
                              <div className="w-0 h-0 border-l-2 border-l-indigo-400 border-t-1 border-t-transparent border-b-1 border-b-transparent"></div>
                            </div>
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300 font-mono text-sm px-3 py-1">
                              {dep.target}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={dep.type === 'WAITS_FOR' ? 'secondary' : dep.type === 'BLOCKED_BY' ? 'destructive' : 'default'}
                            className={`${dep.type === 'WAITS_FOR' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                              dep.type === 'BLOCKED_BY' ? 'bg-red-100 text-red-800 border-red-300' :
                                'bg-green-100 text-green-800 border-green-300'
                              }`}
                          >
                            {dep.type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>

                      {/* Dependency Details */}
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-700">
                          <Lock className="w-4 h-4 mr-2 text-indigo-600" />
                          <span className="font-medium">Lock Type:</span>
                          <Badge variant="outline" className="ml-2 text-xs bg-gray-50">
                            {dep.lockType}
                          </Badge>
                        </div>

                        <div className="text-sm text-gray-600">
                          <p className="mb-2">{dep.description}</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                            <div className="font-semibold text-indigo-700">{dep.duration}</div>
                            <div className="text-xs text-indigo-600">Wait Duration</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <div className="font-semibold text-blue-700">{dep.dependencyChain.length} threads</div>
                            <div className="text-xs text-blue-600">Chain Length</div>
                          </div>
                        </div>

                        {/* Dependency Chain Preview */}
                        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 py-2 bg-gray-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                          <span className="font-medium">Chain:</span>
                          {dep.dependencyChain.map((thread, i) => (
                            <div key={i} className="flex items-center space-x-1">
                              <span className="font-mono text-indigo-600">{thread}</span>
                              {i < dep.dependencyChain.length - 1 && (
                                <span className="text-gray-400">→</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Click indicator */}
                      <div className="mt-4 flex items-center justify-center text-xs text-gray-500 group-hover:text-indigo-600 transition-colors">
                        <span className="mr-1">Click for detailed dependency analysis</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          →
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </Card>
        </motion.div>

        {/* Analytics Section */}
        <motion.div
          ref={analyticsRef}
          id="analytics-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="scroll-mt-8"
        >
          <Card className="p-8 bg-gradient-to-r from-purple-50 to-cyan-50 border-l-4 border-purple-500">
            <div className="flex items-start space-x-6 mb-8">
              <div className="p-4 bg-purple-500 rounded-xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-purple-900 mb-2">Performance Analytics</h3>
                <p className="text-purple-800 leading-relaxed">Deep dive into thread performance and bottlenecks with comprehensive analytics and visualizations</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-purple-600">{analyticsData.threadStateData.reduce((sum, item) => sum + item.value, 0)}</div>
                <div className="text-sm text-purple-700">Total Threads</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">


              {/* Thread Performance Column Chart */}
              <Card className="overflow-hidden">
                <div className="p-6 pb-3 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-b">
                  <h4 className="font-semibold text-gray-900 mb-1">Thread Performance Overview</h4>
                  <p className="text-sm text-gray-600">
                    Total number of threads categorized by their operational states
                  </p>
                </div>
                <div className="p-6">
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={analyticsData.threadPerformanceData}
                        margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
                        barCategoryGap="25%"
                      >
                        <defs>
                          {analyticsData.threadPerformanceData.map((entry, index) => (
                            <linearGradient key={`gradient-${index}`} id={`gradient-${entry.state}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                              <stop offset="100%" stopColor={entry.color} stopOpacity={0.6} />
                            </linearGradient>
                          ))}
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#e2e8f0"
                          opacity={0.6}
                          horizontal={true}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="state"
                          tick={{ fontSize: 14, fill: '#374151', fontWeight: '500' }}
                          axisLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
                          tickLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
                          tickMargin={12}
                        />
                        <YAxis
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                          axisLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
                          tickLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
                          label={{
                            value: 'Number of Threads',
                            angle: -90,
                            position: 'insideLeft',
                            style: { textAnchor: 'middle', fill: '#374151', fontWeight: '500' }
                          }}
                          domain={[0, 'dataMax + 20']}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
                            backdropFilter: 'blur(10px)'
                          }}
                          labelStyle={{
                            color: '#111827',
                            fontWeight: '600',
                            fontSize: '14px',
                            marginBottom: '8px'
                          }}
                          cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                          formatter={(value: any, name: any, props: any) => [
                            <>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-bold text-gray-900">{value} threads</span>
                                <span className="text-sm font-medium text-gray-600">({props.payload.percentage}%)</span>
                              </div>
                              <div className="text-sm text-gray-600 leading-relaxed">
                                {props.payload.description}
                              </div>
                            </>,
                            ''
                          ]}
                          labelFormatter={(label) => `${label} Threads`}
                        />
                        <Bar
                          dataKey="totalThreads"
                          radius={[8, 8, 0, 0]}
                          stroke="rgba(255, 255, 255, 0.8)"
                          strokeWidth={2}
                        >
                          {analyticsData.threadPerformanceData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={`url(#gradient-${entry.state})`}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Enhanced Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                    {analyticsData.threadPerformanceData.map((item, index) => (
                      <div
                        key={item.state}
                        className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient} p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group`}
                      >
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-white/90">{item.state}</h5>
                            <div className="w-3 h-3 rounded-full bg-white/30 group-hover:bg-white/50 transition-colors"></div>
                          </div>
                          <div className="text-2xl font-bold mb-1">{item.totalThreads}</div>
                          <div className="text-sm text-white/80 mb-2">{item.percentage}% of total</div>
                          <div className="text-xs text-white/70 leading-relaxed">{item.description}</div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>

                  {/* Performance Indicator */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">System Performance Status:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="font-medium text-green-700">Optimal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

            </div>


          </Card>
        </motion.div>
      </div>

      {/* Metric Details Modal */}
      <MetricDetailsModal
        isOpen={metricModalOpen}
        onClose={handleCloseMetricModal}
        metricTitle={selectedMetric}
        threads={threads}
      />

      {/* Stack Trace Details Modal */}
      <AlertDialog open={showStackTraceModal} onOpenChange={setShowStackTraceModal}>
        <AlertDialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
          <AlertDialogHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <AlertDialogTitle className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Identical Stack Trace - Detailed Analysis</span>
              </AlertDialogTitle>

              {/* Close Cross Icon */}
              <button
                onClick={() => setShowStackTraceModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <AlertDialogDescription>
              Comprehensive view of identical stack traces and CPU thread pool information
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-6 flex-1 overflow-y-auto min-h-0">
            {/* Overview Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{cpuThreadPoolData.length}</div>
                <div className="text-sm text-blue-700">Total CPU Threads</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {cpuThreadPoolData.filter(t => t.state === 'RUNNABLE').length}
                </div>
                <div className="text-sm text-green-700">Active Threads</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(cpuThreadPoolData.reduce((sum, t) => sum + t.cpuUsage, 0) / cpuThreadPoolData.length)}%
                </div>
                <div className="text-sm text-orange-700">Avg CPU Usage</div>
              </div>
            </div>

            {/* Detailed Thread Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-indigo-600" />
                Complete CPU Thread Pool Analysis
              </h3>

              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-gray-100">
                    <tr>
                      <th className="text-left py-2 px-3 font-semibold">Thread</th>
                      <th className="text-left py-2 px-3 font-semibold">Type</th>
                      <th className="text-left py-2 px-3 font-semibold">CPU %</th>
                      <th className="text-left py-2 px-3 font-semibold">State</th>
                      <th className="text-left py-2 px-3 font-semibold">Priority</th>
                      <th className="text-left py-2 px-3 font-semibold">Traces</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cpuThreadPoolData.map((thread, index) => (
                      <tr
                        key={index}
                        className={`border-b border-gray-200 hover:bg-white transition-colors cursor-pointer ${selectedThreadForModal?.name === thread.name ? 'bg-indigo-50' : ''
                          }`}
                        onClick={() => setSelectedThreadForModal(thread)}
                      >
                        <td className="py-2 px-3">
                          <div className="font-medium">{thread.name}</div>
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-600">{thread.type}</td>
                        <td className="py-2 px-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{thread.cpuUsage}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${thread.cpuUsage > 80 ? 'bg-red-500' :
                                  thread.cpuUsage > 60 ? 'bg-yellow-500' :
                                    'bg-green-500'
                                  }`}
                                style={{ width: `${Math.min(thread.cpuUsage, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <Badge
                            variant={
                              thread.state === 'RUNNABLE' ? 'default' :
                                thread.state === 'BLOCKED' ? 'destructive' :
                                  thread.state === 'WAITING' ? 'secondary' :
                                    'outline'
                            }
                            className="text-xs"
                          >
                            {thread.state}
                          </Badge>
                        </td>
                        <td className="py-2 px-3 text-center">{thread.priority}</td>
                        <td className="py-2 px-3 text-center text-indigo-600 font-medium">{thread.stackTraces}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Thread Stack Trace */}
            {selectedThreadForModal && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-600" />
                  Stack Trace Details: {selectedThreadForModal.name}
                </h3>

                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div className="mb-2 text-gray-300">
                    Thread: <span className="text-white">{selectedThreadForModal.name}</span> |
                    State: <span className="text-yellow-400">{selectedThreadForModal.state}</span> |
                    CPU: <span className="text-red-400">{selectedThreadForModal.cpuUsage}%</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2">
                    {selectedThreadForModal.stackTrace.map((trace: string, index: number) => (
                      <div key={index} className="mb-1 pl-4">
                        <span className="text-gray-500">at </span>
                        <span className="text-green-400">{trace}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-700 mb-1">Thread Type</div>
                    <div className="font-semibold text-blue-900">{selectedThreadForModal.type}</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-700 mb-1">Priority Level</div>
                    <div className="font-semibold text-purple-900">{selectedThreadForModal.priority}/10</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <AlertDialogFooter className="flex-shrink-0 border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center w-full">
              <AlertDialogCancel
                onClick={() => setShowStackTraceModal(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300"
              >
                Close
              </AlertDialogCancel>
              <Button
                onClick={() => {
                  // Add export functionality here if needed
                  console.log('Exporting stack trace data...')
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Copy Stack Trace
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Individual Thread Stack Trace Modal */}
      <AlertDialog open={showIndividualStackTraceModal} onOpenChange={setShowIndividualStackTraceModal}>
        <AlertDialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
          <AlertDialogHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <AlertDialogTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span>Thread Stack Trace Details</span>
              </AlertDialogTitle>

              {/* Close Cross Icon */}
              <button
                onClick={() => setShowIndividualStackTraceModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <AlertDialogDescription>
              Detailed stack trace information for the selected thread
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedIndividualThread && (
            <div className="space-y-6 flex-1 overflow-y-auto min-h-0">
              {/* Thread Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 mb-1">Thread Name</div>
                  <div className="font-semibold text-blue-900 break-words">{selectedIndividualThread.name}</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 mb-1">CPU Usage</div>
                  <div className="font-semibold text-green-900">{selectedIndividualThread.cpuUsage}%</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-700 mb-1">State</div>
                  <div className="font-semibold text-purple-900">{selectedIndividualThread.state}</div>
                </div>
              </div>

              {/* Thread Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
                  <div className="text-sm text-orange-700 mb-1">Thread Type</div>
                  <div className="font-semibold text-orange-900">{selectedIndividualThread.type}</div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-700 mb-1">Priority Level</div>
                  <div className="font-semibold text-gray-900">{selectedIndividualThread.priority}/10</div>
                </div>
              </div>

              {/* Stack Trace */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-indigo-600" />
                  Stack Trace Lines
                </h3>

                <div className="bg-gray-900 text-green-400 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                  <div className="mb-4 text-gray-300 pb-2 border-b border-gray-700">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span>Thread: <span className="text-white font-medium">{selectedIndividualThread.name}</span></span>
                      <span>State: <span className="text-yellow-400 font-medium">{selectedIndividualThread.state}</span></span>
                      <span>CPU: <span className="text-red-400 font-medium">{selectedIndividualThread.cpuUsage}%</span></span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {selectedIndividualThread.stackTrace.map((trace: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 py-1 hover:bg-gray-800 rounded px-2 transition-colors">
                        <div className="text-gray-500 text-xs font-bold min-w-[2rem] mt-0.5">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-500">at </span>
                          <span className="text-green-400 break-all">{trace}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedIndividualThread.stackTrace.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                      No stack trace information available
                    </div>
                  )}
                </div>


              </div>
            </div>
          )}

          <AlertDialogFooter className="flex-shrink-0 border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center w-full">
              <AlertDialogCancel
                onClick={() => setShowIndividualStackTraceModal(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300"
              >
                Close
              </AlertDialogCancel>
              <Button
                onClick={() => {
                  // Add copy to clipboard functionality
                  if (selectedIndividualThread) {
                    const stackTraceText = selectedIndividualThread.stackTrace.join('\n');
                    navigator.clipboard.writeText(stackTraceText);
                    console.log('Stack trace copied to clipboard');
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Copy Stack Trace
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Simplified Method Details Modal */}
      <AlertDialog open={showMethodDetailsModal} onOpenChange={setShowMethodDetailsModal}>
        <AlertDialogContent className="max-w-2xl border-0 bg-white shadow-xl">
          <AlertDialogHeader className="pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <AlertDialogTitle className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-lg font-semibold text-gray-900">Method Details</span>
              </AlertDialogTitle>

              {/* Close Cross Icon */}
              <button
                onClick={handleCloseMethodModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <AlertDialogDescription className="text-sm text-gray-600">
              Performance summary for the selected method
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedMethod && (
            <div className="p-6 space-y-4">
              {/* Method Name */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Method</h4>
                <div className="bg-gray-50 p-3 rounded-lg border">
                  <code className="text-sm font-mono text-gray-800 break-all">
                    {selectedMethod.method}
                  </code>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {selectedMethod.calls.toLocaleString()}
                  </div>
                  <div className="text-sm text-emerald-700">Total Calls</div>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {selectedMethod.cpuTime}
                  </div>
                  <div className="text-sm text-orange-700">CPU Time</div>
                </div>

                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {selectedMethod.threads}
                  </div>
                  <div className="text-sm text-blue-700">Active Threads</div>
                </div>
              </div>

              {/* Status */}
              <div className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Performance Status</span>
                  <Badge className={`${selectedMethod.calls > 1000 ? 'bg-red-100 text-red-800 border-red-200' :
                    selectedMethod.calls > 500 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      'bg-green-100 text-green-800 border-green-200'
                    }`}>
                    {selectedMethod.calls > 1000 ? 'High Usage' : selectedMethod.calls > 500 ? 'Moderate' : 'Normal'}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Simple Footer */}
          <AlertDialogFooter className="border-t border-gray-200 px-6 py-4">
            <AlertDialogCancel
              onClick={handleCloseMethodModal}
              className="hover:bg-gray-100 transition-colors"
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* CPU Thread Details Modal */}
      <AlertDialog open={showCpuThreadModal} onOpenChange={setShowCpuThreadModal}>
        <AlertDialogContent className="max-w-3xl max-h-[80vh] overflow-hidden bg-white border border-gray-200 shadow-lg">
          {/* Simple Header */}
          <AlertDialogHeader className="pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <AlertDialogTitle className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-orange-600" />
                <span>CPU Thread Details</span>
              </AlertDialogTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-100"
                onClick={() => setShowCpuThreadModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <AlertDialogDescription className="text-gray-600">
              Detailed information about the selected CPU-intensive thread.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Simple Content */}
          <div className="space-y-4 overflow-y-auto max-h-[50vh] py-4">
            {selectedCpuThread && (
              <>
                {/* Basic Thread Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Thread Name:</span>
                      <span className="text-gray-900 font-mono text-sm">{selectedCpuThread.thread}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">CPU Usage:</span>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300">
                        {selectedCpuThread.cpuUsage}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">State:</span>
                      <Badge variant={selectedCpuThread.state === 'RUNNABLE' ? 'default' : 'secondary'}>
                        {selectedCpuThread.state}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Priority:</span>
                      <span className="text-gray-900">{selectedCpuThread.priority}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Core Affinity:</span>
                      <span className="text-gray-900 font-mono text-sm">{selectedCpuThread.coreAffinity}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Description:</span>
                      <span className="text-gray-900 text-sm text-right max-w-48">{selectedCpuThread.description}</span>
                    </div>
                  </div>
                </div>

                {/* Stack Trace */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Stack Trace</span>
                  </h4>
                  <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm text-green-400 max-h-64 overflow-y-auto">
                    <div className="text-green-300 mb-2">Thread: {selectedCpuThread.thread}</div>
                    <div className="text-yellow-400 mb-3">State: {selectedCpuThread.state}</div>

                    <div className="space-y-1">
                      {selectedCpuThread.stackTrace?.map((frame, index) => (
                        <div key={index} className="text-green-300 text-xs">
                          <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}:</span>
                          <span>at {frame}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Simple Footer */}
          <AlertDialogFooter className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (selectedCpuThread?.stackTrace) {
                    const stackTraceText = `Thread: ${selectedCpuThread.thread}\nState: ${selectedCpuThread.state}\nCPU Usage: ${selectedCpuThread.cpuUsage}%\n\nStack Trace:\n${selectedCpuThread.stackTrace.map((frame, i) => `  ${i + 1}: at ${frame}`).join('\n')}`;
                    navigator.clipboard.writeText(stackTraceText);
                  }
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                Copy Stack Trace
              </Button>

              <AlertDialogCancel>
                Close
              </AlertDialogCancel>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Finalizer Thread Details Modal - Simple Version */}
      <AlertDialog open={showFinalizerModal} onOpenChange={setShowFinalizerModal}>
        <AlertDialogContent className="max-w-3xl max-h-[80vh] overflow-hidden bg-white border border-gray-200 shadow-lg">
          {/* Simple Header */}
          <AlertDialogHeader className="pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <AlertDialogTitle className="flex items-center space-x-2">
                <Trash2 className="w-5 h-5 text-red-600" />
                <span>Finalizer Thread Details</span>
              </AlertDialogTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-100"
                onClick={() => setShowFinalizerModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <AlertDialogDescription className="text-gray-600">
              Detailed information about the selected finalizer thread.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Simple Content */}
          <div className="space-y-4 overflow-y-auto max-h-[50vh] py-4">
            {selectedFinalizer && (
              <>
                {/* Basic Finalizer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Finalizer Name:</span>
                      <span className="text-gray-900 font-mono text-sm">{selectedFinalizer.finalizer}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">State:</span>
                      <Badge variant={selectedFinalizer.state === 'ACTIVE' ? 'default' : 'secondary'}>
                        {selectedFinalizer.state}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Objects Processed:</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                        {selectedFinalizer.objectsFinalized || selectedFinalizer.referencesProcessed || selectedFinalizer.cleanupTasks}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Average Time:</span>
                      <span className="text-gray-900">{selectedFinalizer.avgTime}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Queue Size:</span>
                      <span className="text-gray-900 font-mono text-sm">{selectedFinalizer.queueSize}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Description:</span>
                      <span className="text-gray-900 text-sm text-right max-w-48">{selectedFinalizer.description}</span>
                    </div>
                  </div>
                </div>

                {/* Stack Trace */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Stack Trace</span>
                  </h4>
                  <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm text-green-400 max-h-64 overflow-y-auto">
                    <div className="text-green-300 mb-2">Finalizer: {selectedFinalizer.finalizer}</div>
                    <div className="text-yellow-400 mb-3">State: {selectedFinalizer.state}</div>

                    <div className="space-y-1">
                      {selectedFinalizer.stackTrace?.map((frame, index) => (
                        <div key={index} className="text-green-300 text-xs">
                          <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}:</span>
                          <span>at {frame}</span>
                        </div>
                      )) || (
                          <div className="space-y-1">
                            <div className="text-green-300 text-xs">
                              <span className="text-gray-500 mr-2">01:</span>
                              <span>at java.lang.ref.Finalizer.invokeFinalizeMethod(Native Method)</span>
                            </div>
                            <div className="text-green-300 text-xs">
                              <span className="text-gray-500 mr-2">02:</span>
                              <span>at java.lang.ref.Finalizer.runFinalizer(Finalizer.java:101)</span>
                            </div>
                            <div className="text-green-300 text-xs">
                              <span className="text-gray-500 mr-2">03:</span>
                              <span>at java.lang.ref.Finalizer.access$100(Finalizer.java:32)</span>
                            </div>
                            <div className="text-green-300 text-xs">
                              <span className="text-gray-500 mr-2">04:</span>
                              <span>at java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:199)</span>
                            </div>
                            <div className="text-green-300 text-xs">
                              <span className="text-gray-500 mr-2">05:</span>
                              <span>at java.lang.Thread.run(Thread.java:748)</span>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Simple Footer */}
          <AlertDialogFooter className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (selectedFinalizer) {
                    const stackTraceText = `Finalizer: ${selectedFinalizer.finalizer}\nState: ${selectedFinalizer.state}\nObjects Processed: ${selectedFinalizer.objectsFinalized || selectedFinalizer.referencesProcessed || selectedFinalizer.cleanupTasks}\n\nStack Trace:\n  1: at java.lang.ref.Finalizer.invokeFinalizeMethod(Native Method)\n  2: at java.lang.ref.Finalizer.runFinalizer(Finalizer.java:101)\n  3: at java.lang.ref.Finalizer.access$100(Finalizer.java:32)\n  4: at java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:199)\n  5: at java.lang.Thread.run(Thread.java:748)`;
                    navigator.clipboard.writeText(stackTraceText);
                  }
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                Copy Stack Trace
              </Button>

              <AlertDialogCancel>
                Close
              </AlertDialogCancel>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Thread Dependency Details Modal */}
      <AlertDialog open={showDependencyModal} onOpenChange={setShowDependencyModal}>
        <AlertDialogContent className="max-w-4xl max-h-[85vh] overflow-hidden bg-white border border-gray-200 shadow-lg">
          {/* Header */}
          <AlertDialogHeader className="pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <AlertDialogTitle className="flex items-center space-x-2">
                <GitBranch className="w-5 h-5 text-indigo-600" />
                <span>Thread Dependency Analysis</span>
              </AlertDialogTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-100"
                onClick={() => setShowDependencyModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <AlertDialogDescription className="text-gray-600">
              WebLogic thread dump dependency graph visualization showing lock relationships and blocking chains.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Content */}
          <div className="space-y-6 overflow-y-auto max-h-[60vh] py-4">
            {selectedDependency && (
              <>
                {/* Dependency Overview */}
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
                  <div className="flex items-center justify-center space-x-4 mb-3">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 font-mono text-lg px-4 py-2">
                      {selectedDependency.source}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-0.5 bg-indigo-500"></div>
                      <div className="w-3 h-0.5 bg-indigo-500"></div>
                      <div className="w-3 h-0.5 bg-indigo-500"></div>
                      <div className="w-0 h-0 border-l-3 border-l-indigo-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                    </div>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300 font-mono text-lg px-4 py-2">
                      {selectedDependency.target}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <Badge
                      variant="outline"
                      className={`${selectedDependency.type === 'WAITS_FOR' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                        selectedDependency.type === 'BLOCKED_BY' ? 'bg-red-100 text-red-800 border-red-300' :
                          'bg-green-100 text-green-800 border-green-300'
                        } text-base px-4 py-2`}
                    >
                      {selectedDependency.type.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>

                {/* Dependency Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Lock Information</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Lock Type:</span>
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                          {selectedDependency.lockType}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Wait Duration:</span>
                        <span className="text-gray-900 font-mono">{selectedDependency.duration}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Dependency Type:</span>
                        <Badge
                          variant="outline"
                          className={selectedDependency.type === 'WAITS_FOR' ? 'bg-yellow-50 text-yellow-700' : selectedDependency.type === 'BLOCKED_BY' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}
                        >
                          {selectedDependency.type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                      <GitBranch className="w-4 h-4" />
                      <span>Dependency Chain</span>
                    </h4>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        {selectedDependency.dependencyChain.map((thread, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <span className="font-mono text-sm">{thread}</span>
                            {index < selectedDependency.dependencyChain.length - 1 && (
                              <div className="flex-1 border-b border-dashed border-gray-300 ml-2"></div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-gray-600 italic">
                        Chain shows the flow: {selectedDependency.source} is waiting for a lock held by {selectedDependency.target}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Description</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDependency.description}</p>
                </div>

                {/* Stack Trace */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Stack Trace - {selectedDependency.source}</span>
                  </h4>
                  <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm text-green-400 max-h-64 overflow-y-auto">
                    <div className="text-green-300 mb-2">Thread: {selectedDependency.source}</div>
                    <div className="text-yellow-400 mb-3">Waiting for: {selectedDependency.lockType} held by {selectedDependency.target}</div>

                    <div className="space-y-1">
                      {selectedDependency.stackTrace?.map((frame, index) => (
                        <div key={index} className="text-green-300 text-xs">
                          <span className="text-gray-500 mr-2">{String(index + 1).padStart(2, '0')}:</span>
                          <span>at {frame}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dependency Graph Visualization */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                    <GitBranch className="w-4 h-4" />
                    <span>Visual Dependency Graph</span>
                  </h4>
                  <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
                    <div className="text-center space-y-4">
                      <h5 className="font-medium text-indigo-900">WebLogic Thread Dependency Analysis</h5>
                      <div className="flex justify-center items-center space-x-8">
                        {selectedDependency.dependencyChain.map((thread, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-mono text-xs ${index === 0 ? 'bg-red-500' : index === selectedDependency.dependencyChain.length - 1 ? 'bg-green-500' : 'bg-indigo-500'
                                }`}>
                                {thread.split('-')[1]}
                              </div>
                              <div className="text-xs text-gray-600 mt-1 font-mono">{thread}</div>
                              <div className="text-xs text-gray-500">
                                {index === 0 ? 'Waiting' : index === selectedDependency.dependencyChain.length - 1 ? 'Holding Lock' : 'Blocked'}
                              </div>
                            </div>
                            {index < selectedDependency.dependencyChain.length - 1 && (
                              <div className="flex items-center">
                                <div className="w-8 h-0.5 bg-indigo-400"></div>
                                <div className="w-0 h-0 border-l-2 border-l-indigo-400 border-t-1 border-t-transparent border-b-1 border-b-transparent"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-indigo-700 italic">
                        Example: {selectedDependency.source} → {selectedDependency.target}<br />
                        ({selectedDependency.source} is waiting for a lock held by {selectedDependency.target})
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <AlertDialogFooter className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (selectedDependency) {
                    const dependencyInfo = `Thread Dependency Analysis
Source: ${selectedDependency.source}
Target: ${selectedDependency.target}
Type: ${selectedDependency.type}
Lock Type: ${selectedDependency.lockType}
Duration: ${selectedDependency.duration}
Description: ${selectedDependency.description}

Dependency Chain: ${selectedDependency.dependencyChain.join(' → ')}

Stack Trace:
${selectedDependency.stackTrace?.map((frame, i) => `  ${i + 1}: at ${frame}`).join('\n')}`;
                    navigator.clipboard.writeText(dependencyInfo);
                  }
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                Copy Dependency Info
              </Button>

              <AlertDialogCancel>
                Close
              </AlertDialogCancel>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Recommendations Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="scroll-mt-8 mt-8"
      >
        <Card className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-emerald-500 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-900">Recommendations</h3>
              <p className="text-emerald-700">Based on thread dump analysis</p>
            </div>
          </div>

          <div className="space-y-3">
            {(() => {
              const blockedCount = analyticsData.threadStateData.find(item => item.name === 'BLOCKED')?.value || 0;
              const waitingCount = analyticsData.threadStateData.find(item => item.name === 'WAITING')?.value || 0;
              const totalThreads = analyticsData.threadStateData.reduce((sum, item) => sum + item.value, 0);
              const highCpuThreads = cpuThreadPoolData.filter(t => t.cpuUsage > 80).length;

              const recommendations = [];

              if (blockedCount > 0) {
                recommendations.push(`• Monitor ${blockedCount} blocked threads for potential deadlocks and resource contention`);
              }

              if (highCpuThreads > 0) {
                recommendations.push(`• Optimize ${highCpuThreads} high CPU usage threads to improve performance`);
              }

              if (waitingCount > totalThreads * 0.3) {
                recommendations.push(`• Reduce ${waitingCount} waiting threads through I/O optimization and async processing`);
              }

              if (totalThreads > 100) {
                recommendations.push(`• Consider thread pool optimization - current pool has ${totalThreads} threads`);
              }

              if (recommendations.length === 0) {
                recommendations.push('• System appears healthy - continue regular monitoring');
                recommendations.push('• Set up alerts for thread state changes and CPU usage spikes');
              }

              return recommendations.slice(0, 4).map((rec, index) => (
                <p key={index} className="text-emerald-800">{rec}</p>
              ));
            })()}
          </div>

          <div className="mt-4 pt-4 border-t border-emerald-200 text-emerald-600">
            Analysis completed: {new Date().toLocaleString()} • Generated by ThreadInsights.AI
          </div>
        </Card>
      </motion.div>

    </div>
  )
}

// Export memoized component to prevent unnecessary re-renders
export const DashboardOverview = memo(DashboardOverviewComponent)