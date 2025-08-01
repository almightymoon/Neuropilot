import { AIModel } from './types';

export const AI_MODELS: Record<string, AIModel> = {
  'gpt-4': {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'openai',
    capabilities: ['reasoning', 'code-generation', 'analysis', 'creative-writing'],
    maxTokens: 8192,
    costPerToken: 0.00003
  },
  'gpt-4-turbo': {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    capabilities: ['reasoning', 'code-generation', 'analysis', 'creative-writing'],
    maxTokens: 128000,
    costPerToken: 0.00001
  },
  'gpt-3.5-turbo': {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    capabilities: ['code-generation', 'creative-writing', 'translation'],
    maxTokens: 4096,
    costPerToken: 0.000002
  },
  'claude-3-opus': {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    capabilities: ['reasoning', 'summarization', 'analysis', 'creative-writing'],
    maxTokens: 200000,
    costPerToken: 0.000015
  },
  'claude-3-sonnet': {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'anthropic',
    capabilities: ['reasoning', 'summarization', 'code-generation', 'analysis'],
    maxTokens: 200000,
    costPerToken: 0.000003
  },
  'claude-3-haiku': {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'anthropic',
    capabilities: ['summarization', 'translation', 'creative-writing'],
    maxTokens: 200000,
    costPerToken: 0.00000025
  }
};

export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS[id];
}

export function getModelsByCapability(capability: string): AIModel[] {
  return Object.values(AI_MODELS).filter(model => 
    model.capabilities.includes(capability as any)
  );
} 