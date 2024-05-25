import { createAuthRequest } from "~/utils/apiUtils/authRequest";
import { Movie} from "~/types/localApi";
import {  MovieTMDB, showTMDB } from "~/types/tmdbApi";
import { PaginatedResponse } from "~/types/common";

export const getMovies = async ({
  queryString,
  page,
  includeAdult,
  language,
  primary_release_year,
  region,
  year,
}: {
  queryString?: string;
  page?: string;
  includeAdult?: boolean;
  language?: string;
  primary_release_year?: string;
  region?: string;
  year?: string;
}) => {
  return createAuthRequest(
    process.env.TMBD_API_BASE_URL as string,
    process.env.TMBD_API_TOKEN,
  ).get<PaginatedResponse<MovieTMDB>>(
    `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
  );
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