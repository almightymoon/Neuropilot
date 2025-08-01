'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome, Check } from 'lucide-react'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'night'>('light')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Sign up failed')
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      // Redirect to workspace after successful sign up
      window.location.href = '/workspace'
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : 'Sign up failed' })
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

  const passwordStrength = () => {
    if (!formData.password) return 0
    let strength = 0
    if (formData.password.length >= 8) strength++
    if (/[a-z]/.test(formData.password)) strength++
    if (/[A-Z]/.test(formData.password)) strength++
    if (/[0-9]/.test(formData.password)) strength++
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++
    return strength
  }

  const getPasswordStrengthColor = () => {
    const strength = passwordStrength()
    if (strength <= 2) return 'bg-red-500'
    if (strength <= 3) return 'bg-yellow-500'
    if (strength <= 4) return 'bg-blue-500'
    return 'bg-green-500'
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
          <h2 className="text-3xl font-bold mb-2">Create your account</h2>
          <p className={cn(
            "text-lg",
            theme === 'dark' ? "text-gray-400" : 
            theme === 'night' ? "text-gray-300" : 
            "text-gray-600"
          )}>
            Join thousands of developers using AI to build faster
          </p>
        </div>

        {/* Sign Up Form */}
        <div className={cn(
          "rounded-2xl border p-8 shadow-xl backdrop-blur-sm",
          theme === 'dark' ? "bg-gray-800/50 border-gray-700" : 
          theme === 'night' ? "bg-black/50 border-gray-800" : 
          "bg-white/50 border-gray-200"
        )}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={cn(
                  "block text-sm font-medium mb-2",
                  theme === 'dark' ? "text-gray-300" : 
                  theme === 'night' ? "text-gray-200" : 
                  "text-gray-700"
                )}>
                  First name
                </label>
                <div className="relative">
                  <User className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5",
                    theme === 'dark' ? "text-gray-400" : 
                    theme === 'night' ? "text-gray-300" : 
                    "text-gray-400"
                  )} />
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    className={cn(
                      "w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
                      errors.firstName ? "border-red-500" :
                      theme === 'dark' ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : 
                      theme === 'night' ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : 
                      "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    )}
                    placeholder="John"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className={cn(
                  "block text-sm font-medium mb-2",
                  theme === 'dark' ? "text-gray-300" : 
                  theme === 'night' ? "text-gray-200" : 
                  "text-gray-700"
                )}>
                  Last name
                </label>
                <div className="relative">
                  <User className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5",
                    theme === 'dark' ? "text-gray-400" : 
                    theme === 'night' ? "text-gray-300" : 
                    "text-gray-400"
                  )} />
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    className={cn(
                      "w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
                      errors.lastName ? "border-red-500" :
                      theme === 'dark' ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : 
                      theme === 'night' ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : 
                      "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    )}
                    placeholder="Doe"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

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
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className={cn(
                    "w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
                    errors.email ? "border-red-500" :
                    theme === 'dark' ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : 
                    theme === 'night' ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : 
                    "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  )}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
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
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className={cn(
                    "w-full pl-10 pr-12 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
                    errors.password ? "border-red-500" :
                    theme === 'dark' ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : 
                    theme === 'night' ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : 
                    "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  )}
                  placeholder="Create a strong password"
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-all duration-300",
                          level <= passwordStrength() ? getPasswordStrengthColor() :
                          theme === 'dark' ? "bg-gray-600" : 
                          theme === 'night' ? "bg-gray-700" : 
                          "bg-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <p className={cn(
                    "mt-1 text-xs",
                    passwordStrength() <= 2 ? "text-red-500" :
                    passwordStrength() <= 3 ? "text-yellow-500" :
                    passwordStrength() <= 4 ? "text-blue-500" :
                    "text-green-500"
                  )}>
                    {passwordStrength() <= 2 ? "Weak" :
                     passwordStrength() <= 3 ? "Fair" :
                     passwordStrength() <= 4 ? "Good" :
                     "Strong"} password
                  </p>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className={cn(
                "block text-sm font-medium mb-2",
                theme === 'dark' ? "text-gray-300" : 
                theme === 'night' ? "text-gray-200" : 
                "text-gray-700"
              )}>
                Confirm password
              </label>
              <div className="relative">
                <Lock className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5",
                  theme === 'dark' ? "text-gray-400" : 
                  theme === 'night' ? "text-gray-300" : 
                  "text-gray-400"
                )} />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  className={cn(
                    "w-full pl-10 pr-12 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
                    errors.confirmPassword ? "border-red-500" :
                    theme === 'dark' ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : 
                    theme === 'night' ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : 
                    "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  )}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={cn(
                    "absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors",
                    theme === 'dark' ? "text-gray-400 hover:text-gray-300" : 
                    theme === 'night' ? "text-gray-300 hover:text-gray-200" : 
                    "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className={cn(
                  "mt-1 rounded border-2 focus:ring-primary-500",
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
                I agree to the{' '}
                <Link
                  href="/terms"
                  className={cn(
                    "font-medium transition-colors",
                    theme === 'dark' ? "text-primary-400 hover:text-primary-300" : 
                    theme === 'night' ? "text-primary-400 hover:text-primary-300" : 
                    "text-primary-600 hover:text-primary-700"
                  )}
                >
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link
                  href="/privacy"
                  className={cn(
                    "font-medium transition-colors",
                    theme === 'dark' ? "text-primary-400 hover:text-primary-300" : 
                    theme === 'night' ? "text-primary-400 hover:text-primary-300" : 
                    "text-primary-600 hover:text-primary-700"
                  )}
                >
                  Privacy Policy
                </Link>
              </span>
            </div>

            {/* Sign Up Button */}
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
                  Creating account...
                </div>
              ) : (
                <>
                  Create account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

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

          {/* Social Sign Up */}
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

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <span className={cn(
              "text-sm",
              theme === 'dark' ? "text-gray-400" : 
              theme === 'night' ? "text-gray-300" : 
              "text-gray-600"
            )}>
              Already have an account?{' '}
            </span>
            <Link
              href="/signin"
              className={cn(
                "text-sm font-medium transition-colors",
                theme === 'dark' ? "text-primary-400 hover:text-primary-300" : 
                theme === 'night' ? "text-primary-400 hover:text-primary-300" : 
                "text-primary-600 hover:text-primary-700"
              )}
            >
              Sign in
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