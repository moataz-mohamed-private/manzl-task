import { getMoviesGenre, getShows } from "~/services/tmdb";
import ContentCard from "../_components/GenericCard";
import { getTmdbImg, parseGenreToFilterOptions } from "~/utils/helpers";
import { getFavorites } from "~/server/queries/favorites";
import Filters from "../_components/filtersTabs";
import { MultiSelect } from "../_components/multiSelectDropDown";
import { ETMDBMoviesFilterParams } from "~/types/tmdbApi";
import { DropdownSelection } from "../_components/dropDownSelect";
import { sortingFilterOptions } from "~/utils/staticData";
import { PaginationComp } from "../_components/paginationSelect";

export default async function ShowsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const moviesResp = await getShows(searchParams);
  const favorites = await getFavorites();
  const favsMap = new Map(favorites?.map((obj) => [obj.tmdbId, obj.tmdbId]));
  const genresResp = await getMoviesGenre();
  const generesFilterOptions = parseGenreToFilterOptions(genresResp.data);
  const genersMap = new Map(
    genresResp.data.genres.map((obj) => [obj.id, obj.name]),
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-background">
      <Filters>
        <div className="flex">
          <MultiSelect
            filterOptions={generesFilterOptions}
            filterParam={ETMDBMoviesFilterParams.with_genres}
            selectionPlaceHolder={"Select Genre"}
            selectedFilters={searchParams[ETMDBMoviesFilterParams.with_genres]}
          />
          <DropdownSelection
            filterOptions={sortingFilterOptions}
            filterParam={ETMDBMoviesFilterParams.sort_by}
            selectionPlaceHolder={"Sorting Options"}
            selectedFilters={searchParams[ETMDBMoviesFilterParams.sort_by]}
          />
        </div>
        <PaginationComp
          totalPages={moviesResp.data.total_pages}
          currentPage={moviesResp.data.page}
        />
      </Filters>
      <div className="grid w-full gap-4 p-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {moviesResp.data.results.map((res) => (
          <ContentCard
            type={"show"}
            src={getTmdbImg(res.poster_path)}
            title={res.name}
            description={res.overview}
            date={res.first_air_date}
            tmdbId={res.id}
            favorited={!!favsMap.get(res.id)}
            genres={res.genre_ids.map((id) => genersMap.get(id) || "")}
            key={res.id}
          />
        ))}
      </div>
    </main>
  );
}
