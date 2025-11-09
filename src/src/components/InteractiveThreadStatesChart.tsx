import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Card } from './ui/card'
import exampleImage from 'figma:asset/a7dd1c5aa909836d5e9ecd6de910f9a117ae442b.png'

interface ThreadState {
  name: string
  shortName: string
  value: number
  color: string
  description: string
}

interface InteractiveThreadStatesChartProps {
  className?: string
}

export function InteractiveThreadStatesChart({ className }: InteractiveThreadStatesChartProps) {
  const [activeState, setActiveState] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const threadStates: ThreadState[] = [
    {
      name: 'WAITING',
      shortName: 'WAITING',
      value: 38,
      color: '#00C49F',
      description: 'Threads waiting for a condition or resource'
    },
    {
      name: 'TIMED_WAITING',
      shortName: 'TIMED_WAITING', 
      value: 28,
      color: '#FF8042',
      description: 'Threads waiting with a timeout period'
    },
    {
      name: 'RUNNING',
      shortName: 'RUNNING',
      value: 19,
      color: '#0088FE',
      description: 'Currently executing threads'
    },
    {
      name: 'BLOCKED',
      shortName: 'BLOCKED',
      value: 10,
      color: '#FFBB28',
      description: 'Threads blocked waiting for monitor lock'
    },
    {
      name: 'TERMINATED',
      shortName: 'TERMINATED',
      value: 5,
      color: '#8884D8',
      description: 'Completed or terminated threads'
    }
  ]

  const totalThreads = 247

  return (
    <Card className={`relative overflow-hidden group transition-all duration-500 hover:shadow-xl ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-green-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ scale: 0.8 }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div 
        className="relative p-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Thread States Distribution
          </h3>
          <p className="text-sm text-gray-600">
            Current distribution of thread states in the analyzed dump
          </p>
        </motion.div>

        {/* Total Threads Header */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-4xl font-bold text-gray-900 mb-2">{totalThreads}</div>
          <div className="text-lg text-gray-600">Total Threads</div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Pie Chart Container */}
          <motion.div 
            className="relative flex justify-center items-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">
              {/* Background Circle */}
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Pie Chart using the provided image */}
              <motion.div
                className="absolute inset-4"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={exampleImage} 
                  alt="Thread States Distribution"
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {/* Interactive Hover Areas */}
              <div className="absolute inset-0">
                {threadStates.map((state, index) => {
                  const isActive = activeState === state.name
                  // Position areas roughly over the pie segments - adjusted for larger size
                  const positions = [
                    { top: '18%', left: '18%', transform: 'translate(-50%, -50%)' }, // WAITING
                    { bottom: '18%', right: '8%', transform: 'translate(50%, 50%)' }, // TIMED_WAITING  
                    { top: '25%', right: '8%', transform: 'translate(50%, -50%)' }, // RUNNING
                    { bottom: '35%', left: '8%', transform: 'translate(-50%, 50%)' }, // BLOCKED
                    { top: '48%', right: '22%', transform: 'translate(50%, -50%)' }, // TERMINATED
                  ]
                  
                  return (
                    <motion.div
                      key={state.name}
                      className="absolute w-20 h-20 cursor-pointer rounded-full"
                      style={positions[index]}
                      onMouseEnter={() => setActiveState(state.name)}
                      onMouseLeave={() => setActiveState(null)}
                      whileHover={{ scale: 1.2 }}
                      animate={{ 
                        backgroundColor: isActive ? `${state.color}20` : 'transparent'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 opacity-50"
                            style={{ borderColor: state.color }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 0.6 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Interactive Legend */}
          <motion.div 
            className="space-y-4 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Thread States</h4>
              <p className="text-sm text-gray-500">
                Hover over items to highlight in chart
              </p>
            </div>
            
            {threadStates.map((state, index) => {
              const isActive = activeState === state.name
              
              return (
                <motion.div
                  key={state.name}
                  className={`
                    group relative p-4 rounded-xl cursor-pointer transition-all duration-300
                    ${isActive 
                      ? 'bg-white shadow-lg scale-105 border-2' 
                      : 'bg-gray-50 hover:bg-white hover:shadow-md hover:scale-102'
                    }
                  `}
                  style={{ 
                    borderColor: isActive ? state.color : 'transparent',
                    boxShadow: isActive ? `0 10px 25px ${state.color}20` : undefined
                  }}
                  onMouseEnter={() => setActiveState(state.name)}
                  onMouseLeave={() => setActiveState(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1 + 0.4,
                    duration: 0.4
                  }}
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center space-x-4">
                    {/* Color Indicator */}
                    <motion.div
                      className="w-5 h-5 rounded-full flex-shrink-0 shadow-md"
                      style={{ backgroundColor: state.color }}
                      whileHover={{ scale: 1.3 }}
                      animate={{ 
                        scale: isActive ? 1.2 : 1,
                        boxShadow: isActive ? `0 0 20px ${state.color}50` : `0 2px 4px ${state.color}30`
                      }}
                      transition={{ duration: 0.2 }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <motion.span 
                          className={`font-semibold transition-colors duration-200 ${
                            isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                          }`}
                          animate={{ 
                            color: isActive ? state.color : undefined 
                          }}
                        >
                          {state.shortName}
                        </motion.span>
                        
                        <motion.span 
                          className={`font-bold text-lg transition-all duration-200 ${
                            isActive ? 'text-gray-900' : 'text-gray-600'
                          }`}
                          animate={{ 
                            scale: isActive ? 1.1 : 1,
                            color: isActive ? state.color : undefined
                          }}
                        >
                          {state.value}%
                        </motion.span>
                      </div>
                      
                      <motion.p 
                        className={`text-sm transition-colors duration-200 ${
                          isActive ? 'text-gray-600' : 'text-gray-500 group-hover:text-gray-600'
                        }`}
                        animate={{ 
                          opacity: isActive ? 1 : 0.8 
                        }}
                      >
                        {state.description}
                      </motion.p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <motion.div 
                    className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: index * 0.1 + 0.8, duration: 0.5 }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: state.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${state.value}%` }}
                      transition={{ 
                        delay: index * 0.1 + 1,
                        duration: 0.8,
                        ease: "easeOut"
                      }}
                    />
                  </motion.div>

                  {/* Hover Effect */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 opacity-50"
                        style={{ borderColor: state.color }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.3 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Summary Stats */}
        <motion.div 
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="text-xl font-bold text-green-600">
              {threadStates.find(s => s.name === 'RUNNING')?.value || 0}%
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="text-xl font-bold text-yellow-600">
              {threadStates.find(s => s.name === 'BLOCKED')?.value || 0}%
            </div>
            <div className="text-sm text-gray-600">Blocked</div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="text-xl font-bold text-blue-600">
              {(threadStates.find(s => s.name === 'WAITING')?.value || 0) + 
               (threadStates.find(s => s.name === 'TIMED_WAITING')?.value || 0)}%
            </div>
            <div className="text-sm text-gray-600">Waiting</div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="text-xl font-bold text-purple-600">
              {threadStates.find(s => s.name === 'TERMINATED')?.value || 0}%
            </div>
            <div className="text-sm text-gray-600">Terminated</div>
          </div>
        </motion.div>
      </div>
    </Card>
  )
}