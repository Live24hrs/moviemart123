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

/**
 * “Rewarded” gate helper.
 * Opens SmartLink and increments a per-session counter.
 * Returns current progress and whether the gate is unlocked.
 */
export function openSmartLinkGate(storageKey: string, requiredOpens = 2) {
  if (typeof window === 'undefined') {
    return { unlocked: false, opens: 0, required: requiredOpens }
  }

  let opens = 0
  try {
    const raw = sessionStorage.getItem(storageKey)
    opens = raw ? Math.max(0, parseInt(raw, 10) || 0) : 0
  } catch {
    // ignore
  }

  // Open SmartLink on every user click until unlocked.
  try {
    window.open(SMARTLINK_URL, '_blank', 'noopener,noreferrer')
  } catch {
    // ignore popup errors
  }

  opens = opens + 1
  try {
    sessionStorage.setItem(storageKey, String(opens))
  } catch {
    // ignore
  }

  return { unlocked: opens >= requiredOpens, opens, required: requiredOpens }
}
