import { Button } from './ui/button'
import { motion } from 'motion/react'
import svgPaths from '../imports/svg-j6oofrpt8j'

interface MetricsOverviewProps {
  isMobile?: boolean
}

// Icon Components
function TimeIcon({ className }: { className?: string }) {
  return (
    <svg className={`block size-full ${className}`} fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
      <g>
        <path d={svgPaths.p2e907e40} fill="white" />
      </g>
    </svg>
  )
}

function DeadlockIcon({ className }: { className?: string }) {
  return (
    <svg className={`block size-full ${className}`} fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
      <g>
        <path d={svgPaths.p362f380} stroke="white" strokeWidth="1.33333" />
      </g>
    </svg>
  )
}

function PerformanceIcon({ className }: { className?: string }) {
  return (
    <svg className={`block size-full ${className}`} fill="none" preserveAspectRatio="none" viewBox="0 0 28 23">
      <g>
        <path d={svgPaths.p398f4a00} stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        <path d={svgPaths.p2d3cb800} stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={`block size-full ${className}`} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g>
        <path d={svgPaths.p9b16800} fill="white" />
      </g>
    </svg>
  )
}

function BlockedIcon({ className }: { className?: string }) {
  return (
    <svg className={`block size-full ${className}`} fill="none" preserveAspectRatio="none" viewBox="0 0 20 18">
      <g>
        <path d={svgPaths.p23079100} stroke="white" />
        <path d="M10.0002 5.49995V9.99984" stroke="white" strokeLinecap="round" />
        <path d={svgPaths.p23d0e2c0} fill="white" />
      </g>
    </svg>
  )
}

function CpuIcon({ className }: { className?: string }) {
  return (
    <svg className={`block size-full ${className}`} fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
      <g>
        <path d={svgPaths.p16144872} stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        <path d={svgPaths.p5452380} stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

export function MetricsOverview({ isMobile = false }: MetricsOverviewProps) {

  const metrics = [
    {
      title: 'Total Threads',
      value: '247',
      description: 'Active Threads Detected',
      backgroundColor: '#3fad8c',
      hoverColor: '#35956f',
      icon: UsersIcon,
      change: '+12%',
      trend: 'up',
      position: { top: '6px', left: '0px' }
    },
    {
      title: 'Blocked Threads',
      value: '23',
      description: 'Threads waiting for resources',
      backgroundColor: '#ff8a44',
      hoverColor: '#e8733b',
      icon: BlockedIcon,
      change: '-5%',
      trend: 'down',
      position: { top: '3px', left: '347px' }
    },
    {
      title: 'CPU Usage',
      value: '73.2%',
      description: 'Average CPU utilization',
      backgroundColor: '#5294de',
      hoverColor: '#4682c8',
      icon: CpuIcon,
      change: '+8%',
      trend: 'up',
      position: { top: '0px', left: '694px' }
    },
    {
      title: 'Response Time',
      value: '45ms',
      description: 'Average response time',
      backgroundColor: '#8f75cf',
      hoverColor: '#7d63b8',
      icon: TimeIcon,
      change: '-12%',
      trend: 'down',
      position: { top: '234px', left: '0px' }
    },
    {
      title: 'Deadlocks',
      value: '2',
      description: 'Potential deadlock situations',
      backgroundColor: '#ff2748',
      hoverColor: '#e81e3f',
      icon: DeadlockIcon,
      change: '0%',
      trend: 'neutral',
      position: { top: '234px', left: '347px' }
    },
    {
      title: 'Performance Score',
      value: '8.4/10',
      description: 'Overall system performance',
      backgroundColor: '#dab015',
      hoverColor: '#c59d12',
      icon: PerformanceIcon,
      change: '+0.3',
      trend: 'up',
      position: { top: '234px', left: '694px' }
    }
  ]

  const MetricCard = ({ metric, index, className = "", style = {} }: {
    metric: any,
    index: number,
    className?: string,
    style?: React.CSSProperties
  }) => {
    const Icon = metric.icon

    return (
      <motion.div
        className={`relative rounded-2xl overflow-hidden ${className}`}
        style={style}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100
        }}
      >
        {/* Static Background Gradient */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${metric.backgroundColor} 0%, ${metric.hoverColor} 100%)`
          }}
        />

        {/* Main Content Container */}
        <div className="relative h-full p-7 flex flex-col justify-between">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1 pr-4">
              <motion.h3 
                className="text-white font-semibold text-lg lg:text-xl mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                {metric.title}
              </motion.h3>
              
              {/* Trend Indicator */}
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              >
                <span className={`text-sm px-3 py-1.5 rounded-full font-medium ${
                  metric.trend === 'up' 
                    ? 'bg-green-400/20 text-green-100 border border-green-400/30' 
                    : metric.trend === 'down'
                    ? 'bg-red-400/20 text-red-100 border border-red-400/30'
                    : 'bg-gray-400/20 text-gray-100 border border-gray-400/30'
                }`}>
                  {metric.change}
                </span>
                <div>
                  <div className={`w-3 h-3 rounded-full shadow-lg ${
                    metric.trend === 'up' ? 'bg-green-400 shadow-green-400/50' : 
                    metric.trend === 'down' ? 'bg-red-400 shadow-red-400/50' : 'bg-gray-400 shadow-gray-400/50'
                  }`} />
                </div>
              </motion.div>
            </div>

            {/* Icon */}
            <motion.div
              className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
            >
              <Icon className="w-7 h-7 lg:w-8 lg:h-8 drop-shadow-lg" />
            </motion.div>
          </div>

          {/* Value Section */}
          <div className="mb-6 text-center">
            <motion.div 
              className="text-white font-bold text-3xl lg:text-4xl xl:text-5xl mb-4 tracking-tight"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1 + 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              {metric.value}
            </motion.div>
            
            <motion.p 
              className="text-white/90 text-base lg:text-lg leading-relaxed font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
            >
              {metric.description}
            </motion.p>
          </div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
            className="flex justify-center"
          >
            <Button
              variant="outline"
              size="default"
              className="bg-white/15 backdrop-blur-sm border-white/40 text-white hover:bg-white/25 hover:border-white/60 transition-all duration-300 rounded-xl shadow-lg hover:shadow-2xl text-sm lg:text-base font-semibold px-6 py-3 min-w-[140px]"
            >
              View Details
            </Button>
          </motion.div>
        </div>


      </motion.div>
    )
  }

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Desktop Layout - 2x3 Grid (2 columns, 3 rows) */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 gap-8 max-w-7xl mx-auto">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              metric={metric}
              index={index}
              className="h-56"
            />
          ))}
        </div>
      </div>

      {/* Tablet Layout - 2x3 Grid */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              metric={metric}
              index={index}
              className="h-52"
            />
          ))}
        </div>
      </div>

      {/* Mobile Layout - 1x6 Grid */}
      <div className="block md:hidden">
        <div className="grid grid-cols-1 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              metric={metric}
              index={index}
              className="h-44"
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}