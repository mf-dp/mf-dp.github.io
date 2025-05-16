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

  // Career data from translations
  const careerData = t('career.items');
  const career = Array.isArray(careerData) ? careerData : [];

  // Education data from translations
  const educationData = t('education.items');
  const education = Array.isArray(educationData) ? educationData : [];

  return (
    <section 
      id="resume"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold"
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
            <Button variant="outline" className="flex items-center gap-2">
              <FaDownload className="text-sm" />
              <span>{t('resume.download')}</span>
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
                <CardTitle>{t('resume.contact')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-primary" />
                  <span>{t('contact.email')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-primary" />
                  <span>{t('contact.phone')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{t('contact.location')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-primary" />
                  <span>johnsmith.com</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>{t('resume.skills')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between">
                      <span>UI/UX Design</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span>React / Next.js</span>
                      <span>90%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span>TypeScript</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span>Design Systems</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span>Node.js</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
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
                      <span>Native</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span>Spanish</span>
                      <span>Fluent</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between">
                      <span>German</span>
                      <span>Basic</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
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
                <p>{t('resume.summaryText')}</p>
              </CardContent>
            </Card>
            
            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle>{t('resume.workExperience')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Array.isArray(career) ? career.map((job: any, index: number) => (
                    <div key={index} className={index < career.length - 1 ? "pb-6 border-b border-gray-200 dark:border-gray-700" : ""}>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-lg">{job.role}</h3>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{job.period}</span>
                      </div>
                      <h4 className="text-primary">{job.company}</h4>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">{job.description}</p>
                      {job.achievements && Array.isArray(job.achievements) && job.achievements.length > 0 && (
                        <ul className="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                          {job.achievements.slice(0, 2).map((achievement: string, idx: number) => (
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
                <CardTitle>{t('resume.education')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {education.map((edu: any, index: number) => (
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
