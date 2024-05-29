import { getFavoritedContent } from "~/server/queries/favorites";
import { getTmdbImg } from "~/utils/helpers";
import FavCard from "../_components/favCard";

export const dynamic = "force-dynamic";

export default async function MyList() {
  const myList = await getFavoritedContent();

  return (
    <div className="mt-5 grid w-full gap-5 bg-black sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      {myList?.map((res) => (
        <FavCard
          popularity={res.content.popularity as string}
          movies={res.movies as any}
          shows={res.shows as any}
          src={getTmdbImg(res.content.backdropPath)}
          title={res.content.name}
          description={res.content.overview as string}
          date={res.content.mediaType}
          tmdbId={res.content.tmdbId}
        />
      ))}
    </div>
  );
}
