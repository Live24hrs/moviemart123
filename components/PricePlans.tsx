'use client'

import { useState } from 'react'
import InstagramCTA from './InstagramCTA'

function PlanCard({ title, price, desc, picked, onPick }: any) {
  return (
    <button
      onClick={onPick}
      className={`card p-6 text-left transition ${picked ? 'ring-2 ring-indigo-500 shadow-xl' : 'hover:shadow-xl'}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg font-bold">{title}</div>
          <div className="text-sm text-slate-600 mt-1">{desc}</div>
        </div>
        <div className="text-2xl font-extrabold">₹{price}</div>
      </div>
      <div className="mt-4 text-xs text-slate-500">
        Tip: Use the chat bubble to bargain and get a final offer.
      </div>
    </button>
  )
}

export default function PricePlans({ movieTitle }: { movieTitle: string }) {
  const [plan, setPlan] = useState<{ title: string; price: number } | null>({ title: 'Standard', price: 59 })

  return (
    <div className="card p-6 sm:p-8">
      <h2 className="text-2xl font-bold">Choose a plan</h2>
      <p className="mt-2 text-slate-600">After choosing, DM us on Instagram with a ready message.</p>

      <div className="mt-6 grid md:grid-cols-3 gap-5">
        <PlanCard title="Basic" price={39} desc="Budget plan • quick requests" picked={plan?.price===39} onPick={() => setPlan({ title:'Basic', price:39 })} />
        <PlanCard title="Standard" price={59} desc="Most popular • best value" picked={plan?.price===59} onPick={() => setPlan({ title:'Standard', price:59 })} />
        <PlanCard title="Premium" price={89} desc="Priority handling • premium options" picked={plan?.price===89} onPick={() => setPlan({ title:'Premium', price:89 })} />
      </div>

      <div className="mt-6">
        <InstagramCTA movieTitle={movieTitle} plan={plan?.title || 'Standard'} price={plan?.price || 59} />
      </div>
    </div>
  )
}
