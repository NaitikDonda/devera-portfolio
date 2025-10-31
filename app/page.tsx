'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Globe, Zap, Sparkles, Code, Palette, Rocket, Star, Heart, Lightbulb, Award, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import ContactForm from '@/components/ContactForm'
import ReviewsSection from '@/components/ReviewsSection'
import FounderSection from '@/components/FounderSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Floating Icons */}
      <FloatingElements />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Founder Section */}
      <FounderSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Contact Form */}
      <ContactForm />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  )
}

function FloatingElements() {
  const floatingIcons = [
    { Icon: Star, position: 'top-1/4 left-[15%]', delay: 0, color: 'text-yellow-400' },
    { Icon: Heart, position: 'top-[35%] right-[12%]', delay: 1.5, color: 'text-pink-400' },
    { Icon: Lightbulb, position: 'bottom-[30%] left-[10%]', delay: 2.5, color: 'text-orange-400' },
    { Icon: Award, position: 'bottom-[20%] right-[15%]', delay: 3.5, color: 'text-blue-400' },
    { Icon: Sparkles, position: 'top-[60%] left-[8%]', delay: 4, color: 'text-purple-400' },
    { Icon: Rocket, position: 'top-[45%] right-[8%]', delay: 1, color: 'text-cyan-400' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.position} hidden lg:block`}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay
          }}
        >
          <div className="glass p-3 rounded-2xl backdrop-blur-md">
            <item.Icon size={24} className={item.color} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold gradient-text"
        >
          DEVERA
        </motion.div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#home" className="text-white/80 hover:text-white transition-colors">Home</a>
          <a href="#portfolio" className="text-white/80 hover:text-white transition-colors">Portfolio</a>
          <a href="#founder" className="text-white/80 hover:text-white transition-colors">Founder</a>
          <a href="#reviews" className="text-white/80 hover:text-white transition-colors">Reviews</a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass px-6 py-2 rounded-full hover:bg-white/10 transition-all"
          >
            Contact Us
          </motion.a>
        </div>
      </div>
    </motion.nav>
  )
}

function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Crafting Digital
            <br />
            <span className="gradient-text">Experiences</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            We create stunning websites that elevate your brand and engage your audience.
            Transform your vision into reality with Devera.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(102, 126, 234, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="gradient-border px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              View Our Work <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
            >
              Get Started
            </motion.a>
          </motion.div>

          {/* NPM Style Resume Download */}
          <motion.div
                className="mt-8 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 inline-block max-w-full overflow-x-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="flex items-center space-x-2 text-sm font-mono">
                  <span className="text-gray-400">$</span>
                  <span className="text-green-400">npm</span>
                  <span className="text-white">i</span>
                  <span className="text-yellow-300">resume</span>
                  <Link 
                    href="/resume"
                    className="ml-4 text-blue-400 hover:underline flex items-center group"
                  >
                    <span>View Interactive Resume</span>
                    <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
        </motion.div>

        {/* Floating icons */}
        <div className="absolute top-1/3 left-10 hidden lg:block">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="glass p-4 rounded-2xl"
          >
            <Globe size={32} className="text-purple-400" />
          </motion.div>
        </div>
        <div className="absolute top-1/2 right-10 hidden lg:block">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass p-4 rounded-2xl"
          >
            <Zap size={32} className="text-blue-400" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: <Code size={32} />,
      title: "Modern Development",
      description: "Built with cutting-edge technologies for optimal performance"
    },
    {
      icon: <Palette size={32} />,
      title: "Beautiful Design",
      description: "Stunning interfaces that captivate and convert visitors"
    },
    {
      icon: <Rocket size={32} />,
      title: "Fast Delivery",
      description: "Quick turnaround without compromising on quality"
    }
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Devera?</h2>
          <p className="text-white/60 text-lg">We deliver excellence in every pixel</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass p-8 rounded-3xl hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="text-purple-400 mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  )
}

function PortfolioSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [visibleProjects, setVisibleProjects] = useState(3)

  const projects = [
    {
      title: "Amari Jewels",
      category: "Portfolio Project",
      description: "A modern portfolio platform showcasing jewelry design work and collections",
      color: "from-purple-500 to-pink-500",
      tags: ["HTML", "CSS", "JavaScript", "Responsive", "Portfolio"],
      url: "https://amarijewels.co/",
      image: "/amari-jewels-preview.jpg"
    },
    {
      title: "Charon Jewel",
      category: "E-commerce Platform",
      description: "A fully-featured Shopify store for luxury jewelry with custom theming and product showcases",
      color: "from-amber-500 to-yellow-500",
      tags: ["Shopify", "Liquid", "JavaScript", "E-commerce", "Responsive"],
      url: "https://charonjewel.com/",
      image: "/charon-jewel-preview.jpg"
    },
    {
      title: "KindnessKart",
      category: "Donation Platform",
      description: "A donation platform connecting generous donors with NGOs and social causes",
      color: "from-green-500 to-emerald-500",
      tags: ["React.js", "Tailwind CSS", "Supabase", "Donation", "Responsive"],
      url: "https://kindnesskart.vercel.app/",
      image: "/kindnesskart-preview.jpg"
    },
    {
      title: "SerenitySpace",
      category: "Health Management",
      description: "Comprehensive health platform for tracking vitals, appointments, and medication schedules",
      color: "from-indigo-500 to-blue-500",
      tags: ["HTML", "CSS", "JavaScript", "Health Tech", "Responsive"],
      url: "https://serenity-space-eight.vercel.app/login.html",
      image: "/serenityspace-preview.jpg"
    },
    {
      title: "CodeSage",
      category: "AI Code Review",
      description: "AI-powered code review platform that analyzes, rates, and provides educational feedback on code submissions. Created for Google Developers Group Hackathon.",
      color: "from-purple-600 to-indigo-600",
      tags: ["Gemini API", "JavaScript", "AI/ML", "Hackathon Project", "Code Review"],
      url: "https://code-sage-khaki.vercel.app/",
      image: "/codesage-preview.jpg"
    },
    {
      title: "EarthRoot Solar",
      category: "Renewable Energy",
      description: "Informational website for a solar energy solutions provider, showcasing services and sustainable energy solutions",
      color: "from-amber-400 to-orange-500",
      tags: ["HTML", "CSS", "JavaScript", "Responsive", "UI/UX"],
      url: "http://earthrootsolar.in/index.html",
      image: "/earthroot-solar-preview.jpg"
    }
  ]

  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, projects.length));
  };

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-white/60 text-lg">Showcasing our best work</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="glass rounded-3xl overflow-hidden cursor-pointer group"
            >
              <div className={`h-48 relative overflow-hidden ${!project.image ? 'bg-gradient-to-br ' + project.color : ''}`}>
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute top-3 left-3 right-3 bg-white/10 rounded-lg backdrop-blur-sm p-2">
                      <div className="flex gap-1.5 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      </div>
                      <div className="h-1.5 bg-white/20 rounded-full w-3/4"></div>
                    </div>
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 h-24 flex items-center justify-center"
                    >
                      <Sparkles size={48} className="text-white/50" />
                    </motion.div>
                  </>
                )}
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                  <div className="h-2 bg-white/20 rounded-full w-2/3"></div>
                  <div className="h-2 bg-white/20 rounded-full w-1/2"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition-all"></div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-purple-400">{project.category}</span>
                  {project.url && (
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-white/50 hover:text-purple-400 transition-colors flex items-center"
                      onClick={e => e.stopPropagation()}
                    >
                      Visit Site <ExternalLink size={12} className="ml-1" />
                    </a>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-white/60 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-3 py-1 rounded-full glass text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleProjects < projects.length && (
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={loadMoreProjects}
              className="px-8 py-3 rounded-full glass hover:bg-white/10 transition-all flex items-center gap-2 group"
            >
              Load More
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="gradient-border rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Let's create something amazing together. Get in touch with our team today.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(102, 126, 234, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="glass px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all inline-flex items-center gap-2"
          >
            Contact Us Now <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold gradient-text mb-4">DEVERA</div>
            <p className="text-white/60">Crafting digital experiences that matter.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Get Started</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Leave a Review</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">View Work</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/60">
              <li>deveracrew@gmail.com</li>
              <li>+91 83293 55641</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-white/40 pt-8 border-t border-white/10">
          <p>&copy; 2025 Devera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
