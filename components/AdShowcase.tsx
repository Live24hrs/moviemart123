'use client'

import { motion } from 'framer-motion'
import AdsterraSlot from '@/components/ads/AdsterraSlot'

function Box({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="card overflow-hidden border-dashed"
    >
      <div className="p-4">
        <div className="text-xs font-semibold tracking-wide text-slate-500">AD SLOT</div>
        <div className="mt-1 font-semibold">{title}</div>
        <div className="text-sm text-slate-600 mt-1">{subtitle}</div>
      </div>
      <div className="h-16 bg-gradient-to-r from-slate-100 via-white to-slate-100 animate-pulse" />
    </motion.div>
  )
}

function VideoBox({ title }: { title: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="card overflow-hidden border-dashed"
    >
      <div className="p-4">
        <div className="text-xs font-semibold tracking-wide text-slate-500">VIDEO AD SLOT</div>
        <div className="mt-1 font-semibold">{title}</div>
        <div className="text-sm text-slate-600 mt-1">Drop your video ad embed here later.</div>
      </div>
      <div className="relative aspect-video bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 grid place-items-center text-white/70 text-sm">Preview</div>
      </div>
    </motion.div>
  )
}

export default function AdShowcase() {
  const d1 = process.env.NEXT_PUBLIC_ADSTERRA_DISPLAY_1 || ''
  const d2 = process.env.NEXT_PUBLIC_ADSTERRA_DISPLAY_2 || ''
  const v1 = process.env.NEXT_PUBLIC_ADSTERRA_VIDEO_1 || ''
  const v2 = process.env.NEXT_PUBLIC_ADSTERRA_VIDEO_2 || ''

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Ad Showcase</h3>
        <span className="text-xs text-slate-500">
          {d1 || d2 || v1 || v2 ? '(Live ads)' : '(Demo placeholders — add keys to enable)'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {d1 ? (
          <div className="card p-4">
            <AdsterraSlot adKey={d1} width={728} height={90} label="Display Ad #1 (728×90)" />
          </div>
        ) : (
          <Box title="Display Ad #1" subtitle="Set NEXT_PUBLIC_ADSTERRA_DISPLAY_1" />
        )}

        {d2 ? (
          <div className="card p-4">
            <AdsterraSlot adKey={d2} width={300} height={250} label="Display Ad #2 (300×250)" />
          </div>
        ) : (
          <Box title="Display Ad #2" subtitle="Set NEXT_PUBLIC_ADSTERRA_DISPLAY_2" />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {v1 ? (
          <div className="card p-4">
            <AdsterraSlot adKey={v1} width={300} height={250} label="Video Ad #1 (slot)" />
            <div className="mt-2 text-xs text-slate-500">
              If this unit is a VAST/video type from Adsterra, it will render here.
            </div>
          </div>
        ) : (
          <VideoBox title="Video Ad #1" />
        )}

        {v2 ? (
          <div className="card p-4">
            <AdsterraSlot adKey={v2} width={300} height={250} label="Video Ad #2 (slot)" />
            <div className="mt-2 text-xs text-slate-500">
              If this unit is a VAST/video type from Adsterra, it will render here.
            </div>
          </div>
        ) : (
          <VideoBox title="Video Ad #2" />
        )}
      </div>
    </section>
  )
}
