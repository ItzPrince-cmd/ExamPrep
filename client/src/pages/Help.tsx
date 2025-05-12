import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  HelpCircle,
  BookOpen,
  FileText,
  Play,
  MessageCircle,
  Mail,
  Phone,
  Send,
  ArrowRight
} from "lucide-react";

export default function Help() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Searching help center",
      description: `Searching for "${searchQuery}"`,
    });
  };
  
  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We've received your message and will get back to you soon.",
    });
    setContactEmail("");
    setContactMessage("");
  };
  
  const faqs = [
    {
      question: "How do I create a new question paper?",
      answer: "To create a new question paper, go to the Question Bank page, select the questions you want to include using the checkboxes, and then click on the 'Generate Paper' button in the right sidebar. You can filter questions by subject, difficulty level, and more to find exactly what you need."
    },
    {
      question: "Can I save my question papers for later use?",
      answer: "Yes, you can save your question papers for later use. After selecting your questions, click the 'Save Paper' button. Your saved papers will be available in the 'Saved Papers' section where you can view, edit, or print them anytime."
    },
    {
      question: "How do I import my existing questions?",
      answer: "To import existing questions, click the 'Import Question' button on the Question Bank page. You can import questions from Excel, CSV, or plain text formats. The system will guide you through mapping your data to the required fields."
    },
    {
      question: "Is there a limit to how many questions I can create?",
      answer: "Free accounts can create up to 100 questions and 10 question papers. For unlimited access, consider upgrading to our premium plan which removes all limitations and provides additional features like advanced formatting options and collaboration tools."
    },
    {
      question: "How do I create questions with diagrams or images?",
      answer: "When creating a new question, you can toggle the 'Add Diagram' option which will open our built-in diagram editor. You can also upload images directly from your computer to include in your questions."
    },
    {
      question: "Can I share my question papers with colleagues?",
      answer: "Yes, premium users can share question papers with colleagues. Simply go to your saved paper, click the 'Share' button, and enter the email addresses of your colleagues. You can also control editing permissions for each user you share with."
    },
    {
      question: "How do I create a template for regular use?",
      answer: "You can create templates by going to the Templates section and clicking 'Create New Template'. Define the structure, question types, and scoring pattern. Once saved, you can use these templates to quickly generate new papers with a consistent format."
    }
  ];
  
  const videoTutorials = [
    {
      title: "Getting Started with ExamPrep Pro",
      duration: "5:32",
      thumbnail: "getting-started.jpg",
      category: "Basics"
    },
    {
      title: "Creating Your First Question Paper",
      duration: "8:15",
      thumbnail: "first-paper.jpg",
      category: "Basics"
    },
    {
      title: "Advanced Filtering Techniques",
      duration: "6:47",
      thumbnail: "advanced-filtering.jpg",
      category: "Advanced"
    },
    {
      title: "Working with Templates",
      duration: "4:23",
      thumbnail: "templates.jpg",
      category: "Templates"
    },
    {
      title: "Adding Diagrams to Questions",
      duration: "7:11",
      thumbnail: "diagrams.jpg",
      category: "Advanced"
    },
    {
      title: "Exporting and Printing",
      duration: "3:50",
      thumbnail: "exporting.jpg",
      category: "Basics"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">How can we help you?</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions, watch tutorial videos, or get in touch with our support team.
            </p>
            
            <form onSubmit={handleSearch} className="mt-6 flex mx-auto max-w-md">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="text"
                  placeholder="Search for help..."
                  className="pl-10 py-6"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="ml-2">
                Search
              </Button>
            </form>
          </div>
          
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="faq" className="data-[state=active]:bg-primary/10">
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-primary/10">
                <Play className="mr-2 h-4 w-4" />
                Video Tutorials
              </TabsTrigger>
              <TabsTrigger value="contact" className="data-[state=active]:bg-primary/10">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Us
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Browse through our most common questions and answers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
              
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Still have questions? Check our detailed documentation or contact support.
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <Button variant="outline" className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Documentation
                  </Button>
                  <Button variant="default" className="flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>
                    Learn how to use ExamPrep Pro with step-by-step video guides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videoTutorials.map((video, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                      >
                        <div className="bg-muted aspect-video rounded-lg relative overflow-hidden cursor-pointer">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-primary/80 text-white h-12 w-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play size={20} />
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-sm">{video.title}</h3>
                              <Badge variant="outline" className="bg-primary/20 text-white border-primary/20">
                                {video.duration}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {video.category}
                          </Badge>
                          <Button variant="ghost" size="sm" className="text-xs flex items-center px-2 h-7">
                            <span>Watch Now</span>
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>
                        Ways to get in touch with our support team
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Mail className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Email Support</h3>
                          <p className="text-sm text-muted-foreground">support@exampreppro.com</p>
                          <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-start space-x-3">
                        <Phone className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Phone Support</h3>
                          <p className="text-sm text-muted-foreground">+91-7891982757</p>
                          <p className="text-sm text-muted-foreground">+91-9090902757</p>
                          <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9:00 AM - 6:00 PM</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-start space-x-3">
                        <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Live Chat</h3>
                          <p className="text-sm text-muted-foreground">Available on the website</p>
                          <p className="text-xs text-muted-foreground mt-1">Instant response during business hours</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Support Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span className="font-medium">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span className="font-medium">10:00 AM - 2:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span className="font-medium text-muted-foreground">Closed</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Send us a Message</CardTitle>
                      <CardDescription>
                        Fill out the form below and we'll get back to you as soon as possible
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleContact} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="text-sm font-medium block mb-1">
                              Your Name
                            </label>
                            <Input id="name" placeholder="Enter your name" />
                          </div>
                          <div>
                            <label htmlFor="email" className="text-sm font-medium block mb-1">
                              Email Address
                            </label>
                            <Input 
                              id="email" 
                              type="email" 
                              placeholder="Enter your email" 
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="text-sm font-medium block mb-1">
                            Subject
                          </label>
                          <Input id="subject" placeholder="What is your message about?" />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="text-sm font-medium block mb-1">
                            Message
                          </label>
                          <textarea 
                            id="message" 
                            rows={6} 
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="How can we help you?"
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button type="submit" className="flex items-center">
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}