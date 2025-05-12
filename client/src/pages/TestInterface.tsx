import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock questions data
const mockQuestions = [
  {
    id: 1,
    content: "A particle is moving on a circular path of radius r with uniform speed v. What is the displacement of the particle after it has described an angle of 60°?",
    options: ["r√2", "r√3", "r", "2r"],
    correctAnswer: "c",
    hasDiagram: true,
    diagramSvg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="80" fill="none" stroke="#4F46E5" stroke-width="2"/>
      <line x1="100" y1="100" x2="180" y2="100" stroke="#4F46E5" stroke-width="2"/>
      <line x1="100" y1="100" x2="140" y2="31" stroke="#4F46E5" stroke-width="2"/>
      <path d="M 140 120 A 40 40 0 0 1 160 100" fill="none" stroke="#4F46E5" stroke-width="2"/>
      <text x="150" y="115" font-size="12" fill="#4F46E5">60°</text>
      <circle cx="100" cy="100" r="5" fill="#4F46E5"/>
    </svg>`,
    subject: "Physics",
    topic: "Circular Motion",
  },
  {
    id: 2,
    content: "The position vector of a particle moving in a plane is given by r = (3t²i + 4t³j) m, where t is in seconds. The magnitude of the velocity at t = 2s is:",
    options: ["12 m/s", "20 m/s", "24 m/s", "36 m/s"],
    correctAnswer: "d",
    hasDiagram: false,
    subject: "Physics",
    topic: "Kinematics",
  },
  {
    id: 3,
    content: "In a hydrogen atom, when an electron jumps from n = 3 to n = 2, the wavelength of emitted radiation is:",
    options: ["410 nm", "486 nm", "656 nm", "434 nm"],
    correctAnswer: "b",
    hasDiagram: false,
    subject: "Physics",
    topic: "Atomic Structure",
  },
  {
    id: 4,
    content: "The equivalent resistance between points A and B in the circuit shown is:",
    options: ["5 Ω", "10 Ω", "15 Ω", "20 Ω"],
    correctAnswer: "a",
    hasDiagram: true,
    diagramSvg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="30" x2="60" y2="30" stroke="#4F46E5" stroke-width="2"/>
      <line x1="20" y1="90" x2="60" y2="90" stroke="#4F46E5" stroke-width="2"/>
      <line x1="20" y1="30" x2="20" y2="90" stroke="#4F46E5" stroke-width="2"/>
      <line x1="140" y1="30" x2="180" y2="30" stroke="#4F46E5" stroke-width="2"/>
      <line x1="140" y1="90" x2="180" y2="90" stroke="#4F46E5" stroke-width="2"/>
      <line x1="180" y1="30" x2="180" y2="90" stroke="#4F46E5" stroke-width="2"/>
      
      <!-- Resistors -->
      <path d="M 60 30 L 70 30 L 75 20 L 85 40 L 95 20 L 105 40 L 115 20 L 125 40 L 130 30 L 140 30" fill="none" stroke="#4F46E5" stroke-width="2"/>
      <path d="M 60 90 L 70 90 L 75 80 L 85 100 L 95 80 L 105 100 L 115 80 L 125 100 L 130 90 L 140 90" fill="none" stroke="#4F46E5" stroke-width="2"/>
      <path d="M 60 30 L 60 50 L 50 55 L 70 65 L 50 75 L 70 85 L 60 90" fill="none" stroke="#4F46E5" stroke-width="2"/>
      
      <!-- Labels -->
      <text x="100" y="20" text-anchor="middle" font-size="10" fill="#4F46E5">10Ω</text>
      <text x="100" y="110" text-anchor="middle" font-size="10" fill="#4F46E5">10Ω</text>
      <text x="50" y="60" text-anchor="middle" font-size="10" fill="#4F46E5">10Ω</text>
      <text x="15" y="60" text-anchor="middle" font-size="10" font-weight="bold" fill="#4F46E5">A</text>
      <text x="185" y="60" text-anchor="middle" font-size="10" font-weight="bold" fill="#4F46E5">B</text>
    </svg>`,
    subject: "Physics",
    topic: "Electricity",
  },
  {
    id: 5,
    content: "For a projectile, the angle between the velocity and the horizontal at the highest point of its trajectory is:",
    options: ["0°", "45°", "60°", "90°"],
    correctAnswer: "a",
    hasDiagram: false,
    subject: "Physics",
    topic: "Projectile Motion",
  },
];

