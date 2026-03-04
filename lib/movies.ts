import type { Movie } from './apple'
import {
  searchUnified,
  lookupMovieMultiStore,
  fromITunes,
  fetchWikipediaSummaryByTitle,
  fetchWikipediaMovie,
} from './apple'
import { tmdbSearchMovies, tmdbPopular, tmdbMovieDetails } from './tmdb'

// Simple in-memory cache (dev + single server). For Vercel multi-region you’d use Redis.
const cache = new Map<string, { t: number; v: any }>()
const TTL = 30 * 60 * 1000

/**
 * Optional disk cache hook.
 * In earlier iterations we experimented with writing cache to disk.
 * That caused runtime errors when this module was bundled for the browser.
 * Keep it as a safe no-op so the app never crashes.
 */
function writeFileCache(_k: string, _v: any) {
  // no-op
}

function getCache<T>(k: string): T | null {
  const hit = cache.get(k)
  if (!hit) return null
  if (Date.now() - hit.t > TTL) {
    cache.delete(k)
    return null
  }
  return hit.v as T
}

function setCache(k: string, v: any) {
  cache.set(k, { t: Date.now(), v })
  writeFileCache(k, v)
}

function isNumericId(id: string) {
  return /^[0-9]+$/.test(id)
}

export async function getFeaturedMovies(): Promise<Movie[]> {
  const cached = getCache<Movie[]>('featured')
  if (cached) return cached

  // Try TMDB first (fast + best coverage). If network blocks/timeout, fallback to iTunes/Wikipedia.
  const tmdb = await tmdbPopular(50).catch(() => null)
  if (tmdb && tmdb.length) {
    setCache('featured', tmdb)
    return tmdb
  }

  // Fallback: iTunes+wiki unified search on a few broad terms
  const fallbackTerms = ['popular movie', 'top movie', 'movie']
  for (const t of fallbackTerms) {
    const items = await searchUnified(t, 'us', 30).catch(() => [])
    if (items.length) {
      setCache('featured', items)
      return items
    }
  }

  return []
}

export async function searchMoviesSmart(query: string): Promise<Movie[]> {
  const q = String(query || '').trim()
  if (!q) return []

  const key = `search:${q.toLowerCase()}`
  const cached = getCache<Movie[]>(key)
  if (cached) return cached

  // 1) TMDB (if key present). If blocked, it returns null and we fall back.
  const tmdb = await tmdbSearchMovies(q, 36).catch(() => null)
  if (tmdb && tmdb.length) {
    setCache(key, tmdb)
    return tmdb
  }

  // 2) iTunes + Wikipedia
  const fb = await searchUnified(q, 'us', 30).catch(() => [])
  setCache(key, fb)
  return fb
}

export async function getMovieByIdSmart(
  idRaw: string
): Promise<{ movie: Movie; brief?: string; link?: string } | null> {
  const id = String(idRaw || '').trim()
  if (!id) return null

  // A) Wikipedia routes
  if (id.startsWith('wiki_')) {
    const wikiMovie = await fetchWikipediaMovie(id).catch(() => null)
    const movie =
      wikiMovie || { id, title: decodeURIComponent(id.slice(5)), source: 'wikipedia' as const }
    return { movie, brief: movie.description, link: movie.wikiUrl }
  }

  // B) TMDB routes
  if (id.startsWith('tmdb_')) {
    const tmdb = await tmdbMovieDetails(id).catch(() => null)
    if (tmdb) {
      // Ensure spoiler-safe brief via wikipedia only if overview is tiny
      let brief = tmdb.description
      if (!brief || brief.trim().length < 80) {
        const w = await fetchWikipediaSummaryByTitle(tmdb.title).catch(() => null)
        if (w?.description) brief = w.description
      }
      return { movie: tmdb, brief }
    }
    // TMDB blocked/timeout: fallback to Wikipedia title in the id (we don't have title), so return null.
    return null
  }

  // C) Numeric: iTunes lookup (multi-store), wiki fallback for brief
  if (isNumericId(id)) {
    const data = await lookupMovieMultiStore(id).catch(() => null)
    const raw = data?.results?.[0]
    const movie = raw ? fromITunes(raw) : ({ id, title: 'Movie' } as Movie)

    let brief = movie.description
    if (!brief || String(brief).replace(/<[^>]*>/g, '').trim().length < 80) {
      const w = await fetchWikipediaSummaryByTitle(movie.title).catch(() => null)
      if (w?.description) brief = w.description
    }

    return { movie, brief, link: movie.storeUrl }
  }

  // D) Non-numeric slug -> Wikipedia title
  const wiki = await fetchWikipediaSummaryByTitle(decodeURIComponent(id)).catch(() => null)
  const movie =
    wiki || { id: `wiki_${encodeURIComponent(id)}`, title: decodeURIComponent(id), source: 'wikipedia' as const }
  return { movie, brief: movie.description, link: movie.wikiUrl }
}
