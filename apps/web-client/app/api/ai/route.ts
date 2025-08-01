import { NextRequest, NextResponse } from 'next/server'
import { AICore } from '@neuropilot/ai-core'

// Initialize AI Core with configuration
const aiCore = new AICore({
  router: {
    defaultModel: 'gpt-4',
    routingRules: [],
    fallbackModel: 'gpt-3.5-turbo'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    organization: process.env.OPENAI_ORG_ID || ''
  },
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY || ''
  }
})

export async function POST(request: NextRequest) {
  try {
    const { messages, model, options } = await request.json()

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    // Route the query through AI Core
    const response = await aiCore.routeQuery(messages, {
      preferredModel: model,
      ...options
    })

    return NextResponse.json(response)
  } catch (error) {
    console.error('AI API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    )
  }
} 