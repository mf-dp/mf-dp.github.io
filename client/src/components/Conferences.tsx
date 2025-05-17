import { useLanguage } from '@/context/LanguageContext';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef, useState, useEffect } from 'react';
import { FaArrowRight, FaMapMarkerAlt, FaChevronRight, FaCalendarAlt, FaGraduationCap, FaMicrophone, FaUsers, FaUniversity, FaCertificate } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { LazyImage } from '@/components/ui/lazy-image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// Conference certificates images
const conferenceCertificates = [
  { id: 1, path: '/images/conferences/2021.03.09-10.jpg', year: 2021 },
  { id: 2, path: '/images/conferences/2019.11.20-21.jpg', year: 2019 },
  { id: 3, path: '/images/conferences/2019.10.25.01.jpg', year: 2019 },
  { id: 4, path: '/images/conferences/2019.10.25.02.jpg', year: 2019 },
  { id: 5, path: '/images/conferences/2019.01-02.30-01.01.jpg', year: 2019 },
  { id: 6, path: '/images/conferences/2019.01-02.30-01.02.jpg', year: 2019 },
  { id: 7, path: '/images/conferences/2019.01-02.30-01.03.jpg', year: 2019 },
  { id: 8, path: '/images/conferences/2018.11.14-16.jpg', year: 2018 },
  { id: 9, path: '/images/conferences/2018.09.04-05.jpg', year: 2018 },
  { id: 10, path: '/images/conferences/2018.04.25-27.jpg', year: 2018 },
  { id: 11, path: '/images/conferences/2017.01.25-27.jpg', year: 2017 },
  { id: 12, path: '/images/conferences/2016.11.16-18.jpg', year: 2016 },
  { id: 13, path: '/images/conferences/2016.05.12-13.jpg', year: 2016 },
  { id: 14, path: '/images/conferences/2015.11.17-19.01.jpg', year: 2015 },
  { id: 15, path: '/images/conferences/2015.11.17-19.02.jpg', year: 2015 },
  { id: 16, path: '/images/conferences/2015.11.17-19.03.jpg', year: 2015 },
  { id: 17, path: '/images/conferences/2015.11.17-19.04.jpg', year: 2015 },
];

