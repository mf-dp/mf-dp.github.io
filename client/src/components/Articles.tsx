import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef, useMemo } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Articles({ showAll = false }: { showAll?: boolean }) {
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

  // Get articles from translations
  const articlesData = t('articles.items');
  const articles = Array.isArray(articlesData) ? articlesData : [];

  // Group articles by type (journal articles or conference papers)
  const groupedArticles = useMemo(() => {
    // Default all existing articles to Journal type if not specified
    const journalArticles = articles.filter(article => 
      !article.type || article.type === 'journal'
    );
    const conferencePapers = articles.filter(article => 
      article.type === 'conference'
    );

    return {
      journals: journalArticles,
      conferences: conferencePapers
    };
  }, [articles]);

  // Get category color based on category name
  const getCategoryColor = (category: string) => {
    const colors = {
      'Translation Technology': 'blue',
      'Educational Technology': 'green',
      'Language Learning': 'purple',
      'Education Research': 'red',
      'Bibliometrics': 'amber',
      'Data Analysis': 'emerald',
      'Conference Paper': 'cyan',
      'Book Review': 'indigo',
      // Spanish translations
      'Tecnología de Traducción': 'blue',
      'Tecnología Educativa': 'green',
      'Aprendizaje de Idiomas': 'purple',
      'Investigación Educativa': 'red',
      'Bibliometría': 'amber',
      'Análisis de Datos': 'emerald',
      'Ponencia de Conferencia': 'cyan',
      'Reseña de Libro': 'indigo'
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
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {t('articles.title')}
        </motion.h2>
        
        <Tabs defaultValue="journals" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="journals">Journal Publications</TabsTrigger>
            <TabsTrigger value="conferences">Conference Papers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="journals">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {groupedArticles.journals.map((article: any, index: number) => {
                const color = getCategoryColor(article?.category || '');
                
                return (
                  <motion.div key={`journal-${index}`} variants={itemVariants}>
                    <Card className="overflow-hidden h-full transition-transform hover:-translate-y-1 hover:shadow-lg flex flex-col">
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <Badge 
                            variant="secondary"
                          >
                            {article?.category || 'Journal Article'}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{article?.date || ''}</span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-3">{article?.title || 'Untitled Article'}</h3>
                        
                        {article?.authors && (
                          <p className="text-sm text-gray-500 dark:text-gray-500 mb-2 italic">
                            {article.authors}
                          </p>
                        )}
                        
                        {article?.journal && (
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {article.journal}
                            {article.volume && article.issue && `, ${article.volume}(${article.issue})`}
                            {article.pages && `, pp. ${article.pages}`}
                          </p>
                        )}
                        
                        {article?.publisher && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {article.publisher}
                          </p>
                        )}
                        
                        {article?.editors && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Editors: {article.editors}
                          </p>
                        )}
                        
                        {article?.doi && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            DOI: {article.doi}
                          </p>
                        )}
                        
                        {article?.isbn && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            ISBN: {article.isbn}
                          </p>
                        )}
                        
                        <p className="text-gray-600 dark:text-gray-400 mt-3 mb-6 flex-grow">
                          {article?.description || ''}
                        </p>
                        
                        <a 
                          href={article?.link || '#'} 
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
          </TabsContent>
          
          <TabsContent value="conferences">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {groupedArticles.conferences.map((article: any, index: number) => {
                return (
                  <motion.div key={`conference-${index}`} variants={itemVariants}>
                    <Card className="overflow-hidden h-full transition-transform hover:-translate-y-1 hover:shadow-lg flex flex-col">
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <Badge 
                            variant="secondary"
                          >
                            {article?.category || 'Conference Paper'}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{article?.date || ''}</span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-3">{article?.title || 'Untitled Paper'}</h3>
                        
                        {article?.authors && (
                          <p className="text-sm text-gray-500 dark:text-gray-500 mb-2 italic">
                            {article.authors}
                          </p>
                        )}
                        
                        {article?.venue && (
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {article.venue}
                          </p>
                        )}
                        
                        {article?.publisher && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {article.publisher}
                          </p>
                        )}
                        
                        {article?.isbn && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            ISBN: {article.isbn}
                          </p>
                        )}
                        
                        <p className="text-gray-600 dark:text-gray-400 mt-3 mb-6 flex-grow">
                          {article?.description || ''}
                        </p>
                        
                        <a 
                          href={article?.link || '#'} 
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
          </TabsContent>
        </Tabs>
        
        {!showAll && (
          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <a href="/articles" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
              <span>{t('articles.viewAllButton')}</span>
              <FaArrowRight />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Articles;
