import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LiveDecor from '@/components/LiveDecor'
import PopUnder from '@/components/ads/PopUnder'
import SocialBarSmartLink from '@/components/ads/SocialBarSmartLink'
import AdBanner from '@/components/AdBanner'
import Banner160x300 from '@/components/ads/Banner160x300'
import FloatingInstagramDM from '@/components/FloatingInstagramDM'

export const metadata: Metadata = {
  title: 'MovieMart Lite',
  description: 'Movie discovery + FREE Instagram DM checkout.',
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
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <LiveDecor />
        <PopUnder />
        <SocialBarSmartLink />

        <Header />

        {/* Top 320x50 banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="flex justify-center">
            <AdBanner />
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-[1fr_180px] gap-6 items-start">
            <div className="min-w-0">{children}</div>

            {/* Right sidebar ad (desktop) */}
            <aside className="hidden lg:block sticky top-24">
              <Banner160x300 />
              <div className="mt-4 opacity-70 text-[11px] text-slate-500 text-center">Advertisement</div>
            </aside>
          </div>
        </main>

        <Footer />
        <FloatingInstagramDM />
      </body>
    </html>
  )
}
