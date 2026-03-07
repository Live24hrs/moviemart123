export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-600 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <div>© {new Date().getFullYear()} MovieMart Lite</div>
        <div>Discovery + download flow</div>
      </div>
    </footer>
  )
}
