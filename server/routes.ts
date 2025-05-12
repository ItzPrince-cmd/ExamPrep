import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for questions
  app.get("/api/questions", async (req, res) => {
    try {
      const filters = req.query.filters ? JSON.parse(req.query.filters as string) : {};
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const excludeIds = req.query.excludeIds 
        ? (req.query.excludeIds as string).split(",").map(id => parseInt(id))
        : [];

      const result = await storage.getQuestions(filters, page, limit, excludeIds);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions", error: (error as Error).message });
    }
  });

  app.get("/api/questions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const question = await storage.getQuestionById(id);
      
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch question", error: (error as Error).message });
    }
  });

  // API routes for papers
  app.post("/api/papers", async (req, res) => {
    try {
      const { title, description, userId, questionIds } = req.body;
      
      if (!title || !userId || !questionIds || !Array.isArray(questionIds)) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const paper = await storage.createPaper({
        title,
        description,
        userId,
        createdAt: new Date().toISOString(),
        questionIds
      });
      
      res.status(201).json(paper);
    } catch (error) {
      res.status(500).json({ message: "Failed to create paper", error: (error as Error).message });
    }
  });

  app.get("/api/papers", async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string);
      
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const papers = await storage.getPapersByUserId(userId);
      res.json(papers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch papers", error: (error as Error).message });
    }
  });

  app.get("/api/papers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const paper = await storage.getPaperById(id);
      
      if (!paper) {
        return res.status(404).json({ message: "Paper not found" });
      }
      
      res.json(paper);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch paper", error: (error as Error).message });
    }
  });

  // API routes for filters
  app.get("/api/subjects", async (req, res) => {
    try {
      const subjects = await storage.getSubjects();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subjects", error: (error as Error).message });
    }
  });

  app.get("/api/chapters", async (req, res) => {
    try {
      const subjectId = req.query.subjectId ? parseInt(req.query.subjectId as string) : undefined;
      const chapters = await storage.getChapters(subjectId);
      res.json(chapters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chapters", error: (error as Error).message });
    }
  });

  app.get("/api/topics", async (req, res) => {
    try {
      const chapterId = req.query.chapterId ? parseInt(req.query.chapterId as string) : undefined;
      const topics = await storage.getTopics(chapterId);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch topics", error: (error as Error).message });
    }
  });

  app.get("/api/question-types", async (req, res) => {
    try {
      const questionTypes = await storage.getQuestionTypes();
      res.json(questionTypes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch question types", error: (error as Error).message });
    }
  });

  app.get("/api/difficulty-levels", async (req, res) => {
    try {
      const difficultyLevels = await storage.getDifficultyLevels();
      res.json(difficultyLevels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch difficulty levels", error: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
