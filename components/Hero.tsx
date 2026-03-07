'use client'

import SearchBar from './SearchBar'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="relative overflow-hidden card bg-gradient-to-br from-white via-indigo-50 to-fuchsia-50 p-8 sm:p-12">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-200 blur-3xl opacity-60" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-200 blur-3xl opacity-60" />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative">
        <div className="inline-flex items-center gap-2 chip">
          <Sparkles className="h-4 w-4" />
          Quick search • Download flow
        </div>

        <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight">
          Find any movie fast — <span className="bg-gradient-to-r from-indigo-700 to-fuchsia-700 bg-clip-text text-transparent">open details & download</span>.
        </h1>
        <p className="mt-4 text-slate-600 max-w-2xl">
          Search the catalog, open details, then use the download section to continue.
        </p>

        <div className="mt-7 max-w-xl">
          <SearchBar />
        </div>
      </motion.div>
    </div>
  )
}
