import { getFeaturedMovies } from "@/lib/movies";
import Hero from "@/components/Hero";
import MovieRail from "@/components/MovieRail";
import AdShowcase from "@/components/AdShowcase";
import AdBanner from "@/components/AdBanner";

export default async function Home() {
  const items = await getFeaturedMovies();

  return (
    <div className="space-y-10">
      <Hero />

      {/* ✅ Ad under Hero */}
      <div className="flex justify-center">
        <AdBanner />
      </div>

      <MovieRail title="Featured Movies" movies={items} />

      {/* ✅ Ad between sections */}
      <div className="flex justify-center">
        <AdBanner />
      </div>

      <AdShowcase />

      {/* ✅ Another ad near bottom (optional) */}
      <div className="flex justify-center">
        <AdBanner />
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold">How buying works</h3>
        <p className="mt-2 text-slate-600">
          Browse and pick a plan (₹39/₹59/₹89). Then DM us on Instagram with the auto-generated message.
          Our team confirms availability and shares next steps.
        </p>
      </div>
    </div>
  );
}
