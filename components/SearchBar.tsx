'use client'

import { useRouter } from 'next/navigation'
import { Loader2, Search } from 'lucide-react'
import { useState, useTransition } from 'react'

export default function SearchBar({ initialValue = '' }: { initialValue?: string }) {
  const router = useRouter()
  const [q, setQ] = useState(initialValue)
  const [isPending, startTransition] = useTransition()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const term = q.trim()
        if (!term) return
        startTransition(() => {
          router.push(`/search?q=${encodeURIComponent(term)}`)
        })
      }}
    >
      <div className="relative">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search movies (example: Interstellar)…"
          className="w-full rounded-full border border-slate-200 bg-white px-12 pr-12 py-3 outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-80"
          aria-label="Search movies"
          disabled={isPending}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />

        {/* Loading indicator so users know search is working */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500">
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        </div>
      </div>
    </form>
  )
}
