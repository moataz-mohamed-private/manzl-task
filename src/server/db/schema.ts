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

// Create schema
// export const schema = {
//   content,
//   movies,
//   shows,
// };

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

// export const usersRelations = relations(users, ({ many }) => ({
//   accounts: many(accounts),
// }));

// export const accounts = createTable(
//   "account",
//   {
//     userId: varchar("userId", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     type: varchar("type", { length: 255 })
//       .$type<AdapterAccount["type"]>()
//       .notNull(),
//     provider: varchar("provider", { length: 255 }).notNull(),
//     providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: varchar("token_type", { length: 255 }),
//     scope: varchar("scope", { length: 255 }),
//     id_token: text("id_token"),
//     session_state: varchar("session_state", { length: 255 }),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//     userIdIdx: index("account_userId_idx").on(account.userId),
//   })
// );

// export const accountsRelations = relations(accounts, ({ one }) => ({
//   user: one(users, { fields: [accounts.userId], references: [users.id] }),
// }));

// export const sessions = createTable(
//   "session",
//   {
//     sessionToken: varchar("sessionToken", { length: 255 })
//       .notNull()
//       .primaryKey(),
//     userId: varchar("userId", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (session) => ({
//     userIdIdx: index("session_userId_idx").on(session.userId),
//   })
// );

// export const sessionsRelations = relations(sessions, ({ one }) => ({
//   user: one(users, { fields: [sessions.userId], references: [users.id] }),
// }));

// export const verificationTokens = createTable(
//   "verificationToken",
//   {
//     identifier: varchar("identifier", { length: 255 }).notNull(),
//     token: varchar("token", { length: 255 }).notNull(),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (vt) => ({
//     compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
//   })
// );
