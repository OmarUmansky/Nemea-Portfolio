import React, { useEffect, useState, useCallback } from 'react';
import { useEasterEggStore } from '@/store/easterEggStore';
import Image from 'next/image';

const RetroMode: React.FC = () => {
  const isRetroMode = useEasterEggStore((state: { isRetroMode: boolean }) => state.isRetroMode);
  const [showStartMessage, setShowStartMessage] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [previousMode, setPreviousMode] = useState(isRetroMode);

  const playRetroSound = useCallback((type: 'start' | 'end') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configurar el tipo de onda y frecuencia según si es inicio o fin
    if (type === 'start') {
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // La
      oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } else {
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    }

    // Limpiar el contexto después de que termine el sonido
    setTimeout(() => {
      audioContext.close();
    }, 1000);
  }, []);

  useEffect(() => {
    // Mostrar mensaje de fin si estábamos en modo retro y ahora no
    if (previousMode && !isRetroMode) {
      setShowEndMessage(true);
      playRetroSound('end');
      const endMessageTimer = setTimeout(() => {
        setShowEndMessage(false);
      }, 3000);
      return () => clearTimeout(endMessageTimer);
    }

    // Actualizar el estado previo
    setPreviousMode(isRetroMode);

    if (!isRetroMode) {
      document.body.classList.remove('retro-mode');
      setShowStartMessage(false);
      return;
    }

    document.body.classList.add('retro-mode');
    setShowStartMessage(true);
    setShowEndMessage(false);
    playRetroSound('start');

    const startMessageTimer = setTimeout(() => {
      setShowStartMessage(false);
    }, 3000);

    return () => {
      document.body.classList.remove('retro-mode');
      clearTimeout(startMessageTimer);
    };
  }, [isRetroMode, previousMode, playRetroSound]);

  return (
    <>
      {/* Mensaje de inicio del modo retro */}
      {showStartMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black/80 p-8 rounded-2xl transform animate-dance-message">
            <div className="text-4xl font-bold text-white mb-4 text-center animate-neon-text font-['Press_Start_2P']">
              RETRO MODE ON!
            </div>
            <div className="relative w-48 h-48 mx-auto">
              <Image
                src="/chibiretro.png"
                alt="Retro Chibi"
                fill
                style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de fin del modo retro */}
      {showEndMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black/80 p-8 rounded-2xl transform animate-dance-message">
            <div className="text-4xl font-bold text-white mb-4 text-center animate-neon-text font-['Press_Start_2P']">
              RETRO MODE OFF
            </div>
            <div className="relative w-48 h-48 mx-auto">
              <Image
                src="/chibiretro.png"
                alt="Retro Chibi"
                fill
                style={{ objectFit: 'contain', filter: 'grayscale(100%)' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RetroMode; 