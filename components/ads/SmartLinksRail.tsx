import { ExternalLink } from 'lucide-react'

const SMART_LINKS = [
  'https://heavinessslight.com/p16nd14n9?key=8ebbe92d52f93a8ad76119ae3152eae5',
  'https://heavinessslight.com/miw2rcyup?key=d790b3b344362b3384996be022169f28',
  'https://heavinessslight.com/mnxzsjkmy?key=a487d67c9411aeb52527a0b785b29314',
]

export default function SmartLinksRail() {
  return (
    <div className="card p-4 sm:p-5">
      <div className="text-xs font-semibold tracking-wide text-slate-500">Download More Movies 👇</div>
      <h3 className="mt-1 text-lg font-semibold">Movies For Free 💹</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {SMART_LINKS.map((href, idx) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-xs font-semibold text-slate-500">Click Here to UNLOCK Step- {idx + 1}</div>
            <div className="mt-1 flex items-center justify-between gap-3 font-semibold text-slate-900">
              <span>More Movies For Free 👇</span>
              <ExternalLink className="h-4 w-4 text-slate-500" />
            </div>
            <div className="mt-2 text-xs text-slate-500 break-all">{href}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
