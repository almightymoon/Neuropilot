import { AIMessage, AIResponse } from './types';
import { AIConfig } from './types';
export declare class ModelRouter {
    private config;
    private openaiProvider;
    private anthropicProvider;
    constructor(config: AIConfig);
    private analyzeQuery;
    private selectModel;
    routeQuery(messages: AIMessage[], options?: {
        preferredModel?: string;
        context?: any;
    }): Promise<AIResponse>;
    generateCode(prompt: string, language: string, preferredModel?: string): Promise<AIResponse>;
    summarize(text: string, preferredModel?: string): Promise<AIResponse>;
}
//# sourceMappingURL=router.d.ts.map