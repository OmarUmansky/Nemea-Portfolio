import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface FunFactsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const FunFactsPanel: React.FC<FunFactsPanelProps> = ({ isOpen, onClose }) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [hasClickedDiscovery, setHasClickedDiscovery] = useState(false);

  const funFacts = [
    {
      fact: "I love butterflies! You might have noticed since they're everywhere on this website. They represent transformation and beauty in my art. 🦋✨",
      emoji: "🦋",
      image: "/chibimariposa.png"
    },
    {
      fact: "I have two adorable dogs that are my family: Juguete and Geronimo. They're my daily inspiration and company!",
      emoji: "🐾",
      image: "/chibiperros.png"
    },
    {
      fact: "I was born on August 20, 1999. I'm 25 years old and still creating with the same passion as day one!",
      emoji: "🎂",
      image: "/chibibebe.png"
    },
    {
      fact: "I never formally studied drawing. Everything I know comes from passion and constant practice. Art comes from the heart!",
      emoji: "✏️",
      image: "/chibiabout.png"
    }
  ];

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset states when panel closes
      setCurrentFactIndex(0);
      setHasClickedDiscovery(false);
    }
  }, [isOpen]);

  const handleDiscoveryClick = () => {
    setHasClickedDiscovery(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <AnimatePresence mode="wait">
            {!hasClickedDiscovery ? (
              // Discovery Panel - ALWAYS SHOWS FIRST
              <motion.div
                key="discovery"
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: -20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={handleDiscoveryClick}
              >
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="relative w-48 h-48 mx-auto mb-6"
                  >
                    <Image
                      src="/chibiasombro.png"
                      alt="Surprised Chibi Fernanda"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </motion.div>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent mb-4"
                  >
                    YOU FOUND SOMETHING!
                  </motion.h2>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="w-16 h-16 mx-auto"
                  >
                    <div className="animate-bounce">
                      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-4 text-gray-600 dark:text-gray-300 text-lg"
                  >
                    Click here to see what it is!
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              // Fun Facts Panel - ONLY SHOWS AFTER DISCOVERY CLICK
              <motion.div
                key="facts"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full overflow-hidden"
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full md:w-1/2 relative bg-gradient-to-br from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20"
                  >
                    <div className="relative aspect-square">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentFactIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full"
                        >
                          <Image
                            src={funFacts[currentFactIndex].image}
                            alt="Chibi Fernanda"
                            fill
                            style={{ objectFit: 'contain' }}
                            className="p-8"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Content Section */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full md:w-1/2 p-8 flex flex-col justify-center"
                  >
                    <motion.h3
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent"
                    >
                      Fun Fact {currentFactIndex + 1} of {funFacts.length}
                    </motion.h3>
                    
                    <motion.div
                      key={currentFactIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-br from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20 rounded-xl p-6 mb-6"
                    >
                      <div className="text-4xl mb-4">{funFacts[currentFactIndex].emoji}</div>
                      <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
                        {funFacts[currentFactIndex].fact}
                      </p>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex space-x-2">
                        {funFacts.map((_, index) => (
                          <div
                            key={index}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              index === currentFactIndex
                                ? 'w-8 bg-gradient-to-r from-blue-600 to-orange-400'
                                : 'w-2 bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextFact}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-orange-400 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-orange-500 transition-all duration-300"
                      >
                        <span>Next Fact</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FunFactsPanel; 