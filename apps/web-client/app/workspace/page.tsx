'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, FileText, Code, Zap, Settings, Plus, MessageSquare, Brain, Upload, Download, Trash2, Edit3, Copy, Check, X, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Users, Mic, MicOff, Volume2, VolumeX, Search, Filter, Share2, Bookmark, Clock, BarChart3, Play, Square, RotateCcw, Eye, EyeOff, Palette, Keyboard, GitBranch, Database, Shield, Globe, Lock, Unlock, Terminal, Cpu, HardDrive, Wifi, WifiOff, AlertCircle, CheckCircle, Info, Star, Heart, BookOpen, Calendar, Timer, Target, TrendingUp, Users2, UserPlus, UserMinus, Bell, Moon, Sun, Monitor, Smartphone, Tablet, Maximize2, Minimize2, Split, Grid, List, Columns, Rows, Folder, FolderOpen, File, FilePlus, FileMinus, Save, SaveAll, Undo, Redo, Scissors, Link, Unlink, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Indent, Outdent, Quote, Code2, Table, Image, Video, Music, MapPin, Mail, Phone, MessageCircle, Navigation, Compass, Home, Building, Car, Plane, Train, Bus, Bike, Gamepad2, Headphones, Speaker, Volume1, Repeat, Shuffle, SkipBack, SkipForward, Pause, Disc, Radio, Tv, Watch, Camera, CameraOff, VideoOff, ImageOff, Server, ServerOff, Cloud, CloudOff, Signal, Battery, Power, PowerOff, Flame, Droplets, Wind, Atom, Dna, Microscope, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Triangle, Circle, Hexagon, Octagon, Pentagon, Diamond, Cross, Minus, Divide, Equal, Infinity, Pi, Sigma, Layers, ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon, Key, UserX, FileText as FileTextIcon, Shield as ShieldIcon, Eye as EyeIcon, EyeOff as EyeOffIcon, AlertTriangle, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  model?: string
  attachments?: string[]
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  steps: TaskStep[]
  createdAt: Date
}

interface TaskStep {
  id: string
  title: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  output?: string
}

interface WorkspaceTemplate {
  id: string
  name: string
  description: string
  icon: string
  category: 'development' | 'writing' | 'analysis' | 'design' | 'research'
  settings: any
}

interface FileUpload {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedAt: Date
}

interface CollaborationUser {
  id: string
  name: string
  email: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  lastSeen: Date
}

interface CodeExecution {
  id: string
  code: string
  language: string
  output: string
  error?: string
  executionTime: number
  timestamp: Date
}

