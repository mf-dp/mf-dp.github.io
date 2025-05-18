import { useLanguage } from '@/context/LanguageContext';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef, useState, useEffect } from 'react';
import { FaArrowRight, FaMapMarkerAlt, FaChevronRight, FaCalendarAlt, FaUniversity, FaAward, FaTags } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { CertificateAnalyzer, CertificateAnalysisData } from './CertificateAnalyzer';
import { Card, CardContent } from '@/components/ui/card';
import { LazyImage } from '@/components/ui/lazy-image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Conference certificates data with detailed information extracted from certificate images
const conferenceCertificates = [
  { 
    id: 1, 
    path: '/images/conferences/2021.03.09-10.jpg', 
    year: 2021,
    dateRange: "March 9-10, 2021",
    title: "19th International TELLSI Conference",
    description: "Certificate of Active Participation and Presentation at the 19th International TELLSI Conference",
    organization: "TELLSI (Teaching English Language and Literature Society of Iran)",
    location: "Tarbiat Modares University, Tehran, Iran",
    role: "Presenter",
    participantType: "Presenter",
    typeColor: "green"
  },
  { 
    id: 2, 
    path: '/images/conferences/2019.11.20-21.jpg', 
    year: 2019,
    dateRange: "November 20-21, 2019",
    title: "International Conference on English Language Teaching and Learning",
    description: "Certificate of Attendance and Contribution to the International Conference on English Language Teaching and Learning",
    organization: "Iran University of Science and Technology",
    location: "Tehran, Iran",
    role: "Contributor",
    participantType: "Panelist / Moderator",
    typeColor: "orange"
  },
  { 
    id: 3, 
    path: '/images/conferences/2019.10.25.01.jpg', 
    year: 2019,
    dateRange: "October 25, 2019",
    title: "17th International TELLSI Conference",
    description: "Certificate of Attendance and Presentation at the 17th International TELLSI Conference",
    organization: "TELLSI (Teaching English Language and Literature Society of Iran)",
    location: "Islamic Azad University, Tabriz Branch, Iran",
    role: "Presenter",
    participantType: "Presenter",
    typeColor: "green"
  },
  { 
    id: 4, 
    path: '/images/conferences/2019.10.25.02.jpg', 
    year: 2019,
    title: "TELLSI Conference 2019 (2)",
    description: "Certificate of paper presentation at the 17th International TELLSI Conference",
    location: "Islamic Azad University, Iran",
    role: "Presenter",
    participantType: "Presenter",
    typeColor: "green"
  },
  { 
    id: 5, 
    path: '/images/conferences/2019.01-02.30-01.01.jpg', 
    year: 2019,
    title: "Applied Linguistics Conference 2019 (1)",
    description: "Certificate from the International Conference on Applied Linguistics and Language Teaching",
    location: "Tehran, Iran",
    role: "Organizing Committee Member",
    participantType: "Organizing Committee / Executive Member",
    typeColor: "red"
  },
  { 
    id: 6, 
    path: '/images/conferences/2019.01-02.30-01.02.jpg', 
    year: 2019,
    title: "Applied Linguistics Conference 2019 (2)",
    description: "Certificate of presentation at the International Conference on Applied Linguistics",
    location: "Tehran, Iran",
    role: "Presenter",
    participantType: "Presenter",
    typeColor: "green"
  },
  { 
    id: 7, 
    path: '/images/conferences/2019.01-02.30-01.03.jpg', 
    year: 2019,
    title: "Applied Linguistics Conference 2019 (3)",
    description: "Certificate of attendance at the International Conference on Applied Linguistics",
    location: "Tehran, Iran",
    role: "Attendee",
    participantType: "Attendee (Audience)",
    typeColor: "yellow"
  },
  { 
    id: 8, 
    path: '/images/conferences/2018.11.14-16.jpg', 
    year: 2018,
    title: "International Conference on Language Research 2018",
    description: "Certificate of participation in the International Conference on Language Research",
    location: "University of Tehran, Iran",
    role: "Workshop Participant",
    participantType: "Workshop Participant",
    typeColor: "blue"
  },
  { 
    id: 9, 
    path: '/images/conferences/2018.09.04-05.jpg', 
    year: 2018,
    title: "TELLSI Conference 2018",
    description: "Certificate from the 16th International TELLSI Conference",
    location: "Kharazmi University, Iran",
    role: "Keynote Speaker",
    participantType: "Keynote Speaker / Invited Speaker",
    typeColor: "black"
  },
  { 
    id: 10, 
    path: '/images/conferences/2018.04.25-27.jpg', 
    year: 2018,
    title: "Foreign Language Education Conference 2018",
    description: "Certificate of participation in the International Conference on Foreign Language Education",
    location: "Mashhad, Iran",
    role: "Panelist",
    participantType: "Panelist / Moderator",
    typeColor: "orange"
  },
  { 
    id: 11, 
    path: '/images/conferences/2017.01.25-27.jpg', 
    year: 2017,
    title: "Language Teaching Research Conference 2017",
    description: "Certificate of presentation at the International Conference on Language Teaching Research",
    location: "Shiraz University, Iran",
    role: "Presenter",
    participantType: "Presenter",
    typeColor: "green"
  },
  { 
    id: 12, 
    path: '/images/conferences/2016.11.16-18.jpg', 
    year: 2016,
    title: "TELLSI Conference 2016",
    description: "Certificate from the 14th International TELLSI Conference",
    location: "Urmia University, Iran",
    role: "Attendee",
    participantType: "Attendee (Audience)",
    typeColor: "yellow"
  },
  { 
    id: 13, 
    path: '/images/conferences/2016.05.12-13.jpg', 
    year: 2016,
    title: "ELT Conference 2016",
    description: "Certificate of participation in the International Conference on English Language Teaching",
    location: "Tehran, Iran",
    role: "Workshop Participant",
    participantType: "Workshop Participant",
    typeColor: "blue"
  },
  { 
    id: 14, 
    path: '/images/conferences/2015.11.17-19.01.jpg', 
    year: 2015,
    title: "TELLSI Conference 2015 (1)",
    description: "Certificate from the 13th International TELLSI Conference",
    location: "Lorestan University, Iran",
    role: "Organizing Committee Member",
    participantType: "Organizing Committee / Executive Member",
    typeColor: "red"
  },
  { 
    id: 15, 
    path: '/images/conferences/2015.11.17-19.02.jpg', 
    year: 2015,
    title: "TELLSI Conference 2015 (2)",
    description: "Certificate of presentation at the 13th International TELLSI Conference",
    location: "Lorestan University, Iran",
    role: "Presenter",
    participantType: "Presenter",
    typeColor: "green"
  },
  { 
    id: 16, 
    path: '/images/conferences/2015.11.17-19.03.jpg', 
    year: 2015,
    title: "TELLSI Conference 2015 (3)",
    description: "Certificate of paper acceptance at the 13th International TELLSI Conference",
    location: "Lorestan University, Iran",
    role: "Presenter",
    participantType: "Presenter",
    typeColor: "green"
  },
  { 
    id: 17, 
    path: '/images/conferences/2015.11.17-19.04.jpg', 
    year: 2015,
    title: "TELLSI Conference 2015 (4)",
    description: "Certificate of attendance at the 13th International TELLSI Conference",
    location: "Lorestan University, Iran",
    role: "Attendee",
    participantType: "Attendee (Audience)",
    typeColor: "yellow"
  },
];

