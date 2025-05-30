import React, { useEffect } from 'react';
import { useEasterEggStore } from '@/store/easterEggStore';
import DJMode from './easter-eggs/DJMode';
import RetroMode from './easter-eggs/RetroMode';

interface EasterEggState {
  toggleDJMode: () => void;
  toggleRetroMode: () => void;
}

const EasterEggs: React.FC = () => {
  const toggleDJMode = useEasterEggStore((state: EasterEggState) => state.toggleDJMode);
  const toggleRetroMode = useEasterEggStore((state: EasterEggState) => state.toggleRetroMode);

  useEffect(() => {
    let typedKeys = '';
    let lastKeyTime = Date.now();

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentTime = Date.now();
      
      // Reiniciar si pasó mucho tiempo entre teclas
      if (currentTime - lastKeyTime > 1000) {
        typedKeys = '';
      }
      
      typedKeys += e.key.toLowerCase();
      lastKeyTime = currentTime;

      // Activadores de easter eggs
      if (typedKeys.endsWith('dj')) {
        toggleDJMode();
        typedKeys = '';
      } else if (typedKeys.endsWith('retro')) {
        toggleRetroMode();
        typedKeys = '';
      }

      // Limitar la longitud de las teclas almacenadas
      if (typedKeys.length > 10) {
        typedKeys = typedKeys.slice(-10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleDJMode, toggleRetroMode]);

  return (
    <>
      <DJMode />
      <RetroMode />
    </>
  );
};

export default EasterEggs; 