import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Articles() {
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

  const articles = t<any[]>('articles.items', 'articles');

  // Get category color based on category name
  const getCategoryColor = (category: string) => {
    const colors = {
      'UX Design': 'blue',
      'Development': 'green',
      'Design Systems': 'purple',
      'User Research': 'red',
      'Diseño UX': 'blue',
      'Desarrollo': 'green',
      'Sistemas de Diseño': 'purple',
      'Investigación de Usuario': 'red'
    };
    
    return colors[category as keyof typeof colors] || 'gray';
  };

  return (
    <section 
      id="articles"
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
          {t('articles.title')}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {articles.map((article, index) => {
            const color = getCategoryColor(article.category);
            
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden h-full transition-transform hover:-translate-y-1 hover:shadow-lg flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <Badge 
                        className={`bg-${color}-100 dark:bg-${color}-900/30 text-${color}-800 dark:text-${color}-300`}
                        variant="secondary"
                      >
                        {article.category}
                      </Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{article.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                      {article.description}
                    </p>
                    
                    <a 
                      href={article.link} 
                      className="text-primary hover:text-primary/80 flex items-center gap-1 mt-auto self-start"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{t('articles.readArticle')}</span>
                      <FaArrowRight className="text-sm" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
            <span>{t('articles.viewAllButton')}</span>
            <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Articles;