export function Conferences() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  const [selectedConference, setSelectedConference] = useState<any | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Colors for the conference section - using blue theme (same as site theme)
  const themeColors = {
    primary: 'text-primary dark:text-primary',
    secondary: 'text-blue-700 dark:text-blue-400',
    background: 'from-blue-50 to-blue-100/30 dark:from-blue-900/20 dark:to-blue-800/10',
    heading: 'text-primary dark:text-primary',
    card: 'border-blue-200 dark:border-blue-800 hover:border-primary dark:hover:border-primary',
    cardBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
  };
  
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
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };
  
  const iconVariants = {
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

  // Get conferences from translations
  const conferencesData = t('conferences.items');
  const conferences = Array.isArray(conferencesData) ? conferencesData : [];

  // Conference images from the extracted zip file
  const conferenceImages = [
    '/images/conferences/2018.11.14-16.jpg',
    '/images/conferences/2019.01-02.30-01.01.jpg',
    '/images/conferences/2019.10.25.01.jpg',
    '/images/conferences/2019.11.20-21.jpg',
    '/images/conferences/2017.01.25-27.jpg',
    '/images/conferences/2016.11.16-18.jpg',
    '/images/conferences/2015.11.17-19.01.jpg',
    '/images/conferences/2016.05.12-13.jpg',
    '/images/conferences/2018.04.25-27.jpg',
    '/images/conferences/2018.09.04-05.jpg',
    '/images/conferences/2019.01-02.30-01.02.jpg',
    '/images/conferences/2019.01-02.30-01.03.jpg',
    '/images/conferences/2019.10.25.02.jpg',
    '/images/conferences/2021.03.09-10.jpg'
  ];

  const openConferenceDetails = (conference: any) => {
    setSelectedConference(conference);
  };

  return (
    <section 
      id="conferences"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-gray-900"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 md:w-[600px] md:h-[600px] bg-gradient-to-br from-blue-100/20 to-blue-200/10 dark:from-blue-900/10 dark:to-blue-800/5 rounded-full blur-3xl"
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
          className="absolute top-1/4 -left-24 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-tr from-blue-200/20 to-blue-100/10 dark:from-blue-800/10 dark:to-blue-900/5 rounded-full blur-3xl"
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
        
        {/* Decorative conference elements */}
        <motion.div 
          className="absolute top-20 left-[10%] w-8 h-8 text-primary opacity-10 md:opacity-30"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaMicrophone size={32} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-40 right-[15%] w-10 h-10 text-blue-600 opacity-10 md:opacity-30"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <FaUsers size={40} />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 right-[30%] w-8 h-8 text-blue-600 opacity-0 md:opacity-20"
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <FaUniversity size={32} />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-primary dark:text-primary"
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
          {t('conferences.title')}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {conferences.map((conference, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="overflow-hidden h-full shadow-lg hover:shadow-xl border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 bg-white dark:bg-gray-900 backdrop-blur-sm">
                <motion.div 
                  className="relative overflow-hidden"
                  variants={imageVariants}
                  initial="initial"
                  animate={hoveredCard === index ? "hover" : "initial"}
                >
                  <LazyImage 
                    src={conferenceImages[index % conferenceImages.length]} 
                    alt={conference.title} 
                    className="w-full h-56 object-cover" 
                    placeholderBlur={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white space-y-1">
                      <p className="font-medium text-blue-200">{conference.year}</p>
                      <p className="font-medium">{t('conferences.viewDetails')}</p>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-primary text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.5, type: "spring" }}
                  >
                    {conference.year}
                  </motion.div>
                </motion.div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{conference.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {conference.description}
                  </p>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4 bg-blue-50 dark:bg-blue-950/30 p-2 rounded-lg">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                      className="text-primary dark:text-primary mr-2"
                    >
                      <FaMapMarkerAlt />
                    </motion.div>
                    <span>{conference.location}</span>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <motion.button 
                        className="w-full bg-blue-100 hover:bg-gradient-to-r hover:from-blue-500 hover:to-primary hover:text-white text-blue-700 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 mt-2 border border-blue-200 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        onClick={() => openConferenceDetails(conference)}
                      >
                        <span>{t('conferences.viewDetails')}</span>
                        <motion.div
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 5,
                          }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 10 
                          }}
                        >
                          <FaChevronRight className="text-sm" />
                        </motion.div>
                      </motion.button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-amber-200 dark:border-amber-800">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
                          >
                            {conference.title}
                          </motion.span>
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-sm font-normal text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full"
                          >
                            {conference.year}
                          </motion.span>
                        </DialogTitle>
                      </DialogHeader>
                      <motion.div 
                        className="grid gap-6 py-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="overflow-hidden rounded-xl shadow-md"
                        >
                          <LazyImage 
                            src={conferenceImages[index % conferenceImages.length]} 
                            alt={conference.title} 
                            className="w-full h-72 object-cover" 
                            placeholderBlur={true}
                          />
                        </motion.div>
                        
                        <div className="space-y-4">
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                          >
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{conference.description}</p>
                          </motion.div>
                          
                          <motion.div 
                            className="flex items-center text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                          >
                            <FaMapMarkerAlt className="mr-2 text-primary dark:text-primary" />
                            <span>{conference.location}</span>
                          </motion.div>
                          
                          <motion.div 
                            className="flex items-center text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                          >
                            <FaCalendarAlt className="mr-2 text-primary dark:text-primary" />
                            <span>{conference.year}</span>
                          </motion.div>
                          
                          {conference.role && (
                            <motion.div 
                              className="flex items-center text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.5, duration: 0.4 }}
                            >
                              <FaMicrophone className="mr-2 text-primary dark:text-primary" />
                              <span>{conference.role}</span>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <a 
              href="/conferences" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>{t('conferences.viewAllButton')}</span>
              <motion.div
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 5,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10 
                }}
              >
                <FaArrowRight />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Conferences;
