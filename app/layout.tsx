import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gustavo Melo Silva | Full Stack Developer',
  description: 'Desenvolvedor Full Stack apaixonado por criar experiências digitais inovadoras. Especializado em React, Node.js, TypeScript e muito mais.',
  keywords: ['Full Stack Developer', 'React', 'Node.js', 'TypeScript', 'Web Development', 'Gustavo Melo Silva'],
  authors: [{ name: 'Gustavo Melo Silva' }],
  creator: 'Gustavo Melo Silva',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Gustavo Melo Silva | Full Stack Developer',
    description: 'Desenvolvedor Full Stack apaixonado por criar experiências digitais inovadoras.',
    siteName: 'Gustavo Melo Silva Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gustavo Melo Silva | Full Stack Developer',
    description: 'Desenvolvedor Full Stack apaixonado por criar experiências digitais inovadoras.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#00ff88',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
