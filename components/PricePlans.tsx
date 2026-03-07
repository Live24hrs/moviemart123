'use client'

import { Sparkles, Lock, Download, ExternalLink } from 'lucide-react'
import { useMemo, useState } from 'react'
import { openSmartLinkGate } from '@/lib/ads'
import { slugifyTitle } from '@/lib/slug'
import Banner300x250 from '@/components/ads/Banner300x250'

export default function PricePlans({ movieTitle }: { movieTitle: string }) {
  const slug = useMemo(() => slugifyTitle(movieTitle), [movieTitle])
  const storageKey = useMemo(() => `mm_dl_gate_${slug}`, [slug])
  const [opens, setOpens] = useState(0)
  const [unlocked, setUnlocked] = useState(false)

  const downloadBase =
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_DOWNLOAD_BASE) || ''

  const finalUrl = downloadBase ? `${downloadBase}${slug}` : ''

  const unlock = () => {
    const r = openSmartLinkGate(storageKey, 2)
    setOpens(r.opens)
    setUnlocked(r.unlocked)
  }

  const openDownload = () => {
    if (!finalUrl) return
    try {
      window.open(finalUrl, '_blank', 'noopener,noreferrer')
    } catch {
      // ignore
    }
  }

  return (
    <div className="card p-6 sm:p-8">
      <div className="inline-flex items-center gap-2 chip">
        <Sparkles className="h-4 w-4" />
        Download gate
      </div>

      <h2 className="mt-4 text-2xl font-bold">Download movie</h2>
      <p className="mt-2 text-slate-600">
        Tap unlock to continue. After unlocking, the download button will appear.
      </p>

      {/* Mid-page banner for better RPM */}
      <div className="mt-5 flex justify-center">
        <Banner300x250 />
      </div>

      <div className="mt-6 space-y-3">
        {!downloadBase ? (
          <div className="rounded-2xl border bg-amber-50 p-4 text-sm text-amber-900">
            <div className="font-semibold">Download link not configured</div>
            <div className="mt-1 opacity-90">
              Set <span className="font-mono">NEXT_PUBLIC_DOWNLOAD_BASE</span> in Vercel env vars.
              Example: <span className="font-mono">https://your-site.com/download-</span>
            </div>
          </div>
        ) : !unlocked ? (
          <button className="btn-primary w-full sm:w-auto" onClick={unlock}>
            <Lock className="h-5 w-5" /> Unlock download ({Math.min(opens + 1, 2)}/2)
          </button>
        ) : (
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Download className="h-4 w-4" /> Unlocked — download below
            </div>
            <button className="btn-primary w-full sm:w-auto" onClick={openDownload}>
              <ExternalLink className="h-5 w-5" /> Open download
            </button>
            <div className="text-xs text-slate-500 break-all">{finalUrl}</div>
          </div>
        )}
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Tip: Unlock requires two taps (each tap opens an ad). Then the download button is enabled.
      </div>
    </div>
  )
}
