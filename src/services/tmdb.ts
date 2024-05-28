import { createAuthRequest } from "~/utils/apiUtils/authRequest";
import { Genre, MovieTMDB, showTMDB } from "~/types/tmdbApi";
import { PaginatedResponse } from "~/types/common";

export const getMovies = async (
  // {
  //   queryString,
  //   page,
  //   includeAdult,
  //   language,
  //   primary_release_year,
  //   region,
  //   year,
  // }: {
  //   queryString?: string;
  //   page?: string;
  //   includeAdult?: boolean;
  //   language?: string;
  //   primary_release_year?: string;
  //   region?: string;
  //   year?: string;
  // },
  searchParams: any,
) => {
  "use server";

  return createAuthRequest(
    process.env.TMBD_API_BASE_URL as string,
    process.env.TMBD_API_TOKEN,
  ).get<PaginatedResponse<MovieTMDB>>(`/discover/movie?include_adult=false`, {
    params: {
      ...searchParams,
    },
  });
};

export const getMoviesGenre = async () => {
  return createAuthRequest(
    process.env.TMBD_API_BASE_URL as string,
    process.env.TMBD_API_TOKEN,
  ).get<{ genres: Genre[] }>("/genre/movie/list");
};

export const getMovieById = async (movieId: number) => {
  const authRequest = createAuthRequest(
    process.env.TMBD_API_BASE_URL as string,
    process.env.TMBD_API_TOKEN,
  );

  const { data } = await authRequest.get<MovieTMDB>(`/movie/${movieId}`);

  return data;
};

export const getShowById = async (showId: number) => {
  const authRequest = createAuthRequest(
    process.env.TMBD_API_BASE_URL as string,
    process.env.TMBD_API_TOKEN,
  );

  const { data } = await authRequest.get<showTMDB>(`/tv/${showId}`);

  return data;
};
