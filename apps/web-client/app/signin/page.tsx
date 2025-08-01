'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Eye, EyeOff, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark' | 'night'>('light')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')
    
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Sign in failed')
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      setMessage('Sign in successful!')
      
      // Redirect to workspace after a short delay
      setTimeout(() => {
        window.location.href = '/workspace'
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTheme = () => {
    const themes: ('light' | 'dark' | 'night')[] = ['light', 'dark', 'night']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    const newTheme = themes[nextIndex]
    setTheme(newTheme)
    
    // Apply theme to document
    document.documentElement.classList.remove('dark', 'night')
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (newTheme === 'night') {
      document.documentElement.classList.add('night')
    }
  }

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center transition-colors duration-200",
      theme === 'dark' ? 'bg-gray-900 text-white' : 
      theme === 'night' ? 'bg-black text-gray-100' : 
      'bg-gray-50 text-gray-900'
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-primary-600 mr-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              NeuroPilot
            </h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className={cn(
            "text-lg",
            theme === 'dark' ? "text-gray-400" : 
            theme === 'night' ? "text-gray-300" : 
            "text-gray-600"
          )}>
            Sign in to your account to continue
          </p>
        </div>

        {/* Sign In Form */}
        <div className={cn(
          "rounded-2xl border p-8 shadow-xl backdrop-blur-sm",
          theme === 'dark' ? "bg-gray-800/50 border-gray-700" : 
          theme === 'night' ? "bg-black/50 border-gray-800" : 
          "bg-white/50 border-gray-200"
        )}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className={cn(
                "block text-sm font-medium mb-2",
                theme === 'dark' ? "text-gray-300" : 
                theme === 'night' ? "text-gray-200" : 
                "text-gray-700"
              )}>
                Email address
              </label>
              <div className="relative">
                <Mail className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5",
                  theme === 'dark' ? "text-gray-400" : 
                  theme === 'night' ? "text-gray-300" : 
                  "text-gray-400"
                )} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cn(
                    "w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
                    theme === 'dark' ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : 
                    theme === 'night' ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : 
                    "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  )}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={cn(
                "block text-sm font-medium mb-2",
                theme === 'dark' ? "text-gray-300" : 
                theme === 'night' ? "text-gray-200" : 
                "text-gray-700"
              )}>
                Password
              </label>
              <div className="relative">
                <Lock className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5",
                  theme === 'dark' ? "text-gray-400" : 
                  theme === 'night' ? "text-gray-300" : 
                  "text-gray-400"
                )} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={cn(
                    "w-full pl-10 pr-12 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
                    theme === 'dark' ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : 
                    theme === 'night' ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : 
                    "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  )}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn(
                    "absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors",
                    theme === 'dark' ? "text-gray-400 hover:text-gray-300" : 
                    theme === 'night' ? "text-gray-300 hover:text-gray-200" : 
                    "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className={cn(
                    "rounded border-2 focus:ring-primary-500",
                    theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                    theme === 'night' ? "bg-gray-800 border-gray-700" : 
                    "bg-white border-gray-300"
                  )}
                />
                <span className={cn(
                  "ml-2 text-sm",
                  theme === 'dark' ? "text-gray-300" : 
                  theme === 'night' ? "text-gray-200" : 
                  "text-gray-700"
                )}>
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className={cn(
                  "text-sm font-medium transition-colors",
                  theme === 'dark' ? "text-primary-400 hover:text-primary-300" : 
                  theme === 'night' ? "text-primary-400 hover:text-primary-300" : 
                  "text-primary-600 hover:text-primary-700"
                )}
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                "bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                theme === 'dark' ? "focus:ring-offset-gray-800" : 
                theme === 'night' ? "focus:ring-offset-black" : 
                "focus:ring-offset-white"
              )}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700">
              {message}
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className={cn(
              "absolute inset-0 flex items-center",
              theme === 'dark' ? "border-gray-700" : 
              theme === 'night' ? "border-gray-800" : 
              "border-gray-300"
            )}>
              <div className={cn(
                "w-full border-t",
                theme === 'dark' ? "border-gray-700" : 
                theme === 'night' ? "border-gray-800" : 
                "border-gray-300"
              )} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={cn(
                "px-2",
                theme === 'dark' ? "bg-gray-800 text-gray-400" : 
                theme === 'night' ? "bg-black text-gray-300" : 
                "bg-white text-gray-500"
              )}>
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Sign In */}
          <div className="space-y-3">
            <button className={cn(
              "w-full flex items-center justify-center px-4 py-3 rounded-lg border font-medium transition-all duration-200",
              theme === 'dark' ? "border-gray-600 bg-gray-700 text-white hover:bg-gray-600" : 
              theme === 'night' ? "border-gray-700 bg-gray-800 text-white hover:bg-gray-700" : 
              "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            )}>
              <Github className="h-5 w-5 mr-2" />
              Continue with GitHub
            </button>
            <button className={cn(
              "w-full flex items-center justify-center px-4 py-3 rounded-lg border font-medium transition-all duration-200",
              theme === 'dark' ? "border-gray-600 bg-gray-700 text-white hover:bg-gray-600" : 
              theme === 'night' ? "border-gray-700 bg-gray-800 text-white hover:bg-gray-700" : 
              "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            )}>
              <Chrome className="h-5 w-5 mr-2" />
              Continue with Google
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <span className={cn(
              "text-sm",
              theme === 'dark' ? "text-gray-400" : 
              theme === 'night' ? "text-gray-300" : 
              "text-gray-600"
            )}>
              Don't have an account?{' '}
            </span>
            <Link
              href="/signup"
              className={cn(
                "text-sm font-medium transition-colors",
                theme === 'dark' ? "text-primary-400 hover:text-primary-300" : 
                theme === 'night' ? "text-primary-400 hover:text-primary-300" : 
                "text-primary-600 hover:text-primary-700"
              )}
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              theme === 'dark' ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : 
              theme === 'night' ? "bg-gray-900 text-gray-300 hover:bg-gray-800" : 
              "bg-white text-gray-600 hover:bg-gray-50"
            )}
            title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'night' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <div className="h-5 w-5">🌙</div>
            ) : theme === 'dark' ? (
              <div className="h-5 w-5">🌑</div>
            ) : (
              <div className="h-5 w-5">☀️</div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
} 