import { useLanguage } from '@/context/LanguageContext';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef, useEffect } from 'react';
import { FaPaintBrush, FaCode, FaToolbox, FaComments, FaDatabase, FaSearch, FaChartBar, FaLaptopCode, FaBrain, FaRobot, FaNetworkWired, FaCloudUploadAlt } from 'react-icons/fa';

// Define skill item type
interface SkillItem {
  name: string;
  level: number;
}

// Define skill category type
interface SkillCategory {
  id: string;
  icon: JSX.Element;
  title: string;
  items: SkillItem[];
}

export function Skills() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  const controls = useAnimation();
  
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
    hidden: { y: 30, opacity: 0 },
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
  
  const skillBarVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (custom: number) => ({
      width: `${custom * 20}%`,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3
      }
    })
  };
  
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15
      }
    },
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

  // Create sample skill data to ensure the component still renders
  const sampleSkillData: Record<string, SkillItem[]> = {
    dataAnalysis: [
      { name: "Data Analysis with R", level: 5 },
      { name: "Python", level: 4 },
      { name: "Statistical Analysis", level: 5 },
      { name: "Artificial Intelligence", level: 4 }
    ],
    visualization: [
      { name: "Chart Creation", level: 5 },
      { name: "Visualization Tools", level: 4 },
      { name: "Interactive Dashboards", level: 4 },
      { name: "Data Storytelling", level: 5 }
    ],
    tools: [
      { name: "SPSS", level: 5 },
      { name: "VosViewer", level: 5 },
      { name: "Nvivo / MAXQDA", level: 4 },
      { name: "Mendeley", level: 5 }
    ],
    soft: [
      { name: "Scientific Research", level: 5 },
      { name: "Bibliometric Analysis", level: 5 },
      { name: "Scientometric Analysis", level: 5 },
      { name: "Academic Writing", level: 5 }
    ],
    analytics: [
      { name: "Structural Equation Modeling", level: 4 },
      { name: "Smart-PLS4 / Lisrel / Amos", level: 4 },
      { name: "Meta Analysis (CMA)", level: 4 },
      { name: "Inferential Statistics", level: 4 }
    ],
    web: [
      { name: "Web Design", level: 4 },
      { name: "Database Management", level: 4 },
      { name: "Database Automatization", level: 3 },
      { name: "Digital Competence", level: 5 }
    ]
  };

  // Render skill dots based on level (1-5)
  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`w-2 h-2 rounded-full ${i < level ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
          ></span>
        ))}
      </div>
    );
  };

  // Create skill categories with appropriate icons
  const skillCategories: SkillCategory[] = [
    {
      id: 'dataAnalysis',
      icon: <FaDatabase className="text-2xl text-primary mr-3" />,
      title: t('skills.dataAnalysis.title'),
      items: sampleSkillData.dataAnalysis
    },
    {
      id: 'visualization',
      icon: <FaChartBar className="text-2xl text-primary mr-3" />,
      title: t('skills.visualization.title'),
      items: sampleSkillData.visualization
    },
    {
      id: 'tools',
      icon: <FaToolbox className="text-2xl text-primary mr-3" />,
      title: t('skills.tools.title'),
      items: sampleSkillData.tools
    },
    {
      id: 'soft',
      icon: <FaComments className="text-2xl text-primary mr-3" />,
      title: t('skills.soft.title'),
      items: sampleSkillData.soft
    },
    {
      id: 'analytics',
      icon: <FaSearch className="text-2xl text-primary mr-3" />,
      title: t('skills.analytics.title'),
      items: sampleSkillData.analytics
    },
    {
      id: 'web',
      icon: <FaLaptopCode className="text-2xl text-primary mr-3" />,
      title: t('skills.web.title'),
      items: sampleSkillData.web
    }
  ];

  return (
    <section 
      id="skills"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {t('skills.title')}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {skillCategories.map((category) => (
            <motion.div 
              key={category.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
            >
              <div className="flex items-center mb-6">
                {category.icon}
                <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">{category.title}</h3>
              </div>
              <ul className="space-y-4">
                {category.items.map((skill, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                    {renderSkillLevel(skill.level)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
