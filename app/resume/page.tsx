'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Download, Mail, Phone, Github, Linkedin, Code, Briefcase, GraduationCap, Award as AwardIcon, User, ExternalLink, Globe } from 'lucide-react';
import Link from 'next/link';

const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass p-6 rounded-2xl mb-8 border border-gray-700/50"
  >
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
      <Icon className="text-indigo-400" size={24} />
      {title}
    </h2>
    {children}
  </motion.section>
);

const ExperienceItem = ({ role, company, duration, description }: { role: string; company: string; duration: string; description: string[] }) => (
  <div className="mb-6 last:mb-0">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-xl font-semibold text-white">{role}</h3>
        <p className="text-indigo-300">{company}</p>
      </div>
      <span className="bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full text-sm">
        {duration}
      </span>
    </div>
    <ul className="mt-3 space-y-2">
      {description.map((item, i) => (
        <li key={i} className="flex items-start">
          <span className="text-indigo-400 mr-2 mt-1">•</span>
          <span className="text-gray-300">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const SkillChip = ({ name, level }: { name: string; level: number }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-300">{name}</span>
      <span className="text-indigo-300">{level}%</span>
    </div>
    <div className="h-1.5 bg-gray-800 rounded-full">
      <div 
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <Link href="/" className="glass-button inline-flex items-center text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Portfolio
          </Link>
          <a 
            href="/Naitik-Donda Resume.pdf" 
            download
            className="gradient-button inline-flex items-center text-sm sm:text-base px-4 py-2 rounded-lg font-medium"
          >
            <Download size={16} className="mr-2" />
            Download PDF
          </a>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">NAITIK DONDA</h1>
          <p className="text-lg text-gray-300">Mumbai, MH India</p>
          <p className="text-gray-400">dondanaitik@gmail.com / +91 83293 55641</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <Section title="Summary" icon={User}>
              <p className="text-gray-300">
                Freelance professional with 2 years of client-focused experience and an internship at IOFT specializing in AR/VR, IoT, and Python. 
                Developed innovative projects including a VR car game, an AR body-part scanning application, and an IoT smoke/fire detection system. 
                Academic projects include KindnessKart, a donation platform, and SerenitySpace, a digital health management system.
              </p>
            </Section>

            <Section title="Skills" icon={Code}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-indigo-400 mr-2 text-xs">+</span>
                    <span className="text-sm sm:text-base">Project management</span>
                  </div>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">+</span>
                      <span>Client communication</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">+</span>
                      <span>AR/VR development</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">+</span>
                      <span>Internet of Things (IoT)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">+</span>
                      <span>3D modeling</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">+</span>
                      <span>Presentations</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">+</span>
                      <span>Computer skills</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">+</span>
                      <span>Billing and coding</span>
                    </li>
                  <div className="flex items-center">
                    <span className="text-indigo-400 mr-2 text-xs">+</span>
                    <span className="text-sm sm:text-base">Fast learner</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-indigo-400 mr-2 text-xs">+</span>
                    <span className="text-sm sm:text-base">Research & analysis</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-indigo-400 mr-2 text-xs">+</span>
                    <span className="text-sm sm:text-base">Web Development</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-indigo-400 mr-2 text-xs">+</span>
                    <span className="text-xs sm:text-sm">SW Documentation</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-indigo-400 mr-2 text-xs">+</span>
                    <span className="text-sm sm:text-base">Website updating</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-indigo-400 mr-2 text-xs">+</span>
                    <span className="text-sm sm:text-base">Application deployment</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-indigo-400 mr-2 text-xs">+</span>
                    <span className="text-sm sm:text-base">Frontend development</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-indigo-400 mr-2 text-xs">+</span>
                    <span className="text-sm sm:text-base">Graphic Design</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-indigo-400 mr-2 text-xs">+</span>
                    <span className="text-sm sm:text-base">Video editing</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-indigo-400 mr-2 text-xs">+</span>
                    <span className="text-sm sm:text-base">Social Media Management</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-indigo-400 mr-2 text-xs">+</span>
                    <span className="text-sm sm:text-base">3D Animation</span>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Education" icon={GraduationCap}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-white">B.E/B.Tech: Data Science</h3>
                  <p className="text-indigo-300 text-sm">NMIMS Deemed-to-be-University, MPSTME - Ville Parle (W), Mumbai</p>
                  <p className="text-gray-400 text-sm">Expected in 07/2028</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Diploma: Computer Engineering</h3>
                  <p className="text-indigo-300 text-sm">Thakur Polytechnic - Kandivali (E), Mumbai</p>
                  <p className="text-gray-400 text-sm">06/2025</p>
                </div>
              </div>
            </Section>


            <Section title="Certifications" icon={AwardIcon}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Completed Courses:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>Web Development</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>3D Animation</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>3D Modeling</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>Unity (IOFT)</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>Unreal Engine</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>Blender</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>Product Visualization</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Languages:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>Hindi: <span className="text-gray-400">Native</span></span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>English: <span className="text-gray-400">Professional Working Proficiency (B1)</span></span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>Gujarati: <span className="text-gray-400">Proficient (C2)</span></span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>Marathi: <span className="text-gray-400">Elementary (A2)</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="Websites & Profiles" icon={Globe}>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Linkedin size={16} className="text-indigo-400 mr-3" />
                  <a href="https://www.linkedin.com/in/naitik-donda/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center">
                    linkedin.com/in/naitik-donda <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
                <div className="flex items-center">
                  <Globe size={16} className="text-indigo-400 mr-3" />
                  <a href="https://devera-aoow.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center">
                    devera-aoow.vercel.app <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
                <div className="flex items-center">
                  <Globe size={16} className="text-indigo-400 mr-3" />
                  <a href="https://kindnesskart.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center">
                    kindnesskart.vercel.app <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
                <div className="flex items-center">
                  <Globe size={16} className="text-indigo-400 mr-3" />
                  <a href="https://serenity-space-dow3.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center">
                    serenity-space.vercel.app <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </Section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Experience" icon={Briefcase}>
              <ExperienceItem
                role="Internship"
                company="IOFT"
                duration="Mumbai, MH, IN • 05/2024 - 06/2024"
                description={[
                  "Completed an internship at IOFT, working on AR/VR, IoT, and Python",
                  "Developed projects including a VR car game and realistic 3D environment",
                  "Created an AR app that scans body parts to display information",
                  "Built IoT smoke and fire detection systems with real-time monitoring",
                  "Enhanced programming skills in Python for problem-solving and project development"
                ]}
              />
              <ExperienceItem
                role="Freelance Professional"
                company="Self-Employed"
                duration="Mumbai, MH, IN • 2022 - Present"
                description={[
                  "Successfully completed 2 years of client-focused freelance work",
                  "Independently source clients, understand requirements, and deliver tailored solutions",
                  "Managed multiple projects with diverse requirements",
                  "Developed strong client communication and project management skills",
                  "Ensured timely delivery of high-quality work to client satisfaction"
                ]}
              />
            </Section>

            <Section title="Projects" icon={Code}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-white">AI Chatbot for Government (Hackathon Project)</h3>
                  <p className="text-gray-400 text-sm">Developed within 24 hours during a hackathon, designed to provide quick and intelligent responses for government-related queries.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">SerenitySpace</h3>
                  <p className="text-gray-400 text-sm">A digital health management platform with medication tracking, appointment reminders, and vital metrics visualization.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">KindnessKart</h3>
                  <p className="text-gray-400 text-sm">An online donation platform connecting donors with orphanages, built using React, TypeScript, Tailwind CSS, and Supabase.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">VR Car Game</h3>
                  <p className="text-gray-400 text-sm">A virtual reality game featuring an immersive driving experience with realistic physics and environments.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">AR Body-Scan App</h3>
                  <p className="text-gray-400 text-sm">An AR application that scans body parts and displays detailed educational information.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white">IoT Smoke & Fire Detection System</h3>
                  <p className="text-gray-400 text-sm">An IoT-based solution that detects smoke/fire in real-time for safety monitoring.</p>
                </div>
              </div>
            </Section>

            <Section title="Achievements" icon={AwardIcon}>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2 mt-1">•</span>
                  <span className="text-gray-300">Successfully completed 2 years of client-focused freelance work</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2 mt-1">•</span>
                  <span className="text-gray-300">Published article on "Modern Web Development" in Dev.to</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2 mt-1">•</span>
                  <span className="text-gray-300">Open Source Contributor to React and Next.js</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2 mt-1">•</span>
                  <span className="text-gray-300">Developed multiple successful projects in AR/VR and IoT domains</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2 mt-1">•</span>
                  <span className="text-gray-300">Successfully completed courses in Web Development, 3D Animation, and Unity</span>
                </li>
              </ul>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
