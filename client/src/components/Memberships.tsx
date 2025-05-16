import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';

export function Memberships() {
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

  // Get memberships from translations
  const membershipsData = t('memberships.items');
  const memberships = Array.isArray(membershipsData) ? membershipsData : [];

  return (
    <section 
      id="memberships"
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
          {t('memberships.title')}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {memberships.map((membership, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transition-transform hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <FaUsers className="text-primary text-xl" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{membership.organization}</h3>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 dark:text-gray-400">{membership.role}</span>
                    <span className="text-sm bg-gray-100 dark:bg-gray-700 py-1 px-2 rounded-full">
                      {membership.period}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 flex-grow">
                    {membership.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Memberships;
