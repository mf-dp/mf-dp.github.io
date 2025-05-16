import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { FaLinkedin, FaGithub, FaGlobe, FaFileAlt } from 'react-icons/fa';
import { LazyImage } from '@/components/ui/lazy-image';
// Use direct path to image in public folder
const profileImagePath = '/images/profile.jpg';

export function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {t('about.title')}
        </motion.h2>
        
        <motion.div 
          className="flex flex-col md:flex-row gap-10 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            className="md:w-2/5"
            variants={itemVariants}
          >
            <div className="relative rounded-lg overflow-hidden shadow-lg border-4 border-white dark:border-gray-800 shadow-primary/20">
              <LazyImage 
                src={profileImagePath} 
                alt="Mahdieh Fakhar" 
                className="w-full h-auto rounded-lg" 
                placeholderBlur={true}
                placeholderColor="#f3f4f6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-30 rounded-lg"></div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-3/5 space-y-6"
            variants={containerVariants}
          >
            <motion.h3 
              className="text-2xl font-semibold text-primary"
              variants={itemVariants}
            >
              {t('about.name')}
            </motion.h3>
            
            <motion.h4 
              className="text-xl text-gray-600 dark:text-gray-400"
              variants={itemVariants}
            >
              {t('about.role')}
            </motion.h4>
            
            <motion.p 
              className="text-gray-700 dark:text-gray-300"
              variants={itemVariants}
            >
              {t('about.bio')}
            </motion.p>
            
            <motion.p 
              className="text-gray-700 dark:text-gray-300"
              variants={itemVariants}
            >
              {t('about.bio2')}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              <a 
                href="https://www.linkedin.com/in/mahdieh-fakhar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-primary/80 flex items-center gap-2 transition-colors duration-300"
              >
                <FaLinkedin className="text-xl" />
                <span>{t('about.linkedin')}</span>
              </a>
              <a 
                href="https://github.com/mahdieh-fakhar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-primary/80 flex items-center gap-2 transition-colors duration-300"
              >
                <FaGithub className="text-xl" />
                <span>{t('about.github')}</span>
              </a>
              <a 
                href="https://mahdieh-fakhar.github.io/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-primary/80 flex items-center gap-2 transition-colors duration-300"
              >
                <FaGlobe className="text-xl" />
                <span>{t('about.website')}</span>
              </a>
              <a 
                href="#resume" 
                className="text-primary hover:text-primary/80 flex items-center gap-2 transition-colors duration-300"
              >
                <FaFileAlt className="text-xl" />
                <span>{t('about.resumeLink')}</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
