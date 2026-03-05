'use client'

import { motion } from 'framer-motion'

export default function LiveDecor() {
  // Lightweight animated background blobs + floating sparkles (no external assets)
  const dots = Array.from({ length: 14 }).map((_, i) => i)

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* soft moving blobs */}
      <motion.div
        className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-200/50 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-fuchsia-200/50 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, -16, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl"
        animate={{ y: [0, 22, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* floating sparkles */}
      {dots.map((i) => {
        const left = (i * 7) % 100
        const top = (i * 11) % 100
        const size = 6 + (i % 6)
        const dur = 6 + (i % 6)
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/60 shadow-sm"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            animate={{ y: [0, -18, 0], opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
          />
        )
      })}
    </div>
  )
}
