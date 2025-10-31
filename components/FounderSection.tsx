'use client'

import { motion } from 'framer-motion'
import { User, Code, Palette, Video, Smartphone, Lightbulb, Award, Briefcase, Instagram, Linkedin } from 'lucide-react'

export default function FounderSection() {
  const skills = [
    { name: "Project management", icon: <Briefcase size={20} /> },
    { name: "Client communication", icon: <User size={20} /> },
    { name: "AR/VR development", icon: <Smartphone size={20} /> },
    { name: "Internet of Things", icon: <Code size={20} /> },
    { name: "Problem solving", icon: <Lightbulb size={20} /> },
    { name: "3D modeling", icon: <Award size={20} /> },
    { name: "Presentations", icon: <Briefcase size={20} /> },
    { name: "Computer skills", icon: <Code size={20} /> },
    { name: "Billing and coding", icon: <Code size={20} /> },
    { name: "Fast learner", icon: <Lightbulb size={20} /> },
    { name: "Research and analysis", icon: <Award size={20} /> },
    { name: "HTML", icon: <Code size={20} /> },
    { name: "Software documentation", icon: <Briefcase size={20} /> },
    { name: "Website updating", icon: <Code size={20} /> },
    { name: "Application deployment", icon: <Smartphone size={20} /> },
    { name: "Front-end development", icon: <Code size={20} /> },
    { name: "Graphic Designer", icon: <Palette size={20} /> },
    { name: "Video editor", icon: <Video size={20} /> },
    { name: "Social Media Management", icon: <User size={20} /> },
    { name: "3D Animator", icon: <Award size={20} /> },
  ]

  return (
    <section id="founder" className="py-20 px-6 bg-black/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet the Founder</h2>
          <p className="text-white/60 text-lg">Passionate about creating exceptional digital experiences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Founder Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-3xl p-8 sticky top-24">
              {/* Avatar */}
              <div className="relative mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-purple-400/30"
                >
                  <img 
                    src="/founder_image.png" 
                    alt="Naitik Donda"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <div className="glass px-4 py-1 rounded-full text-sm">
                    ✨ Founder
                  </div>
                </div>
              </div>

              {/* Name and Title */}
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">Naitik Donda</h3>
                <p className="text-purple-400 font-semibold mb-1">Founder & CEO</p>
                <p className="text-white/60 text-sm">Devera</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">20+</div>
                  <div className="text-sm text-white/60">Skills</div>
                </div>
                <div className="glass rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">6+</div>
                  <div className="text-sm text-white/60">Projects</div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-white/70 text-center text-sm leading-relaxed mb-6">
                A versatile developer and designer with expertise in full-stack development, 
                3D modeling, and creative design. Passionate about building innovative solutions 
                that make a difference.
              </p>
              
              {/* Social Links */}
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-center space-x-4">
                  <a 
                    href="https://www.instagram.com/naitik_donda/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-white/70 hover:text-pink-500 transition-colors"
                  >
                    <Instagram className="mr-2" size={18} />
                    <span className="text-sm">@naitik_donda</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/naitik-donda/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-white/70 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="mr-2" size={18} />
                    <span className="text-sm">naitik donda</span>
                  </a>
                </div>
                <div className="w-full h-px bg-white/10 my-2"></div>
                <a 
                  href="https://www.instagram.com/_devera_/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-white/70 hover:text-purple-400 transition-colors"
                >
                  <Instagram className="mr-2" size={18} />
                  <span className="text-sm">@_devera_</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="text-purple-400" size={28} />
                Skills & Expertise
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03, x: 5 }}
                    className="glass rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className="text-purple-400 group-hover:text-cyan-400 transition-colors">
                      {skill.icon}
                    </div>
                    <span className="text-white/90 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20"
              >
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Lightbulb className="text-yellow-400" size={20} />
                  Core Strengths
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Expert in <span className="text-purple-400 font-semibold">full-stack development</span>, 
                  <span className="text-cyan-400 font-semibold"> 3D modeling & animation</span>, and 
                  <span className="text-pink-400 font-semibold"> creative design</span>. 
                  Specialized in AR/VR development, IoT solutions, and modern web technologies. 
                  A fast learner with strong problem-solving abilities and excellent communication skills.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
