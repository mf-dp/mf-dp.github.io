import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { SEO } from "@/components/SEO";

function Router() {
  return (
    <Switch>
      <Route path="/">
        {(params) => <HomePage />}
      </Route>
      <Route path="/about">
        {(params) => <HomePage initialSection="about" />}
      </Route>
      <Route path="/skills">
        {(params) => <HomePage initialSection="skills" />}
      </Route>
      <Route path="/education">
        {(params) => <HomePage initialSection="education" />}
      </Route>
      <Route path="/career">
        {(params) => <HomePage initialSection="career" />}
      </Route>
      <Route path="/projects">
        {(params) => <HomePage initialSection="projects" />}
      </Route>
      <Route path="/articles">
        {(params) => <HomePage initialSection="articles" />}
      </Route>
      <Route path="/conferences">
        {(params) => <HomePage initialSection="conferences" />}
      </Route>
      <Route path="/contact">
        {(params) => <HomePage initialSection="contact" />}
      </Route>
      <Route>
        {(params) => <NotFound />}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <SEO />
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
