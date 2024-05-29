import { db } from "~/server/db";
import { ContentType } from "~/types/contentApi";
import { getMovieById, getShowById } from "~/services/tmdb";
import { content, movies, shows } from "~/server/db/schema";

export const AddOrRetrieveContent = async (
  tmdbId: number,
  type: ContentType,
) => {
  let contentId = -1;

  if (type === "movie") {
    const movieTMDB = await getMovieById(tmdbId);
    const dbObject = {
      adult: movieTMDB.adult,
      backdropPath: movieTMDB.poster_path,
      originalLanguage: movieTMDB.original_language,
      overview: movieTMDB.overview,
      popularity: movieTMDB.popularity.toString(),
      posterPath: movieTMDB.poster_path,
      voteAverage: movieTMDB.vote_average.toString(),
      voteCount: movieTMDB.vote_count,
      tmdbId: movieTMDB.id,
    };

    await db.transaction(async (tx) => {
      const result = await db
        .insert(content)
        .values({ ...dbObject, name: movieTMDB.title, mediaType: "movie" })
        .onConflictDoUpdate({
          target: content.tmdbId,
          set: { ...dbObject, name: movieTMDB.title, mediaType: "movie" },
        })
        .returning({ contentId: content.id });

      contentId = result[0]?.contentId as number;

      await db
        .insert(movies)
        .values({
          contentId: contentId,
          productionCompanies: movieTMDB.production_companies,
          genres: movieTMDB.genres,
          video: movieTMDB.video,
          releaseDate: new Date(movieTMDB.release_date),
        })
        .onConflictDoUpdate({
          target: movies.id,
          set: {
            contentId: contentId,
            productionCompanies: movieTMDB.production_companies,
            genres: movieTMDB.genres,
            video: movieTMDB.video,
            releaseDate: new Date(movieTMDB.release_date),
          },
        });

      return contentId;
    });
  }
  if (type === "show") {
    const showTMDB = await getShowById(tmdbId);
    const dbObject = {
      adult: showTMDB.adult,
      backdropPath: showTMDB.backdrop_path,
      originalLanguage: showTMDB.original_language,
      overview: showTMDB.overview,
      popularity: showTMDB.popularity.toString(),
      posterPath: showTMDB.poster_path,
      voteAverage: showTMDB.vote_average.toString(),
      voteCount: showTMDB.vote_count,
      tmdbId: showTMDB.id,
    };

    await db.transaction(async (tx) => {
      const result = await db
        .insert(content)
        .values({ ...dbObject, name: showTMDB.name, mediaType: "show" })
        .onConflictDoUpdate({
          target: content.tmdbId,
          set: { ...dbObject, name: showTMDB.name, mediaType: "show" },
        })
        .returning({ contentId: content.id });

      contentId = result[0]?.contentId as number;

      await db
        .insert(shows)
        .values({
          contentId: contentId,
          networks: showTMDB.networks,
          numberOfSeasons: showTMDB.number_of_seasons,
          originCountry: showTMDB.origin_country,
          firstAirDate: new Date(showTMDB.first_air_date),
        })
        .onConflictDoUpdate({
          target: shows.id,
          set: {
            contentId: contentId,
            networks: showTMDB.networks,
            numberOfSeasons: showTMDB.number_of_seasons,
            originCountry: showTMDB.origin_country,
            firstAirDate: new Date(showTMDB.first_air_date),
          },
        });
    });
  }

  if (contentId === -1) {
    throw Error("AddOrRetrieveContent CRITICAL FAILURE");
  }

  return contentId;
};
