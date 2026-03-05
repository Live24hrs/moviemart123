'use client'

import InstagramCTA from './InstagramCTA'
import { Sparkles, Lock, Unlock } from 'lucide-react'
import { useState } from 'react'
import { openSmartLinkOncePerSession } from '@/lib/ads'
import Banner300x250 from '@/components/ads/Banner300x250'

export default function PricePlans({ movieTitle }: { movieTitle: string }) {
  const [unlocked, setUnlocked] = useState(false)

  const unlock = () => {
    // “Rewarded” style: user taps to unlock, we open SmartLink once, then reveal the DM CTA.
    openSmartLinkOncePerSession()
    setUnlocked(true)
  }

  return (
    <div className="card p-6 sm:p-8">
      <div className="inline-flex items-center gap-2 chip">
        <Sparkles className="h-4 w-4" />
        Free via Instagram DM
      </div>

      <h2 className="mt-4 text-2xl font-bold">Get it for FREE</h2>
      <p className="mt-2 text-slate-600">
        No plans, no prices. Just DM us on Instagram — we’ll reply with the next steps.
      </p>

      {/* Mid-page banner for better RPM */}
      <div className="mt-5 flex justify-center">
        <Banner300x250 />
      </div>

      <div className="mt-6">
        {!unlocked ? (
          <button className="btn-primary w-full sm:w-auto" onClick={unlock}>
            <Lock className="h-5 w-5" /> Unlock DM details
          </button>
        ) : (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Unlock className="h-4 w-4" /> Unlocked — DM below
            </div>
            <InstagramCTA movieTitle={movieTitle} />
          </div>
        )}
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Tip: Tap “Unlock” once, then copy the message and paste it in your DM (quality, language, etc.).
      </div>
    </div>
  )
}
