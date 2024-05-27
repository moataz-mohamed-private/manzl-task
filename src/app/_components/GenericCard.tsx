import Image from "next/image";
import { getFormatedDate } from "~/utils/helpers";
import {
  AddToFavorites,
  RemoveFromFavorites,
} from "~/server/queries/favorites";
import { redirect } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { FavoriteButton } from "~/components/ui/favoriteButton";

interface ContentCard {
  src: string;
  title: string;
  description?: string;
  date: string;
  tmdbId: number;
  favorited: boolean;
  genres: string[] | [];
}

const ContentCard = async ({
  src,
  title,
  description,
  date,
  tmdbId,
  favorited,
  genres,
}: ContentCard) => {
  return (
    <div className="relative h-96 overflow-hidden rounded-xl">
      <form
        action={async () => {
          "use server";
          if (favorited) {
            await RemoveFromFavorites(tmdbId);
          } else {
            await AddToFavorites(tmdbId, "movie");
          }
          redirect("/");
        }}
        method="POST"
      >
        <FavoriteButton favorited={favorited} />
      </form>

      <div className="relative h-4/5 w-full">
        <Image
          src={src}
          layout="fill"
          objectFit="fill"
          alt="content"
          style={{ aspectRatio: "13/24" }}
        />
      </div>
      <div className="h-1/5 w-full bg-card  p-1 text-sm text-white">
        <div>
          <div className="truncate font-sans">{title}</div>
          <div className="pl-1 font-mono text-xs">{getFormatedDate(date)}</div>
        </div>
        <div className="align-center col-span-2 flex justify-end">
          {genres.map(
            (genre, i) =>
              i <= 2 && (
                <div>
                  <Badge className="m-1 truncate rounded-xl bg-white text-black">
                    {genre}
                  </Badge>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
};
export default ContentCard;
