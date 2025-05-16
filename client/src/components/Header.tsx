import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { MFLogo } from '@/assets/MFLogo';

export function Header() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'about', label: t('nav.about'), url: '/about' },
    { id: 'skills', label: t('nav.skills'), url: '/skills' },
    { id: 'projects', label: t('nav.projects'), url: '/projects' },
    { id: 'conferences', label: t('nav.conferences'), url: '/conferences' },
    { id: 'education', label: t('nav.education'), url: '/education' },
    { id: 'career', label: t('nav.career'), url: '/career' },
    { id: 'articles', label: t('nav.articles'), url: '/articles' },
    { id: 'contact', label: t('nav.contact'), url: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800' : 'bg-transparent border-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold flex items-center space-x-2">
          <MFLogo className="w-8 h-8" />
          <span>مهدیه فخار</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map(item => (
            <a 
              key={item.id} 
              href={item.url} 
              className="font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation Toggle + Theme & Language Controls */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-6 pt-6">
                {navItems.map(item => (
                  <a 
                    key={item.id} 
                    href={item.url} 
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={handleMobileMenuClose}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
