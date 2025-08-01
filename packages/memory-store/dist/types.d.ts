export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
    metadata?: Record<string, any>;
}
export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    model?: string;
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}
export interface Session {
    id: string;
    userId: string;
    conversations: Conversation[];
    activeConversationId?: string;
    createdAt: Date;
    updatedAt: Date;
    settings?: SessionSettings;
}
export interface SessionSettings {
    maxMemorySize: number;
    autoSave: boolean;
    modelPreferences?: string[];
}
export interface MemoryContext {
    conversationId: string;
    recentMessages: Message[];
    summary?: string;
    keyTopics: string[];
    lastUpdated: Date;
}
export interface MemoryStoreConfig {
    maxConversations: number;
    maxMessagesPerConversation: number;
    autoCleanup: boolean;
    cleanupInterval: number;
}
//# sourceMappingURL=types.d.ts.map