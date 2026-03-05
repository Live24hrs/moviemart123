import MovieCard from './MovieCard'
import type { Movie } from '@/lib/apple'

export default function MovieRail({ title, movies }: { title: string; movies: Movie[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="text-sm text-slate-600">{movies.length} items</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </section>
  )
}
