import Image from "next/image";
import { dynamicBlurDataUrl, getFormatedDate } from "~/utils/helpers";
// import {
//   AddToFavorites,
//   RemoveFromFavorites,
// } from "~/server/queries/favorites";
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
  const blurimageUrl = await dynamicBlurDataUrl(src);
  return (
    <div className="relative h-96 overflow-hidden rounded-xl">
      <FavoriteButton favorited={favorited} tmdbId={tmdbId} key={tmdbId} />
      <div className="relative h-4/5 w-full">
        <Image
          unoptimized
          key={src}
          src={src}
          quality={70}
          blurDataURL={blurimageUrl}
          placeholder="blur"
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 23vw"
          alt="content"
          style={{ width: "100%" }}
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
