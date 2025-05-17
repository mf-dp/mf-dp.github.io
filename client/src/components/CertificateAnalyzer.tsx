import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FaUniversity, FaMapMarkerAlt, FaCalendarAlt, FaAward, FaTags } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn, apiRequest } from '@/lib/queryClient';

export interface CertificateAnalysisData {
  organizer: string;
  location: string;
  dateRange: string;
  conferenceTitle: string;
  certificateType: string;
  role: string;
  topic: string;
}

interface CertificateAnalyzerProps {
  filename: string;
  onAnalysisComplete?: (data: CertificateAnalysisData) => void;
}

export function CertificateAnalyzer({ filename, onAnalysisComplete }: CertificateAnalyzerProps) {
  const [analysisDisplayed, setAnalysisDisplayed] = useState(false);
  
  const { data: response, isLoading, error } = useQuery({
    queryKey: [`/api/certificates/analyze/${filename}`],
    queryFn: getQueryFn({ on401: "returnNull" }),
    // Only fetch once when the component is mounted
    staleTime: Infinity,
  });
  
  // Type assertion to handle the response format from the API
  const analysis: CertificateAnalysisData | null = response && 'data' in response 
    ? (response.data as CertificateAnalysisData) 
    : null;
  
  useEffect(() => {
    if (analysis && onAnalysisComplete && !analysisDisplayed) {
      onAnalysisComplete(analysis);
      setAnalysisDisplayed(true);
    }
  }, [analysis, onAnalysisComplete, analysisDisplayed]);
  
  if (isLoading) {
    return (
      <Card className="border border-blue-200 dark:border-blue-800 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="h-6 bg-blue-100 dark:bg-blue-900/30 animate-pulse rounded w-3/4"></div>
            <div className="h-6 bg-blue-100 dark:bg-blue-900/30 animate-pulse rounded"></div>
            <div className="h-6 bg-blue-100 dark:bg-blue-900/30 animate-pulse rounded w-5/6"></div>
            <div className="h-6 bg-blue-100 dark:bg-blue-900/30 animate-pulse rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error || !analysis) {
    return (
      <Card className="border border-red-200 dark:border-red-800 bg-white/70 dark:bg-gray-800/70">
        <CardContent className="p-4">
          <p className="text-red-500 dark:text-red-400">
            {error ? 'Error analyzing certificate' : 'No analysis data available'}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border border-blue-200 dark:border-blue-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardContent className="p-4 space-y-3">
        <motion.div 
          className="flex items-center text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <FaUniversity className="mr-2 text-primary dark:text-primary" />
          <span>{analysis.organizer}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <FaMapMarkerAlt className="mr-2 text-primary dark:text-primary" />
          <span>{analysis.location}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <FaCalendarAlt className="mr-2 text-primary dark:text-primary" />
          <span>{analysis.dateRange}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <FaAward className="mr-2 text-primary dark:text-primary" />
          <span>{analysis.role}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <FaTags className="mr-2 text-primary dark:text-primary" />
          <span>{analysis.topic}</span>
        </motion.div>
      </CardContent>
    </Card>
  );
}