export default function WorkspacePage() {
  // AI Memory & Learning System Interfaces
  interface MemoryItem {
    id: string
    type: 'concept' | 'preference' | 'pattern' | 'fact' | 'skill'
    content: string
    context: string
    confidence: number
    lastAccessed: Date
    accessCount: number
    tags: string[]
    relatedMemories: string[]
    importance: number
  }

  interface LearningPattern {
    id: string
    pattern: string
    description: string
    confidence: number
    examples: string[]
    lastUsed: Date
    successRate: number
  }

  interface UserPreference {
    id: string
    category: string
    preference: string
    strength: number
    context: string
    lastUpdated: Date
  }

  const [activeTab, setActiveTab] = useState<'chat' | 'document' | 'tasks'>('chat')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [documentContent, setDocumentContent] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [showSidebar, setShowSidebar] = useState(true)
  const [selectedModel, setSelectedModel] = useState('gpt-4')
  const [showModelSelector, setShowModelSelector] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const [settings, setSettings] = useState({
    autoSave: true,
    theme: 'light',
    fontSize: 'medium',
    enableNotifications: true,
    enableSound: false,
    autoScroll: true,
    compactMode: false,
    showLineNumbers: true,
    enableAutoComplete: true,
    enableSpellCheck: true,
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    
    // Advanced Settings
    enableMarkdown: true,
    enableCodeHighlighting: true,
    enableImageGeneration: false,
    enableVoiceInput: true,
    enableVoiceOutput: false,
    enableRealTimeCollaboration: false,
    enableVersionHistory: true,
    enableAutoBackup: true,
    enableSync: true,
    enableOfflineMode: false,
    
    // Model Settings
    defaultModel: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0,
    enableModelSwitching: true,
    enableContextMemory: true,
    contextWindowSize: 10,
    
    // Accessibility
    enableHighContrast: false,
    enableLargeText: false,
    enableScreenReader: false,
    enableKeyboardNavigation: true,
    enableReducedMotion: false,
    
    // Privacy & Security
    enableDataCollection: true,
    enableErrorReporting: true,
    enableUsageAnalytics: true,
    enableConversationSharing: false,
    enablePublicConversations: false,
    enableConversationExport: true,
    enableConversationImport: true,
    
    // Workspace Settings
    enableMultipleWorkspaces: true,
    enableWorkspaceSharing: false,
    enableWorkspaceTemplates: true,
    enableCustomPrompts: true,
    enablePromptLibrary: true,
    enableConversationFolders: true,
    enableConversationTags: true,
    
    // Integration Settings
    enableGitHubIntegration: false,
    enableSlackIntegration: false,
    enableDiscordIntegration: false,
    enableNotionIntegration: false,
    enableGoogleDriveIntegration: false,
    enableDropboxIntegration: false,
    
    // Performance Settings
    enableCaching: true,
    enableCompression: true,
    enableLazyLoading: true,
    enableBackgroundSync: true,
    enableAutoOptimization: true,
    
    // Notification Settings
    enableEmailNotifications: false,
    enablePushNotifications: true,
    enableDesktopNotifications: true,
    enableSoundNotifications: false,
    enableConversationReminders: false,
    enableDailyDigest: false,
    
    // Chat Settings
    enableMessageEditing: true,
    enableMessageDeletion: true,
    enableMessageCopying: true,
    enableMessageSharing: true,
    enableConversationSearch: true,
    enableConversationFiltering: true,
    enableConversationSorting: true,
    enableConversationPinning: true,
    enableConversationArchiving: true,
    
    // Code Settings
    enableCodeExecution: false,
    enableCodeFormatting: true,
    enableCodeLinting: true,
    enableCodeCompletion: true,
    enableCodeSnippets: true,
    enableCodeTemplates: true,
    
    // Document Settings
    enableDocumentEditing: true,
    enableDocumentVersioning: true,
    enableDocumentSharing: false,
    enableDocumentExport: true,
    enableDocumentImport: true,
    enableDocumentTemplates: true,
    
    // Task Settings
    enableTaskManagement: true,
    enableTaskReminders: true,
    enableTaskPrioritization: true,
    enableTaskCategories: true,
    enableTaskProgress: true,
    enableTaskCollaboration: false
  })

  const [user, setUser] = useState({
    isLoggedIn: false,
    email: '',
    name: '',
    avatar: '',
    subscription: 'free',
    usage: {
      requests: 0,
      limit: 100,
      resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    }
  })

  // Check for existing authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser({
          isLoggedIn: true,
          email: parsedUser.email || '',
          name: `${parsedUser.firstName || ''} ${parsedUser.lastName || ''}`.trim(),
          avatar: parsedUser.avatar || '',
          subscription: parsedUser.subscription?.plan || 'free',
          usage: {
            requests: 0,
            limit: 100,
            resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        })
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }, [])

  // Advanced Features State
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [codeExecutions, setCodeExecutions] = useState<CodeExecution[]>([])
  const [isExecutingCode, setIsExecutingCode] = useState(false)
  const [collaborationUsers, setCollaborationUsers] = useState<CollaborationUser[]>([])
  const [showCollaboration, setShowCollaboration] = useState(false)
  const [workspaceTemplates, setWorkspaceTemplates] = useState<WorkspaceTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [performanceMetrics, setPerformanceMetrics] = useState({
    responseTime: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    networkLatency: 0
  })
  const [showPerformance, setShowPerformance] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [aiModelSettings, setAiModelSettings] = useState({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0
  })

  // New UI Enhancement State
  const [showHistory, setShowHistory] = useState(false)
  const [showMemory, setShowMemory] = useState(false)
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)
  const [showSlashCommands, setShowSlashCommands] = useState(false)
  const [documentHistory, setDocumentHistory] = useState<string[]>([])
  const [currentDocumentVersion, setCurrentDocumentVersion] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  // Next-Level UI State
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [showPromptConstructor, setShowPromptConstructor] = useState(false)
  const [selectedOutput, setSelectedOutput] = useState<string | null>(null)
  const [showOutputToolbar, setShowOutputToolbar] = useState(false)
  const [aiAvatarState, setAiAvatarState] = useState<'idle' | 'typing' | 'thinking'>('idle')
  const [pinnedContext, setPinnedContext] = useState<string[]>([])

  // Audio Input State
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [recognition, setRecognition] = useState<any>(null)

  // Advanced Command UI State
  const [detectedIntent, setDetectedIntent] = useState<string | null>(null)
  const [showIntentPreview, setShowIntentPreview] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [favoritePrompts, setFavoritePrompts] = useState<string[]>([])
  const [showMemoryStrip, setShowMemoryStrip] = useState(false)
  const [modelComparison, setModelComparison] = useState(false)
  
  // Enhanced Settings State
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [showExportData, setShowExportData] = useState(false)
  const [showPrivacySettings, setShowPrivacySettings] = useState(false)
  const [resetPasswordEmail, setResetPasswordEmail] = useState('')
  const [resetPasswordStep, setResetPasswordStep] = useState<'email' | 'code' | 'new-password'>('email')
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [resetPasswordMessage, setResetPasswordMessage] = useState('')
  
  // Additional Settings State
  const [showDataUsage, setShowDataUsage] = useState(false)
  const [showBillingSettings, setShowBillingSettings] = useState(false)
  const [showTeamSettings, setShowTeamSettings] = useState(false)
  const [showIntegrations, setShowIntegrations] = useState(false)
  const [showAPIKeys, setShowAPIKeys] = useState(false)
  const [showWorkspaceSettings, setShowWorkspaceSettings] = useState(false)
  const [showModelSettings, setShowModelSettings] = useState(false)
  const [showAccessibilitySettings, setShowAccessibilitySettings] = useState(false)
  const [showBackupSettings, setShowBackupSettings] = useState(false)
  const [showSyncSettings, setShowSyncSettings] = useState(false)
  const [showExportImport, setShowExportImport] = useState(false)
  
  // AI Memory & Learning System State
  const [learningPatterns, setLearningPatterns] = useState<LearningPattern[]>([])
  const [userPreferences, setUserPreferences] = useState<UserPreference[]>([])
  const [showMemoryPanel, setShowMemoryPanel] = useState(false)
  const [showLearningInsights, setShowLearningInsights] = useState(false)
  const [showMemoryAnalytics, setShowMemoryAnalytics] = useState(false)
  const [memoryStats, setMemoryStats] = useState({
    totalMemories: 0,
    activeMemories: 0,
    learningPatterns: 0,
    userPreferences: 0,
    memoryEfficiency: 0.85
  })
  
  // Enhanced Memory System
  const [memoryItems, setMemoryItems] = useState<MemoryItem[]>([])
  const [memorySearchQuery, setMemorySearchQuery] = useState('')
  const [selectedMemoryType, setSelectedMemoryType] = useState<MemoryItem['type']>('concept')
  const [isLearningEnabled, setIsLearningEnabled] = useState(true)
  const [memoryCapacity, setMemoryCapacity] = useState(1000)
  const [currentMemoryUsage, setCurrentMemoryUsage] = useState(0)
  
  const [memoryTimeline, setMemoryTimeline] = useState<Array<{
    id: string
    timestamp: Date
    type: 'conversation' | 'task' | 'preference' | 'learning'
    content: string
    importance: number
    tags: string[]
  }>>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      type: 'preference',
      content: 'Prefers dark mode and coding tasks',
      importance: 8,
      tags: ['ui', 'coding']
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      type: 'conversation',
      content: 'Discussed React component optimization',
      importance: 7,
      tags: ['react', 'performance']
    }
  ])
  
  const [crossSessionMemory, setCrossSessionMemory] = useState({
    preferredModels: { coding: 'gpt-4', writing: 'claude-3' },
    commonTasks: ['code review', 'bug fixing', 'documentation'],
    learningPatterns: ['prefers detailed explanations', 'likes code examples'],
    lastSession: new Date(Date.now() - 3600000)
  })

  // Enhanced AI Model Management
  const [modelPerformance, setModelPerformance] = useState<Record<string, { accuracy: number, speed: number, cost: number }>>({
    'gpt-4': { accuracy: 95, speed: 70, cost: 80 },
    'claude-3': { accuracy: 92, speed: 85, cost: 60 },
    'gemini-pro': { accuracy: 88, speed: 90, cost: 40 }
  })
  
  const [pinnedModels, setPinnedModels] = useState<Record<string, string>>({
    'coding': 'gpt-4',
    'writing': 'claude-3',
    'analysis': 'gpt-4',
    'creative': 'gemini-pro'
  })
  
  const [autoModeEnabled, setAutoModeEnabled] = useState(true)
  const [lastModelChoice, setLastModelChoice] = useState<string | null>(null)
  const [modelChoiceReason, setModelChoiceReason] = useState<string>('')

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Authentication functions
  const handleSignIn = () => {
    window.location.href = '/signin'
  }

  const handleSignUp = () => {
    window.location.href = '/signup'
  }

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        await fetch('/api/auth/signout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      }
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser({
        isLoggedIn: false,
        email: '',
        name: '',
        avatar: '',
        subscription: 'free',
        usage: {
          requests: 0,
          limit: 100,
          resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      })
    }
  }

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setConversations(prev => [newConversation, ...prev])
    setActiveConversation(newConversation.id)
    setMessages([])
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Apply theme classes to HTML element
  useEffect(() => {
    const html = document.documentElement
    // Remove all theme classes
    html.classList.remove('dark', 'night')
    
    // Add appropriate theme class
    if (settings.theme === 'dark') {
      html.classList.add('dark')
    } else if (settings.theme === 'night') {
      html.classList.add('night')
    }
  }, [settings.theme])

  // Theme toggle function with three themes
  const toggleTheme = () => {
    setSettings(prev => {
      const themes = ['light', 'dark', 'night']
      const currentIndex = themes.indexOf(prev.theme)
      const nextIndex = (currentIndex + 1) % themes.length
      const newTheme = themes[nextIndex]
      
      // Save to localStorage
      localStorage.setItem('theme', newTheme)
      
      return { ...prev, theme: newTheme }
    })
  }

  // Get theme icon based on current theme
  const getThemeIcon = () => {
    switch (settings.theme) {
      case 'light': return Moon
      case 'dark': return Sun
      case 'night': return Star
      default: return Moon
    }
  }

  // Get next theme name for tooltip
  const getNextThemeName = () => {
    const themes = ['light', 'dark', 'night']
    const currentIndex = themes.indexOf(settings.theme)
    const nextIndex = (currentIndex + 1) % themes.length
    return themes[nextIndex]
  }

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && ['light', 'dark', 'night'].includes(savedTheme)) {
      setSettings(prev => ({ ...prev, theme: savedTheme as 'light' | 'dark' | 'night' }))
    }
  }, [])

  // Apply theme to document body whenever theme changes
  useEffect(() => {
    document.body.classList.remove('light', 'dark', 'night')
    
    if (settings.theme === 'night') {
      document.body.classList.add('night')
    } else if (settings.theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.add('light')
    }
  }, [settings.theme])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus input
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        const textarea = document.querySelector('textarea') as HTMLTextAreaElement
        textarea?.focus()
      }
      
      // Cmd/Ctrl + N for new conversation
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault()
        createNewConversation()
      }
      
      // Cmd/Ctrl + T for theme toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 't') {
        e.preventDefault()
        toggleTheme()
      }
      
      // Escape to close modals
      if (e.key === 'Escape') {
        setShowSettings(false)
        setShowModelSelector(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    // Enhance input with memory context
    const enhancedInput = enhanceMessageWithMemory(input)
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Prepare messages for AI API with memory enhancement
      const messagesForAI = [
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: enhancedInput.enhancedInput }
      ]

      // Call the AI API with memory context
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messagesForAI,
          model: selectedModel,
          options: {
            temperature: 0.7,
            maxTokens: 2000
          },
          contextMemories: enhancedInput.contextMemories
        })
      })

      if (!response.ok) {
        throw new Error('AI API request failed')
      }

      const aiResponse = await response.json()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        model: aiResponse.model || selectedModel,
      }

      const updatedMessages = [...messages, userMessage, aiMessage]
      setMessages(updatedMessages)
      
      // Save conversation to memory for learning
      saveConversationToMemory(updatedMessages)
      
      // Update memory access for used memories
      enhancedInput.contextMemories.forEach(memory => {
        updateMemoryAccess(memory.id)
      })
      
      // Update conversation title if it's the first message
      if (messages.length === 0 && activeConversation) {
        const title = input.length > 50 ? input.substring(0, 50) + '...' : input
        setConversations(prev => prev.map(conv => 
          conv.id === activeConversation 
            ? { ...conv, title, updatedAt: new Date() }
            : conv
        ))
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        model: selectedModel,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id))
    if (activeConversation === id) {
      setActiveConversation(null)
    setMessages([])
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const aiActions = [
    { 
      icon: FileText, 
      label: 'Rewrite', 
      action: () => handleDocumentAction('rewrite')
    },
    { 
      icon: Brain, 
      label: 'Summarize', 
      action: () => handleDocumentAction('summarize')
    },
    { 
      icon: Table, 
      label: 'Format Table', 
      action: () => handleDocumentAction('format-table')
    },
    { 
      icon: Zap, 
      label: 'Expand', 
      action: () => handleDocumentAction('expand')
    },
    { 
      icon: Edit3, 
      label: 'Improve', 
      action: () => handleDocumentAction('improve')
    },
  ]

  const taskTemplates = [
    {
      id: 'blog-api',
      title: 'Build Blog API',
      description: 'Create a complete blog API with CRUD operations',
      steps: ['Design database schema', 'Create API endpoints', 'Add authentication', 'Write tests']
    },
    {
      id: 'react-components',
      title: 'React Component Library',
      description: 'Generate a reusable React component library',
      steps: ['Design component architecture', 'Create base components', 'Add TypeScript types', 'Write documentation']
    },
    {
      id: 'database-schema',
      title: 'Database Schema Design',
      description: 'Design and generate database schemas',
      steps: ['Analyze requirements', 'Design ERD', 'Generate SQL', 'Create migrations']
    }
  ]

  const createTask = async (template: typeof taskTemplates[0]) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: template.title,
      description: template.description,
      status: 'pending',
      steps: template.steps.map((step, index) => ({
        id: `${Date.now()}-${index}`,
        title: step,
        status: 'pending' as const
      })),
      createdAt: new Date()
    }
    
    setTasks(prev => [newTask, ...prev])

    try {
      // Execute the task using the task runner
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskType: template.id,
          parameters: {
            title: template.title,
            description: template.description
          },
          template: template.id
        })
      })

      if (!response.ok) {
        throw new Error('Task execution failed')
      }

      const result = await response.json()
      
      // Update task with results
      setTasks(prev => prev.map(task => 
        task.id === newTask.id 
          ? { 
              ...task, 
              status: result.status,
              steps: result.steps || task.steps
            }
          : task
      ))

    } catch (error) {
      console.error('Error creating task:', error)
      // Update task status to failed
      setTasks(prev => prev.map(task => 
        task.id === newTask.id 
          ? { ...task, status: 'failed' }
          : task
      ))
    }
  }

  // Advanced Features Functions
  const toggleVoiceInput = () => {
    setIsVoiceEnabled(!isVoiceEnabled)
    if (!isVoiceEnabled) {
      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map(result => result.transcript)
            .join('')
          setInput(transcript)
        }
        recognition.start()
        setIsRecording(true)
      }
    } else {
      setIsRecording(false)
    }
  }

  const toggleAudioOutput = () => {
    setIsAudioEnabled(!isAudioEnabled)
  }

  const handleFileUpload = (files: FileList) => {
    const newFiles: FileUpload[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      uploadedAt: new Date()
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    handleFileUpload(files)
  }

  const executeCode = async (code: string, language: string) => {
    setIsExecutingCode(true)
    const startTime = Date.now()
    
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const execution: CodeExecution = {
        id: Math.random().toString(36).substr(2, 9),
        code,
        language,
        output: `Output for ${language} code execution...`,
        executionTime: Date.now() - startTime,
        timestamp: new Date()
      }
      
      setCodeExecutions(prev => [execution, ...prev])
    } catch (error) {
      const execution: CodeExecution = {
        id: Math.random().toString(36).substr(2, 9),
        code,
        language,
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: Date.now() - startTime,
        timestamp: new Date()
      }
      setCodeExecutions(prev => [execution, ...prev])
    } finally {
      setIsExecutingCode(false)
    }
  }

  const exportWorkspace = () => {
    const workspaceData = {
      conversations,
      documentContent,
      tasks,
      settings,
      timestamp: new Date()
    }
    const blob = new Blob([JSON.stringify(workspaceData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `neuropilot-workspace-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importWorkspace = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.conversations) setConversations(data.conversations)
        if (data.documentContent) setDocumentContent(data.documentContent)
        if (data.tasks) setTasks(data.tasks)
        if (data.settings) setSettings(data.settings)
      } catch (error) {
        console.error('Failed to import workspace:', error)
      }
    }
    reader.readAsText(file)
  }

  const searchWorkspace = (query: string) => {
    setSearchQuery(query)
    // Implement search logic here
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const models = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Best for reasoning and analysis' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and cost-effective' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', description: 'Excellent for summarization' },
    { id: 'claude-3-haiku', name: 'Claude 3 Haiku', description: 'Fast and efficient' }
  ]

  // Dynamic placeholders for input
  const placeholders = [
    "Ask me to generate an API endpoint...",
    "Need help with a React component?",
    "Summarize this document for me...",
    "Debug this code snippet...",
    "Create a database schema...",
    "Write a blog post about...",
    "Explain this concept in simple terms...",
    "Optimize this algorithm...",
    "Generate test cases for...",
    "Refactor this function..."
  ]

  // Dynamic Prompt Feed - Clickable suggestions
  const promptSuggestions = [
    { text: "Generate a login form", icon: "🔐", category: "UI" },
    { text: "Summarize this article", icon: "📝", category: "Content" },
    { text: "Fix this function", icon: "🔧", category: "Code" },
    { text: "Plan a content calendar", icon: "📅", category: "Planning" },
    { text: "Create a REST API", icon: "🌐", category: "Backend" },
    { text: "Optimize database queries", icon: "⚡", category: "Performance" },
    { text: "Write unit tests", icon: "🧪", category: "Testing" },
    { text: "Design a user flow", icon: "🎨", category: "Design" },
    { text: "Analyze this data", icon: "📊", category: "Analytics" },
    { text: "Generate documentation", icon: "📚", category: "Docs" }
  ]



  // Command Palette Options
  const commandPaletteOptions = [
    { id: 'new-chat', label: 'New Chat', icon: Plus, action: createNewConversation },
    { id: 'switch-model', label: 'Switch Model', icon: Settings, action: () => setShowModelSelector(true) },
    { id: 'toggle-theme', label: 'Toggle Theme', icon: settings.theme === 'dark' ? Sun : Moon, action: () => setSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' })) },
    { id: 'export-workspace', label: 'Export Workspace', icon: Download, action: exportWorkspace },
    { id: 'show-shortcuts', label: 'Keyboard Shortcuts', icon: Keyboard, action: () => alert('Keyboard shortcuts: Cmd+K (focus), Cmd+N (new chat), Cmd+T (theme), Esc (close)') }
  ]

  // Prompt Constructor Blocks
  const promptBlocks = [
    { type: 'task', options: ['Summarize', 'Analyze', 'Generate', 'Debug', 'Optimize'] },
    { type: 'input', options: ['Text', 'URL', 'File', 'Code', 'Data'] },
    { type: 'tone', options: ['Professional', 'Casual', 'Academic', 'Creative', 'Technical'] },
    { type: 'format', options: ['Paragraph', 'List', 'Table', 'Code', 'Chart'] }
  ]

  // Advanced Slash Commands with Intent Detection
  const slashCommands = [
    { command: '/code', description: 'Generate code', icon: Code, category: 'development', examples: ['React component', 'API endpoint', 'Database query'] },
    { command: '/summarize', description: 'Summarize content', icon: FileText, category: 'content', examples: ['Article', 'Document', 'Meeting notes'] },
    { command: '/refactor', description: 'Refactor code', icon: RotateCcw, category: 'development', examples: ['Improve performance', 'Clean code', 'Best practices'] },
    { command: '/debug', description: 'Debug code', icon: AlertCircle, category: 'development', examples: ['Fix error', 'Find bug', 'Performance issue'] },
    { command: '/explain', description: 'Explain concept', icon: BookOpen, category: 'learning', examples: ['Algorithm', 'Framework', 'Technology'] },
    { command: '/optimize', description: 'Optimize code', icon: Zap, category: 'development', examples: ['Performance', 'Memory usage', 'Speed'] },
    { command: '/translate', description: 'Translate text', icon: Globe, category: 'content', examples: ['To Spanish', 'To French', 'To Japanese'] },
    { command: '/format', description: 'Format content', icon: AlignLeft, category: 'content', examples: ['Markdown', 'JSON', 'Table'] },
    { command: '/analyze', description: 'Analyze data', icon: BarChart3, category: 'analysis', examples: ['Trends', 'Patterns', 'Insights'] },
    { command: '/compare', description: 'Compare models', icon: GitBranch, category: 'advanced', examples: ['GPT-4 vs Claude', 'Different approaches'] }
  ]

  // Intent Detection Patterns
  const intentPatterns = [
    { pattern: /(react|vue|angular|component|jsx|tsx)/i, intent: 'React/Vue Component', model: 'gpt-4', icon: Code },
    { pattern: /(api|endpoint|rest|graphql)/i, intent: 'API Development', model: 'gpt-4', icon: Server },
    { pattern: /(database|sql|mongodb|postgres)/i, intent: 'Database Query', model: 'gpt-4', icon: Database },
    { pattern: /(debug|error|bug|fix)/i, intent: 'Debug Code', model: 'gpt-4', icon: AlertCircle },
    { pattern: /(summarize|summary|brief)/i, intent: 'Summarize Content', model: 'claude-3-sonnet', icon: FileText },
    { pattern: /(explain|what is|how does)/i, intent: 'Explain Concept', model: 'gpt-4', icon: BookOpen },
    { pattern: /(optimize|performance|speed)/i, intent: 'Optimize Code', model: 'gpt-4', icon: Zap },
    { pattern: /(translate|language)/i, intent: 'Translate Text', model: 'claude-3-sonnet', icon: Globe },
    { pattern: /(analyze|trend|pattern)/i, intent: 'Data Analysis', model: 'gpt-4', icon: BarChart3 }
  ]

  // Smart Suggestions based on context
  const getSmartSuggestions = (input: string) => {
    const suggestions = []
    
    if (input.includes('react') || input.includes('component')) {
      suggestions.push('Generate a React functional component')
      suggestions.push('Add TypeScript types to this component')
      suggestions.push('Create a custom hook for this logic')
    }
    
    if (input.includes('api') || input.includes('endpoint')) {
      suggestions.push('Create a REST API endpoint')
      suggestions.push('Add authentication to this API')
      suggestions.push('Implement error handling')
    }
    
    if (input.includes('error') || input.includes('bug')) {
      suggestions.push('Debug this error step by step')
      suggestions.push('Suggest alternative approaches')
      suggestions.push('Check for common issues')
    }
    
    return suggestions.slice(0, 3)
  }

  // AI Greeting messages
  const aiGreetings = [
    "Hey there! 👋 Ready to build something amazing?",
    "Hello! 🚀 What can I help you create today?",
    "Hi! ✨ Let's turn your ideas into reality!",
    "Welcome back! 🎯 What's on your mind?",
    "Greetings! 🌟 Ready to code, write, or analyze?"
  ]

  // Get current greeting and placeholder
  const currentGreeting = aiGreetings[Math.floor(Date.now() / 300000) % aiGreetings.length] // Changes every 5 minutes
  const currentPlaceholder = placeholders[currentPlaceholderIndex]

  // Rotate placeholders and prompt suggestions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
      setCurrentPromptIndex((prev) => (prev + 1) % promptSuggestions.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // AI Avatar state management
  useEffect(() => {
    if (isLoading) {
      setAiAvatarState('typing')
    } else if (messages.length > 0 && messages[messages.length - 1]?.role === 'assistant') {
      setAiAvatarState('thinking')
      setTimeout(() => setAiAvatarState('idle'), 2000)
    } else {
      setAiAvatarState('idle')
    }
  }, [isLoading, messages])

  // Command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault()
        setShowCommandPalette(!showCommandPalette)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showCommandPalette])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'
      
      recognition.onstart = () => {
        setIsListening(true)
        setTranscript('')
      }
      
      recognition.onresult = (event: any) => {
        let finalTranscript = ''
        let interimTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }
        
        setTranscript(finalTranscript + interimTranscript)
      }
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }
      
      recognition.onend = () => {
        setIsListening(false)
        if (transcript.trim()) {
          setInput(transcript.trim())
        }
      }
      
      setRecognition(recognition)
    }
  }, [])

  // Audio input functions
  const startListening = () => {
    if (recognition) {
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
    }
  }

  const toggleAudioInput = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // Intent Detection Logic
  const detectIntent = (text: string) => {
    for (const pattern of intentPatterns) {
      if (pattern.pattern.test(text)) {
        return pattern
      }
    }
    return null
  }

  // Enhanced input change handler with intelligent model selection
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    
    // Detect intent
    const detected = detectIntent(value)
    setDetectedIntent(detected?.intent || null)
    setShowIntentPreview(!!detected)
    
    // Intelligent model selection
    if (autoModeEnabled && value.length > 10) {
      const optimalModel = selectOptimalModel(value)
      if (optimalModel !== selectedModel) {
        setSelectedModel(optimalModel)
      }
    }
    
    // Show slash commands
    if (value.startsWith('/')) {
      setShowSlashCommands(true)
    } else {
      setShowSlashCommands(false)
    }
  }

  // Save to favorites
  const saveToFavorites = () => {
    if (input.trim() && !favoritePrompts.includes(input.trim())) {
      setFavoritePrompts(prev => [...prev, input.trim()])
    }
  }

  // Save to memory
  const saveToMemory = () => {
    if (input.trim()) {
      setPinnedContext(prev => [...prev, input.trim()])
    }
  }

  // Document AI Actions
  const handleDocumentAction = async (action: 'rewrite' | 'summarize' | 'expand' | 'format-table' | 'improve') => {
    if (!documentContent.trim()) return

    try {
      const response = await fetch('/api/ai/document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          content: documentContent,
          options: {
            temperature: 0.7,
            maxTokens: 2000
          }
        })
      })

      if (!response.ok) {
        throw new Error('Document AI request failed')
      }

      const result = await response.json()
      setDocumentContent(result.content)
    } catch (error) {
      console.error('Error processing document action:', error)
      // You could add a toast notification here
    }
  }

  // Quick Action Templates
  const quickActions = [
    { label: "🔁 Rewrite", action: () => setInput("/rewrite ") },
    { label: "✂ Summarize", action: () => setInput("/summarize ") },
    { label: "📊 Table", action: () => setInput("/table ") },
    { label: "🎤 Voice", action: toggleAudioInput },
    { label: "🧠 Memory", action: () => setShowMemory(!showMemory) },
    { label: "⏳ History", action: () => setShowHistory(!showHistory) }
  ]

  // Intelligent Model Selection
  const selectOptimalModel = (input: string, taskType?: string) => {
    if (!autoModeEnabled) return selectedModel
    
    const detectedTask = detectTaskType(input)
    const pinnedModel = pinnedModels[detectedTask]
    
    if (pinnedModel) {
      setLastModelChoice(pinnedModel)
      setModelChoiceReason(`Pinned for ${detectedTask} tasks`)
      return pinnedModel
    }
    
    // AI-based selection logic
    if (input.includes('code') || input.includes('function') || input.includes('bug')) {
      setLastModelChoice('gpt-4')
      setModelChoiceReason('GPT-4 chosen for complex reasoning')
      return 'gpt-4'
    } else if (input.includes('write') || input.includes('document') || input.includes('email')) {
      setLastModelChoice('claude-3')
      setModelChoiceReason('Claude-3 chosen for writing tasks')
      return 'claude-3'
    } else if (input.includes('creative') || input.includes('story') || input.includes('idea')) {
      setLastModelChoice('gemini-pro')
      setModelChoiceReason('Gemini Pro chosen for creative tasks')
      return 'gemini-pro'
    }
    
    setLastModelChoice('gpt-4')
    setModelChoiceReason('GPT-4 chosen as default')
    return 'gpt-4'
  }

  const detectTaskType = (input: string): string => {
    const codingKeywords = ['code', 'function', 'bug', 'error', 'debug', 'api', 'database']
    const writingKeywords = ['write', 'document', 'email', 'report', 'summary', 'content']
    const analysisKeywords = ['analyze', 'data', 'chart', 'graph', 'statistics', 'research']
    const creativeKeywords = ['creative', 'story', 'idea', 'design', 'art', 'brainstorm']
    
    const lowerInput = input.toLowerCase()
    
    if (codingKeywords.some(keyword => lowerInput.includes(keyword))) return 'coding'
    if (writingKeywords.some(keyword => lowerInput.includes(keyword))) return 'writing'
    if (analysisKeywords.some(keyword => lowerInput.includes(keyword))) return 'analysis'
    if (creativeKeywords.some(keyword => lowerInput.includes(keyword))) return 'creative'
    
    return 'general'
  }

  // Enhanced Settings Functions
  const handleResetPassword = async () => {
    if (!resetPasswordEmail) {
      setResetPasswordMessage('Please enter your email address')
      return
    }

    setIsResettingPassword(true)
    setResetPasswordMessage('')

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetPasswordEmail })
      })

      if (response.ok) {
        setResetPasswordStep('code')
        setResetPasswordMessage('Reset code sent to your email')
      } else {
        const error = await response.json()
        setResetPasswordMessage(error.message || 'Failed to send reset code')
      }
    } catch (error) {
      setResetPasswordMessage('Network error. Please try again.')
    } finally {
      setIsResettingPassword(false)
    }
  }

  const handleVerifyResetCode = async () => {
    if (!resetCode) {
      setResetPasswordMessage('Please enter the reset code')
      return
    }

    setIsResettingPassword(true)
    setResetPasswordMessage('')

    try {
      const response = await fetch('/api/auth/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetPasswordEmail, code: resetCode })
      })

      if (response.ok) {
        setResetPasswordStep('new-password')
        setResetPasswordMessage('Code verified. Enter your new password')
      } else {
        const error = await response.json()
        setResetPasswordMessage(error.message || 'Invalid reset code')
      }
    } catch (error) {
      setResetPasswordMessage('Network error. Please try again.')
    } finally {
      setIsResettingPassword(false)
    }
  }

  const handleSetNewPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setResetPasswordMessage('Please enter both passwords')
      return
    }

    if (newPassword !== confirmPassword) {
      setResetPasswordMessage('Passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      setResetPasswordMessage('Password must be at least 8 characters')
      return
    }

    setIsResettingPassword(true)
    setResetPasswordMessage('')

    try {
      const response = await fetch('/api/auth/set-new-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: resetPasswordEmail, 
          code: resetCode, 
          password: newPassword 
        })
      })

      if (response.ok) {
        setResetPasswordMessage('Password reset successfully!')
        setTimeout(() => {
          setShowResetPassword(false)
          setResetPasswordStep('email')
          setResetPasswordEmail('')
          setResetCode('')
          setNewPassword('')
          setConfirmPassword('')
          setResetPasswordMessage('')
        }, 2000)
      } else {
        const error = await response.json()
        setResetPasswordMessage(error.message || 'Failed to reset password')
      }
    } catch (error) {
      setResetPasswordMessage('Network error. Please try again.')
    } finally {
      setIsResettingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        handleSignOut()
        setShowDeleteAccount(false)
      } else {
        alert('Failed to delete account. Please try again.')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    }
  }

  const handleExportUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/auth/export-data', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `neuropilot-data-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        setShowExportData(false)
      } else {
        alert('Failed to export data. Please try again.')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    }
  }

  // AI Memory & Learning Functions
  const addMemoryItem = (item: Omit<MemoryItem, 'id' | 'lastAccessed' | 'accessCount'>) => {
    const newMemory: MemoryItem = {
      ...item,
      id: Date.now().toString(),
      lastAccessed: new Date(),
      accessCount: 0
    }
    setMemoryItems(prev => [...prev, newMemory])
    setCurrentMemoryUsage(prev => prev + 1)
  }

  const retrieveMemory = (query: string, type?: MemoryItem['type']) => {
    const filteredMemories = type 
      ? memoryItems.filter(m => m.type === type)
      : memoryItems
    
    return filteredMemories
      .filter(m => 
        m.content.toLowerCase().includes(query.toLowerCase()) ||
        m.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 5)
  }

  const updateMemoryAccess = (memoryId: string) => {
    setMemoryItems(prev => prev.map(m => 
      m.id === memoryId 
        ? { ...m, lastAccessed: new Date(), accessCount: m.accessCount + 1 }
        : m
    ))
  }

  const addLearningPattern = (pattern: Omit<LearningPattern, 'id' | 'lastUsed' | 'successRate'>) => {
    const newPattern: LearningPattern = {
      ...pattern,
      id: Date.now().toString(),
      lastUsed: new Date(),
      successRate: 0.5
    }
    setLearningPatterns(prev => [...prev, newPattern])
  }

  const updateLearningPattern = (patternId: string, success: boolean) => {
    setLearningPatterns(prev => prev.map(p => {
      if (p.id === patternId) {
        const newSuccessRate = (p.successRate * 0.9) + (success ? 0.1 : 0)
        return { ...p, lastUsed: new Date(), successRate: newSuccessRate }
      }
      return p
    }))
  }

  const addUserPreference = (preference: Omit<UserPreference, 'id' | 'lastUpdated'>) => {
    const newPreference: UserPreference = {
      ...preference,
      id: Date.now().toString(),
      lastUpdated: new Date()
    }
    setUserPreferences(prev => [...prev, newPreference])
  }

  const getRelevantMemories = (context: string) => {
    return memoryItems
      .filter(m => 
        m.context.toLowerCase().includes(context.toLowerCase()) ||
        m.tags.some(tag => context.toLowerCase().includes(tag.toLowerCase()))
      )
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 3)
  }

  const learnFromConversation = (messages: Message[]) => {
    if (!isLearningEnabled) return

    // Extract patterns from conversation
    const userMessages = messages.filter(m => m.role === 'user')
    const assistantMessages = messages.filter(m => m.role === 'assistant')

    // Learn user preferences
    userMessages.forEach(msg => {
      const preferences = extractPreferences(msg.content)
      preferences.forEach(pref => {
        addUserPreference({
          category: pref.category,
          preference: pref.preference,
          strength: pref.strength,
          context: msg.content
        })
      })
    })

    // Learn conversation patterns
    if (userMessages.length > 0 && assistantMessages.length > 0) {
      const pattern = extractPattern(userMessages[userMessages.length - 1].content, assistantMessages[assistantMessages.length - 1].content)
      if (pattern) {
        addLearningPattern({
          pattern: pattern.pattern,
          description: pattern.description,
          confidence: 0.7,
          examples: [userMessages[userMessages.length - 1].content]
        })
      }
    }
  }

  const extractPreferences = (content: string) => {
    const preferences = []
    
    // Extract writing style preferences
    if (content.includes('formal') || content.includes('professional')) {
      preferences.push({ category: 'writing_style', preference: 'formal', strength: 0.8 })
    }
    if (content.includes('casual') || content.includes('informal')) {
      preferences.push({ category: 'writing_style', preference: 'casual', strength: 0.8 })
    }

    // Extract detail level preferences
    if (content.includes('detailed') || content.includes('comprehensive')) {
      preferences.push({ category: 'detail_level', preference: 'high', strength: 0.7 })
    }
    if (content.includes('brief') || content.includes('concise')) {
      preferences.push({ category: 'detail_level', preference: 'low', strength: 0.7 })
    }

    // Extract topic preferences
    const topics = ['coding', 'writing', 'analysis', 'creative', 'business', 'technical']
    topics.forEach(topic => {
      if (content.toLowerCase().includes(topic)) {
        preferences.push({ category: 'topic_preference', preference: topic, strength: 0.6 })
      }
    })

    return preferences
  }

  const extractPattern = (userInput: string, assistantResponse: string) => {
    // Simple pattern extraction - can be enhanced with NLP
    const patterns = [
      { pattern: 'question-answer', description: 'User asks question, assistant provides answer' },
      { pattern: 'request-fulfillment', description: 'User makes request, assistant fulfills it' },
      { pattern: 'clarification', description: 'User needs clarification, assistant explains' },
      { pattern: 'problem-solving', description: 'User presents problem, assistant solves it' }
    ]

    // Determine pattern based on content analysis
    if (userInput.includes('?') || userInput.includes('how') || userInput.includes('what')) {
      return patterns[0]
    }
    if (userInput.includes('please') || userInput.includes('can you') || userInput.includes('help')) {
      return patterns[1]
    }
    if (assistantResponse.includes('let me explain') || assistantResponse.includes('clarify')) {
      return patterns[2]
    }
    if (userInput.includes('problem') || userInput.includes('issue') || userInput.includes('error')) {
      return patterns[3]
    }

    return null
  }

  const getPersonalizedResponse = (input: string) => {
    const relevantMemories = getRelevantMemories(input)
    const userPrefs = userPreferences.filter(p => 
      input.toLowerCase().includes(p.category) || 
      input.toLowerCase().includes(p.preference)
    )

    let personalization = ''
    
    if (relevantMemories.length > 0) {
      personalization += `\n\nBased on our previous conversations, I remember: ${relevantMemories[0].content}`
    }

    if (userPrefs.length > 0) {
      const topPref = userPrefs.sort((a, b) => b.strength - a.strength)[0]
      personalization += `\n\nI know you prefer ${topPref.preference} when it comes to ${topPref.category}.`
    }

    return personalization
  }

  const cleanOldMemories = () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    setMemoryItems(prev => prev.filter(m => 
      m.lastAccessed > thirtyDaysAgo || m.importance > 0.7
    ))
  }

  const exportMemoryData = () => {
    const memoryData = {
      memories: memoryItems,
      patterns: learningPatterns,
      preferences: userPreferences,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(memoryData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `neuropilot-memory-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importMemoryData = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.memories) setMemoryItems(data.memories)
        if (data.patterns) setLearningPatterns(data.patterns)
        if (data.preferences) setUserPreferences(data.preferences)
        updateMemoryStats()
      } catch (error) {
        console.error('Error importing memory data:', error)
      }
    }
    reader.readAsText(file)
  }

  // Enhanced Memory Management Functions
  const updateMemoryStats = () => {
    const totalMemories = memoryItems.length
    const activeMemories = memoryItems.filter(m => 
      m.lastAccessed > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length
    const learningPatternsCount = learningPatterns.length
    const userPreferencesCount = userPreferences.length
    const memoryEfficiency = totalMemories > 0 ? activeMemories / totalMemories : 0

    setMemoryStats({
      totalMemories,
      activeMemories,
      learningPatterns: learningPatternsCount,
      userPreferences: userPreferencesCount,
      memoryEfficiency
    })
  }

  const enhanceMessageWithMemory = (input: string) => {
    const relevantMemories = getRelevantMemories(input)
    const personalization = getPersonalizedResponse(input)
    
    if (relevantMemories.length > 0 || personalization) {
      return {
        enhancedInput: input + personalization,
        contextMemories: relevantMemories,
        hasEnhancement: true
      }
    }
    
    return {
      enhancedInput: input,
      contextMemories: [],
      hasEnhancement: false
    }
  }

  const saveConversationToMemory = (conversation: Message[]) => {
    if (!isLearningEnabled) return

    // Extract key insights from conversation
    const userMessages = conversation.filter(m => m.role === 'user')
    const assistantMessages = conversation.filter(m => m.role === 'assistant')

    // Save important concepts
    userMessages.forEach(msg => {
      const concepts = extractConcepts(msg.content)
      concepts.forEach(concept => {
        addMemoryItem({
          type: 'concept',
          content: concept.content,
          context: msg.content,
          confidence: concept.confidence,
          tags: concept.tags,
          relatedMemories: [],
          importance: concept.importance
        })
      })
    })

    // Learn from conversation patterns
    learnFromConversation(conversation)
    
    // Update memory stats
    updateMemoryStats()
  }

  const extractConcepts = (content: string) => {
    const concepts = []
    
    // Extract technical concepts
    const technicalTerms = ['API', 'React', 'TypeScript', 'JavaScript', 'Python', 'Database', 'Algorithm']
    technicalTerms.forEach(term => {
      if (content.toLowerCase().includes(term.toLowerCase())) {
        concepts.push({
          content: term,
          confidence: 0.8,
          tags: ['technical', term.toLowerCase()],
          importance: 0.7
        })
      }
    })

    // Extract problem-solving patterns
    if (content.includes('error') || content.includes('bug') || content.includes('issue')) {
      concepts.push({
        content: 'Problem-solving pattern',
        confidence: 0.9,
        tags: ['problem-solving', 'debugging'],
        importance: 0.8
      })
    }

    // Extract learning preferences
    if (content.includes('explain') || content.includes('how') || content.includes('why')) {
      concepts.push({
        content: 'Learning preference: Detailed explanations',
        confidence: 0.7,
        tags: ['learning', 'explanation'],
        importance: 0.6
      })
    }

    return concepts
  }

  const getMemoryInsights = () => {
    const insights = []
    
    // Most accessed memories
    const topMemories = [...memoryItems]
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, 5)
    
    if (topMemories.length > 0) {
      insights.push({
        type: 'frequently_accessed',
        title: 'Most Accessed Memories',
        data: topMemories.map(m => ({ content: m.content, accessCount: m.accessCount }))
      })
    }

    // Learning patterns
    const topPatterns = [...learningPatterns]
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 3)
    
    if (topPatterns.length > 0) {
      insights.push({
        type: 'successful_patterns',
        title: 'Most Successful Patterns',
        data: topPatterns.map(p => ({ pattern: p.pattern, successRate: p.successRate }))
      })
    }

    // User preferences
    const topPreferences = [...userPreferences]
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 5)
    
    if (topPreferences.length > 0) {
      insights.push({
        type: 'strong_preferences',
        title: 'Strongest Preferences',
        data: topPreferences.map(p => ({ category: p.category, preference: p.preference, strength: p.strength }))
      })
    }

    return insights
  }

  const optimizeMemory = () => {
    // Remove low-importance, rarely accessed memories
    const optimizedMemories = memoryItems.filter(m => 
      m.importance > 0.3 || m.accessCount > 2
    )
    
    setMemoryItems(optimizedMemories)
    updateMemoryStats()
    
    return {
      removed: memoryItems.length - optimizedMemories.length,
      remaining: optimizedMemories.length
    }
  }

  // Initialize memory stats on component mount
  useEffect(() => {
    updateMemoryStats()
  }, [memoryItems, learningPatterns, userPreferences])

  // Load memory data from localStorage on component mount
  useEffect(() => {
    try {
      const savedMemories = localStorage.getItem('neuropilot-memories')
      const savedPatterns = localStorage.getItem('neuropilot-patterns')
      const savedPreferences = localStorage.getItem('neuropilot-preferences')
      
      if (savedMemories) {
        const memories = JSON.parse(savedMemories)
        setMemoryItems(memories.map((m: any) => ({
          ...m,
          lastAccessed: new Date(m.lastAccessed),
          tags: m.tags || []
        })))
      }
      
      if (savedPatterns) {
        const patterns = JSON.parse(savedPatterns)
        setLearningPatterns(patterns.map((p: any) => ({
          ...p,
          lastUsed: new Date(p.lastUsed)
        })))
      }
      
      if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences)
        setUserPreferences(preferences.map((p: any) => ({
          ...p,
          lastUpdated: new Date(p.lastUpdated)
        })))
      }
    } catch (error) {
      console.error('Error loading memory data:', error)
    }
  }, [])

  // Save memory data to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('neuropilot-memories', JSON.stringify(memoryItems))
      localStorage.setItem('neuropilot-patterns', JSON.stringify(learningPatterns))
      localStorage.setItem('neuropilot-preferences', JSON.stringify(userPreferences))
    } catch (error) {
      console.error('Error saving memory data:', error)
    }
  }, [memoryItems, learningPatterns, userPreferences])

  return (
    <div className={cn(
      "h-screen flex transition-colors duration-200",
      settings.theme === 'dark' ? 'bg-gray-900 text-white' : 
      settings.theme === 'night' ? 'bg-black text-gray-100' : 
      'bg-gray-50 text-gray-900'
    )}>
      {/* Sidebar */}
      <div className={cn(
        "border-r flex flex-col transition-all duration-300",
        settings.theme === 'dark' 
          ? "bg-gray-800 border-gray-700" 
          : settings.theme === 'night'
          ? "bg-black border-gray-800"
          : "bg-white border-gray-200",
        showSidebar ? "w-64" : "w-12"
      )}>
        <div className={cn(
          "p-4 border-b",
          settings.theme === 'dark' ? "border-gray-700" : 
          settings.theme === 'night' ? "border-gray-800" : 
          "border-gray-200"
        )}>
          <div className="flex items-center mb-4">
              <Brain className="h-6 w-6 text-primary-600 flex-shrink-0" />
              {showSidebar && (
                <span className={cn(
                  "ml-2 font-semibold",
                  settings.theme === 'dark' ? "text-white" : 
                  settings.theme === 'night' ? "text-white" : 
                  "text-gray-900"
                )}>
                  NeuroPilot
                </span>
              )}
          </div>
          <button
            onClick={createNewConversation}
            className={cn(
              "btn btn-primary flex items-center justify-center",
              !showSidebar && "w-8 h-8 p-0"
            )}
          >
            <Plus className="h-4 w-4" />
            {showSidebar && <span className="ml-2">New Chat</span>}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {conversations.map(conversation => (
              <div key={conversation.id} className="group relative">
              <button
                onClick={() => {
                  setActiveConversation(conversation.id)
                  setMessages(conversation.messages)
                }}
                className={cn(
                    'w-full text-left p-3 rounded-lg transition-colors',
                    settings.theme === 'dark'
                      ? 'hover:bg-gray-700 text-gray-200'
                      : settings.theme === 'night'
                      ? 'hover:bg-gray-900 text-gray-200'
                      : 'hover:bg-gray-100 text-gray-900',
                    activeConversation === conversation.id && 
                      (settings.theme === 'dark' 
                        ? 'bg-primary-900 text-primary-300' 
                        : settings.theme === 'night'
                        ? 'bg-primary-900 text-primary-300'
                        : 'bg-primary-50 text-primary-700')
                  )}
                >
                  {showSidebar ? (
                    <>
                <div className="font-medium truncate">{conversation.title}</div>
                <div className={cn(
                  "text-sm",
                  settings.theme === 'dark' ? "text-gray-400" : 
                  settings.theme === 'night' ? "text-gray-300" : 
                  "text-gray-500"
                )}>
                  {conversation.messages.length} messages
                </div>
                    </>
                  ) : (
                    <div className="w-8 h-8 bg-primary-100 rounded flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-primary-600" />
                    </div>
                  )}
              </button>
                {showSidebar && (
                  <button
                    onClick={() => deleteConversation(conversation.id)}
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={cn(
          "border-t",
          settings.theme === 'dark' ? "border-gray-700" : 
          settings.theme === 'night' ? "border-gray-800" : 
          "border-gray-200",
          showSidebar ? "p-4" : "p-2"
        )}>
          <button 
            onClick={() => setShowSidebar(!showSidebar)}
            className={cn(
              "w-full btn btn-ghost flex items-center justify-center",
              showSidebar ? "p-2" : "p-1",
              settings.theme === 'dark' ? "text-gray-300 hover:text-white" : 
              settings.theme === 'night' ? "text-gray-300 hover:text-white" : 
              "text-gray-600 hover:text-gray-900"
            )}
            title={showSidebar ? "Collapse sidebar" : "Expand sidebar"}
          >
            {showSidebar ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={cn(
          "border-b p-4",
          settings.theme === 'dark' 
            ? "bg-gray-800 border-gray-700" 
            : settings.theme === 'night'
            ? "bg-black border-gray-800"
            : "bg-white border-gray-200"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  activeTab === 'chat'
                    ? (settings.theme === 'dark' 
                        ? 'bg-primary-900 text-primary-300' 
                        : settings.theme === 'night'
                        ? 'bg-primary-900 text-primary-300'
                        : 'bg-primary-100 text-primary-700')
                    : (settings.theme === 'dark' 
                        ? 'text-gray-400 hover:text-gray-200' 
                        : settings.theme === 'night'
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900')
                )}
              >
                <MessageSquare className="h-4 w-4 inline mr-2" />
                Chat
              </button>
              <button
                onClick={() => setActiveTab('document')}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  activeTab === 'document'
                    ? (settings.theme === 'dark' 
                        ? 'bg-primary-900 text-primary-300' 
                        : settings.theme === 'night'
                        ? 'bg-primary-900 text-primary-300'
                        : 'bg-primary-100 text-primary-700')
                    : (settings.theme === 'dark' 
                        ? 'text-gray-400 hover:text-gray-200' 
                        : settings.theme === 'night'
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900')
                )}
              >
                <FileText className="h-4 w-4 inline mr-2" />
                Document
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  activeTab === 'tasks'
                    ? (settings.theme === 'dark' 
                        ? 'bg-primary-900 text-primary-300' 
                        : settings.theme === 'night'
                        ? 'bg-primary-900 text-primary-300'
                        : 'bg-primary-100 text-primary-700')
                    : (settings.theme === 'dark' 
                        ? 'text-gray-400 hover:text-gray-200' 
                        : settings.theme === 'night'
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900')
                )}
              >
                <Zap className="h-4 w-4 inline mr-2" />
                Tasks
              </button>
            </div>
            <div className="flex items-center space-x-4">
              {/* History Button */}
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={cn(
                  "btn btn-ghost p-2 transition-all duration-200 hover:scale-105",
                  showHistory && "text-primary-500 bg-primary-50 dark:bg-primary-900/20"
                )}
                title="Session history (⌘H)"
              >
                <Clock className="h-4 w-4" />
              </button>

              {/* Memory Toggle */}
              <button
                onClick={() => setShowMemory(!showMemory)}
                className={cn(
                  "btn btn-ghost p-2 transition-all duration-200 hover:scale-105",
                  showMemory && "text-primary-500 bg-primary-50 dark:bg-primary-900/20"
                )}
                title="AI memory & context"
              >
                <Brain className="h-4 w-4" />
              </button>

              {/* Activity Indicator */}
              {isLoading && (
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>AI Thinking...</span>
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost p-2 transition-all duration-200 hover:scale-105"
                title={`Switch to ${getNextThemeName()} mode (⌘T)`}
              >
                {(() => {
                  const ThemeIcon = getThemeIcon()
                  return <ThemeIcon className="h-4 w-4" />
                })()}
              </button>

              {/* Voice Input */}
              <button 
                onClick={toggleAudioInput} 
                className={cn(
                  "btn btn-ghost p-2 transition-all duration-200 hover:scale-105",
                  isListening && "text-red-500 bg-red-50 dark:bg-red-900/20 animate-pulse"
                )}
                title={isListening ? "Stop voice input" : "Start voice input (⌘V)"}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>

              {/* Audio Output */}
              <button 
                onClick={toggleAudioOutput} 
                className={cn(
                  "btn btn-ghost p-2 transition-all duration-200 hover:scale-105",
                  isAudioEnabled && "text-primary-500 bg-primary-50 dark:bg-primary-900/20"
                )}
                title={isAudioEnabled ? "Disable audio output" : "Enable audio output"}
              >
                {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>

              {/* Search */}
              <button 
                onClick={() => setShowSearch(!showSearch)} 
                className={cn(
                  "btn btn-ghost p-2 transition-all duration-200 hover:scale-105",
                  showSearch && "text-primary-500 bg-primary-50 dark:bg-primary-900/20"
                )}
                title="Search workspace (⌘K)"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Collaboration */}
              <button 
                onClick={() => setShowCollaboration(!showCollaboration)} 
                className={cn(
                  "btn btn-ghost p-2 transition-all duration-200 hover:scale-105",
                  showCollaboration && "text-primary-500 bg-primary-50 dark:bg-primary-900/20"
                )}
                title="Team collaboration"
              >
                <Users2 className="h-4 w-4" />
              </button>

              {/* Code Execution */}
              <button 
                onClick={() => setActiveTab('tasks')} 
                className={cn(
                  "btn btn-ghost p-2 transition-all duration-200 hover:scale-105",
                  activeTab === 'tasks' && "text-primary-500 bg-primary-50 dark:bg-primary-900/20"
                )}
                title="Code execution & tasks"
              >
                <Terminal className="h-4 w-4" />
              </button>

              {/* Prompt Constructor */}
              <button 
                onClick={() => setShowPromptConstructor(true)} 
                className="btn btn-ghost p-2 transition-all duration-200 hover:scale-105"
                title="Prompt constructor"
              >
                <Layers className="h-4 w-4" />
              </button>

              {/* Export/Import */}
              <div className="relative">
                <button 
                  onClick={() => setShowExportImport(!showExportImport)} 
                  className="btn btn-ghost p-2 transition-all duration-200 hover:scale-105"
                  title="Advanced features"
                >
                  <Database className="h-4 w-4" />
                </button>
                {showExportImport && (
                  <div className={cn(
                    "absolute right-0 top-full mt-1 w-48 border rounded-lg shadow-lg z-10",
                    settings.theme === 'dark' ? "bg-gray-800 border-gray-600" : 
                    settings.theme === 'night' ? "bg-gray-900 border-gray-700" : 
                    "bg-white border-gray-200"
                  )}>
                    <button 
                      onClick={exportWorkspace} 
                      className={cn(
                        "w-full text-left p-3 border-b flex items-center space-x-2",
                        settings.theme === 'dark' ? "hover:bg-gray-700 border-gray-600" : 
                        settings.theme === 'night' ? "hover:bg-gray-800 border-gray-700" : 
                        "hover:bg-gray-50 border-gray-100"
                      )}
                    >
                      <Download className="h-4 w-4" />
                      <span>Export Workspace</span>
                    </button>
                    <button 
                      onClick={() => document.getElementById('import-file')?.click()} 
                      className={cn(
                        "w-full text-left p-3 flex items-center space-x-2",
                        settings.theme === 'dark' ? "hover:bg-gray-700" : 
                        settings.theme === 'night' ? "hover:bg-gray-800" : 
                        "hover:bg-gray-50"
                      )}
                    >
                      <Upload className="h-4 w-4" />
                      <span>Import Workspace</span>
                    </button>
                    <input
                      id="import-file"
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && importWorkspace(e.target.files[0])}
                    />
                  </div>
                )}
              </div>

              {/* Performance */}
              <button 
                onClick={() => setShowPerformance(!showPerformance)} 
                className={cn(
                  "btn btn-ghost p-2 transition-all duration-200 hover:scale-105",
                  showPerformance && "text-primary-500 bg-primary-50 dark:bg-primary-900/20"
                )}
                title="Performance metrics"
              >
                <BarChart3 className="h-4 w-4" />
              </button>

              {/* Fullscreen */}
              <button 
                onClick={toggleFullscreen} 
                className="btn btn-ghost p-2 transition-all duration-200 hover:scale-105"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen (⌘F)"}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>

              {/* Enhanced AI Model Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowModelSelector(!showModelSelector)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 border rounded-lg transition-all duration-200 hover:scale-105",
                    settings.theme === 'dark'
                      ? "border-gray-600 hover:bg-gray-700"
                      : settings.theme === 'night'
                      ? "border-gray-700 hover:bg-gray-800"
                      : "border-gray-300 hover:bg-gray-50"
                  )}
                  title="Select AI model"
                >
                  <Brain className="h-4 w-4 text-primary-500" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{models.find(m => m.id === selectedModel)?.name}</span>
                    {autoModeEnabled && lastModelChoice && (
                      <span className="text-xs text-green-500">Auto: {modelChoiceReason}</span>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showModelSelector && (
                  <div className={cn(
                    "absolute right-0 top-full mt-1 w-80 border rounded-lg shadow-lg z-10",
                    settings.theme === 'dark' ? "bg-gray-800 border-gray-600" : 
                    settings.theme === 'night' ? "bg-gray-900 border-gray-700" : 
                    "bg-white border-gray-200"
                  )}>
                    {/* Auto Mode Toggle */}
                    <div className={cn(
                      "p-3 border-b",
                      settings.theme === 'dark' ? "border-gray-600" : 
                      settings.theme === 'night' ? "border-gray-700" : 
                      "border-gray-200"
                    )}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Auto Mode</span>
                        <button
                          onClick={() => setAutoModeEnabled(!autoModeEnabled)}
                          className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                            autoModeEnabled ? "bg-primary-600" : "bg-gray-300"
                          )}
                        >
                          <span className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                            autoModeEnabled ? "translate-x-6" : "translate-x-1"
                          )} />
                        </button>
                      </div>
                      <p className={cn(
                        "text-xs mt-1",
                        settings.theme === 'dark' ? "text-gray-400" : 
                        settings.theme === 'night' ? "text-gray-400" : 
                        "text-gray-500"
                      )}>
                        Automatically select the best model for your task
                      </p>
                    </div>
                    
                    {/* Model Performance Metrics */}
                    <div className={cn(
                      "p-3 border-b",
                      settings.theme === 'dark' ? "border-gray-600" : 
                      settings.theme === 'night' ? "border-gray-700" : 
                      "border-gray-200"
                    )}>
                      <div className="text-xs font-medium mb-2">Performance Metrics</div>
                      <div className="space-y-2">
                        {Object.entries(modelPerformance).map(([modelId, metrics]) => (
                          <div key={modelId} className="flex items-center justify-between text-xs">
                            <span className="capitalize">{modelId.replace('-', ' ')}</span>
                            <div className="flex items-center space-x-3">
                              <span className="text-green-500">✓{metrics.accuracy}%</span>
                              <span className="text-blue-500">⚡{metrics.speed}%</span>
                              <span className="text-orange-500">💰{metrics.cost}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Model Selection */}
                    {models.map(model => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model.id)
                          setShowModelSelector(false)
                        }}
                        className={cn(
                          "w-full text-left p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors",
                          settings.theme === 'dark' ? "hover:bg-gray-700 border-gray-600" : 
                          settings.theme === 'night' ? "hover:bg-gray-800 border-gray-700" : 
                          "hover:bg-gray-50 border-gray-100",
                          selectedModel === model.id && "bg-primary-50 dark:bg-primary-900/20"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{model.name}</div>
                            <div className={cn(
                              "text-sm",
                              settings.theme === 'dark' ? "text-gray-400" : 
                              settings.theme === 'night' ? "text-gray-400" : 
                              "text-gray-500"
                            )}>{model.description}</div>
                          </div>
                          {pinnedModels[detectTaskType(input)] === model.id && (
                            <div className={cn(
                              "text-xs px-2 py-1 rounded",
                              settings.theme === 'dark' ? "bg-primary-900 text-primary-200" : 
                              settings.theme === 'night' ? "bg-primary-900 text-primary-200" : 
                              "bg-primary-100 text-primary-800"
                            )}>
                              Pinned
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Settings */}
              <button 
                onClick={() => setShowSettings(true)}
                className="btn btn-ghost p-2 transition-all duration-200 hover:scale-105"
                title="Settings (⌘,)"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div 
          className="flex-1 overflow-hidden"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className={cn(
                    "text-center mt-20",
                    settings.theme === 'dark' ? "text-gray-400" : 
                    settings.theme === 'night' ? "text-gray-300" : 
                    "text-gray-500"
                  )}>
                    {/* Beautiful Brain Icon Animation */}
                    <Brain className="h-16 w-16 mx-auto mb-6 text-primary-500 animate-pulse" />
                    
                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                      {currentGreeting}
                    </h3>
                    <p className={cn(
                      "text-lg mb-8 opacity-80",
                      settings.theme === 'dark' ? "text-gray-300" : 
                      settings.theme === 'night' ? "text-gray-200" : 
                      "text-gray-600"
                    )}>How can I help you today? Build a UI, write a blog, or answer deep questions?</p>
                    
                    {/* Dynamic Prompt Feed */}
                    <div className="max-w-2xl mx-auto mb-8">
                      <div className={cn(
                        "text-sm mb-3",
                        settings.theme === 'dark' ? "text-gray-400" : 
                        settings.theme === 'night' ? "text-gray-300" : 
                        "text-gray-500"
                      )}>💡 Try these suggestions:</div>
                      <div className="flex flex-wrap justify-center gap-2">
                        {promptSuggestions.slice(currentPromptIndex, currentPromptIndex + 4).map((suggestion, index) => (
                          <button
                            key={suggestion.text}
                            onClick={() => setInput(suggestion.text)}
                            className={cn(
                              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md",
                              settings.theme === 'dark'
                                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                                : settings.theme === 'night'
                                ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            )}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <span className="mr-1">{suggestion.icon}</span>
                            {suggestion.text}
                          </button>
                        ))}
                      </div>
                    </div>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <button
                          onClick={() => setInput("Help me write a React component for a todo list")}
                          className={cn(
                            "p-4 border rounded-lg text-left transition-colors",
                            settings.theme === 'dark'
                              ? "border-gray-700 hover:bg-gray-800"
                              : settings.theme === 'night'
                              ? "border-gray-800 hover:bg-gray-900"
                              : "border-gray-200 hover:bg-gray-50"
                          )}
                        >
                        <Code className="h-5 w-5 text-primary-600 mb-2" />
                        <div className="font-medium">Code Generation</div>
                        <div className={cn(
                          "text-sm",
                          settings.theme === 'dark' ? "text-gray-400" : 
                          settings.theme === 'night' ? "text-gray-300" : 
                          "text-gray-500"
                        )}>Generate React components, functions, and more</div>
                      </button>
                                              <button
                          onClick={() => setInput("Summarize the key benefits of using TypeScript")}
                          className={cn(
                            "p-4 border rounded-lg text-left transition-colors",
                            settings.theme === 'dark'
                              ? "border-gray-700 hover:bg-gray-800"
                              : settings.theme === 'night'
                              ? "border-gray-800 hover:bg-gray-900"
                              : "border-gray-200 hover:bg-gray-50"
                          )}
                        >
                        <Brain className="h-5 w-5 text-primary-600 mb-2" />
                        <div className="font-medium">Analysis & Summary</div>
                        <div className={cn(
                          "text-sm",
                          settings.theme === 'dark' ? "text-gray-400" : 
                          settings.theme === 'night' ? "text-gray-300" : 
                          "text-gray-500"
                        )}>Get insights and summaries on any topic</div>
                      </button>
                    </div>
                  </div>
                ) : (
                  messages.map(message => (
                    <div
                      key={message.id}
                      className={cn(
                        'chat-message p-4 rounded-lg border',
                        message.role === 'user' ? 'chat-message-user ml-12' : 'chat-message-assistant mr-12 '
                      )}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {message.role === 'user' ? (
                            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                              <span className="text-white text-sm font-medium">U</span>
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                              <Brain className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">
                              {message.role === 'user' ? 'You' : 'NeuroPilot'}
                            </span>
                            {message.model && (
                              <span className={cn(
                                "text-xs",
                                settings.theme === 'dark' ? "text-gray-400" : 
                                settings.theme === 'night' ? "text-gray-400" : 
                                "text-gray-500"
                              )}>
                                ({message.model})
                              </span>
                            )}
                            <span className={cn(
                              "text-xs",
                              settings.theme === 'dark' ? "text-gray-400" : 
                              settings.theme === 'night' ? "text-gray-400" : 
                              "text-gray-500"
                            )}>
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            {message.role === 'assistant' && (
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => copyToClipboard(message.content)}
                                  className={cn(
                                    "p-1 rounded transition-colors",
                                    settings.theme === 'dark' 
                                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" 
                                      : settings.theme === 'night'
                                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                  )}
                                  title="Copy message"
                                >
                                  <Copy className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => setInput(message.content)}
                                  className={cn(
                                    "p-1 rounded transition-colors",
                                    settings.theme === 'dark' 
                                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" 
                                      : settings.theme === 'night'
                                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                  )}
                                  title="Edit this response"
                                >
                                  <Edit3 className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => {
                                    setInput(`Please re-run: ${message.content}`)
                                    handleSendMessage()
                                  }}
                                  className={cn(
                                    "p-1 rounded transition-colors",
                                    settings.theme === 'dark' 
                                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" 
                                      : settings.theme === 'night'
                                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                  )}
                                  title="Re-run this response"
                                >
                                  <RotateCcw className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => {
                                    // Create a task from this message
                                    const newTask: Task = {
                                      id: Date.now().toString(),
                                      title: `Task from: ${message.content.substring(0, 50)}...`,
                                      description: message.content,
                                      status: 'pending',
                                      steps: [
                                        {
                                          id: Date.now().toString(),
                                          title: 'Execute task',
                                          status: 'pending'
                                        }
                                      ],
                                      createdAt: new Date()
                                    }
                                    setTasks(prev => [newTask, ...prev])
                                  }}
                                  className={cn(
                                    "p-1 rounded transition-colors",
                                    settings.theme === 'dark' 
                                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" 
                                      : settings.theme === 'night'
                                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                  )}
                                  title="Fork as task"
                                >
                                  <GitBranch className="h-3 w-3" />
                                </button>
                              </div>
                            )}
                          </div>
                          <div className={cn(
                            "max-w-none whitespace-pre-wrap text-sm",
                            settings.theme === 'dark' ? "text-gray-100" : 
                            settings.theme === 'night' ? "text-gray-100" : 
                            "text-gray-900"
                          )}>
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="chat-message p-4 rounded-lg border chat-message-assistant mr-12">
                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">NeuroPilot</span>
                          <span className={cn(
                            "text-xs",
                            settings.theme === 'dark' ? "text-gray-400" : 
                            settings.theme === 'night' ? "text-gray-400" : 
                            "text-gray-500"
                          )}>
                            (thinking...)
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className={cn(
                "border-t p-4",
                settings.theme === 'dark' ? "border-gray-700" : 
                settings.theme === 'night' ? "border-gray-800" : 
                "border-gray-200"
              )}>
                                  {/* Advanced Command UI */}
                  <div className="space-y-3">
                    {/* Intent Preview Bar */}
                    {showIntentPreview && detectedIntent && (
                      <div className={cn(
                        "flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200",
                        settings.theme === 'dark'
                          ? "bg-blue-900/20 border-blue-500/30"
                          : settings.theme === 'night'
                          ? "bg-blue-900/20 border-blue-500/30"
                          : "bg-blue-50 border-blue-200"
                      )}>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                            Detected: {detectedIntent}
                          </span>
                          <span className="text-xs text-blue-600 dark:text-blue-400">
                            Will use {selectedModel}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400">
                          <span>⏎ Generate</span>
                          <span>⇧⏎ Expand</span>
                          <span>⌘S Save</span>
                        </div>
                      </div>
                    )}

                    {/* Smart Suggestions */}
                    {input.length > 10 && !showSlashCommands && (
                      <div className="flex flex-wrap gap-2">
                        {getSmartSuggestions(input).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setInput(suggestion)}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105",
                              settings.theme === 'dark'
                                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                                : settings.theme === 'night'
                                ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            )}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Command Input Field */}
                    <div className="flex items-end space-x-3">
                      {/* Upload Button */}
                      <button 
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className={cn(
                          "p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105",
                          settings.theme === 'dark'
                            ? "border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                            : settings.theme === 'night'
                            ? "border-gray-700 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white"
                            : "border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                        )} 
                        title="Upload files"
                      >
                        <Upload className="h-5 w-5" />
                      </button>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                      />
                      
                      <div className="flex-1 relative">
                        <div className={cn(
                          "relative rounded-xl border-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent",
                          settings.theme === 'dark'
                            ? "bg-gray-800 border-gray-600 focus-within:bg-gray-700"
                            : settings.theme === 'night'
                            ? "bg-black border-gray-900 focus-within:bg-gray-900"
                            : "bg-white border-gray-200 focus-within:bg-gray-50"
                        )}>
                          {/* Command Prompt */}
                          <div className="absolute left-4 top-3 pointer-events-none">
                            <span className={cn(
                              "text-sm",
                              settings.theme === 'dark' ? "text-gray-500" :
                              settings.theme === 'night' ? "text-gray-300" :
                              "text-gray-400"
                            )}>
                              🔍 What do you want to do?
                            </span>
                          </div>
                          
                    <textarea
                      value={input}
                            onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                            placeholder="Type / for commands or start typing..."
                            className={cn(
                              "w-full resize-none py-8 px-4 outline-none transition-all duration-200",
                              settings.theme === 'dark'
                                ? "bg-gray-700 text-white placeholder-gray-400"
                                : settings.theme === 'night'
                                ? "bg-gray-900 text-white placeholder-gray-300"
                                : "bg-white text-gray-900 placeholder-gray-500"
                            )}
                            style={{ 
                              minHeight: '80px', 
                              maxHeight: '150px'
                            }}
                      rows={1}
                      disabled={isLoading}
                    />
                          
                          {/* Character Counter */}
                          {input.length > 0 && (
                            <div className="absolute left-4 bottom-2">
                              <span className={cn(
                                "text-xs transition-colors",
                                input.length > 2000 
                                  ? "text-red-500" 
                                  : input.length > 1500 
                                  ? "text-yellow-500" 
                                  : settings.theme === 'dark' ? "text-gray-500" :
                                    settings.theme === 'night' ? "text-gray-300" :
                                    "text-gray-400"
                              )}>
                                {input.length}/4000
                              </span>
                  </div>
                          )}
                          
                          {/* Input Actions */}
                          <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                            {/* Save to Favorites */}
                            {input.trim() && (
                              <button
                                onClick={saveToFavorites}
                                className={cn(
                                  "p-2 rounded-lg transition-all duration-200 hover:scale-105",
                                  settings.theme === 'dark'
                                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    : settings.theme === 'night'
                                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                                title="Save to favorites"
                              >
                                <Star className="h-4 w-4" />
                              </button>
                            )}
                            
                            {/* Audio Input Button */}
                            <button
                              onClick={toggleAudioInput}
                              className={cn(
                                "p-2 rounded-lg transition-all duration-200 hover:scale-105",
                                isListening 
                                  ? "bg-red-500 text-white animate-pulse shadow-lg" 
                                  : settings.theme === 'dark'
                                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                  : settings.theme === 'night'
                                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              )}
                              title={isListening ? "Stop recording" : "Start voice input"}
                            >
                              {isListening ? (
                                <div className="flex items-center space-x-1">
                                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                  <Mic className="h-4 w-4" />
                                </div>
                              ) : (
                                <Mic className="h-4 w-4" />
                              )}
                            </button>
                            
                            {/* Send Button */}
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                              className={cn(
                                "p-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed",
                                input.trim() && !isLoading
                                  ? "bg-primary-500 text-white hover:bg-primary-600 shadow-lg"
                                  : settings.theme === 'dark'
                                  ? "bg-gray-700 text-gray-500"
                                  : settings.theme === 'night'
                                  ? "bg-gray-800 text-gray-500"
                                  : "bg-gray-100 text-gray-400"
                              )}
                              title="Send message (⏎)"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                          </div>
                        </div>
                    
                                          {/* Slash Commands Dropdown */}
                      {showSlashCommands && (
                        <div className={cn(
                          "absolute bottom-full left-0 right-0 mb-2 border rounded-lg shadow-lg z-10",
                          settings.theme === 'dark'
                            ? "bg-gray-800 border-gray-600"
                            : settings.theme === 'night'
                            ? "bg-gray-900 border-gray-700"
                            : "bg-white border-gray-200"
                        )}>
                          {slashCommands.map((cmd) => (
                            <button
                              key={cmd.command}
                              onClick={() => {
                                setInput(cmd.command + ' ')
                                setShowSlashCommands(false)
                              }}
                              className={cn(
                                "w-full text-left p-3 border-b last:border-b-0 flex items-center space-x-3 hover:bg-gray-50 transition-colors",
                                settings.theme === 'dark'
                                  ? "hover:bg-gray-700 border-gray-600"
                                  : settings.theme === 'night'
                                  ? "hover:bg-gray-800 border-gray-700"
                                  : "hover:bg-gray-50 border-gray-100"
                              )}
                            >
                              <cmd.icon className="h-4 w-4 text-primary-500" />
                              <div>
                                <div className="font-medium">{cmd.command}</div>
                                <div className={cn(
                                  "text-sm",
                                  settings.theme === 'dark' ? "text-gray-400" : 
                                  settings.theme === 'night' ? "text-gray-400" : 
                                  "text-gray-500"
                                )}>{cmd.description}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'document' && (
            <div className="h-full flex flex-col">
              {/* Document Toolbar */}
              <div className={cn(
                "border-b p-4",
                settings.theme === 'dark' ? "border-gray-700" : 
                settings.theme === 'night' ? "border-gray-800 bg-black" : 
                "border-gray-200"
              )}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Document Editor</h2>
                  <div className="flex space-x-2">
                    <button className="btn btn-secondary text-sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </button>
                    {aiActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className="btn btn-secondary text-sm"
                      >
                        <action.icon className="h-4 w-4 mr-1" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Document Content */}
              <div className="flex-1 p-4">
                <div className={cn(
                  "w-full h-full border rounded-lg overflow-hidden",
                  settings.theme === 'dark' ? "border-gray-600" : 
                  settings.theme === 'night' ? "border-gray-800" : 
                  "border-gray-300"
                )}>
                  {/* Rich Text Toolbar */}
                  <div className={cn(
                    "border-b p-2 flex items-center space-x-2",
                    settings.theme === 'dark' ? "border-gray-600 bg-gray-800" : 
                    settings.theme === 'night' ? "border-gray-800 bg-black" : 
                    "border-gray-200 bg-gray-50"
                  )}>
                    <button className="btn btn-ghost p-1" title="Bold">
                      <Bold className="h-4 w-4" />
                    </button>
                    <button className="btn btn-ghost p-1" title="Italic">
                      <Italic className="h-4 w-4" />
                    </button>
                    <button className="btn btn-ghost p-1" title="Underline">
                      <Underline className="h-4 w-4" />
                    </button>
                    <div className={cn(
                      "w-px h-4",
                      settings.theme === 'dark' ? "bg-gray-600" : 
                      settings.theme === 'night' ? "bg-gray-700" : 
                      "bg-gray-300"
                    )} />
                    <button className="btn btn-ghost p-1" title="Heading">
                      <Code2 className="h-4 w-4" />
                    </button>
                    <button className="btn btn-ghost p-1" title="Code Block">
                      <Code className="h-4 w-4" />
                    </button>
                    <button className="btn btn-ghost p-1" title="Quote">
                      <Quote className="h-4 w-4" />
                    </button>
                    <div className={cn(
                      "w-px h-4",
                      settings.theme === 'dark' ? "bg-gray-600" : 
                      settings.theme === 'night' ? "bg-gray-700" : 
                      "bg-gray-300"
                    )} />
                    <button className="btn btn-ghost p-1" title="Align Left">
                      <AlignLeft className="h-4 w-4" />
                    </button>
                    <button className="btn btn-ghost p-1" title="Align Center">
                      <AlignCenter className="h-4 w-4" />
                    </button>
                    <button className="btn btn-ghost p-1" title="Align Right">
                      <AlignRight className="h-4 w-4" />
                    </button>
                    <div className="flex-1" />
                    <button 
                      className="btn btn-secondary text-xs"
                      onClick={() => {
                        setDocumentHistory(prev => [...prev, documentContent])
                        setCurrentDocumentVersion(prev => prev + 1)
                      }}
                    >
                      <Save className="h-3 w-3 mr-1" />
                      Save Version
                    </button>
                  </div>
                  
                  {/* Document Editor */}
                <textarea
                  value={documentContent}
                  onChange={(e) => setDocumentContent(e.target.value)}
                    placeholder="Start writing your document... Use natural language to describe what you want to create. You can also use the AI actions above to enhance your content."
                    className={cn(
                      "w-full h-full p-4 resize-none focus:ring-0 focus:border-0 transition-colors",
                      settings.theme === 'dark'
                        ? "bg-gray-700 text-white placeholder-gray-400"
                        : settings.theme === 'night'
                        ? "bg-black text-white placeholder-gray-400"
                        : "bg-white text-gray-900 placeholder-gray-500"
                    )}
                    style={{ height: 'calc(100% - 48px)' }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="h-full flex flex-col">
              <div className={cn(
                "border-b p-4",
                settings.theme === 'dark' ? "border-gray-700" : 
                settings.theme === 'night' ? "border-gray-800" : 
                "border-gray-200"
              )}>
                <h2 className="text-lg font-semibold">Task Mode</h2>
                  <p className={cn(
                    "text-sm mt-1",
                    settings.theme === 'dark' ? "text-gray-400" : 
                    settings.theme === 'night' ? "text-gray-300" : 
                    "text-gray-600"
                  )}>
                  Break down complex tasks into executable steps
                </p>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  {/* Active Tasks */}
                  {tasks.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-6 flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-primary-500" />
                        Active Tasks
                      </h3>
                      <div className="space-y-6">
                        {tasks.map(task => (
                          <div key={task.id} className={cn(
                            "rounded-xl border p-6 shadow-sm transition-all duration-200 hover:shadow-md",
                            settings.theme === 'dark' 
                              ? "bg-gray-800 border-gray-700" 
                              : settings.theme === 'night'
                              ? "bg-gray-900 border-gray-800"
                              : "bg-white border-gray-200"
                          )}>
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="text-lg font-semibold mb-1">{task.title}</h4>
                                <p className={cn(
                                  "text-sm",
                                  settings.theme === 'dark' ? "text-gray-400" : 
                                  settings.theme === 'night' ? "text-gray-300" : 
                                  "text-gray-600"
                                )}>
                                  {task.description}
                                </p>
                              </div>
                              <span className={cn(
                                'px-3 py-1 rounded-full text-xs font-medium',
                                task.status === 'completed' && (settings.theme === 'dark' ? 'bg-green-900 text-green-200' : 
                                                              settings.theme === 'night' ? 'bg-green-900 text-green-200' : 
                                                              'bg-green-100 text-green-800'),
                                task.status === 'running' && (settings.theme === 'dark' ? 'bg-blue-900 text-blue-200' : 
                                                            settings.theme === 'night' ? 'bg-blue-900 text-blue-200' : 
                                                            'bg-blue-100 text-blue-800'),
                                task.status === 'failed' && (settings.theme === 'dark' ? 'bg-red-900 text-red-200' : 
                                                           settings.theme === 'night' ? 'bg-red-900 text-red-200' : 
                                                           'bg-red-100 text-red-800'),
                                task.status === 'pending' && (settings.theme === 'dark' ? 'bg-gray-700 text-gray-200' : 
                                                            settings.theme === 'night' ? 'bg-gray-800 text-white' : 
                                                            'bg-gray-100 text-gray-800')
                              )}>
                                {task.status}
                              </span>
                            </div>
                            
                            {/* Enhanced Step Breakdown */}
                            <div className="space-y-3">
                              <h5 className={cn(
                                "font-medium text-sm flex items-center",
                                settings.theme === 'dark' ? "text-gray-400" : 
                                settings.theme === 'night' ? "text-gray-300" : 
                                "text-gray-600"
                              )}>
                                <Target className="h-4 w-4 mr-1" />
                                Progress Steps:
                              </h5>
                              {task.steps.map((step, index) => (
                                <div key={step.id} className={cn(
                                  "flex items-center space-x-4 p-3 rounded-lg",
                                  settings.theme === 'dark' ? "bg-gray-700" : 
                                  settings.theme === 'night' ? "bg-gray-800" : 
                                  "bg-gray-50"
                                )}>
                                  <div className={cn(
                                    'w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium',
                                    step.status === 'completed' && 'bg-green-500 border-green-500 text-white',
                                    step.status === 'running' && 'bg-blue-500 border-blue-500 text-white animate-pulse',
                                    step.status === 'failed' && 'bg-red-500 border-red-500 text-white',
                                    step.status === 'pending' && 'border-gray-300 text-gray-500'
                                  )}>
                                    {step.status === 'completed' ? <Check className="h-4 w-4" /> :
                                     step.status === 'running' ? <Play className="h-4 w-4" /> :
                                     step.status === 'failed' ? <X className="h-4 w-4" /> :
                                     index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">{step.title}</div>
                                    {step.output && (
                                      <div className={cn(
                                        "text-xs mt-1 p-2 rounded",
                                        settings.theme === 'dark' ? "text-gray-400 bg-gray-600" : 
                                        settings.theme === 'night' ? "text-gray-300 bg-gray-700" : 
                                        "text-gray-500 bg-gray-100"
                                      )}>
                                        {step.output}
                                      </div>
                                    )}
                                  </div>
                                  <div className={cn(
                                    "text-xs",
                                    settings.theme === 'dark' ? "text-gray-400" : 
                                    settings.theme === 'night' ? "text-gray-300" : 
                                    "text-gray-400"
                                  )}>
                                    {step.status === 'completed' ? '✓ Done' :
                                     step.status === 'running' ? '⟳ Running' :
                                     step.status === 'failed' ? '✗ Failed' :
                                     '⏳ Pending'}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Task Templates */}
                  <div className={cn(
                    "rounded-lg border p-6 shadow-sm",
                    settings.theme === 'dark' 
                      ? "bg-gray-800 border-gray-700" 
                      : settings.theme === 'night'
                      ? "bg-black border-gray-800"
                      : "bg-white border-gray-200"
                  )}>
                    <h3 className="text-lg font-semibold mb-4">Available Templates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {taskTemplates.map(template => (
                        <button
                          key={template.id}
                          onClick={() => createTask(template)}
                          className={cn(
                            "text-left p-4 border rounded-lg transition-colors",
                            settings.theme === 'dark'
                              ? "border-gray-700 hover:bg-gray-700"
                              : settings.theme === 'night'
                              ? "border-gray-800 hover:bg-gray-900"
                              : "border-gray-200 hover:bg-gray-50"
                          )}
                        >
                          <div className="font-medium mb-2">{template.title}</div>
                          <div className={cn(
                            "text-sm mb-3",
                            settings.theme === 'dark' ? "text-gray-400" : 
                            settings.theme === 'night' ? "text-gray-300" : 
                            "text-gray-600"
                          )}>
                            {template.description}
                          </div>
                          <div className={cn(
                            "text-xs",
                            settings.theme === 'dark' ? "text-gray-500" : 
                            settings.theme === 'night' ? "text-gray-400" : 
                            "text-gray-500"
                          )}>
                            {template.steps.length} steps
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Audio Input Status */}
                  {isListening && (
                    <div className={cn(
                      "border-t p-3",
                      settings.theme === 'dark' ? "border-red-700 bg-red-900/20" : 
                      settings.theme === 'night' ? "border-red-800 bg-red-900/20" : 
                      "border-red-200 bg-red-50"
                    )}>
                                              <div className={cn(
                          "flex items-center justify-center space-x-2",
                          settings.theme === 'dark' ? "text-red-400" : 
                          settings.theme === 'night' ? "text-red-400" : 
                          "text-red-600"
                        )}>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm font-medium">Listening... {transcript && `"${transcript}"`}</span>
                        <button
                          onClick={stopListening}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Stop
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Quick Action Shortcut Bar */}
                  {showQuickActions && (
                    <div className={cn(
                      "border-t p-3",
                      settings.theme === 'dark' ? "border-gray-700" : 
                      settings.theme === 'night' ? "border-gray-800" : 
                      "border-gray-200"
                    )}>
                      <div className="flex items-center justify-center space-x-2">
                        {quickActions.map((action, index) => (
                          <button
                            key={action.label}
                            onClick={action.action}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 hover:shadow-sm",
                              settings.theme === 'dark'
                                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                                : settings.theme === 'night'
                                ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            )}
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {action.label}
                          </button>
                        ))}
                        <button
                          onClick={() => setShowQuickActions(false)}
                          className={cn(
                            "text-xs",
                            settings.theme === 'dark' ? "text-gray-500 hover:text-gray-300" : 
                            settings.theme === 'night' ? "text-gray-400 hover:text-gray-200" : 
                            "text-gray-500 hover:text-gray-700"
                          )}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={cn(
            "rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto",
            settings.theme === 'dark' ? "bg-gray-800" : 
            settings.theme === 'night' ? "bg-gray-900" : 
            "bg-white"
          )}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Settings</h2>
                              <button
                  onClick={() => setShowSettings(false)}
                  className={cn(
                    settings.theme === 'dark' ? "text-gray-400 hover:text-gray-300" : 
                    settings.theme === 'night' ? "text-gray-400 hover:text-gray-200" : 
                    "text-gray-400 hover:text-gray-600"
                  )}
                >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Account Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Account
                </h3>
                
                {user.isLoggedIn ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.name ? user.name[0].toUpperCase() : 'U'}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{user.name || 'User'}</div>
                        <div className={cn(
                          "text-sm",
                          settings.theme === 'dark' ? "text-gray-400" : 
                          settings.theme === 'night' ? "text-gray-300" : 
                          "text-gray-500"
                        )}>{user.email}</div>
                      </div>
                    </div>
                    
                    <div className={cn(
                      "rounded-lg p-4",
                      settings.theme === 'dark' ? "bg-gray-700" : 
                      settings.theme === 'night' ? "bg-gray-800" : 
                      "bg-gray-100"
                    )}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Subscription</span>
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          user.subscription === 'pro' 
                            ? settings.theme === 'dark' 
                              ? "bg-primary-900 text-primary-200"
                              : settings.theme === 'night'
                                ? "bg-primary-800 text-primary-100"
                                : "bg-primary-100 text-primary-800"
                            : settings.theme === 'dark' 
                              ? "bg-gray-600 text-gray-200"
                              : settings.theme === 'night'
                                ? "bg-gray-700 text-gray-200"
                                : "bg-gray-200 text-gray-700"
                        )}>
                          {user.subscription === 'pro' ? 'Pro' : 'Free'}
                        </span>
                      </div>
                      <div className={cn(
                        "text-sm",
                        settings.theme === 'dark' ? "text-gray-400" : 
                        settings.theme === 'night' ? "text-gray-300" : 
                        "text-gray-600"
                      )}>
                        {user.usage.requests} / {user.usage.limit} requests used
                      </div>
                      <div className={cn(
                        "w-full rounded-full h-2 mt-2",
                        settings.theme === 'dark' ? "bg-gray-600" : 
                        settings.theme === 'night' ? "bg-gray-700" : 
                        "bg-gray-200"
                      )}>
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${(user.usage.requests / user.usage.limit) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <button className="w-full btn btn-secondary">
                      Upgrade to Pro
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="w-full btn btn-ghost text-red-600 hover:text-red-700"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className={cn(
                      settings.theme === 'dark' ? "text-gray-400" : 
                      settings.theme === 'night' ? "text-gray-300" : 
                      "text-gray-600"
                    )}>Sign in to sync your settings and access premium features.</p>
                    <button 
                      onClick={handleSignIn}
                      className="w-full btn btn-primary"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={handleSignUp}
                      className="w-full btn btn-secondary"
                    >
                      Create Account
                    </button>
                  </div>
                )}
              </div>

              {/* Preferences Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Preferences
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-2">Theme</label>
                    <select
                      value={settings.theme}
                      onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                      className={cn(
                        "w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                        settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                        settings.theme === 'night' ? "bg-black border-gray-800" : 
                        "bg-white border-gray-300"
                      )}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="night">Night</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block font-medium mb-2">Font Size</label>
                    <select
                      value={settings.fontSize}
                      onChange={(e) => setSettings(prev => ({ ...prev, fontSize: e.target.value }))}
                      className={cn(
                        "w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                        settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                        settings.theme === 'night' ? "bg-black border-gray-800" : 
                        "bg-white border-gray-300"
                      )}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block font-medium mb-2">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                      className={cn(
                        "w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                        settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                        settings.theme === 'night' ? "bg-black border-gray-800" : 
                        "bg-white border-gray-300"
                      )}
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ja">日本語</option>
                      <option value="zh">中文</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Behavior Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Behavior
                </h3>
                
                    <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.autoSave}
                      onChange={(e) => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Auto-save conversations</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableNotifications}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableNotifications: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable notifications</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableSound}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableSound: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable sound effects</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.autoScroll}
                      onChange={(e) => setSettings(prev => ({ ...prev, autoScroll: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Auto-scroll to new messages</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.compactMode}
                      onChange={(e) => setSettings(prev => ({ ...prev, compactMode: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Compact mode</span>
                  </label>
                </div>
              </div>

              {/* Editor Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Editor
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.showLineNumbers}
                      onChange={(e) => setSettings(prev => ({ ...prev, showLineNumbers: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Show line numbers</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableAutoComplete}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableAutoComplete: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable auto-complete</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableSpellCheck}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableSpellCheck: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable spell check</span>
                  </label>
                </div>
              </div>

              {/* Security Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security & Privacy
                </h3>
                
                <div className="space-y-4">
                  {user.isLoggedIn && (
                    <>
                      <button
                        onClick={() => setShowResetPassword(true)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg border transition-colors",
                          settings.theme === 'dark' ? "border-gray-600 hover:bg-gray-700" : 
                          settings.theme === 'night' ? "border-gray-700 hover:bg-gray-800" : 
                          "border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <Key className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Reset Password</div>
                            <div className={cn(
                              "text-sm",
                              settings.theme === 'dark' ? "text-gray-400" : 
                              settings.theme === 'night' ? "text-gray-300" : 
                              "text-gray-500"
                            )}>Change your account password</div>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setShowExportData(true)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg border transition-colors",
                          settings.theme === 'dark' ? "border-gray-600 hover:bg-gray-700" : 
                          settings.theme === 'night' ? "border-gray-700 hover:bg-gray-800" : 
                          "border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <Download className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Export Data</div>
                            <div className={cn(
                              "text-sm",
                              settings.theme === 'dark' ? "text-gray-400" : 
                              settings.theme === 'night' ? "text-gray-300" : 
                              "text-gray-500"
                            )}>Download your data and conversations</div>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setShowPrivacySettings(true)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg border transition-colors",
                          settings.theme === 'dark' ? "border-gray-600 hover:bg-gray-700" : 
                          settings.theme === 'night' ? "border-gray-700 hover:bg-gray-800" : 
                          "border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <Eye className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Privacy Settings</div>
                            <div className={cn(
                              "text-sm",
                              settings.theme === 'dark' ? "text-gray-400" : 
                              settings.theme === 'night' ? "text-gray-300" : 
                              "text-gray-500"
                            )}>Manage your privacy preferences</div>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setShowDeleteAccount(true)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg border transition-colors text-red-600 hover:text-red-700",
                          settings.theme === 'dark' ? "border-red-600 hover:bg-red-900/20" : 
                          settings.theme === 'night' ? "border-red-700 hover:bg-red-900/20" : 
                          "border-red-200 hover:bg-red-50"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <UserX className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Delete Account</div>
                            <div className={cn(
                              "text-sm",
                              settings.theme === 'dark' ? "text-red-400" : 
                              settings.theme === 'night' ? "text-red-300" : 
                              "text-red-500"
                            )}>Permanently delete your account and data</div>
                          </div>
                        </div>
                      </button>
                    </>
                  )}

                  {!user.isLoggedIn && (
                    <div className={cn(
                      "p-4 rounded-lg border",
                      settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                      settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                      "border-gray-200 bg-gray-50"
                    )}>
                      <div className="flex items-center space-x-3 mb-3">
                        <Info className="h-4 w-4" />
                        <span className="font-medium">Sign in required</span>
                      </div>
                      <p className={cn(
                        "text-sm",
                        settings.theme === 'dark' ? "text-gray-400" : 
                        settings.theme === 'night' ? "text-gray-300" : 
                        "text-gray-600"
                      )}>
                        Sign in to access security and privacy settings.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Model Settings Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI Model Settings
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-2">Default Model</label>
                    <select
                      value={settings.defaultModel}
                      onChange={(e) => setSettings(prev => ({ ...prev, defaultModel: e.target.value }))}
                      className={cn(
                        "w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                        settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                        settings.theme === 'night' ? "bg-gray-800 border-gray-700" : 
                        "bg-white border-gray-300"
                      )}
                    >
                      <option value="gpt-4">GPT-4 (Most Capable)</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Fastest)</option>
                      <option value="claude-3">Claude-3 (Balanced)</option>
                      <option value="gemini-pro">Gemini Pro (Creative)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Temperature: {settings.temperature}</label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={settings.temperature}
                      onChange={(e) => setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                      className="w-full"
                    />
                    <div className={cn(
                      "text-xs mt-1",
                      settings.theme === 'dark' ? "text-gray-400" : 
                      settings.theme === 'night' ? "text-gray-300" : 
                      "text-gray-500"
                    )}>
                      Lower = More focused, Higher = More creative
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Max Tokens: {settings.maxTokens}</label>
                    <input
                      type="range"
                      min="256"
                      max="4096"
                      step="256"
                      value={settings.maxTokens}
                      onChange={(e) => setSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableModelSwitching}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableModelSwitching: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable model switching during conversations</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableContextMemory}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableContextMemory: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable context memory across sessions</span>
                  </label>
                </div>
              </div>

              {/* Advanced Features Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Advanced Features
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableMarkdown}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableMarkdown: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable Markdown rendering</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableCodeHighlighting}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableCodeHighlighting: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable syntax highlighting</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableImageGeneration}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableImageGeneration: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable AI image generation</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableVoiceInput}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableVoiceInput: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable voice input</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableVoiceOutput}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableVoiceOutput: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable voice output (text-to-speech)</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableRealTimeCollaboration}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableRealTimeCollaboration: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable real-time collaboration</span>
                  </label>
                </div>
              </div>

              {/* Accessibility Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Accessibility
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableHighContrast}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableHighContrast: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">High contrast mode</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableLargeText}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableLargeText: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Large text mode</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableScreenReader}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableScreenReader: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Screen reader support</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableReducedMotion}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableReducedMotion: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Reduced motion</span>
                  </label>
                </div>
              </div>

              {/* Performance Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Cpu className="h-5 w-5 mr-2" />
                  Performance
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableCaching}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableCaching: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable response caching</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableCompression}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableCompression: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable data compression</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableLazyLoading}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableLazyLoading: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable lazy loading</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableBackgroundSync}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableBackgroundSync: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Enable background sync</span>
                  </label>
                </div>
              </div>

              {/* AI Memory & Learning Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI Memory & Learning
                </h3>
                
                <div className="space-y-4">
                  {/* Memory Stats */}
                  <div className={cn(
                    "p-4 rounded-lg border",
                    settings.theme === 'dark' ? "bg-gray-800 border-gray-600" : 
                    settings.theme === 'night' ? "bg-gray-900 border-gray-700" : 
                    "bg-gray-50 border-gray-200"
                  )}>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Total Memories</div>
                        <div className={cn(
                          settings.theme === 'dark' ? "text-gray-300" : 
                          settings.theme === 'night' ? "text-gray-200" : 
                          "text-gray-600"
                        )}>{memoryStats.totalMemories}</div>
                      </div>
                      <div>
                        <div className="font-medium">Active Memories</div>
                        <div className={cn(
                          settings.theme === 'dark' ? "text-gray-300" : 
                          settings.theme === 'night' ? "text-gray-200" : 
                          "text-gray-600"
                        )}>{memoryStats.activeMemories}</div>
                      </div>
                      <div>
                        <div className="font-medium">Learning Patterns</div>
                        <div className={cn(
                          settings.theme === 'dark' ? "text-gray-300" : 
                          settings.theme === 'night' ? "text-gray-200" : 
                          "text-gray-600"
                        )}>{memoryStats.learningPatterns}</div>
                      </div>
                      <div>
                        <div className="font-medium">Memory Efficiency</div>
                        <div className={cn(
                          settings.theme === 'dark' ? "text-gray-300" : 
                          settings.theme === 'night' ? "text-gray-200" : 
                          "text-gray-600"
                        )}>{(memoryStats.memoryEfficiency * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Memory Controls */}
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isLearningEnabled}
                        onChange={(e) => setIsLearningEnabled(e.target.checked)}
                        className={cn(
                          "rounded text-primary-600 focus:ring-primary-500",
                          settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                          settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                          "border-gray-300 bg-white"
                        )}
                      />
                      <span className="font-medium">Enable AI Learning</span>
                    </label>

                    <button
                      onClick={() => setShowMemoryPanel(true)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border transition-colors",
                        settings.theme === 'dark' ? "border-gray-600 hover:bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 hover:bg-gray-800" : 
                        "border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Database className="h-4 w-4" />
                        <div>
                          <div className="font-medium">View Memory Panel</div>
                          <div className={cn(
                            "text-sm",
                            settings.theme === 'dark' ? "text-gray-400" : 
                            settings.theme === 'night' ? "text-gray-300" : 
                            "text-gray-500"
                          )}>Browse and manage your AI memories</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setShowLearningInsights(true)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border transition-colors",
                        settings.theme === 'dark' ? "border-gray-600 hover:bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 hover:bg-gray-800" : 
                        "border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Learning Insights</div>
                          <div className={cn(
                            "text-sm",
                            settings.theme === 'dark' ? "text-gray-400" : 
                            settings.theme === 'night' ? "text-gray-300" : 
                            "text-gray-500"
                          )}>View AI learning patterns and insights</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={exportMemoryData}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border transition-colors",
                        settings.theme === 'dark' ? "border-gray-600 hover:bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 hover:bg-gray-800" : 
                        "border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Download className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Export Memory Data</div>
                          <div className={cn(
                            "text-sm",
                            settings.theme === 'dark' ? "text-gray-400" : 
                            settings.theme === 'night' ? "text-gray-300" : 
                            "text-gray-500"
                          )}>Download your AI memory data</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={optimizeMemory}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border transition-colors",
                        settings.theme === 'dark' ? "border-gray-600 hover:bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 hover:bg-gray-800" : 
                        "border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Zap className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Optimize Memory</div>
                          <div className={cn(
                            "text-sm",
                            settings.theme === 'dark' ? "text-gray-400" : 
                            settings.theme === 'night' ? "text-gray-300" : 
                            "text-gray-500"
                          )}>Clean up and optimize memory usage</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Integrations Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Link className="h-5 w-5 mr-2" />
                  Integrations
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableGitHubIntegration}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableGitHubIntegration: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">GitHub integration</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableSlackIntegration}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableSlackIntegration: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Slack integration</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableNotionIntegration}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableNotionIntegration: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Notion integration</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={settings.enableGoogleDriveIntegration}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableGoogleDriveIntegration: e.target.checked }))}
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <span className="font-medium">Google Drive integration</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className={cn(
              "flex justify-end space-x-3 mt-6 pt-6 border-t",
              settings.theme === 'dark' ? "border-gray-700" : 
              settings.theme === 'night' ? "border-gray-800" : 
              "border-gray-200"
            )}>
              <button
                onClick={() => setShowSettings(false)}
                className="btn btn-secondary"
              >
                Cancel
                      </button>
              <button
                onClick={() => setShowSettings(false)}
                className="btn btn-primary"
              >
                Save Settings
                      </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={cn(
            "rounded-lg p-6 w-full max-w-md mx-4",
            settings.theme === 'dark' ? "bg-gray-800" : 
            settings.theme === 'night' ? "bg-gray-900" : 
            "bg-white"
          )}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Key className="h-5 w-5 mr-2" />
                Reset Password
              </h2>
              <button
                onClick={() => {
                  setShowResetPassword(false)
                  setResetPasswordStep('email')
                  setResetPasswordEmail('')
                  setResetCode('')
                  setNewPassword('')
                  setConfirmPassword('')
                  setResetPasswordMessage('')
                }}
                className={cn(
                  settings.theme === 'dark' ? "text-gray-400 hover:text-gray-300" : 
                  settings.theme === 'night' ? "text-gray-400 hover:text-gray-200" : 
                  "text-gray-400 hover:text-gray-600"
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {resetPasswordMessage && (
              <div className={cn(
                "p-3 rounded-lg mb-4",
                resetPasswordMessage.includes('successfully') 
                  ? settings.theme === 'dark' ? "bg-green-900/20 border border-green-700" :
                    settings.theme === 'night' ? "bg-green-900/20 border border-green-800" :
                    "bg-green-50 border border-green-200"
                  : settings.theme === 'dark' ? "bg-red-900/20 border border-red-700" :
                    settings.theme === 'night' ? "bg-red-900/20 border border-red-800" :
                    "bg-red-50 border border-red-200"
              )}>
                <p className={cn(
                  "text-sm",
                  resetPasswordMessage.includes('successfully')
                    ? settings.theme === 'dark' ? "text-green-300" :
                      settings.theme === 'night' ? "text-green-200" :
                      "text-green-700"
                    : settings.theme === 'dark' ? "text-red-300" :
                      settings.theme === 'night' ? "text-red-200" :
                      "text-red-700"
                )}>
                  {resetPasswordMessage}
                </p>
              </div>
            )}

            {resetPasswordStep === 'email' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={resetPasswordEmail}
                    onChange={(e) => setResetPasswordEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={cn(
                      "w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                      settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                      settings.theme === 'night' ? "bg-gray-800 border-gray-700" : 
                      "bg-white border-gray-300"
                    )}
                  />
                </div>
                <button
                  onClick={handleResetPassword}
                  disabled={isResettingPassword}
                  className="w-full btn btn-primary"
                >
                  {isResettingPassword ? 'Sending...' : 'Send Reset Code'}
                </button>
              </div>
            )}

            {resetPasswordStep === 'code' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Reset Code</label>
                  <input
                    type="text"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="Enter the 6-digit code"
                    className={cn(
                      "w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                      settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                      settings.theme === 'night' ? "bg-gray-800 border-gray-700" : 
                      "bg-white border-gray-300"
                    )}
                  />
                </div>
                <button
                  onClick={handleVerifyResetCode}
                  disabled={isResettingPassword}
                  className="w-full btn btn-primary"
                >
                  {isResettingPassword ? 'Verifying...' : 'Verify Code'}
                </button>
              </div>
            )}

            {resetPasswordStep === 'new-password' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className={cn(
                      "w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                      settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                      settings.theme === 'night' ? "bg-gray-800 border-gray-700" : 
                      "bg-white border-gray-300"
                    )}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className={cn(
                      "w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                      settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                      settings.theme === 'night' ? "bg-gray-800 border-gray-700" : 
                      "bg-white border-gray-300"
                    )}
                  />
                </div>
                <button
                  onClick={handleSetNewPassword}
                  disabled={isResettingPassword}
                  className="w-full btn btn-primary"
                >
                  {isResettingPassword ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={cn(
            "rounded-lg p-6 w-full max-w-md mx-4",
            settings.theme === 'dark' ? "bg-gray-800" : 
            settings.theme === 'night' ? "bg-gray-900" : 
            "bg-white"
          )}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center text-red-600">
                <UserX className="h-5 w-5 mr-2" />
                Delete Account
              </h2>
              <button
                onClick={() => setShowDeleteAccount(false)}
                className={cn(
                  settings.theme === 'dark' ? "text-gray-400 hover:text-gray-300" : 
                  settings.theme === 'night' ? "text-gray-400 hover:text-gray-200" : 
                  "text-gray-400 hover:text-gray-600"
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className={cn(
                "p-4 rounded-lg border",
                settings.theme === 'dark' ? "border-red-600 bg-red-900/20" : 
                settings.theme === 'night' ? "border-red-700 bg-red-900/20" : 
                "border-red-200 bg-red-50"
              )}>
                <div className="flex items-center space-x-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-600">Warning</span>
                </div>
                <p className={cn(
                  "text-sm",
                  settings.theme === 'dark' ? "text-red-300" : 
                  settings.theme === 'night' ? "text-red-200" : 
                  "text-red-700"
                )}>
                  This action will permanently delete your account and all associated data. 
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteAccount(false)}
                className="flex-1 btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 btn bg-red-600 hover:bg-red-700 text-white"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Data Modal */}
      {showExportData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={cn(
            "rounded-lg p-6 w-full max-w-md mx-4",
            settings.theme === 'dark' ? "bg-gray-800" : 
            settings.theme === 'night' ? "bg-gray-900" : 
            "bg-white"
          )}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Export Data
              </h2>
              <button
                onClick={() => setShowExportData(false)}
                className={cn(
                  settings.theme === 'dark' ? "text-gray-400 hover:text-gray-300" : 
                  settings.theme === 'night' ? "text-gray-400 hover:text-gray-200" : 
                  "text-gray-400 hover:text-gray-600"
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className={cn(
                "text-sm",
                settings.theme === 'dark' ? "text-gray-400" : 
                settings.theme === 'night' ? "text-gray-300" : 
                "text-gray-600"
              )}>
                This will download all your conversations, settings, and data as a JSON file.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowExportData(false)}
                className="flex-1 btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleExportUserData}
                className="flex-1 btn btn-primary"
              >
                Export Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Settings Modal */}
      {showPrivacySettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={cn(
            "rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto",
            settings.theme === 'dark' ? "bg-gray-800" : 
            settings.theme === 'night' ? "bg-gray-900" : 
            "bg-white"
          )}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Privacy Settings
              </h2>
              <button
                onClick={() => setShowPrivacySettings(false)}
                className={cn(
                  settings.theme === 'dark' ? "text-gray-400 hover:text-gray-300" : 
                  settings.theme === 'night' ? "text-gray-400 hover:text-gray-200" : 
                  "text-gray-400 hover:text-gray-600"
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Data Collection</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <div>
                      <span className="font-medium">Usage Analytics</span>
                      <p className={cn(
                        "text-sm",
                        settings.theme === 'dark' ? "text-gray-400" : 
                        settings.theme === 'night' ? "text-gray-300" : 
                        "text-gray-500"
                      )}>Help us improve by sharing anonymous usage data</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <div>
                      <span className="font-medium">Error Reporting</span>
                      <p className={cn(
                        "text-sm",
                        settings.theme === 'dark' ? "text-gray-400" : 
                        settings.theme === 'night' ? "text-gray-300" : 
                        "text-gray-500"
                      )}>Send error reports to help fix bugs</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Conversation Privacy</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <div>
                      <span className="font-medium">Save Conversations</span>
                      <p className={cn(
                        "text-sm",
                        settings.theme === 'dark' ? "text-gray-400" : 
                        settings.theme === 'night' ? "text-gray-300" : 
                        "text-gray-500"
                      )}>Store your conversations for future reference</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className={cn(
                        "rounded text-primary-600 focus:ring-primary-500",
                        settings.theme === 'dark' ? "border-gray-600 bg-gray-700" : 
                        settings.theme === 'night' ? "border-gray-700 bg-gray-800" : 
                        "border-gray-300 bg-white"
                      )}
                    />
                    <div>
                      <span className="font-medium">Auto-delete Old Conversations</span>
                      <p className={cn(
                        "text-sm",
                        settings.theme === 'dark' ? "text-gray-400" : 
                        settings.theme === 'night' ? "text-gray-300" : 
                        "text-gray-500"
                      )}>Automatically delete conversations older than 30 days</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className={cn(
              "flex justify-end space-x-3 mt-6 pt-6 border-t",
              settings.theme === 'dark' ? "border-gray-700" : 
              settings.theme === 'night' ? "border-gray-800" : 
              "border-gray-200"
            )}>
              <button
                onClick={() => setShowPrivacySettings(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPrivacySettings(false)}
                className="btn btn-primary"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input for Import */}
      <input
        id="import-file"
        type="file"
        accept=".json"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            importWorkspace(file)
          }
        }}
        className="hidden"
      />

      {/* Advanced Features Panels */}
      
      {/* Search Panel */}
      {showSearch && (
        <div className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center",
          settings.theme === 'dark' ? "text-white" : "text-gray-900"
        )}>
          <div className={cn(
            "w-full max-w-2xl mx-4 p-6 rounded-lg shadow-xl",
            settings.theme === 'dark' ? "bg-gray-800" : "bg-white"
          )}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Search Workspace
              </h2>
              <button
                onClick={() => setShowSearch(false)}
                className="btn btn-ghost p-2"
              >
                <X className="h-4 w-4" />
                      </button>
                    </div>
            <input
              type="text"
              placeholder="Search conversations, documents, tasks..."
              value={searchQuery}
              onChange={(e) => searchWorkspace(e.target.value)}
              className={cn(
                "w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
              )}
            />
            <div className="mt-4 text-sm text-gray-500">
              Search results will appear here...
                  </div>
                </div>
              </div>
      )}

      {/* Collaboration Panel */}
      {showCollaboration && (
        <div className={cn(
          "fixed right-4 top-20 w-80 p-4 rounded-lg shadow-xl z-40",
          settings.theme === 'dark' ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Users2 className="h-4 w-4 mr-2" />
              Collaboration
            </h3>
            <button
              onClick={() => setShowCollaboration(false)}
              className="btn btn-ghost p-1"
            >
              <X className="h-3 w-3" />
            </button>
            </div>
          <div className="space-y-2">
            {collaborationUsers.length === 0 ? (
              <div className="text-sm text-gray-500 text-center py-4">
                No collaborators yet
              </div>
            ) : (
              collaborationUsers.map(user => (
                <div key={user.id} className="flex items-center space-x-3 p-2 rounded">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    user.status === 'online' ? "bg-green-500" : 
                    user.status === 'away' ? "bg-yellow-500" : "bg-gray-400"
                  )} />
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.status}</span>
                </div>
              ))
          )}
        </div>
      </div>
      )}

      {/* Performance Panel */}
      {showPerformance && (
        <div className={cn(
          "fixed right-4 top-20 w-80 p-4 rounded-lg shadow-xl z-40",
          settings.theme === 'dark' ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance
            </h3>
            <button
              onClick={() => setShowPerformance(false)}
              className="btn btn-ghost p-1"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Response Time:</span>
              <span className="text-sm font-medium">{performanceMetrics.responseTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Memory Usage:</span>
              <span className="text-sm font-medium">{performanceMetrics.memoryUsage}MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">CPU Usage:</span>
              <span className="text-sm font-medium">{performanceMetrics.cpuUsage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Network Latency:</span>
              <span className="text-sm font-medium">{performanceMetrics.networkLatency}ms</span>
            </div>
          </div>
        </div>
      )}

      {/* History Panel */}
      {showHistory && (
        <div className={cn(
          "fixed right-4 top-20 w-80 p-4 rounded-lg shadow-xl z-40",
          settings.theme === 'dark' ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Session History
            </h3>
            <button
              onClick={() => setShowHistory(false)}
              className="btn btn-ghost p-1"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {conversations.slice(0, 10).map(conversation => (
              <div key={conversation.id} className={cn(
                "p-2 rounded cursor-pointer",
                settings.theme === 'dark' ? "hover:bg-gray-700" : 
                settings.theme === 'night' ? "hover:bg-gray-800" : 
                "hover:bg-gray-50"
              )}>
                <div className="font-medium text-sm">{conversation.title}</div>
                <div className="text-xs text-gray-500">
                  {conversation.messages.length} messages • {conversation.updatedAt.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Command Palette */}
      {showCommandPalette && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className={cn(
            "w-96 max-h-96 overflow-hidden rounded-xl shadow-2xl",
            settings.theme === 'dark' ? "bg-gray-800" : "bg-white"
          )}>
            <div className={cn(
              "p-4 border-b",
              settings.theme === 'dark' ? "border-gray-700" : 
              settings.theme === 'night' ? "border-gray-800" : 
              "border-gray-200"
            )}>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search commands... (⌘K to close)"
                  className="flex-1 bg-transparent outline-none"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {commandPaletteOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    option.action()
                    setShowCommandPalette(false)
                  }}
                  className={cn(
                    "w-full p-3 text-left flex items-center space-x-3 transition-colors",
                    settings.theme === 'dark' ? "hover:bg-gray-700" : 
                    settings.theme === 'night' ? "hover:bg-gray-800" : 
                    "hover:bg-gray-50"
                  )}
                >
                  <option.icon className="h-4 w-4 text-gray-500" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Memory Panel */}
      {showMemory && (
        <div className={cn(
          "fixed right-4 top-20 w-96 p-4 rounded-lg shadow-xl z-40 max-h-[80vh] overflow-y-auto",
          settings.theme === 'dark' ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              AI Memory & Learning
            </h3>
            <button
              onClick={() => setShowMemory(false)}
              className="btn btn-ghost p-1"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Memory Timeline */}
            <div className="text-sm">
              <div className="font-medium mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Memory Timeline
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {memoryTimeline.slice(0, 3).map((memory) => (
                  <div key={memory.id} className={cn(
                    "p-2 rounded border-l-2 text-xs",
                    settings.theme === 'dark' ? "bg-gray-700 border-gray-500" : "bg-gray-50 border-gray-300"
                  )}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-1 mb-1">
                          <span className={cn(
                            "px-1 py-0.5 rounded text-xs",
                            memory.type === 'conversation' ? "bg-blue-100 text-blue-800" :
                            memory.type === 'task' ? "bg-green-100 text-green-800" :
                            memory.type === 'preference' ? "bg-purple-100 text-purple-800" :
                            "bg-orange-100 text-orange-800"
                          )}>
                            {memory.type}
                          </span>
                          <span className="text-gray-500">
                            {memory.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-xs">{memory.content}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(Math.min(memory.importance, 3))].map((_, i) => (
                          <div key={i} className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-Session Learning */}
            <div className="text-sm">
              <div className="font-medium mb-2 flex items-center">
                <Brain className="h-4 w-4 mr-2" />
                Learning Patterns
              </div>
              <div className="space-y-1">
                {crossSessionMemory.learningPatterns.map((pattern, index) => (
                  <div key={index} className={cn(
                    "text-xs p-2 rounded",
                    settings.theme === 'dark' ? "text-gray-400 bg-gray-700" : 
                    settings.theme === 'night' ? "text-gray-300 bg-gray-800" : 
                    "text-gray-600 bg-gray-50"
                  )}>
                    • {pattern}
                  </div>
                ))}
              </div>
            </div>

            {/* Current Context */}
            <div className="text-sm">
              <div className="font-medium mb-2">Current Context:</div>
              <div className={cn(
                "text-xs p-2 rounded",
                settings.theme === 'dark' ? "text-gray-400 bg-gray-700" : 
                settings.theme === 'night' ? "text-gray-300 bg-gray-800" : 
                "text-gray-500 bg-gray-50"
              )}>
                {activeConversation ? 
                  `Active conversation: ${conversations.find(c => c.id === activeConversation)?.title}` :
                  'No active conversation'
                }
              </div>
            </div>

            {/* Pinned Context */}
            <div className="text-sm">
              <div className="font-medium mb-2">Pinned Context:</div>
              <div className="space-y-1">
                {pinnedContext.length > 0 ? (
                  pinnedContext.map((context, index) => (
                    <div key={index} className={cn(
                      "text-xs p-2 rounded flex items-center justify-between",
                      settings.theme === 'dark' ? "text-gray-400 bg-gray-700" : 
                      settings.theme === 'night' ? "text-gray-300 bg-gray-800" : 
                      "text-gray-500 bg-gray-50"
                    )}>
                      <span>{context}</span>
                      <button
                        onClick={() => setPinnedContext(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className={cn(
                    "text-xs",
                    settings.theme === 'dark' ? "text-gray-400" : 
                    settings.theme === 'night' ? "text-gray-300" : 
                    "text-gray-400"
                  )}>No pinned context</div>
                )}
              </div>
            </div>

            {/* Memory Stats */}
            <div className="text-sm">
              <div className="font-medium mb-2">Memory Stats:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={cn(
                  "p-2 rounded",
                  settings.theme === 'dark' ? "bg-gray-700" : 
                  settings.theme === 'night' ? "bg-gray-800" : 
                  "bg-gray-50"
                )}>
                  <div className={cn(
                    settings.theme === 'dark' ? "text-gray-400" : 
                    settings.theme === 'night' ? "text-gray-300" : 
                    "text-gray-500"
                  )}>Conversations</div>
                  <div className="font-medium">{conversations.length}</div>
                </div>
                <div className={cn(
                  "p-2 rounded",
                  settings.theme === 'dark' ? "bg-gray-700" : 
                  settings.theme === 'night' ? "bg-gray-800" : 
                  "bg-gray-50"
                )}>
                  <div className={cn(
                    settings.theme === 'dark' ? "text-gray-400" : 
                    settings.theme === 'night' ? "text-gray-300" : 
                    "text-gray-500"
                  )}>Last Session</div>
                  <div className="font-medium">{crossSessionMemory.lastSession.toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prompt Constructor */}
      {showPromptConstructor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className={cn(
            "w-[600px] max-h-[500px] overflow-hidden rounded-xl shadow-2xl",
            settings.theme === 'dark' ? "bg-gray-800" : 
            settings.theme === 'night' ? "bg-black" : 
            "bg-white"
          )}>
            <div className={cn(
              "p-4 border-b",
              settings.theme === 'dark' ? "border-gray-700" : 
              settings.theme === 'night' ? "border-gray-800" : 
              "border-gray-200"
            )}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">🧩 Prompt Constructor</h3>
                <button
                  onClick={() => setShowPromptConstructor(false)}
                  className="btn btn-ghost p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className={cn(
                "text-sm",
                settings.theme === 'dark' ? "text-gray-400" : 
                settings.theme === 'night' ? "text-gray-300" : 
                "text-gray-600"
              )}>
                Build your prompt like LEGO blocks:
              </div>
              <div className="grid grid-cols-2 gap-4">
                {promptBlocks.map((block) => (
                  <div key={block.type} className="space-y-2">
                    <label className="text-sm font-medium capitalize">{block.type}:</label>
                    <select className={cn(
                      "w-full p-2 rounded border text-sm",
                      settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                      settings.theme === 'night' ? "bg-black border-gray-800" : 
                      "bg-white border-gray-300"
                    )}>
                      {block.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className={cn(
                "pt-4 border-t",
                settings.theme === 'dark' ? "border-gray-700" : 
                settings.theme === 'night' ? "border-gray-800" : 
                "border-gray-200"
              )}>
                <button
                  onClick={() => {
                    setInput("Generated prompt will appear here...")
                    setShowPromptConstructor(false)
                  }}
                  className="w-full btn btn-primary"
                >
                  🚀 Generate & Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Memory Panel */}
      {showMemoryPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={cn(
            "rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto",
            settings.theme === 'dark' ? "bg-gray-800" : 
            settings.theme === 'night' ? "bg-gray-900" : 
            "bg-white"
          )}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                AI Memory Panel
              </h2>
              <button
                onClick={() => setShowMemoryPanel(false)}
                className={cn(
                  settings.theme === 'dark' ? "text-gray-400 hover:text-gray-300" : 
                  settings.theme === 'night' ? "text-gray-400 hover:text-gray-200" : 
                  "text-gray-400 hover:text-gray-600"
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Memory Search */}
              <div className="lg:col-span-3">
                <div className="flex space-x-4 mb-4">
                  <input
                    type="text"
                    placeholder="Search memories..."
                    value={memorySearchQuery}
                    onChange={(e) => setMemorySearchQuery(e.target.value)}
                    className={cn(
                      "flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                      settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                      settings.theme === 'night' ? "bg-gray-800 border-gray-700" : 
                      "bg-white border-gray-300"
                    )}
                  />
                  <select
                    value={selectedMemoryType}
                    onChange={(e) => setSelectedMemoryType(e.target.value as MemoryItem['type'])}
                    className={cn(
                      "border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                      settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                      settings.theme === 'night' ? "bg-gray-800 border-gray-700" : 
                      "bg-white border-gray-300"
                    )}
                  >
                    <option value="concept">Concepts</option>
                    <option value="preference">Preferences</option>
                    <option value="pattern">Patterns</option>
                    <option value="fact">Facts</option>
                    <option value="skill">Skills</option>
                  </select>
                </div>
              </div>

              {/* Memory List */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Memories</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {memoryItems
                    .filter(m => 
                      (selectedMemoryType === 'concept' || m.type === selectedMemoryType) &&
                      (memorySearchQuery === '' || 
                       m.content.toLowerCase().includes(memorySearchQuery.toLowerCase()) ||
                       m.tags.some(tag => tag.toLowerCase().includes(memorySearchQuery.toLowerCase())))
                    )
                    .sort((a, b) => b.importance - a.importance)
                    .map(memory => (
                      <div
                        key={memory.id}
                        className={cn(
                          "p-4 rounded-lg border cursor-pointer transition-colors",
                          settings.theme === 'dark' ? "bg-gray-700 border-gray-600 hover:bg-gray-600" : 
                          settings.theme === 'night' ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : 
                          "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        )}
                        onClick={() => updateMemoryAccess(memory.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            settings.theme === 'dark' ? "bg-primary-900 text-primary-200" : 
                            settings.theme === 'night' ? "bg-primary-800 text-primary-100" : 
                            "bg-primary-100 text-primary-800"
                          )}>
                            {memory.type}
                          </span>
                          <div className="flex items-center space-x-2 text-xs">
                            <span>Confidence: {(memory.confidence * 100).toFixed(0)}%</span>
                            <span>Access: {memory.accessCount}</span>
                          </div>
                        </div>
                        <div className="font-medium mb-2">{memory.content}</div>
                        <div className={cn(
                          "text-sm mb-2",
                          settings.theme === 'dark' ? "text-gray-400" : 
                          settings.theme === 'night' ? "text-gray-300" : 
                          "text-gray-600"
                        )}>
                          {memory.context}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {memory.tags.map(tag => (
                            <span
                              key={tag}
                              className={cn(
                                "px-2 py-1 rounded text-xs",
                                settings.theme === 'dark' ? "bg-gray-600 text-gray-300" : 
                                settings.theme === 'night' ? "bg-gray-700 text-gray-200" : 
                                "bg-gray-200 text-gray-700"
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Memory Stats */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Memory Statistics</h3>
                <div className={cn(
                  "p-4 rounded-lg border",
                  settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                  settings.theme === 'night' ? "bg-gray-800 border-gray-700" : 
                  "bg-gray-50 border-gray-200"
                )}>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium">Total Memories</div>
                      <div className="text-2xl font-bold">{memoryStats.totalMemories}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Active Memories</div>
                      <div className="text-2xl font-bold">{memoryStats.activeMemories}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Memory Efficiency</div>
                      <div className="text-2xl font-bold">{(memoryStats.memoryEfficiency * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Learning Patterns</div>
                      <div className="text-2xl font-bold">{memoryStats.learningPatterns}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">User Preferences</div>
                      <div className="text-2xl font-bold">{memoryStats.userPreferences}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={optimizeMemory}
                    className={cn(
                      "w-full p-3 rounded-lg border transition-colors",
                      settings.theme === 'dark' ? "border-gray-600 hover:bg-gray-700" : 
                      settings.theme === 'night' ? "border-gray-700 hover:bg-gray-800" : 
                      "border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Optimize Memory</span>
                    </div>
                  </button>
                  <button
                    onClick={exportMemoryData}
                    className={cn(
                      "w-full p-3 rounded-lg border transition-colors",
                      settings.theme === 'dark' ? "border-gray-600 hover:bg-gray-700" : 
                      settings.theme === 'night' ? "border-gray-700 hover:bg-gray-800" : 
                      "border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Export Data</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Learning Insights Panel */}
      {showLearningInsights && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={cn(
            "rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto",
            settings.theme === 'dark' ? "bg-gray-800" : 
            settings.theme === 'night' ? "bg-gray-900" : 
            "bg-white"
          )}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Learning Insights
              </h2>
              <button
                onClick={() => setShowLearningInsights(false)}
                className={cn(
                  settings.theme === 'dark' ? "text-gray-400 hover:text-gray-300" : 
                  settings.theme === 'night' ? "text-gray-400 hover:text-gray-200" : 
                  "text-gray-400 hover:text-gray-600"
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Learning Patterns */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Learning Patterns</h3>
                <div className="space-y-3">
                  {learningPatterns
                    .sort((a, b) => b.successRate - a.successRate)
                    .map(pattern => (
                      <div
                        key={pattern.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                          settings.theme === 'night' ? "bg-gray-800 border-gray-700" : 
                          "bg-gray-50 border-gray-200"
                        )}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{pattern.pattern}</span>
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            pattern.successRate > 0.7 
                              ? settings.theme === 'dark' ? "bg-green-900 text-green-200" : 
                                settings.theme === 'night' ? "bg-green-800 text-green-100" : 
                                "bg-green-100 text-green-800"
                              : settings.theme === 'dark' ? "bg-yellow-900 text-yellow-200" : 
                                settings.theme === 'night' ? "bg-yellow-800 text-yellow-100" : 
                                "bg-yellow-100 text-yellow-800"
                          )}>
                            {(pattern.successRate * 100).toFixed(0)}% Success
                          </span>
                        </div>
                        <div className={cn(
                          "text-sm mb-2",
                          settings.theme === 'dark' ? "text-gray-400" : 
                          settings.theme === 'night' ? "text-gray-300" : 
                          "text-gray-600"
                        )}>
                          {pattern.description}
                        </div>
                        <div className="text-xs">
                          Last used: {pattern.lastUsed.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* User Preferences */}
              <div>
                <h3 className="text-lg font-semibold mb-4">User Preferences</h3>
                <div className="space-y-3">
                  {userPreferences
                    .sort((a, b) => b.strength - a.strength)
                    .map(preference => (
                      <div
                        key={preference.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          settings.theme === 'dark' ? "bg-gray-700 border-gray-600" : 
                          settings.theme === 'night' ? "bg-gray-800 border-gray-700" : 
                          "bg-gray-50 border-gray-200"
                        )}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">{preference.category}</div>
                            <div className="text-sm">{preference.preference}</div>
                          </div>
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            settings.theme === 'dark' ? "bg-primary-900 text-primary-200" : 
                            settings.theme === 'night' ? "bg-primary-800 text-primary-100" : 
                            "bg-primary-100 text-primary-800"
                          )}>
                            {(preference.strength * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className={cn(
                          "text-sm",
                          settings.theme === 'dark' ? "text-gray-400" : 
                          settings.theme === 'night' ? "text-gray-300" : 
                          "text-gray-600"
                        )}>
                          {preference.context}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drag & Drop Overlay */}
      {isDragOver && (
        <div className="fixed inset-0 bg-primary-500 bg-opacity-20 border-4 border-dashed border-primary-500 z-50 flex items-center justify-center">
          <div className="text-center">
            <Upload className="h-16 w-16 mx-auto mb-4 text-primary-500" />
            <h3 className="text-xl font-semibold mb-2">Drop files here</h3>
            <p className="text-sm text-gray-600">Upload files to your workspace</p>
          </div>
        </div>
      )}
    </div>
  )
} 