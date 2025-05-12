import {
  users, 
  type User, 
  type InsertUser,
  questions,
  type Question,
  type InsertQuestion,
  papers,
  type Paper,
  subjects,
  chapters,
  topics,
  questionTypes,
  difficultyLevels,
  paperQuestions
} from "@shared/schema";

// Data interfaces
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Question operations
  getQuestions(filters: any, page: number, limit: number, excludeIds?: number[]): Promise<PaginatedResult<Question>>;
  getQuestionById(id: number): Promise<Question | undefined>;
  
  // Paper operations
  createPaper(paper: CreatePaperInput): Promise<Paper>;
  getPapersByUserId(userId: number): Promise<Paper[]>;
  getPaperById(id: number): Promise<PaperWithQuestions | undefined>;
  
  // Filter operations
  getSubjects(): Promise<Subject[]>;
  getChapters(subjectId?: number): Promise<Chapter[]>;
  getTopics(chapterId?: number): Promise<Topic[]>;
  getQuestionTypes(): Promise<QuestionType[]>;
  getDifficultyLevels(): Promise<DifficultyLevel[]>;
}

// Additional types
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreatePaperInput {
  title: string;
  description?: string;
  userId: number;
  createdAt: string;
  questionIds: number[];
}

export interface PaperWithQuestions extends Paper {
  questions: Question[];
}

export interface Subject {
  id: number;
  name: string;
  description?: string;
}

export interface Chapter {
  id: number;
  name: string;
  number: number;
  subjectId: number;
  description?: string;
}

export interface Topic {
  id: number;
  name: string;
  chapterId: number;
  description?: string;
}

export interface QuestionType {
  id: number;
  name: string;
  description?: string;
}

export interface DifficultyLevel {
  id: number;
  name: string;
  description?: string;
}

export class MemStorage implements IStorage {
  private usersData: Map<number, User>;
  private questionsData: Map<number, Question>;
  private papersData: Map<number, Paper>;
  private paperQuestionsData: Map<number, { paperId: number, questionId: number, orderIndex: number }>;
  private subjectsData: Map<number, Subject>;
  private chaptersData: Map<number, Chapter>;
  private topicsData: Map<number, Topic>;
  private questionTypesData: Map<number, QuestionType>;
  private difficultyLevelsData: Map<number, DifficultyLevel>;
  
  private currentUserId: number;
  private currentQuestionId: number;
  private currentPaperId: number;
  private currentPaperQuestionId: number;

  constructor() {
    this.usersData = new Map();
    this.questionsData = new Map();
    this.papersData = new Map();
    this.paperQuestionsData = new Map();
    this.subjectsData = new Map();
    this.chaptersData = new Map();
    this.topicsData = new Map();
    this.questionTypesData = new Map();
    this.difficultyLevelsData = new Map();
    
    this.currentUserId = 1;
    this.currentQuestionId = 1;
    this.currentPaperId = 1;
    this.currentPaperQuestionId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add subjects
    this.subjectsData.set(1, { id: 1, name: "PHYSICS", description: "Study of matter, energy, and their interactions" });
    this.subjectsData.set(2, { id: 2, name: "CHEMISTRY", description: "Study of substances, their properties, and reactions" });
    this.subjectsData.set(3, { id: 3, name: "MATHEMATICS", description: "Study of numbers, quantities, and shapes" });
    this.subjectsData.set(4, { id: 4, name: "BIOLOGY", description: "Study of living organisms" });

    // Add chapters
    this.chaptersData.set(1, { id: 1, name: "Kinematics", number: 1, subjectId: 1, description: "Study of motion without considering its causes" });
    this.chaptersData.set(2, { id: 2, name: "Dynamics", number: 2, subjectId: 1, description: "Study of forces and their effects on motion" });
    this.chaptersData.set(3, { id: 3, name: "Work and Energy", number: 3, subjectId: 1, description: "Concepts of work, energy, and power" });
    this.chaptersData.set(4, { id: 4, name: "Motion in a Plane", number: 4, subjectId: 1, description: "Two-dimensional motion and projectiles" });

    // Add topics
    this.topicsData.set(1, { id: 1, name: "Vectors", chapterId: 4, description: "Vector quantities and operations" });
    this.topicsData.set(2, { id: 2, name: "Projectile Motion", chapterId: 4, description: "Motion under gravity in two dimensions" });
    this.topicsData.set(3, { id: 3, name: "Circular Motion", chapterId: 4, description: "Motion in a circular path" });
    this.topicsData.set(4, { id: 4, name: "All", chapterId: 4, description: "All topics in the chapter" });

    // Add question types
    this.questionTypesData.set(1, { id: 1, name: "SINGLE CORRECT MCQ", description: "Multiple choice with single correct answer" });
    this.questionTypesData.set(2, { id: 2, name: "MULTIPLE CORRECT MCQ", description: "Multiple choice with multiple correct answers" });
    this.questionTypesData.set(3, { id: 3, name: "NUMERICAL VALUE", description: "Direct numerical answer required" });
    this.questionTypesData.set(4, { id: 4, name: "MATRIX MATCH", description: "Match items between columns" });

    // Add difficulty levels
    this.difficultyLevelsData.set(1, { id: 1, name: "EASY", description: "Basic level questions" });
    this.difficultyLevelsData.set(2, { id: 2, name: "MEDIUM", description: "Moderate difficulty" });
    this.difficultyLevelsData.set(3, { id: 3, name: "HARD", description: "Challenging questions" });
    this.difficultyLevelsData.set(4, { id: 4, name: "ADVANCED", description: "Very difficult questions" });

    // Add sample questions
    this.questionsData.set(49587, {
      id: 49587,
      content: "A particle is moving on a circular path of radius r with uniform speed v. What is the displacement of the particle after it has described an angle of 60°?",
      options: ["r√2", "r√3", "r", "2r"],
      correctAnswer: "c",
      hasDiagram: false,
      subjectId: 1,
      chapterId: 4,
      topicId: 3,
      difficultyLevelId: 2,
      questionTypeId: 1
    });

    this.questionsData.set(49590, {
      id: 49590,
      content: "The position vector of a particle moving in a plane is given by r = (3t²i + 4t³j) m, where t is in seconds. The magnitude of the velocity at t = 2s is:",
      options: ["12 m/s", "20 m/s", "24 m/s", "36 m/s"],
      correctAnswer: "d",
      hasDiagram: false,
      subjectId: 1,
      chapterId: 4,
      topicId: 1,
      difficultyLevelId: 2,
      questionTypeId: 1
    });

    this.questionsData.set(49592, {
      id: 49592,
      content: "A ball is thrown horizontally from a height of 20m with a velocity of 15 m/s. The horizontal distance traveled before it hits the ground is:",
      options: ["30 m", "30√2 m", "15√2 m", "45 m"],
      correctAnswer: "b",
      hasDiagram: false,
      subjectId: 1,
      chapterId: 4,
      topicId: 2,
      difficultyLevelId: 2,
      questionTypeId: 1
    });

    this.questionsData.set(49595, {
      id: 49595,
      content: "According to cosine formula:",
      options: ["|a-b|² = a² + b² - 2ab·cosθ", "|a-b|² = a² + b² - 2ab·sinθ", "|a-b|² = a² + b² - 2ab·cosθ", "|a-b|² = a² - b² + 2ab·cosθ"],
      correctAnswer: "c",
      hasDiagram: true,
      diagramSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="10,80 90,80 50,20" fill="none" stroke="#4F46E5" stroke-width="2"/>
        <text x="5" y="85" font-size="10">A</text>
        <text x="90" y="85" font-size="10">B</text>
        <text x="50" y="15" font-size="10">C</text>
        <text x="50" y="60" font-size="10">θ</text>
      </svg>`,
      subjectId: 1,
      chapterId: 4,
      topicId: 1,
      difficultyLevelId: 2,
      questionTypeId: 1
    });

    this.questionsData.set(49597, {
      id: 49597,
      content: "A projectile is fired at an angle θ to the horizontal with initial velocity v. The maximum height reached by the projectile is:",
      options: ["v²sin²θ/2g", "v²sin²θ/g", "v²sin2θ/2g", "v²sin2θ/g"],
      correctAnswer: "a",
      hasDiagram: false,
      subjectId: 1,
      chapterId: 4,
      topicId: 2,
      difficultyLevelId: 2,
      questionTypeId: 1
    });

    // Add more sample questions
    for (let i = 49598; i <= 49620; i++) {
      this.questionsData.set(i, {
        id: i,
        content: `Sample physics question #${i}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "a",
        hasDiagram: false,
        subjectId: 1,
        chapterId: 4,
        topicId: 1,
        difficultyLevelId: 2,
        questionTypeId: 1
      });
    }

