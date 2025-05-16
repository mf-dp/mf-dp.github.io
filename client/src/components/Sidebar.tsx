import { MFLogo } from '@/assets/MFLogo';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'wouter';

export function Sidebar() {
  const { t } = useLanguage();
  
  const navItems = [
    { id: 'home', label: t('nav.home'), path: '/' },
    { id: 'about', label: t('nav.about'), path: '/about' },
    { id: 'skills', label: t('nav.skills'), path: '/skills' },
    { id: 'projects', label: t('nav.projects'), path: '/projects' },
    { id: 'conferences', label: t('nav.conferences'), path: '/conferences' },
    { id: 'articles', label: t('nav.articles'), path: '/articles' },
    { id: 'contact', label: t('nav.contact'), path: '/contact' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transform transition-transform">
      <div className="p-5">
        <div className="flex items-center justify-center mb-8">
          <MFLogo className="w-16 h-16" />
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold">MAHDIEH FAKHAR</h2>
        </div>
        
        <nav className="space-y-2">
          {navItems.map(item => (
            <Link 
              key={item.id} 
              href={item.path}
              className="flex items-center px-4 py-2.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors"
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;