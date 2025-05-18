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
    path: '/images/conferences/Conference/2021.03.09-10.jpg', 
    year: 2021,
    dateRange: "March 9-10, 2021",
    title: "4th ICCTME 2021",
    description: "Certificate of Participation - Current Trends in the Middle East: Virtual International Joint Conference on COVID-19 Global Impacts",
    university: "Universiti Teknologi Malaysia (UTM)",
    location: "Virtual Conference",
    paperTitle: "(Not specified in the certificate)",
    role: "Presenter",
    participantType: "Presenter",
    typeColor: "green",
    collaborators: "Ilam University, Tokat Gaziosmanpaşa University, Payame Noor University"
  },
  { 
    id: 2, 
    path: '/images/conferences/Conference/2019.11.20-21.jpg', 
    year: 2019,
    dateRange: "November 20-21, 2019",
    title: "17th International TELLSI Conference",
    description: "Certificate of Presentation - New Horizons in Language Studies",
    university: "Islamic Azad University of Tabriz Branch",
    location: "Tabriz, Iran",
    paperTitle: "An Exploration of Iranian EFL Stakeholders' Attitudes and Knowledge of Different Educational Management Systems",
    role: "Paper Presenter",
    participantType: "Presenter",
    typeColor: "green",
    collaborators: "TELLSI (Teaching English Language and Literature Society of Iran)"
  },
  { 
    id: 3, 
    path: '/images/conferences/Conference/2019.10.25.02.jpg', 
    year: 2019,
    dateRange: "October 25, 2019",
    title: "EUROKD Conference",
    description: "Certificate of Attendance - International Conference on Education, Psychology, and Behavioral Science",
    university: "University of Leeds",
    location: "Leeds, UK",
    paperTitle: "Implementing Learning Analytics in a Higher Education Institution: Issues and Considerations",
    role: "Workshop Attendee",
    participantType: "Workshop Participant",
    typeColor: "blue",
    collaborators: "EUROKD, Universitat Politècnica de València, University of Leeds"
  },
  { 
    id: 4, 
    path: '/images/conferences/Conference/2019.10.25.01.jpg', 
    year: 2019,
    dateRange: "October 25, 2019",
    title: "EUROKD Conference",
    description: "Certificate of Attendance - International Conference on Education, Psychology, and Behavioral Science",
    university: "University of Leeds",
    location: "Leeds, UK",
    paperTitle: "Developmental Psychology without Positivistic Pretentions",
    role: "Workshop Attendee",
    participantType: "Workshop Participant",
    typeColor: "blue",
    collaborators: "EUROKD, Universitat Politècnica de València, University of Leeds"
  },
  { 
    id: 5, 
    path: '/images/conferences/Conference/2019.01-02.30-01.03.jpg', 
    year: 2019,
    dateRange: "January 30 - February 1, 2019",
    title: "5th International LDP Conference",
    description: "Certificate of Workshop Presentation - 5th International Conference on Language, Discourse and Pragmatics",
    university: "Shahid Chamran University of Ahvaz",
    location: "Ahvaz, Iran",
    paperTitle: "Planning Research in Applied Linguistics",
    role: "Workshop Participant",
    participantType: "Workshop Participant",
    typeColor: "blue",
    collaborators: "KELTA, University of Amsterdam, UNED, ISC"
  },
  { 
    id: 6, 
    path: '/images/conferences/Conference/2019.01-02.30-01.02.jpg', 
    year: 2019,
    dateRange: "January 30 - February 1, 2019",
    title: "5th International LDP Conference",
    description: "Certificate of Workshop Presentation - 5th International Conference on Language, Discourse and Pragmatics",
    university: "Shahid Chamran University of Ahvaz",
    location: "Ahvaz, Iran",
    paperTitle: "How to do a Valid Pragmatics Research: Dealing with Theory and Data",
    role: "Workshop Participant",
    participantType: "Workshop Participant",
    typeColor: "blue",
    collaborators: "KELTA, University of Amsterdam, UNED, ISC"
  },
  { 
    id: 7, 
    path: '/images/conferences/Conference/2019.01-02.30-01.01.jpg', 
    year: 2019,
    dateRange: "January 30 - February 1, 2019",
    title: "5th International LDP Conference",
    description: "Certificate of Presentation - 5th International Conference on Language, Discourse and Pragmatics",
    university: "Shahid Chamran University of Ahvaz",
    location: "Ahvaz, Iran",
    paperTitle: "Subjectivity and Objectivity in Discussion Sections of Iranian M.A. Thesis and Ph.D. Dissertations; the Case of Hard and Soft Science Fields of Studies",
    role: "Paper Presenter",
    participantType: "Presenter",
    typeColor: "green",
    collaborators: "KELTA, University of Amsterdam, UNED, ISC"
  },
  { 
    id: 8, 
    path: '/images/conferences/Conference/2018.11.14-16.jpg', 
    year: 2018,
    dateRange: "November 14-16, 2018",
    title: "16th International TELLSI Conference",
    description: "Certificate of Presentation - Futurology of English Language Teaching and Literature",
    university: "Shiraz University",
    location: "Shiraz, Iran",
    paperTitle: "An Ecological Exploration of Iranian EFL Students' Self-Change, Self-Construal, and Change Management through Classroom Communication Tasks",
    role: "Paper Presenter",
    participantType: "Presenter",
    typeColor: "green",
    collaborators: "TELLSI, ISC, Iran National Science Foundation, Salman Farsi University of Kazerun, Shahid Bahonar University, Navid Educational Group"
  },
  { 
    id: 9, 
    path: '/images/conferences/Conference/2018.09.04-05.jpg', 
    year: 2018,
    dateRange: "September 4-5, 2018",
    title: "3rd Conference on New Trends in English Language Teaching and Testing (NTELTT)",
    description: "Certificate of Presentation - New Trends in English Language Teaching and Testing",
    university: "NTELTT",
    location: "Tehran, Iran",
    paperTitle: "Investigating the Effect of EFL Teachers' Self-leadership on their Processional Development and Change",
    role: "Paper Presenter",
    participantType: "Presenter",
    typeColor: "green",
    collaborators: "CIKD, Victoria University of Wellington, CIVILICA, Maeen Danesh, NTELT.IR"
  },
  { 
    id: 10, 
    path: '/images/conferences/Conference/2018.04.25-27.jpg', 
    year: 2018,
    dateRange: "April 25-27, 2018",
    title: "2nd International Conference on Dust (2DUST)",
    description: "Executive Committee Appointment Letter - The 2nd International Conference on Dust",
    university: "Ilam University",
    location: "Ilam, Iran",
    paperTitle: "(Not applicable - no paper presented)",
    role: "Executive Committee Member",
    participantType: "Organizing Committee / Executive Member",
    typeColor: "red",
    collaborators: ""
  },
  { 
    id: 11, 
    path: '/images/conferences/Conference/2017.01.25-27.jpg', 
    year: 2017,
    dateRange: "January 25-27, 2017",
    title: "4th International LDP Conference",
    description: "Certificate of Presentation - Fourth International Conference on Language, Discourse and Pragmatics",
    university: "Shahid Chamran University of Ahvaz",
    location: "Ahvaz, Iran",
    paperTitle: "Paralogism, Ambiguity and Circumlocution: Do Compensation Strategies Help?",
    role: "Paper Presenter",
    participantType: "Presenter",
    typeColor: "green",
    collaborators: "KELTA, ISC, UNED, UNSW Australia, ISFLA"
  },
  { 
    id: 12, 
    path: '/images/conferences/Conference/2016.11.16-18.jpg', 
    year: 2016,
    dateRange: "November 16-18, 2016",
    title: "14th International TELLSI Conference",
    description: "Certificate of Presentation - TELLSI: Teaching English Language and Literature Society of Iran",
    university: "Islamic Azad University (Kerman Branch)",
    location: "Kerman, Iran",
    paperTitle: "(Not specified in the certificate)",
    role: "Paper Presenter",
    participantType: "Presenter",
    typeColor: "green",
    collaborators: "TELLSI (Teaching English Language and Literature Society of Iran)"
  },
  { 
    id: 13, 
    path: '/images/conferences/Conference/2016.05.12-13.jpg', 
    year: 2016,
    dateRange: "May 12-13, 2016",
    title: "The First English-French Conference",
    description: "Certificate of Presentation - The First English-French Conference on Applied Linguistics and Literature",
    university: "University of Kurdistan, Sanandaj",
    location: "Sanandaj, Iran",
    paperTitle: "Language Learning through WhatsApp or Telegram, Which Court is the Ball in?",
    role: "Poster Presenter",
    participantType: "Presenter",
    typeColor: "green",
    collaborators: "TELLSI Kurdistan, AILF (Association française de linguistique appliquée), Kurdistan English Teachers' Association"
  },
  { 
    id: 14, 
    path: '/images/conferences/Conference/2015.11.17-19.01.jpg', 
    year: 2015,
    dateRange: "November 17-19, 2015",
    title: "13th International TELLSI Conference",
    description: "Certificate of Attendance - 13th International TELLSI Conference",
    university: "Lorestan University",
    location: "Lorestan, Iran",
    paperTitle: "Revisiting and Implementing Critical Pedagogy in Second Language Learning",
    role: "Workshop Participant",
    participantType: "Workshop Participant",
    typeColor: "blue",
    collaborators: "TELLSI (Teaching English Language and Literature Society of Iran), Allameh Tabataba'i University"
  },
  { 
    id: 15, 
    path: '/images/conferences/Conference/2015.11.17-19.02.jpg', 
    year: 2015,
    dateRange: "November 17-19, 2015",
    title: "13th International TELLSI Conference",
    description: "Certificate of Attendance - 13th International TELLSI Conference",
    university: "Lorestan University",
    location: "Lorestan, Iran",
    paperTitle: "Instructional Pragmatics: Teaching Students to Use Language Appropriately",
    role: "Workshop Participant",
    participantType: "Workshop Participant",
    typeColor: "blue",
    collaborators: "TELLSI (Teaching English Language and Literature Society of Iran), Texas A&M University, Hosei University"
  },
  { 
    id: 16, 
    path: '/images/conferences/Conference/2015.11.17-19.03.jpg', 
    year: 2015,
    dateRange: "November 17-19, 2015",
    title: "13th International TELLSI Conference",
    description: "Certificate of Attendance - 13th International TELLSI Conference",
    university: "Lorestan University",
    location: "Lorestan, Iran",
    paperTitle: "Innovative Practices in English Language Learning and Research: Use of ICT Tools for the Preparation of Pre-Service English Teachers at the National Institute of Education in Singapore",
    role: "Workshop Participant",
    participantType: "Workshop Participant",
    typeColor: "blue",
    collaborators: "TELLSI (Teaching English Language and Literature Society of Iran), National Institute of Education in Singapore"
  },
  { 
    id: 17, 
    path: '/images/conferences/Conference/2015.11.17-19.04.jpg', 
    year: 2015,
    dateRange: "November 17-19, 2015",
    title: "13th International TELLSI Conference",
    description: "Certificate of Attendance - 13th International TELLSI Conference",
    university: "Lorestan University",
    location: "Lorestan, Iran",
    paperTitle: "Professional Change, Professional Development, and Professional Identity of Iranian EFL Beginner vs. Experienced Teachers",
    role: "Presenter",
    participantType: "Presenter",
    typeColor: "green",
    collaborators: "TELLSI (Teaching English Language and Literature Society of Iran)"
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
  
  // Add a useEffect to initialize the 'all' tab correctly
  useEffect(() => {
    // This ensures the 'all' tab works correctly when initialized
    console.log("Active tab is set to:", activeTab);
  }, [activeTab]);
  
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

  // Group conferences by participant type - fixed to properly categorize all certificates
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
  
  // Created outside useEffect to ensure it's calculated on first render
  const groupedConferences = groupConferencesByType();
  
  // State to store filtered conferences
  const [filteredConferences, setFilteredConferences] = useState<typeof conferenceCertificates>([]);
  
  // Add useEffect to update filtered conferences when activeTab changes
  useEffect(() => {
    console.log("Tab changed to:", activeTab);
    // Update the filtered conferences when tab changes
    const filtered = getFilteredConferencesByTab(activeTab);
    setFilteredConferences(filtered);
    console.log("Filtered conferences count:", filtered.length);
  }, [activeTab, showAll]);
  
  // Initialize on first render
  useEffect(() => {
    const initial = getFilteredConferencesByTab(activeTab);
    setFilteredConferences(initial);
  }, []);
  
  // Get filtered conferences based on active tab
  const getFilteredConferencesByTab = (tabName: string) => {
    if (!showAll) {
      return [...conferenceCertificates].sort((a, b) => b.year - a.year).slice(0, 6);
    }
    
    console.log("Getting conferences for tab:", tabName);
    
    const sortedConferences = [...conferenceCertificates].sort((a, b) => b.year - a.year);
    
    switch (tabName) {
      case 'presenters':
        return sortedConferences.filter(conf => conf.participantType === "Presenter");
      case 'workshop':
        return sortedConferences.filter(conf => conf.participantType === "Workshop Participant");
      case 'attendees':
        return sortedConferences.filter(conf => conf.participantType === "Attendee (Audience)");
      case 'panelists':
        return sortedConferences.filter(conf => conf.participantType === "Panelist / Moderator");
      case 'organizers':
        return sortedConferences.filter(conf => conf.participantType === "Organizing Committee / Executive Member");
      case 'keynote':
        return sortedConferences.filter(conf => conf.participantType === "Keynote Speaker / Invited Speaker");
      case 'all':
      default:
        return sortedConferences;
    }
  };
  
  // Simplified function to maintain backwards compatibility with existing code
  const getFilteredConferences = () => {
    return filteredConferences.length > 0 ? filteredConferences : getFilteredConferencesByTab(activeTab);
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
            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <button 
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200'}`}
                  >
                    All Conferences
                  </button>
                  <button 
                    onClick={() => setActiveTab('presenters')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === 'presenters' ? 'bg-green-500 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200'}`}
                  >
                    <span className="text-green-500">●</span> Presenters
                  </button>
                  <button 
                    onClick={() => setActiveTab('workshop')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === 'workshop' ? 'bg-blue-500 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200'}`}
                  >
                    <span className="text-blue-500">●</span> Workshops
                  </button>
                  <button 
                    onClick={() => setActiveTab('attendees')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === 'attendees' ? 'bg-yellow-500 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200 opacity-50'}`}
                    disabled={true}
                    title="No Attendees in the current dataset"
                  >
                    <span className="text-yellow-500">●</span> Attendees
                  </button>
                  <button 
                    onClick={() => setActiveTab('panelists')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === 'panelists' ? 'bg-orange-500 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200 opacity-50'}`}
                    disabled={true}
                    title="No Panelists in the current dataset"
                  >
                    <span className="text-orange-500">●</span> Panelists
                  </button>
                  <button 
                    onClick={() => setActiveTab('organizers')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === 'organizers' ? 'bg-red-500 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200'}`}
                  >
                    <span className="text-red-500">●</span> Organizers
                  </button>
                  <button 
                    onClick={() => setActiveTab('keynote')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${activeTab === 'keynote' ? 'bg-gray-900 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200 opacity-50'}`}
                    disabled={true}
                    title="No Keynote Speakers in the current dataset"
                  >
                    <span className="text-gray-900 dark:text-white">●</span> Keynotes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {conferences.map((conference) => (
            <motion.div 
              key={conference.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onMouseEnter={() => setHoveredCard(conference.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative overflow-hidden h-full rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-${conference.typeColor}-500 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 ${themeColors.card} ${themeColors.cardBg}`}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div 
                    onClick={() => openConferenceDetails(conference)}
                    className="cursor-pointer h-full flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.div
                        variants={imageVariants}
                        initial="initial"
                        animate={hoveredCard === conference.id ? "hover" : "initial"}
                        className="h-full w-full"
                      >
                        <LazyImage
                          src={conference.path}
                          alt={conference.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
                        <span className="text-xs font-medium text-white inline-flex items-center gap-1 bg-blue-600 px-2 py-1 rounded-full">
                          <FaCalendarAlt className="w-3 h-3" /> {conference.year}
                        </span>
                        
                        {showAll && conference.participantType && (
                          <span className={`ml-2 text-xs font-medium text-white inline-flex items-center gap-1 bg-${conference.typeColor}-500 px-2 py-1 rounded-full`}>
                            <FaAward className="w-3 h-3" /> {conference.participantType}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 p-5 flex flex-col">
                      <h3 className="text-lg font-semibold line-clamp-2 mb-2 text-primary dark:text-primary">{conference.title}</h3>
                      
                      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2 flex-grow">
                        <p className="line-clamp-2 text-sm">{conference.description}</p>
                        
                        {conference.dateRange && (
                          <div className="flex items-start mt-3">
                            <FaCalendarAlt className="flex-shrink-0 mr-2 mt-1 text-blue-600 dark:text-blue-400" />
                            <span>{conference.dateRange}</span>
                          </div>
                        )}
                        
                        {conference.location && (
                          <div className="flex items-start">
                            <FaMapMarkerAlt className="flex-shrink-0 mr-2 mt-1 text-blue-600 dark:text-blue-400" />
                            <span>{conference.location}</span>
                          </div>
                        )}
                        
                        {conference.university && (
                          <div className="flex items-start">
                            <FaUniversity className="flex-shrink-0 mr-2 mt-1 text-blue-600 dark:text-blue-400" />
                            <span className="line-clamp-1">{conference.university}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <motion.button
                          variants={buttonVariants}
                          initial="initial"
                          whileHover="hover"
                          className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-md transition-colors text-primary dark:text-primary border border-blue-200 dark:border-blue-800"
                        >
                          View Certificate
                          <motion.span
                            variants={iconVariants}
                            initial="initial"
                            animate={hoveredCard === conference.id ? "hover" : "initial"}
                          >
                            <FaChevronRight />
                          </motion.span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-center">Certificate Details</DialogTitle>
                  </DialogHeader>
                  
                  {selectedConference && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="relative aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <LazyImage
                          src={selectedConference.path}
                          alt={selectedConference.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-primary dark:text-primary border-l-4 border-blue-500 pl-3">{selectedConference.title}</h3>
                          <p className="mt-2 text-gray-600 dark:text-gray-300">{selectedConference.description}</p>
                        </div>
                        
                        <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          {selectedConference.dateRange && (
                            <div className="flex items-start">
                              <FaCalendarAlt className="flex-shrink-0 mr-3 mt-1 w-5 h-5 text-blue-600 dark:text-blue-400" />
                              <div>
                                <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Date</h4>
                                <p>{selectedConference.dateRange}</p>
                              </div>
                            </div>
                          )}
                          
                          {selectedConference.location && (
                            <div className="flex items-start">
                              <FaMapMarkerAlt className="flex-shrink-0 mr-3 mt-1 w-5 h-5 text-blue-600 dark:text-blue-400" />
                              <div>
                                <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Location</h4>
                                <p>{selectedConference.location}</p>
                              </div>
                            </div>
                          )}
                          
                          {selectedConference.university && (
                            <div className="flex items-start">
                              <FaUniversity className="flex-shrink-0 mr-3 mt-1 w-5 h-5 text-blue-600 dark:text-blue-400" />
                              <div>
                                <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">University/Organization</h4>
                                <p>{selectedConference.university}</p>
                              </div>
                            </div>
                          )}
                          
                          {selectedConference.collaborators && (
                            <div className="flex items-start">
                              <FaTags className="flex-shrink-0 mr-3 mt-1 w-5 h-5 text-blue-600 dark:text-blue-400" />
                              <div>
                                <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Collaborators</h4>
                                <p>{selectedConference.collaborators}</p>
                              </div>
                            </div>
                          )}
                          
                          {selectedConference.role && (
                            <div className="flex items-start">
                              <FaAward className="flex-shrink-0 mr-3 mt-1 w-5 h-5 text-blue-600 dark:text-blue-400" />
                              <div>
                                <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Role</h4>
                                <p>{selectedConference.role}</p>
                              </div>
                            </div>
                          )}
                          
                          {selectedConference.paperTitle && selectedConference.paperTitle !== "(Not specified in the certificate)" && selectedConference.paperTitle !== "(Not applicable - no paper presented)" && (
                            <div className="flex items-start pt-3 border-t border-gray-200 dark:border-gray-700">
                              <div className="w-full">
                                <h4 className="font-medium text-gray-700 dark:text-gray-300">Research Paper</h4>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                                  {selectedConference.paperTitle}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </motion.div>
        
        {!showAll && conferences.length > 0 && (
          <div className="mt-12 text-center">
            <motion.a
              href="/conferences"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition-colors"
            >
              {t('conferences.viewAllButton')}
              <FaArrowRight />
            </motion.a>
          </div>
        )}
      </div>
    </section>
  );
}