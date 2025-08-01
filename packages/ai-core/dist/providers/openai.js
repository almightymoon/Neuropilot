"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIProvider = void 0;
const openai_1 = __importDefault(require("openai"));
class OpenAIProvider {
    constructor(config) {
        this.client = new openai_1.default({
            apiKey: config.apiKey,
            organization: config.organization,
        });
    }
    async generateResponse(messages, model, options) {
        try {
            const response = await this.client.chat.completions.create({
                model,
                messages: messages.map(msg => ({
                    role: msg.role,
                    content: msg.content,
                })),
                temperature: options?.temperature ?? 0.7,
                max_tokens: options?.maxTokens,
            });
            const choice = response.choices[0];
            if (!choice?.message?.content) {
                throw new Error('No response content received from OpenAI');
            }
            return {
                content: choice.message.content,
                model,
                usage: response.usage ? {
                    prompt_tokens: response.usage.prompt_tokens,
                    completion_tokens: response.usage.completion_tokens,
                    total_tokens: response.usage.total_tokens,
                } : undefined,
                metadata: {
                    finish_reason: choice.finish_reason,
                },
            };
        }
        catch (error) {
            throw new Error(`OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async generateCode(prompt, language, model = 'gpt-4') {
        const systemMessage = {
            role: 'system',
            content: `You are an expert ${language} developer. Generate clean, well-documented code based on the user's request. Always include comments explaining complex logic.`,
        };
        const userMessage = {
            role: 'user',
            content: prompt,
        };
        return this.generateResponse([systemMessage, userMessage], model, {
            temperature: 0.3,
        });
    }
}
exports.OpenAIProvider = OpenAIProvider;
//# sourceMappingURL=openai.js.map