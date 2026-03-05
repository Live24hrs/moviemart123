import Image from 'next/image'
import { getMovieByIdSmart } from '@/lib/movies'
import { formatDate } from '@/lib/utils'
import PricePlans from '@/components/PricePlans'
import { ExternalLink } from 'lucide-react'

export default async function MoviePage({ params }: { params: { id: string } }) {
  const id = String(params?.id || '').trim()

  const resolved = await getMovieByIdSmart(id)
  const movie = resolved?.movie
  if (!movie) {
    return (
      <div className="card p-10 text-center text-slate-600">
        Movie not found. Try searching again.
      </div>
    )
  }

  const brief = resolved?.brief
  const external = resolved?.link

  // Wikipedia-only route display (same UI style)
  if (String(movie.id).startsWith('wiki_') || movie.source === 'wikipedia') {

    return (
      <div className="space-y-8">
        <div className="card p-6 sm:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[260px]">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-slate-100 border">
                {movie.artwork ? (
                  <Image src={movie.artwork} alt={movie.title} fill className="object-cover" priority />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-slate-400 text-sm">No poster</div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold">{movie.title}</h1>
                  <p className="mt-2 text-slate-600">{movie.year ? `${movie.year}` : ''}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="chip">Wikipedia</span>
                  </div>
                </div>

                {external && (
                  <a className="btn-soft" href={external} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" /> View on Wikipedia
                  </a>
                )}
              </div>

              {(
                <div className="mt-6 prose prose-slate max-w-none">
                  <p>{brief || movie.description || 'No description found yet. Try opening Wikipedia link or search a different title.'}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <PricePlans movieTitle={movie.title} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[260px]">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-slate-100 border">
              {movie.artwork ? (
                  <Image src={movie.artwork} alt={movie.title} fill className="object-cover" priority />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-slate-400 text-sm">No poster</div>
                )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold">{movie.title}</h1>
                <p className="mt-2 text-slate-600">
                  {movie.year ? `${movie.year} • ` : ''}
                  {movie.releaseDate ? formatDate(movie.releaseDate) : ''}
                  {movie.runtimeMinutes ? ` • ${movie.runtimeMinutes} min` : ''}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {movie.contentRating && <span className="chip">{movie.contentRating}</span>}
                  {(movie.genres || []).slice(0, 4).map((g) => (
                    <span key={g} className="chip">
                      {g}
                    </span>
                  ))}
                  {typeof movie.averageUserRating === 'number' && (
                    <span className="chip">★ {movie.averageUserRating.toFixed(1)}</span>
                  )}
                </div>
              </div>

              {external && (
                <a className="btn-soft" href={external} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" /> View source
                </a>
              )}
            </div>

            {(brief || movie.description) && (
              <div className="mt-6 prose prose-slate max-w-none">
                {/* iTunes descriptions are sometimes HTML */}
                <p dangerouslySetInnerHTML={{ __html: (brief || movie.description) as string }} />
              </div>
            )}
          </div>
        </div>
      </div>

      <PricePlans movieTitle={movie.title} />
    </div>
  )
}
