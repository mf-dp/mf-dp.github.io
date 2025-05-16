import { useLanguage } from '@/context/LanguageContext';
import { FaLinkedinIn, FaGithub, FaTwitter, FaDribbble } from 'react-icons/fa';
import { MFLogo } from '@/assets/MFLogo';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'conferences', label: t('nav.conferences') },
    { id: 'articles', label: t('nav.articles') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <MFLogo className="w-8 h-8 mr-2" />
            <span className="text-xl font-bold">John Smith</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
            {navItems.map(item => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <FaLinkedinIn className="text-lg" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <FaGithub className="text-lg" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <FaTwitter className="text-lg" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
              <FaDribbble className="text-lg" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} John Smith. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
