import { searchMoviesSmart } from '@/lib/movies'
import SearchBar from '@/components/SearchBar'
import MovieGrid from '@/components/MovieGrid'
import AdBanner from '@/components/AdBanner'
import NativeBanner from '@/components/ads/NativeBanner'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const sp = await searchParams
  const q = (sp?.q || '').trim()

  const movies = q ? await searchMoviesSmart(q) : []

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Search</h1>
          <p className="text-slate-600">Search online catalog (TMDB → fallback iTunes/Wikipedia).</p>
        </div>
        <div className="w-full sm:w-[420px]">
          <SearchBar initialValue={q} />
        </div>
      </div>

      {q && (
        <p className="text-sm text-slate-600">
          Results for <span className="font-semibold">“{q}”</span>: {movies.length}
        </p>
      )}

      {/* Force-refresh ad when query changes (client-side navigation) */}
      {q && (
        <div className="flex justify-center">
          <AdBanner key={`search-320x50-${q}`} />
        </div>
      )}

      {movies.length ? (
        <div className="space-y-8">
          <MovieGrid movies={movies} />

          {/* Native fill after results */}
          <NativeBanner key={`search-native-${q}`} />
        </div>
      ) : (
        q ? (
          <div className="card p-10 text-center text-slate-600">
            No results. Try another keyword (example: full movie title).
          </div>
        ) : (
          <div className="card p-10 text-center text-slate-600">Type something in the search box.</div>
        )
      )}
    </div>
  )
}
