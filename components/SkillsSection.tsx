'use client';

import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: 90 },
  { name: 'Next.js', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'Node.js', level: 75 },
  { name: 'Tailwind CSS', level: 90 },
  { name: 'GraphQL', level: 70 },
  { name: 'Python', level: 75 },
  { name: 'Docker', level: 65 },
  { name: 'AWS', level: 70 },
  { name: 'MongoDB', level: 80 },
  { name: 'PostgreSQL', level: 75 },
  { name: 'Redux', level: 85 },
  { name: 'Jest', level: 80 },
  { name: 'Git', level: 90 },
  { name: 'CI/CD', level: 75 },
];

const SkillsSection = () => {
  // Calculate height based on 5 items (3.5rem each) + padding
  const containerHeight = '11rem'; // 5 * 2.5rem + 1.5rem padding

  return (
    <section id="skills" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">My Skills</h2>
          <p className="mt-3 text-xl text-gray-300">Technologies I work with</p>
        </div>

        {/* Mobile Skills - Vertical Scroll */}
        <div className="md:hidden">
          <div className="relative">
            <div 
              className="overflow-y-auto pr-2"
              style={{ height: containerHeight }}
            >
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={`mobile-${skill.name}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 border border-gray-700/50"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white truncate pr-2">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-300 whitespace-nowrap">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                      <motion.div
                        className="h-1.5 rounded-full bg-indigo-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.02 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Gradient fade effect at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Desktop Skills Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={`desktop-${skill.name}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50"
            >
              <h3 className="text-lg font-semibold text-white mb-3">{skill.name}</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <motion.div
                  className="h-2.5 rounded-full bg-indigo-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-400 text-right">{skill.level}%</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="flex overflow-x-auto pb-6 -mx-4 px-4 hide-scrollbar">
              <div className="flex space-x-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="flex-shrink-0 w-40 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3">{skill.name}</h3>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full bg-indigo-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-400 text-right">{skill.level}%</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-r from-transparent to-gray-900/50 pointer-events-none"></div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">← Scroll to see more →</p>
          <style jsx>{`
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
