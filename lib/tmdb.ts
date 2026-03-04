import type { Movie } from './apple'

const TMDB_BASE = 'https://api.themoviedb.org/3'

function fetchWithTimeout(url: string, init: RequestInit, timeoutMs=2200) {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), timeoutMs)
  return fetch(url, { ...init, signal: controller.signal }).finally(() => clearTimeout(t))
}

const TMDB_IMG = 'https://image.tmdb.org/t/p/'

type TmdbMovie = {
  id: number
  title?: string
  name?: string
  overview?: string
  release_date?: string
  first_air_date?: string
  poster_path?: string | null
  backdrop_path?: string | null
  vote_average?: number
  vote_count?: number
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchJsonWithRetry(url: string, tries = 2, timeoutMs = 10_000): Promise<any | null> {
  let lastErr: any = null
  for (let i = 0; i <= tries; i++) {
    const ac = new AbortController()
    const t = setTimeout(() => ac.abort(), timeoutMs)
    try {
      const res = await fetchWithTimeout(url, {
        cache: 'no-store',
        signal: ac.signal,
        headers: {
          accept: 'application/json',
        },
      })
      clearTimeout(t)
      if (!res.ok) {
        lastErr = res.status
        // retry only on 429 / 5xx
        if (res.status === 429 || (res.status >= 500 && res.status <= 599)) {
          await sleep(250 * (i + 1))
          continue
        }
        return null
      }
      return await res.json()
    } catch (e) {
      clearTimeout(t)
      lastErr = e
      await sleep(250 * (i + 1))
    }
  }
  return null
}

function tmdbKey() {
  const k = process.env.TMDB_API_KEY
  return (k || '').trim() || null
}

export function tmdbPoster(path?: string | null, size: 'w500' | 'w780' | 'original' = 'w780') {
  if (!path) return undefined
  return `${TMDB_IMG}${size}${path}`
}

export function toMovieFromTMDB(m: TmdbMovie): Movie {
  const title = (m.title || m.name || 'Untitled').trim()
  const rd = m.release_date || m.first_air_date
  return {
    id: `tmdb_${m.id}`,
    title,
    releaseDate: rd,
    year: rd ? String(new Date(rd).getFullYear()) : undefined,
    artwork: tmdbPoster(m.poster_path, 'w780'),
    description: m.overview || undefined,
    averageUserRating: typeof m.vote_average === 'number' ? m.vote_average : undefined,
    userRatingCount: typeof m.vote_count === 'number' ? m.vote_count : undefined,
    source: 'itunes', // keep type compatibility; UI only checks fields
  }
}

export async function tmdbSearchMovies(query: string, limit = 30): Promise<Movie[] | null> {
  const key = tmdbKey()
  if (!key) return null
  const q = query.trim()
  if (!q) return []

  const url = new URL(`${TMDB_BASE}/search/movie`)
  url.searchParams.set('api_key', key)
  url.searchParams.set('query', q)
  url.searchParams.set('include_adult', 'false')
  url.searchParams.set('language', 'en-US')
  url.searchParams.set('page', '1')

  const data = await fetchJsonWithRetry(url.toString(), 2, 10_000)
  if (!data?.results) return null

  const results = (data.results as TmdbMovie[])
    .filter((x) => x && typeof x.id === 'number')
    .slice(0, limit)
    .map(toMovieFromTMDB)

  return results
}

export async function tmdbPopular(limit = 40): Promise<Movie[] | null> {
  const key = tmdbKey()
  if (!key) return null
  const url = new URL(`${TMDB_BASE}/movie/popular`)
  url.searchParams.set('api_key', key)
  url.searchParams.set('language', 'en-US')
  url.searchParams.set('page', '1')
  const data = await fetchJsonWithRetry(url.toString(), 2, 10_000)
  if (!data?.results) return null
  return (data.results as TmdbMovie[]).slice(0, limit).map(toMovieFromTMDB)
}

export async function tmdbMovieDetails(tmdbId: string): Promise<Movie | null> {
  const key = tmdbKey()
  if (!key) return null
  const id = String(tmdbId).replace(/^tmdb_/, '')
  if (!/^[0-9]+$/.test(id)) return null
  const url = new URL(`${TMDB_BASE}/movie/${id}`)
  url.searchParams.set('api_key', key)
  url.searchParams.set('language', 'en-US')
  const data = await fetchJsonWithRetry(url.toString(), 2, 10_000)
  if (!data?.id) return null
  return toMovieFromTMDB(data as TmdbMovie)
}
