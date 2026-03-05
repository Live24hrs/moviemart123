import type { Movie } from '@/lib/apple'
import MovieCard from './MovieCard'
import Banner300x250 from '@/components/ads/Banner300x250'

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  const withAds: Array<{ type: 'movie'; movie: Movie } | { type: 'ad'; key: string }> = []

  movies.forEach((m, idx) => {
    withAds.push({ type: 'movie', movie: m })
    // Insert an ad block after every 8 items
    if ((idx + 1) % 8 === 0) withAds.push({ type: 'ad', key: `ad-${idx}` })
  })

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {withAds.map((item) => {
        if (item.type === 'movie') return <MovieCard key={item.movie.id} movie={item.movie} />
        return (
          <div
            key={item.key}
            className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 flex justify-center"
          >
            <div className="card p-4">
              <Banner300x250 />
              <div className="mt-2 text-[11px] text-center text-slate-500">Advertisement</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
