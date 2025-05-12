import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Copy, Star, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function Templates() {
  const { toast } = useToast();
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  
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

  // Example templates
  const templates = [
    {
      id: 1,
      title: "JEE Physics Standard Test",
      description: "Comprehensive physics test covering mechanics, thermodynamics, and electromagnetism",
      questionCount: 30,
      difficulty: "Medium",
      popular: true,
      subject: "Physics"
    },
    {
      id: 2,
      title: "NEET Biology Exam",
      description: "Complete biology test with focus on human physiology and genetics",
      questionCount: 45,
      difficulty: "Hard",
      popular: false,
      subject: "Biology"
    },
    {
      id: 3,
      title: "Chemistry Quick Quiz",
      description: "Short quiz covering organic chemistry fundamentals",
      questionCount: 15,
      difficulty: "Easy",
      popular: true,
      subject: "Chemistry"
    },
    {
      id: 4,
      title: "Mathematics Advanced",
      description: "Advanced calculus and algebra problems for JEE Advanced",
      questionCount: 25,
      difficulty: "Hard",
      popular: false,
      subject: "Mathematics"
    }
  ];
  
  const useTemplate = (templateId: number) => {
    setSelectedTemplateId(templateId);
    
    const template = templates.find(t => t.id === templateId);
    
    toast({
      title: "Template Selected",
      description: `Using template: ${template?.title}. Preparing ${template?.questionCount} questions.`,
    });
    
    // Simulate loading
    setTimeout(() => {
      toast({
        title: "Template Ready",
        description: "Template has been applied. You can now customize it further."
      });
    }, 1000);
  };
  
  const createNewTemplate = () => {
    toast({
      title: "Create New Template",
      description: "Redirecting to create a custom template..."
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
        <motion.div variants={item} className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Templates</h1>
            <p className="text-muted-foreground mt-2">Ready-made exam templates to get you started quickly</p>
          </div>
          
          <Button variant="outline" onClick={createNewTemplate}>
            <FileText className="mr-2 h-4 w-4" />
            Create New Template
          </Button>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="bg-card hover:shadow-md transition-all duration-200 border border-border">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold mb-1">{template.title}</CardTitle>
                    {template.popular && (
                      <Badge variant="outline" className="mb-2 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                        <Star className="h-3 w-3 mr-1" /> Popular
                      </Badge>
                    )}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-secondary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{template.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/30 p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">Questions</p>
                    <p className="font-semibold">{template.questionCount}</p>
                  </div>
                  <div className="bg-muted/30 p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                    <p className="font-semibold">{template.difficulty}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  className="w-full" 
                  variant={selectedTemplateId === template.id ? "secondary" : "default"}
                  onClick={() => useTemplate(template.id)}
                >
                  {selectedTemplateId === template.id ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Selected
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Use Template
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </motion.div>
        
        {selectedTemplateId && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center"
          >
            <Link href="/question-bank">
              <Button size="lg" variant="default" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Continue with Selected Template
              </Button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
