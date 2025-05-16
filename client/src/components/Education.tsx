import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { FaGraduationCap, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';

export function Education() {
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

  const education = t<any[]>('education.items', 'education');

  return (
    <section 
      id="education"
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
          {t('education.title')}
        </motion.h2>
        
        <motion.div 
          className="max-w-3xl mx-auto space-y-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {education.map((item, index) => (
            <motion.div 
              key={index} 
              className="relative pl-10 pb-10 border-l-2 border-gray-200 dark:border-gray-700"
              variants={itemVariants}
            >
              <div className="absolute -left-2.5 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                {item.degree.includes('Certification') ? (
                  <FaCertificate className="text-white text-xs" />
                ) : (
                  <FaGraduationCap className="text-white text-xs" />
                )}
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg ml-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{item.degree}</h3>
                  <span className="text-sm font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                    {item.period}
                  </span>
                </div>
                
                <h4 className="text-lg text-gray-700 dark:text-gray-300 mb-4">{item.institution}</h4>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {item.description}
                </p>
                
                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag: string, tagIdx: number) => (
                      <Badge key={tagIdx} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {item.certificate && (
                  <a href={item.certificate} className="text-primary hover:text-primary/80 flex items-center gap-1 mt-2">
                    <span>View Certificate</span>
                    <FaExternalLinkAlt className="text-sm" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Education;
