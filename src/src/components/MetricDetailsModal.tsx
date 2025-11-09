// import React from 'react'
// import { motion, AnimatePresence } from 'motion/react'
// import { 
//   AlertDialog, 
//   AlertDialogContent, 
//   AlertDialogHeader, 
//   AlertDialogTitle, 
//   AlertDialogDescription 
// } from './ui/alert-dialog'
// import { Card } from './ui/card'
// import { Badge } from './ui/badge'
// import { Button } from './ui/button'
// import { Progress } from './ui/progress'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
// import { 
//   Users, 
//   Cpu, 
//   AlertTriangle, 
//   Lock, 
//   Clock, 
//   Brain,
//   Activity,
//   X,
//   AlertCircle,
//   CheckCircle,
//   Database,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react'

// interface MetricDetailsModalProps {
//   isOpen: boolean
//   onClose: () => void
//   metricTitle: string
//   threads: any[] // New prop to pass thread data
// }

// const getMetricDetails = (metricTitle: string , threads:any) => {
//   switch (metricTitle) {
//     case 'Total Threads':
//       console.log('Threads data in Total Threads case:', threads);
      
//        const totalThreads = threads?.threads?.length;
//       return {
//         icon: <Users className="w-8 h-8" />,
//         color: 'blue',
//         value: totalThreads,
//         description: 'Total number of threads currently running in the application',
//         details: {
//           'Active Threads': '98',
//           'Inactive Threads': '28',
//           'Peak Thread Count': '156',
//           'Total Started': '1,247'
//         },
//         metrics: [
//           { label: 'System Threads', value: 24, total: 126, color: 'bg-blue-500' },
//           { label: 'Application Threads', value: 76, total: 126, color: 'bg-green-500' },
//           { label: 'Background Threads', value: 26, total: 126, color: 'bg-purple-500' }
//         ],
//         insights: [
//           'Thread count is within normal operating range',
//           'No significant thread leaks detected',
//           'Peak usage occurred during high traffic periods'
//         ],
//         threadData : threads.threads
//         // threadData: [
//         //   { id: 1, name: 'main', nid: '0x1', state: 'RUNNABLE', priority: 5, daemon: false, stackTrace: 'java.lang.Thread.run()' },
//         //   { id: 2, name: 'GC task thread#0', nid: '0x2', state: 'RUNNABLE', priority: 9, daemon: true, stackTrace: 'java.lang.Object.wait()' },
//         //   { id: 3, name: 'HTTP-Worker-1', nid: '0x3', state: 'RUNNABLE', priority: 5, daemon: false, stackTrace: 'java.net.SocketInputStream.read()' },
//         //   { id: 4, name: 'Background-Thread-1', nid: '0x4', state: 'WAITING', priority: 5, daemon: true, stackTrace: 'java.lang.Object.wait()' },
//         //   { id: 5, name: 'DB-Connection-Pool-1', nid: '0x5', state: 'TIMED_WAITING', priority: 5, daemon: false, stackTrace: 'java.util.concurrent.locks.LockSupport.parkNanos()' },
//         //   { id: 6, name: 'HTTP-Worker-2', nid: '0x6', state: 'RUNNABLE', priority: 5, daemon: false, stackTrace: 'com.app.RequestHandler.handlePost()' },
//         //   { id: 7, name: 'Thread-Pool-Worker-1', nid: '0x7', state: 'WAITING', priority: 5, daemon: true, stackTrace: 'java.util.concurrent.ThreadPoolExecutor.getTask()' },
//         //   { id: 8, name: 'Async-Task-Thread-1', nid: '0x8', state: 'RUNNABLE', priority: 6, daemon: false, stackTrace: 'com.app.AsyncProcessor.execute()' },
//         //   { id: 9, name: 'Cache-Manager-Thread', nid: '0x9', state: 'TIMED_WAITING', priority: 3, daemon: true, stackTrace: 'java.lang.Thread.sleep()' },
//         //   { id: 10, name: 'Session-Cleanup-Thread', nid: '0xa', state: 'WAITING', priority: 2, daemon: true, stackTrace: 'java.util.concurrent.DelayQueue.take()' },
//         //   { id: 11, name: 'HTTP-Worker-3', nid: '0xb', state: 'BLOCKED', priority: 5, daemon: false, stackTrace: 'java.net.Socket.connect()' },
//         //   { id: 12, name: 'File-Writer-Thread', nid: '0xc', state: 'RUNNABLE', priority: 4, daemon: true, stackTrace: 'java.io.FileOutputStream.write()' },
//         //   { id: 13, name: 'DB-Connection-Pool-2', nid: '0xd', state: 'TIMED_WAITING', priority: 5, daemon: false, stackTrace: 'java.sql.Connection.prepareStatement()' },
//         //   { id: 14, name: 'Background-Processor-1', nid: '0xe', state: 'RUNNABLE', priority: 3, daemon: true, stackTrace: 'com.app.BackgroundProcessor.process()' },
//         //   { id: 15, name: 'Event-Handler-Thread', nid: '0xf', state: 'WAITING', priority: 5, daemon: false, stackTrace: 'java.util.concurrent.BlockingQueue.take()' },
//         //   { id: 16, name: 'Metrics-Collector-Thread', nid: '0x10', state: 'TIMED_WAITING', priority: 2, daemon: true, stackTrace: 'java.lang.Thread.sleep()' },
//         //   { id: 17, name: 'Security-Check-Thread', nid: '0x11', state: 'RUNNABLE', priority: 7, daemon: false, stackTrace: 'com.app.SecurityManager.validate()' },
//         //   { id: 18, name: 'Log-Processor-Thread', nid: '0x12', state: 'WAITING', priority: 1, daemon: true, stackTrace: 'java.util.concurrent.SynchronousQueue.take()' },
//         //   { id: 19, name: 'Health-Check-Thread', nid: '0x13', state: 'TIMED_WAITING', priority: 4, daemon: true, stackTrace: 'java.util.concurrent.ScheduledThreadPoolExecutor$DelayedWorkQueue.take()' },
//         //   { id: 20, name: 'HTTP-Worker-4', nid: '0x14', state: 'RUNNABLE', priority: 5, daemon: false, stackTrace: 'com.app.RestController.processRequest()' },
//         //   { id: 21, name: 'JMX-Connector-Thread', nid: '0x15', state: 'BLOCKED', priority: 5, daemon: true, stackTrace: 'java.net.ServerSocket.accept()' },
//         //   { id: 22, name: 'Queue-Consumer-Thread-1', nid: '0x16', state: 'WAITING', priority: 5, daemon: true, stackTrace: 'java.util.concurrent.LinkedBlockingQueue.take()' },
//         //   { id: 23, name: 'Resource-Monitor-Thread', nid: '0x17', state: 'TIMED_WAITING', priority: 3, daemon: true, stackTrace: 'java.lang.Object.wait()' },
//         //   { id: 24, name: 'Email-Sender-Thread', nid: '0x18', state: 'RUNNABLE', priority: 4, daemon: true, stackTrace: 'javax.mail.Transport.send()' },
//         //   { id: 25, name: 'Notification-Thread', nid: '0x19', state: 'WAITING', priority: 4, daemon: true, stackTrace: 'java.util.concurrent.CountDownLatch.await()' }
//         // ]
//       }

