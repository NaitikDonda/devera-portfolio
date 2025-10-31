'use client'

import { motion } from 'framer-motion'

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative">
        {/* Orbiting circles */}
        <div className="relative w-32 h-32">
          {/* Center pulsing circle */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Orbiting dots */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.2,
              }}
            >
              <motion.div
                className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                style={{
                  position: 'absolute',
                  left: '50px',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Loading text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.p
            className="text-white text-lg font-semibold"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Processing...
          </motion.p>
          
          {/* Bouncing dots */}
          <div className="flex justify-center gap-1 mt-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full bg-purple-400"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
