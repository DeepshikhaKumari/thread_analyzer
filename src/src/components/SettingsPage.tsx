import { Button } from './ui/button'
import { motion } from 'motion/react'
import { useState } from 'react'
import { LogOut, Upload, Download, Settings, User, FileText, Activity, Shield, Cpu, HardDrive, Eye } from 'lucide-react'

interface SettingsPageProps {
  user: {
    email: string
    signedInAt: Date
  }
  uploadedFile: {
    file: File
    uploadedAt: Date
  }
  onSignOut: () => void
  onBackToUpload: () => void
}

export function SettingsPage({ user, uploadedFile, onSignOut, onBackToUpload }: SettingsPageProps) {
  const [toggleStates, setToggleStates] = useState({
    deadlock: true,
    performance: true,
    lockContention: true,
    memory: true
  })

  const handleToggle = (key: keyof typeof toggleStates) => {
    setToggleStates(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const NeumorphismCard = ({ 
    children, 
    className = "", 
    isDepressed = false 
  }: { 
    children: React.ReactNode
    className?: string
    isDepressed?: boolean
  }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <motion.div
        className={`relative rounded-xl bg-[#ecf0f3] transition-all duration-300 ${className}`}
        style={{
          boxShadow: isDepressed
            ? 'inset 4px 4px 8px rgba(0,0,0,0.25), inset -4px -4px 8px rgba(255,255,255,0.9)'
            : isHovered
            ? '8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.95), 0 0 0 1px rgba(255,255,255,0.3)'
            : '6px 6px 12px rgba(0,0,0,0.1), -6px -6px 12px rgba(255,255,255,0.9)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ 
          y: isDepressed ? 0 : -2,
          scale: isDepressed ? 1 : 1.01
        }}
      >
        {/* Subtle gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
          }}
          animate={{
            opacity: isHovered && !isDepressed ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
        
        {children}
      </motion.div>
    )
  }

  const NeumorphismButton = ({
    children,
    variant = 'primary',
    size = 'default',
    onClick,
    className = "",
    disabled = false
  }: {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'export'
    size?: 'sm' | 'default' | 'lg'
    onClick?: () => void
    className?: string
    disabled?: boolean
  }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isPressed, setIsPressed] = useState(false)

    const getButtonStyles = () => {
      switch (variant) {
        case 'export':
          return 'bg-gradient-to-br from-[#0c8338] to-[#0a7030] text-white hover:from-[#0e9641] hover:to-[#0c8338]'
        case 'secondary':
          return 'bg-gradient-to-br from-[#bddeff] to-[#a8d3ff] text-[#272727] hover:from-[#c8e3ff] hover:to-[#b3d8ff]'
        default:
          return 'bg-gradient-to-br from-[#bddeff] to-[#a8d3ff] text-[#272727] hover:from-[#c8e3ff] hover:to-[#b3d8ff]'
      }
    }

    const getSizeStyles = () => {
      switch (size) {
        case 'sm':
          return 'px-4 py-2.5 text-sm'
        case 'lg':
          return 'px-8 py-4 text-lg'
        default:
          return 'px-6 py-3'
      }
    }

    const getBoxShadow = () => {
      if (isPressed) {
        return 'inset 3px 3px 6px rgba(0,0,0,0.25), inset -3px -3px 6px rgba(255,255,255,0.8)'
      } else if (isHovered) {
        return '6px 6px 16px rgba(0,0,0,0.2), -6px -6px 16px rgba(255,255,255,0.95), 0 0 0 1px rgba(255,255,255,0.3)'
      } else {
        return '4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)'
      }
    }

    return (
      <motion.button
        className={`relative rounded-lg font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden ${getButtonStyles()} ${getSizeStyles()} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        style={{
          boxShadow: getBoxShadow()
        }}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setIsPressed(false)
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        whileHover={{ 
          scale: disabled ? 1 : 1.02,
          y: disabled ? 0 : -1
        }}
        whileTap={{ 
          scale: disabled ? 1 : 0.98,
          y: disabled ? 0 : 1
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Shimmer effect overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
            backgroundSize: '200% 200%'
          }}
          animate={{
            opacity: isHovered && !disabled ? 1 : 0,
            backgroundPosition: isHovered ? '100% 100%' : '0% 0%'
          }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Content wrapper to ensure proper flex layout */}
        <div className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </div>

        {/* Subtle border highlight */}
        <motion.div
          className="absolute inset-0 rounded-lg border border-transparent pointer-events-none"
          animate={{
            borderColor: isHovered && !disabled
              ? variant === 'export' 
                ? 'rgba(34, 197, 94, 0.3)'
                : 'rgba(189, 222, 255, 0.4)'
              : 'transparent'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    )
  }

  const ToggleSwitch = ({ 
    enabled, 
    onToggle, 
    label 
  }: { 
    enabled: boolean
    onToggle: () => void
    label: string 
  }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <motion.button
        className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
          enabled 
            ? 'bg-gradient-to-r from-[#22c55e] to-[#16a34a]' 
            : 'bg-gradient-to-r from-[#cbd5e1] to-[#94a3b8]'
        }`}
        style={{
          boxShadow: enabled
            ? isHovered
              ? 'inset 3px 3px 6px rgba(0,0,0,0.25), inset -3px -3px 6px rgba(255,255,255,0.8), 0 0 0 2px rgba(34, 197, 94, 0.2)'
              : 'inset 2px 2px 4px rgba(0,0,0,0.2), inset -2px -2px 4px rgba(255,255,255,0.8)'
            : isHovered
            ? 'inset 3px 3px 6px rgba(0,0,0,0.15), inset -3px -3px 6px rgba(255,255,255,0.9), 0 0 0 2px rgba(203, 213, 225, 0.3)'
            : 'inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.9)'
        }}
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-1 w-6 h-6 bg-white rounded-full"
          animate={{
            x: enabled ? 32 : 4
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30
          }}
          style={{
            boxShadow: isHovered
              ? '3px 3px 6px rgba(0,0,0,0.3), -2px -2px 4px rgba(255,255,255,0.9)'
              : '2px 2px 4px rgba(0,0,0,0.25), -1px -1px 2px rgba(255,255,255,0.9)'
          }}
        >
          {/* Inner indicator when enabled */}
          <motion.div
            className="absolute inset-1 rounded-full"
            style={{
              background: enabled 
                ? 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)'
                : 'transparent'
            }}
            animate={{
              opacity: enabled ? 1 : 0,
              scale: enabled ? 1 : 0.5
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Status text that appears on hover */}
        <motion.div
          className={`absolute inset-0 flex items-center justify-center text-xs font-semibold pointer-events-none ${
            enabled ? 'text-white' : 'text-gray-600'
          }`}
          style={{ 
            textShadow: enabled ? '0 1px 2px rgba(0,0,0,0.5)' : 'none'
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          {enabled ? 'ON' : 'OFF'}
        </motion.div>
      </motion.button>
    )
  }

  return (
    <div className="bg-[#ecf0f3] p-6 md:p-8 min-h-full">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ecf0f3] mb-4 transition-all duration-300"
            style={{
              boxShadow: '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.9)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '10px 10px 20px rgba(0,0,0,0.15), -10px -10px 20px rgba(255,255,255,0.95)'
            }}
            animate={{
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              hover: { duration: 0.3 }
            }}
          >
            <Settings className="w-8 h-8 text-[#363636]" />
          </motion.div>
          <h1 className="text-3xl font-bold text-black">Analysis Settings</h1>
          <p className="text-[#363636] text-lg">Configure your thread analysis preferences and account settings</p>
        </motion.div>

        {/* Account Information */}
        <NeumorphismCard className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <motion.div
                className="w-12 h-12 rounded-full bg-[#ecf0f3] flex items-center justify-center transition-all duration-300"
                style={{
                  boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.9)'
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(255,255,255,0.95)'
                }}
              >
                <User className="w-6 h-6 text-[#363636]" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">Analysis Settings</h3>
                <p className="text-[#363636]">Configure your thread analysis preferences and account settings</p>
              </div>
            </div>
            <NeumorphismButton
              variant="secondary"
              onClick={onSignOut}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </NeumorphismButton>
          </div>
        </NeumorphismCard>

        {/* Current File */}
        <NeumorphismCard className="p-8" isDepressed>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <motion.div
                className="w-12 h-12 rounded-full bg-[#ecf0f3] flex items-center justify-center transition-all duration-300"
                style={{
                  boxShadow: '3px 3px 6px rgba(0,0,0,0.1), -3px -3px 6px rgba(255,255,255,0.9)'
                }}
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  boxShadow: '4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.95)'
                }}
              >
                <FileText className="w-6 h-6 text-[#363636]" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">{uploadedFile.file.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-[#363636]">
                  <span>{(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB</span>
                  <span>•</span>
                  <span>Uploaded {uploadedFile.uploadedAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <NeumorphismButton
              variant="secondary"
              onClick={onBackToUpload}
            >
              <Upload className="w-4 h-4" />
              Replace File
            </NeumorphismButton>
          </div>
        </NeumorphismCard>

        {/* Analysis Configuration */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-black">Analysis Configuration</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <NeumorphismCard className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-[#ecf0f3] flex items-center justify-center transition-all duration-300"
                    style={{
                      boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.9)'
                    }}
                    whileHover={{ 
                      scale: 1.15,
                      rotate: 10,
                      boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.15), inset -3px -3px 6px rgba(255,255,255,0.95)'
                    }}
                  >
                    <Shield className="w-5 h-5 text-[#363636]" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">Deadlock Detection</h3>
                    <p className="text-sm text-[#363636]">Automatically identify potential deadlocks</p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={toggleStates.deadlock}
                  onToggle={() => handleToggle('deadlock')}
                  label="Deadlock Detection"
                />
              </div>
            </NeumorphismCard>

            <NeumorphismCard className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-[#ecf0f3] flex items-center justify-center transition-all duration-300"
                    style={{
                      boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.9)'
                    }}
                    whileHover={{ 
                      scale: 1.15,
                      boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.15), inset -3px -3px 6px rgba(255,255,255,0.95)'
                    }}
                    animate={{
                      y: [0, -2, 0]
                    }}
                    transition={{
                      y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      hover: { duration: 0.3 }
                    }}
                  >
                    <Activity className="w-5 h-5 text-[#363636]" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">Performance Analysis</h3>
                    <p className="text-sm text-[#363636]">Analyze thread response times and bottlenecks</p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={toggleStates.performance}
                  onToggle={() => handleToggle('performance')}
                  label="Performance Analysis"
                />
              </div>
            </NeumorphismCard>

            <NeumorphismCard className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-[#ecf0f3] flex items-center justify-center transition-all duration-300"
                    style={{
                      boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.9)'
                    }}
                    whileHover={{ 
                      scale: 1.15,
                      rotate: -10,
                      boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.15), inset -3px -3px 6px rgba(255,255,255,0.95)'
                    }}
                  >
                    <Eye className="w-5 h-5 text-[#363636]" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">Lock Contention Analysis</h3>
                    <p className="text-sm text-[#363636]">Examine lock contention and blocking</p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={toggleStates.lockContention}
                  onToggle={() => handleToggle('lockContention')}
                  label="Lock Contention"
                />
              </div>
            </NeumorphismCard>

            <NeumorphismCard className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-[#ecf0f3] flex items-center justify-center transition-all duration-300"
                    style={{
                      boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.9)'
                    }}
                    whileHover={{ 
                      scale: 1.15,
                      y: -3,
                      boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.15), inset -3px -3px 6px rgba(255,255,255,0.95)'
                    }}
                  >
                    <HardDrive className="w-5 h-5 text-[#363636]" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-1">Memory Analysis</h3>
                    <p className="text-sm text-[#363636]">Analyze memory usage patterns</p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={toggleStates.memory}
                  onToggle={() => handleToggle('memory')}
                  label="Memory Analysis"
                />
              </div>
            </NeumorphismCard>
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-black">Export Options</h2>
          
          <NeumorphismCard className="p-8">
            <div className="flex flex-wrap gap-4">
              <NeumorphismButton
                variant="export"
                className="flex-1 min-w-[160px]"
              >
                <Download className="w-4 h-4" />
                Export PDF Report
              </NeumorphismButton>
              
              <NeumorphismButton
                variant="export"
                className="flex-1 min-w-[160px]"
              >
                <Download className="w-4 h-4" />
                Export JSON Data
              </NeumorphismButton>
              
              <NeumorphismButton
                variant="export"
                className="flex-1 min-w-[140px]"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </NeumorphismButton>
            </div>
          </NeumorphismCard>
        </div>


      </div>
    </div>
  )
}