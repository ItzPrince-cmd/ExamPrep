import { useState } from "react";
import { Link, useLocation } from "wouter";
import { GraduationCap, Menu, X, User, Settings, HelpCircle, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/question-bank", label: "Question Bank" },
    { path: "/saved-papers", label: "Saved Papers" },
    { path: "/templates", label: "Templates" },
    { path: "/help", label: "Help" },
  ];

  const isActive = (path: string) => location === path;
  
  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-30 w-full backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/dashboard">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                  <GraduationCap size={24} />
                </div>
                <span className="text-xl font-bold text-foreground">
                  ExamPrep<span className="text-primary">Pro</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div
                  className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            ))}

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-2 flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
                    <span className="text-sm font-medium">AP</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/profile" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/settings" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/help" className="flex items-center w-full">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`block pl-3 pr-4 py-2 text-base font-medium cursor-pointer ${
                      isActive(item.path)
                        ? "border-l-4 border-primary text-primary bg-primary/5"
                        : "border-l-4 border-transparent text-foreground hover:bg-muted hover:border-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
              <div className="border-t border-border pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
                      <span className="text-sm font-medium">AP</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium">Admin User</div>
                    <div className="text-sm font-medium text-muted-foreground">admin@example.com</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link href="/profile">
                    <div className="flex items-center px-4 py-2 text-base font-medium text-foreground hover:bg-muted hover:text-primary cursor-pointer">
                      <User className="mr-3 h-5 w-5" />
                      <span>Your Profile</span>
                    </div>
                  </Link>
                  <Link href="/settings">
                    <div className="flex items-center px-4 py-2 text-base font-medium text-foreground hover:bg-muted hover:text-primary cursor-pointer">
                      <Settings className="mr-3 h-5 w-5" />
                      <span>Settings</span>
                    </div>
                  </Link>
                  <Link href="/help">
                    <div className="flex items-center px-4 py-2 text-base font-medium text-foreground hover:bg-muted hover:text-primary cursor-pointer">
                      <HelpCircle className="mr-3 h-5 w-5" />
                      <span>Help & Support</span>
                    </div>
                  </Link>
                  <button 
                    className="w-full text-left flex items-center px-4 py-2 text-base font-medium text-destructive hover:bg-muted"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
