export const SMARTLINK_URL =
  'https://www.effectivegatecpm.com/u1j3m4ij1h?key=66dc0297daf020a461856873384d61ac'

/**
 * Opens Adsterra SmartLink in a new tab/window.
 * Must be called from a direct user gesture (click/tap) to avoid popup blocking.
 */
export function openSmartLinkOncePerSession() {
  if (typeof window === 'undefined') return
  try {
    const k = 'mm_smartlink_opened'
    if (sessionStorage.getItem(k) === '1') return
    sessionStorage.setItem(k, '1')
  } catch {
    // ignore storage errors
  }
  try {
    window.open(SMARTLINK_URL, '_blank', 'noopener,noreferrer')
  } catch {
    // ignore popup errors
  }
}
