import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const portraits = pgTable("portraits", {
  id: serial("id").primaryKey(),
  originalImageUrl: text("original_image_url").notNull(),
  generatedImageUrl: text("generated_image_url").notNull(),
  yearWar: text("year_war").notNull(),
  side: text("side").notNull(),
  rank: text("rank").notNull(),
  branch: text("branch").notNull(),
  extraDetails: text("extra_details"),
  artStyle: text("art_style").notNull(), // 'oil' or 'watercolor'
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPortraitSchema = createInsertSchema(portraits).omit({
  id: true,
  createdAt: true,
});

export const generatePortraitSchema = z.object({
  yearWar: z.string().min(1, "Year/War is required"),
  side: z.string().min(1, "Side/Faction is required"),
  rank: z.string().min(1, "Military rank is required"),
  branch: z.string().min(1, "Branch of service is required"),
  extraDetails: z.string().optional(),
  artStyle: z.enum(["oil", "watercolor"]),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Portrait = typeof portraits.$inferSelect;
export type InsertPortrait = z.infer<typeof insertPortraitSchema>;
export type GeneratePortraitRequest = z.infer<typeof generatePortraitSchema>;
