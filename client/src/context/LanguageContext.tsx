import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "@/data/translations";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section?: string) => string;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Check if user has a language preference in localStorage or use browser language
  const getInitialLanguage = (): Language => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language | null;
      
      if (savedLanguage) {
        return savedLanguage;
      }
      
      // Get browser language (first 2 chars)
      const browserLang = navigator.language.substring(0, 2);
      return browserLang === "es" ? "es" : "en"; // Default to en for anything other than Spanish
    }
    
    return "en"; // Default to English
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  // Translation helper function
  const t = (key: string, section?: string): string => {
    try {
      const keys = key.split(".");
      
      // If section is provided, use it as the base path
      let path = section ? [section, ...keys] : keys;
      
      // Access the translation object with the generated path
      return path.reduce((obj, k) => obj[k], translations[language] as any) || key;
    } catch (error) {
      // Return the key if translation not found
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    closeMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: changeLanguage, 
        t, 
        isMenuOpen, 
        toggleMenu, 
        closeMenu 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
