import { getMovies, getMoviesGenre } from "~/services/tmdb";
import ContentCard from "./_components/GenericCard";
import { getTmdbImg, parseGenreToFilterOptions } from "~/utils/helpers";
import { getFavoritedContent, getFavorites } from "~/server/queries/favorites";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DropDown } from "~/app/_components/button";
import Filters from "./_components/filtersTabs";
import { MultiSelect } from "./_components/multiSelectDropDown";
import { ETMDBMoviesFilterParams, Genre } from "~/types/tmdbApi";

export default async function HomePage({
  searchParams,
}: {
  searchParams: any;
}) {
  let { page } = searchParams;

  page = page ? page : "1";

  const movies = await getMovies({ page: page }, searchParams);

  const favorites = await getFavorites();
  const favContent = await getFavoritedContent();
  const genres = await getMoviesGenre()
  const filterOptions = parseGenreToFilterOptions(genres.data)
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
      <Filters>
        <MultiSelect
          filterOptions={filterOptions}
          filterParam={ETMDBMoviesFilterParams.with_genres}
          selectionPlaceHolder={'Select Genre'}
        />
      </Filters>
      <div className="grid w-full gap-4 p-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
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
