import { useLanguage } from '@/context/LanguageContext';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef, useState, useEffect } from 'react';
import { FaLink, FaGithub, FaArrowRight, FaCode, FaLaptopCode, FaDatabase, FaMobileAlt, FaRobot, FaServer } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Projects() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10,
        duration: 0.7 
      } 
    }
  };
  
  const imageVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const tagVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.4
      }
    })
  };
  
  const linkIconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  // Get projects from translations
  const projectsData = t('projects.items');
  const projects = Array.isArray(projectsData) ? projectsData : [];

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
      className="py-24 relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 md:w-[600px] md:h-[600px] bg-gradient-to-br from-purple-100/20 to-blue-100/10 dark:from-purple-900/10 dark:to-blue-900/5 rounded-full blur-3xl"
          animate={{ 
            scale: [0.8, 1, 0.8],
            opacity: [0.3, 0.5, 0.3], 
            y: [0, -20, 0],
            x: [0, 20, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute top-1/4 -left-24 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-tr from-blue-100/20 to-purple-100/10 dark:from-blue-900/10 dark:to-purple-900/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2], 
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { 
                duration: 0.7, 
                ease: "easeOut" 
              } 
            }
          }}
        >
          {t('projects.title')}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="overflow-hidden h-full shadow-lg hover:shadow-xl border border-transparent hover:border-primary/10 transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <motion.div 
                  className="relative overflow-hidden"
                  variants={imageVariants}
                  initial="initial"
                  animate={hoveredProject === index ? "hover" : "initial"}
                >
                  <img 
                    src={projectImages[index % projectImages.length]} 
                    alt={project.title} 
                    className="w-full h-48 object-cover transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                    <div className="text-white text-sm">
                      <p className="font-medium">{t('projects.viewDetails')}</p>
                    </div>
                  </div>
                </motion.div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag: string, tagIdx: number) => (
                      <motion.div 
                        key={tagIdx} 
                        custom={tagIdx} 
                        variants={tagVariants}
                        initial="initial" 
                        animate="animate"
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-blue-300 border border-purple-200 dark:border-blue-800/30"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.div
                      variants={linkIconVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <a href={project.liveDemo} className="text-primary hover:text-purple-600 flex items-center gap-1 transition-colors">
                        <FaLink className="text-sm" />
                        <span>Live Demo</span>
                      </a>
                    </motion.div>
                    
                    <motion.div
                      variants={linkIconVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      <a href={project.github} className="text-primary hover:text-purple-600 flex items-center gap-1 transition-colors">
                        <FaGithub className="text-sm" />
                        <span>GitHub</span>
                      </a>
                    </motion.div>
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
          <a href="/projects" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
            <span>{t('projects.viewAllButton')}</span>
            <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
