export default function LoadingSearch() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="h-8 w-40 rounded bg-slate-200 animate-pulse" />
          <div className="mt-3 h-4 w-72 rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="w-full sm:w-[420px]">
          <div className="h-[52px] rounded-full bg-slate-200 animate-pulse" />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-[320px] h-[50px] rounded bg-slate-200 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="aspect-[2/3] bg-slate-200 animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-5/6 rounded bg-slate-200 animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-slate-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
