import { Link } from "wouter";
import { GraduationCap, Mail, Phone, Globe } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                  <GraduationCap size={24} />
                </div>
                <span className="text-xl font-bold">
                  ExamPrep<span className="text-primary">Pro</span>
                </span>
              </div>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Create, manage, and deliver exams with our modern exam preparation software.
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/question-bank">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Question Bank
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/saved-papers">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Saved Papers
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/templates">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Templates
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Help & Support
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    User Guide
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Video Tutorials
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    FAQ
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Blog
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <span>+91-7891982757</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <span>+91-9090902757</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <span>support@exampreppro.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe size={16} className="text-primary" />
                <span>www.exampreppro.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} ExamPrep Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="/help">
              <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Privacy Policy
              </span>
            </Link>
            <Link href="/help">
              <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Terms of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}