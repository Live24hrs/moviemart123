'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-slate-600">{error.message}</p>
      <button className="btn-primary mt-6" onClick={reset}>Try again</button>
    </div>
  )
}
