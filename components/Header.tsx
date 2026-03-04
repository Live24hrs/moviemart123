'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Film, Search } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [q, setQ] = useState('')

  const nav = (href: string, label: string) => (
    <Link href={href} className={cn('text-sm font-medium hover:text-indigo-700', pathname === href && 'text-indigo-700')}>
      {label}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 grid place-items-center shadow-lg">
              <Film className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold">MovieMart</div>
              <div className="text-[11px] text-slate-600">Lite • plug & launch</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-4 ml-6">
            {nav('/', 'Home')}
            {nav('/search', 'Search')}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <form
              className="hidden sm:block"
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
                  placeholder="Search movies…"
                  className="w-[320px] rounded-full border border-white/40 bg-white/70 px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              </div>
            </form>

            <Link className="btn-primary" href="/search">Browse</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
