import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { motion, AnimatePresence } from 'motion/react'
import svgPaths from '../imports/svg-hfk0vj85b2'

interface Thread {
  id: string
  name: string
  state: 'RUNNING' | 'BLOCKED' | 'WAITING' | 'TIMED_WAITING' | 'TERMINATED'
  cpuTime: number
  userTime: number
  blockedTime: number
  waitedTime: number
  priority: number
  daemon: boolean
}



interface ThreadsTableProps {
  isMobile?: boolean
}

// Sort Icon Component
function SortIcon({ isActive, sortOrder, onClick }: { 
  isActive: boolean, 
  sortOrder: 'asc' | 'desc', 
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className="ml-2 transition-transform"
    >
      <motion.div
        animate={{
          rotate: isActive && sortOrder === 'desc' ? 180 : 0,
          scale: isActive ? 1.1 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        <svg className="block w-4 h-4" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <path d={svgPaths.p11e38d00} fill={isActive ? "#3b82f6" : "black"} />
        </svg>
      </motion.div>
    </button>
  )
}

// Search Icon Component  
function SearchIcon() {
  return (
    <svg className="block w-4 h-4" fill="none" preserveAspectRatio="none" viewBox="0 0 13 15">
      <path clipRule="evenodd" d={svgPaths.p19dd0380} fill="#8E8E8E" fillRule="evenodd" />
    </svg>
  )
}

// Filter Icon Component
function FilterIcon() {
  return (
    <svg className="block w-[13px] h-[13px]" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
      <g clipPath="url(#clip0_208_2406)">
        <path d={svgPaths.p26739b80} fill="#272727" />
      </g>
      <defs>
        <clipPath id="clip0_208_2406">
          <rect fill="white" height="13" width="13" />
        </clipPath>
      </defs>
    </svg>
  )
}

// Three Dots Menu Icon Component
function ThreeDotsIcon() {
  return (
    <svg className="block w-4 h-4" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
      <path d={svgPaths.pdd6ac30} fill="black" />
    </svg>
  )
}

export function ThreadsTable({ isMobile = false }: ThreadsTableProps) {
  const [sortBy, setSortBy] = useState<keyof Thread>('cpuTime')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterState, setFilterState] = useState<string>('all')


  // Enhanced mock data matching Figma design
  const threads: Thread[] = [
    {
      id: '5',
      name: 'GC-Thread',
      state: 'RUNNING',
      cpuTime: 3456,
      userTime: 2987,
      blockedTime: 0,
      waitedTime: 12,
      priority: 10,
      daemon: true
    },
    {
      id: '3',
      name: 'HTTP-Request-Handler',
      state: 'BLOCKED',
      cpuTime: 3456,
      userTime: 1876,
      blockedTime: 0,
      waitedTime: 45,
      priority: 10,
      daemon: true
    },
    {
      id: '1',
      name: 'main',
      state: 'RUNNING',
      cpuTime: 3456,
      userTime: 987,
      blockedTime: 0,
      waitedTime: 123,
      priority: 10,
      daemon: true
    },
    {
      id: '2',
      name: 'Thread-pool-Worker-1',
      state: 'WAITING',
      cpuTime: 3456,
      userTime: 743,
      blockedTime: 0,
      waitedTime: 234,
      priority: 10,
      daemon: true
    },
    {
      id: '4',
      name: 'Database-Connection-Pool-1',
      state: 'TIMED_WAITING',
      cpuTime: 3456,
      userTime: 234,
      blockedTime: 0,
      waitedTime: 567,
      priority: 10,
      daemon: true
    }
  ]



  const handleSort = (column: keyof Thread) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const filteredAndSortedThreads = threads
    .filter(thread => {
      const matchesSearch = thread.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterState === 'all' || thread.state === filterState
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]
      const multiplier = sortOrder === 'asc' ? 1 : -1
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * multiplier
      }
      
      return ((aValue as number) - (bValue as number)) * multiplier
    })

  const getStateStyle = (state: Thread['state']) => {
    switch (state) {
      case 'RUNNING':
        return {
          bg: 'bg-gradient-to-r from-emerald-500 to-green-600',
          text: 'text-white',
          label: 'RUNNING',
          rowBg: 'bg-gradient-to-r from-emerald-50 to-green-50',
          borderColor: 'border-emerald-200',
          shadowColor: 'shadow-emerald-200/50'
        }
      case 'BLOCKED':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-rose-600',
          text: 'text-white',
          label: 'BLOCKED',
          rowBg: 'bg-gradient-to-r from-red-50 to-rose-50',
          borderColor: 'border-red-200',
          shadowColor: 'shadow-red-200/50'
        }
      case 'WAITING':
        return {
          bg: 'bg-gradient-to-r from-amber-500 to-orange-500',
          text: 'text-white',
          label: 'WAITING',
          rowBg: 'bg-gradient-to-r from-amber-50 to-orange-50',
          borderColor: 'border-amber-200',
          shadowColor: 'shadow-amber-200/50'
        }
      case 'TIMED_WAITING':
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
          text: 'text-white',
          label: 'TIMED-WAITING',
          rowBg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
          borderColor: 'border-blue-200',
          shadowColor: 'shadow-blue-200/50'
        }
      case 'RUNNABLE':
        return {
          bg: 'bg-gradient-to-r from-emerald-500 to-green-600',
          text: 'text-white',
          label: 'RUNNABLE',
          rowBg: 'bg-gradient-to-r from-emerald-50 to-green-50',
          borderColor: 'border-emerald-200',
          shadowColor: 'shadow-emerald-200/50'
        }
      case 'TERMINATED':
        return {
          bg: 'bg-gradient-to-r from-gray-500 to-slate-600',
          text: 'text-white',
          label: 'TERMINATED',
          rowBg: 'bg-gradient-to-r from-gray-50 to-slate-50',
          borderColor: 'border-gray-200',
          shadowColor: 'shadow-gray-200/50'
        }
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
          text: 'text-white',
          label: state,
          rowBg: 'bg-gradient-to-r from-gray-50 to-gray-50',
          borderColor: 'border-gray-200',
          shadowColor: 'shadow-gray-200/50'
        }
    }
  }

  const PriorityBar = ({ priority }: { priority: number }) => {
    const width = (priority / 10) * 100
    return (
      <div className="flex items-center space-x-2">
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gray-800"
            initial={{ width: 0 }}
            animate={{ width: `${width}%` }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </div>
        <span className="text-sm text-gray-600">{priority}</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >

      </motion.div>

      {/* Thread Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        {/* Thread Analysis Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-black">Thread Analysis</h2>
          
          {/* Search and Filter Controls */}
          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <SearchIcon />
              </div>
              <Input
                placeholder="Search Threads"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-[227px] h-[37px] bg-neutral-100 border-[#d9d9d9] rounded-lg text-[14px] placeholder:text-[#8e8e8e] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Filter Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-[37px] w-[113px] bg-white border-[#d9d9d9] rounded-lg text-[#272727] transition-colors duration-200"
                >
                  <FilterIcon />
                  <span className="ml-2 text-[16px]">Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setFilterState('all')}>
                  All States
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterState('RUNNING')}>
                  Running
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterState('BLOCKED')}>
                  Blocked
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterState('WAITING')}>
                  Waiting
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterState('TIMED_WAITING')}>
                  Timed Waiting
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border border-[#c3deff] rounded-lg overflow-hidden shadow-lg"
        >
          {/* Table Header */}
          <div className="bg-white px-4 py-4">
            <div className="grid grid-cols-7 gap-4 items-center">
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-black">Thread Name</span>
                <SortIcon 
                  isActive={sortBy === 'name'} 
                  sortOrder={sortOrder} 
                  onClick={() => handleSort('name')} 
                />
              </div>
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-black">State</span>
                <SortIcon 
                  isActive={sortBy === 'state'} 
                  sortOrder={sortOrder} 
                  onClick={() => handleSort('state')} 
                />
              </div>
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-black">CPU Time</span>
                <SortIcon 
                  isActive={sortBy === 'cpuTime'} 
                  sortOrder={sortOrder} 
                  onClick={() => handleSort('cpuTime')} 
                />
              </div>
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-black">Blocked Time (ms)</span>
                <SortIcon 
                  isActive={sortBy === 'blockedTime'} 
                  sortOrder={sortOrder} 
                  onClick={() => handleSort('blockedTime')} 
                />
              </div>
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-black">priority</span>
                <SortIcon 
                  isActive={sortBy === 'priority'} 
                  sortOrder={sortOrder} 
                  onClick={() => handleSort('priority')} 
                />
              </div>
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-black">Daemon</span>
                <SortIcon 
                  isActive={sortBy === 'daemon'} 
                  sortOrder={sortOrder} 
                  onClick={() => handleSort('daemon')} 
                />
              </div>
              <div></div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            <AnimatePresence mode="wait">
              {filteredAndSortedThreads.map((thread, index) => {
                const stateStyle = getStateStyle(thread.state)
                return (
                  <motion.div
                    key={thread.id}
                    className={`${stateStyle.rowBg} transition-all duration-300 cursor-pointer border-l-4 border-transparent mx-3 my-3 rounded-xl shadow-md`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="p-4">
                      <div className="grid grid-cols-7 gap-4 items-center">
                        {/* Thread Name & ID */}
                        <div>
                          <div>
                            <p className="font-semibold text-gray-800 text-[14px]">
                              {thread.name}
                            </p>
                            <p className="text-gray-500 text-[12px] mt-1">
                              ID: {thread.id}
                            </p>
                          </div>
                        </div>

                        {/* State Badge */}
                        <div>
                          <div
                            className={`inline-flex items-center justify-center h-7 rounded-lg text-[12px] font-semibold ${stateStyle.bg} ${stateStyle.text} shadow-lg border-2 border-white/50`}
                            style={{
                              width: stateStyle.label === 'TIMED-WAITING' ? '120px' : '90px'
                            }}
                          >
                            {stateStyle.label}
                          </div>
                        </div>

                        {/* CPU Time */}
                        <div>
                          <div className="bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/50 shadow-sm">
                            <p className="text-gray-700 text-[14px] font-semibold">
                              {thread.cpuTime.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Blocked Time */}
                        <div>
                          <div className="bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/50 shadow-sm">
                            <p className="text-gray-700 text-[14px] font-semibold">
                              {thread.blockedTime}
                            </p>
                          </div>
                        </div>

                        {/* Priority */}
                        <div>
                          <div className="bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/50 shadow-sm">
                            <p className="text-gray-700 text-[14px] font-semibold">
                              {thread.priority}
                            </p>
                          </div>
                        </div>

                        {/* Daemon */}
                        <div>
                          <div className="inline-flex items-center justify-center w-[60px] h-7 bg-white/80 backdrop-blur-sm border border-white/70 rounded-lg shadow-sm">
                            <span className="text-gray-700 text-[14px] font-semibold">
                              Yes
                            </span>
                          </div>
                        </div>

                        {/* Actions Menu */}
                        <div className="flex justify-end">
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 rounded-full transition-all duration-200"
                                >
                                  <ThreeDotsIcon />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 shadow-xl rounded-lg">
                                <DropdownMenuItem className="cursor-pointer">
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  View Stack Trace
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  Export Thread Data
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer text-red-600">
                                  Kill Thread
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>


    </div>
  )
}