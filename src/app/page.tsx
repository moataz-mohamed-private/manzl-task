import { getMovies } from "~/services/tmdb";
import ContentCard from "./_components/GenericCard";
import { getTmdbImg } from "~/utils/helpers";
import { getFavoritedContent, getFavorites } from "~/server/queries/favorites";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DropDown } from "~/app/_components/button";

export default async function HomePage({ searchParams  } : {searchParams : any}) {
  let { page } = searchParams;
  page = page ? page : "1";

  const movies = await getMovies({ page: page });

  const favorites = await getFavorites();
  const favContent = await getFavoritedContent();
  console.log(favContent);
  const favsMap = new Map(favorites.map((obj) => [obj.tmdbId, obj.tmdbId]));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <form
        action={async (event) => {
          "use server";

          event.get("page");
          redirect(`/?page=${page}`);
        }}
      >
        <input name={"page"} />
        <button type="submit" className="bg-white">
          submit
        </button>
      </form>

      <DropDown />
      <Link className="bg-white" href={"/?page=1"}>
        1-href
      </Link>
      <Link className={"bg-white"} href={"/?page=2"}>
        2-href
      </Link>
      <div className="grid w-full grid-cols-5 gap-4 p-3">
        {movies.data.results.map((res) => (
          <ContentCard
            src={getTmdbImg(res.poster_path)}
            title={res.title}
            description={res.overview}
            date={res.release_date}
            tmdbId={res.id}
            favorited={!!favsMap.get(res.id)}
          />
        ))}
      </div>
    </main>
  );
}