export default function TestInterface() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Test state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  
  // Timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up - submit the test automatically
          clearInterval(timerRef.current!);
          setIsTestComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Cleanup timer
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Current question
  const currentQuestion = mockQuestions[currentQuestionIndex];
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle answer selection
  const handleSelectAnswer = (option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: option
    });
  };
  
  // Toggle mark for review
  const toggleMarkForReview = () => {
    if (markedForReview.includes(currentQuestion.id)) {
      setMarkedForReview(markedForReview.filter(id => id !== currentQuestion.id));
    } else {
      setMarkedForReview([...markedForReview, currentQuestion.id]);
    }
  };
  
  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Jump to specific question
  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  
  // Submit test
  const handleSubmitTest = () => {
    // In a real app, we would send the answers to the server
    setIsTestComplete(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    toast({
      title: "Test Submitted",
      description: "Your answers have been recorded."
    });
    
    // Close dialog
    setShowSubmitDialog(false);
  };
  
  // Exit test
  const handleExitTest = () => {
    setShowExitDialog(false);
    setLocation('/');
  };
  
  // Save and continue later
  const handleSaveAndExit = () => {
    toast({
      title: "Progress Saved",
      description: "You can resume this test later."
    });
    setLocation('/');
  };
  
  // Bookmark question
  const handleBookmarkQuestion = () => {
    toast({
      title: "Question Bookmarked",
      description: "This question has been added to your bookmarks."
    });
  };
  
  // Check if all questions are answered
  const areAllQuestionsAnswered = mockQuestions.every(q => selectedAnswers[q.id]);
  
  // Calculate progress
  const progressPercentage = (Object.keys(selectedAnswers).length / mockQuestions.length) * 100;
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      {/* Header with timer and controls */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Exit Test?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your progress will be lost unless you save. Would you like to save and exit, or just exit?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSaveAndExit} className="bg-primary">
                    Save & Exit
                  </AlertDialogAction>
                  <AlertDialogAction onClick={handleExitTest} className="bg-destructive">
                    Exit without Saving
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <div className="flex flex-col">
              <h3 className="text-sm font-medium">Physics Practice Test</h3>
              <p className="text-xs text-muted-foreground">JEE Preparation</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleBookmarkQuestion}>
              <Bookmark className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Bookmark</span>
            </Button>
            
            <Button variant="outline" size="sm" onClick={toggleMarkForReview} className={markedForReview.includes(currentQuestion.id) ? "bg-yellow-50 text-yellow-700 border-yellow-200" : ""}>
              <Flag className={`h-4 w-4 mr-2 ${markedForReview.includes(currentQuestion.id) ? "text-yellow-500" : ""}`} />
              <span className="hidden sm:inline">{markedForReview.includes(currentQuestion.id) ? "Marked" : "Mark"} for Review</span>
            </Button>
            
            <div className={`flex items-center gap-2 rounded-full px-4 py-1 ${timeRemaining < 300 ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>
              <Clock className="h-4 w-4" />
              <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
            </div>
            
            <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
              <AlertDialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Submit
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit Test?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {!areAllQuestionsAnswered 
                      ? `You have answered ${Object.keys(selectedAnswers).length} out of ${mockQuestions.length} questions. Are you sure you want to submit the test?`
                      : "You have answered all questions. Submit your test?"}
                    
                    {markedForReview.length > 0 && (
                      <p className="mt-2 text-yellow-600 dark:text-yellow-500">
                        You have {markedForReview.length} question(s) marked for review.
                      </p>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Continue Test</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmitTest} className="bg-primary">
                    Submit Test
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        
        {/* Progress bar */}
        <Progress value={progressPercentage} className="h-1" />
      </div>
      
      {!isTestComplete ? (
        /* Test content */
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Question navigation sidebar */}
          <div className="w-full md:w-64 lg:w-80 border-r border-border bg-muted/30 p-4 overflow-y-auto hidden md:block">
            <h3 className="font-medium text-sm mb-3">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2">
              {mockQuestions.map((question, index) => (
                <Button
                  key={question.id}
                  variant="outline"
                  size="sm"
                  className={`h-10 w-10 p-0 relative ${
                    currentQuestionIndex === index ? "ring-2 ring-primary ring-offset-2" : ""
                  } ${
                    selectedAnswers[question.id] ? "bg-primary/10 text-primary border-primary/30" : ""
                  }`}
                  onClick={() => jumpToQuestion(index)}
                >
                  {index + 1}
                  {markedForReview.includes(question.id) && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-500 rounded-full" />
                  )}
                </Button>
              ))}
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <div className="h-4 w-4 bg-primary/10 border border-primary/30 rounded"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-4 w-4 border border-border rounded relative">
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-500 rounded-full" />
                </div>
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-4 w-4 border border-border rounded"></div>
                <span>Not Visited</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium text-sm mb-2">Test Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Questions:</span>
                  <span className="font-medium">{mockQuestions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Answered:</span>
                  <span className="font-medium">{Object.keys(selectedAnswers).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Marked for Review:</span>
                  <span className="font-medium">{markedForReview.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Not Answered:</span>
                  <span className="font-medium">{mockQuestions.length - Object.keys(selectedAnswers).length}</span>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              onClick={() => setShowSubmitDialog(true)}
            >
              Submit Test
            </Button>
          </div>
          
          {/* Question content */}
          <div className="flex-1 container mx-auto px-4 py-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              {/* Mobile question navigator */}
              <div className="mb-6 md:hidden">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">Question Navigator</h3>
                  <span className="text-xs font-medium">{currentQuestionIndex + 1} of {mockQuestions.length}</span>
                </div>
                <div className="flex overflow-x-auto pb-2 gap-2 snap-x">
                  {mockQuestions.map((question, index) => (
                    <Button
                      key={question.id}
                      variant="outline"
                      size="sm"
                      className={`h-10 w-10 p-0 relative snap-start flex-shrink-0 ${
                        currentQuestionIndex === index ? "ring-2 ring-primary ring-offset-2" : ""
                      } ${
                        selectedAnswers[question.id] ? "bg-primary/10 text-primary border-primary/30" : ""
                      }`}
                      onClick={() => jumpToQuestion(index)}
                    >
                      {index + 1}
                      {markedForReview.includes(question.id) && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-500 rounded-full" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary text-white text-sm font-medium">
                    {currentQuestionIndex + 1}
                  </span>
                  <div className="text-xs flex items-center gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{currentQuestion.subject}</span>
                    <span className="px-2 py-1 bg-muted rounded-full">{currentQuestion.topic}</span>
                  </div>
                </div>
                {markedForReview.includes(currentQuestion.id) && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-600">
                    <Flag className="h-3 w-3" /> Marked for review
                  </span>
                )}
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-900 border border-border rounded-lg shadow-sm">
                <div className="prose dark:prose-invert max-w-none mb-6">
                  <p className="text-base font-medium">{currentQuestion.content}</p>
                </div>
                
                {currentQuestion.hasDiagram && (
                  <div className="mb-6 flex justify-center">
                    <div className="w-64 h-64" dangerouslySetInnerHTML={{ __html: currentQuestion.diagramSvg }} />
                  </div>
                )}
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const optionLabel = String.fromCharCode(97 + index); // a, b, c, d
                    const isSelected = selectedAnswers[currentQuestion.id] === optionLabel;
                    
                    return (
                      <div 
                        key={index} 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-muted-foreground"
                        }`}
                        onClick={() => handleSelectAnswer(optionLabel)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex items-center justify-center h-6 w-6 rounded-full ${
                            isSelected 
                              ? "bg-primary text-white" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {optionLabel.toUpperCase()}
                          </div>
                          <div className="text-base">{option}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={goToPrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={toggleMarkForReview}
                    className={markedForReview.includes(currentQuestion.id) ? "bg-yellow-50 text-yellow-700 border-yellow-200" : ""}
                  >
                    <Flag className={`h-4 w-4 mr-2 ${markedForReview.includes(currentQuestion.id) ? "text-yellow-500" : ""}`} />
                    {markedForReview.includes(currentQuestion.id) ? "Unmark" : "Mark for Review"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleBookmarkQuestion}
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Bookmark
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === mockQuestions.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              
              {currentQuestionIndex === mockQuestions.length - 1 && (
                <div className="mt-4 flex justify-center">
                  <Button 
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    onClick={() => setShowSubmitDialog(true)}
                  >
                    Submit Test
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Test complete view */
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Test Completed!</h2>
            <p className="text-muted-foreground mb-6">
              Your answers have been submitted successfully. You can now view your results or return to the dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setLocation('/')}>
                <Home className="h-4 w-4" />
                <span>Go to Dashboard</span>
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>View Results</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 