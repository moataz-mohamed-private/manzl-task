import { Genre, Network, ProductionCompany } from "./tmdbApi";

export interface Content {
  id: string;
  adult: boolean;
  backdropPath: string;
  genreIds: string[];
  originalLanguage: string;
  overview: string;
  popularity: number;
  posterPath: string;
  voteAverage: number;
  voteCount: number;
  name: string;
  mediaType: string;
  tmdbId: number;
}

export interface Movie extends Content {
  contentId: number;
  video: boolean;
  releaseDate: string;
  productionCompanies: ProductionCompany[];
  genres: Genre[];
}

export interface Show extends Content {
  contentId: number;
  originCountry: string;
  networks: Network[];
  numberOfSeasons: number;
  firstAirDate: string;
}

export type ContentType = "movie" | "show";
