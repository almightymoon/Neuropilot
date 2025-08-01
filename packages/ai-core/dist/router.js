"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRouter = void 0;
const models_1 = require("./models");
const openai_1 = require("./providers/openai");
const anthropic_1 = require("./providers/anthropic");
class ModelRouter {
    constructor(config) {
        this.config = config.router;
        this.openaiProvider = new openai_1.OpenAIProvider(config.openai);
        this.anthropicProvider = new anthropic_1.AnthropicProvider(config.anthropic);
    }
    analyzeQuery(query) {
        const lowerQuery = query.toLowerCase();
        // Determine query type
        let type = 'reasoning';
        let capabilities = [];
        if (lowerQuery.includes('code') || lowerQuery.includes('function') || lowerQuery.includes('component') ||
            lowerQuery.includes('api') || lowerQuery.includes('class') || lowerQuery.includes('import')) {
            type = 'code';
            capabilities.push('code-generation');
        }
        if (lowerQuery.includes('summarize') || lowerQuery.includes('summary') || lowerQuery.includes('brief')) {
            type = 'summarization';
            capabilities.push('summarization');
        }
        if (lowerQuery.includes('analyze') || lowerQuery.includes('explain') || lowerQuery.includes('why') ||
            lowerQuery.includes('how') || lowerQuery.includes('compare')) {
            type = 'analysis';
            capabilities.push('analysis', 'reasoning');
        }
        if (lowerQuery.includes('write') || lowerQuery.includes('story') || lowerQuery.includes('creative') ||
            lowerQuery.includes('imagine') || lowerQuery.includes('describe')) {
            type = 'creative';
            capabilities.push('creative-writing');
        }
        // Determine complexity
        let complexity = 'medium';
        const wordCount = query.split(' ').length;
        const hasComplexTerms = /algorithm|architecture|optimization|performance|scalability/.test(lowerQuery);
        if (wordCount > 50 || hasComplexTerms) {
            complexity = 'high';
        }
        else if (wordCount < 20) {
            complexity = 'low';
        }
        return { capabilities, complexity, type };
    }
    selectModel(query, context) {
        const analysis = this.analyzeQuery(query);
        // Check custom routing rules first
        for (const rule of this.config.routingRules) {
            if (rule.condition(query, context)) {
                return rule.modelId;
            }
        }
        // Default routing logic based on analysis
        if (analysis.type === 'code') {
            return 'gpt-4'; // Best for code generation
        }
        if (analysis.type === 'summarization') {
            return 'claude-3-sonnet'; // Excellent for summarization
        }
        if (analysis.complexity === 'high') {
            return 'gpt-4-turbo'; // Best for complex reasoning
        }
        if (analysis.type === 'creative') {
            return 'claude-3-opus'; // Great for creative tasks
        }
        // Default fallback
        return this.config.defaultModel;
    }
    async routeQuery(messages, options) {
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage || lastMessage.role !== 'user') {
            throw new Error('Last message must be from user');
        }
        const selectedModel = options?.preferredModel || this.selectModel(lastMessage.content, options?.context);
        const model = (0, models_1.getModelById)(selectedModel);
        if (!model) {
            throw new Error(`Model ${selectedModel} not found`);
        }
        try {
            // Route to appropriate provider
            if (model.provider === 'openai') {
                return await this.openaiProvider.generateResponse(messages, selectedModel);
            }
            else if (model.provider === 'anthropic') {
                return await this.anthropicProvider.generateResponse(messages, selectedModel);
            }
            else {
                throw new Error(`Unknown provider: ${model.provider}`);
            }
        }
        catch (error) {
            // Fallback to default model if primary fails
            if (selectedModel !== this.config.fallbackModel) {
                console.warn(`Primary model ${selectedModel} failed, falling back to ${this.config.fallbackModel}`);
                const fallbackModel = (0, models_1.getModelById)(this.config.fallbackModel);
                if (fallbackModel?.provider === 'openai') {
                    return await this.openaiProvider.generateResponse(messages, this.config.fallbackModel);
                }
                else if (fallbackModel?.provider === 'anthropic') {
                    return await this.anthropicProvider.generateResponse(messages, this.config.fallbackModel);
                }
            }
            throw error;
        }
    }
    async generateCode(prompt, language, preferredModel) {
        const model = preferredModel || 'gpt-4';
        const modelInfo = (0, models_1.getModelById)(model);
        if (!modelInfo) {
            throw new Error(`Model ${model} not found`);
        }
        if (modelInfo.provider === 'openai') {
            return await this.openaiProvider.generateCode(prompt, language, model);
        }
        else {
            throw new Error(`Code generation not supported for ${modelInfo.provider} models`);
        }
    }
    async summarize(text, preferredModel) {
        const model = preferredModel || 'claude-3-sonnet';
        const modelInfo = (0, models_1.getModelById)(model);
        if (!modelInfo) {
            throw new Error(`Model ${model} not found`);
        }
        if (modelInfo.provider === 'anthropic') {
            return await this.anthropicProvider.summarize(text, model);
        }
        else {
            // Fallback to OpenAI for summarization
            const messages = [
                {
                    role: 'system',
                    content: 'You are an expert at summarizing text. Provide clear, concise summaries that capture the key points and main ideas.',
                },
                {
                    role: 'user',
                    content: `Please summarize the following text:\n\n${text}`,
                },
            ];
            return await this.openaiProvider.generateResponse(messages, model, { temperature: 0.3 });
        }
    }
}
exports.ModelRouter = ModelRouter;
//# sourceMappingURL=router.js.map