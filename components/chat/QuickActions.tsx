'use client'

export default function QuickActions({ onAction }: { onAction: (t: string) => void }) {
  const actions = [
    'Suggest a plan for Interstellar',
    'Bargain ₹59 (student discount)',
    'Bargain ₹39 (first time)',
    'Bundle 3 movies: Interstellar, Inception, Tenet',
    'Create DM template for "Your Movie" on ₹89',
  ]
  return (
    <div className="px-4 pb-2 flex flex-wrap gap-2">
      {actions.map((a) => (
        <button key={a} onClick={() => onAction(a)} className="chip hover:bg-white transition">
          {a}
        </button>
      ))}
    </div>
  )
}
