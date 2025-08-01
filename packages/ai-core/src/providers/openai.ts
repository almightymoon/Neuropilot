import OpenAI from 'openai';
import { AIMessage, AIResponse, AIConfig } from '../types';

export class OpenAIProvider {
  private client: OpenAI;

  constructor(config: AIConfig['openai']) {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      organization: config.organization,
    });
  }

  async generateResponse(
    messages: AIMessage[],
    model: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<AIResponse> {
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
    } catch (error) {
      throw new Error(`OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateCode(
    prompt: string,
    language: string,
    model: string = 'gpt-4'
  ): Promise<AIResponse> {
    const systemMessage: AIMessage = {
      role: 'system',
      content: `You are an expert ${language} developer. Generate clean, well-documented code based on the user's request. Always include comments explaining complex logic.`,
    };

    const userMessage: AIMessage = {
      role: 'user',
      content: prompt,
    };

    return this.generateResponse([systemMessage, userMessage], model, {
      temperature: 0.3,
    });
  }
} 