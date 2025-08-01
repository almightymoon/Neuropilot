/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@neuropilot/ai-core',
    '@neuropilot/memory-store',
    '@neuropilot/task-runner',
    '@neuropilot/ui-components',
  ],
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig 