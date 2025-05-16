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

  const skillCategories = [
    {
      id: 'design',
      icon: <FaPaintBrush className="text-2xl text-primary mr-3" />,
      title: t('skills.design.title'),
      items: t<any[]>('skills.design.items', 'skills')
    },
    {
      id: 'frontend',
      icon: <FaCode className="text-2xl text-primary mr-3" />,
      title: t('skills.frontend.title'),
      items: t<any[]>('skills.frontend.items', 'skills')
    },
    {
      id: 'tools',
      icon: <FaToolbox className="text-2xl text-primary mr-3" />,
      title: t('skills.tools.title'),
      items: t<any[]>('skills.tools.items', 'skills')
    },
    {
      id: 'soft',
      icon: <FaComments className="text-2xl text-primary mr-3" />,
      title: t('skills.soft.title'),
      items: t<any[]>('skills.soft.items', 'skills')
    },
    {
      id: 'backend',
      icon: <FaDatabase className="text-2xl text-primary mr-3" />,
      title: t('skills.backend.title'),
      items: t<any[]>('skills.backend.items', 'skills')
    },
    {
      id: 'uxresearch',
      icon: <FaSearch className="text-2xl text-primary mr-3" />,
      title: t('skills.uxresearch.title'),
      items: t<any[]>('skills.uxresearch.items', 'skills')
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
          {skillCategories.map((category) => (
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
