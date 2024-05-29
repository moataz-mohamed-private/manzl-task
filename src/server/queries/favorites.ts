import { AddOrRetrieveContent } from "~/server/queries/content";
import { db } from "~/server/db";
import { content, favorites, movies, shows } from "~/server/db/schema";
import { ContentType } from "~/types/contentApi";
import { eq, ilike } from "drizzle-orm";
import { redirect } from "next/navigation";

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

export const deleteFavorite = async (tmdbId: number) => {
  try {
    await db.delete(favorites).where(eq(favorites.tmdbId, tmdbId));
  } catch (e) {
    console.log(e);
  }
  redirect("/myList");
};

export const getFavorites = async () => {
  let data;
  try {
    data = await db.select().from(favorites);
  } catch (e) {
    console.log(e);
  }
  return data;
};

export const getFavoritedContent = async (searchString?: string) => {
  let data;
  try {
    data = await db
      .select()
      .from(favorites)
      .innerJoin(content, eq(favorites.tmdbId, content.tmdbId))
      .leftJoin(movies, eq(movies.contentId, content.id))
      .leftJoin(shows, eq(shows.contentId, content.id))
      .where(searchString ? ilike(content.name, searchString) : undefined);
  } catch (e) {
    console.log(e);
  }
  return data;
};

export const getFavoritedMovies = async (searchString?: string) => {
  let data;
  try {
    data = await db
      .select()
      .from(favorites)
      .innerJoin(content, eq(favorites.tmdbId, content.tmdbId))
      .innerJoin(movies, eq(movies.contentId, content.id))
      .where(searchString ? ilike(content.name, searchString) : undefined);
  } catch (e) {
    console.log(e);
  }
  return data;
};

export const getFavoritedShows = async (searchString?: string) => {
  let data;
  try {
    data = await db
      .select()
      .from(favorites)
      .innerJoin(content, eq(favorites.tmdbId, content.tmdbId))
      .innerJoin(shows, eq(shows.contentId, content.id))
      .where(searchString ? ilike(content.name, searchString) : undefined);
  } catch (e) {
    console.log(e);
  }
  return data;
};
