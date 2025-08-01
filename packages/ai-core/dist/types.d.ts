export interface AIMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: Date;
}
export interface AIResponse {
    content: string;
    model: string;
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
    metadata?: Record<string, any>;
}
export interface AIModel {
    id: string;
    name: string;
    provider: 'openai' | 'anthropic';
    capabilities: ModelCapability[];
    maxTokens: number;
    costPerToken: number;
}
export type ModelCapability = 'reasoning' | 'summarization' | 'code-generation' | 'creative-writing' | 'analysis' | 'translation';
export interface ModelRouterConfig {
    defaultModel: string;
    fallbackModel: string;
    routingRules: RoutingRule[];
}
export interface RoutingRule {
    condition: (query: string, context?: any) => boolean;
    modelId: string;
    priority: number;
}
export interface AIConfig {
    openai: {
        apiKey: string;
        organization?: string;
    };
    anthropic: {
        apiKey: string;
    };
    router: ModelRouterConfig;
}
//# sourceMappingURL=types.d.ts.map