//     case 'Runnable Threads':
//       return {
//         icon: <Cpu className="w-8 h-8" />,
//         color: 'green',
//         value: '82',
//         description: 'Threads that are ready to execute and consuming CPU resources',
//         details: {
//           'CPU Intensive': '45',
//           'I/O Bound': '25',
//           'Waiting for CPU': '12',
//           'Average CPU Time': '2.3ms'
//         },
//         metrics: [
//           { label: 'High CPU Usage', value: 45, total: 82, color: 'bg-red-500' },
//           { label: 'Medium CPU Usage', value: 25, total: 82, color: 'bg-yellow-500' },
//           { label: 'Low CPU Usage', value: 12, total: 82, color: 'bg-green-500' }
//         ],
//         insights: [
//           'High number of CPU-intensive threads detected',
//           'Most threads are utilizing CPU effectively',
//           'No runaway processes identified'
//         ],
//         threadData : threads.runnableThreads
//         // threadData: [
//         //   { id: 6, name: 'CPU-Intensive-Worker-1', nid: '0x6', state: 'RUNNABLE', priority: 5, daemon: false, stackTrace: 'com.app.ProcessingEngine.processData()' },
//         //   { id: 7, name: 'HTTP-Worker-2', nid: '0x7', state: 'RUNNABLE', priority: 5, daemon: false, stackTrace: 'java.net.SocketInputStream.read()' },
//         //   { id: 8, name: 'Calculation-Thread-1', nid: '0x8', state: 'RUNNABLE', priority: 6, daemon: false, stackTrace: 'com.app.MathProcessor.calculate()' },
//         //   { id: 9, name: 'Data-Parser-1', nid: '0x9', state: 'RUNNABLE', priority: 5, daemon: true, stackTrace: 'com.app.DataParser.parseXML()' },
//         //   { id: 10, name: 'API-Handler-3', nid: '0xa', state: 'RUNNABLE', priority: 5, daemon: false, stackTrace: 'com.app.APIController.handleRequest()' }
//         // ]
//       }

//     case 'Blocked/waiting/timed-waiting Threads':
//       return {
//         icon: <AlertTriangle className="w-8 h-8" />,
//         color: 'orange',
//         value: '31',
//         description: 'Threads waiting for resources, synchronization, or I/O operations',
//         details: {
//           'BLOCKED': '8',
//           'WAITING': '15',
//           'TIMED_WAITING': '8',
//           'Avg Wait Time': '145ms'
//         },
//         metrics: [
//           { label: 'Resource Contention', value: 8, total: 31, color: 'bg-red-500' },
//           { label: 'I/O Operations', value: 15, total: 31, color: 'bg-yellow-500' },
//           { label: 'Timeout Operations', value: 8, total: 31, color: 'bg-orange-500' }
//         ],
//         insights: [
//           'Moderate level of thread blocking detected',
//           'Most waiting is due to I/O operations',
//           'No excessive lock contention identified'
//         ],
//         threadData: [
//           { id: 11, name: 'DB-Connection-Pool-2', nid: '0xb', state: 'BLOCKED', priority: 5, daemon: false, stackTrace: 'java.sql.Connection.prepareStatement()' },
//           { id: 12, name: 'File-Reader-1', nid: '0xc', state: 'WAITING', priority: 5, daemon: true, stackTrace: 'java.io.FileInputStream.read()' },
//           { id: 13, name: 'Cache-Loader-1', nid: '0xd', state: 'TIMED_WAITING', priority: 5, daemon: true, stackTrace: 'java.util.concurrent.locks.LockSupport.parkNanos()' },
//           { id: 14, name: 'HTTP-Worker-4', nid: '0xe', state: 'BLOCKED', priority: 5, daemon: false, stackTrace: 'java.net.Socket.connect()' },
//           { id: 15, name: 'Queue-Consumer-1', nid: '0xf', state: 'WAITING', priority: 5, daemon: true, stackTrace: 'java.util.concurrent.BlockingQueue.take()' }
//         ]
//       }

//     case 'Deadlock Threads':
//       return {
//         icon: <Lock className="w-8 h-8" />,
//         color: 'red',
//         value: '2',
//         description: 'Threads involved in deadlock situations that require immediate attention',
//         details: {
//           'Active Deadlocks': '1',
//           'Resolved Deadlocks': '1',
//           'Last Occurrence': '2m ago',
//           'Affected Resources': '3'
//         },
//         metrics: [
//           { label: 'Database Locks', value: 1, total: 2, color: 'bg-red-500' },
//           { label: 'File System Locks', value: 1, total: 2, color: 'bg-orange-500' }
//         ],
//         insights: [
//           'Critical: Active deadlock detected',
//           'Deadlock involves database connection pool',
//           'Immediate intervention required'
//         ],
//         threadData: [
//           { id: 16, name: 'DB-Transaction-1', nid: '0x10', state: 'BLOCKED', priority: 5, daemon: false, stackTrace: 'java.sql.Connection.commit() - waiting for lock' },
//           { id: 17, name: 'DB-Transaction-2', nid: '0x11', state: 'BLOCKED', priority: 5, daemon: false, stackTrace: 'java.sql.PreparedStatement.execute() - deadlock detected' }
//         ]
//       }

//     case 'Stuck Threads':
//       return {
//         icon: <Clock className="w-8 h-8" />,
//         color: 'purple',
//         value: '8',
//         description: 'Long-running threads that may be unresponsive or performing intensive operations',
//         details: {
//           'Execution Time > 5min': '3',
//           'Execution Time > 10min': '2',
//           'Potential Infinite Loops': '3',
//           'Longest Running': '847s'
//         },
//         metrics: [
//           { label: 'HTTP Request Handlers', value: 5, total: 8, color: 'bg-purple-500' },
//           { label: 'Background Tasks', value: 2, total: 8, color: 'bg-blue-500' },
//           { label: 'Database Operations', value: 1, total: 8, color: 'bg-red-500' }
//         ],
//         insights: [
//           'Several threads running longer than expected',
//           'Possible infinite loops in background tasks',
//           'HTTP handlers may be experiencing timeouts'
//         ],
//         threadData: [
//           { id: 18, name: 'HTTP-Handler-Stuck-1', nid: '0x12', state: 'STUCK', priority: 5, daemon: false, stackTrace: 'com.app.LongRunningTask.execute() - running for 847s' },
//           { id: 19, name: 'Background-Loop-1', nid: '0x13', state: 'STUCK', priority: 3, daemon: true, stackTrace: 'com.app.InfiniteProcessor.process() - possible infinite loop' },
//           { id: 20, name: 'DB-Query-Stuck-1', nid: '0x14', state: 'STUCK', priority: 5, daemon: false, stackTrace: 'java.sql.Statement.executeQuery() - running for 612s' },
//           { id: 21, name: 'File-Processing-1', nid: '0x15', state: 'STUCK', priority: 4, daemon: true, stackTrace: 'com.app.FileProcessor.processLargeFile() - running for 423s' }
//         ]
//       }

