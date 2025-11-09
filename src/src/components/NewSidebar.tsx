import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Search, Filter, BarChart3, MessageSquare, Settings, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface User {
  email: string
  signedInAt: Date
}

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  user: User
  isMobile?: boolean
  onClose?: () => void
  onThreadViewClick?: (viewType: string) => void
  onAnalyticsClick?: () => void
  onOverviewClick?: () => void
}

const navigationItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: BarChart3,
    isActive: true
  },
  {
    id: 'threads',
    label: 'Threads',
    icon: MessageSquare,
    isActive: false,
    hasDropdown: true,
    subItems: [
      {
        id: 'all-threads',
        label: 'All Threads'
      },
      {
        id: 'identical-stack-trace',
        label: 'Identical Stack Trace'
      },
      {
        id: 'most-used-methods',
        label: 'Most Used Methods'
      },
      {
        id: 'cpu-threads',
        label: 'CPU Threads'
      },
      {
        id: 'finalizer-threads',
        label: 'Finalizer Threads'
      },
      {
        id: 'gc-threads',
        label: 'GC Threads'
      },
      {
        id: 'dependency-graph',
        label: 'Dependency Graph'
      }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    isActive: false
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    isActive: false
  }
]



export function NewSidebar({ activeView, setActiveView, user, isMobile = false, onClose, onThreadViewClick, onAnalyticsClick, onOverviewClick }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null)

  return (
    <motion.div 
      className="bg-[#151515] h-full w-[303px] flex flex-col relative overflow-visible"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#151515] via-[#1a1a1a] to-[#151515] opacity-50"></div>
      
      {/* Header */}
      <motion.div 
        className="relative p-[18px] border-b border-gray-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-[24px] md:text-[26px] lg:text-[30px] font-normal leading-normal font-['Italiana'] mb-1">
          <span className="text-white text-[32px]">Thread</span><span className="text-[#315596] font-bold font-[Abril_Fatface] text-[32px]">.Analyzer</span>
        </h1>
      </motion.div>

      {/* Search Section */}
      <motion.div 
        className="relative p-[15px] space-y-3"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Search Input */}
        <motion.div 
          className="relative group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Input
            type="text"
            placeholder="Search Threads"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white h-[37px] rounded-[8px] pl-10 pr-4 text-[14px] border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20"
          />
          <motion.div
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-[8px] border-2 border-transparent group-hover:border-blue-500/30 group-focus-within:border-blue-500/50"
            initial={false}
            animate={{ 
              opacity: searchQuery ? 1 : 0,
              borderColor: searchQuery ? 'rgba(59, 130, 246, 0.5)' : 'transparent'
            }}
            transition={{ duration: 0.2 }}
          />
          {/* Simplified hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Filters Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            className="bg-[#272727] h-[37px] w-full rounded-[8px] text-white text-[16px] border-0 hover:bg-[#333333] transition-all duration-300 hover:shadow-lg"
          >
            <Filter className="w-3 h-3 mr-2" />
            Filters
          </Button>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <motion.div 
        className="flex-1 px-1 py-4 space-y-1 overflow-visible relative"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {navigationItems.map((item, index) => {
          const isActive = activeView === item.id || (item.subItems && item.subItems.some(subItem => activeView === subItem.id))
          const isHovered = hoveredItem === item.id
          const isExpanded = expandedDropdown === item.id
          
          return (
            <motion.div
              key={item.id}
              className="relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              onMouseEnter={() => {
                setHoveredItem(item.id)
                if (item.hasDropdown) {
                  setExpandedDropdown(item.id)
                }
              }}
              onMouseLeave={() => {
                setHoveredItem(null)
                if (item.hasDropdown) {
                  setExpandedDropdown(null)
                }
              }}
            >
              <motion.button
                onClick={() => {
                  if (!item.hasDropdown) {
                    // Handle analytics with scroll navigation
                    if (item.id === 'analytics' && onAnalyticsClick) {
                      onAnalyticsClick()
                    } else if (item.id === 'overview') {
                      // For overview, use the dedicated handler
                      if (onOverviewClick) {
                        onOverviewClick()
                      } else {
                        // Fallback behavior
                        setActiveView('overview')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    } else {
                      setActiveView(item.id)
                    }
                    if (isMobile && onClose) onClose()
                  } else if (item.id === 'threads') {
                    // For threads, scroll to threads section on first click, toggle dropdown on second
                    if (!isExpanded && onThreadViewClick) {
                      onThreadViewClick('threads')
                    }
                    setExpandedDropdown(isExpanded ? null : item.id)
                  } else {
                    setExpandedDropdown(isExpanded ? null : item.id)
                  }
                }}
                className={`w-full h-[52px] rounded-[8px] flex items-center px-6 text-[16px] transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? 'bg-white text-[#272727] shadow-lg' 
                    : 'bg-transparent text-white hover:bg-[rgba(39,39,39,0.3)]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                {/* Enhanced Active indicator */}
                {isActive && (
                  <>
                    <motion.div
                      className="absolute right-[282px] top-[-8px] w-[19px] h-[75px]"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <svg className="w-full h-full" viewBox="0 0 18 69" fill="none">
                        <defs>
                          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="50%" stopColor="#f0f9ff" />
                            <stop offset="100%" stopColor="#dbeafe" />
                          </linearGradient>
                        </defs>
                        <path d="M0 53.5V17C10.8 14.6 16 4.66667 17.5 0V69C13.9 59.4 4.16667 54.6667 0 53.5Z" fill="url(#activeGradient)" />
                      </svg>
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          boxShadow: [
                            "0 0 8px rgba(255,255,255,0.3)",
                            "0 0 16px rgba(255,255,255,0.5)",
                            "0 0 8px rgba(255,255,255,0.3)"
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                    
                    {/* Left border accent */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-r"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
                    />
                  </>
                )}

                {/* Hover glow effect */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-[8px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon with subtle scale animation */}
                <motion.div
                  className="mr-4"
                  animate={{ 
                    scale: isActive ? 1.1 : 1 
                  }}
                  transition={{ 
                    scale: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>

                {/* Label with slide effect */}
                <motion.span
                  animate={{ x: isActive ? 5 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex-1 text-left"
                >
                  {item.label}
                </motion.span>

                {/* Dropdown arrow for items with subItems */}
                {item.hasDropdown && (
                  <motion.div
                    animate={{ 
                      rotate: isExpanded ? 90 : 0,
                      scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.2 }}
                    className="ml-2"
                  >
                    <ChevronRight className={`w-4 h-4 transition-colors duration-200 ${
                      isActive 
                        ? 'text-[#315596]' 
                        : isExpanded || isHovered 
                        ? 'text-[#315596]' 
                        : 'text-white'
                    }`} />
                  </motion.div>
                )}

                {/* Simplified active effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
                )}
              </motion.button>

              {/* Enhanced dropdown menu - positioned within sidebar */}
              <AnimatePresence>
                {item.hasDropdown && isExpanded && (
                  <motion.div
                    className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 w-full z-[9999] backdrop-blur-sm ring-1 ring-black/5"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onMouseEnter={() => {
                      setExpandedDropdown(item.id)
                      setHoveredItem(item.id)
                    }}
                    onMouseLeave={() => {
                      setExpandedDropdown(null)
                      setHoveredItem(null)
                    }}
                  >
                    {item.subItems?.map((subItem, subIndex) => (
                      <motion.button
                        key={subItem.id}
                        onClick={() => {
                          // For thread-related items, use scroll navigation
                          if (item.id === 'threads' && onThreadViewClick) {
                            onThreadViewClick(subItem.id)
                          } else {
                            setActiveView(subItem.id)
                          }
                          setExpandedDropdown(null)
                          if (isMobile && onClose) onClose()
                        }}
                        className={`w-full text-left px-3 py-2.5 mx-1 rounded-lg transition-all duration-200 group relative overflow-hidden text-sm ${
                          activeView === subItem.id 
                            ? 'bg-gradient-to-r from-[#315596] to-[#2a4a82] text-white shadow-lg font-medium' 
                            : 'hover:bg-gradient-to-r hover:from-[#315596]/8 hover:to-[#315596]/4 hover:shadow-md hover:border-l-2 hover:border-[#315596]/30'
                        }`}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: subIndex * 0.03, type: "spring", stiffness: 300, damping: 25 }}
                        whileHover={{ 
                          scale: 1.01, 
                          x: 1,
                          transition: { type: "spring", stiffness: 400, damping: 20 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Enhanced active background glow */}
                        {activeView === subItem.id && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#315596]/20 via-[#315596]/10 to-transparent rounded-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          />
                        )}
                        
                        {/* Enhanced hover glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#315596]/8 via-[#315596]/4 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"
                          initial={false}
                        />
                        
                        {/* Shimmer effect on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"
                          initial={false}
                        />
                        
                        <div className="relative z-10 flex items-center justify-between">
                          <motion.div
                            className={`text-sm font-medium transition-all duration-200 ${
                              activeView === subItem.id 
                                ? 'text-white' 
                                : 'text-gray-700 group-hover:text-[#315596] group-hover:font-medium'
                            }`}
                            whileHover={{ x: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            {subItem.label}
                          </motion.div>
                          
                          {/* Enhanced active indicator */}
                          {activeView === subItem.id && (
                            <motion.div
                              className="flex items-center space-x-1"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
                            >
                              <motion.div
                                className="w-2 h-2 bg-white rounded-full"
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: [1, 0.8, 1]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                              <motion.div
                                className="w-1 h-1 bg-white/70 rounded-full"
                                animate={{ 
                                  scale: [1, 1.1, 1],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 0.3
                                }}
                              />
                            </motion.div>
                          )}
                          
                          {/* Hover indicator */}
                          <AnimatePresence>
                            {activeView !== subItem.id && (
                              <motion.div
                                className="w-1.5 h-1.5 bg-[#315596] rounded-full opacity-0 group-hover:opacity-100"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                              />
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Bottom border accent for active item */}
                        {activeView === subItem.id && (
                          <motion.div
                            className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-white/50 via-white to-white/50 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>


    </motion.div>
  )
}