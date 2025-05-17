import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef, useState, useEffect } from 'react';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Articles() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const [searchTopic, setSearchTopic] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Track actual query for API call

  // Define animation variants
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

  // Fetch article recommendations based on search topic
  const { data: searchResults, isLoading: searchLoading } = useQuery({
    queryKey: ['/api/articles/search', searchQuery],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!searchQuery, // Only run query when searchQuery is not empty
  });

  // Fetch all articles when no search is performed
  const { data: allArticlesData, isLoading: allArticlesLoading } = useQuery({
    queryKey: ['/api/articles'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !searchQuery, // Only run query when searchQuery is empty
  });
  
  // Determine which articles to display
  const articlesData = searchQuery ? 
    searchResults?.data : 
    allArticlesData?.data;
  
  const articles = Array.isArray(articlesData) ? articlesData : [];
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchTopic);
  };
  
  // Reset search
  const handleReset = () => {
    setSearchTopic('');
    setSearchQuery('');
  };

  // Get category color based on category name for visual distinction
  const getCategoryColor = (category: string) => {
    const colors = {
      'Research Methods': 'blue',
      'Data Analysis': 'green',
      'Education': 'purple',
      'Educational Technology': 'indigo',
      'Data Science': 'red',
      'Network Analysis': 'emerald',
      'Research Evaluation': 'amber',
      'Data Sources': 'cyan',
      // Spanish translations
      'Métodos de Investigación': 'blue',
      'Análisis de Datos': 'green',
      'Educación': 'purple',
      'Tecnología Educativa': 'indigo',
      'Ciencia de Datos': 'red',
      'Análisis de Redes': 'emerald',
      'Evaluación de Investigación': 'amber',
      'Fuentes de Datos': 'cyan'
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
          {articles.map((article: any, index: number) => {
            const color = getCategoryColor(article?.category || '');
            
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden h-full transition-transform hover:-translate-y-1 hover:shadow-lg flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <Badge 
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                        variant="secondary"
                      >
                        {article?.category || 'Uncategorized'}
                      </Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{article?.date || ''}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{article?.title || 'Untitled Article'}</h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
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
      </div>
    </section>
  );
}

export default Articles;
