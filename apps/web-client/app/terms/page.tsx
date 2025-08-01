'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, ArrowLeft, Calendar, Shield, Users, FileText } from 'lucide-react'

export default function TermsPage() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'night'>('light')

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
      "min-h-screen transition-colors duration-200",
      theme === 'dark' ? 'bg-gray-900 text-white' : 
      theme === 'night' ? 'bg-black text-gray-100' : 
      'bg-gray-50 text-gray-900'
    )}>
      {/* Header */}
      <header className={cn(
        "border-b",
        theme === 'dark' ? "border-gray-700 bg-gray-800" : 
        theme === 'night' ? "border-gray-800 bg-black" : 
        "border-gray-200 bg-white"
      )}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Brain className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold">NeuroPilot</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className={cn(
                  "flex items-center text-sm font-medium transition-colors",
                  theme === 'dark' ? "text-gray-300 hover:text-white" : 
                  theme === 'night' ? "text-gray-300 hover:text-white" : 
                  "text-gray-600 hover:text-gray-900"
                )}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
              <button
                onClick={toggleTheme}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  theme === 'dark' ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : 
                  theme === 'night' ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : 
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
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className={cn(
          "rounded-2xl border p-8 shadow-xl",
          theme === 'dark' ? "bg-gray-800 border-gray-700" : 
          theme === 'night' ? "bg-black border-gray-800" : 
          "bg-white border-gray-200"
        )}>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-primary-600 mr-2" />
              <h1 className="text-3xl font-bold">Terms of Service</h1>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                <span>Version 1.0</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className={cn(
              "space-y-8",
              theme === 'dark' ? "prose-invert" : 
              theme === 'night' ? "prose-invert" : 
              ""
            )}>
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using NeuroPilot ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                <p className="mb-4">
                  NeuroPilot is an AI-powered workspace that provides:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Multi-AI model integration and routing</li>
                  <li>Code generation and assistance</li>
                  <li>Document creation and editing</li>
                  <li>Task automation and management</li>
                  <li>Collaborative workspace features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                <p className="mb-4">
                  To access certain features of the Service, you must create an account. You are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Providing accurate and complete information</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>
                <p className="mb-4">You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon intellectual property rights</li>
                  <li>Generate harmful, offensive, or inappropriate content</li>
                  <li>Attempt to gain unauthorized access to the Service</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Use the Service for commercial purposes without authorization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. AI Content and Limitations</h2>
                <p className="mb-4">
                  The Service uses AI models to generate content. You acknowledge that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI-generated content may contain inaccuracies or errors</li>
                  <li>You are responsible for reviewing and validating all generated content</li>
                  <li>We do not guarantee the accuracy, completeness, or usefulness of AI outputs</li>
                  <li>AI models may occasionally produce unexpected or inappropriate results</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Privacy and Data</h2>
                <p className="mb-4">
                  Your privacy is important to us. Please review our{' '}
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
                  {' '}to understand how we collect, use, and protect your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
                <p className="mb-4">
                  The Service and its original content, features, and functionality are owned by NeuroPilot and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Subscription and Payment</h2>
                <p className="mb-4">
                  Some features of the Service may require a paid subscription. Subscription terms, pricing, and payment methods will be clearly communicated before purchase.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
                <p className="mb-4">
                  We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Limitation of Liability</h2>
                <p className="mb-4">
                  In no event shall NeuroPilot be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-medium">NeuroPilot Support</p>
                  <p>Email: support@neuropilot.ai</p>
                  <p>Website: https://neuropilot.ai</p>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className={cn(
              "text-sm",
              theme === 'dark' ? "text-gray-400" : 
              theme === 'night' ? "text-gray-300" : 
              "text-gray-600"
            )}>
              By using NeuroPilot, you agree to these Terms of Service.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
} 