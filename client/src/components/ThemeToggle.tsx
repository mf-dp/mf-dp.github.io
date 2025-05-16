import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/context/LanguageContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  
  const tooltipText = language === 'en' 
    ? (theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode')
    : (theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800"
            aria-label={tooltipText}
          >
            {theme === 'light' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThemeToggle;
