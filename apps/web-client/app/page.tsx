import Link from 'next/link'
import { ArrowRight, Brain, Code, FileText, Zap, Users, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NeuroPilot</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/signin" className="text-gray-600 hover:text-gray-900 font-medium">
                Sign in
              </Link>
              <Link href="/signup" className="btn btn-secondary">
                Sign up
              </Link>
              <Link href="/workspace" className="btn btn-primary">
                Launch Workspace
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your All-in-One{' '}
              <span className="text-primary-600">AI Workspace</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Powered by GPT-4, Claude, and more — all under one smart interface. 
              Generate code, write documents, and solve complex problems with the best AI models.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/workspace" className="btn btn-primary text-lg px-8 py-3">
                Try Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="#demo" className="btn btn-secondary text-lg px-8 py-3">
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need in one place
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Combine the best features of top AI tools with unique capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-primary-600" />
                <h3 className="ml-3 text-lg font-semibold">Multi-AI Integration</h3>
              </div>
              <p className="text-gray-600">
                Smart model router automatically selects the best AI for each task. 
                GPT-4 for reasoning, Claude for summarization, and more.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <Code className="h-8 w-8 text-primary-600" />
                <h3 className="ml-3 text-lg font-semibold">Code Copilot</h3>
              </div>
              <p className="text-gray-600">
                In-line code generation, refactoring, and documentation. 
                Supports JavaScript, TypeScript, React, and more.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-primary-600" />
                <h3 className="ml-3 text-lg font-semibold">Natural Language Editor</h3>
              </div>
              <p className="text-gray-600">
                Create and edit documents using plain language. 
                Rewrite, summarize, expand, and format with AI assistance.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-primary-600" />
                <h3 className="ml-3 text-lg font-semibold">Task Mode</h3>
              </div>
              <p className="text-gray-600">
                Auto-multi-step execution for complex tasks. 
                Break down commands into subtasks and execute them sequentially.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-primary-600" />
                <h3 className="ml-3 text-lg font-semibold">Context Memory</h3>
              </div>
              <p className="text-gray-600">
                AI remembers current thread context with basic state memory. 
                Coherent conversations across sessions.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-primary-600" />
                <h3 className="ml-3 text-lg font-semibold">Team Collaboration</h3>
              </div>
              <p className="text-gray-600">
                Share workspaces, collaborate on documents, and manage team access. 
                Built for both individuals and teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How it works
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 mb-4">
                <span className="text-xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Ask a question</h3>
              <p className="text-gray-600">Type your request in natural language</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 mb-4">
                <span className="text-xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI chooses model</h3>
              <p className="text-gray-600">Smart router selects the best AI for your task</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 mb-4">
                <span className="text-xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get instant output</h3>
              <p className="text-gray-600">Receive results with follow-up suggestions</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 mb-4">
                <span className="text-xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Save & continue</h3>
              <p className="text-gray-600">Save your work with memory retained</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that works best for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Free</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Star className="h-4 w-4 text-green-500 mr-2" />
                  100 AI requests per month
                </li>
                <li className="flex items-center">
                  <Star className="h-4 w-4 text-green-500 mr-2" />
                  Basic code generation
                </li>
                <li className="flex items-center">
                  <Star className="h-4 w-4 text-green-500 mr-2" />
                  1 workspace
                </li>
              </ul>
              <Link href="/workspace" className="btn btn-secondary w-full">
                Get Started
              </Link>
            </div>
            
            <div className="card border-primary-500 border-2">
              <h3 className="text-xl font-semibold mb-4">Pro</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">$29</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Star className="h-4 w-4 text-green-500 mr-2" />
                  Unlimited AI requests
                </li>
                <li className="flex items-center">
                  <Star className="h-4 w-4 text-green-500 mr-2" />
                  Priority processing
                </li>
                <li className="flex items-center">
                  <Star className="h-4 w-4 text-green-500 mr-2" />
                  Advanced features
                </li>
                <li className="flex items-center">
                  <Star className="h-4 w-4 text-green-500 mr-2" />
                  5 workspaces
                </li>
              </ul>
              <Link href="/workspace" className="btn btn-primary w-full">
                Start Pro Trial
              </Link>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Team</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">$99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Star className="h-4 w-4 text-green-500 mr-2" />
                  Everything in Pro
                </li>
                <li className="flex items-center">
                  <Star className="h-4 w-4 text-green-500 mr-2" />
                  Team collaboration
                </li>
                <li className="flex items-center">
                  <Star className="h-4 w-4 text-green-500 mr-2" />
                  Usage dashboard
                </li>
                <li className="flex items-center">
                  <Star className="h-4 w-4 text-green-500 mr-2" />
                  Unlimited workspaces
                </li>
              </ul>
              <Link href="/workspace" className="btn btn-secondary w-full">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-primary-400" />
                <span className="ml-2 text-lg font-bold">NeuroPilot</span>
              </div>
              <p className="text-gray-400">
                Your all-in-one AI workspace assistant
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/workspace" className="hover:text-white">Workspace</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NeuroPilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 