"use server";
import { AddOrRetrieveContent } from "~/services/content";
import { db } from "~/server/db";
import { content, favorites, movies, shows } from "~/server/db/schema";
import { ContentType } from "~/types/contentApi";
import { eq, ilike } from "drizzle-orm";
import { Content } from "~/types/contentApi";
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

export const deletFavorites = async (tmdbId: number) => {
  try {
    await db.delete(favorites).where(eq(favorites.tmdbId, tmdbId));
  } catch (e) {
    console.log(e);
  }
  redirect("/myList");
};

export const getFavorites = async () => {
  "use server";

  try {
    return db.select().from(favorites);
  } catch (e) {
    console.log(e);
  }
};

export const getFavoritedContent = async (searchString?: string) => {
  try {
    // return;
    const data = await db
      .select()
      .from(favorites)
      .innerJoin(content, eq(favorites.tmdbId, content.tmdbId))
      .leftJoin(movies, eq(movies.contentId, content.id))
      .leftJoin(shows, eq(shows.contentId, content.id))
      .where(searchString ? ilike(content.name, searchString) : undefined);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
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
