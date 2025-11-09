import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { SignInPage } from './src/components/SignInPage'
import { FileUploadPage } from './src/components/FileUploadPage'
import { NewSidebar } from './src/components/NewSidebar'
import { DashboardOverview } from './src/components/DashboardOverview'
import { DetailedMetricView } from './src/components/DetailedMetricView'
import { SettingsPage } from './src/components/SettingsPage'
import { Button } from './src/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './src/components/ui/dropdown-menu'
import { FileText, Upload, User, Bell, Menu, X, Brain, Settings, LogOut, UserCircle } from 'lucide-react'

// Global declaration for scroll function
declare global {
  interface Window {
    scrollToThreadView?: (viewType: string) => void
  }
}

interface UploadedFile {
  file: File
  uploadedAt: Date
}

interface User {
  email: string
  signedInAt: Date
}

function DashboardLayout({ user, uploadedFile, onSignOut, onBackToUpload }: { user: User, uploadedFile: UploadedFile, onSignOut: () => void, onBackToUpload: () => void }) {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState('overview')
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)


  // Detect mobile screen size - stable implementation
  useEffect(() => {
    let timeoutId: number
    
    const checkMobile = () => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        const isMobileScreen = window.innerWidth < 768
        setIsMobile(prev => {
          if (prev !== isMobileScreen) {
            if (!isMobileScreen) {
              setSidebarOpen(false)
            }
            return isMobileScreen
          }
          return prev
        })
      }, 150) // Debounce resize events
    }
    
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timeoutId)
    }
  }, [])

  const handleMetricClick = useCallback((metricType: string) => {
    navigate(`/dashboard/metric/${metricType}`)
  }, [navigate])


  const handleThreadViewClick = useCallback((viewType: string) => {
    setActiveView(viewType)
    // Use requestAnimationFrame for smoother scroll timing
    requestAnimationFrame(() => {
      if (window.scrollToThreadView) {
        window.scrollToThreadView(viewType)
      }
    })
  }, [])

  const handleAnalyticsClick = useCallback(() => {
    setActiveView('analytics')
    requestAnimationFrame(() => {
      if (window.scrollToThreadView) {
        window.scrollToThreadView('analytics')
      }
    })
  }, [])

  const handleOverviewClick = useCallback(() => {
    setActiveView('overview')
    requestAnimationFrame(() => {
      const overviewSection = document.getElementById('overview-section')
      if (overviewSection) {
        overviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }, [])

  // Memoize dashboard view check with stable array
  const dashboardViews = useMemo(() => new Set([
    'overview', 'threads', 'all-threads', 'identical-stack-trace', 
    'most-used-methods', 'cpu-threads', 'finalizer-threads', 
    'gc-threads', 'dependency-graph', 'analytics'
  ]), [])
  
  const shouldShowDashboard = useMemo(() => {
    return dashboardViews.has(activeView)
  }, [activeView, dashboardViews])

  return (
    <div className="flex h-screen bg-white relative overflow-hidden">
      {/* Mobile Sidebar Overlay - simplified */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - simplified without complex animations */}
      <div
        className={`${
          isMobile 
            ? `fixed left-0 top-0 h-full z-50 transition-transform duration-200 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }` 
            : 'relative'
        } overflow-visible z-40`}
      >
        <NewSidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          user={user}
          isMobile={isMobile}
          onClose={() => setSidebarOpen(false)}
          onThreadViewClick={handleThreadViewClick}
          onAnalyticsClick={handleAnalyticsClick}
          onOverviewClick={handleOverviewClick}
        />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 relative">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                {/* Mobile Menu Button - simplified */}
                {isMobile && (
                  <button
                    className="p-2 rounded-lg border border-gray-200 bg-white shadow-sm md:hidden hover:bg-gray-50 transition-colors"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    {sidebarOpen ? (
                      <X className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Menu className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                )}
                
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black mb-1 md:mb-2 truncate">
                    Thread Analysis Report
                  </h1>
                  <p className="text-sm md:text-base text-[#363636] truncate">
                    Analyzing...
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">

                <div className="flex items-center space-x-3">
                  <div className="relative cursor-pointer hover:scale-105 transition-transform">
                    <Bell className="w-5 h-5 text-[#315596]" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="w-[29px] h-[29px] bg-gradient-to-br from-[#315596] to-[#2a4a82] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent 
                      align="end" 
                      className="w-48 bg-white border border-gray-200 shadow-xl rounded-lg p-1 mt-2"
                      sideOffset={5}
                    >
                      {/* User Info Header */}
                      <div className="px-3 py-2 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#315596] to-[#2a4a82] rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.email.split('@')[0]}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div>
                        <DropdownMenuItem 
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200"
                          onClick={() => setActiveView('settings')}
                        >
                          <UserCircle className="w-4 h-4 text-gray-500" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem 
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200"
                          onClick={() => setActiveView('settings')}
                        >
                          <Settings className="w-4 h-4 text-gray-500" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      </div>

                      <DropdownMenuSeparator className="my-1 border-gray-100" />
                      
                      <div>
                        <DropdownMenuItem 
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer transition-colors duration-200"
                          onClick={onSignOut}
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            
            {/* File Info */}
            <div className="bg-[#eef2f8] border border-[#bddeff] rounded p-4 md:p-6">
              <div className="flex items-start space-x-3">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#151515] mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base text-[#151515] font-medium truncate mb-2">
                    {uploadedFile.file.name}
                  </p>
                  
                  {/* Desktop File Details */}
                  <div className="hidden md:flex items-center text-sm text-[#363636] space-x-4 flex-wrap">
                    <span>Uploaded on {uploadedFile.uploadedAt.toLocaleDateString()} at {uploadedFile.uploadedAt.toLocaleTimeString()}</span>
                    <span>•</span>
                    <span>{(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB</span>
                    <span>•</span>
                    <span>Analysis Status: <span className="text-[#151515] font-semibold">Complete</span></span>
                    <span>•</span>
                    <span>Analyzed by: threadinsights.ai</span>
                  </div>

                  {/* Mobile File Details */}
                  <div className="md:hidden space-y-1 text-xs text-[#363636]">
                    <div className="flex items-center space-x-2">
                      <span>{uploadedFile.uploadedAt.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <div>
                      Analysis Status: <span className="text-[#151515] font-semibold">Complete</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <Button 
                    className="bg-[#315596] text-white hover:bg-[#2a4a82] hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    size={isMobile ? "sm" : "default"}
                    onClick={onBackToUpload}
                  >
                    <Upload className="w-4 h-4 mr-0 md:mr-2" />
                    <span className="hidden md:inline">Upload New File</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">

            
            {/* Content based on active view */}
            <div className="space-y-6">
              {shouldShowDashboard && (
                <DashboardOverview onMetricClick={handleMetricClick} onThreadViewClick={handleThreadViewClick} />
              )}
              
              {activeView === 'settings' && (
                <SettingsPage
                  user={user}
                  uploadedFile={uploadedFile}
                  onSignOut={onSignOut}
                  onBackToUpload={onBackToUpload}
                />
              )}
            </div>
          </div>
        </main>

        {/* Floating AI Assistant Button - simplified */}
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-30">
          <div className="relative group">
            <Button
              size={isMobile ? "default" : "lg"}
              className={`relative ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-800 text-white rounded-full shadow-lg border-2 border-emerald-400/50 hover:scale-105 transition-all duration-200 group-hover:shadow-xl`}
            >
              <div className="relative">
                <Brain className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
              </div>
            </Button>

            {/* Simplified tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                AI Assistant
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)

  const handleSignIn = useCallback((email: string) => {
    setUser({
      email,
      signedInAt: new Date()
    })
  }, [])

  const handleSignOut = useCallback(() => {
    setUser(null)
    setUploadedFile(null)
  }, [])

  const handleFileUploaded = useCallback((file: File) => {
    setUploadedFile({
      file,
      uploadedAt: new Date()
    })
  }, [])

  const handleBackToUpload = useCallback(() => {
    setUploadedFile(null)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* Sign in page */}
        <Route 
          path="/signin" 
          element={
            !user ? (
              <SignInPage onSignIn={handleSignIn} />
            ) : (
              <Navigate to="/upload" replace />
            )
          } 
        />
        
        {/* File upload page */}
        <Route 
          path="/upload" 
          element={
            user ? (
              <FileUploadPage 
                onFileUploaded={handleFileUploaded} 
                user={user} 
                onSignOut={handleSignOut} 
              />
            ) : (
              <Navigate to="/signin" replace />
            )
          } 
        />
        
        {/* Dashboard - requires user and uploaded file */}
        <Route 
          path="/dashboard" 
          element={
            user && uploadedFile ? (
              <DashboardLayout 
                user={user} 
                uploadedFile={uploadedFile} 
                onSignOut={handleSignOut}
                onBackToUpload={handleBackToUpload}
              />
            ) : user ? (
              <Navigate to="/upload" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          } 
        />
        
        {/* Detailed metric view */}
        <Route 
          path="/dashboard/metric/:metricType" 
          element={
            user && uploadedFile ? (
              <DetailedMetricView 
                metricType={window.location.pathname.split('/').pop() || ''} 
                onBack={() => window.history.back()} 
              />
            ) : (
              <Navigate to="/signin" replace />
            )
          } 
        />
        
        {/* Default redirect */}
        <Route 
          path="/" 
          element={
            user ? (
              uploadedFile ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/upload" replace />
              )
            ) : (
              <Navigate to="/signin" replace />
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}