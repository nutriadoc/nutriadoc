import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nutria',
  description: 'Nutria is a feature-rich rich text editor designed to provide a comprehensive set of tools for text formatting, inserting images, videos, and attachments. It offers collaborative editing and communication features, making it a versatile platform for various use cases.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
