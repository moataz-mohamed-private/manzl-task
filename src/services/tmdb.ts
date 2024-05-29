"use server";
import { createAuthRequest } from "~/utils/apiUtils/authRequest";
import {
  ETMDBMoviesFilterParams,
  Genre,
  MovieTMDB,
  MovieTMDBDetails,
  showTMDB,
  showTMDBDetails,
} from "~/types/tmdbApi";
import { PaginatedResponse } from "~/types/common";

export const getMovies = async (searchParams: {
  [key in ETMDBMoviesFilterParams]?: string;
}) => {
  return createAuthRequest(
    process.env.TMBD_API_BASE_URL as string,
    process.env.TMBD_API_TOKEN,
  ).get<PaginatedResponse<MovieTMDB>>(`/discover/movie?include_adult=false`, {
    params: {
      ...searchParams,
    },
  });
};

export const getShows = async (searchParams: {
  [key in ETMDBMoviesFilterParams]?: string;
}) => {
  return createAuthRequest(
    process.env.TMBD_API_BASE_URL as string,
    process.env.TMBD_API_TOKEN,
  ).get<PaginatedResponse<showTMDB>>(`/discover/tv?include_adult=false`, {
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

  const { data } = await authRequest.get<MovieTMDBDetails>(`/movie/${movieId}`);

  return data;
};

export const getShowById = async (showId: number) => {
  const authRequest = createAuthRequest(
    process.env.TMBD_API_BASE_URL as string,
    process.env.TMBD_API_TOKEN,
  );

  const { data } = await authRequest.get<showTMDBDetails>(`/tv/${showId}`);

  return data;
};
