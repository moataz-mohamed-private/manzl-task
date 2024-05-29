import { sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
  json,
} from "drizzle-orm/pg-core";
import { Genre, Network, ProductionCompany } from "~/types/tmdbApi";

// import { createSchema, table, column } from 'drizzle-orm';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `manzl-task_${name}`);

export const content = createTable("content", {
  id: serial("id").primaryKey(),
  adult: boolean("adult").notNull(),
  backdropPath: varchar("backdrop_path", { length: 255 }).notNull(),
  genreIds: integer("genre_ids").array(),
  originalLanguage: varchar("original_language", { length: 255 }).notNull(),
  overview: text("overview"),
  popularity: decimal("popularity"),
  posterPath: varchar("poster_path", { length: 255 }),
  voteAverage: decimal("vote_average"),
  voteCount: integer("vote_count"),
  name: varchar("name", { length: 255 }).notNull(),
  mediaType: varchar("media_type", { length: 255 }).notNull(),
  tmdbId: integer("tmdb_id").unique().notNull(),
});

// Define the movies table
export const movies = createTable("movies", {
  id: serial("id").primaryKey(),
  contentId: integer("content_id")
    .references(() => content.id)
    .unique()
    .notNull(),
  productionCompanies: json("production_companies")
    .$type<ProductionCompany>()
    .array(),
  genres: json("genres").$type<Genre>().array(),
  video: boolean("video"),
  releaseDate: timestamp("release_date", { mode: "date" }),
});

// Define the shows table
export const shows = createTable("shows", {
  id: serial("id").primaryKey(),
  contentId: integer("content_id")
    .references(() => content.id)
    .unique()
    .notNull(),
  networks: json("networks").$type<Network>().array(),
  numberOfSeasons: integer("number_of_seasons"),
  originCountry: varchar("origin_country", { length: 255 }).array().notNull(),
  firstAirDate: timestamp("first_air_date", { mode: "date" }).notNull(),
});

export const favorites = createTable("favorites", {
  id: serial("id").primaryKey(),
  contentId: integer("content_id")
    .references(() => content.id)
    .notNull(),
  tmdbId: integer("tmdb_id").unique().notNull(),
});

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});
