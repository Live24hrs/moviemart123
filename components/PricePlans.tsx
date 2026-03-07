'use client'

import { Sparkles, Lock, ExternalLink, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { openSmartLinkGate } from '@/lib/ads'
import { slugifyTitle } from '@/lib/slug'
import { buildGoogleSiteQuery } from '@/lib/titleQuery'
import Banner300x250 from '@/components/ads/Banner300x250'

const configuredSite =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SITE_SEARCH_DOMAIN) || ''

export default function PricePlans({ movieTitle }: { movieTitle: string }) {
  const slug = useMemo(() => slugifyTitle(movieTitle), [movieTitle])
  const storageKey = useMemo(() => `mm_dl_gate_${slug}`, [slug])
  const [opens, setOpens] = useState(0)
  const [unlocked, setUnlocked] = useState(false)

  const previewQuery = useMemo(
    () => buildGoogleSiteQuery(movieTitle, configuredSite),
    [movieTitle]
  )

  const unlock = () => {
    const r = openSmartLinkGate(storageKey, 2)
    setOpens(r.opens)
    setUnlocked(r.unlocked)
  }

  const openSearch = () => {
    const query = buildGoogleSiteQuery(movieTitle, configuredSite)
    if (!query) return

    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`
    try {
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch {
      // ignore
    }
  }

  return (
    <div className="card p-6 sm:p-8">
      <div className="inline-flex items-center gap-2 chip">
        <Sparkles className="h-4 w-4" />
        Search gate
      </div>

      <h2 className="mt-4 text-2xl font-bold">Open movie link</h2>
      <p className="mt-2 text-slate-600">
        Tap unlock to continue. After unlocking, the button opens a Google search using the cleaned
        movie title and the site name saved in your environment file.
      </p>

      <div className="mt-5 flex justify-center">
        <Banner300x250 />
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <div className="font-semibold text-slate-900">Free Download Movie</div>
          <div className="mt-1 break-all font-mono text-xs">
          
          </div>
          <div className="mt-3 text-xs text-slate-500">
            Example query:{' '}
            <span className="break-all font-mono">
             
            </span>
          </div>
        </div>

        {!unlocked ? (
          <button className="btn-primary w-full sm:w-auto" onClick={unlock}>
            <Lock className="h-5 w-5" /> Unlock link ({Math.min(opens + 1, 2)}/2)
          </button>
        ) : (
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Search className="h-4 w-4" /> Unlocked — search link ready
            </div>
            <button className="btn-primary w-full sm:w-auto" onClick={openSearch}>
              <ExternalLink className="h-5 w-5" /> Open Link
            </button>
            <div className="break-all text-xs text-slate-500">
              https://www.google.com/search?q={encodeURIComponent(previewQuery || '')}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Set <span className="font-mono">NEXT_PUBLIC_SITE_SEARCH_DOMAIN</span> in{' '}
        <span className="font-mono">.env.local</span>. The search lowercases the movie title,
        removes special characters and common extra words, then adds{' '}
        <span className="font-mono">site:yourdomain.com</span> automatically.
      </div>
    </div>
  )
}
