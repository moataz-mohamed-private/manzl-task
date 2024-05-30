import Image from "next/image";
import { Movie, Show } from "~/types/contentApi";
import { dynamicBlurDataUrl, getTmdbImg } from "~/utils/helpers";
import { deleteFavorite } from "~/server/queries/favorites";

interface favCard {
  src: string;
  title: string;
  description?: string;
  mediaType: string;
  movies: Movie | null;
  shows: Show | null;
  popularity: string;
  tmdbId: number;
}

export async function FavCard({
  src,
  title,
  description,
  mediaType,
  movies,
  shows,
  popularity,
  tmdbId,
}: favCard) {
  const getProductionOrNetwork = () => {
    if (movies) {
      return movies.productionCompanies?.map((company) => (
        <div className="flex">
          <Image
            unoptimized
            src={getTmdbImg(company.logo_path)}
            alt="company"
            width={25}
            height={20}
            objectFit="cover"
          />
          <div className="text-sm">{company.name}</div>
        </div>
      ));
    }
    if (shows) {
      return shows.networks?.map((network) => (
        <div className="flex">
          <Image
            unoptimized
            src={getTmdbImg(network.logo_path)}
            alt="company"
            width={25}
            height={20}
            objectFit="cover"
          />
          <div className="text-sm">{network.name}</div>
        </div>
      ));
    }
  };
  const blurimageUrl = await dynamicBlurDataUrl(src);
  return (
    <div className="rounded-md bg-slate-50/[.1] shadow-lg">
      <div className="max-w-4xl px-4 leading-none md:flex">
        <div className="flex-none">
          <div className="h-72 w-56 -translate-y-2 transform rounded-md border-4 border-gray-300 shadow-2xl shadow-lg">
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
        </div>

        <div className="flex-col text-gray-300">
          <p className="pl-1 pt-4 text-2xl font-bold">
            {title} {`(${mediaType})`}
          </p>
          <hr className="hr-text" data-content="" />
          <div className="text-md my-2 flex justify-around px-4">
            {getProductionOrNetwork()}

            <span className="font-bold"></span>
          </div>
          <p className="my-4 hidden px-4 text-left text-sm md:block">
            {description}
          </p>

          <p className="text-md my-2 flex px-4">
            Rating: {(parseFloat(popularity).toFixed(0) as any) / 100}
          </p>

          <div className="text-xs">
            <form
              action={async () => {
                "use server";
                await deleteFavorite(tmdbId);
              }}
            >
              <button
                type="submit"
                className="ease focus:shadow-outline m-2 select-none rounded-md border border-gray-400 px-4 py-2 text-gray-400 transition duration-500 hover:bg-gray-900 focus:outline-none"
              >
                Delete From My List
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavCard;
