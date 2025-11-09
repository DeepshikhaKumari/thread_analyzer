import React from 'react'
import { motion } from 'motion/react'
import { Button } from './ui/button'
import { BarChart3, List, Settings } from 'lucide-react'

interface InteractiveToggleProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isMobile: boolean
}

export function InteractiveToggle({ activeTab, onTabChange, isMobile }: InteractiveToggleProps) {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: BarChart3,
      description: 'Dashboard overview with key metrics'
    },
    {
      id: 'threads',
      label: 'Threads',
      icon: List,
      description: 'Detailed thread analysis'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'Performance analytics and charts'
    }
  ]

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <motion.div
              key={tab.id}
              className="relative flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                size={isMobile ? "sm" : "default"}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative w-full justify-start gap-2 transition-all duration-200 font-medium
                  ${isActive 
                    ? 'bg-white text-[#315596] shadow-sm border border-gray-200 hover:bg-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#315596]' : 'text-gray-500'}`} />
                <span className="font-medium">{tab.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-8 h-0.5 bg-[#315596] rounded-full"
                    layoutId="activeTab"
                    initial={false}
                    style={{ transform: 'translateX(-50%)' }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Button>
            </motion.div>
          )
        })}
      </div>
      
      {/* Tab description */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-2 px-1"
      >
        <p className="text-sm text-gray-600">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
      </motion.div>
    </div>
  )
}