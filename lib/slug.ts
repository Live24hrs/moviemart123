/**
 * Convert a movie title into a URL-safe slug:
 * - lowercase
 * - remove punctuation (including colons)
 * - spaces -> single dashes
 */
export function slugifyTitle(title: string) {
  return String(title || '')
    .toLowerCase()
    .replace(/:/g, '')
    .replace(/['"`]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
