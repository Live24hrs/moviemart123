export function cleanMovieTitle(title: string) {
  const stopWords = new Set([
    'movie',
    'film',
    'official',
    'trailer',
    'teaser',
    'watch',
    'online',
    'download',
    'hd',
    'full',
    '1080p',
    '720p',
    '480p',
    'bluray',
    'brrip',
    'webrip',
    'hdrip',
    'dvdrip',
    'dual',
    'audio'
  ])

  return String(title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !stopWords.has(word))
    .join(' ')
    .trim()
}

export function buildGoogleSiteQuery(title: string, siteName: string) {
  const cleanedTitle = cleanMovieTitle(title)
  const cleanedSite = String(siteName || '')
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, 'www.')
    .replace(/\/$/, '')

  if (!cleanedTitle) return ''
  if (!cleanedSite) return cleanedTitle

  return `${cleanedTitle} site:${cleanedSite}`
}
