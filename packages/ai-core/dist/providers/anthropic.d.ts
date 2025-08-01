import { AIMessage, AIResponse, AIConfig } from '../types';
export declare class AnthropicProvider {
    private client;
    constructor(config: AIConfig['anthropic']);
    generateResponse(messages: AIMessage[], model: string, options?: {
        temperature?: number;
        maxTokens?: number;
    }): Promise<AIResponse>;
    summarize(text: string, model?: string): Promise<AIResponse>;
}
//# sourceMappingURL=anthropic.d.ts.map