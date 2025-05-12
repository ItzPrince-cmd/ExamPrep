import React, { createContext, useContext, useState, useCallback } from "react";
import { Question, QuestionFilters } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { generateRandomId } from "@/lib/utils";

interface QuestionBankContextType {
  questions: Question[];
  selectedIds: number[];
  filters: QuestionFilters;
  availableQuestions: number;
  usedQuestions: number;
  removeUsedQuestions: boolean;
  autoGenerate: boolean;
  showTrialBanner: boolean;
  
  updateFilter: (key: keyof QuestionFilters, value: string) => void;
  resetFilters: () => void;
  fetchQuestions: () => Promise<void>;
  toggleQuestionSelection: (id: number) => void;
  selectAll: () => void;
  removeFromSelection: (id: number) => void;
  dismissTrialBanner: () => void;
  toggleRemoveUsedQuestions: () => void;
  toggleAutoGenerate: () => void;
  
  // Actions
  showSummary: () => void;
  generatePaper: () => void;
  sendToExam: () => void;
  savePaper: () => void;
}

const QuestionBankContext = createContext<QuestionBankContextType | undefined>(undefined);

const defaultFilters: QuestionFilters = {
  classLevel: "jee",
  subject: "physics",
  level: "medium",
  type: "mcq",
  chapter: "motion",
  topic: "all"
};

export const QuestionBankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [filters, setFilters] = useState<QuestionFilters>(defaultFilters);
  const [removeUsedQuestions, setRemoveUsedQuestions] = useState(true);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [showTrialBanner, setShowTrialBanner] = useState(true);
  const { toast } = useToast();

  const availableQuestions = 255;
  const usedQuestions = selectedIds.length;

  const updateFilter = useCallback((key: keyof QuestionFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values."
    });
  }, [toast]);

  const fetchQuestions = useCallback(async () => {
    try {
      // In a real app, this would fetch from the server
      // We'll simulate with local data for now
      
      // Example questions
      const exampleQuestions: Question[] = [
        {
          id: 49587,
          content: "A particle is moving on a circular path of radius r with uniform speed v. What is the displacement of the particle after it has described an angle of 60°?",
          options: ["r√2", "r√3", "r", "2r"],
          correctAnswer: "c",
          hasDiagram: false,
          subject: "physics",
          chapter: "motion",
          topic: "circular",
          level: "medium",
          type: "mcq"
        },
        {
          id: 49590,
          content: "The position vector of a particle moving in a plane is given by r = (3t²i + 4t³j) m, where t is in seconds. The magnitude of the velocity at t = 2s is:",
          options: ["12 m/s", "20 m/s", "24 m/s", "36 m/s"],
          correctAnswer: "d",
          hasDiagram: false,
          subject: "physics",
          chapter: "motion",
          topic: "vectors",
          level: "medium",
          type: "mcq"
        },
        {
          id: 49592,
          content: "A ball is thrown horizontally from a height of 20m with a velocity of 15 m/s. The horizontal distance traveled before it hits the ground is:",
          options: ["30 m", "30√2 m", "15√2 m", "45 m"],
          correctAnswer: "b",
          hasDiagram: false,
          subject: "physics",
          chapter: "motion",
          topic: "projectile",
          level: "medium",
          type: "mcq"
        },
        {
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
          subject: "physics",
          chapter: "motion",
          topic: "vectors",
          level: "medium",
          type: "mcq"
        },
        {
          id: 49597,
          content: "A projectile is fired at an angle θ to the horizontal with initial velocity v. The maximum height reached by the projectile is:",
          options: ["v²sin²θ/2g", "v²sin²θ/g", "v²sin2θ/2g", "v²sin2θ/g"],
          correctAnswer: "a",
          hasDiagram: false,
          subject: "physics",
          chapter: "motion",
          topic: "projectile",
          level: "medium",
          type: "mcq"
        }
      ];

      setQuestions(exampleQuestions);
      
      toast({
        title: "Questions Retrieved",
        description: `Retrieved ${exampleQuestions.length} questions matching your criteria.`
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast({
        title: "Error",
        description: "Failed to retrieve questions. Please try again.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const toggleQuestionSelection = useCallback((id: number) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(qId => qId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const selectAll = useCallback(() => {
    if (selectedIds.length === questions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(questions.map(q => q.id));
    }
  }, [questions, selectedIds.length]);

  const removeFromSelection = useCallback((id: number) => {
    setSelectedIds(prev => prev.filter(qId => qId !== id));
  }, []);

  const dismissTrialBanner = useCallback(() => {
    setShowTrialBanner(false);
  }, []);

  const toggleRemoveUsedQuestions = useCallback(() => {
    setRemoveUsedQuestions(prev => !prev);
  }, []);

  const toggleAutoGenerate = useCallback(() => {
    setAutoGenerate(prev => !prev);
  }, []);

  // Actions
  const showSummary = useCallback(() => {
    if (selectedIds.length === 0) {
      toast({
        title: "No Questions Selected",
        description: "Please select at least one question to show summary.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Summary",
      description: `Showing summary for ${selectedIds.length} selected questions.`
    });
  }, [selectedIds.length, toast]);

  const generatePaper = useCallback(() => {
    if (selectedIds.length === 0) {
      toast({
        title: "No Questions Selected",
        description: "Please select at least one question to generate a paper.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Paper Generated",
      description: `Generated paper with ${selectedIds.length} questions.`
    });
  }, [selectedIds.length, toast]);

  const sendToExam = useCallback(() => {
    if (selectedIds.length === 0) {
      toast({
        title: "No Questions Selected",
        description: "Please select at least one question to send to JeeNeetExam.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Questions Sent",
      description: `${selectedIds.length} questions have been sent to JeeNeetExam.`
    });
  }, [selectedIds.length, toast]);

  const savePaper = useCallback(() => {
    if (selectedIds.length === 0) {
      toast({
        title: "No Questions Selected",
        description: "Please select at least one question to save as a paper.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Paper Saved",
      description: `Paper with ${selectedIds.length} questions has been saved.`
    });
  }, [selectedIds.length, toast]);

  const value = {
    questions,
    selectedIds,
    filters,
    availableQuestions,
    usedQuestions,
    removeUsedQuestions,
    autoGenerate,
    showTrialBanner,
    
    updateFilter,
    resetFilters,
    fetchQuestions,
    toggleQuestionSelection,
    selectAll,
    removeFromSelection,
    dismissTrialBanner,
    toggleRemoveUsedQuestions,
    toggleAutoGenerate,
    
    showSummary,
    generatePaper,
    sendToExam,
    savePaper
  };

  return (
    <QuestionBankContext.Provider value={value}>
      {children}
    </QuestionBankContext.Provider>
  );
};

export const useQuestionBank = () => {
  const context = useContext(QuestionBankContext);
  if (context === undefined) {
    throw new Error("useQuestionBank must be used within a QuestionBankProvider");
  }
  return context;
};
