import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("user_name").notNull(),
  email: text("email").notNull().unique(),
  clerkId: text("clerk_id").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelations = relations(users, ({ one, many }) => ({
  posts: many(posts),
}));

export const platformEnum = pgEnum("platform_type", [
  "facebook",
  "twitter",
  "linkedin",
  "instagram",
  "blog",
]);

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  sourceUrl: text("source_url").notNull(),
  originalContent: text("original_content").notNull(),
  status: text("status").default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, { fields: [posts.userId], references: [users.id] }),
  postVariants: many(postVariations),
}));

export const postVariations = pgTable("post_variations", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id")
    .references(() => posts.id)
    .notNull(),
  platform: platformEnum("platform").notNull(),
  content: text("content").notNull(),
  status: text("status").default("draft").notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const postVariationRelations = relations(
  postVariations,
  ({ one, many }) => ({
    post: one(posts, { fields: [postVariations.id], references: [posts.id] }),
  })
);

export type PlatformType = (typeof platformEnum.enumValues)[number];
