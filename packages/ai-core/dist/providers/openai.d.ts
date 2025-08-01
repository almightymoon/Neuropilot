import { AIMessage, AIResponse, AIConfig } from '../types';
export declare class OpenAIProvider {
    private client;
    constructor(config: AIConfig['openai']);
    generateResponse(messages: AIMessage[], model: string, options?: {
        temperature?: number;
        maxTokens?: number;
    }): Promise<AIResponse>;
    generateCode(prompt: string, language: string, model?: string): Promise<AIResponse>;
}
//# sourceMappingURL=openai.d.ts.map