import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Conferences from "@/components/Conferences";
import Education from "@/components/Education";
import CareerHistory from "@/components/CareerHistory";
import Articles from "@/components/Articles";
import Contact from "@/components/Contact";
import Resume from "@/components/Resume";
import Memberships from "@/components/Memberships";
import Footer from "@/components/Footer";

export default function HomePage() {
  const { t, language } = useLanguage();

  // Set document title and meta description based on language
  useEffect(() => {
    document.title = t("meta.title");
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("meta.description"));
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.name = "description";
      newMetaDescription.content = t("meta.description");
      document.head.appendChild(newMetaDescription);
    }
    
    // Set language attribute on html element
    document.documentElement.lang = language;
  }, [t, language]);

  // Implement smooth scrolling
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        if (!id) return;
        
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Conferences />
        <Education />
        <CareerHistory />
        <Articles />
        <Memberships />
        <Resume />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
