'use client'

import InstagramCTA from './InstagramCTA'
import { Sparkles } from 'lucide-react'

export default function PricePlans({ movieTitle }: { movieTitle: string }) {
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

      <div className="mt-6">
        <InstagramCTA movieTitle={movieTitle} />
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Tip: Copy the message above, paste it in your DM, and include any extra requests (quality, language, etc.).
      </div>
    </div>
  )
}
