'use client'

import { useEffect, useId, useRef, useState } from 'react'

type Props = {
  adKey: string
  width: number
  height: number
  format?: 'iframe' | 'banner'
  className?: string
  label?: string
}

/**
 * Adsterra slot for Next.js App Router.
 * Uses a global injection queue so multiple slots don't clobber `window.atOptions`.
 */
export default function AdsterraSlot({
  adKey,
  width,
  height,
  format = 'iframe',
  className,
  label = 'Advertisement',
}: Props) {
  const id = useId()
  const mounted = useRef(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!adKey) return
    const el = document.getElementById(id)
    if (!el) return

    // clear on remount / fast refresh
    el.innerHTML = ''
    setReady(false)

    // Create (or reuse) a global queue so atOptions doesn't race between slots.
    const w = window as any
    if (!w.__adsterraQueue) w.__adsterraQueue = Promise.resolve()

    w.__adsterraQueue = w.__adsterraQueue.then(
      () =>
        new Promise<void>((resolve) => {
          // Set required global object right before loading invoke.js
          w.atOptions = {
            key: adKey,
            format,
            height,
            width,
            params: {},
          }

          const invoke = document.createElement('script')
          invoke.type = 'text/javascript'
          invoke.async = true
          invoke.src = `//www.topcreativeformat.com/${adKey}/invoke.js`

          invoke.onload = () => {
            setReady(true)
            resolve()
          }
          invoke.onerror = () => {
            // still resolve so other slots can continue
            resolve()
          }

          el.appendChild(invoke)

          // Fallback resolve in case onload doesn't fire
          setTimeout(() => resolve(), 2000)
        })
    )

    return () => {
      const el2 = document.getElementById(id)
      if (el2) el2.innerHTML = ''
    }
  }, [adKey, width, height, format, id])

  return (
    <div className={className}>
      <div className="mb-2 text-[11px] font-semibold tracking-wide text-slate-500">{label}</div>
      <div
        id={id}
        style={{ width, height }}
        className="grid place-items-center overflow-hidden rounded-xl border border-black/10 bg-white/40"
      >
        {!ready && <span className="text-xs text-slate-500">Loading ad…</span>}
      </div>
    </div>
  )
}
