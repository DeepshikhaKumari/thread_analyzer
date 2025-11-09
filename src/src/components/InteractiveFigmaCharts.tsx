import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Card } from './ui/card'
import svgPaths from "../imports/svg-mim0gjvhpt"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface TooltipData {
  name: string
  value: number
  percentage: string
  color: string
}

interface PerformanceDataPoint {
  time: string
  cpuUsage: number
  memoryUsage: number
  threadCount: number
  responseTime: number
}

interface PerformanceTooltipData {
  metric: string
  value: number
  time: string
  unit: string
  color: string
}

// function InteractiveThreadStatesChart({threads}:any) {
//   const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
//   const [tooltip, setTooltip] = useState<{ data: TooltipData; x: number; y: number } | null>(null)
//   const [isChartReady, setIsChartReady] = useState(false)
 
//   // const segmentData = [
//   //   { id: 'waiting', name: 'WAITING', value: 94, percentage: '38%', color: '#00C49F', hoverColor: '#00E5B8' },
//   //   { id: 'running', name: 'RUNNING', value: 47, percentage: '19%', color: '#0088FE', hoverColor: '#2A9BFF' },
//   //   { id: 'blocked', name: 'BLOCKED', value: 25, percentage: '10%', color: '#FFBB28', hoverColor: '#FFD93A' },
//   //   { id: 'timed_waiting', name: 'TIMED_WAITING', value: 69, percentage: '28%', color: '#FF8042', hoverColor: '#FF9B54' },
//   //   { id: 'terminated', name: 'TERMINATED', value: 12, percentage: '5%', color: '#8884D8', hoverColor: '#A296E8' }
//   // ]
//   const obj = threads?.threadStates || {};

//   // total value (you can also compute it dynamically)
//   const total = Object.values(obj).reduce((a, b) => a + b, 0);

//   // preset colors (you can extend as needed)
//   const colors = [
//     { color: '#00C49F', hoverColor: '#00E5B8' },
//     { color: '#0088FE', hoverColor: '#2A9BFF' },
//     { color: '#FFBB28', hoverColor: '#FFD93A' },
//     { color: '#FF8042', hoverColor: '#FF9B54' },
//     { color: '#8884D8', hoverColor: '#A296E8' }
//   ];

//   // convert the object to segmentData array
//   const segmentData = Object.entries(obj).map(([key, value], index) => {
//     const percentage = ((value / total) * 100).toFixed(1) + '%';
//     return {
//       id: key.toLowerCase(),
//       name: key,
//       value,
//       percentage,
//       color: colors[index % colors.length].color,
//       hoverColor: colors[index % colors.length].hoverColor
//     };
//   });

//   console.log('settings threads', segmentData);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsChartReady(true), 2000)
//     return () => clearTimeout(timer)
//   }, [])

//   const handleSegmentHover = (segment: typeof segmentData[0], event: React.MouseEvent) => {
//     setHoveredSegment(segment.id)

//     setTooltip({
//       data: segment,
//       x: event.clientX,
//       y: event.clientY
//     })
//   }

//   const handleSegmentLeave = () => {
//     setHoveredSegment(null)
//     setTooltip(null)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <Card className="relative hover:shadow-2xl transition-all duration-700 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 border-0 shadow-xl">


//         <div className="p-6 relative overflow-visible">
//           <motion.div
//             className="mb-6"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <motion.h3
//               className="text-xl font-semibold text-gray-900 mb-2"
//               animate={{
//                 textShadow: hoveredSegment ? '0 0 20px rgba(79, 70, 229, 0.3)' : '0 0 0px rgba(79, 70, 229, 0)'
//               }}
//             >
//               Thread States Distribution
//             </motion.h3>
//             <p className="text-sm text-gray-600">Current distribution of thread states in the dump</p>
//           </motion.div>

//           <div className="relative h-[400px] w-full flex items-center justify-center">
//             <div className="relative w-[500px] h-[400px]">


//               {/* Interactive Pie Chart */}
//               <motion.div
//                 className="absolute left-[154px] size-[192px] top-[50px]"
//                 initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
//                 animate={{ scale: 1, opacity: 1, rotate: 0 }}
//                 transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
//               >
//                 <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 193 193">
//                   <defs>
//                     {/* Gradient Definitions */}
//                     {segmentData.map((segment, index) => (
//                       <radialGradient key={segment.id} id={`gradient-${segment.id}`} cx="50%" cy="50%" r="50%">
//                         <stop offset="0%" stopColor={segment.hoverColor} stopOpacity="0.8" />
//                         <stop offset="70%" stopColor={segment.color} stopOpacity="1" />
//                         <stop offset="100%" stopColor={segment.color} stopOpacity="0.9" />
//                       </radialGradient>
//                     ))}

//                     {/* Glow Filter */}
//                     <filter id="glow">
//                       <feGaussianBlur stdDeviation="4" result="coloredBlur" />
//                       <feMerge>
//                         <feMergeNode in="coloredBlur" />
//                         <feMergeNode in="SourceGraphic" />
//                       </feMerge>
//                     </filter>
//                   </defs>

//                   <g>
//                     {/* Background Circle with pulse effect */}
//                     <motion.circle
//                       cx="96.1321"
//                       cy="96.1321"
//                       fill="#F8FAFC"
//                       r="95.6321"
//                       stroke="white"
//                       strokeWidth="3"
//                       initial={{ r: 0, opacity: 0 }}
//                       animate={{
//                         r: 95.6321,
//                         opacity: 1,
//                         strokeWidth: hoveredSegment ? 5 : 3
//                       }}
//                       transition={{ duration: 1, delay: 0.5 }}
//                       filter="url(#glow)"
//                     />

