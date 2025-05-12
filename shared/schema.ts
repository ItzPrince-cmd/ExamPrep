import { pgTable, text, serial, integer, boolean, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const questionTypes = pgTable("question_types", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
});

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
});

export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  number: integer("number").notNull(),
  subjectId: integer("subject_id").notNull(),
  description: text("description"),
});

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  chapterId: integer("chapter_id").notNull(),
  description: text("description"),
});

export const difficultyLevels = pgTable("difficulty_levels", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: text("description"),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  options: json("options").notNull().$type<string[]>(),
  correctAnswer: varchar("correct_answer", { length: 10 }).notNull(),
  hasDiagram: boolean("has_diagram").default(false),
  diagramSvg: text("diagram_svg"),
  subjectId: integer("subject_id").notNull(),
  chapterId: integer("chapter_id").notNull(),
  topicId: integer("topic_id"),
  difficultyLevelId: integer("difficulty_level_id").notNull(),
  questionTypeId: integer("question_type_id").notNull(),
});

export const papers = pgTable("papers", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  userId: integer("user_id").notNull(),
  createdAt: text("created_at").notNull(),
});

export const paperQuestions = pgTable("paper_questions", {
  id: serial("id").primaryKey(),
  paperId: integer("paper_id").notNull(),
  questionId: integer("question_id").notNull(),
  orderIndex: integer("order_index").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

export const insertPaperSchema = createInsertSchema(papers).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questions.$inferSelect;

export type InsertPaper = z.infer<typeof insertPaperSchema>;
export type Paper = typeof papers.$inferSelect;
