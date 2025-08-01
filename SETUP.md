# NeuroPilot MVP Setup Guide

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- OpenAI API key
- Anthropic API key (optional but recommended)

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd neuropilot
npm install
```

### 2. Environment Setup

Copy the environment template:
```bash
cp apps/web-client/env.example apps/web-client/.env.local
```

Edit `.env.local` and add your API keys:
```env
# AI Provider API Keys
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_ORG_ID=your_openai_org_id_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/neuropilot"

# Authentication
JWT_SECRET=your_jwt_secret_here

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

```bash
# Install PostgreSQL (if not already installed)
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql

# Create database
createdb neuropilot

# Run Prisma migrations
cd apps/web-client
npx prisma db push
```

### 4. Start Development

```bash
# From the root directory
npm run dev
```

The application will be available at `http://localhost:3000`

## Features Overview

### ✅ Implemented Features

1. **Multi-AI Integration**
   - Smart model routing (GPT-4, Claude-3)
   - Automatic model selection based on task type
   - Fallback mechanisms

2. **Enhanced Workspace**
   - Chat interface with real AI responses
   - Document editor with AI-powered actions
   - Task mode with template-based execution
   - Three theme modes (Light, Dark, Night)

3. **Authentication System**
   - User registration and login
   - JWT-based session management
   - PostgreSQL database integration

4. **Advanced UI/UX**
   - Responsive design with Tailwind CSS
   - Keyboard shortcuts (⌘K, ⌘N, ⌘T)
   - Voice input support
   - Drag & drop file uploads
   - Command palette

5. **Memory & Context**
   - Short-term memory system
   - Context preservation across sessions
   - AI learning patterns

### 🚧 Next Steps for Full MVP

1. **Performance Optimization**
   - Implement response streaming
   - Add request caching
   - Optimize bundle size

2. **Enhanced Features**
   - Real-time collaboration
   - Advanced code analysis
   - File system integration
   - Export/import functionality

3. **Production Deployment**
   - Docker containerization
   - CI/CD pipeline
   - Monitoring and logging
   - Security hardening

## API Endpoints

### AI Routes
- `POST /api/ai` - Main AI chat endpoint
- `POST /api/ai/document` - Document editing operations

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Tasks
- `POST /api/tasks` - Execute tasks
- `GET /api/tasks?taskId=...` - Get task status

### Memory
- `POST /api/memory` - Memory operations
- `GET /api/memory?query=...` - Retrieve memories

## Development

### Project Structure
```
neuropilot/
├── apps/
│   └── web-client/          # Next.js frontend
├── packages/
│   ├── ai-core/            # AI orchestration
│   ├── memory-store/       # Context management
│   ├── task-runner/        # Task execution
│   └── ui-components/      # Shared components
└── docs/                   # Documentation
```

### Key Technologies
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Prisma ORM
- **AI**: OpenAI GPT-4, Anthropic Claude
- **Database**: PostgreSQL
- **Build**: Turbo (monorepo)

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure all API keys are correctly set in `.env.local`
   - Check API key permissions and quotas

2. **Database Connection**
   - Verify PostgreSQL is running
   - Check DATABASE_URL format
   - Run `npx prisma db push` to sync schema

3. **Build Errors**
   - Clear cache: `rm -rf .next node_modules/.cache`
   - Reinstall dependencies: `npm install`

4. **Memory Issues**
   - Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=4096"`

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the codebase documentation
3. Create an issue in the repository

## License

This project is licensed under the MIT License. 