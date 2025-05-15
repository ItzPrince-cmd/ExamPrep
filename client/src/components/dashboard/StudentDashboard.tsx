import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
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
  HelpCircle,
  TrendingUp,
  Book,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Medal,
  Zap,
  Bookmark,
  TimerReset,
  RotateCcw,
  LineChart,
  ListTodo,
  AlertCircle,
  Timer,
  BadgeCheck
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface StudentDashboardProps {
  progressValue: number;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ progressValue }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [, setLocation] = useLocation();
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const performanceData = [
    { subject: 'Physics', score: 76, average: 68 },
    { subject: 'Chemistry', score: 81, average: 72 },
    { subject: 'Biology', score: 65, average: 70 },
    { subject: 'Mathematics', score: 72, average: 65 },
  ];

  const progressData = [
    { week: 'Week 1', score: 65 },
    { week: 'Week 2', score: 69 },
    { week: 'Week 3', score: 72 },
    { week: 'Week 4', score: 71 },
    { week: 'Week 5', score: 75 },
    { week: 'Week 6', score: 82 },
  ];

  const subjectBreakdownData = [
    { name: 'Completed', value: 24 },
    { name: 'In Progress', value: 12 },
    { name: 'Not Started', value: 36 },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#6b7280'];

  const handleStartPractice = () => {
    toast({
      title: "Starting Practice",
      description: "Redirecting you to the test interface."
    });
    setLocation('/test');
  };

  const handleResumeExam = () => {
    toast({
      title: "Resuming Exam",
      description: "Taking you back to your practice exam."
    });
  };

  const handleBookmark = () => {
    toast({
      title: "Bookmarked",
      description: "Question added to your bookmarks."
    });
  };

  return (
    <>
      {/* Tabs for different dashboard views */}
      <motion.div variants={item} className="mb-6">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
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
                    Questions ready for your practice
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
                    <Award className="mr-2 h-5 w-5" />
                    Your Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">74<span className="text-lg font-normal">%</span></p>
                  <div className="mt-2">
                    <Progress value={74} className="h-2 bg-muted" />
                  </div>
                  <CardDescription className="mt-2 flex items-center justify-between">
                    <span>Your average score across all subjects</span>
                    <span className="text-xs font-medium text-green-600">+5% this month</span>
                  </CardDescription>
                  <Link href="/progress">
                    <Button variant="link" className="p-0 mt-2 text-secondary">
                      View Detailed Analysis <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-l-4 border-l-accent hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-accent">
                    <Star className="mr-2 h-5 w-5" />
                    Practice Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <p className="text-4xl font-bold">
                      7 <span className="text-lg text-muted-foreground">days</span>
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
                    Keep up your daily practice routine!
                  </CardDescription>
                  <Button variant="link" className="p-0 mt-2 text-primary" onClick={handleStartPractice}>
                    Continue Streak <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance Chart */}
            <motion.div variants={item} className="mb-8">
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="mr-2 h-5 w-5 text-primary" />
                    Your Progress
                  </CardTitle>
                  <CardDescription>
                    Track your performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={progressData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis domain={[40, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="score"
                          name="Your Score %"
                          stroke="#4f46e5"
                          strokeWidth={2}
                          dot={{ r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity & Recommended */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-foreground">
                    <Activity className="mr-2 h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {[
                      { title: 'Physics Practice Test', date: '2 days ago', score: '82%', badge: 'Completed' },
                      { title: 'Chemistry Mock Exam', date: '3 days ago', score: '76%', badge: 'Completed' },
                      { title: 'Biology Quiz', date: '1 week ago', score: '65%', badge: 'Completed' }
                    ].map((activity, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 hover:bg-muted/50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">{activity.title}</h3>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Clock className="w-3 h-3 mr-1" /> {activity.date}
                              <span className="mx-2">•</span>
                              <Award className="w-3 h-3 mr-1" /> Score: {activity.score}
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                            {activity.badge}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t px-4 py-3">
                  <Link href="/history" className="w-full">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View All Activity
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-foreground">
                    <Zap className="mr-2 h-5 w-5 text-primary" />
                    Recommended Practice
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {[
                      { title: 'Physics: Forces & Motion', level: 'Medium', questions: 15, badge: 'Weak Area' },
                      { title: 'Chemistry: Organic Compounds', level: 'Hard', questions: 20, badge: 'New' },
                      { title: 'Mathematics: Calculus', level: 'Medium', questions: 12, badge: 'Weak Area' }
                    ].map((recommendation, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 hover:bg-muted/50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">{recommendation.title}</h3>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <AlertCircle className="w-3 h-3 mr-1" /> Level: {recommendation.level}
                              <span className="mx-2">•</span>
                              <FileText className="w-3 h-3 mr-1" /> {recommendation.questions} questions
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={recommendation.badge === 'Weak Area' ? 'outline' : 'secondary'} className={recommendation.badge === 'Weak Area' ? 'bg-red-500/10 text-red-600 border-red-200' : ''}>
                              {recommendation.badge}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronRight size={16} />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t px-4 py-3">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    View All Recommendations
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={item} className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button 
                  className="w-full h-auto py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-md"
                  onClick={handleStartPractice}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ y: 0 }}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Zap className="h-8 w-8 mb-2" />
                    </motion.div>
                    <span>Start Practice</span>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full h-auto py-6 hover:bg-muted shadow-sm" onClick={handleResumeExam}>
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ y: 0 }}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <RotateCcw className="h-8 w-8 mb-2 text-primary" />
                    </motion.div>
                    <span>Resume Last Exam</span>
                  </div>
                </Button>
                
                <Link href="/bookmarks">
                  <Button variant="outline" className="w-full h-auto py-6 hover:bg-muted shadow-sm">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ y: 0 }}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Bookmark className="h-8 w-8 mb-2 text-primary" />
                      </motion.div>
                      <span>View Bookmarks</span>
                    </div>
                  </Button>
                </Link>
                
                <Link href="/progress">
                  <Button variant="outline" className="w-full h-auto py-6 hover:bg-muted shadow-sm">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ y: 0 }}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <LineChart className="h-8 w-8 mb-2 text-primary" />
                      </motion.div>
                      <span>Full Progress Report</span>
                    </div>
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Help Section */}
            <motion.div variants={item}>
              <Card className="bg-gradient-to-r from-accent/10 to-transparent border-accent/20 hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5 text-accent" />
                    Need Help With Your Studies?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Our study guides and reference materials can help you prepare more effectively for your exams.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/resources">
                      <Button variant="default" className="bg-accent text-white hover:bg-accent/90">
                        View Study Resources
                      </Button>
                    </Link>
                    <Link href="/help">
                      <Button variant="outline">
                        Get Study Tips
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Placeholder for other tabs */}
          <TabsContent value="practice">
            <div className="h-96 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <ListTodo className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Practice Tests</h3>
                <p className="text-muted-foreground max-w-md">
                  Take practice tests in various subjects to improve your knowledge and test-taking skills.
                </p>
                <Button className="mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Start Practice
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="progress">
            <div className="h-96 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <LineChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Your Progress</h3>
                <p className="text-muted-foreground max-w-md">
                  Track your progress over time, identify areas for improvement, and celebrate your achievements.
                </p>
                <Button className="mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  View Progress
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bookmarks">
            <div className="h-96 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Your Bookmarks</h3>
                <p className="text-muted-foreground max-w-md">
                  Review questions you've bookmarked for further study and practice.
                </p>
                <Button className="mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  View Bookmarks
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
};

export default StudentDashboard; 