//     case 'Daemon and Non-Daemon':
//       return {
//         icon: <Brain className="w-8 h-8" />,
//         color: 'blue',
//         value: '89:37',
//         description: 'Distribution between daemon threads (background) and non-daemon threads (application)',
//         details: {
//           'Daemon Threads': '89',
//           'Non-Daemon Threads': '37',
//           'System Daemon': '24',
//           'Application Daemon': '65'
//         },
//         metrics: [
//           { label: 'Daemon Threads', value: 89, total: 126, color: 'bg-blue-500' },
//           { label: 'Non-Daemon Threads', value: 37, total: 126, color: 'bg-green-500' }
//         ],
//         insights: [
//           'Healthy balance between daemon and non-daemon threads',
//           'Daemon threads handling background operations effectively',
//           'Application threads focused on user requests'
//         ],
//         threadData: [
//           { id: 22, name: 'GC task thread#1', nid: '0x16', state: 'RUNNABLE', priority: 9, daemon: true, stackTrace: 'java.lang.Object.wait()' },
//           { id: 23, name: 'HTTP-Worker-5', nid: '0x17', state: 'RUNNABLE', priority: 5, daemon: false, stackTrace: 'com.app.RequestHandler.handle()' },
//           { id: 24, name: 'Cleanup-Thread-1', nid: '0x18', state: 'TIMED_WAITING', priority: 1, daemon: true, stackTrace: 'java.lang.Thread.sleep()' },
//           { id: 25, name: 'User-Session-Handler', nid: '0x19', state: 'WAITING', priority: 5, daemon: false, stackTrace: 'java.util.concurrent.CountDownLatch.await()' },
//           { id: 26, name: 'Log-Writer-1', nid: '0x1a', state: 'RUNNABLE', priority: 2, daemon: true, stackTrace: 'java.io.FileOutputStream.write()' }
//         ]
//       }

//     default:
//       return {
//         icon: <Activity className="w-8 h-8" />,
//         color: 'gray',
//         value: 'N/A',
//         description: 'Metric details not available',
//         details: {},
//         metrics: [],
//         insights: [],
//         threadData: []
//       }
//   }
// }

// const getColorClasses = (color: string) => {
//   switch (color) {
//     case 'blue':
//       return {
//         bg: 'bg-blue-50',
//         border: 'border-blue-200',
//         text: 'text-blue-600',
//         badge: 'bg-blue-100 text-blue-800'
//       }
//     case 'green':
//       return {
//         bg: 'bg-green-50',
//         border: 'border-green-200',
//         text: 'text-green-600',
//         badge: 'bg-green-100 text-green-800'
//       }
//     case 'orange':
//       return {
//         bg: 'bg-orange-50',
//         border: 'border-orange-200',
//         text: 'text-orange-600',
//         badge: 'bg-orange-100 text-orange-800'
//       }
//     case 'red':
//       return {
//         bg: 'bg-red-50',
//         border: 'border-red-200',
//         text: 'text-red-600',
//         badge: 'bg-red-100 text-red-800'
//       }
//     case 'purple':
//       return {
//         bg: 'bg-purple-50',
//         border: 'border-purple-200',
//         text: 'text-purple-600',
//         badge: 'bg-purple-100 text-purple-800'
//       }
//     default:
//       return {
//         bg: 'bg-gray-50',
//         border: 'border-gray-200',
//         text: 'text-gray-600',
//         badge: 'bg-gray-100 text-gray-800'
//       }
//   }
// }

// // Thread state styling function matching DashboardOverview
// const getThreadStateStyles = (state: string) => {
//   switch (state) {
//     case 'RUNNABLE':
//       return {
//         bgHover: 'hover:bg-green-50',
//         borderHover: 'hover:border-l-green-500',
//         textAccent: 'text-green-600',
//         dotColor: 'bg-green-500',
//         badgeClass: 'bg-green-100 text-green-800 border-green-200'
//       }
//     case 'WAITING':
//       return {
//         bgHover: 'hover:bg-amber-50',
//         borderHover: 'hover:border-l-amber-500',
//         textAccent: 'text-amber-600',
//         dotColor: 'bg-amber-500',
//         badgeClass: 'bg-amber-100 text-amber-800 border-amber-200'
//       }
//     case 'BLOCKED':
//       return {
//         bgHover: 'hover:bg-red-50',
//         borderHover: 'hover:border-l-red-500',
//         textAccent: 'text-red-600',
//         dotColor: 'bg-red-500',
//         badgeClass: 'bg-red-100 text-red-800 border-red-200'
//       }
//     case 'TIMED_WAITING':
//       return {
//         bgHover: 'hover:bg-blue-50',
//         borderHover: 'hover:border-l-blue-500',
//         textAccent: 'text-blue-600',
//         dotColor: 'bg-blue-500',
//         badgeClass: 'bg-blue-100 text-blue-800 border-blue-200'
//       }
//     case 'STUCK':
//       return {
//         bgHover: 'hover:bg-red-50',
//         borderHover: 'hover:border-l-red-500',
//         textAccent: 'text-red-600',
//         dotColor: 'bg-red-500',
//         badgeClass: 'bg-red-100 text-red-800 border-red-200'
//       }
//     default:
//       return {
//         bgHover: 'hover:bg-gray-50',
//         borderHover: 'hover:border-l-gray-500',
//         textAccent: 'text-gray-600',
//         dotColor: 'bg-gray-500',
//         badgeClass: 'bg-gray-100 text-gray-800 border-gray-200'
//       }
//   }
// }

// export function MetricDetailsModal({ isOpen, onClose, metricTitle , threads  }: MetricDetailsModalProps) {

//   const metric = getMetricDetails(metricTitle , threads)
//   const colors = getColorClasses(metric.color)
  
//   // Pagination state for Total Threads modal
//   const [currentPage, setCurrentPage] = React.useState(0)
//   const threadsPerPage = 20
  