//                     {/* Waiting Segment */}
//                     <motion.g
//                       onMouseEnter={(e) => handleSegmentHover(segmentData[0], e)}
//                       onMouseMove={(e) => {
//                         if (hoveredSegment === 'waiting') {
//                           setTooltip(prev => prev ? {
//                             ...prev,
//                             x: e.clientX,
//                             y: e.clientY
//                           } : null)
//                         }
//                       }}
//                       onMouseLeave={handleSegmentLeave}
//                       className="cursor-pointer"
//                       whileHover={{ scale: 1.08 }}
//                       transition={{ type: "spring", stiffness: 400, damping: 25 }}
//                     >
//                       <mask fill="white" id="path-2-inside-1_189_709">
//                         <path d={svgPaths.p21c99500} />
//                       </mask>
//                       <motion.path
//                         d={svgPaths.p21c99500}
//                         fill={hoveredSegment === 'waiting' ? `url(#gradient-waiting)` : '#00C49F'}
//                         mask="url(#path-2-inside-1_189_709)"
//                         stroke="white"
//                         strokeWidth="3"
//                         initial={{ pathLength: 0, opacity: 0 }}
//                         animate={{
//                           pathLength: 1,
//                           opacity: 1,
//                           strokeWidth: hoveredSegment === 'waiting' ? 5 : 3
//                         }}
//                         transition={{
//                           pathLength: { duration: 2, delay: 0.6, ease: "easeOut" },
//                           opacity: { duration: 0.5, delay: 0.6 },
//                           strokeWidth: { duration: 0.3 }
//                         }}
//                         style={{
//                           filter: hoveredSegment === 'waiting' ? 'url(#glow) drop-shadow(0 0 20px rgba(0, 196, 159, 0.6))' : 'none'
//                         }}
//                       />
//                     </motion.g>

//                     {/* Running Segment */}
//                     <motion.g
//                       onMouseEnter={(e) => handleSegmentHover(segmentData[1], e)}
//                       onMouseMove={(e) => {
//                         if (hoveredSegment === 'running') {
//                           setTooltip(prev => prev ? {
//                             ...prev,
//                             x: e.clientX,
//                             y: e.clientY
//                           } : null)
//                         }
//                       }}
//                       onMouseLeave={handleSegmentLeave}
//                       className="cursor-pointer"
//                       whileHover={{ scale: 1.08 }}
//                       transition={{ type: "spring", stiffness: 400, damping: 25 }}
//                     >
//                       <mask fill="white" id="path-3-inside-2_189_709">
//                         <path d={svgPaths.p25273500} />
//                       </mask>
//                       <motion.path
//                         d={svgPaths.p25273500}
//                         fill={hoveredSegment === 'running' ? `url(#gradient-running)` : '#0088FE'}
//                         mask="url(#path-3-inside-2_189_709)"
//                         stroke="white"
//                         strokeWidth="3"
//                         initial={{ pathLength: 0, opacity: 0 }}
//                         animate={{
//                           pathLength: 1,
//                           opacity: 1,
//                           strokeWidth: hoveredSegment === 'running' ? 5 : 3
//                         }}
//                         transition={{
//                           pathLength: { duration: 2, delay: 0.8, ease: "easeOut" },
//                           opacity: { duration: 0.5, delay: 0.8 },
//                           strokeWidth: { duration: 0.3 }
//                         }}
//                         style={{
//                           filter: hoveredSegment === 'running' ? 'url(#glow) drop-shadow(0 0 20px rgba(0, 136, 254, 0.6))' : 'none'
//                         }}
//                       />
//                     </motion.g>

//                     {/* Blocked Segment */}
//                     <motion.g
//                       onMouseEnter={(e) => handleSegmentHover(segmentData[2], e)}
//                       onMouseMove={(e) => {
//                         if (hoveredSegment === 'blocked') {
//                           setTooltip(prev => prev ? {
//                             ...prev,
//                             x: e.clientX,
//                             y: e.clientY
//                           } : null)
//                         }
//                       }}
//                       onMouseLeave={handleSegmentLeave}
//                       className="cursor-pointer"
//                       whileHover={{ scale: 1.08 }}
//                       transition={{ type: "spring", stiffness: 400, damping: 25 }}
//                     >
//                       <mask fill="white" id="path-4-inside-3_189_709">
//                         <path d={svgPaths.p2b7b3800} />
//                       </mask>
//                       <motion.path
//                         d={svgPaths.p2b7b3800}
//                         fill={hoveredSegment === 'blocked' ? `url(#gradient-blocked)` : '#FFBB28'}
//                         mask="url(#path-4-inside-3_189_709)"
//                         stroke="white"
//                         strokeWidth="3"
//                         initial={{ pathLength: 0, opacity: 0 }}
//                         animate={{
//                           pathLength: 1,
//                           opacity: 1,
//                           strokeWidth: hoveredSegment === 'blocked' ? 5 : 3
//                         }}
//                         transition={{
//                           pathLength: { duration: 2, delay: 1.0, ease: "easeOut" },
//                           opacity: { duration: 0.5, delay: 1.0 },
//                           strokeWidth: { duration: 0.3 }
//                         }}
//                         style={{
//                           filter: hoveredSegment === 'blocked' ? 'url(#glow) drop-shadow(0 0 20px rgba(255, 187, 40, 0.6))' : 'none'
//                         }}
//                       />
//                     </motion.g>

