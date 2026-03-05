import type { Movie } from '@/lib/apple'
import MovieCard from './MovieCard'

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
    </div>
  )
}
