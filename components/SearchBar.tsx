'use client'

import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { useState } from 'react'

export default function SearchBar({ initialValue = '' }: { initialValue?: string }) {
  const router = useRouter()
  const [q, setQ] = useState(initialValue)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const term = q.trim()
        if (term) router.push(`/search?q=${encodeURIComponent(term)}`)
      }}
    >
      <div className="relative">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search movies (example: Interstellar)…"
          className="w-full rounded-full border border-slate-200 bg-white px-12 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
      </div>
    </form>
  )
}
