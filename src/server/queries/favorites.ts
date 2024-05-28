"use server";
import { AddOrRetrieveContent } from "~/services/content";
import { db } from "~/server/db";
import { content, favorites, movies, shows } from "~/server/db/schema";
import { ContentType } from "~/types/content";
import { eq, ilike } from "drizzle-orm";

export const AddToFavorites = async (tmdbId: number, type: ContentType) => {
  try {
    const contentId = await AddOrRetrieveContent(tmdbId, type as ContentType);
    await db.insert(favorites).values({ contentId: contentId, tmdbId: tmdbId });
  } catch (e) {
    console.log(e);
  }
};

export const updateFavorites = async (
  currentState: boolean,
  tmdbId: number,
  type: ContentType,
) => {
  if (currentState) {
    try {
      const contentId = await AddOrRetrieveContent(tmdbId, type);
      await db
        .insert(favorites)
        .values({ contentId: contentId, tmdbId: tmdbId });
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      await db.delete(favorites).where(eq(favorites.tmdbId, tmdbId));
    } catch (e) {
      console.log(e);
    }
  }
};

export const getFavorites = async () => {
  "use server";
  let data;
  try {
    data = db.select().from(favorites);
  } catch (e) {
    console.log(e);
  }
  return data;
};

export const getFavoritedContent = async (searchString?: string) => {
  return db
    .select()
    .from(favorites)
    .innerJoin(content, eq(favorites.tmdbId, content.tmdbId))
    .innerJoin(movies, eq(movies.contentId, content.id))
    .where(searchString ? ilike(content.name, searchString) : undefined);
};

export const getFavoritedMovies = async (searchString?: string) => {
  return db
    .select()
    .from(favorites)
    .innerJoin(content, eq(favorites.tmdbId, content.tmdbId))
    .innerJoin(movies, eq(movies.contentId, content.id))
    .where(searchString ? ilike(content.name, searchString) : undefined);
};

export const getFavoritedShows = async (searchString?: string) => {
  return db
    .select()
    .from(favorites)
    .innerJoin(content, eq(favorites.tmdbId, content.tmdbId))
    .innerJoin(shows, eq(shows.contentId, content.id))
    .where(searchString ? ilike(content.name, searchString) : undefined);
};