//                     {/* Timed Waiting Segment */}
//                     <motion.g
//                       onMouseEnter={(e) => handleSegmentHover(segmentData[3], e)}
//                       onMouseMove={(e) => {
//                         if (hoveredSegment === 'timed_waiting') {
//                           setTooltip(prev => prev ? {
//                             ...prev,
//                             x: e.clientX,
//                             y: e.clientY
//                           } : null)
//                         }
//                       }}
//                       onMouseLeave={handleSegmentLeave}
//                       className="cursor-pointer"
//                       whileHover={{ scale: 1.08 }}
//                       transition={{ type: "spring", stiffness: 400, damping: 25 }}
//                     >
//                       <mask fill="white" id="path-5-inside-4_189_709">
//                         <path d={svgPaths.p2ecb4470} />
//                       </mask>
//                       <motion.path
//                         d={svgPaths.p2ecb4470}
//                         fill={hoveredSegment === 'timed_waiting' ? `url(#gradient-timed_waiting)` : '#FF8042'}
//                         mask="url(#path-5-inside-4_189_709)"
//                         stroke="white"
//                         strokeWidth="3"
//                         initial={{ pathLength: 0, opacity: 0 }}
//                         animate={{
//                           pathLength: 1,
//                           opacity: 1,
//                           strokeWidth: hoveredSegment === 'timed_waiting' ? 5 : 3
//                         }}
//                         transition={{
//                           pathLength: { duration: 2, delay: 1.2, ease: "easeOut" },
//                           opacity: { duration: 0.5, delay: 1.2 },
//                           strokeWidth: { duration: 0.3 }
//                         }}
//                         style={{
//                           filter: hoveredSegment === 'timed_waiting' ? 'url(#glow) drop-shadow(0 0 20px rgba(255, 128, 66, 0.6))' : 'none'
//                         }}
//                       />
//                     </motion.g>

//                     {/* Terminated Segment */}
//                     <motion.g
//                       onMouseEnter={(e) => handleSegmentHover(segmentData[4], e)}
//                       onMouseMove={(e) => {
//                         if (hoveredSegment === 'terminated') {
//                           setTooltip(prev => prev ? {
//                             ...prev,
//                             x: e.clientX,
//                             y: e.clientY
//                           } : null)
//                         }
//                       }}
//                       onMouseLeave={handleSegmentLeave}
//                       className="cursor-pointer"
//                       whileHover={{ scale: 1.08 }}
//                       transition={{ type: "spring", stiffness: 400, damping: 25 }}
//                     >
//                       <mask fill="white" id="path-6-inside-5_189_709">
//                         <path d={svgPaths.p23e66c00} />
//                       </mask>
//                       <motion.path
//                         d={svgPaths.p23e66c00}
//                         fill={hoveredSegment === 'terminated' ? `url(#gradient-terminated)` : '#8884D8'}
//                         mask="url(#path-6-inside-5_189_709)"
//                         stroke="white"
//                         strokeWidth="3"
//                         initial={{ pathLength: 0, opacity: 0 }}
//                         animate={{
//                           pathLength: 1,
//                           opacity: 1,
//                           strokeWidth: hoveredSegment === 'terminated' ? 5 : 3
//                         }}
//                         transition={{
//                           pathLength: { duration: 2, delay: 1.4, ease: "easeOut" },
//                           opacity: { duration: 0.5, delay: 1.4 },
//                           strokeWidth: { duration: 0.3 }
//                         }}
//                         style={{
//                           filter: hoveredSegment === 'terminated' ? 'url(#glow) drop-shadow(0 0 20px rgba(136, 132, 216, 0.6))' : 'none'
//                         }}
//                       />
//                     </motion.g>
//                   </g>
//                 </svg>
//               </motion.div>

