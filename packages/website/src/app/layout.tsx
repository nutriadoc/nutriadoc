import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from '@next/third-parties/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nutria',
  description: 'Nutria is a feature-rich rich text editor designed to provide a comprehensive set of tools for text formatting, inserting images, videos, and attachments. It offers collaborative editing and communication features, making it a versatile platform for various use cases.',
}
const imports = {
  "imports": {
    "@nutriadoc/classes": "https://cdn.jsdelivr.net/npm/@nutriadoc/classes@0.0.4/dist/classes.es.js",
    "@nutriadoc/components": "https://cdn.jsdelivr.net/npm/@nutriadoc/components@0.0.4/dist/main.es.js",
    "@nutriadoc/cloud": "https://cdn.jsdelivr.net/npm/@nutriadoc/cloud@0.0.5/dist/index.es.js",
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <script type="importmap" dangerouslySetInnerHTML={{__html: JSON.stringify(imports)}}></script>
    </head>
    <body className={inter.className}>
    <nav className="container p-4 border-b border-gray-200">
      <div className="flex">
        <div className="flex flex-1 gap-4">
          <Image
            className="logo"
            src="/assets/logo.png"
                alt="nutria logo"
                width={20}
                height={20}
              />
              <span>Nutria</span>
            </div>
            <div className="flex gap-2">
              {/*<LoginButton />*/}
              <a href="https://github.com/nutriadoc/nutriadoc">
                <Image
                  src="/assets/github.svg"
                  alt="nutria project on github"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>
        </nav>
        
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-8DHWBN6DWH" />

      </body>
    </html>
  )
}
