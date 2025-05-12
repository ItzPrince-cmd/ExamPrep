import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  BarChart3,
  FileText,
  Users,
  CalendarDays,
  ChevronRight,
  Clock,
  BarChart2,
  BookOpen,
  Activity,
  Zap,
  Settings,
  PlusCircle,
  TimerReset,
  Download,
  Archive,
  CheckCircle,
  TrendingUp,
  GraduationCap,
  Book,
  Check,
  ArrowRight,
  HelpCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [progressValue, setProgressValue] = useState(0);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    // Animate progress bar
    const interval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 70) {
          clearInterval(interval);
          return 70;
        }
        return prev + 1;
      });
    }, 20);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const handleCreatePaper = () => {
    toast({
      title: "Creating new paper",
      description: "Redirecting to question bank to create a new paper."
    });
  };
  
  const handleContactSupport = () => {
    toast({
      title: "Contact request sent",
      description: "Our support team will get back to you shortly."
    });
  };
  
  const handleUpgrade = () => {
    toast({
      title: "Upgrade information",
      description: "Opening subscription options for your account."
    });
  };
  
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="container mx-auto px-4 py-8"
    >
      <motion.div variants={item} className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome to ExamPrep Pro</h1>
            <p className="text-muted-foreground mt-2">Your comprehensive test preparation platform</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              <span>Export Data</span>
            </Button>
            <Link href="/settings">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings size={16} />
                <span>Settings</span>
              </Button>
            </Link>
            <Link href="/question-bank" onClick={handleCreatePaper}>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <PlusCircle size={16} />
                <span>New Paper</span>
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={item}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <Card className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-primary">
              <Book className="mr-2 h-5 w-5" />
              Available Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-bold">255</p>
              <Badge variant="outline" className="mb-1 bg-green-500/10 text-green-600 text-xs font-normal">
                <TrendingUp className="mr-1 h-3 w-3" />
                +12%
              </Badge>
            </div>
            <CardDescription className="mt-2">
              Questions ready to be used in your exams
            </CardDescription>
            <Link href="/question-bank">
              <Button variant="link" className="p-0 mt-2 text-primary">
                Browse Question Bank <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-secondary hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-secondary">
              <FileText className="mr-2 h-5 w-5" />
              Saved Papers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">2</p>
            <div className="mt-2">
              <Progress value={progressValue} className="h-2 bg-muted" />
            </div>
            <CardDescription className="mt-2 flex items-center justify-between">
              <span>Exam papers created and saved</span>
              <span className="text-xs">{progressValue}% used</span>
            </CardDescription>
            <Link href="/saved-papers">
              <Button variant="link" className="p-0 mt-2 text-secondary">
                View Saved Papers <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-accent hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-accent">
              <GraduationCap className="mr-2 h-5 w-5" />
              Trial Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <p className="text-4xl font-bold">
                2 <span className="text-lg text-muted-foreground">remaining</span>
              </p>
              <motion.div 
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                className="bg-accent/10 text-accent p-1 rounded-full"
              >
                <CheckCircle size={20} />
              </motion.div>
            </div>
            <CardDescription className="mt-2">
              Papers available in trial version
            </CardDescription>
            <Button variant="link" className="p-0 mt-2 text-primary" onClick={handleUpgrade}>
              Upgrade Now <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/question-bank">
            <Button className="w-full h-auto py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-md">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Book className="h-8 w-8 mb-2" />
                </motion.div>
                <span>Create New Paper</span>
              </div>
            </Button>
          </Link>
          
          <Link href="/templates">
            <Button variant="outline" className="w-full h-auto py-6 hover:bg-muted shadow-sm">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FileText className="h-8 w-8 mb-2 text-primary" />
                </motion.div>
                <span>Use Template</span>
              </div>
            </Button>
          </Link>
          
          <Link href="/saved-papers">
            <Button variant="outline" className="w-full h-auto py-6 hover:bg-muted shadow-sm">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Check className="h-8 w-8 mb-2 text-primary" />
                </motion.div>
                <span>View Saved Papers</span>
              </div>
            </Button>
          </Link>
          
          <Button variant="outline" className="w-full h-auto py-6 hover:bg-muted shadow-sm border-dashed" onClick={handleUpgrade}>
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <GraduationCap className="h-8 w-8 mb-2 text-primary" />
              </motion.div>
              <span>Upgrade Account</span>
            </div>
          </Button>
        </div>
      </motion.div>
      
      <motion.div variants={item} className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-foreground">
                <Activity className="mr-2 h-5 w-5 text-primary" />
                Latest Papers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  { id: 'P-001', title: 'Physics Midterm Exam', date: '2 days ago', questions: 25 },
                  { id: 'P-002', title: 'Chemistry Final Test', date: '1 week ago', questions: 30 }
                ].map((paper, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{paper.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3 mr-1" /> {paper.date}
                          <span className="mx-2">•</span>
                          <FileText className="w-3 h-3 mr-1" /> {paper.questions} questions
                        </div>
                      </div>
                      <Link href={`/saved-papers/${paper.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRight size={16} />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t px-4 py-3">
              <Link href="/saved-papers" className="w-full">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View All Papers
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-foreground">
                <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                Coming Up
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  { title: 'Physics Exam', date: 'May 15, 2023', timeLeft: '3 days left' },
                  { title: 'Chemistry Quiz', date: 'May 18, 2023', timeLeft: '6 days left' }
                ].map((event, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{event.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <CalendarDays className="w-3 h-3 mr-1" /> {event.date}
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
                        {event.timeLeft}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t px-4 py-3">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                View All Events
              </Button>
            </CardFooter>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-gradient-to-r from-accent/10 to-transparent border-accent/20 hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5 text-accent" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Contact our support team for any questions or assistance with using ExamPrep Pro.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/help">
                <Button variant="default" className="bg-accent text-white hover:bg-accent/90">
                  View Tutorials
                </Button>
              </Link>
              <Button variant="outline" onClick={handleContactSupport}>
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
