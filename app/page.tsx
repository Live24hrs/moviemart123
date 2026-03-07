import { getFeaturedMovies } from "@/lib/movies";
import Hero from "@/components/Hero";
import MovieRail from "@/components/MovieRail";
import AdBanner from "@/components/AdBanner";
import NativeBanner from "@/components/ads/NativeBanner";
import Banner300x250 from "@/components/ads/Banner300x250";
import Banner468x60 from "@/components/ads/Banner468x60";
import SmartLinksRail from "@/components/ads/SmartLinksRail";

export default async function Home() {
  const items = await getFeaturedMovies();

  const trending = items.slice(0, 18);
  const topPicks = items.slice(18, 36);
  const classics = items.slice(36, 50);

  return (
    <div className="space-y-10">
      <Hero />

      {/* ✅ Banner under Hero */}
      <div className="flex justify-center">
        <AdBanner />
      </div>

      {/* ✅ Native ad for better fill */}
      <NativeBanner />

      <div className="hidden sm:flex justify-center">
        <Banner468x60 />
      </div>

      <MovieRail title="Trending Now" movies={trending} />

      <div className="flex justify-center">
        <Banner300x250 />
      </div>

      <MovieRail title="Top Picks" movies={topPicks} />

      <SmartLinksRail />

      {/* ✅ Another banner between sections */}
      <div className="flex justify-center">
        <AdBanner />
      </div>

      <MovieRail title="Classics & More" movies={classics.length ? classics : items.slice(0, 18)} />

      <NativeBanner />

      <div className="card p-6">
        <h3 className="text-lg font-semibold">How it works</h3>
        <p className="mt-2 text-slate-600">
          Browse movies, open details, then use the download section on the movie page to continue.
        </p>
      </div>
    </div>
  );
}
