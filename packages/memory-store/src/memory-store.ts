import { v4 as uuidv4 } from 'uuid';
import {
  Conversation,
  Message,
  Session,
  SessionSettings,
  MemoryContext,
  MemoryStoreConfig,
} from './types';

export class MemoryStore {
  private sessions: Map<string, Session> = new Map();
  private config: MemoryStoreConfig;
  private cleanupInterval?: NodeJS.Timeout;

  constructor(config: Partial<MemoryStoreConfig> = {}) {
    this.config = {
      maxConversations: 50,
      maxMessagesPerConversation: 100,
      autoCleanup: true,
      cleanupInterval: 24 * 60 * 60 * 1000, // 24 hours
      ...config,
    };

    if (this.config.autoCleanup) {
      this.startCleanupInterval();
    }
  }

  // Session Management
  createSession(userId: string, settings?: Partial<SessionSettings>): Session {
    const session: Session = {
      id: uuidv4(),
      userId,
      conversations: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      settings: {
        maxMemorySize: 10,
        autoSave: true,
        ...settings,
      },
    };

    this.sessions.set(session.id, session);
    return session;
  }

  getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  updateSession(sessionId: string, updates: Partial<Session>): Session | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    const updatedSession = {
      ...session,
      ...updates,
      updatedAt: new Date(),
    };

    this.sessions.set(sessionId, updatedSession);
    return updatedSession;
  }

  // Conversation Management
  createConversation(sessionId: string, title: string): Conversation | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    const conversation: Conversation = {
      id: uuidv4(),
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    session.conversations.push(conversation);
    session.updatedAt = new Date();
    
    // Set as active conversation if none exists
    if (!session.activeConversationId) {
      session.activeConversationId = conversation.id;
    }

    this.sessions.set(sessionId, session);
    return conversation;
  }

  getConversation(sessionId: string, conversationId: string): Conversation | undefined {
    const session = this.sessions.get(sessionId);
    return session?.conversations.find(c => c.id === conversationId);
  }

  addMessage(
    sessionId: string,
    conversationId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
    model?: string,
    usage?: Message['usage']
  ): Message | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    const conversation = session.conversations.find(c => c.id === conversationId);
    if (!conversation) return undefined;

    const message: Message = {
      id: uuidv4(),
      role,
      content,
      timestamp: new Date(),
      model,
      usage,
    };

    conversation.messages.push(message);
    conversation.updatedAt = new Date();
    session.updatedAt = new Date();

    // Enforce message limit
    if (conversation.messages.length > this.config.maxMessagesPerConversation) {
      conversation.messages = conversation.messages.slice(-this.config.maxMessagesPerConversation);
    }

    this.sessions.set(sessionId, session);
    return message;
  }

  getRecentMessages(
    sessionId: string,
    conversationId: string,
    count: number = 10
  ): Message[] {
    const conversation = this.getConversation(sessionId, conversationId);
    if (!conversation) return [];

    return conversation.messages.slice(-count);
  }

  // Context Management
  getMemoryContext(sessionId: string, conversationId: string): MemoryContext | undefined {
    const conversation = this.getConversation(sessionId, conversationId);
    if (!conversation) return undefined;

    const session = this.sessions.get(sessionId);
    const maxMemorySize = session?.settings?.maxMemorySize || 10;

    const recentMessages = this.getRecentMessages(sessionId, conversationId, maxMemorySize);
    
    // Extract key topics from recent messages
    const keyTopics = this.extractKeyTopics(recentMessages);

    return {
      conversationId,
      recentMessages,
      keyTopics,
      lastUpdated: new Date(),
    };
  }

  private extractKeyTopics(messages: Message[]): string[] {
    const topics = new Set<string>();
    const content = messages.map(m => m.content).join(' ').toLowerCase();
    
    // Simple keyword extraction (in a real implementation, you'd use NLP)
    const keywords = [
      'code', 'function', 'component', 'api', 'database', 'frontend', 'backend',
      'react', 'typescript', 'javascript', 'python', 'node', 'express',
      'summary', 'analysis', 'explain', 'debug', 'optimize', 'refactor'
    ];

    keywords.forEach(keyword => {
      if (content.includes(keyword)) {
        topics.add(keyword);
      }
    });

    return Array.from(topics).slice(0, 5); // Limit to 5 topics
  }

  // Cleanup and Maintenance
  private startCleanupInterval(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  private cleanup(): void {
    const now = new Date();
    const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

    for (const [sessionId, session] of this.sessions.entries()) {
      // Remove old conversations
      session.conversations = session.conversations.filter(conv => 
        conv.updatedAt > cutoff
      );

      // Remove sessions with no conversations
      if (session.conversations.length === 0) {
        this.sessions.delete(sessionId);
      } else {
        // Enforce conversation limit
        if (session.conversations.length > this.config.maxConversations) {
          session.conversations = session.conversations
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
            .slice(0, this.config.maxConversations);
        }
      }
    }
  }

  // Export/Import
  exportSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  importSession(session: Session): void {
    this.sessions.set(session.id, session);
  }

  // Cleanup
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.sessions.clear();
  }
} 