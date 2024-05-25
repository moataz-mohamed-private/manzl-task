
import { getMoviesLocalService , addToFav} from "~/services/local";
import Button from "./_components/button";
import ContentCard from "./_components/GenericCard";

export default async function HomePage() {

  const movies = await getMoviesLocalService(1);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
        {
          movies.results.map((res) => 
          <ContentCard src={res.backdropPath} title={res.name} />
        }
    </main>
  );
}
