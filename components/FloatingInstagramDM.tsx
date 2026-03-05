'use client'

import { Instagram, MessageCircle } from 'lucide-react'

export default function FloatingInstagramDM() {
  const handle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'your_handle'
  const profile = `https://www.instagram.com/${handle}/`

  return (
    <a
      href={profile}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[60] group"
      aria-label="DM on Instagram"
    >
      <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 blur opacity-40 group-hover:opacity-70 transition" />
      <span className="absolute -inset-2 rounded-full animate-ping bg-indigo-400/30" />

      <span className="relative inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-xl border border-slate-200">
        <span className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 grid place-items-center text-white shadow">
          <Instagram className="h-5 w-5" />
        </span>
        <span className="hidden sm:block">
          <span className="block text-sm font-semibold leading-tight">DM on Instagram</span>
          <span className="block text-[11px] text-slate-600 leading-tight">@{handle} • Free</span>
        </span>
        <MessageCircle className="h-5 w-5 text-slate-700 sm:hidden" />
      </span>
    </a>
  )
}
