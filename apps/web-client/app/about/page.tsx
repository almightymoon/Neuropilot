import Link from 'next/link'
import { Brain, Code, FileText, Zap, Users, Star, ArrowLeft, Github, Twitter, Linkedin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Brain className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">NeuroPilot</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/workspace" className="text-gray-600 hover:text-gray-900">Workspace</Link>
              <Link href="/about" className="text-primary-600 font-medium">About</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/workspace" className="btn btn-primary">
                Launch Workspace
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              About NeuroPilot
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The next-generation AI workspace that combines the best features of top AI tools 
              with unique capabilities for developers, writers, and creators.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe that AI should be accessible, powerful, and seamlessly integrated into your workflow. 
                NeuroPilot was built to eliminate the friction between different AI tools and provide a unified 
                experience that adapts to your needs.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're coding, writing, analyzing data, or solving complex problems, 
                NeuroPilot intelligently routes your requests to the best AI model and provides 
                contextual, actionable results.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-8 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Brain className="h-6 w-6 text-primary-600 mr-3" />
                  <span className="font-medium">Smart Model Routing</span>
                </div>
                <div className="flex items-center">
                  <Code className="h-6 w-6 text-primary-600 mr-3" />
                  <span className="font-medium">Context-Aware Processing</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-primary-600 mr-3" />
                  <span className="font-medium">Natural Language Interface</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-6 w-6 text-primary-600 mr-3" />
                  <span className="font-medium">Multi-Step Task Execution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-gray-600">
              NeuroPilot leverages cutting-edge AI models and modern web technologies 
              to deliver a seamless experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">AI Models</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• GPT-4 for reasoning & analysis</li>
                <li>• Claude for summarization</li>
                <li>• Code-specific models</li>
                <li>• Custom fine-tuned models</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Next.js 14 with App Router</li>
                <li>• React 18 with TypeScript</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Framer Motion animations</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Backend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Node.js with TypeScript</li>
                <li>• AI orchestration engine</li>
                <li>• Memory store system</li>
                <li>• Task runner framework</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              Key Features
            </h2>
            <p className="text-lg text-gray-600">
              Discover what makes NeuroPilot unique
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Multi-AI Integration</h3>
                <p className="text-gray-600 mb-4">
                  Our intelligent model router automatically selects the best AI for each task. 
                  GPT-4 handles complex reasoning, Claude excels at summarization, and specialized 
                  models tackle code generation and analysis.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Automatic model selection based on task type</li>
                  <li>• Fallback mechanisms for reliability</li>
                  <li>• Cost optimization through smart routing</li>
                </ul>
              </div>
              <div className="flex-1 bg-gradient-to-br from-primary-50 to-blue-50 p-6 rounded-xl">
                <Brain className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <p className="text-center text-gray-700">
                  Smart routing ensures you always get the best AI for your specific needs
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Context Memory System</h3>
                <p className="text-gray-600 mb-4">
                  NeuroPilot maintains context across conversations and sessions. 
                  The AI remembers your previous interactions, project details, and preferences 
                  to provide more relevant and coherent responses.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Persistent conversation history</li>
                  <li>• Project-specific context</li>
                  <li>• User preference learning</li>
                </ul>
              </div>
              <div className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-center text-gray-700">
                  Context-aware AI that remembers your work and preferences
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Task Mode & Automation</h3>
                <p className="text-gray-600 mb-4">
                  Break down complex tasks into executable steps. NeuroPilot can automatically 
                  execute multi-step processes, from code generation to testing and deployment.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Multi-step task execution</li>
                  <li>• Automated code generation</li>
                  <li>• Built-in testing and validation</li>
                </ul>
              </div>
              <div className="flex-1 bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
                <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <p className="text-center text-gray-700">
                  Automate complex workflows with intelligent task execution
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              Meet the Team
            </h2>
            <p className="text-lg text-gray-600">
              Built by developers, for developers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">M</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Moon</h3>
              <p className="text-gray-600 mb-4">Founder & Lead Developer</p>
              <p className="text-gray-600 text-sm">
                Full-stack developer with expertise in AI, React, and modern web technologies. 
                Passionate about creating intuitive tools that enhance productivity.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">AI</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
              <p className="text-gray-600 mb-4">Development Partner</p>
              <p className="text-gray-600 text-sm">
                Powered by advanced language models, helping to build and improve NeuroPilot 
                through intelligent code generation and problem-solving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              Roadmap
            </h2>
            <p className="text-lg text-gray-600">
              What's coming next in NeuroPilot
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">Q1</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Enhanced AI Models</h3>
                <p className="text-gray-600">
                  Integration with Claude 3.5 Sonnet, GPT-4 Turbo, and specialized coding models. 
                  Improved model routing and cost optimization.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-bold">Q2</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
                <p className="text-gray-600">
                  Shared workspaces, real-time collaboration, and team management features. 
                  Role-based access control and usage analytics.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-bold">Q3</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Advanced Automation</h3>
                <p className="text-gray-600">
                  Custom workflow automation, API integrations, and advanced task templates. 
                  Support for complex multi-step processes.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-bold">Q4</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Enterprise Features</h3>
                <p className="text-gray-600">
                  Enterprise-grade security, SSO integration, advanced analytics, and custom deployments. 
                  Dedicated support and SLA guarantees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of developers and creators who are already using NeuroPilot 
            to boost their productivity and creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/workspace" className="btn btn-primary text-lg px-8 py-3">
              Try NeuroPilot Free
            </Link>
            <Link href="https://github.com/almightymoon/Neuropilot" className="btn btn-secondary text-lg px-8 py-3">
              <Github className="h-5 w-5 mr-2" />
              View on GitHub
            </Link>
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
              <p className="text-gray-400 mb-4">
                Your all-in-one AI workspace assistant
              </p>
              <div className="flex space-x-4">
                <Link href="https://github.com/almightymoon/Neuropilot" className="text-gray-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Features</Link></li>
                <li><Link href="/workspace" className="hover:text-white">Workspace</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
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