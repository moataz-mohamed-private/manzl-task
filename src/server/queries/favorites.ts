"server only";
import { AddOrRetrieveContent } from "~/services/content";
import { db } from "~/server/db";
import { content, favorites, movies } from "~/server/db/schema";
import { ContentType } from "~/types/content";
import { eq } from "drizzle-orm";

export const AddToFavorites = async (tmdbId: number, type: ContentType) => {
  "use server";
  try {
    const contentId = await AddOrRetrieveContent(tmdbId, type as ContentType);
    await db.insert(favorites).values({ contentId: contentId, tmdbId: tmdbId });
  } catch (e) {
    console.log(e);
  }
};

export const RemoveFromFavorites = async (tmdbId: number) => {
  "use server";
  try {
    await db.delete(favorites).where(eq(favorites.tmdbId, tmdbId));
  } catch (e) {
    console.log(e);
  }
};

export const getFavorites = async () => {
  "use server";
  return db.select().from(favorites);
};

export const getFavoritedContent = async () => {
  "use server";
  return db
    .select()
    .from(favorites)
    .innerJoin(content, eq(favorites.tmdbId, content.tmdbId));
};

export const getFavoritedMovies = async () => {
  "use server";
  return db
    .select()
    .from(favorites)
    .innerJoin(content, eq(favorites.tmdbId, content.tmdbId))
    .innerJoin(movies, eq(movies.contentId, content.id));
};