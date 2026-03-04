// Apple / iTunes + Wikipedia helpers
// Goal: zero-crash, fast timeouts (India friendly), no duplicate exports.

export type MovieSource = 'itunes' | 'wikipedia' | 'tmdb'

export type Movie = {
  id: string
  title: string

  // basic info
  year?: string
  releaseDate?: string
  runtime?: number
  runtimeMinutes?: number

  // description
  description?: string
  overview?: string

  // media
  poster?: string
  artwork?: string
  backdrop?: string

  // ratings
  rating?: number
  votes?: number
  imdbRating?: number
  imdbVotes?: number

  // classification
  genres?: string[]
  contentRating?: string

  // source
  source?: MovieSource

  // store links
  storeUrl?: string

  // wikipedia
  wikiTitle?: string
  wikiUrl?: string

  // misc fields some APIs return
  language?: string
  country?: string
  popularity?: number
}

const ITUNES_SEARCH = 'https://itunes.apple.com/search'
const ITUNES_LOOKUP = 'https://itunes.apple.com/lookup'

const WIKI_SUMMARY = 'https://en.wikipedia.org/api/rest_v1/page/summary'
const WIKI_API = 'https://en.wikipedia.org/w/api.php'

// Try multiple iTunes storefronts (helps when one region returns 0)
const DEFAULT_STORES = ['us', 'in', 'gb', 'ca', 'au']

function safeTrim(s: any) {
  return String(s ?? '').trim()
}

function isNumericId(id: string) {
  return /^[0-9]+$/.test(String(id || ''))
}

export function isValidTrackId(id: string) {
  return isNumericId(String(id || ''))
}

function stripHtml(input?: string) {
  const s = String(input || '')
  return s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function spoilerFreeText(input?: string, maxChars = 520) {
  const txt = stripHtml(input)
  if (!txt) return ''
  const cut = txt.slice(0, maxChars)
  // end on a sentence if possible
  const m = cut.match(/^(.*?[.!?])\s/)
  return (m?.[1] || cut).trim()
}

async function fetchJsonWithTimeout(url: string, timeoutMs = 3500, retries = 1, headers?: Record<string, string>) {
  let lastErr: any = null
  for (let i = 0; i <= retries; i++) {
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        cache: 'no-store',
        headers: {
          accept: 'application/json',
          // A simple UA helps certain endpoints/proxies
          'user-agent': 'MovieMart/1.0',
          ...(headers || {}),
        },
      })
      clearTimeout(t)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (e) {
      clearTimeout(t)
      lastErr = e
      // tiny backoff
      if (i < retries) await new Promise((r) => setTimeout(r, 150 * (i + 1)))
    }
  }
  throw lastErr
}

// ---------------- iTunes mapping ----------------
export function fromITunes(r: any): Movie {
  const title = safeTrim(r?.trackName || r?.collectionName || r?.trackCensoredName)
  const release = safeTrim(r?.releaseDate)
  const year = release ? String(release).slice(0, 4) : undefined
  const desc = spoilerFreeText(r?.longDescription || r?.shortDescription || r?.description)

  const art =
    safeTrim(r?.artworkUrl100) ||
    safeTrim(r?.artworkUrl60) ||
    safeTrim(r?.artworkUrl30) ||
    ''

  // iTunes artwork can be upgraded by replacing size
  const artwork = art ? art.replace(/\d+x\d+bb/, '600x600bb') : undefined

  return {
    id: String(r?.trackId || r?.collectionId || ''),
    title: title || 'Movie',
    year,
    description: desc || undefined,
    artwork,
    source: 'itunes',
    storeUrl: safeTrim(r?.trackViewUrl || r?.collectionViewUrl) || undefined,
    genres: Array.isArray(r?.genreIds)
      ? undefined
      : Array.isArray(r?.genres)
        ? r.genres
        : safeTrim(r?.primaryGenreName)
          ? [safeTrim(r.primaryGenreName)]
          : undefined,
    runtime: typeof r?.trackTimeMillis === 'number' ? Math.round(r.trackTimeMillis / 60000) : undefined,
  }
}

