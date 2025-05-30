'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const SecretPanel = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playDiscoverySound = () => {
    try {
      // Crear o reutilizar el contexto de audio
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const context = audioContextRef.current;
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      // Configurar el sonido
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, context.currentTime); // La5
      oscillator.frequency.setValueAtTime(1108.73, context.currentTime + 0.1); // Do#6
      
      // Configurar el volumen
      gainNode.gain.setValueAtTime(0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.3);
      
      // Conectar los nodos
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      // Reproducir el sonido
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.3);
    } catch (error) {
      console.error('Error playing discovery sound:', error);
    }
  };

  useEffect(() => {
    // Reproducir el sonido cuando el panel se hace visible
    if (isVisible) {
      playDiscoverySound();
    }

    // Cleanup
    return () => {
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md mx-4 relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 to-orange-500">
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl" />
            </div>

            <div className="relative">
              {/* Title */}
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent">
                You found something!
              </h2>

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Hey there! You've discovered my secret panel. Here you can find direct links to my professional profiles.
              </p>

              {/* Social Links */}
              <div className="flex flex-col gap-4">
                <a
                  href="https://github.com/OmarUmansky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
                >
                  <FaGithub className="text-2xl text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-300" />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">GitHub</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Check out my repositories</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/omar-umansky/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
                >
                  <FaLinkedin className="text-2xl text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors duration-300" />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">LinkedIn</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Connect with me professionally</p>
                  </div>
                </a>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="mt-6 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-orange-500 text-white font-semibold hover:from-blue-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecretPanel; 