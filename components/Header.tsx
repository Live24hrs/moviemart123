'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Film } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()

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
            <Link className="btn-primary" href="/search">Browse</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
