import { Anthropic } from '@anthropic-ai/sdk';
import { AIMessage, AIResponse, AIConfig } from '../types';

export class AnthropicProvider {
  private client: Anthropic;

  constructor(config: AIConfig['anthropic']) {
    this.client = new Anthropic({
      apiKey: config.apiKey,
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
      // Convert OpenAI format messages to Anthropic format
      const systemMessage = messages.find(msg => msg.role === 'system');
      const userMessages = messages.filter(msg => msg.role === 'user');
      const assistantMessages = messages.filter(msg => msg.role === 'assistant');

      // Combine user messages
      const userContent = userMessages.map(msg => msg.content).join('\n\n');
      
      // Combine assistant messages for context
      const assistantContent = assistantMessages.length > 0 
        ? assistantMessages.map(msg => msg.content).join('\n\n')
        : undefined;

      const response = await this.client.messages.create({
        model,
        max_tokens: options?.maxTokens ?? 1024,
        temperature: options?.temperature ?? 0.7,
        system: systemMessage?.content,
        messages: [
          ...(assistantContent ? [{ role: 'assistant' as const, content: assistantContent }] : []),
          { role: 'user' as const, content: userContent }
        ],
      });

      return {
        content: response.content[0]?.type === 'text' ? response.content[0].text : '',
        model,
        usage: response.usage ? {
          prompt_tokens: response.usage.input_tokens,
          completion_tokens: response.usage.output_tokens,
          total_tokens: response.usage.input_tokens + response.usage.output_tokens,
        } : undefined,
        metadata: {
          stop_reason: response.stop_reason,
        },
      };
    } catch (error) {
      throw new Error(`Anthropic API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async summarize(
    text: string,
    model: string = 'claude-3-sonnet'
  ): Promise<AIResponse> {
    const systemMessage: AIMessage = {
      role: 'system',
      content: 'You are an expert at summarizing text. Provide clear, concise summaries that capture the key points and main ideas.',
    };

    const userMessage: AIMessage = {
      role: 'user',
      content: `Please summarize the following text:\n\n${text}`,
    };

    return this.generateResponse([systemMessage, userMessage], model, {
      temperature: 0.3,
    });
  }
} 