//               {/* Enhanced Interactive Labels with Better Positioning */}
//               <motion.div
//                 className="absolute left-[88px] top-[151px] cursor-pointer group"
//                 initial={{ opacity: 0, x: -30, scale: 0.8 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
//                 onMouseEnter={() => setHoveredSegment('waiting')}
//                 onMouseLeave={() => setHoveredSegment(null)}
//               >
//                 <motion.div
//                   className="relative px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-[#00C49F]/20 shadow-lg"
//                   whileHover={{
//                     scale: 1.1,
//                     x: -12,
//                     backgroundColor: 'rgba(0, 196, 159, 0.1)',
//                     borderColor: 'rgba(0, 196, 159, 0.5)',
//                     boxShadow: '0 10px 30px rgba(0, 196, 159, 0.3)'
//                   }}
//                   animate={{
//                     backgroundColor: hoveredSegment === 'waiting' ? 'rgba(0, 196, 159, 0.15)' : 'rgba(255, 255, 255, 0.8)',
//                     borderColor: hoveredSegment === 'waiting' ? 'rgba(0, 196, 159, 0.6)' : 'rgba(0, 196, 159, 0.2)'
//                   }}
//                 >
//                   <motion.p
//                     className="font-medium text-[#00c49f] text-sm"
//                     animate={{
//                       color: hoveredSegment === 'waiting' ? '#00E5B8' : '#00c49f',
//                       textShadow: hoveredSegment === 'waiting' ? '0 0 12px rgba(0, 196, 159, 0.6)' : '0 0 0px rgba(0, 196, 159, 0)'
//                     }}
//                   >
//                     WAITING 38%
//                   </motion.p>
//                   <motion.div
//                     className="absolute -left-1 top-1/2 w-3 h-3 bg-[#00C49F] rounded-full transform -translate-y-1/2"
//                     animate={{
//                       scale: hoveredSegment === 'waiting' ? [1, 1.5, 1] : 1,
//                       backgroundColor: hoveredSegment === 'waiting' ? '#00E5B8' : '#00C49F'
//                     }}
//                     transition={{ duration: 0.6, repeat: hoveredSegment === 'waiting' ? Infinity : 0 }}
//                   />
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 className="absolute left-[58px] top-[340px] cursor-pointer group"
//                 initial={{ opacity: 0, x: -30, scale: 0.8 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
//                 onMouseEnter={() => setHoveredSegment('blocked')}
//                 onMouseLeave={() => setHoveredSegment(null)}
//               >
//                 <motion.div
//                   className="relative px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-[#FFBB28]/20 shadow-lg"
//                   whileHover={{
//                     scale: 1.1,
//                     x: -12,
//                     backgroundColor: 'rgba(255, 187, 40, 0.1)',
//                     borderColor: 'rgba(255, 187, 40, 0.5)',
//                     boxShadow: '0 10px 30px rgba(255, 187, 40, 0.3)'
//                   }}
//                   animate={{
//                     backgroundColor: hoveredSegment === 'blocked' ? 'rgba(255, 187, 40, 0.15)' : 'rgba(255, 255, 255, 0.8)',
//                     borderColor: hoveredSegment === 'blocked' ? 'rgba(255, 187, 40, 0.6)' : 'rgba(255, 187, 40, 0.2)'
//                   }}
//                 >
//                   <motion.p
//                     className="font-medium text-[#ffbb28] text-sm"
//                     animate={{
//                       color: hoveredSegment === 'blocked' ? '#FFD93A' : '#ffbb28',
//                       textShadow: hoveredSegment === 'blocked' ? '0 0 12px rgba(255, 187, 40, 0.6)' : '0 0 0px rgba(255, 187, 40, 0)'
//                     }}
//                   >
//                     BLOCKED 10%
//                   </motion.p>
//                   <motion.div
//                     className="absolute -left-1 top-1/2 w-3 h-3 bg-[#FFBB28] rounded-full transform -translate-y-1/2"
//                     animate={{
//                       scale: hoveredSegment === 'blocked' ? [1, 1.5, 1] : 1,
//                       backgroundColor: hoveredSegment === 'blocked' ? '#FFD93A' : '#FFBB28'
//                     }}
//                     transition={{ duration: 0.6, repeat: hoveredSegment === 'blocked' ? Infinity : 0 }}
//                   />
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 className="absolute right-[98px] top-[119px] cursor-pointer group"
//                 initial={{ opacity: 0, x: 30, scale: 0.8 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 transition={{ delay: 2.0, type: "spring", stiffness: 200 }}
//                 onMouseEnter={() => setHoveredSegment('running')}
//                 onMouseLeave={() => setHoveredSegment(null)}
//               >
//                 <motion.div
//                   className="relative px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-[#0088FE]/20 shadow-lg"
//                   whileHover={{
//                     scale: 1.1,
//                     x: 12,
//                     backgroundColor: 'rgba(0, 136, 254, 0.1)',
//                     borderColor: 'rgba(0, 136, 254, 0.5)',
//                     boxShadow: '0 10px 30px rgba(0, 136, 254, 0.3)'
//                   }}
//                   animate={{
//                     backgroundColor: hoveredSegment === 'running' ? 'rgba(0, 136, 254, 0.15)' : 'rgba(255, 255, 255, 0.8)',
//                     borderColor: hoveredSegment === 'running' ? 'rgba(0, 136, 254, 0.6)' : 'rgba(0, 136, 254, 0.2)'
//                   }}
//                 >
//                   <motion.p
//                     className="font-medium text-[#0088fe] text-sm"
//                     animate={{
//                       color: hoveredSegment === 'running' ? '#2A9BFF' : '#0088fe',
//                       textShadow: hoveredSegment === 'running' ? '0 0 12px rgba(0, 136, 254, 0.6)' : '0 0 0px rgba(0, 136, 254, 0)'
//                     }}
//                   >
//                     RUNNING 19%
//                   </motion.p>
//                   <motion.div
//                     className="absolute -right-1 top-1/2 w-3 h-3 bg-[#0088FE] rounded-full transform -translate-y-1/2"
//                     animate={{
//                       scale: hoveredSegment === 'running' ? [1, 1.5, 1] : 1,
//                       backgroundColor: hoveredSegment === 'running' ? '#2A9BFF' : '#0088FE'
//                     }}
//                     transition={{ duration: 0.6, repeat: hoveredSegment === 'running' ? Infinity : 0 }}
//                   />
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 className="absolute right-[58px] top-[205px] cursor-pointer group"
//                 initial={{ opacity: 0, x: 30, scale: 0.8 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
//                 onMouseEnter={() => setHoveredSegment('terminated')}
//                 onMouseLeave={() => setHoveredSegment(null)}
//               >
//                 <motion.div
//                   className="relative px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-[#8884D8]/20 shadow-lg"
//                   whileHover={{
//                     scale: 1.1,
//                     x: 12,
//                     backgroundColor: 'rgba(136, 132, 216, 0.1)',
//                     borderColor: 'rgba(136, 132, 216, 0.5)',
//                     boxShadow: '0 10px 30px rgba(136, 132, 216, 0.3)'
//                   }}
//                   animate={{
//                     backgroundColor: hoveredSegment === 'terminated' ? 'rgba(136, 132, 216, 0.15)' : 'rgba(255, 255, 255, 0.8)',
//                     borderColor: hoveredSegment === 'terminated' ? 'rgba(136, 132, 216, 0.6)' : 'rgba(136, 132, 216, 0.2)'
//                   }}
//                 >
//                   <motion.p
//                     className="font-medium text-[#8884d8] text-sm"
//                     animate={{
//                       color: hoveredSegment === 'terminated' ? '#A296E8' : '#8884d8',
//                       textShadow: hoveredSegment === 'terminated' ? '0 0 12px rgba(136, 132, 216, 0.6)' : '0 0 0px rgba(136, 132, 216, 0)'
//                     }}
//                   >
//                     TERMINATED 5%
//                   </motion.p>
//                   <motion.div
//                     className="absolute -right-1 top-1/2 w-3 h-3 bg-[#8884D8] rounded-full transform -translate-y-1/2"
//                     animate={{
//                       scale: hoveredSegment === 'terminated' ? [1, 1.5, 1] : 1,
//                       backgroundColor: hoveredSegment === 'terminated' ? '#A296E8' : '#8884D8'
//                     }}
//                     transition={{ duration: 0.6, repeat: hoveredSegment === 'terminated' ? Infinity : 0 }}
//                   />
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 className="absolute right-[108px] top-[340px] cursor-pointer group"
//                 initial={{ opacity: 0, x: 30, scale: 0.8 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 transition={{ delay: 2.4, type: "spring", stiffness: 200 }}
//                 onMouseEnter={() => setHoveredSegment('timed_waiting')}
//                 onMouseLeave={() => setHoveredSegment(null)}
//               >
//                 <motion.div
//                   className="relative px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-[#FF8042]/20 shadow-lg"
//                   whileHover={{
//                     scale: 1.1,
//                     x: 12,
//                     backgroundColor: 'rgba(255, 128, 66, 0.1)',
//                     borderColor: 'rgba(255, 128, 66, 0.5)',
//                     boxShadow: '0 10px 30px rgba(255, 128, 66, 0.3)'
//                   }}
//                   animate={{
//                     backgroundColor: hoveredSegment === 'timed_waiting' ? 'rgba(255, 128, 66, 0.15)' : 'rgba(255, 255, 255, 0.8)',
//                     borderColor: hoveredSegment === 'timed_waiting' ? 'rgba(255, 128, 66, 0.6)' : 'rgba(255, 128, 66, 0.2)'
//                   }}
//                 >
//                   <motion.p
//                     className="font-medium text-[#ff8042] text-sm"
//                     animate={{
//                       color: hoveredSegment === 'timed_waiting' ? '#FF9B54' : '#ff8042',
//                       textShadow: hoveredSegment === 'timed_waiting' ? '0 0 12px rgba(255, 128, 66, 0.6)' : '0 0 0px rgba(255, 128, 66, 0)'
//                     }}
//                   >
//                     TIMED_WAITING 28%
//                   </motion.p>
//                   <motion.div
//                     className="absolute -right-1 top-1/2 w-3 h-3 bg-[#FF8042] rounded-full transform -translate-y-1/2"
//                     animate={{
//                       scale: hoveredSegment === 'timed_waiting' ? [1, 1.5, 1] : 1,
//                       backgroundColor: hoveredSegment === 'timed_waiting' ? '#FF9B54' : '#FF8042'
//                     }}
//                     transition={{ duration: 0.6, repeat: hoveredSegment === 'timed_waiting' ? Infinity : 0 }}
//                   />
//                 </motion.div>
//               </motion.div>
//             </div>
//           </div>

