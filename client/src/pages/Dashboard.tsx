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
  HelpCircle,
  Award,
  Star,
  BookMarked,
  Medal,
  FileBadge,
  BadgeCheck,
  LineChart,
  Calendar,
  ListChecks,
  AlertCircle,
  UserCheck
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

// Dashboard Variants based on User Role
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";

export default function Dashboard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [progressValue, setProgressValue] = useState(0);
  const { user } = useAuth();
  
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex flex-col items-center justify-center">
          <div className="h-16 w-16 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl animate-pulse">
            EP
          </div>
          <div className="mt-4 text-lg font-medium">Loading ExamPrep Pro...</div>
        </div>
      </div>
    );
  }
  
  // Render dashboard based on user role
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
            <h1 className="text-3xl font-bold text-foreground">
              {user?.role === 'teacher' 
                ? "Teacher Dashboard" 
                : "Welcome to ExamPrep Pro"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {user?.role === 'teacher'
                ? "Manage your classes, create exams, and track student progress"
                : "Your comprehensive test preparation platform"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {user?.role === 'teacher' ? (
              <>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  <span>Export Analytics</span>
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
                    <span>Create Exam</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button variant="outline" className="flex items-center gap-2">
                  <BookMarked size={16} />
                  <span>My Bookmarks</span>
                </Button>
                <Link href="/settings">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Settings size={16} />
                    <span>Settings</span>
                  </Button>
                </Link>
                <Link href="/question-bank">
                  <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <PlusCircle size={16} />
                    <span>Practice Now</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Render user-specific dashboard */}
      {user?.role === 'teacher' ? (
        <TeacherDashboard progressValue={progressValue} />
      ) : (
        <StudentDashboard progressValue={progressValue} />
      )}
    </motion.div>
  );
}
