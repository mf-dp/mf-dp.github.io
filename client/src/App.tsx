import { useEffect } from "react";
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
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { SEO } from "@/components/SEO";

function Router() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    // Set the document language
    document.documentElement.lang = language;
    
    // Set dark mode class on html element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, language]);

  return (
    <>
      <SEO 
        title="Mahdieh Fakhar | Data Scientist & Researcher"
        description="Personal website of Mahdieh Fakhar - Data Science & Big Data professional specializing in data analysis, scientometrics, and bibliometrics."
        keywords="Mahdieh Fakhar, Data Science, Big Data, Research, Academic, UNIR, UNED, Machine Learning, Data Analysis, Scientometrics, Bibliometrics"
      />
      <Toaster />
      <div className="min-h-screen font-sans bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
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
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
