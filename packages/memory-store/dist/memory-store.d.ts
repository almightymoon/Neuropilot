import { Conversation, Message, Session, SessionSettings, MemoryContext, MemoryStoreConfig } from './types';
export declare class MemoryStore {
    private sessions;
    private config;
    private cleanupInterval?;
    constructor(config?: Partial<MemoryStoreConfig>);
    createSession(userId: string, settings?: Partial<SessionSettings>): Session;
    getSession(sessionId: string): Session | undefined;
    updateSession(sessionId: string, updates: Partial<Session>): Session | undefined;
    createConversation(sessionId: string, title: string): Conversation | undefined;
    getConversation(sessionId: string, conversationId: string): Conversation | undefined;
    addMessage(sessionId: string, conversationId: string, role: 'user' | 'assistant' | 'system', content: string, model?: string, usage?: Message['usage']): Message | undefined;
    getRecentMessages(sessionId: string, conversationId: string, count?: number): Message[];
    getMemoryContext(sessionId: string, conversationId: string): MemoryContext | undefined;
    private extractKeyTopics;
    private startCleanupInterval;
    private cleanup;
    exportSession(sessionId: string): Session | undefined;
    importSession(session: Session): void;
    destroy(): void;
}
//# sourceMappingURL=memory-store.d.ts.map