# NeuroPilot Development Notes

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+
- Git

### Setup Instructions

1. **Clone and Install**
```bash
git clone <repository-url>
cd neuropilot
npm install
```

2. **Environment Setup**
```bash
# Copy environment template
cp configs/env.example .env

# Add your API keys
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
```

3. **Build Packages**
```bash
npm run build
```

4. **Start Development**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

### Apps
- `apps/web-client/` - Next.js frontend application

### Packages
- `packages/ai-core/` - AI orchestration and model routing
- `packages/memory-store/` - Context management and memory
- `packages/task-runner/` - Multi-step task execution
- `packages/ui-components/` - Shared UI components

### Services
- `services/api/` - API routes and backend logic
- `services/auth/` - Authentication services

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

### Package Development
- Each package should be self-contained
- Use workspace dependencies (`workspace:*`)
- Export clear interfaces and types
- Include comprehensive tests

### API Integration

#### AI Core Usage
```typescript
import { AICore, AIConfig } from '@neuropilot/ai-core'

const config: AIConfig = {
  openai: { apiKey: process.env.OPENAI_API_KEY! },
  anthropic: { apiKey: process.env.ANTHROPIC_API_KEY! },
  router: {
    defaultModel: 'gpt-4',
    fallbackModel: 'gpt-3.5-turbo',
    routingRules: []
  }
}

const aiCore = new AICore(config)

// Route a query
const response = await aiCore.routeQuery([
  { role: 'user', content: 'Generate a React component' }
])
```

#### Memory Store Usage
```typescript
import { MemoryStore } from '@neuropilot/memory-store'

const memoryStore = new MemoryStore()

// Create a session
const session = memoryStore.createSession('user-123')

// Add messages
memoryStore.addMessage(
  session.id, 
  conversationId, 
  'user', 
  'Hello AI!'
)

// Get context
const context = memoryStore.getMemoryContext(session.id, conversationId)
```

#### Task Runner Usage
```typescript
import { TaskRunner } from '@neuropilot/task-runner'

const taskRunner = new TaskRunner()

// Create task from template
const task = taskRunner.createTaskFromTemplate('blog-api', {
  framework: 'express',
  database: 'postgres'
})

// Execute task
const result = await taskRunner.executeTask(task.id)
```

## API Routes

### Chat API
```typescript
// POST /api/chat
interface ChatRequest {
  messages: AIMessage[]
  sessionId: string
  conversationId: string
}

interface ChatResponse {
  response: AIResponse
  context: MemoryContext
}
```

### Document API
```typescript
// POST /api/document/process
interface DocumentRequest {
  content: string
  action: 'rewrite' | 'summarize' | 'expand' | 'format'
}

interface DocumentResponse {
  processedContent: string
  model: string
}
```

### Task API
```typescript
// POST /api/tasks/execute
interface TaskRequest {
  templateId: string
  variables: Record<string, any>
}

interface TaskResponse {
  taskId: string
  status: TaskStatus
  steps: TaskStep[]
}
```

## Testing

### Unit Tests
```bash
# Run all tests
npm test

# Run specific package tests
npm test --workspace=@neuropilot/ai-core
```

### Integration Tests
```bash
# Test API routes
npm run test:integration

# Test end-to-end flows
npm run test:e2e
```

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Required for production:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## Common Issues

### Build Errors
- Ensure all packages are built: `npm run build`
- Check TypeScript errors: `npm run type-check`
- Verify workspace dependencies are correct

### API Errors
- Check API key configuration
- Verify rate limits and quotas
- Ensure proper error handling in providers

### Memory Issues
- Monitor memory usage in development
- Implement proper cleanup in MemoryStore
- Use pagination for large datasets

## Performance Optimization

### Frontend
- Use React.memo for expensive components
- Implement proper loading states
- Optimize bundle size with code splitting

### Backend
- Cache AI responses when appropriate
- Use streaming for long responses
- Implement request queuing for high load

### AI Integration
- Batch similar requests
- Use appropriate model sizes
- Implement retry logic with exponential backoff

## Security Considerations

### API Keys
- Never commit API keys to version control
- Use environment variables
- Rotate keys regularly

### User Data
- Implement proper authentication
- Sanitize user inputs
- Use HTTPS in production

### AI Safety
- Implement content filtering
- Monitor for abuse
- Rate limit user requests

## Monitoring and Logging

### Application Logs
```typescript
import { logger } from '@neuropilot/logger'

logger.info('User action', { userId, action })
logger.error('API error', { error, context })
```

### Performance Monitoring
- Track API response times
- Monitor memory usage
- Log AI model usage and costs

## Contributing

### Pull Request Process
1. Create feature branch
2. Implement changes with tests
3. Update documentation
4. Submit PR with clear description

### Code Review
- Review for security issues
- Check performance implications
- Ensure proper error handling
- Verify test coverage

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Anthropic API](https://docs.anthropic.com/)

### Tools
- [Turbo](https://turbo.build/repo/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Zustand](https://github.com/pmndrs/zustand)

## Support

For development questions:
- Check existing issues
- Review documentation
- Contact the development team 