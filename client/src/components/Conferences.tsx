import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef, useState } from 'react';
import { FaArrowRight, FaMapMarkerAlt, FaChevronRight, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { LazyImage } from '@/components/ui/lazy-image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import profileImage from '../assets/profile.jpg';

export function Conferences() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const [selectedConference, setSelectedConference] = useState<any | null>(null);

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

  // Get conferences from translations
  const conferencesData = t('conferences.items');
  const conferences = Array.isArray(conferencesData) ? conferencesData : [];

  // Conference images using actual profile photo
  const conferenceImages = [
    profileImage,
    profileImage,
    profileImage
  ];

  const openConferenceDetails = (conference: any) => {
    setSelectedConference(conference);
  };

  return (
    <section 
      id="conferences"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {t('conferences.title')}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {conferences.map((conference, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg relative">
                <LazyImage 
                  src={conferenceImages[index % conferenceImages.length]} 
                  alt={conference.title} 
                  className="w-full h-48 object-cover" 
                  placeholderBlur={true}
                />
                
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {conference.year}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{conference.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {conference.description}
                  </p>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{conference.location}</span>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <button 
                        className="text-primary hover:text-primary/80 flex items-center gap-1"
                        onClick={() => openConferenceDetails(conference)}
                      >
                        <span>{t('conferences.viewDetails')}</span>
                        <FaChevronRight className="text-sm" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <span>{conference.title}</span>
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            ({conference.year})
                          </span>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <LazyImage 
                          src={conferenceImages[index % conferenceImages.length]} 
                          alt={conference.title} 
                          className="w-full h-48 object-cover rounded-md" 
                          placeholderBlur={true}
                        />
                        <p className="text-gray-700 dark:text-gray-300">{conference.description}</p>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <FaMapMarkerAlt className="mr-2" />
                          <span>{conference.location}</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
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
            <span>{t('conferences.viewAllButton')}</span>
            <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Conferences;
