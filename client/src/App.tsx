import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import SkillsPage from "@/pages/SkillsPage";
import ResumePage from "@/pages/ResumePage";
import ConferencesPage from "@/pages/ConferencesPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ArticlesPage from "@/pages/ArticlesPage";
import ContactPage from "@/pages/ContactPage";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/skills" component={SkillsPage} />
      <Route path="/resume" component={ResumePage} />
      <Route path="/conferences" component={ConferencesPage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/articles" component={ArticlesPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

// This component handles setting up the background image globally
function BackgroundSetup() {
  useEffect(() => {
    // Add CSS for the fixed background globally
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        margin: 0;
        padding: 0;
        background-image: url('/images/ai-background.png');
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
      }
      
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 0;
        pointer-events: none;
      }
      
      #root {
        position: relative;
        z-index: 1;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Clean up if needed
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <BackgroundSetup />
            <SEO />
            <Layout>
              <Toaster />
              <Router />
            </Layout>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
