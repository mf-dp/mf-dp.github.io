import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'wouter';

export function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Skills carousel
  const skills = ["Data Scientist", "Researcher", "AI Expert", "Machine Learning Engineer", "Innovator"];
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
    
    // Skills carousel animation
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skills.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isInView, controls, skills.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10,
        duration: 0.7 
      } 
    }
  };
  
  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: 90 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        duration: 1.2
      }
    }
  };
  
  const skillVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 py-24 md:py-40 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 -z-10 w-80 h-80 md:w-[500px] md:h-[500px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 0.8, 
            scale: [0.8, 1.1, 0.9], 
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 -z-10 w-80 h-80 md:w-[500px] md:h-[500px] bg-gradient-to-tr from-accent/10 to-accent/5 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 0.8, 
            scale: [0.9, 1.2, 0.8], 
            x: [0, -20, 20, 0],
            y: [0, 20, -20, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/3 w-32 h-32 md:w-60 md:h-60 bg-purple-300/10 dark:bg-purple-600/10 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.4, 0.6, 0.4], 
            scale: [0.8, 1, 0.8],
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div
          className="absolute right-20 bottom-10 hidden md:block w-4 h-4 bg-primary rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute left-1/4 top-20 hidden md:block w-3 h-3 bg-accent rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute right-1/3 top-1/3 hidden md:block w-2 h-2 bg-yellow-400 rounded-full"
          animate={{
            y: [0, -8, 0],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div className="md:w-1/2 space-y-8" variants={itemVariants}>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              variants={itemVariants}
            >
              <motion.span 
                className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('hero.title').split(' ')[0]}
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t('hero.title').split(' ').slice(1).join(' ')}
              </motion.span>
            </motion.h1>
            
            <motion.div 
              className="flex items-center h-8 text-xl md:text-2xl text-gray-700 dark:text-gray-300"
              variants={itemVariants}
            >
              <span className="mr-2">I am a</span>
              <div className="h-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={skillVariants}
                    transition={{ duration: 0.5 }}
                    className="font-semibold text-primary"
                  >
                    {skills[activeIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-2"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button size="lg" className="text-base relative overflow-hidden group" asChild>
                  <Link href="/contact">
                    <span className="relative z-10">{t('hero.contactButton')}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button variant="outline" size="lg" className="text-base relative overflow-hidden group" asChild>
                  <Link href="/projects">
                    <span className="relative z-10">{t('hero.projectsButton')}</span>
                    <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center md:justify-end relative"
            variants={imageVariants}
          >
            <motion.div
              className="absolute -z-10 w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full opacity-75 blur"
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, 360]
                }}
                transition={{ 
                  opacity: { duration: 3, repeat: Infinity, repeatType: "reverse" },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
              />
              <img 
                src="/images/profile/mahdieh-profile.jpg" 
                alt="MAHDIEH FAKHAR Professional Headshot" 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl relative z-10" 
                style={{ objectPosition: '50% 10%' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
