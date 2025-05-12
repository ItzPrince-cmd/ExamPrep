import { Switch, Route } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { TrialBanner } from "@/components/layout/TrialBanner";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Footer } from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import QuestionBank from "@/pages/QuestionBank";
import SavedPapers from "@/pages/SavedPapers";
import Templates from "@/pages/Templates";
import Settings from "@/pages/Settings";
import Profile from "@/pages/Profile";
import Help from "@/pages/Help";
import { useState, useEffect } from "react";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

function App() {
  // Using simple state instead of context for initial render
  const [showTrialBanner, setShowTrialBanner] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const dismissTrialBanner = () => {
    setShowTrialBanner(false);
  };
  
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
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="examprep-theme">
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navbar />
          {showTrialBanner && <TrialBanner onDismiss={dismissTrialBanner} />}
          <div className="flex-1">
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/question-bank" component={QuestionBank} />
              <Route path="/saved-papers" component={SavedPapers} />
              <Route path="/templates" component={Templates} />
              <Route path="/settings" component={Settings} />
              <Route path="/profile" component={Profile} />
              <Route path="/help" component={Help} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
