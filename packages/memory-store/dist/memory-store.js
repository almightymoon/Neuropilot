"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStore = void 0;
const uuid_1 = require("uuid");
class MemoryStore {
    constructor(config = {}) {
        this.sessions = new Map();
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
    createSession(userId, settings) {
        const session = {
            id: (0, uuid_1.v4)(),
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
    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }
    updateSession(sessionId, updates) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        const updatedSession = {
            ...session,
            ...updates,
            updatedAt: new Date(),
        };
        this.sessions.set(sessionId, updatedSession);
        return updatedSession;
    }
    // Conversation Management
    createConversation(sessionId, title) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        const conversation = {
            id: (0, uuid_1.v4)(),
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
    getConversation(sessionId, conversationId) {
        const session = this.sessions.get(sessionId);
        return session?.conversations.find(c => c.id === conversationId);
    }
    addMessage(sessionId, conversationId, role, content, model, usage) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return undefined;
        const conversation = session.conversations.find(c => c.id === conversationId);
        if (!conversation)
            return undefined;
        const message = {
            id: (0, uuid_1.v4)(),
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
    getRecentMessages(sessionId, conversationId, count = 10) {
        const conversation = this.getConversation(sessionId, conversationId);
        if (!conversation)
            return [];
        return conversation.messages.slice(-count);
    }
    // Context Management
    getMemoryContext(sessionId, conversationId) {
        const conversation = this.getConversation(sessionId, conversationId);
        if (!conversation)
            return undefined;
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
    extractKeyTopics(messages) {
        const topics = new Set();
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
    startCleanupInterval() {
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, this.config.cleanupInterval);
    }
    cleanup() {
        const now = new Date();
        const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
        for (const [sessionId, session] of this.sessions.entries()) {
            // Remove old conversations
            session.conversations = session.conversations.filter(conv => conv.updatedAt > cutoff);
            // Remove sessions with no conversations
            if (session.conversations.length === 0) {
                this.sessions.delete(sessionId);
            }
            else {
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
    exportSession(sessionId) {
        return this.sessions.get(sessionId);
    }
    importSession(session) {
        this.sessions.set(session.id, session);
    }
    // Cleanup
    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        this.sessions.clear();
    }
}
exports.MemoryStore = MemoryStore;
//# sourceMappingURL=memory-store.js.map