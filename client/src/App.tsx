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
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import OnboardingFlow from "@/pages/auth/OnboardingFlow";
import TestInterface from "@/pages/TestInterface";
import { useState, useEffect } from "react";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { AuthProvider, useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function AppContent() {
  // Using simple state instead of context for initial render
  const [showTrialBanner, setShowTrialBanner] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  
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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {isAuthenticated && location.pathname !== '/test' && <Navbar />}
      {isAuthenticated && showTrialBanner && location.pathname !== '/test' && <TrialBanner onDismiss={dismissTrialBanner} />}
      <div className="flex-1">
        <Switch>
          {/* Auth Routes */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/onboarding" component={OnboardingFlow} />
          
          {/* Test Interface - No Navigation UI */}
          <Route path="/test">
            <ProtectedRoute component={TestInterface} />
          </Route>
          
          {/* Protected Routes */}
          <Route path="/">
            {isAuthenticated ? <Dashboard /> : <Login />}
          </Route>
          <Route path="/question-bank">
            <ProtectedRoute component={QuestionBank} />
          </Route>
          <Route path="/saved-papers">
            <ProtectedRoute component={SavedPapers} />
          </Route>
          <Route path="/templates">
            <ProtectedRoute component={Templates} />
          </Route>
          <Route path="/settings">
            <ProtectedRoute component={Settings} />
          </Route>
          <Route path="/profile">
            <ProtectedRoute component={Profile} />
          </Route>
          <Route path="/help">
            <ProtectedRoute component={Help} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
      {isAuthenticated && location.pathname !== '/test' && <Footer />}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="examprep-theme">
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
