'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function PopUnder() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Limit popunder to once per browser session (reduces bounce rate).
    try {
      const k = 'mm_popunder_loaded'
      if (sessionStorage.getItem(k) === '1') return
      sessionStorage.setItem(k, '1')
      setEnabled(true)
    } catch {
      // If sessionStorage is blocked, still enable.
      setEnabled(true)
    }
  }, [])

  if (!enabled) return null
  return (
    <Script
      src="https://pl28844493.effectivegatecpm.com/f5/94/64/f594644711285eccc310caa181b34543.js"
      strategy="afterInteractive"
    />
  )
}
