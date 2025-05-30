import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

interface Firefly {
  id: number;
  x: number;
  y: number;
  scale: number;
  duration: number;
}

interface NightButterfly {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
}

const NightEffects: React.FC = () => {
  const { theme } = useTheme();
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const [butterflies, setButterflies] = useState<NightButterfly[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || theme !== 'dark') return;

    // Crear luciérnagas
    const createFireflies = () => {
      const newFireflies: Firefly[] = [];
      for (let i = 0; i < 20; i++) {
        newFireflies.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          scale: 0.5 + Math.random() * 0.5,
          duration: 3 + Math.random() * 2
        });
      }
      setFireflies(newFireflies);
    };

    // Crear mariposas nocturnas
    const createButterflies = () => {
      const newButterflies: NightButterfly[] = [];
      for (let i = 0; i < 5; i++) {
        newButterflies.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          scale: 0.3 + Math.random() * 0.3,
          rotation: Math.random() * 360,
          delay: Math.random() * 2
        });
      }
      setButterflies(newButterflies);
    };

    createFireflies();
    createButterflies();

    // Actualizar posiciones periódicamente
    const intervalId = setInterval(() => {
      createFireflies();
      createButterflies();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [mounted, theme]);

  if (!mounted || theme !== 'dark') return null;

  return (
    <>
      {/* Efecto de luz de luna */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Luz de luna principal */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-blue-100/10 via-blue-100/5 to-transparent rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/4 animate-moonlight-pulse" />
        
        {/* Resplandor ambiental */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent opacity-50" />
        
        {/* Estrellas fijas */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.5,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Luciérnagas */}
      <div className="fixed inset-0 pointer-events-none">
        <AnimatePresence>
          {fireflies.map((firefly) => (
            <motion.div
              key={firefly.id}
              className="absolute w-2 h-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                x: [
                  `${firefly.x}vw`,
                  `${firefly.x + (Math.random() * 10 - 5)}vw`,
                  `${firefly.x}vw`
                ],
                y: [
                  `${firefly.y}vh`,
                  `${firefly.y + (Math.random() * 10 - 5)}vh`,
                  `${firefly.y}vh`
                ],
                opacity: [0, 1, 0],
                scale: [0, firefly.scale, 0]
              }}
              transition={{
                duration: firefly.duration,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full rounded-full bg-yellow-200/80 blur-sm animate-firefly-glow" />
              <div className="absolute inset-0 rounded-full bg-yellow-100/50 animate-ping" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Mariposas nocturnas */}
      <div className="fixed inset-0 pointer-events-none">
        <AnimatePresence>
          {butterflies.map((butterfly) => (
            <motion.div
              key={butterfly.id}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                x: [
                  `${butterfly.x}vw`,
                  `${butterfly.x + (Math.random() * 20 - 10)}vw`,
                  `${butterfly.x}vw`
                ],
                y: [
                  `${butterfly.y}vh`,
                  `${butterfly.y + (Math.random() * 20 - 10)}vh`,
                  `${butterfly.y}vh`
                ],
                opacity: 1,
                scale: butterfly.scale,
                rotate: [
                  butterfly.rotation,
                  butterfly.rotation + (Math.random() * 40 - 20),
                  butterfly.rotation
                ]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: butterfly.delay
              }}
            >
              <div className="relative w-8 h-8 animate-night-flutter">
                <div className="absolute inset-0 butterfly-night" />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-300/20 blur-sm" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default NightEffects; 