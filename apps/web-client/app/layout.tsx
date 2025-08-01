import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'NeuroPilot - AI-Powered Workspace Assistant',
  description: 'Your all-in-one AI workspace combining the best features of top AI tools with unique capabilities.',
  keywords: ['AI', 'workspace', 'assistant', 'copilot', 'productivity', 'development'],
  authors: [{ name: 'NeuroPilot Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'NeuroPilot - AI-Powered Workspace Assistant',
    description: 'Your all-in-one AI workspace combining the best features of top AI tools.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuroPilot - AI-Powered Workspace Assistant',
    description: 'Your all-in-one AI workspace combining the best features of top AI tools.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
} 