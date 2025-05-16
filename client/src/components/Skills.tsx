import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';
import { FaPaintBrush, FaCode, FaToolbox, FaComments, FaDatabase, FaSearch } from 'react-icons/fa';

export function Skills() {
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

  // Get skill items from translations
  const getSkillItems = (category: string) => {
    try {
      const items = t(`skills.${category}.items`);
      return Array.isArray(items) ? items : [];
    } catch (error) {
      console.warn(`Could not get items for ${category}`, error);
      return [];
    }
  };

  const skillCategories = [
    {
      id: 'design',
      icon: <FaPaintBrush className="text-2xl text-primary mr-3" />,
      title: t('skills.design.title'),
      items: getSkillItems('design')
    },
    {
      id: 'frontend',
      icon: <FaCode className="text-2xl text-primary mr-3" />,
      title: t('skills.frontend.title'),
      items: getSkillItems('frontend')
    },
    {
      id: 'tools',
      icon: <FaToolbox className="text-2xl text-primary mr-3" />,
      title: t('skills.tools.title'),
      items: getSkillItems('tools')
    },
    {
      id: 'soft',
      icon: <FaComments className="text-2xl text-primary mr-3" />,
      title: t('skills.soft.title'),
      items: getSkillItems('soft')
    },
    {
      id: 'backend',
      icon: <FaDatabase className="text-2xl text-primary mr-3" />,
      title: t('skills.backend.title'),
      items: getSkillItems('backend')
    },
    {
      id: 'uxresearch',
      icon: <FaSearch className="text-2xl text-primary mr-3" />,
      title: t('skills.uxresearch.title'),
      items: getSkillItems('uxresearch')
    }
  ];

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

  // Create sample skill data to ensure the component still renders
  const sampleSkillData = {
    design: [
      { name: "UI/UX Design", level: 5 },
      { name: "Figma / Adobe XD", level: 4 },
      { name: "Design Systems", level: 5 },
      { name: "Wireframing", level: 4 }
    ],
    frontend: [
      { name: "React / Next.js", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Responsive Design", level: 5 }
    ],
    tools: [
      { name: "Git / GitHub", level: 5 },
      { name: "Agile / Scrum", level: 4 },
      { name: "CI/CD", level: 3 },
      { name: "Testing", level: 4 }
    ],
    soft: [
      { name: "Communication", level: 5 },
      { name: "Problem Solving", level: 5 },
      { name: "Team Collaboration", level: 4 },
      { name: "Time Management", level: 4 }
    ],
    backend: [
      { name: "Node.js", level: 4 },
      { name: "Express / NestJS", level: 3 },
      { name: "MongoDB / PostgreSQL", level: 3 },
      { name: "GraphQL", level: 3 }
    ],
    uxresearch: [
      { name: "User Interviews", level: 4 },
      { name: "Usability Testing", level: 4 },
      { name: "A/B Testing", level: 3 },
      { name: "Information Architecture", level: 4 }
    ]
  };

  // Update skillCategories to use the sample data
  const updatedSkillCategories = [
    {
      id: 'design',
      icon: <FaPaintBrush className="text-2xl text-primary mr-3" />,
      title: t('skills.design.title'),
      items: sampleSkillData.design
    },
    {
      id: 'frontend',
      icon: <FaCode className="text-2xl text-primary mr-3" />,
      title: t('skills.frontend.title'),
      items: sampleSkillData.frontend
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
      id: 'backend',
      icon: <FaDatabase className="text-2xl text-primary mr-3" />,
      title: t('skills.backend.title'),
      items: sampleSkillData.backend
    },
    {
      id: 'uxresearch',
      icon: <FaSearch className="text-2xl text-primary mr-3" />,
      title: t('skills.uxresearch.title'),
      items: sampleSkillData.uxresearch
    }
  ];

  return (
    <section 
      id="skills"
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
          {t('skills.title')}
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {updatedSkillCategories.map((category) => (
            <motion.div 
              key={category.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 card-hover transition-transform hover:-translate-y-1"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.items.map((skill, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
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
