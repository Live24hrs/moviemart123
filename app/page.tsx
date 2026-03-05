import { getFeaturedMovies } from "@/lib/movies";
import Hero from "@/components/Hero";
import MovieRail from "@/components/MovieRail";
import AdBanner from "@/components/AdBanner";
import NativeBanner from "@/components/ads/NativeBanner";

export default async function Home() {
  const items = await getFeaturedMovies();

  return (
    <div className="space-y-10">
      <Hero />

      {/* ✅ Banner under Hero */}
      <div className="flex justify-center">
        <AdBanner />
      </div>

      {/* ✅ Native ad for better fill */}
      <NativeBanner />

      <MovieRail title="Featured Movies" movies={items} />

      {/* ✅ Another banner between sections */}
      <div className="flex justify-center">
        <AdBanner />
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold">How it works</h3>
        <p className="mt-2 text-slate-600">
          Browse movies, open details, then DM us on Instagram using the auto-generated message.
          This is currently <span className="font-semibold">FREE</span> — just send the DM and we’ll guide you.
        </p>
      </div>
    </div>
  );
}
