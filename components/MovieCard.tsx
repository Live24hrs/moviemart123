'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Movie } from '@/lib/apple'
import { Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }} className="w-48 flex-shrink-0">
      <Link href={`/movie/${movie.id}`} className="block card overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative aspect-[2/3] bg-slate-100">
          {movie.artwork ? (
            <Image src={movie.artwork} alt={movie.title} fill className="object-cover" sizes="192px" />
          ) : null}
          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
            <div className="text-white text-xs flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {movie.releaseDate ? formatDate(movie.releaseDate) : (movie.year || '')}
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="font-semibold text-sm line-clamp-2">{movie.title}</div>
          {movie.creator && <div className="text-xs text-slate-600 mt-1 line-clamp-1">{movie.creator}</div>}
        </div>
      </Link>
    </motion.div>
  )
}