//           {/* Enhanced Tooltip - Fixed Positioning */}
//           <AnimatePresence>
//             {tooltip && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.5, y: 30, rotateX: -30 }}
//                 animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
//                 exit={{ opacity: 0, scale: 0.5, y: 30, rotateX: -30 }}
//                 className="fixed pointer-events-none z-[9999]"
//                 style={{
//                   left: Math.min(tooltip.x + 20, window.innerWidth - 300),
//                   top: Math.max(tooltip.y - 140, 20),
//                   maxWidth: '280px'
//                 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 25 }}
//               >
//                 <motion.div
//                   className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-600/50 backdrop-blur-lg min-w-[200px]"
//                   animate={{
//                     boxShadow: [
//                       '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(59, 130, 246, 0.4)',
//                       '0 25px 50px rgba(0,0,0,0.6), 0 0 30px rgba(147, 51, 234, 0.5)',
//                       '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(59, 130, 246, 0.4)'
//                     ]
//                   }}
//                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                 >
//                   <div className="flex items-center space-x-3 mb-3">
//                     <motion.div
//                       className="w-5 h-5 rounded-full shadow-lg ring-2 ring-white/30 flex-shrink-0"
//                       style={{ backgroundColor: tooltip.data.color }}
//                       animate={{
//                         scale: [1, 1.3, 1],
//                         rotate: [0, 180, 360]
//                       }}
//                       transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                     />
//                     <motion.span
//                       className="font-bold text-white leading-tight"
//                       animate={{
//                         textShadow: [
//                           '0 0 10px rgba(255,255,255,0.5)',
//                           '0 0 20px rgba(255,255,255,0.8)',
//                           '0 0 10px rgba(255,255,255,0.5)'
//                         ]
//                       }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                     >
//                       {tooltip.data.name}
//                     </motion.span>
//                   </div>
//                   <div className="space-y-2 text-sm">
//                     <motion.div
//                       className="flex justify-between items-center"
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.1 }}
//                     >
//                       <span className="text-gray-300">Threads:</span>
//                       <span className="font-bold text-white">{tooltip.data.value}</span>
//                     </motion.div>
//                     <motion.div
//                       className="flex justify-between items-center"
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.2 }}
//                     >
//                       <span className="text-gray-300">Percentage:</span>
//                       <span className="font-bold text-white">{tooltip.data.percentage}</span>
//                     </motion.div>
//                   </div>




//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </Card>
//     </motion.div>
//   )
// }


