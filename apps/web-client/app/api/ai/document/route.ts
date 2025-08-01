import { NextRequest, NextResponse } from 'next/server'
import { AICore } from '@neuropilot/ai-core'

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
    const { action, content, options } = await request.json()

    if (!action || !content) {
      return NextResponse.json(
        { error: 'Action and content are required' },
        { status: 400 }
      )
    }

    let prompt = ''
    let model = 'gpt-4'

    switch (action) {
      case 'rewrite':
        prompt = `Please rewrite the following content in a clear, professional style while maintaining the original meaning:\n\n${content}`
        break
      case 'summarize':
        prompt = `Please provide a concise summary of the following content:\n\n${content}`
        model = 'claude-3-sonnet'
        break
      case 'expand':
        prompt = `Please expand and elaborate on the following content, adding more detail and context:\n\n${content}`
        break
      case 'format-table':
        prompt = `Please format the following content as a well-structured table:\n\n${content}`
        break
      case 'improve':
        prompt = `Please improve the following content by enhancing clarity, grammar, and flow:\n\n${content}`
        break
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    const response = await aiCore.routeQuery([
      { role: 'user', content: prompt }
    ], {
      preferredModel: model
    })

    return NextResponse.json({
      content: response.content,
      model: response.model,
      action
    })
  } catch (error) {
    console.error('Document AI Error:', error)
    return NextResponse.json(
      { error: 'Failed to process document request' },
      { status: 500 }
    )
  }
} 