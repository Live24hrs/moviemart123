import Script from "next/script";
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/chat/ChatWidget'

export const metadata: Metadata = {
  title: 'MovieMart Lite',
  description: 'Movie discovery + Instagram DM checkout + AI bargaining (OpenRouter).',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        <Footer />
        <ChatWidget />
        <script
  dangerouslySetInnerHTML={{
    __html: `
      (function () {
        var s = document.createElement('script');
        s.src = 'https://pl28844493.effectivegatecpm.com/f5/94/64/f594644711285eccc310caa181b34543.js';
        s.async = true;
        document.body.appendChild(s);
      })();
    `,
  }}
/>
      </body>
    </html>
  )
}