const InteractiveThreadStatesChart = ({ threads }:any) => {
  // Handle missing or empty data gracefully
  const threadStates = threads?.threadStates || {};

  // Calculate total
  const total = Object.values(threadStates).reduce((a, b) => a + b, 0);

  // Define a fixed color palette (loops automatically)
  const COLORS = [
    { color: '#00C49F', hoverColor: '#00E5B8' },
    { color: '#0088FE', hoverColor: '#2A9BFF' },
    { color: '#FFBB28', hoverColor: '#FFD93A' },
    { color: '#FF8042', hoverColor: '#FF9B54' },
    { color: '#8884D8', hoverColor: '#A296E8' },
    { color: '#A9A9A9', hoverColor: '#C0C0C0' }
  ];

  // Convert object → array for chart
  const segmentData = Object.entries(threadStates).map(([key, value], i) => {
    const percentage = total ? ((value / total) * 100).toFixed(1) + '%' : '0%';
    return {
      id: key.toLowerCase(),
      name: key,
      value,
      percentage,
      color: COLORS[i % COLORS.length].color,
      hoverColor: COLORS[i % COLORS.length].hoverColor
    };
  });

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, payload: data } = payload[0];
      return (
        <div
          style={{
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: '6px 10px'
          }}
        >
          <strong>{name}</strong>
          <div>Value: {value}</div>
          <div>Percentage: {data.percentage}</div>
        </div>
      );
    }
    return null;
  };

  if (!total) {
    return <p>No thread data available</p>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={segmentData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percentage }) => `${name}: ${percentage}`}
          >
            {segmentData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.hoverColor}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

