'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isButterfly, setIsButterfly] = useState(true);

  useEffect(() => {
    // Primero mostramos la mariposa por 2 segundos
    const butterflyTimer = setTimeout(() => {
      setIsButterfly(false);
    }, 2000);

    // Después de la animación de transformación, ocultamos la pantalla de carga
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete();
    }, 3500);

    return () => {
      clearTimeout(butterflyTimer);
      clearTimeout(loadingTimer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center"
        >
          <div className="relative w-24 h-24">
            <AnimatePresence mode="wait">
              {isButterfly ? (
                // Mariposa
                <motion.div
                  key="butterfly"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  exit={{ scale: 0, rotate: 360 }}
                  transition={{
                    duration: 0.5,
                    rotate: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="absolute inset-0"
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full fill-current text-transparent"
                  >
                    <defs>
                      <linearGradient id="butterflyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" className="text-blue-500" style={{ stopColor: 'currentColor' }} />
                        <stop offset="100%" className="text-orange-500" style={{ stopColor: 'currentColor' }} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M50 25 C30 10 10 30 20 45 C10 60 30 80 50 65 C70 80 90 60 80 45 C90 30 70 10 50 25"
                      fill="url(#butterflyGradient)"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="scale"
                        values="1;1.1;1"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </motion.div>
              ) : (
                // Spinner
                <motion.div
                  key="spinner"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="w-full h-full rounded-full border-4 border-gray-200 dark:border-gray-700">
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent border-t-blue-500 border-r-orange-500 animate-spin"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 