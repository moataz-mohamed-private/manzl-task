import Image from "next/image";
import { getFormatedDate } from "~/utils/helpers";
import {
  AddToFavorites,
  RemoveFromFavorites,
} from "~/server/queries/favorites";
import { redirect } from "next/navigation";
import { FavoriteButton } from "~/components/ui/favoriteButton";

interface ContentCard {
  src: string;
  title: string;
  description?: string;
  date: string;
  tmdbId: number;
  favorited: boolean;
}

const ContentCard = async ({
  src,
  title,
  description,
  date,
  tmdbId,
  favorited,
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

      <div className="relative h-5/6 w-full">
        <Image
          src={src}
          layout="fill"
          objectFit="fill"
          alt="content"
          style={{ aspectRatio: "13/24" }}
        />
      </div>
      <div className="h-1/6 w-full bg-card p-1 text-white">
        <div>{title}</div>
        <div>{getFormatedDate(date)}</div>
      </div>
    </div>
  );
};
export default ContentCard;