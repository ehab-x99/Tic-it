import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tic It - Concert Ticket Booking',
  description: 'Book concert tickets with a futuristic cyberpunk experience',
  keywords: ['concert', 'tickets', 'music', 'events', 'booking'],
  authors: [{ name: 'Tic It Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00ffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-dark-950 text-gray-100">
          {children}
        </div>
      </body>
    </html>
  )
}
