#!/bin/bash

echo "🔑 NeuroPilot API Keys Setup"
echo "=============================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Creating from template..."
    cp env.example .env
fi

echo "📝 Please add your API keys to the .env file:"
echo ""
echo "1. Get your OpenAI API key from: https://platform.openai.com/api-keys"
echo "2. Get your Anthropic API key from: https://console.anthropic.com/"
echo ""
echo "Add these lines to your .env file:"
echo ""
echo "OPENAI_API_KEY=sk-your-openai-key-here"
echo "ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here"
echo ""
echo "Optional:"
echo "OPENAI_ORG_ID=org-your-org-id-here"
echo ""
echo "💡 After adding the keys, run: npm run dev"
echo ""

# Check if keys are already set
if grep -q "OPENAI_API_KEY=sk-" .env; then
    echo "✅ OpenAI API key is configured"
else
    echo "⚠️  OpenAI API key needs to be configured"
fi

if grep -q "ANTHROPIC_API_KEY=sk-ant-" .env; then
    echo "✅ Anthropic API key is configured"
else
    echo "⚠️  Anthropic API key needs to be configured"
fi

echo ""
echo "🔧 Next steps:"
echo "1. Add your API keys to .env"
echo "2. Run: npx prisma db push"
echo "3. Run: npm run dev"
echo "4. Test the application at http://localhost:3000" 