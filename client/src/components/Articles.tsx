import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import React, { useRef, useState, useEffect } from 'react';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Define article interface
interface ArticleItem {
  title: string;
  description: string;
  category: string;
  date: string;
  link: string;
  tags: string[];
}

export function Articles() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const [searchTopic, setSearchTopic] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
  const { 
    data: searchResultsResponse, 
    isLoading: searchLoading 
  } = useQuery({
    queryKey: ['/api/articles/search', searchQuery],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!searchQuery, // Only run query when searchQuery is not empty
  });

  // Fetch all articles when no search is performed
  const { 
    data: allArticlesResponse, 
    isLoading: allArticlesLoading 
  } = useQuery({
    queryKey: ['/api/articles'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !searchQuery, // Only run query when searchQuery is empty
  });
  
  // Extract articles from response data - fallback to hardcoded data if API fails
  let articles: ArticleItem[] = [];
  
  // Hardcoded articles for fallback
  const fallbackArticles: ArticleItem[] = [
    {
      title: "The Impact of Bibliometrics on Academic Research",
      description: "This article explores how bibliometric analysis influences research priorities and academic publishing.",
      category: "Research Methods",
      date: "May 2, 2025",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=bibliometrics+academic+research+impact&btnG=",
      tags: ["bibliometrics", "academic research", "research evaluation", "citation analysis"]
    },
    {
      title: "Advanced Techniques in Scientometric Analysis",
      description: "A comprehensive overview of cutting-edge scientometric methods and their applications in academic research.",
      category: "Data Analysis",
      date: "April 15, 2025",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=scientometric+analysis+techniques&btnG=",
      tags: ["scientometrics", "data visualization", "research mapping", "citation networks"]
    },
    {
      title: "Linguistic Corpora Analysis in Educational Research",
      description: "How linguistic data analysis can inform educational practice and policy through evidence-based research.",
      category: "Education",
      date: "March 21, 2025",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=linguistic+corpora+educational+research&btnG=",
      tags: ["linguistics", "education", "corpus analysis", "language teaching"]
    },
    {
      title: "Big Data Analytics in Higher Education Assessment",
      description: "Exploring the potential of big data to transform assessment practices in higher education institutions.",
      category: "Educational Technology",
      date: "February 8, 2025",
      link: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=big+data+analytics+higher+education+assessment&btnG=",
      tags: ["big data", "assessment", "higher education", "analytics"]
    }
  ];
  
  // Try to use API data if available, otherwise use fallback data
  if (searchQuery && searchResultsResponse?.success && Array.isArray(searchResultsResponse.data)) {
    articles = searchResultsResponse.data;
  } else if (!searchQuery && allArticlesResponse?.success && Array.isArray(allArticlesResponse.data)) {
    articles = allArticlesResponse.data;
  } else {
    // Use fallback articles when API fails
    articles = fallbackArticles;
  }
  
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
  const getCategoryColor = (category: string): string => {
    const colors: {[key: string]: string} = {
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
    
    return colors[category] || 'gray';
  };

  return (
    <section 
      id="articles"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900"
      style={{
        backgroundImage: `url('/images/backgrounds/articles-bg.svg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
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
        
        <motion.div
          className="max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSearch} className="flex gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <Input
              type="text"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              placeholder={t('articles.searchPlaceholder') || "Search for articles by topic..."}
              className="flex-1"
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <FaSearch className="mr-2" />
              {t('articles.search') || "Search"}
            </Button>
            {searchQuery && (
              <Button type="button" variant="outline" onClick={handleReset}>
                {t('articles.reset') || "Reset"}
              </Button>
            )}
          </form>
        </motion.div>
        
        {/* Loading state */}
        {(searchLoading || allArticlesLoading) && (
          <div className="text-center py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center space-x-2"
            >
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse delay-75"></div>
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse delay-150"></div>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              {searchQuery 
                ? (t('articles.searchingFor') || "Searching for") + ` "${searchQuery}"...`
                : t('articles.loadingArticles') || "Loading articles..."}
            </p>
          </div>
        )}

        {/* Search results or all articles */}
        {!searchLoading && !allArticlesLoading && (
          <>
            {searchQuery && (
              <motion.div 
                className="mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-600 dark:text-gray-400">
                  {articles.length === 0 
                    ? (t('articles.noResults') || "No results found for") + ` "${searchQuery}"`
                    : (t('articles.resultsFound') || `Found ${articles.length} results for "${searchQuery}"`)}
                </p>
              </motion.div>
            )}
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {articles.map((article: ArticleItem, index: number) => {
                const categoryColor = getCategoryColor(article?.category || '');
                
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                            {article?.category || 'Uncategorized'}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{article?.date || ''}</span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-3 line-clamp-2">{article?.title || 'Untitled Article'}</h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow line-clamp-3">
                          {article?.description || ''}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article?.tags?.slice(0, 3).map((tag: string, i: number) => (
                            <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <a 
                          href={article?.link || '#'} 
                          className="text-primary hover:text-primary/80 flex items-center gap-1 mt-auto self-start transition-all hover:translate-x-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{t('articles.readArticle') || "Read Article"}</span>
                          <FaArrowRight className="text-sm" />
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
        
        <motion.div 
          className="mt-12 text-center"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a 
            href="/articles" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full shadow-sm hover:shadow transition-all duration-300 backdrop-blur-sm"
          >
            <span>{t('articles.viewAllButton') || "View All Articles"}</span>
            <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Articles;