import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { MFLogo } from '@/assets/MFLogo';
import { Link, useLocation } from 'wouter';

export function Header() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

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
    { id: 'home', label: t('nav.home'), path: '/' },
    { id: 'about', label: t('nav.about'), path: '/about' },
    { id: 'education', label: 'Education', path: '/education' },
    { id: 'career', label: 'Career History', path: '/career' },
    { id: 'skills', label: t('nav.skills'), path: '/skills' },
    { id: 'projects', label: t('nav.projects'), path: '/projects' },
    { id: 'articles', label: t('nav.articles'), path: '/articles' },
    { id: 'conferences', label: t('nav.conferences'), path: '/conferences' },
    { id: 'memberships', label: 'Memberships', path: '/memberships' },
    { id: 'resume', label: 'Resume', path: '/resume' },
    { id: 'contact', label: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b relative overflow-hidden ${
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800' : 'bg-transparent border-transparent'
      }`}
      style={{
        backgroundImage: `url('/images/backgrounds/header-bg${!isScrolled ? '' : '.svg'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 py-4">
        {/* Top Row: Logo (Left), Name (Center), Profile Image (Right) */}
        <div className="flex justify-between items-center mb-4">
          {/* Logo Left */}
          <div className="flex flex-col items-center">
            <div className="flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
              <MFLogo className="w-16 h-16" />
            </div>
            {/* Theme & Language Controls under logo */}
            <div className="flex items-center space-x-2 mt-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Name Center */}
          <div 
            className="text-2xl font-bold text-center cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            MAHDIEH FAKHAR
          </div>

          {/* Profile Image Right */}
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src="/profile-image.jpg" 
              alt="Mahdieh Fakhar"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 20%' }}
            />
          </div>
        </div>

        {/* Bottom Row: Navigation (Center) */}
        <div className="hidden md:flex justify-center">
          <nav className="flex flex-wrap justify-center gap-3">
            {navItems.map(item => {
              const isActive = location === item.path || 
                (item.path !== '/' && location.startsWith(item.path));
              
              return (
                <div 
                  key={item.id}
                  className={`font-medium px-3 py-2 rounded-md transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-sm' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => window.location.href = item.path}
                >
                  {item.label}
                  {isActive && (
                    <div 
                      className="h-[3px] bg-blue-600 dark:bg-blue-400 mt-0.5 rounded-full"
                    />
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-end">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-3 pt-6">
                {navItems.map(item => {
                  const isActive = location === item.path || 
                    (item.path !== '/' && location.startsWith(item.path));
                  
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        handleMobileMenuClose();
                        window.location.href = item.path;
                      }}
                      className={`block text-lg font-medium p-2 rounded-md cursor-pointer ${
                        isActive 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <div
                          className="h-[3px] bg-blue-600 dark:bg-blue-400 mt-1 w-1/3 rounded-full"
                        />
                      )}
                    </div>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
