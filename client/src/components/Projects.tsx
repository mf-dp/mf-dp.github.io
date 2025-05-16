import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { FaLink, FaGithub, FaArrowRight } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Projects() {
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

  const projects = t<any[]>('projects.items', 'projects');

  // Sample project images (since we can't directly use the binary image files)
  const projectImages = [
    "/src/assets/conference1.jpg",
    "/src/assets/conference2.jpg", 
    "/src/assets/conference3.jpg"
  ];

  return (
    <section 
      id="projects"
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
          {t('projects.title')}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden h-full transition-transform hover:-translate-y-1 hover:shadow-lg">
                <img 
                  src={projectImages[index % projectImages.length]} 
                  alt={project.title} 
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag: string, tagIdx: number) => (
                      <Badge key={tagIdx} variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <a href={project.liveDemo} className="text-primary hover:text-primary/80 flex items-center gap-1">
                      <FaLink className="text-sm" />
                      <span>Live Demo</span>
                    </a>
                    <a href={project.github} className="text-primary hover:text-primary/80 flex items-center gap-1">
                      <FaGithub className="text-sm" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
            <span>{t('projects.viewAllButton')}</span>
            <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
