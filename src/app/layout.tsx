import { Inter, Noto_Sans_SC } from 'next/font/google'
import React from 'react'
import './globals.css'
import type { Metadata, Viewport } from 'next'

const inter = Inter({ subsets: ['latin'] })
const notoSansSC = Noto_Sans_SC({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '你好国际转运',
  description: '吸引人的介绍一句胜千言',
  manifest: '/manifest.json',
}
export const viewport: Viewport = {
  colorScheme: 'light',
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh_CN">
      <body className={[inter.className, notoSansSC.className].join(' ')}>
        {children}
      </body>
    </html>
  )
}
