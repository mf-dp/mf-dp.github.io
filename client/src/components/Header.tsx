import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { MFLogo } from '@/assets/MFLogo';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';

export function Header() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  // Remove debugging log

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
    >
      {/* Background decoration */}
      <div 
        className="absolute inset-0 w-full h-full transition-opacity duration-500 dark:opacity-0"
        style={{
          backgroundImage: `url('/images/backgrounds/header-bg.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isScrolled ? 0.7 : 1,
        }}
      />
      <div 
        className="absolute inset-0 w-full h-full transition-opacity duration-500 opacity-0 dark:opacity-100"
        style={{
          backgroundImage: `url('/images/backgrounds/header-bg-dark.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isScrolled ? 0.7 : 1,
        }}
      />
      <div className="container mx-auto px-4 py-4">
        {/* Top Row: Logo (Left), Name (Center), Profile Image (Right) */}
        <div className="flex justify-between items-center mb-4">
          {/* Logo Left */}
          <div className="flex flex-col items-center">
            <Link href="/" className="flex items-center">
              <MFLogo className="w-16 h-16" />
            </Link>
            {/* Theme & Language Controls under logo */}
            <div className="flex items-center space-x-2 mt-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Name Center */}
          <Link href="/" className="text-2xl font-bold text-center">
            MAHDIEH FAKHAR
          </Link>

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
            {/* Home button */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/" 
                className="font-medium px-3 py-2 rounded-md transition-all duration-300 bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 shadow-sm"
              >
                {t('nav.home')}
                <motion.div
                  className="h-[3px] bg-teal-600 dark:bg-teal-400 mt-0.5 rounded-full"
                  layoutId="activeNavIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            
            {/* About button */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/about" 
                className="font-medium px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t('nav.about')}
              </Link>
            </motion.div>
            
            {/* Skills button */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/skills" 
                className="font-medium px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t('nav.skills')}
              </Link>
            </motion.div>
            
            {/* Projects button */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/projects" 
                className="font-medium px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t('nav.projects')}
              </Link>
            </motion.div>
            
            {/* Articles button */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/articles" 
                className="font-medium px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t('nav.articles')}
              </Link>
            </motion.div>
            
            {/* Conferences button */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/conferences" 
                className="font-medium px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t('nav.conferences')}
              </Link>
            </motion.div>
            
            {/* Contact button */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact" 
                className="font-medium px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t('nav.contact')}
              </Link>
            </motion.div>
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
                {/* Home link - active */}
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/" 
                    className="block text-lg font-medium p-2 rounded-md bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300"
                    onClick={handleMobileMenuClose}
                  >
                    {t('nav.home')}
                    <motion.div
                      className="h-[3px] bg-teal-600 dark:bg-teal-400 mt-1 w-1/3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '33%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
                
                {/* About link */}
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/about" 
                    className="block text-lg font-medium p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={handleMobileMenuClose}
                  >
                    {t('nav.about')}
                  </Link>
                </motion.div>
                
                {/* Skills link */}
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/skills" 
                    className="block text-lg font-medium p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={handleMobileMenuClose}
                  >
                    {t('nav.skills')}
                  </Link>
                </motion.div>
                
                {/* Projects link */}
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/projects" 
                    className="block text-lg font-medium p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={handleMobileMenuClose}
                  >
                    {t('nav.projects')}
                  </Link>
                </motion.div>
                
                {/* Articles link */}
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/articles" 
                    className="block text-lg font-medium p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={handleMobileMenuClose}
                  >
                    {t('nav.articles')}
                  </Link>
                </motion.div>
                
                {/* Conferences link */}
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/conferences" 
                    className="block text-lg font-medium p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={handleMobileMenuClose}
                  >
                    {t('nav.conferences')}
                  </Link>
                </motion.div>
                
                {/* Contact link */}
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/contact" 
                    className="block text-lg font-medium p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={handleMobileMenuClose}
                  >
                    {t('nav.contact')}
                  </Link>
                </motion.div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