//   // Separate daemon and non-daemon threads for the daemon modal
//   const isDaemonModal = metricTitle === 'Daemon and Non-Daemon'
//   const daemonThreads = isDaemonModal ? metric.threadData.filter(thread => thread.daemon) : []
//   const nonDaemonThreads = isDaemonModal ? metric.threadData.filter(thread => !thread.daemon) : []
  
//   // Calculate pagination for Total Threads
//   const isPaginationEnabled = metricTitle === 'Total Threads'
//   const totalPages = isPaginationEnabled ? Math.ceil(metric.threadData.length / threadsPerPage) : 1
//   const startIndex = isPaginationEnabled ? currentPage * threadsPerPage : 0
//   const endIndex = isPaginationEnabled ? startIndex + threadsPerPage : metric.threadData.length
//   const currentThreads = metric.threadData.slice(startIndex, endIndex)
  
//   // Reset pagination when modal opens or metric changes
//   React.useEffect(() => {
//     if (isOpen) {
//       setCurrentPage(0)
//     }
//   }, [isOpen, metricTitle])

//   // Helper function to render a thread table
//   const renderThreadTable = (threads: any[], title?: string, showDaemonColumn = true) => (
//     <div className="space-y-4">
//       {title && (
//         <div className="flex items-center space-x-3">
//           <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
//           <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-gray-700">
//             {threads.length} threads
//           </div>
//         </div>
//       )}
      
//       <div className="overflow-x-auto rounded-xl border border-gray-200/50 bg-white/50 backdrop-blur-sm">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200/60">
//               <TableHead className="font-bold text-gray-800 py-4">Thread ID</TableHead>
//               <TableHead className="font-bold text-gray-800 py-4">Thread Name</TableHead>
//               <TableHead className="font-bold text-gray-800 py-4">NID</TableHead>
//               <TableHead className="font-bold text-gray-800 py-4">State</TableHead>
//               <TableHead className="font-bold text-gray-800 py-4">Priority</TableHead>
//               {showDaemonColumn && <TableHead className="font-bold text-gray-800 py-4">Daemon</TableHead>}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {threads.map((thread, index) => {
//               const stateStyles = getThreadStateStyles(thread.state)
//               return (
//                 <motion.tr
//                   key={thread.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 + index * 0.05 }}
//                   className={`border-b border-gray-100 border-l-4 border-l-transparent ${stateStyles.bgHover} ${stateStyles.borderHover} transition-all duration-300 group cursor-pointer hover:shadow-md`}
//                 >
//                   <TableCell className="py-4 px-4">
//                     <div className="flex items-center space-x-2">
//                       <div className={`w-2 h-2 ${stateStyles.dotColor} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`}></div>
//                       <span className={`font-mono text-sm font-medium ${stateStyles.textAccent}`}>{thread.id}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="py-4 px-4">
//                     <div className="flex flex-col">
//                       <span className={`font-semibold text-gray-800 group-hover:${stateStyles.textAccent} transition-colors`}>
//                         {thread.name}
//                       </span>
//                       <span className="text-xs text-gray-500 mt-1">
//                         Priority: {thread.priority} • Daemon: {thread.daemon ? 'Yes' : 'No'}
//                       </span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="py-4 px-4">
//                     <span className={`font-mono text-sm bg-gray-100 px-2 py-1 rounded group-hover:${stateStyles.badgeClass.split(' ')[0]} transition-colors`}>
//                       {thread.nid}
//                     </span>
//                   </TableCell>
//                   <TableCell className="py-4 px-4">
//                     <Badge 
//                       className={`font-medium shadow-sm border ${stateStyles.badgeClass} group-hover:scale-105 transition-all duration-200`}
//                     >
//                       {thread.state}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="py-4 px-4">
//                     <span className={`font-medium text-gray-800 group-hover:${stateStyles.textAccent} transition-colors`}>{thread.priority}</span>
//                   </TableCell>
//                   {showDaemonColumn && (
//                     <TableCell className="py-4 px-4">
//                       <Badge 
//                         variant={thread.daemon ? 'outline' : 'default'}
//                         className={`text-xs font-semibold shadow-sm group-hover:scale-105 transition-all duration-200`}
//                       >
//                         {thread.daemon ? 'Yes' : 'No'}
//                       </Badge>
//                     </TableCell>
//                   )}
//                 </motion.tr>
//               )
//             })}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
  
//   const handleNextPage = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage(prev => prev + 1)
//     }
//   }
  
//   const handlePrevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(prev => prev - 1)
//     }
//   }

//   console.log('Modal render - isOpen:', isOpen, 'metricTitle:', metricTitle)

//   return (
//     <AnimatePresence>
//       {isOpen && (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
//       {/* Enhanced Backdrop with animated pattern */}
//       <motion.div
//         className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/80 backdrop-blur-md"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//       >
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
//       </motion.div>
      
//       {/* Enhanced Modal */}
//       <motion.div
//         className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-2xl border border-gray-200/50 max-w-5xl max-h-[92vh] overflow-hidden mx-4 w-full z-10"
//         initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: -15 }}
//         animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
//         exit={{ opacity: 0, scale: 0.9, y: 30, rotateX: -15 }}
//         transition={{ type: "spring", stiffness: 260, damping: 20 }}
//         onClick={(e) => e.stopPropagation()}
//         style={{ 
//           boxShadow: `
//             0 25px 50px -12px rgba(0, 0, 0, 0.25),
//             0 0 0 1px rgba(255, 255, 255, 0.1),
//             inset 0 1px 0 0 rgba(255, 255, 255, 0.1)
//           `
//         }}
//       >
//         {/* Decorative gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-gray-100/30 pointer-events-none" />
        
//         {/* Content wrapper with custom scrollbar */}
//         <div className="relative max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
//           {/* Enhanced Header */}
//           <div className="relative p-8 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/80 via-white to-gray-50/80">
//             {/* Background decoration */}
//             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50/30 via-transparent to-purple-50/20" />
            
//             <div className="relative flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 {/* Enhanced icon container */}
//                 <motion.div 
//                   className={`p-4 rounded-2xl ${colors.bg} ${colors.border} border-2 relative overflow-hidden group`}
//                   whileHover={{ scale: 1.05, rotate: 5 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 25 }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
//                   <span className={`${colors.text} relative z-10`}>
//                     {metric.icon}
//                   </span>
                  
//                   {/* Animated glow effect */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </motion.div>
                
//                 <div className="space-y-2">
//                   <motion.h2 
//                     className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 }}
//                   >
//                     {metricTitle}
//                   </motion.h2>
//                   <motion.p 
//                     className="text-gray-600 max-w-md leading-relaxed"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     {metric.description}
//                   </motion.p>
                  
//                   {/* Value indicator */}
//                   <motion.div 
//                     className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.badge} shadow-sm`}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.3 }}
//                   >
//                     Current Value: {metric.value}
//                   </motion.div>
//                 </div>
//               </div>
              
