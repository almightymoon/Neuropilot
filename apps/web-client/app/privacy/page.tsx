'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, ArrowLeft, Calendar, Shield, Lock, Eye, Database, Users } from 'lucide-react'

export default function PrivacyPage() {
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
              <Shield className="h-8 w-8 text-primary-600 mr-2" />
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-1" />
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
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="mb-4">
                  At NeuroPilot, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered workspace service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
                <p className="mb-4">We collect information you provide directly to us:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and email address when you create an account</li>
                  <li>Profile information and preferences</li>
                  <li>Payment information (processed securely by third-party providers)</li>
                  <li>Communication preferences and settings</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Usage Information</h3>
                <p className="mb-4">We automatically collect certain information about your use of the Service:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Usage patterns and feature interactions</li>
                  <li>AI model usage and performance metrics</li>
                  <li>Device information and browser type</li>
                  <li>IP address and general location data</li>
                  <li>Error logs and crash reports</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Content and Data</h3>
                <p className="mb-4">We may collect and process:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Text content you input for AI processing</li>
                  <li>Generated AI responses and outputs</li>
                  <li>Document content and workspace data</li>
                  <li>Code snippets and technical information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use the collected information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing and improving our AI services</li>
                  <li>Personalizing your experience and recommendations</li>
                  <li>Processing payments and managing subscriptions</li>
                  <li>Communicating with you about service updates</li>
                  <li>Ensuring security and preventing fraud</li>
                  <li>Analyzing usage patterns to improve our service</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. AI and Data Processing</h2>
                <p className="mb-4">
                  Our service uses AI models to process your content. Here's how we handle your data:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Content is processed by AI models to generate responses</li>
                  <li>We may use your content to improve our AI models (with appropriate safeguards)</li>
                  <li>Your data is encrypted in transit and at rest</li>
                  <li>We implement strict access controls and monitoring</li>
                  <li>You can request deletion of your data at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Information Sharing</h2>
                <p className="mb-4">We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With your explicit consent</li>
                  <li>With trusted service providers who assist in operating our service</li>
                  <li>To comply with legal requirements or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
                <p className="mb-4">We implement comprehensive security measures to protect your information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>End-to-end encryption for data in transit</li>
                  <li>Strong encryption for data at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication measures</li>
                  <li>Monitoring and logging of system access</li>
                  <li>Regular security updates and patches</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
                <p className="mb-4">
                  We retain your information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account and associated data at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Your Rights</h2>
                <p className="mb-4">You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt-out of certain data processing activities</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Cookies and Tracking</h2>
                <p className="mb-4">
                  We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Third-Party Services</h2>
                <p className="mb-4">
                  Our service may integrate with third-party services (such as AI model providers). These services have their own privacy policies, and we encourage you to review them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Children's Privacy</h2>
                <p className="mb-4">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. International Data Transfers</h2>
                <p className="mb-4">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during such transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">13. Changes to This Policy</h2>
                <p className="mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes via email or through our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">14. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-medium">NeuroPilot Privacy Team</p>
                  <p>Email: privacy@neuropilot.ai</p>
                  <p>Website: https://neuropilot.ai</p>
                  <p>Address: [Your Business Address]</p>
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
              By using NeuroPilot, you agree to this Privacy Policy.
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