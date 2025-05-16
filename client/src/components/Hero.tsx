import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { Link } from 'wouter';

export function Hero() {
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

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 md:py-32"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="md:w-1/2 space-y-6" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-primary">{t('hero.title').split(' ')[0]}</span>{' '}
              {t('hero.title').split(' ').slice(1).join(' ')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  {t('hero.contactButton')}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects">
                  {t('hero.projectsButton')}
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 flex justify-center md:justify-end"
            variants={itemVariants}
          >
            <img 
              src="/src/assets/mahdieh-profile.jpg" 
              alt="MAHDIEH FAKHAR Professional Headshot" 
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl" 
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -z-10 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl"></div>
    </section>
  );
}

export default Hero;
