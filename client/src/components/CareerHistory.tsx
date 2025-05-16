import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';

export function CareerHistory() {
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

  // Get career history from translations
  const careerData = t('career.items');
  const career = Array.isArray(careerData) ? careerData : [];

  return (
    <section 
      id="career"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {t('career.title')}
        </motion.h2>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {career.map((job, index) => (
            <motion.div 
              key={index} 
              className="relative mb-12 last:mb-0"
              variants={itemVariants}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 space-y-2">
                  <h3 className="text-xl font-semibold text-primary">{job.role}</h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{job.company}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{job.period}</p>
                </div>
                
                <div className="md:w-2/3 space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    {job.description}
                  </p>
                  
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    {job.achievements.map((achievement: string, achievementIdx: number) => (
                      <li key={achievementIdx}>{achievement}</li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.tags.map((tag: string, tagIdx: number) => (
                      <Badge key={tagIdx} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Add a divider between jobs, but not after the last one */}
              {index < career.length - 1 && (
                <div className="w-full border-t border-gray-200 dark:border-gray-700 my-8"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CareerHistory;
