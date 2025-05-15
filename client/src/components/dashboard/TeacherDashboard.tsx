import { useState } from "react";
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
  HelpCircle,
  TrendingUp,
  Book,
  Plus,
  UserPlus,
  User,
  LineChart,
  PieChart,
  CheckCircle,
  ArrowRight,
  Filter,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";

interface TeacherDashboardProps {
  progressValue: number;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ progressValue }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedClass, setSelectedClass] = useState("all");
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const performanceData = [
    { name: 'Physics', students: 32, average: 78, highest: 96, lowest: 45 },
    { name: 'Chemistry', students: 28, average: 72, highest: 94, lowest: 51 },
    { name: 'Biology', students: 35, average: 81, highest: 98, lowest: 62 },
    { name: 'Mathematics', students: 30, average: 68, highest: 92, lowest: 38 },
  ];

  const attendanceData = [
    { month: 'Jan', attendance: 92 },
    { month: 'Feb', attendance: 87 },
    { month: 'Mar', attendance: 95 },
    { month: 'Apr', attendance: 91 },
    { month: 'May', attendance: 84 },
  ];

  const subjectDistributionData = [
    { name: 'Physics', value: 120 },
    { name: 'Chemistry', value: 105 },
    { name: 'Biology', value: 80 },
    { name: 'Mathematics', value: 135 },
  ];

  const COLORS = ['#4f46e5', '#0ea5e9', '#8b5cf6', '#10b981'];

  const handleCreateClass = () => {
    toast({
      title: "Create Class",
      description: "Opening the class creation form."
    });
  };

  const handleAddStudent = () => {
    toast({
      title: "Add Student",
      description: "Opening the student enrollment form."
    });
  };

  const handleRefreshStats = () => {
    toast({
      title: "Refreshing Stats",
      description: "Updating analytics with the latest data."
    });
  };

  return (
    <>
      {/* Tabs for different dashboard views */}
      <motion.div variants={item} className="mb-6">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="exams">Exams</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="physics-12">Physics Class 12</SelectItem>
                  <SelectItem value="chemistry-11">Chemistry Class 11</SelectItem>
                  <SelectItem value="biology-12">Biology Class 12</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" onClick={handleRefreshStats}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* Stats Cards */}
            <motion.div 
              variants={item}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <Card className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-primary">
                    <Users className="mr-2 h-5 w-5" />
                    Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2">
                    <p className="text-4xl font-bold">125</p>
                    <Badge variant="outline" className="mb-1 bg-green-500/10 text-green-600 text-xs font-normal">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +8%
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">
                    Total students across all classes
                  </CardDescription>
                  <Button variant="link" className="p-0 mt-2 text-primary" onClick={handleAddStudent}>
                    Add New Student <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-l-4 border-l-secondary hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-secondary">
                    <FileText className="mr-2 h-5 w-5" />
                    Exams Created
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">14</p>
                  <div className="mt-2">
                    <Progress value={progressValue} className="h-2 bg-muted" />
                  </div>
                  <CardDescription className="mt-2 flex items-center justify-between">
                    <span>Exam papers created this month</span>
                    <span className="text-xs">{progressValue}% used</span>
                  </CardDescription>
                  <Link href="/question-bank">
                    <Button variant="link" className="p-0 mt-2 text-secondary">
                      Create New Exam <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-primary">
                    <Book className="mr-2 h-5 w-5" />
                    Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2">
                    <p className="text-4xl font-bold">283</p>
                    <Badge variant="outline" className="mb-1 bg-green-500/10 text-green-600 text-xs font-normal">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +15%
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">
                    Questions in your question bank
                  </CardDescription>
                  <Link href="/question-bank">
                    <Button variant="link" className="p-0 mt-2 text-primary">
                      Browse Questions <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-l-4 border-l-secondary hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-secondary">
                    <BarChart2 className="mr-2 h-5 w-5" />
                    Average Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">76<span className="text-lg font-normal">%</span></p>
                  <div className="mt-2">
                    <Progress value={76} className="h-2 bg-muted" />
                  </div>
                  <CardDescription className="mt-2">
                    Average score across all exams
                  </CardDescription>
                  <Link href="/analytics">
                    <Button variant="link" className="p-0 mt-2 text-secondary">
                      View Analytics <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance by Subject & Attendance Chart */}
            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2 hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                      Performance by Subject
                    </div>
                    <Button variant="ghost" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="average" name="Avg. Score %" fill="#4f46e5" />
                        <Bar dataKey="highest" name="Highest Score" fill="#10b981" />
                        <Bar dataKey="lowest" name="Lowest Score" fill="#f43f5e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5 text-primary" />
                    Question Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={subjectDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {subjectDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Exams & Upcoming Events */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-foreground justify-between">
                    <div className="flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-primary" />
                      Recent Exams
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      4 New
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {[
                      { id: 'E-001', title: 'Physics Midterm Exam', date: '2 days ago', className: 'Class 12A', completed: 28, total: 32 },
                      { id: 'E-002', title: 'Chemistry Final Test', date: '1 week ago', className: 'Class 11B', completed: 26, total: 28 },
                      { id: 'E-003', title: 'Biology Mock Test', date: '1 week ago', className: 'Class 12C', completed: 30, total: 35 }
                    ].map((exam, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 hover:bg-muted/50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">{exam.title}</h3>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Clock className="w-3 h-3 mr-1" /> {exam.date}
                              <span className="mx-2">•</span>
                              <Users className="w-3 h-3 mr-1" /> {exam.className}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Progress value={(exam.completed / exam.total) * 100} className="h-1.5 w-24" />
                              <span className="text-xs text-muted-foreground">{exam.completed}/{exam.total} completed</span>
                            </div>
                          </div>
                          <Link href={`/exams/${exam.id}`}>
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
                  <Link href="/exams" className="w-full">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View All Exams
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-foreground">
                    <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {[
                      { title: 'Physics Final Exam', date: 'June 15, 2023', timeLeft: '3 days left', className: 'Class 12A' },
                      { title: 'Parent-Teacher Meeting', date: 'June 18, 2023', timeLeft: '6 days left', className: 'All Classes' },
                      { title: 'Chemistry Lab Test', date: 'June 22, 2023', timeLeft: '10 days left', className: 'Class 11B' }
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
                              <span className="mx-2">•</span>
                              <Users className="w-3 h-3 mr-1" /> {event.className}
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
                    View Calendar
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={item} className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 px-4 bg-primary/5 hover:bg-primary/10 border-primary/20 flex flex-col items-center justify-center gap-2 text-center" onClick={handleCreateClass}>
                  <Users className="h-5 w-5 text-primary" />
                  <span>Create Class</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 px-4 bg-secondary/5 hover:bg-secondary/10 border-secondary/20 flex flex-col items-center justify-center gap-2 text-center" onClick={handleAddStudent}>
                  <UserPlus className="h-5 w-5 text-secondary" />
                  <span>Add Student</span>
                </Button>
                
                <Link href="/question-bank" className="w-full">
                  <Button variant="outline" className="h-auto py-4 px-4 w-full bg-primary/5 hover:bg-primary/10 border-primary/20 flex flex-col items-center justify-center gap-2 text-center">
                    <Plus className="h-5 w-5 text-primary" />
                    <span>Create Exam</span>
                  </Button>
                </Link>
                
                <Link href="/analytics" className="w-full">
                  <Button variant="outline" className="h-auto py-4 px-4 w-full bg-secondary/5 hover:bg-secondary/10 border-secondary/20 flex flex-col items-center justify-center gap-2 text-center">
                    <LineChart className="h-5 w-5 text-secondary" />
                    <span>View Reports</span>
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
                    Teacher Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Explore our teacher resources for tips on creating effective exams, analyzing student performance, and maximizing learning outcomes.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/help">
                      <Button variant="default" className="bg-accent text-white hover:bg-accent/90">
                        View Resources
                      </Button>
                    </Link>
                    <Button variant="outline">
                      Join Teacher Community
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Placeholder for other tabs */}
          <TabsContent value="students">
            <div className="h-96 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Student Management</h3>
                <p className="text-muted-foreground max-w-md">
                  View and manage all your students, track their progress, and organize them into classes.
                </p>
                <Button className="mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Manage Students
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="exams">
            <div className="h-96 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Exam Management</h3>
                <p className="text-muted-foreground max-w-md">
                  Create, edit, and review exams. Monitor ongoing exams and analyze completed ones.
                </p>
                <Button className="mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Manage Exams
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="h-96 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground max-w-md">
                  Dive deep into student performance data, identify trends, and generate reports.
                </p>
                <Button className="mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  View Analytics
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
};

export default TeacherDashboard; 