async function itunesSearchOnce(term: string, country: string, limit: number, entity?: string) {
  const url = new URL(ITUNES_SEARCH)
  url.searchParams.set('term', safeTrim(term))
  url.searchParams.set('media', 'movie')
  if (entity) url.searchParams.set('entity', entity)
  url.searchParams.set('country', country)
  url.searchParams.set('limit', String(limit))
  // use small timeouts; iTunes is usually quick
  return await fetchJsonWithTimeout(url.toString(), 3500, 1)
}

async function itunesLookupOnce(trackId: string, country: string) {
  const url = new URL(ITUNES_LOOKUP)
  url.searchParams.set('id', trackId)
  url.searchParams.set('country', country)
  return await fetchJsonWithTimeout(url.toString(), 3500, 1)
}

export async function searchMovies(term: string, country = 'us', limit = 25) {
  // Compatibility export: single attempt
  return (await itunesSearchOnce(term, country, limit, 'movie').catch(() => null)) ?? { results: [] }
}

export async function lookupMovie(trackId: string, country = 'us') {
  if (!isNumericId(String(trackId))) return { results: [] }
  return (await itunesLookupOnce(String(trackId), country).catch(() => null)) ?? { results: [] }
}

export async function lookupMovieMultiStore(trackId: string, stores = DEFAULT_STORES) {
  if (!isNumericId(String(trackId))) return null
  for (const c of stores) {
    const data = await itunesLookupOnce(String(trackId), c).catch(() => null)
    if (data?.results?.length) return data
  }
  return null
}

export async function fetchTopMovies(country = 'us', limit = 50) {
  // Home page fallback rail (best-effort)
  const terms = ['popular movie', 'top movie', 'movie']
  for (const t of terms) {
    const r = await itunesSearchOnce(t, country, limit, 'movie').catch(() => null)
    if (r?.results?.length) return r
  }
  return { results: [] }
}

// ---------------- Wikipedia (no key) ----------------
function wikiId(title: string) {
  return `wiki_${encodeURIComponent(title)}`
}

