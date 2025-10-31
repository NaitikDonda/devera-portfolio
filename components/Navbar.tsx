'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // Close menu when clicking outside
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation variants
  const menuVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      x: '-100%', 
      opacity: 0,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.05 * i,
        type: 'spring',
        stiffness: 100
      }
    })
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-sm py-2' : 'bg-gray-900/90 py-4'}`}
      ref={menuRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-white text-2xl font-bold z-50"
            onClick={() => setIsOpen(false)}
          >
            Devera
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-800/50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 -mr-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile menu */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-gray-900/95 backdrop-blur-md shadow-2xl z-40 md:hidden overflow-y-auto"
            >
              <div className="h-16 flex items-center px-6 border-b border-gray-800">
                <Link 
                  href="/" 
                  className="text-white text-xl font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Devera
                </Link>
              </div>
              
              <nav className="px-2 py-4">
                <ul className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={item.name}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-6 py-4 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                      {index < navItems.length - 1 && (
                        <div className="border-t border-gray-800 mx-6" />
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
