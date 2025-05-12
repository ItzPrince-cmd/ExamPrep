import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Trash2, PlusCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SavedPapers() {
  const { toast } = useToast();
  const [savedPapers, setSavedPapers] = useState([
    {
      id: 1,
      title: "JEE Main Physics - Set 1",
      date: "2023-07-15",
      questionCount: 25,
      subject: "Physics"
    },
    {
      id: 2,
      title: "NEET Biology Practice Test",
      date: "2023-08-10",
      questionCount: 30,
      subject: "Biology"
    }
  ]);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [paperToDelete, setPaperToDelete] = useState<number | null>(null);
  const [viewingPaper, setViewingPaper] = useState<number | null>(null);
  
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
  
  const handleDelete = (paperId: number) => {
    setPaperToDelete(paperId);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (paperToDelete) {
      setSavedPapers(prev => prev.filter(paper => paper.id !== paperToDelete));
      
      toast({
        title: "Paper Deleted",
        description: "The question paper has been permanently deleted."
      });
      
      setIsDeleteDialogOpen(false);
      setPaperToDelete(null);
    }
  };
  
  const handleView = (paperId: number) => {
    setViewingPaper(paperId);
    
    toast({
      title: "Opening Paper",
      description: "Loading the selected question paper for viewing."
    });
    
    // Simulate loading
    setTimeout(() => {
      toast({
        title: "Paper Loaded",
        description: "Question paper is now ready for viewing and editing."
      });
    }, 800);
  };
  
  const handleExport = (paperId: number) => {
    const paper = savedPapers.find(p => p.id === paperId);
    
    toast({
      title: "Exporting Paper",
      description: `Preparing ${paper?.title} for export as PDF.`
    });
    
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your paper has been exported and is ready for download."
      });
    }, 1000);
  };
  
  const handleCreatePaper = () => {
    toast({
      title: "Creating New Paper",
      description: "Redirecting to question bank to create a new paper."
    });
  };
  

  return (
    <div className="bg-background text-foreground">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 py-8"
      >
        <motion.div variants={item} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Saved Papers</h1>
          <p className="text-muted-foreground mt-2">Manage your created exam papers</p>
        </motion.div>
  
        {savedPapers.length === 0 ? (
          <motion.div 
            variants={item} 
            className="bg-card rounded-xl p-10 text-center shadow-md border border-border"
          >
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">No Saved Papers</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't created any question papers yet. Create your first paper from our extensive question bank.
            </p>
            <Link href="/question-bank">
              <Button onClick={handleCreatePaper} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Paper
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPapers.map((paper) => (
              <Card key={paper.id} className="bg-card hover:shadow-md transition-all duration-200 border border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-bold">{paper.title}</CardTitle>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date Created:</span>
                      <span className="font-medium">{paper.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Questions:</span>
                      <span className="font-medium">{paper.questionCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subject:</span>
                      <span className="font-medium">{paper.subject}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`flex-1 mr-2 ${viewingPaper === paper.id ? 'bg-primary/10 text-primary' : ''}`}
                    onClick={() => handleView(paper.id)}
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 mr-2"
                    onClick={() => handleExport(paper.id)}
                  >
                    <Download className="mr-1 h-4 w-4" />
                    Export
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(paper.id)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {/* Create New Paper Card */}
            <Link href="/question-bank">
              <Card className="bg-card border-dashed border-2 hover:bg-muted/10 transition-all duration-200 flex flex-col items-center justify-center p-6 h-full cursor-pointer">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <PlusCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Create New Paper</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Generate a new question paper from our extensive database
                </p>
                <Button onClick={handleCreatePaper}>Create Paper</Button>
              </Card>
            </Link>
          </motion.div>
        )}
      </motion.div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this question paper? This action cannot be undone and all associated data will be permanently lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Paper
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