export function Conferences({ showAll = false }: { showAll?: boolean }) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  const [selectedConference, setSelectedConference] = useState<any | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
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

  // Group conferences by participant type
  const groupConferencesByType = () => {
    const sorted = [...conferenceCertificates].sort((a, b) => b.year - a.year);
    
    return {
      all: sorted,
      presenters: sorted.filter(conf => conf.participantType === "Presenter"),
      workshop: sorted.filter(conf => conf.participantType === "Workshop Participant"),
      attendees: sorted.filter(conf => conf.participantType === "Attendee (Audience)"),
      panelists: sorted.filter(conf => conf.participantType === "Panelist / Moderator"),
      organizers: sorted.filter(conf => conf.participantType === "Organizing Committee / Executive Member"),
      keynote: sorted.filter(conf => conf.participantType === "Keynote Speaker / Invited Speaker")
    };
  };
  
  const groupedConferences = groupConferencesByType();
  
  // Get filtered conferences based on active tab
  const getFilteredConferences = () => {
    if (!showAll) {
      return [...conferenceCertificates].sort((a, b) => b.year - a.year).slice(0, 6);
    }
    
    switch (activeTab) {
      case 'presenters':
        return groupedConferences.presenters;
      case 'workshop':
        return groupedConferences.workshop;
      case 'attendees':
        return groupedConferences.attendees;
      case 'panelists':
        return groupedConferences.panelists;
      case 'organizers':
        return groupedConferences.organizers;
      case 'keynote':
        return groupedConferences.keynote;
      default:
        return groupedConferences.all;
    }
  };
  
  // Use the conferenceCertificates data directly
  // If we're not showing all (on homepage), limit to 6 most recent certificates
  const conferences = getFilteredConferences();

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
        
        {showAll && (
          <div className="mb-10">
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none gap-2 mb-8 p-1 bg-blue-50/80 dark:bg-blue-900/20 rounded-lg">
                <TabsTrigger 
                  value="all"
                  className="px-5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                >
                  All Conferences
                </TabsTrigger>
                <TabsTrigger 
                  value="presenters"
                  className="px-5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
                >
                  🟩 Presenters
                </TabsTrigger>
                <TabsTrigger 
                  value="workshop"
                  className="px-5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                >
                  🟦 Workshop Participants
                </TabsTrigger>
                <TabsTrigger 
                  value="attendees"
                  className="px-5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white"
                >
                  🟨 Attendees
                </TabsTrigger>
                <TabsTrigger 
                  value="panelists"
                  className="px-5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
                >
                  🟧 Panelists
                </TabsTrigger>
                <TabsTrigger 
                  value="organizers"
                  className="px-5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
                >
                  🟥 Organizers
                </TabsTrigger>
                <TabsTrigger 
                  value="keynote"
                  className="px-5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-gray-700 data-[state=active]:to-gray-900 data-[state=active]:text-white"
                >
                  ⬛ Keynote Speakers
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {conferences.map((conference: any, index: number) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className={`overflow-hidden h-full shadow-md hover:shadow-xl border border-gray-200 hover:border-blue-200 dark:border-gray-700 dark:hover:border-blue-800 transition-all duration-300 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 backdrop-blur-sm ${
                conference.typeColor === 'green' ? 'border-l-4 border-l-green-500' :
                conference.typeColor === 'blue' ? 'border-l-4 border-l-blue-500' :
                conference.typeColor === 'yellow' ? 'border-l-4 border-l-yellow-500' :
                conference.typeColor === 'orange' ? 'border-l-4 border-l-orange-500' :
                conference.typeColor === 'red' ? 'border-l-4 border-l-red-500' :
                conference.typeColor === 'black' ? 'border-l-4 border-l-gray-900 dark:border-l-white' : ''
              }`}>
                <motion.div 
                  className="relative overflow-hidden"
                  variants={imageVariants}
                  initial="initial"
                  animate={hoveredCard === index ? "hover" : "initial"}
                >
                  <LazyImage 
                    src={conference.path} 
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

                  {showAll && (
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
                      conference.typeColor === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                      conference.typeColor === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                      conference.typeColor === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                      conference.typeColor === 'orange' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' :
                      conference.typeColor === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                      conference.typeColor === 'black' ? 'bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-200' : 
                      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}>
                      {conference.role}
                    </div>
                  )}
                </motion.div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{conference.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {conference.description}
                  </p>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4 bg-blue-50 dark:bg-blue-950/30 p-2 rounded-lg">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1]
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
                            rotate: 5
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
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-blue-50/95 dark:bg-gray-900/95 backdrop-blur-sm border-blue-200 dark:border-blue-800">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-primary"
                          >
                            <FaAward />
                          </motion.span>
                          {conference.title}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="mt-4">
                        <LazyImage 
                          src={conference.path} 
                          alt={conference.title} 
                          className="w-full h-64 object-cover rounded-lg shadow-md border border-blue-200 dark:border-blue-800" 
                          placeholderBlur={true}
                        />
                        
                        <div className="space-y-4 mt-6">
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <FaCalendarAlt className="text-primary dark:text-primary" />
                            <span>{conference.year}</span>
                            {conference.dateRange && (
                              <span className="text-gray-500 dark:text-gray-400 text-sm">({conference.dateRange})</span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <FaMapMarkerAlt className="text-primary dark:text-primary" />
                            <span>{conference.location}</span>
                          </div>
                          
                          {conference.organization && (
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              <FaUniversity className="text-primary dark:text-primary" />
                              <span>{conference.organization}</span>
                            </div>
                          )}
                          
                          {conference.role && (
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              <FaTags className="text-primary dark:text-primary" />
                              <span>{conference.role}</span>
                            </div>
                          )}
                          
                          {conference.topic && (
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mt-4">
                              <h4 className="font-medium text-primary dark:text-primary mb-2">Research Topic:</h4>
                              <p className="text-gray-700 dark:text-gray-300">{conference.topic}</p>
                            </div>
                          )}
                          
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                            <h4 className="font-medium text-primary dark:text-primary mb-2">Description:</h4>
                            <p className="text-gray-700 dark:text-gray-300">{conference.description}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {!showAll && (
          <div className="flex justify-center mt-16">
            <motion.a
              href="/conferences"
              className="flex items-center gap-2 bg-blue-100 hover:bg-primary hover:text-white text-blue-700 font-medium py-3 px-6 rounded-full transition-all duration-300 border border-blue-200 group dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span>{t('conferences.viewAll')}</span>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "mirror" 
                }}
              >
                <FaArrowRight className="text-sm group-hover:text-white" />
              </motion.div>
            </motion.a>
          </div>
        )}
      </div>
    </section>
  );
}