//               {/* Enhanced Close Button */}
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={onClose}
//                   className="h-10 w-10 rounded-full border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-200 shadow-sm"
//                 >
//                   <X className="w-4 h-4" />
//                 </Button>
//               </motion.div>
//             </div>
//           </div>

//           {/* Enhanced Content */}
//           <div className="p-8 space-y-8">




//             {/* Enhanced Thread Details Table */}
//             {metric.threadData && metric.threadData.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4, duration: 0.5 }}
//               >
//                 <Card className="p-6 bg-gradient-to-br from-white via-purple-50/20 to-white border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
//                   <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center space-x-3">
//                       <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg text-white shadow-md">
//                         <Database className="w-5 h-5" />
//                       </div>
//                       <div>
//                         <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                           Thread Details
//                         </h3>
//                         {isPaginationEnabled && (
//                           <p className="text-sm text-gray-600 mt-1">
//                             Showing {startIndex + 1}-{Math.min(endIndex, metric.threadData.length)} of {metric.threadData.length} threads
//                           </p>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center space-x-4">
//                       {/* Pagination Controls for Total Threads */}
//                       {isPaginationEnabled && totalPages > 1 && (
//                         <div className="flex items-center space-x-2">
//                           <motion.button
//                             onClick={handlePrevPage}
//                             disabled={currentPage === 0}
//                             className={`p-2 rounded-lg border transition-all duration-200 ${
//                               currentPage === 0
//                                 ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
//                                 : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400'
//                             }`}
//                             whileHover={currentPage > 0 ? { scale: 1.05 } : {}}
//                             whileTap={currentPage > 0 ? { scale: 0.95 } : {}}
//                           >
//                             <ChevronLeft className="w-4 h-4" />
//                           </motion.button>
                          
//                           <div className="flex items-center space-x-1">
//                             <span className="text-sm font-medium text-gray-700">
//                               Page {currentPage + 1} of {totalPages}
//                             </span>
//                           </div>
                          
//                           <motion.button
//                             onClick={handleNextPage}
//                             disabled={currentPage === totalPages - 1}
//                             className={`p-2 rounded-lg border transition-all duration-200 ${
//                               currentPage === totalPages - 1
//                                 ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
//                                 : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400'
//                             }`}
//                             whileHover={currentPage < totalPages - 1 ? { scale: 1.05 } : {}}
//                             whileTap={currentPage < totalPages - 1 ? { scale: 0.95 } : {}}
//                           >
//                             <ChevronRight className="w-4 h-4" />
//                           </motion.button>
//                         </div>
//                       )}
                      
//                       <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-gray-700">
//                         {isPaginationEnabled 
//                           ? `${currentThreads.length} of ${metric.threadData.length} threads`
//                           : `${metric.threadData.length} threads`
//                         }
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Conditional rendering: separate tables for daemon modal or single table for others */}
//                   {isDaemonModal ? (
//                     <div className="space-y-8">
//                       {/* Daemon Threads Table */}
//                       {renderThreadTable(daemonThreads, "Daemon Threads (Background)", false)}
                      
//                       {/* Non-Daemon Threads Table */}
//                       {renderThreadTable(nonDaemonThreads, "Non-Daemon Threads (Application)", false)}
//                     </div>
//                   ) : (
//                     renderThreadTable(currentThreads)
//                   )}
                  
//                   {/* Bottom Pagination for Total Threads */}
//                   {isPaginationEnabled && totalPages > 1 && (
//                     <div className="mt-6 flex items-center justify-between">
//                       <div className="text-sm text-gray-500">
//                         Showing {startIndex + 1} to {Math.min(endIndex, metric.threadData.length)} of {metric.threadData.length} entries
//                       </div>
                      
//                       <div className="flex items-center space-x-2">
//                         <motion.button
//                           onClick={handlePrevPage}
//                           disabled={currentPage === 0}
//                           className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
//                             currentPage === 0
//                               ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
//                               : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md'
//                           }`}
//                           whileHover={currentPage > 0 ? { scale: 1.02 } : {}}
//                           whileTap={currentPage > 0 ? { scale: 0.98 } : {}}
//                         >
//                           <ChevronLeft className="w-4 h-4 mr-1 inline" />
//                           Previous
//                         </motion.button>
                        
//                         {/* Page numbers */}
//                         <div className="flex items-center space-x-1">
//                           {Array.from({ length: totalPages }, (_, i) => (
//                             <motion.button
//                               key={i}
//                               onClick={() => setCurrentPage(i)}
//                               className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center ${
//                                 currentPage === i
//                                   ? 'bg-blue-500 text-white shadow-md'
//                                   : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
//                               }`}
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                             >
//                               {i + 1}
//                             </motion.button>
//                           ))}
//                         </div>
                        
//                         <motion.button
//                           onClick={handleNextPage}
//                           disabled={currentPage === totalPages - 1}
//                           className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
//                             currentPage === totalPages - 1
//                               ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
//                               : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md'
//                           }`}
//                           whileHover={currentPage < totalPages - 1 ? { scale: 1.02 } : {}}
//                           whileTap={currentPage < totalPages - 1 ? { scale: 0.98 } : {}}
//                         >
//                           Next
//                           <ChevronRight className="w-4 h-4 ml-1 inline" />
//                         </motion.button>
//                       </div>
//                     </div>
//                   )}
//                 </Card>
//               </motion.div>
//             )}



//             {/* Enhanced Action Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 }}
//               className="flex justify-between items-center pt-8 border-t border-gray-200/50 mt-8"
//             >
//               <div className="flex items-center space-x-3 text-sm text-gray-500">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-green-400 rounded-full" />
//                   <span>Live Data</span>
//                 </div>
//                 <span>•</span>
//                 <span>Last updated: just now</span>
//               </div>
              
//               <div className="flex items-center space-x-3">
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <Button 
//                     onClick={onClose}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
//                   >
//                     Close
//                   </Button>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//       )}
//     </AnimatePresence>
//   )
// }

import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription 
} from './ui/alert-dialog'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { 
  Users, 
  Cpu, 
  AlertTriangle, 
  Lock, 
  Clock, 
  Brain,
  Activity,
  X,
  AlertCircle,
  CheckCircle,
  Database,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface Thread {
  id: number
  name: string
  nid: string
  state: string
  priority: number
  daemon: boolean
  stackTrace?: string
}

interface PerformanceMetrics {
  [key: string]: any
}

interface Summary {
  totalThreads: number
  deadlocks: number
  blockedThreads: number
  cpuUsage: number
  totalDaemonThreads: number
  totalNonDaemonThreads: number
  totalRunnableThreads: number
  avgResponseTime: number
  threadStates: Record<string, number>
  totalThreadStates: number
  performanceMetrics: PerformanceMetrics
  threads: Thread[]
  runnableThreads: Thread[]
  waitingBlockedThreads: Thread[]
  deadlockedThreads: Thread[]
  stuckThreads: Thread[]
  daemonThreads: Thread[]
  nonDaemonThreads: Thread[]
}

interface MetricDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  metricTitle: string
  threads: Summary
}

