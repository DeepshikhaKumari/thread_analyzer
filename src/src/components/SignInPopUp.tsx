import { useState, useEffect } from 'react'
import svgPaths from "../../imports/svg-xaqu72nuou";
import imgAdobeStock13112503002 from "figma:asset/1c4393e1f1441aef447b89d72e579a7dc792fb0e.png";
import imgIllustration from "figma:asset/3cd8e0fa3897ef36cd2b5ede44900f4589093b2b.png";
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Eye, EyeOff, X } from 'lucide-react'

interface SignInPopUpProps {
  onSignIn: (email: string) => void
  onClose: () => void
}

// Google Icon Component
function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

// GitHub Icon Component
function GitHubIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export function SignInPopUp({ onSignIn, onClose }: SignInPopUpProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isCloseHovered, setIsCloseHovered] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSigningIn(true)
    
    // Simulate sign-in process
    setTimeout(() => {
      setIsSigningIn(false)
      onSignIn(email || 'demo@tdbot.com')
    }, 1500)
  }

  const handleSocialSignIn = (provider: string) => {
    onSignIn(`demo@${provider}.com`)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle escape key to close popup and focus management
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Focus the first input when popup opens
    const firstInput = document.querySelector('input[type="email"]') as HTMLInputElement
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100)
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur - click to close */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer animate-in fade-in duration-300"
        onClick={handleBackdropClick}
      />
      
      {/* Popup Container */}
      <div 
        className="relative bg-white rounded-[50px] shadow-[0px_0px_17px_6px_rgba(0,0,0,0.32)] w-full max-w-[900px] lg:h-[580px] h-[620px] mx-4 overflow-hidden animate-in zoom-in-95 fade-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Interactive Close Button */}
        <button
          onClick={onClose}
          onMouseEnter={() => setIsCloseHovered(true)}
          onMouseLeave={() => setIsCloseHovered(false)}
          className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-white/95 hover:bg-white hover:shadow-lg transition-all duration-300 ease-out group border border-gray-200/80"
          aria-label="Close sign in popup"
        >
          <X className={`w-5 h-5 text-gray-600 group-hover:text-red-500 transition-all duration-300 ease-out ${
            isCloseHovered ? 'rotate-90 scale-110' : 'rotate-0 scale-100'
          }`} />
          {isCloseHovered && (
            <div className="absolute inset-0 rounded-full bg-red-50 -z-10 opacity-75" />
          )}
        </button>

        {/* Left Side Background and Illustration - Desktop Only */}
        <div className="absolute left-0 top-0 lg:w-[440px] w-0 h-full lg:block hidden">
          {/* Background image layer */}
          <div 
            className="absolute bg-[#000000] h-full left-0 rounded-bl-[50px] rounded-tl-[50px] w-[440px] animate-in slide-in-from-left-5 duration-500"
            style={{ 
              backgroundImage: `url('${imgAdobeStock13112503002}')`,
              backgroundPosition: '39.53% 54.79%',
              backgroundSize: '189.77% 113.71%',
              filter: 'brightness(0.80) contrast(1)'
            }} 
          />
          
          {/* Dark overlay to enhance illustration visibility */}
          <div className="absolute bg-black/70 h-full left-0 rounded-bl-[50px] rounded-tl-[50px] w-[440px] animate-in slide-in-from-left-5 duration-500" />
          
          {/* Illustration overlay with enhanced shadows */}
          <div className="absolute h-[460px] left-[15px] top-[60px] w-[457px] animate-in slide-in-from-left-3 duration-700 delay-200">
            <img 
              className="block w-full h-full object-contain drop-shadow-2xl" 
              src={imgIllustration} 
              alt="Professional workspace illustration showing a person working at a desk with security and analytics"
              style={{
                filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.8)) drop-shadow(0 15px 35px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.15)) brightness(1.1) contrast(1.1)'
              }}
            />
          </div>
        </div>

        {/* Mobile Header Image */}
        <div className="lg:hidden absolute top-4 left-1/2 -translate-x-1/2 w-32 h-20 opacity-40">
          <img 
            className="block w-full h-full object-contain drop-shadow-sm" 
            src={imgAdobeStock13112503002} 
            alt="Professional workspace illustration"
          />
        </div>

        {/* Form Container - Optimized spacing and positioning */}
        <div className="absolute lg:left-[480px] left-8 right-8 lg:right-12 top-24 lg:top-12 lg:w-[360px] w-auto pb-8 animate-in slide-in-from-right-5 duration-500 delay-100">
          {/* Desktop Header */}
          <div className="mb-5 lg:block hidden">
            <h2 className="text-2xl font-medium text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-600">Sign in to access your Thread Analyzer dashboard</p>
          </div>
          
          {/* Mobile Header */}
          <div className="mb-5 lg:hidden">
            <h2 className="text-xl font-medium text-center text-gray-800">Sign In</h2>
            <p className="text-sm text-gray-600 text-center mt-1">Welcome back to Thread Analyzer</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-4 space-y-3">
            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[40px] rounded-[12px] border-gray-300 border-[1.5px] px-4 text-sm placeholder:text-gray-400 bg-white focus:border-[#315596] focus:ring-2 focus:ring-[#315596]/20 transition-all duration-200"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[40px] rounded-[12px] border-gray-300 border-[1.5px] px-4 pr-12 text-sm placeholder:text-gray-400 bg-white focus:border-[#315596] focus:ring-2 focus:ring-[#315596]/20 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[36px] -translate-y-1/2 text-gray-500 hover:text-[#315596] transition-colors duration-200 p-1 rounded mx-[0px] my-[8px]"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-[#315596] transition-colors duration-200 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button with Cool Effects */}
            <Button
              type="submit"
              disabled={isSigningIn}
              className={`w-full h-[42px] bg-[#315596] hover:bg-[#4a7bc8] rounded-[12px] text-sm font-medium text-white transition-all duration-300 ease-out hover:shadow-[0_8px_25px_rgba(49,85,150,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                isSigningIn ? 'animate-pulse' : ''
              }`}
            >
              {isSigningIn ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>

            {/* Divider */}
            <div className="relative flex items-center justify-center py-3">
             
              <span className="bg-white px-4 text-sm text-gray-500">or continue with</span>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSocialSignIn('google')}
                className="flex-1 h-10 rounded-[12px] border border-gray-300 hover:border-[#315596] hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2.5 group"
              >
                <GoogleIcon />
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#315596] transition-colors duration-200">Google</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleSocialSignIn('github')}
                className="flex-1 h-10 rounded-[12px] border border-gray-300 hover:border-[#315596] hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2.5 group"
              >
                <GitHubIcon />
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#315596] transition-colors duration-200">GitHub</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-1">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-[#315596] hover:text-[#4a7bc8] font-medium transition-colors duration-200 hover:underline"
                  onClick={() => onSignIn('demo@signup.com')}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}