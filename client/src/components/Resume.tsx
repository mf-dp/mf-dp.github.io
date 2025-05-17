import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Resume() {
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

  // Sample data for career
  const career = [
    {
      role: "Research Assistant",
      company: "UNED (ATLAS Research Group)",
      period: "2022 - Present",
      description: "Conducting research on educational technology, data analysis, and digital competence in language teaching contexts.",
      achievements: [
        "Collaborated on IHUPA (Humanities and Heritage Research Institute UNED-Alcañiz) project",
        "Participated in AGORA technological and methodological innovations project"
      ]
    },
    {
      role: "Data Analyst and Database Specialist",
      company: "Independent Research",
      period: "2019 - 2022",
      description: "Specialized in bibliometric and scientometric analysis using advanced analytical tools and techniques.",
      achievements: [
        "Developed bibliometric analyses for academic research projects",
        "Improved data visualization techniques for research presentations"
      ]
    }
  ];

  // Sample data for education
  const education = [
    {
      degree: "Master's in Big Data and Data Science",
      institution: "UNIR",
      period: "2025 - 2026",
      description: "Currently a Momentum master student studying data science and big data."
    },
    {
      degree: "Master's in Information and Communication Technologies",
      institution: "UNED",
      period: "2022 - 2024",
      description: "Selected in 2023 as one of the top 100 online master's programs in Spain (ranked 3rd in Education)."
    }
  ];

  return (
    <section 
      id="resume"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {t('resume.title')}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="outline" className="flex items-center gap-2 mx-auto" asChild>
              <a href="/resume.pdf" download>
                <FaDownload className="text-sm" />
                <span>{t('resume.download')}</span>
              </a>
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Left Column */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">{t('resume.more')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <a href="/contact" className="text-primary hover:text-primary-dark transition-colors flex items-center gap-2">
                    <FaEnvelope className="text-primary" />
                    <span>{t('contact.title')}</span>
                  </a>
                </div>
              </CardContent>
            </Card>
            
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">{t('resume.skills')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between">
                      <span>Data Analysis with R</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span>Python</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span>Bibliometric Analysis</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span>Database Management</span>
                      <span>80%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle>{t('resume.languages')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between">
                      <span>English</span>
                      <span>Fluent</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span>Spanish</span>
                      <span>Native</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span>Persian</span>
                      <span>Native</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Middle and Right Column */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            variants={itemVariants}
          >
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>{t('resume.summary')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Experienced Data Scientist and Researcher specializing in bibliometric analysis, data visualization, and educational technology. Skilled in R, Python, and various data analysis tools with a strong academic background.</p>
              </CardContent>
            </Card>
            
            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle>{t('resume.workExperience')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {career.map((job, index) => (
                    <div key={index} className={index < career.length - 1 ? "pb-6 border-b border-gray-200 dark:border-gray-700" : ""}>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-lg">{job.role}</h3>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{job.period}</span>
                      </div>
                      <h4 className="text-primary">{job.company}</h4>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">{job.description}</p>
                      {job.achievements && (
                        <ul className="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                          {job.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm">{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">{t('resume.education')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className={index < education.length - 1 ? "pb-6 border-b border-gray-200 dark:border-gray-700" : ""}>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{edu.period}</span>
                      </div>
                      <h4 className="text-primary">{edu.institution}</h4>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* References */}
            <Card>
              <CardHeader>
                <CardTitle>{t('resume.references')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t('resume.referencesAvailable')}</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Resume;