const getMetricDetails = (metricTitle: string, summary: Summary) => {
  switch (metricTitle) {
    case 'Total Threads':
      return {
        icon: <Users className="w-8 h-8" />,
        color: 'blue',
        value: summary.totalThreads,
        description: 'Total number of threads currently running in the application',
        details: {
          'Active Threads': summary.threads.filter(t => t.state === 'RUNNABLE').length,
          'Blocked Threads': summary.blockedThreads,
          'Daemon Threads': summary.totalDaemonThreads,
          'Non-Daemon Threads': summary.totalNonDaemonThreads
        },
        metrics: [
          { label: 'Runnable', value: summary.totalRunnableThreads, total: summary.totalThreads, color: 'bg-green-500' },
          { label: 'Blocked/Waiting', value: summary.blockedThreads, total: summary.totalThreads, color: 'bg-yellow-500' },
          { label: 'Other States', value: summary.totalThreads - summary.totalRunnableThreads - summary.blockedThreads, total: summary.totalThreads, color: 'bg-blue-500' }
        ],
        insights: [
          'Thread count is within normal operating range',
          `${summary.totalRunnableThreads} threads actively running`,
          `${summary.blockedThreads} threads waiting for resources`
        ],
        threadData: summary.threads
      }

    case 'Runnable Threads':
      return {
        icon: <Cpu className="w-8 h-8" />,
        color: 'green',
        value: summary.totalRunnableThreads,
        description: 'Threads that are ready to execute and consuming CPU resources',
        details: {
          'Total Runnable': summary.totalRunnableThreads,
          'CPU Usage': `${summary.cpuUsage.toFixed(1)}%`,
          'Avg Response Time': `${summary.avgResponseTime.toFixed(2)}ms`,
          'Daemon Runnable': summary.runnableThreads.filter(t => t.daemon).length
        },
        metrics: [
          { label: 'High Priority (7-10)', value: summary.runnableThreads.filter(t => t.priority >= 7).length, total: summary.totalRunnableThreads, color: 'bg-red-500' },
          { label: 'Medium Priority (4-6)', value: summary.runnableThreads.filter(t => t.priority >= 4 && t.priority < 7).length, total: summary.totalRunnableThreads, color: 'bg-yellow-500' },
          { label: 'Low Priority (1-3)', value: summary.runnableThreads.filter(t => t.priority < 4).length, total: summary.totalRunnableThreads, color: 'bg-green-500' }
        ],
        insights: [
          `${summary.totalRunnableThreads} threads actively consuming CPU`,
          `Average response time: ${summary.avgResponseTime.toFixed(2)}ms`,
          'Most threads are utilizing CPU effectively'
        ],
        threadData: summary.runnableThreads
      }

    case 'Blocked/waiting/timed-waiting Threads':
      return {
        icon: <AlertTriangle className="w-8 h-8" />,
        color: 'orange',
        value: summary.blockedThreads,
        description: 'Threads waiting for resources, synchronization, or I/O operations',
        details: {
          'BLOCKED': summary.threadStates['BLOCKED'] || 0,
          'WAITING': summary.threadStates['WAITING'] || 0,
          'TIMED_WAITING': summary.threadStates['TIMED_WAITING'] || 0,
          'Total': summary.blockedThreads
        },
        metrics: [
          { label: 'Blocked', value: summary.threadStates['BLOCKED'] || 0, total: summary.blockedThreads, color: 'bg-red-500' },
          { label: 'Waiting', value: summary.threadStates['WAITING'] || 0, total: summary.blockedThreads, color: 'bg-yellow-500' },
          { label: 'Timed Waiting', value: summary.threadStates['TIMED_WAITING'] || 0, total: summary.blockedThreads, color: 'bg-orange-500' }
        ],
        insights: [
          `${summary.blockedThreads} threads waiting for resources`,
          'Monitor for potential deadlocks',
          'Check I/O operations and lock contention'
        ],
        threadData: summary.waitingBlockedThreads
      }

    case 'Deadlock Threads':
      return {
        icon: <Lock className="w-8 h-8" />,
        color: 'red',
        value: summary.deadlocks,
        description: 'Threads involved in deadlock situations that require immediate attention',
        details: {
          'Active Deadlocks': summary.deadlocks,
          'Affected Threads': summary.deadlockedThreads.length,
          'Priority': summary.deadlocks > 0 ? 'CRITICAL' : 'Normal',
          'Status': summary.deadlocks > 0 ? 'Action Required' : 'Healthy'
        },
        metrics: [
          { label: 'Deadlocked Threads', value: summary.deadlockedThreads.length, total: Math.max(summary.deadlockedThreads.length, 1), color: 'bg-red-500' }
        ],
        insights: [
          summary.deadlocks > 0 ? 'Critical: Active deadlock detected' : 'No deadlocks detected',
          summary.deadlocks > 0 ? 'Immediate intervention required' : 'System is healthy',
          `${summary.deadlockedThreads.length} threads affected`
        ],
        threadData: summary.deadlockedThreads
      }

    case 'Stuck Threads':
      return {
        icon: <Clock className="w-8 h-8" />,
        color: 'purple',
        value: summary.stuckThreads.length,
        description: 'Long-running threads that may be unresponsive or performing intensive operations',
        details: {
          'Total Stuck': summary.stuckThreads.length,
          'High Priority Stuck': summary.stuckThreads.filter(t => t.priority >= 7).length,
          'Daemon Stuck': summary.stuckThreads.filter(t => t.daemon).length,
          'Non-Daemon Stuck': summary.stuckThreads.filter(t => !t.daemon).length
        },
        metrics: [
          { label: 'HTTP Handlers', value: summary.stuckThreads.filter(t => t.name.toLowerCase().includes('http')).length, total: summary.stuckThreads.length, color: 'bg-purple-500' },
          { label: 'Background Tasks', value: summary.stuckThreads.filter(t => t.daemon).length, total: summary.stuckThreads.length, color: 'bg-blue-500' },
          { label: 'Other', value: summary.stuckThreads.filter(t => !t.name.toLowerCase().includes('http') && !t.daemon).length, total: summary.stuckThreads.length, color: 'bg-red-500' }
        ],
        insights: [
          `${summary.stuckThreads.length} threads running longer than expected`,
          'Possible infinite loops or slow operations',
          'Review thread stack traces for issues'
        ],
        threadData: summary.stuckThreads
      }

    case 'Daemon and Non-Daemon':
      return {
        icon: <Brain className="w-8 h-8" />,
        color: 'blue',
        value: `${summary.totalDaemonThreads}:${summary.totalNonDaemonThreads}`,
        description: 'Distribution between daemon threads (background) and non-daemon threads (application)',
        details: {
          'Daemon Threads': summary.totalDaemonThreads,
          'Non-Daemon Threads': summary.totalNonDaemonThreads,
          'Daemon Ratio': `${((summary.totalDaemonThreads / summary.totalThreads) * 100).toFixed(1)}%`,
          'Non-Daemon Ratio': `${((summary.totalNonDaemonThreads / summary.totalThreads) * 100).toFixed(1)}%`
        },
        metrics: [
          { label: 'Daemon Threads', value: summary.totalDaemonThreads, total: summary.totalThreads, color: 'bg-blue-500' },
          { label: 'Non-Daemon Threads', value: summary.totalNonDaemonThreads, total: summary.totalThreads, color: 'bg-green-500' }
        ],
        insights: [
          'Healthy balance between daemon and non-daemon threads',
          `${summary.totalDaemonThreads} background daemon threads`,
          `${summary.totalNonDaemonThreads} application threads`
        ],
        threadData: [...summary.daemonThreads, ...summary.nonDaemonThreads]
      }

    default:
      return {
        icon: <Activity className="w-8 h-8" />,
        color: 'gray',
        value: 'N/A',
        description: 'Metric details not available',
        details: {},
        metrics: [],
        insights: [],
        threadData: []
      }
  }
}