export async function fetchWikipediaSummaryByTitle(title: string): Promise<Movie | null> {
  const t = safeTrim(title)
  if (!t) return null

  // Try “Title (film)” first for better accuracy
  const candidates = [`${t} (film)`, t]

  for (const cand of candidates) {
    // REST summary
    const restUrl = `${WIKI_SUMMARY}/${encodeURIComponent(cand)}`
    const s1 = await fetchJsonWithTimeout(restUrl, 3500, 1).catch(() => null)
    if (s1 && (s1.extract || s1.thumbnail?.source || s1.originalimage?.source)) {
      const desc = spoilerFreeText(s1.extract, 520)
      const thumb = s1.originalimage?.source || s1.thumbnail?.source
      const url = s1.content_urls?.desktop?.page
      const year = (() => {
        const m = String(desc || '').match(/\b(19\d{2}|20\d{2})\b/)
        return m?.[1]
      })()
      return {
        id: wikiId(s1.title || cand),
        title: s1.title || cand,
        description: desc || undefined,
        artwork: thumb || undefined,
        year: year || undefined,
        source: 'wikipedia',
        wikiTitle: s1.title || cand,
        wikiUrl: url || undefined,
      }
    }

    // MediaWiki fallback (extracts + pageimages)
    const url = new URL(WIKI_API)
    url.searchParams.set('action', 'query')
    url.searchParams.set('format', 'json')
    url.searchParams.set('formatversion', '2')
    url.searchParams.set('redirects', '1')
    url.searchParams.set('prop', 'extracts|pageimages|info')
    url.searchParams.set('inprop', 'url')
    url.searchParams.set('exintro', '1')
    url.searchParams.set('explaintext', '1')
    url.searchParams.set('piprop', 'thumbnail|original')
    url.searchParams.set('pithumbsize', '800')
    url.searchParams.set('titles', cand)
    // CORS is irrelevant on server, but fine.
    url.searchParams.set('origin', '*')

    const s2 = await fetchJsonWithTimeout(url.toString(), 3500, 1).catch(() => null)
    const page = s2?.query?.pages?.[0]
    if (page?.title && !page?.missing && (page?.extract || page?.thumbnail?.source || page?.original?.source)) {
      const desc = spoilerFreeText(page.extract, 520)
      const thumb = page.original?.source || page.thumbnail?.source
      const full = page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(String(page.title).replace(/\s+/g, '_'))}`
      const year = (() => {
        const m = String(desc || '').match(/\b(19\d{2}|20\d{2})\b/)
        return m?.[1]
      })()
      return {
        id: wikiId(page.title),
        title: page.title,
        description: desc || undefined,
        artwork: thumb || undefined,
        year: year || undefined,
        source: 'wikipedia',
        wikiTitle: page.title,
        wikiUrl: full,
      }
    }
  }

  // Last resort: opensearch to find a close title
  const os = new URL(WIKI_API)
  os.searchParams.set('action', 'opensearch')
  os.searchParams.set('search', t)
  os.searchParams.set('limit', '1')
  os.searchParams.set('namespace', '0')
  os.searchParams.set('format', 'json')
  os.searchParams.set('origin', '*')
  const osData = await fetchJsonWithTimeout(os.toString(), 3500, 1).catch(() => null)
  const firstTitle = osData?.[1]?.[0]
  if (firstTitle) return fetchWikipediaSummaryByTitle(firstTitle)

  return null
}

export async function fetchWikipediaMovie(id: string): Promise<Movie | null> {
  if (!id?.startsWith('wiki_')) return null
  const title = decodeURIComponent(id.slice(5))
  return fetchWikipediaSummaryByTitle(title)
}

export async function searchWikipedia(term: string, limit = 8): Promise<Movie[]> {
  const q = safeTrim(term)
  if (!q) return []

  // Opensearch gives fast title suggestions
  const url = new URL(WIKI_API)
  url.searchParams.set('action', 'opensearch')
  url.searchParams.set('search', q)
  url.searchParams.set('limit', String(limit))
  url.searchParams.set('namespace', '0')
  url.searchParams.set('format', 'json')
  url.searchParams.set('origin', '*')

  const data = await fetchJsonWithTimeout(url.toString(), 3500, 1).catch(() => null)
  const titles: string[] = data?.[1] || []
  if (!titles.length) return []

  // fetch summaries (parallel) and keep only valid ones
  const settled = await Promise.allSettled(titles.slice(0, limit).map((t) => fetchWikipediaSummaryByTitle(t)))
  const out: Movie[] = []
  for (const r of settled) {
    if (r.status === 'fulfilled' && r.value?.title) out.push(r.value)
  }
  return out
}

// ---------------- Unified search (iTunes -> Wikipedia supplement) ----------------
export async function searchUnified(term: string, country = 'us', limit = 30): Promise<Movie[]> {
  const q = safeTrim(term)
  if (!q) return []

  // 1) Try iTunes across stores + entity fallbacks
  const stores = [country, ...DEFAULT_STORES.filter((x) => x !== country)]
  const entities = ['movie', 'feature-movie', undefined] as (string | undefined)[]

  let best: any = null
  for (const c of stores) {
    for (const e of entities) {
      const r = await itunesSearchOnce(q, c, limit, e).catch(() => null)
      if (r?.results?.length) {
        best = r
        break
      }
    }
    if (best?.results?.length) break
  }

  const itMovies: Movie[] = best?.results?.map(fromITunes).filter((m: Movie) => m.id && m.title) ?? []

  // If good enough, return
  if (itMovies.length >= Math.min(10, limit)) return itMovies

  // 2) Supplement via Wikipedia
  const wiki = await searchWikipedia(q, Math.min(10, Math.max(3, limit - itMovies.length))).catch(() => [])
  const seen = new Set(itMovies.map((m) => (m.title || '').toLowerCase()))

  const merged: Movie[] = [...itMovies]
  for (const w of wiki) {
    const key = (w.title || '').toLowerCase()
    if (!seen.has(key)) {
      merged.push(w)
      seen.add(key)
    }
  }

  return merged
}
