import { db } from "~/server/db";
import { ContentType } from "~/types/localApi";
import { getMovieById, getShowById } from "~/services/tmdb";
import { content, movies, shows } from "~/server/db/schema";

export const AddOrRetrieveContent = async (
  tmdbId: number,
  type: ContentType,
) => {
  const duplicatesFound = await db.query.content.findMany({
    where: (content, { eq }) => eq(content.tmdbId, tmdbId),
  });

  let contentId = -1;

  //Not in DB yet
  if (duplicatesFound.length === 0) {
    if (type === "movie") {
      const movieTMDB = await getMovieById(tmdbId);
      const dbObject = {
        adult: movieTMDB.adult,
        backdropPath: movieTMDB.backdrop_path,
        genreIds: movieTMDB.genres.map((g) => g.id),
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
          .returning({ contentId: content.id });

        contentId = result[0]?.contentId as number;

        await db.insert(movies).values({
          contentId: contentId,
          video: movieTMDB.video,
          releaseDate: new Date(movieTMDB.release_date),
        });
      });
    }
    if (type === "show") {
      const showTMDB = await getShowById(tmdbId);
      const dbObject = {
        adult: showTMDB.adult,
        backdropPath: showTMDB.backdrop_path,
        genreIds: showTMDB.genres.map((g) => g.id),
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
          .returning({ contentId: content.id });

        contentId = result[0]?.contentId as number;

        await db.insert(shows).values({
          contentId: contentId,
          originCountry: showTMDB.origin_country,
          firstAirDate: new Date(showTMDB.first_air_date),
        });
      });
    }
  } else {
    contentId = duplicatesFound[0] ? duplicatesFound[0].id : -1;
  }

  if (contentId === -1) {
    throw Error("AddOrRetrieveContent CRITICAL FAILURE");
  }

  return contentId;
};