const getColorClasses = (color: string) => {
  switch (color) {
    case 'blue':
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-800'
      }
    case 'green':
      return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-600',
        badge: 'bg-green-100 text-green-800'
      }
    case 'orange':
      return {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-600',
        badge: 'bg-orange-100 text-orange-800'
      }
    case 'red':
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-600',
        badge: 'bg-red-100 text-red-800'
      }
    case 'purple':
      return {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-600',
        badge: 'bg-purple-100 text-purple-800'
      }
    default:
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-600',
        badge: 'bg-gray-100 text-gray-800'
      }
  }
}

const getThreadStateStyles = (state: string) => {
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
    case 'STUCK':
      return {
        bgHover: 'hover:bg-red-50',
        borderHover: 'hover:border-l-red-500',
        textAccent: 'text-red-600',
        dotColor: 'bg-red-500',
        badgeClass: 'bg-red-100 text-red-800 border-red-200'
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
}

export function MetricDetailsModal({ isOpen, onClose, metricTitle, threads }: MetricDetailsModalProps) {
  const metric = React.useMemo(() => getMetricDetails(metricTitle, threads), [metricTitle, threads])
  const colors = React.useMemo(() => getColorClasses(metric.color), [metric.color])
  
  // Global pagination state - applies to all modals
  const [currentPage, setCurrentPage] = React.useState(0)
  const [daemonPage, setDaemonPage] = React.useState(0)
  const [nonDaemonPage, setNonDaemonPage] = React.useState(0)
  const threadsPerPage = 10 // Default items per page
  
  // Separate daemon and non-daemon threads for the daemon modal
  const isDaemonModal = metricTitle === 'Daemon and Non-Daemon'
  const daemonThreads = React.useMemo(() => 
    isDaemonModal ? threads.daemonThreads : [], 
    [isDaemonModal, threads.daemonThreads]
  )
  const nonDaemonThreads = React.useMemo(() => 
    isDaemonModal ? threads.nonDaemonThreads : [], 
    [isDaemonModal, threads.nonDaemonThreads]
  )
  
  // Calculate pagination - applies to all modals
  const totalPages = Math.ceil(metric.threadData.length / threadsPerPage)
  const currentThreads = React.useMemo(() => {
    const startIndex = currentPage * threadsPerPage
    const endIndex = startIndex + threadsPerPage
    return metric.threadData.slice(startIndex, endIndex)
  }, [currentPage, metric.threadData, threadsPerPage])
  
  // Pagination for daemon threads
  const totalDaemonPages = Math.ceil(daemonThreads.length / threadsPerPage)
  const currentDaemonThreads = React.useMemo(() => {
    const startIndex = daemonPage * threadsPerPage
    const endIndex = startIndex + threadsPerPage
    return daemonThreads.slice(startIndex, endIndex)
  }, [daemonPage, daemonThreads, threadsPerPage])
  
  // Pagination for non-daemon threads
  const totalNonDaemonPages = Math.ceil(nonDaemonThreads.length / threadsPerPage)
  const currentNonDaemonThreads = React.useMemo(() => {
    const startIndex = nonDaemonPage * threadsPerPage
    const endIndex = startIndex + threadsPerPage
    return nonDaemonThreads.slice(startIndex, endIndex)
  }, [nonDaemonPage, nonDaemonThreads, threadsPerPage])
  
  // Reset pagination when modal opens or metric changes
  React.useEffect(() => {
    if (isOpen) {
      setCurrentPage(0)
      setDaemonPage(0)
      setNonDaemonPage(0)
    }
  }, [isOpen, metricTitle])

  // Smart pagination number generator
  const getPageNumbers = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i)
    }
    
    const pages: (number | string)[] = []
    
    if (currentPage <= 2) {
      // Near the start: 1 2 3 ... N
      pages.push(0, 1, 2)
      if (totalPages > 3) pages.push('ellipsis-end')
      pages.push(totalPages - 1)
    } else if (currentPage >= totalPages - 3) {
      // Near the end: 1 ... N-2 N-1 N
      pages.push(0)
      if (totalPages > 4) pages.push('ellipsis-start')
      pages.push(totalPages - 3, totalPages - 2, totalPages - 1)
    } else {
      // In the middle: 1 ... current-1 current current+1 ... N
      pages.push(0)
      pages.push('ellipsis-start')
      pages.push(currentPage - 1, currentPage, currentPage + 1)
      pages.push('ellipsis-end')
      pages.push(totalPages - 1)
    }
    
    return pages
  }
  
  // Reusable pagination component
  const PaginationControls = ({ 
    currentPage, 
    totalPages, 
    totalItems,
    onPageChange 
  }: { 
    currentPage: number
    totalPages: number
    totalItems: number
    onPageChange: (page: number) => void 
  }) => {
    if (totalPages <= 1) return null
    
    const startIndex = currentPage * threadsPerPage
    const endIndex = Math.min(startIndex + threadsPerPage, totalItems)
    const pageNumbers = getPageNumbers(currentPage, totalPages)
    
    return (
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to <span className="font-semibold text-gray-900">{endIndex}</span> of <span className="font-semibold text-gray-900">{totalItems}</span> threads
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 flex items-center ${
              currentPage === 0
                ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md'
            }`}
            whileHover={currentPage > 0 ? { scale: 1.02 } : {}}
            whileTap={currentPage > 0 ? { scale: 0.98 } : {}}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Prev
          </motion.button>
          
          <div className="flex items-center space-x-1">
            {pageNumbers.map((page, index) => {
              if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                    …
                  </span>
                )
              }
              
              const pageNum = page as number
              return (
                <motion.button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {pageNum + 1}
                </motion.button>
              )
            })}
          </div>
          
          <motion.button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 flex items-center ${
              currentPage === totalPages - 1
                ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md'
            }`}
            whileHover={currentPage < totalPages - 1 ? { scale: 1.02 } : {}}
            whileTap={currentPage < totalPages - 1 ? { scale: 0.98 } : {}}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </motion.button>
        </div>
      </div>
    )
  }

  // Helper function to render a thread table with pagination
  const renderThreadTable = React.useCallback((
    threads: Thread[], 
    title?: string, 
    showDaemonColumn = true,
    currentPage = 0,
    totalPages = 1,
    totalItems = 0,
    onPageChange?: (page: number) => void
  ) => (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center space-x-3">
          <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
          <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-gray-700">
            {totalItems} threads
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto rounded-xl border border-gray-200/50 bg-white/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200/60">
              <TableHead className="font-bold text-gray-800 py-4">Thread ID</TableHead>
              <TableHead className="font-bold text-gray-800 py-4">Thread Name</TableHead>
              <TableHead className="font-bold text-gray-800 py-4">NID</TableHead>
              <TableHead className="font-bold text-gray-800 py-4">State</TableHead>
              <TableHead className="font-bold text-gray-800 py-4">Priority</TableHead>
              {showDaemonColumn && <TableHead className="font-bold text-gray-800 py-4">Daemon</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {threads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={showDaemonColumn ? 6 : 5} className="text-center py-8 text-gray-500">
                  No threads to display
                </TableCell>
              </TableRow>
            ) : (
              threads.map((thread, index) => {
                const stateStyles = getThreadStateStyles(thread.state)
                return (
                  <motion.tr
                    key={`${thread.id}-${thread.name}-${currentPage}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    className={`border-b border-gray-100 border-l-4 border-l-transparent ${stateStyles.bgHover} ${stateStyles.borderHover} transition-all duration-300 group cursor-pointer hover:shadow-md`}
                  >
                    <TableCell className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 ${stateStyles.dotColor} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                        <span className={`font-mono text-sm font-medium ${stateStyles.textAccent}`}>{thread.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className={`font-semibold text-gray-800 group-hover:${stateStyles.textAccent} transition-colors`}>
                          {thread.name}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          Priority: {thread.priority} • Daemon: {thread.daemon ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <span className={`font-mono text-sm bg-gray-100 px-2 py-1 rounded group-hover:${stateStyles.badgeClass.split(' ')[0]} transition-colors`}>
                        {thread.nid}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <Badge 
                        className={`font-medium shadow-sm border ${stateStyles.badgeClass} group-hover:scale-105 transition-all duration-200`}
                      >
                        {thread.state}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <span className={`font-medium text-gray-800 group-hover:${stateStyles.textAccent} transition-colors`}>{thread.priority}</span>
                    </TableCell>
                    {showDaemonColumn && (
                      <TableCell className="py-4 px-4">
                        <Badge 
                          variant={thread.daemon ? 'outline' : 'default'}
                          className={`text-xs font-semibold shadow-sm group-hover:scale-105 transition-all duration-200`}
                        >
                          {thread.daemon ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                    )}
                  </motion.tr>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination for each table */}
      {onPageChange && totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      )}
    </div>
  ), [threadsPerPage])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Enhanced Backdrop with animated pattern */}
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/40" />
          </motion.div>
          
          {/* Enhanced Modal */}
          <motion.div
            className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-2xl border border-gray-200/50 max-w-5xl max-h-[92vh] overflow-hidden mx-4 w-full z-10"
            initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30, rotateX: -15 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{ 
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 0 rgba(255, 255, 255, 0.1)
              `
            }}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-gray-100/30 pointer-events-none" />
            
            {/* Content wrapper with custom scrollbar */}
            <div className="relative max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
              {/* Enhanced Header */}
              <div className="relative p-8 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/80 via-white to-gray-50/80">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50/30 via-transparent to-purple-50/20" />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Enhanced icon container */}
                    <motion.div 
                      className={`p-4 rounded-2xl ${colors.bg} ${colors.border} border-2 relative overflow-hidden group`}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                      <span className={`${colors.text} relative z-10`}>
                        {metric.icon}
                      </span>
                      
                      {/* Animated glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    
                    <div className="space-y-2">
                      <motion.h2 
                        className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {metricTitle}
                      </motion.h2>
                      <motion.p 
                        className="text-gray-600 max-w-md leading-relaxed"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {metric.description}
                      </motion.p>
                      
                      {/* Value indicator */}
                      <motion.div 
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.badge} shadow-sm`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Current Value: {metric.value}
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Enhanced Close Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onClose}
                      className="h-10 w-10 rounded-full border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-200 shadow-sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Content */}
              <div className="p-8 space-y-8">
                {/* Enhanced Thread Details Table */}
                {metric.threadData && metric.threadData.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Card className="p-6 bg-gradient-to-br from-white via-purple-50/20 to-white border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg text-white shadow-md">
                            <Database className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                              Thread Details
                            </h3>
                          </div>
                        </div>
                        
                        <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-gray-700">
                          {metric.threadData.length} total threads
                        </div>
                      </div>
                      
                      {/* Conditional rendering: separate tables for daemon modal or single table for others */}
                      {isDaemonModal ? (
                        <div className="space-y-8">
                          {/* Daemon Threads Table with Pagination */}
                          {renderThreadTable(
                            currentDaemonThreads, 
                            "Daemon Threads (Background)", 
                            false,
                            daemonPage,
                            totalDaemonPages,
                            daemonThreads.length,
                            setDaemonPage
                          )}
                          
                          {/* Non-Daemon Threads Table with Pagination */}
                          {renderThreadTable(
                            currentNonDaemonThreads, 
                            "Non-Daemon Threads (Application)", 
                            false,
                            nonDaemonPage,
                            totalNonDaemonPages,
                            nonDaemonThreads.length,
                            setNonDaemonPage
                          )}
                        </div>
                      ) : (
                        renderThreadTable(
                          currentThreads,
                          undefined,
                          true,
                          currentPage,
                          totalPages,
                          metric.threadData.length,
                          setCurrentPage
                        )
                      )}
                    </Card>
                  </motion.div>
                )}

                {/* Enhanced Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-between items-center pt-8 border-t border-gray-200/50 mt-8"
                >
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>Live Data</span>
                    </div>
                    <span>•</span>
                    <span>Last updated: just now</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        onClick={onClose}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Close
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}