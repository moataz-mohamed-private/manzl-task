import { getMovies } from "~/services/tmdb";
import Button from "./_components/button";
import ContentCard from "./_components/GenericCard";
import { getTmdbImg } from "~/utils/helpers";

export default async function HomePage() {
  const movies = await getMovies({ page: "1" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="grid grid-cols-5 gap-4 w-full p-3">
        {movies.data.results.map((res) => (
          <ContentCard
            src={getTmdbImg(res.poster_path)}
            title={res.title}
            description={res.overview}
            date={res.release_date}
          />
        ))}
      </div>
    </main>
  );
}