    // Set the next IDs
    this.currentQuestionId = 49621;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.usersData.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersData.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.usersData.set(id, user);
    return user;
  }

  // Question operations
  async getQuestions(
    filters: any = {}, 
    page: number = 1, 
    limit: number = 10,
    excludeIds: number[] = []
  ): Promise<PaginatedResult<Question>> {
    let filteredQuestions = Array.from(this.questionsData.values());
    
    // Apply filters
    if (filters.subjectId) {
      filteredQuestions = filteredQuestions.filter(q => q.subjectId === parseInt(filters.subjectId));
    }
    
    if (filters.chapterId) {
      filteredQuestions = filteredQuestions.filter(q => q.chapterId === parseInt(filters.chapterId));
    }
    
    if (filters.topicId) {
      filteredQuestions = filteredQuestions.filter(q => {
        // If topicId is "all" or 4 (which we defined as "All"), don't filter by topic
        if (filters.topicId === "all" || filters.topicId === "4" || parseInt(filters.topicId) === 4) {
          return true;
        }
        return q.topicId === parseInt(filters.topicId);
      });
    }
    
    if (filters.difficultyLevelId) {
      filteredQuestions = filteredQuestions.filter(q => q.difficultyLevelId === parseInt(filters.difficultyLevelId));
    }
    
    if (filters.questionTypeId) {
      filteredQuestions = filteredQuestions.filter(q => q.questionTypeId === parseInt(filters.questionTypeId));
    }
    
    // Exclude questions by ID if specified
    if (excludeIds.length > 0) {
      filteredQuestions = filteredQuestions.filter(q => !excludeIds.includes(q.id));
    }
    
    // Apply pagination
    const total = filteredQuestions.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + limit);
    
    return {
      items: paginatedQuestions,
      total,
      page,
      limit,
      totalPages
    };
  }

  async getQuestionById(id: number): Promise<Question | undefined> {
    return this.questionsData.get(id);
  }

  // Paper operations
  async createPaper(paperInput: CreatePaperInput): Promise<Paper> {
    const paperId = this.currentPaperId++;
    const paper: Paper = {
      id: paperId,
      title: paperInput.title,
      description: paperInput.description || null,
      userId: paperInput.userId,
      createdAt: paperInput.createdAt
    };
    
    this.papersData.set(paperId, paper);
    
    // Add paper questions
    paperInput.questionIds.forEach((questionId, index) => {
      const paperQuestionId = this.currentPaperQuestionId++;
      this.paperQuestionsData.set(paperQuestionId, {
        paperId,
        questionId,
        orderIndex: index
      });
    });
    
    return paper;
  }

  async getPapersByUserId(userId: number): Promise<Paper[]> {
    return Array.from(this.papersData.values()).filter(paper => paper.userId === userId);
  }

  async getPaperById(id: number): Promise<PaperWithQuestions | undefined> {
    const paper = this.papersData.get(id);
    
    if (!paper) {
      return undefined;
    }
    
    // Get all paper questions for this paper
    const paperQuestionsEntries = Array.from(this.paperQuestionsData.entries())
      .filter(([_, pq]) => pq.paperId === id)
      .sort((a, b) => a[1].orderIndex - b[1].orderIndex);
    
    // Get the actual question objects
    const questions: Question[] = [];
    for (const [_, pq] of paperQuestionsEntries) {
      const question = this.questionsData.get(pq.questionId);
      if (question) {
        questions.push(question);
      }
    }
    
    return {
      ...paper,
      questions
    };
  }

  // Filter operations
  async getSubjects(): Promise<Subject[]> {
    return Array.from(this.subjectsData.values());
  }

  async getChapters(subjectId?: number): Promise<Chapter[]> {
    let chapters = Array.from(this.chaptersData.values());
    
    if (subjectId) {
      chapters = chapters.filter(chapter => chapter.subjectId === subjectId);
    }
    
    return chapters;
  }

  async getTopics(chapterId?: number): Promise<Topic[]> {
    let topics = Array.from(this.topicsData.values());
    
    if (chapterId) {
      topics = topics.filter(topic => topic.chapterId === chapterId);
    }
    
    return topics;
  }

  async getQuestionTypes(): Promise<QuestionType[]> {
    return Array.from(this.questionTypesData.values());
  }

  async getDifficultyLevels(): Promise<DifficultyLevel[]> {
    return Array.from(this.difficultyLevelsData.values());
  }
}

export const storage = new MemStorage();
