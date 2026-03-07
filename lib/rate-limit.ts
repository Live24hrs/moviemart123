export function rateLimit({ interval, max }: { interval: number; max: number }) {
  const store = new Map<string, { count: number; reset: number }>()
  return {
    check: async (key: string) => {
      const now = Date.now()
      const rec = store.get(key)
      if (!rec || now > rec.reset) {
        store.set(key, { count: 1, reset: now + interval })
        return
      }
      if (rec.count < max) {
        rec.count += 1
        return
      }
      throw new Error('Rate limit exceeded')
    },
  }
}