function InteractivePerformanceMetricsChart() {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ data: PerformanceTooltipData; x: number; y: number } | null>(null)
  const [realTimeData, setRealTimeData] = useState<PerformanceDataPoint[]>([])
  const [isRealTime, setIsRealTime] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [isChartReady, setIsChartReady] = useState(false)

  // Chart configuration using CSS custom properties
  const metricsConfig = {
    cpuUsage: {
      color: 'var(--chart-1)',
      hoverColor: '#4F8EFF',
      label: 'CPU Usage',
      unit: '%',
      max: 100
    },
    memoryUsage: {
      color: 'var(--chart-2)',
      hoverColor: '#22C55E',
      label: 'Memory Usage',
      unit: '%',
      max: 100
    },
    threadCount: {
      color: 'var(--chart-3)',
      hoverColor: '#F59E0B',
      label: 'Thread Count',
      unit: ' threads',
      max: 300
    },
    responseTime: {
      color: 'var(--chart-4)',
      hoverColor: '#EF4444',
      label: 'Response Time',
      unit: 'ms',
      max: 500
    }
  }

  // Initialize with sample data
  useEffect(() => {
    const baseData: PerformanceDataPoint[] = [
      { time: '14:00', cpuUsage: 45, memoryUsage: 62, threadCount: 94, responseTime: 120 },
      { time: '14:01', cpuUsage: 52, memoryUsage: 58, threadCount: 89, responseTime: 135 },
      { time: '14:02', cpuUsage: 38, memoryUsage: 71, threadCount: 102, responseTime: 98 },
      { time: '14:03', cpuUsage: 65, memoryUsage: 54, threadCount: 87, responseTime: 156 },
      { time: '14:04', cpuUsage: 44, memoryUsage: 68, threadCount: 95, responseTime: 112 },
      { time: '14:05', cpuUsage: 58, memoryUsage: 49, threadCount: 78, responseTime: 143 },
      { time: '14:06', cpuUsage: 71, memoryUsage: 73, threadCount: 105, responseTime: 178 },
      { time: '14:07', cpuUsage: 35, memoryUsage: 45, threadCount: 82, responseTime: 89 }
    ]

    setRealTimeData(baseData)

    // Start animation sequence
    setTimeout(() => setIsChartReady(true), 1000)
    setTimeout(() => setIsRealTime(true), 3000)
  }, [])

  // Real-time data simulation
  useEffect(() => {
    if (!isRealTime) return

    const interval = setInterval(() => {
      setRealTimeData(prevData => {
        const lastPoint = prevData[prevData.length - 1]
        const now = new Date()
        const timeStr = now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        })

        const newPoint: PerformanceDataPoint = {
          time: timeStr,
          cpuUsage: Math.max(15, Math.min(90, lastPoint.cpuUsage + (Math.random() - 0.5) * 25)),
          memoryUsage: Math.max(20, Math.min(85, lastPoint.memoryUsage + (Math.random() - 0.5) * 20)),
          threadCount: Math.max(60, Math.min(180, lastPoint.threadCount + (Math.random() - 0.5) * 15)),
          responseTime: Math.max(60, Math.min(280, lastPoint.responseTime + (Math.random() - 0.5) * 40))
        }

        return [...prevData.slice(-7), newPoint]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isRealTime])

  // Animation progress tracker
  useEffect(() => {
    if (!isRealTime) return

    const timer = setInterval(() => {
      setAnimationProgress(prev => (prev + 0.8) % 100)
    }, 80)

    return () => clearInterval(timer)
  }, [isRealTime])

  const handleMetricHover = (metric: string, dataPoint: PerformanceDataPoint, event: React.MouseEvent) => {
    const config = metricsConfig[metric as keyof typeof metricsConfig]
    setHoveredMetric(metric)
    setTooltip({
      data: {
        metric: config.label,
        value: dataPoint[metric as keyof PerformanceDataPoint] as number,
        time: dataPoint.time,
        unit: config.unit,
        color: config.color
      },
      x: event.clientX,
      y: event.clientY
    })
  }

  const handleMetricLeave = () => {
    setHoveredMetric(null)
    setTooltip(null)
  }

  // SVG Chart dimensions
  const chartWidth = 700
  const chartHeight = 350
  const padding = 60

  const getXPosition = (index: number) => {
    return padding + (index * (chartWidth - padding * 2)) / (realTimeData.length - 1)
  }

  const getYPosition = (value: number, maxValue: number) => {
    return padding + (chartHeight - padding * 2) - (value / maxValue) * (chartHeight - padding * 2)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="relative hover:shadow-2xl transition-all duration-700 bg-gradient-to-br from-white via-purple-50/20 to-blue-50/20 border-0 shadow-xl">
        {/* Animated Background Waves */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(45deg, 
              rgba(59, 130, 246, 0.08) 0%, 
              rgba(147, 51, 234, 0.08) 25%, 
              rgba(236, 72, 153, 0.08) 50%, 
              rgba(59, 130, 246, 0.08) 75%, 
              rgba(147, 51, 234, 0.08) 100%)`
          }}
          animate={{
            backgroundPosition: [`0% 0%`, `100% 100%`, `0% 0%`]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative overflow-visible py-[0px] py-[11px] px-[23px] px-[21px]">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-3">
              <motion.h3
                className="text-xl font-semibold text-gray-900"
                animate={{
                  textShadow: hoveredMetric ? '0 0 20px rgba(79, 70, 229, 0.3)' : '0 0 0px rgba(79, 70, 229, 0)'
                }}
              >
                Performance Metrics Over Time
              </motion.h3>
              <motion.div
                className={`px-3 py-1 rounded-full text-xs font-medium ${isRealTime
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                animate={{
                  scale: isRealTime ? [1, 1.05, 1] : 1,
                  boxShadow: isRealTime ? [
                    '0 0 0px rgba(34, 197, 94, 0)',
                    '0 0 20px rgba(34, 197, 94, 0.4)',
                    '0 0 0px rgba(34, 197, 94, 0)'
                  ] : '0 0 0px rgba(34, 197, 94, 0)'
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isRealTime ? '● LIVE' : '○ STATIC'}
              </motion.div>
            </div>
            <p className="text-sm text-gray-600">Real-time thread performance monitoring with live updates</p>
          </motion.div>

          {/* Interactive Metrics Legend */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {Object.entries(metricsConfig).map(([metricKey, config], index) => {
              const isHovered = hoveredMetric === metricKey
              const currentValue = realTimeData[realTimeData.length - 1]?.[metricKey as keyof PerformanceDataPoint] || 0

              return (
                <motion.div
                  key={metricKey}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-200/50 cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => setHoveredMetric(metricKey)}
                  onMouseLeave={() => setHoveredMetric(null)}
                  style={{
                    borderColor: isHovered ? config.color : undefined,
                    backgroundColor: isHovered ? `${config.color}10` : undefined,
                    boxShadow: isHovered ? `0 0 25px ${config.color}40` : '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: config.color }}
                    animate={{
                      scale: isHovered ? [1, 1.3, 1] : 1,
                      backgroundColor: isHovered ? config.hoverColor : config.color,
                      boxShadow: isHovered ? `0 0 20px ${config.color}80` : `0 2px 4px ${config.color}40`
                    }}
                    transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
                  />
                  <div className="min-w-0 flex-1">
                    <motion.p
                      className="text-sm font-medium text-gray-900 truncate"
                      animate={{
                        color: isHovered ? config.hoverColor : undefined,
                        textShadow: isHovered ? `0 0 8px ${config.color}60` : 'none'
                      }}
                    >
                      {config.label}
                    </motion.p>
                    <p className="text-xs text-gray-500">
                      {typeof currentValue === 'number' ? currentValue.toFixed(0) : currentValue}{config.unit}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Advanced SVG Line Chart */}
          <div className="relative">
            <motion.svg
              width="100%"
              height="350"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="overflow-visible"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <defs>
                {/* Gradient definitions for each metric */}
                {Object.entries(metricsConfig).map(([key, config]) => (
                  <linearGradient key={`gradient-${key}`} id={`perf-gradient-${key}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={config.color} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={config.color} stopOpacity="0.05" />
                  </linearGradient>
                ))}

                {/* Advanced glow filter */}
                <filter id="performance-glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Grid pattern */}
                <pattern id="performance-grid" width="50" height="35" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 35" fill="none" stroke="#f1f5f9" strokeWidth="1" opacity="0.6" />
                </pattern>
              </defs>

              {/* Background grid */}
              <rect width={chartWidth} height={chartHeight} fill="url(#performance-grid)" />

              {/* Animated background particles */}
              {isChartReady && [...Array(10)].map((_, i) => (
                <motion.circle
                  key={i}
                  r="3"
                  fill={Object.values(metricsConfig)[i % 4].color}
                  opacity="0.4"
                  animate={{
                    cx: [padding + Math.random() * (chartWidth - padding * 2), padding + Math.random() * (chartWidth - padding * 2)],
                    cy: [padding + Math.random() * (chartHeight - padding * 2), padding + Math.random() * (chartHeight - padding * 2)],
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.2, 0.7, 0.2]
                  }}
                  transition={{
                    duration: 8 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                />
              ))}

              {/* Chart lines and areas */}
              {Object.entries(metricsConfig).map(([metricKey, config], index) => {
                const points = realTimeData.map((d, i) => ({
                  x: getXPosition(i),
                  y: getYPosition(d[metricKey as keyof PerformanceDataPoint] as number, config.max)
                }))

                if (points.length < 2) return null

                const pathD = points.reduce((path, point, i) => {
                  if (i === 0) return `M ${point.x} ${point.y}`
                  const prevPoint = points[i - 1]
                  const cpX = (prevPoint.x + point.x) / 2
                  return `${path} Q ${cpX} ${prevPoint.y} ${cpX} ${(prevPoint.y + point.y) / 2} T ${point.x} ${point.y}`
                }, '')

                const areaD = `${pathD} L ${getXPosition(realTimeData.length - 1)} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`

                return (
                  <g key={metricKey}>
                    {/* Gradient Fill Area */}
                    <motion.path
                      d={areaD}
                      fill={`url(#perf-gradient-${metricKey})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: hoveredMetric === metricKey || !hoveredMetric ? 0.8 : 0.3
                      }}
                      transition={{
                        pathLength: { duration: 2.5, delay: 1 + index * 0.3, ease: "easeOut" },
                        opacity: { duration: 0.4 }
                      }}
                    />

                    {/* Main Curved Line */}
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke={hoveredMetric === metricKey ? config.hoverColor : config.color}
                      strokeWidth={hoveredMetric === metricKey ? 5 : 3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={hoveredMetric === metricKey ? "url(#performance-glow)" : "none"}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 2.5,
                        delay: 1 + index * 0.3,
                        ease: "easeOut"
                      }}
                      style={{
                        filter: hoveredMetric === metricKey ? `drop-shadow(0 0 15px ${config.color}90)` : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }}
                    />

                    {/* Interactive Data Points with Glow */}
                    {points.map((point, pointIndex) => (
                      <motion.g key={`${metricKey}-${pointIndex}`}>


                        {/* Main Data Point */}
                        <motion.circle
                          cx={point.x}
                          cy={point.y}
                          r={hoveredMetric === metricKey ? 6 : 4}
                          fill={hoveredMetric === metricKey ? config.hoverColor : config.color}
                          stroke="white"
                          strokeWidth="2"
                          className="cursor-pointer"
                          initial={{ scale: 0, r: 0 }}
                          animate={{
                            scale: 1,
                            r: hoveredMetric === metricKey ? 6 : 4
                          }}
                          transition={{
                            delay: 1.8 + index * 0.3 + pointIndex * 0.1,
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          whileHover={{
                            scale: 1.8,
                            transition: { type: "spring", stiffness: 600, damping: 15 }
                          }}
                          onMouseEnter={(e) => handleMetricHover(metricKey, realTimeData[pointIndex], e)}
                          onMouseLeave={handleMetricLeave}
                          style={{
                            filter: hoveredMetric === metricKey ? `drop-shadow(0 0 10px ${config.color}80)` : 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
                          }}
                        />
                      </motion.g>
                    ))}
                  </g>
                )
              })}

              {/* X-axis Time Labels */}
              {realTimeData.map((d, i) => (
                <motion.text
                  key={`x-${i}`}
                  x={getXPosition(i)}
                  y={chartHeight - 25}
                  textAnchor="middle"
                  className="text-xs fill-gray-500 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 + i * 0.1 }}
                >
                  {d.time}
                </motion.text>
              ))}

              {/* Y-axis Percentage Labels */}
              {[0, 25, 50, 75, 100].map((value) => (
                <motion.text
                  key={`y-${value}`}
                  x={25}
                  y={getYPosition(value, 100)}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.7 }}
                >
                  {value}%
                </motion.text>
              ))}
            </motion.svg>

            {/* Real-time Progress Indicator Line */}
            {isRealTime && (
              <motion.div
                className="absolute top-6 bottom-6 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-60 rounded-full"
                style={{ left: `${8 + (animationProgress / 100) * 84}%` }}
                animate={{
                  opacity: [0.4, 0.9, 0.4],
                  boxShadow: [
                    '0 0 15px rgba(59, 130, 246, 0.4)',
                    '0 0 30px rgba(147, 51, 234, 0.8)',
                    '0 0 15px rgba(236, 72, 153, 0.4)'
                  ],
                  scaleY: [0.8, 1.1, 0.8]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>

          {/* Spectacular Enhanced Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20, rotateX: -30 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20, rotateX: -30 }}
                className="fixed pointer-events-none z-[9999]"
                style={{
                  left: Math.min(tooltip.x + 20, window.innerWidth - 280),
                  top: Math.max(tooltip.y - 130, 20),
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <motion.div
                  className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-5 py-4 rounded-2xl shadow-2xl border border-gray-600/50 backdrop-blur-lg min-w-[220px]"
                  animate={{
                    boxShadow: [
                      '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(59, 130, 246, 0.4)',
                      '0 25px 50px rgba(0,0,0,0.6), 0 0 30px rgba(147, 51, 234, 0.5)',
                      '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(59, 130, 246, 0.4)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <motion.div
                      className="w-5 h-5 rounded-full shadow-lg"
                      style={{ backgroundColor: tooltip.data.color }}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        boxShadow: [`0 0 10px ${tooltip.data.color}60`, `0 0 20px ${tooltip.data.color}80`, `0 0 10px ${tooltip.data.color}60`]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.span
                      className="font-bold text-white leading-tight"
                      animate={{
                        textShadow: [
                          '0 0 10px rgba(255,255,255,0.5)',
                          '0 0 20px rgba(255,255,255,0.9)',
                          '0 0 10px rgba(255,255,255,0.5)'
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {tooltip.data.metric}
                    </motion.span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <motion.div
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <span className="text-gray-300">Value:</span>
                      <motion.span
                        className="font-bold text-white"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {tooltip.data.value.toFixed(1)}{tooltip.data.unit}
                      </motion.span>
                    </motion.div>
                    <motion.div
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-gray-300">Time:</span>
                      <span className="font-bold text-white">{tooltip.data.time}</span>
                    </motion.div>
                  </div>




                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

export function InteractiveFigmaCharts({threads}:any) {
  return (
    <div className="space-y-8">
      {/* Thread States and Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveThreadStatesChart threads = {threads}/>
        <InteractivePerformanceMetricsChart />
      </div>
    </div>
  )
}