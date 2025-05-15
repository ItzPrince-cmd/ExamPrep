import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { HeroSection } from "@/components/landing/HeroSection";
import { QuestionBankFeature } from "@/components/landing/QuestionBankFeature";
import { TestCreationFeature } from "@/components/landing/TestCreationFeature";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { ParallaxStory } from "@/components/landing/ParallaxStory";
import { CTASection } from "@/components/landing/CTASection";
import { BackgroundAnimations } from "@/components/landing/BackgroundAnimations";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "@/components/theme/theme-provider";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { setTheme } = useTheme();
  
  // Force dark mode for landing page
  useEffect(() => {
    setTheme("dark");
    return () => {
      // Allow theme to be reset when navigating away
      setTheme("dark");
    };
  }, [setTheme]);
  
  // Track scroll progress for animations with optimized settings
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    smooth: 0.1 // Add some smoothing to reduce jitter
  });
  
  // Handle section changes on scroll with debounce for performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!containerRef.current) return;
        
        const sections = document.querySelectorAll(".fullscreen-section");
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach((section, index) => {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          const sectionBottom = sectionTop + section.clientHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setCurrentSection(index);
          }
        });
      }, 50); // Small debounce to improve performance
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-background">
      {/* Fixed animated background layer */}
      <BackgroundAnimations currentSection={currentSection} />
      
      {/* Main content sections */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="fullscreen-section will-change-transform">
          <HeroSection />
        </section>
        
        {/* Question Bank Feature */}
        <section className="fullscreen-section will-change-transform">
          <QuestionBankFeature scrollProgress={scrollYProgress} />
        </section>
        
        {/* Test Creation Feature */}
        <section className="fullscreen-section will-change-transform">
          <TestCreationFeature scrollProgress={scrollYProgress} />
        </section>
        
        {/* Interactive Dashboard Previews */}
        <section className="fullscreen-section will-change-transform">
          <DashboardPreview scrollProgress={scrollYProgress} />
        </section>
        
        {/* Parallax Storytelling Section */}
        <section className="fullscreen-section will-change-transform">
          <ParallaxStory />
        </section>
        
        {/* Call to Action Section */}
        <section className="fullscreen-section will-change-transform">
          <CTASection />
        </section>
      </div>
      
      {/* Navigation dots for desktop */}
      {isDesktop && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? "bg-primary w-4 h-4" 
                  : "bg-muted-foreground/30 hover:bg-primary/50"
              }`}
              onClick={() => {
                const sections = document.querySelectorAll(".fullscreen-section");
                sections[index].scrollIntoView({ behavior: "smooth" });
              }}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 