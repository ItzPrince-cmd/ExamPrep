import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  RefreshCcw, 
  RotateCw, 
  RotateCcw, 
  FileText, 
  Check, 
  X, 
  BarChart2, 
  Save,
  Layers,
  Upload,
  FilePlus2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define Question type for better type safety
interface Question {
  id: number;
  content: string;
  options: string[];
  correctAnswer: string;
  hasDiagram: boolean;
  diagramSvg?: string;
  subject: string;
  chapter: string;
  topic: string;
  level: string;
  type: string;
}

export default function QuestionBank() {
  const { toast } = useToast();
  
  // Filter states
  const [classLevel, setClassLevel] = useState("jee");
  const [subject, setSubject] = useState("physics");
  const [level, setLevel] = useState("medium");
  const [questionType, setQuestionType] = useState("mcq");
  const [chapter, setChapter] = useState("motion");
  const [topic, setTopic] = useState("all");
  
  // Additional states
  const [removeUsedQuestions, setRemoveUsedQuestions] = useState(true);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showStats, setShowStats] = useState(false);
  
  // Stats
  const [availableQuestions, setAvailableQuestions] = useState(255);
  const [usedQuestions, setUsedQuestions] = useState(45);

  useEffect(() => {
    // Mock loading questions
    setQuestions([
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
    ]);
  }, []);

  const toggleQuestionSelection = (id: number) => {
    setSelectedQuestionIds(prevIds => {
      if (prevIds.includes(id)) {
        return prevIds.filter(qId => qId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  const selectAll = () => {
    if (selectedQuestionIds.length === questions.length) {
      setSelectedQuestionIds([]);
    } else {
      setSelectedQuestionIds(questions.map(q => q.id));
    }
  };

  const removeFromSelection = (id: number) => {
    setSelectedQuestionIds(prevIds => prevIds.filter(qId => qId !== id));
  };

  const resetFilters = () => {
    setClassLevel("jee");
    setSubject("physics");
    setLevel("medium");
    setQuestionType("mcq");
    setChapter("motion");
    setTopic("all");
    
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values."
    });
  };
  
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [retrievalStats, setRetrievalStats] = useState<{
    total: number;
    filtered: number;
    new: number;
  } | null>(null);

  const retrieveQuestions = () => {
    setIsRetrieving(true);
    
    toast({
      title: "Retrieving Questions",
      description: "Fetching questions based on your filter criteria..."
    });
    
    // Simulate API call with loading state
    setTimeout(() => {
      // Generate new set of questions based on filters
      const newQuestions: Question[] = [];
      const totalPossible = 25 + Math.floor(Math.random() * 20); // Random number between 25-45
      
      for (let i = questions.length + 1; i <= questions.length + 10; i++) {
        newQuestions.push({
          id: i,
          content: `Question about ${subject} topic related to ${chapter} with ${level} difficulty.`,
          options: [
            "Option A: First possible answer",
            "Option B: Second possible answer",
            "Option C: Third possible answer",
            "Option D: Fourth possible answer"
          ],
          correctAnswer: ["a", "b", "c", "d"][Math.floor(Math.random() * 4)],
          hasDiagram: Math.random() > 0.7,
          diagramSvg: Math.random() > 0.7 ? `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="blue" /></svg>` : undefined,
          subject: subject,
          chapter: chapter,
          topic: topic,
          level: level,
          type: questionType
        });
      }
      
      setQuestions(prevQuestions => [...prevQuestions, ...newQuestions]);
      setAvailableQuestions(prevCount => prevCount + 10);
      
      // Update retrieval stats
      setRetrievalStats({
        total: totalPossible,
        filtered: totalPossible - usedQuestions,
        new: 10
      });
      
      setIsRetrieving(false);
      
      toast({
        title: "Questions Retrieved",
        description: `Found 10 new questions matching your criteria.`,
      });
    }, 1500);
  };
  
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  
  const importQuestion = () => {
    setIsImportDialogOpen(true);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImportFile(e.target.files[0]);
    }
  };
  
  const startImport = () => {
    if (!importFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to import.",
        variant: "destructive"
      });
      return;
    }
    
    setIsImporting(true);
    setImportProgress(0);
    
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeImport();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const completeImport = () => {
    // Add 5 new questions to simulate successful import
    const importedQuestions: Question[] = [];
    const startId = questions.length + 1;
    
    for (let i = 0; i < 5; i++) {
      importedQuestions.push({
        id: startId + i,
        content: `Imported question ${i+1} from ${importFile?.name}`,
        options: [
          "Option A: First possible answer",
          "Option B: Second possible answer",
          "Option C: Third possible answer",
          "Option D: Fourth possible answer"
        ],
        correctAnswer: ["a", "b", "c", "d"][Math.floor(Math.random() * 4)],
        hasDiagram: false,
        subject: subject,
        chapter: chapter,
        topic: topic,
        level: level,
        type: questionType
      });
    }
    
    setQuestions(prev => [...prev, ...importedQuestions]);
    setAvailableQuestions(prev => prev + 5);
    
    setTimeout(() => {
      setIsImporting(false);
      setImportFile(null);
      setIsImportDialogOpen(false);
      
      toast({
        title: "Import Completed",
        description: `Successfully imported 5 questions from ${importFile?.name}`,
      });
    }, 500);
  };
  
  const toggleRemoveUsedQuestionsOption = () => {
    setRemoveUsedQuestions(!removeUsedQuestions);
    
    toast({
      title: removeUsedQuestions ? "Option Disabled" : "Option Enabled",
      description: removeUsedQuestions 
        ? "Used questions will now be shown in search results." 
        : "Used questions will be hidden from search results."
    });
  };
  
  const toggleAutoGenerateOption = () => {
    setAutoGenerate(!autoGenerate);
    
    toast({
      title: autoGenerate ? "Auto Generate Disabled" : "Auto Generate Enabled",
      description: autoGenerate 
        ? "Questions will be selected manually." 
        : "Questions will be automatically selected based on criteria."
    });
  };
  
  const showSummary = () => {
    if (selectedQuestionIds.length === 0) {
      toast({
        title: "No Questions Selected",
        description: "Please select at least one question to show summary."
      });
      return;
    }
    
    toast({
      title: "Showing Summary",
      description: `Summary of ${selectedQuestionIds.length} selected questions.`
    });
  };
  
  const generatePaper = () => {
    if (selectedQuestionIds.length === 0) {
      toast({
        title: "No Questions Selected",
        description: "Please select at least one question to generate a paper."
      });
      return;
    }
    
    toast({
      title: "Generating Paper",
      description: `Creating paper with ${selectedQuestionIds.length} selected questions.`
    });
    
    // Simulate generation
    setTimeout(() => {
      toast({
        title: "Paper Generated",
        description: "Your question paper has been successfully generated."
      });
    }, 1000);
  };
  
  const sendToExam = () => {
    if (selectedQuestionIds.length === 0) {
      toast({
        title: "No Questions Selected",
        description: "Please select at least one question to send to exam."
      });
      return;
    }
    
    toast({
      title: "Sending to JeeNeetExam",
      description: `Preparing ${selectedQuestionIds.length} questions for exam platform.`
    });
    
    // Simulate sending
    setTimeout(() => {
      toast({
        title: "Questions Sent",
        description: "Your questions have been successfully sent to JeeNeetExam platform."
      });
    }, 1200);
  };
  
  const savePaper = () => {
    if (selectedQuestionIds.length === 0) {
      toast({
        title: "No Questions Selected",
        description: "Please select at least one question to save as a paper."
      });
      return;
    }
    
    toast({
      title: "Saving Paper",
      description: `Saving a new paper with ${selectedQuestionIds.length} questions.`
    });
    
    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Paper Saved",
        description: "Your question paper has been saved successfully."
      });
    }, 800);
  };

  const classOptions = [
    { label: "JEE MAIN + NEET + JEE", value: "jee" },
    { label: "NEET", value: "neet" },
    { label: "JEE Advanced", value: "jee-adv" },
    { label: "Class 12", value: "class-12" },
  ];

  const subjectOptions = [
    { label: "PHYSICS", value: "physics" },
    { label: "CHEMISTRY", value: "chemistry" },
    { label: "MATHEMATICS", value: "mathematics" },
    { label: "BIOLOGY", value: "biology" },
  ];

  const levelOptions = [
    { label: "MEDIUM", value: "medium" },
    { label: "EASY", value: "easy" },
    { label: "HARD", value: "hard" },
    { label: "ADVANCED", value: "advanced" },
  ];

  const typeOptions = [
    { label: "SINGLE CORRECT MCQ", value: "mcq" },
    { label: "MULTIPLE CORRECT MCQ", value: "mcq-multiple" },
    { label: "NUMERICAL VALUE", value: "numerical" },
    { label: "MATRIX MATCH", value: "matrix" },
  ];

  const chapterOptions = [
    { label: "04. Motion in a Plane", value: "motion" },
    { label: "01. Kinematics", value: "kinematics" },
    { label: "02. Dynamics", value: "dynamics" },
    { label: "03. Work and Energy", value: "work-energy" },
  ];

  const topicOptions = [
    { label: "All", value: "all" },
    { label: "Vectors", value: "vectors" },
    { label: "Projectile Motion", value: "projectile" },
    { label: "Circular Motion", value: "circular" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filters Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-xl shadow-md p-5 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="class" className="text-sm font-medium mb-1.5 block">Class</Label>
            <Select value={classLevel} onValueChange={setClassLevel}>
              <SelectTrigger id="class" className="w-full focus:ring-primary">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="subject" className="text-sm font-medium mb-1.5 block">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="subject" className="w-full focus:ring-primary">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="level" className="text-sm font-medium mb-1.5 block">Question Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level" className="w-full focus:ring-primary">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {levelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="type" className="text-sm font-medium mb-1.5 block">Question Type</Label>
            <Select value={questionType} onValueChange={setQuestionType}>
              <SelectTrigger id="type" className="w-full focus:ring-primary">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="lg:col-span-3">
            <Label htmlFor="chapter" className="text-sm font-medium mb-1.5 block">Chapter</Label>
            <Select value={chapter} onValueChange={setChapter}>
              <SelectTrigger id="chapter" className="w-full focus:ring-primary">
                <SelectValue placeholder="Select chapter" />
              </SelectTrigger>
              <SelectContent>
                {chapterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="topic" className="text-sm font-medium mb-1.5 block">Topic</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger id="topic" className="w-full focus:ring-primary">
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                {topicOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Actions Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button 
            variant="default" 
            className="flex items-center gap-2"
            onClick={importQuestion}
          >
            <RefreshCcw size={16} />
            <span>Import Question</span>
          </Button>
          
          <div className="flex items-center bg-card rounded-lg shadow-sm overflow-hidden">
            <span className="px-3 py-2.5 bg-muted text-foreground font-medium text-sm">
              Available Ques: <span className="font-bold text-primary">{availableQuestions}</span>
            </span>
            <span className="px-3 py-2.5 text-foreground border-l text-sm">
              Used Ques: <span className="font-bold">{usedQuestions}</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4 bg-card rounded-lg shadow-sm px-4 py-2.5">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="removeUsed" 
                checked={removeUsedQuestions}
                onCheckedChange={toggleRemoveUsedQuestionsOption}
              />
              <Label htmlFor="removeUsed" className="text-sm cursor-pointer">
                Remove Used Ques.
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="autoGenerate" 
                checked={autoGenerate}
                onCheckedChange={toggleAutoGenerateOption}
              />
              <Label htmlFor="autoGenerate" className="text-sm cursor-pointer">
                Auto Generate
              </Label>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="subtle" 
            className="flex items-center gap-2"
            onClick={retrieveQuestions}
            disabled={isRetrieving}
          >
            {isRetrieving ? (
              <>
                <RotateCw size={16} className="animate-spin" />
                <span>Retrieving...</span>
              </>
            ) : (
              <>
                <RotateCw size={16} />
                <span>Retrieve Questions</span>
              </>
            )}
          </Button>
          
          <Button 
            variant="subtle" 
            className="flex items-center gap-2"
            onClick={resetFilters}
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </Button>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Questions List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Questions</h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="selectAll" 
                  checked={selectedQuestionIds.length > 0 && selectedQuestionIds.length === questions.length}
                  onCheckedChange={selectAll}
                />
                <label 
                  htmlFor="selectAll" 
                  className="text-sm cursor-pointer"
                >
                  Select All
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl shadow-md overflow-hidden">
            {questions.map((question) => (
              <motion.div 
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border-b border-border hover:bg-muted/50 transition-all duration-200 question-card"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Question Selection Column */}
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-5 h-5 rounded-md border border-border bg-card shadow-sm flex items-center justify-center">
                        <Checkbox 
                          className="h-3.5 w-3.5" 
                          checked={selectedQuestionIds.includes(question.id)}
                          onCheckedChange={() => toggleQuestionSelection(question.id)}
                        />
                      </div>
                      <div className="text-xs font-semibold text-muted-foreground mt-2">#{question.id}</div>
                    </div>
                    
                    {/* Question Content */}
                    <div className="flex-1">
                      <div className="bg-muted/30 rounded-lg p-3 mb-3">
                        <p className="text-foreground">{question.content}</p>
                        
                        {question.hasDiagram && (
                          <div className="mt-3 flex justify-center">
                            <div className="bg-card rounded-lg border border-border p-2 w-32 h-32 flex items-center justify-center">
                              {question.diagramSvg ? (
                                <div dangerouslySetInnerHTML={{ __html: question.diagramSvg }} />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                  Diagram
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Question Options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {question.options.map((option: string, index: number) => {
                          const optionLabel = String.fromCharCode(97 + index); // a, b, c, d
                          const isCorrect = question.correctAnswer === optionLabel;
                          
                          return (
                            <div key={index} className="flex items-start space-x-2">
                              <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium option-circle ${
                                  isCorrect 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-muted text-foreground"
                                }`}
                              >
                                {optionLabel}
                              </motion.div>
                              <div className={`flex items-center space-x-1 text-foreground ${
                                isCorrect ? "font-medium" : ""
                              }`}>
                                <span>{option}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {questions.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No questions found. Try changing the filters or retrieve questions.</p>
              </div>
            )}
          </div>
          
          {/* Pagination - can be implemented if needed */}
        </motion.div>
        
        {/* Selected Questions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Actions Card */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg p-5 text-white">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            
            <div className="space-y-3">
              <Button 
                variant="default" 
                className="w-full bg-white text-primary hover:bg-white/90"
                onClick={showSummary}
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                <span>Show Summary</span>
              </Button>
              
              <Button 
                variant="secondary" 
                className="w-full bg-white/10 hover:bg-white/20 text-white"
                onClick={generatePaper}
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>Generate Paper</span>
              </Button>
              
              <Button 
                variant="secondary" 
                className="w-full bg-white/10 hover:bg-white/20 text-white"
                onClick={sendToExam}
              >
                <Layers className="mr-2 h-4 w-4" />
                <span>Send To JeeNeetExam</span>
              </Button>
              
              <Button 
                variant="secondary" 
                className="w-full bg-white/10 hover:bg-white/20 text-white"
                onClick={savePaper}
              >
                <Save className="mr-2 h-4 w-4" />
                <span>Save Paper</span>
              </Button>
            </div>
          </div>
          
          {/* Selected Questions Card */}
          <div className="bg-card rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Selected Questions</h3>
              <div className="h-6 w-6 rounded-full bg-primary text-white text-xs font-medium flex items-center justify-center">
                {selectedQuestionIds.length}
              </div>
            </div>
            
            <div className="h-64 overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                {selectedQuestionIds.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No questions selected. Select questions to add them here.
                  </p>
                ) : (
                  <AnimatePresence>
                    {questions
                      .filter(question => selectedQuestionIds.includes(question.id))
                      .map((question) => (
                      <motion.div 
                        key={question.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="bg-muted/50 rounded-lg p-3 text-sm flex items-start justify-between"
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-xs font-semibold text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border">
                            #{question.id}
                          </span>
                          <p className="text-foreground line-clamp-2">
                            {question.content.length > 40 
                              ? question.content.substring(0, 40) + "..." 
                              : question.content}
                          </p>
                        </div>
                        <button 
                          className="text-destructive hover:text-destructive/80 transition-all duration-150 flex-shrink-0 ml-2"
                          onClick={() => removeFromSelection(question.id)}
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
