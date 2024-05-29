import Image from "next/image";
import { dynamicBlurDataUrl, getFormatedDate } from "~/utils/helpers";
import { Badge } from "~/components/ui/badge";
import { FavoriteButton } from "~/app/_components/favoriteButton";
import { ContentType } from "~/types/contentApi";

interface ContentCard {
  src: string;
  title: string;
  description?: string;
  date: string;
  tmdbId: number;
  favorited: boolean;
  type: ContentType;
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
  type,
}: ContentCard) => {
  const blurimageUrl = await dynamicBlurDataUrl(src);
  return (
    <div className="relative grid h-96 place-items-center overflow-hidden rounded-xl brightness-150">
      <FavoriteButton
        favorited={favorited}
        tmdbId={tmdbId}
        key={tmdbId}
        type={type}
      />
      <div className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-lg p-5 shadow-lg shadow-black/30 transition">
        <Image
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="isolate space-y-2">
          <div className="flex items-center space-x-2 text-xs text-gray-200">
            <time>{getFormatedDate(date)}</time>
            <span>∙</span>
            <figure className="flex items-center space-x-1">
              <figcaption className="flex">
                {" "}
                {genres.map(
                  (genre, i) =>
                    i <= 1 && (
                      <div>
                        <Badge className="m-1 truncate rounded-xl bg-white text-black">
                          {genre}
                        </Badge>
                      </div>
                    ),
                )}
              </figcaption>
            </figure>
          </div>
          <h2 className="text-sm font-bold text-white">{title}</h2>
        </div>
      </div>
    </div>
  );
};
export default ContentCard;
