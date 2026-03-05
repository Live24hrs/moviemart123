'use client'

import { Instagram, Copy } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function InstagramCTA({ movieTitle }: { movieTitle: string }) {
  const handle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'your_handle'
  const profile = `https://www.instagram.com/${handle}/`
  const msg = useMemo(() => {
    return `Hi, I want "${movieTitle}". Please send me the FREE access/details and next steps.`
  }, [movieTitle])

  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(msg)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {}
  }

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <a className="btn-primary" href={profile} target="_blank" rel="noopener noreferrer">
        <Instagram className="h-5 w-5" /> Open Instagram
      </a>
      <button className="btn-soft" onClick={copy}>
        <Copy className="h-5 w-5" /> {copied ? 'Copied!' : 'Copy DM message'}
      </button>
      <div className="sm:col-span-2 text-xs text-slate-600">
        Paste the copied text into your DM to <span className="font-mono">@{handle}</span>.
      </div>
    </div>
  )
}
