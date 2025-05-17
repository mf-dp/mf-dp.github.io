import { useLanguage } from '@/context/LanguageContext';
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MFLogo } from '@/assets/MFLogo';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { id: 'home', label: t('nav.home'), href: '/' },
    { id: 'about', label: t('nav.about'), href: '/about' },
    { id: 'education', label: 'Education', href: '/education' },
    { id: 'career', label: 'Career History', href: '/career' },
    { id: 'skills', label: t('nav.skills'), href: '/skills' },
    { id: 'projects', label: t('nav.projects'), href: '/projects' },
    { id: 'articles', label: t('nav.articles'), href: '/articles' },
    { id: 'conferences', label: t('nav.conferences'), href: '/conferences' },
    { id: 'memberships', label: 'Memberships', href: '/memberships' },
    { id: 'resume', label: 'Resume', href: '/resume' },
    { id: 'contact', label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center mb-4">
              <MFLogo className="w-12 h-12 mr-3" />
              <span className="text-xl font-bold">MAHDIEH FAKHAR</span>
            </div>
            <p className="text-gray-400 mb-4">
              Data Science & Big Data Professional specializing in data analysis, scientometrics, and bibliometrics.
            </p>
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Mahdieh Fakhar. {t('footer.rights')}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map(item => (
                <a 
                  key={item.id} 
                  href={item.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-gray-400">✉</span>
                <a href="mailto:mfsh.intl@gmail.com" className="text-gray-400 hover:text-white">mfsh.intl@gmail.com</a>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400">📞</span>
                <a href="tel:+34624810166" className="text-gray-400 hover:text-white">+34 624 81 01 66</a>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400">💬</span>
                <span className="text-gray-400">WhatsApp</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400">💬</span>
                <span className="text-gray-400">Telegram</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <a 
                href="https://www.linkedin.com/in/mahdieh-fakhar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
              <a 
                href="https://github.com/mahdieh-fakhar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaGithub className="text-lg" />
              </a>
              <a 
                href="https://twitter.com/mahdieh_fakhar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a 
                href="https://instagram.com/mahdieh_fakhar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
