import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useEasterEggStore } from '@/store/easterEggStore';
import Image from 'next/image';

const DJMode: React.FC = () => {
  const isDJMode = useEasterEggStore((state: { isDJMode: boolean }) => state.isDJMode);
  const [waves, setWaves] = useState<{ id: number; x: number; intensity: number }[]>([]);
  const [spotlights, setSpotlights] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showStartMessage, setShowStartMessage] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [previousMode, setPreviousMode] = useState(isDJMode);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const playDJSound = useCallback((type: 'start' | 'end') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filterNode = audioContext.createBiquadFilter();

    // Configurar el filtro
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(1000, audioContext.currentTime);

    // Conectar los nodos
    oscillator1.connect(filterNode);
    oscillator2.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'start') {
      // Sonido de inicio - más festivo y ascendente
      oscillator1.type = 'sawtooth';
      oscillator2.type = 'square';
      
      // Primer oscilador - barrido ascendente
      oscillator1.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.2);
      
      // Segundo oscilador - notas rápidas
      oscillator2.frequency.setValueAtTime(440, audioContext.currentTime);
      oscillator2.frequency.setValueAtTime(660, audioContext.currentTime + 0.1);
      oscillator2.frequency.setValueAtTime(880, audioContext.currentTime + 0.2);

      // Filtro con efecto wah
      filterNode.frequency.setValueAtTime(200, audioContext.currentTime);
      filterNode.frequency.exponentialRampToValueAtTime(4000, audioContext.currentTime + 0.2);

      // Control de volumen
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    } else {
      // Sonido de fin - más suave y descendente
      oscillator1.type = 'sine';
      oscillator2.type = 'triangle';
      
      // Primer oscilador - barrido descendente
      oscillator1.frequency.setValueAtTime(880, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.3);
      
      // Segundo oscilador - complemento armónico
      oscillator2.frequency.setValueAtTime(1320, audioContext.currentTime);
      oscillator2.frequency.exponentialRampToValueAtTime(330, audioContext.currentTime + 0.3);

      // Filtro con cierre suave
      filterNode.frequency.setValueAtTime(4000, audioContext.currentTime);
      filterNode.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);

      // Control de volumen
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    }

    // Iniciar y detener los osciladores
    oscillator1.start();
    oscillator2.start();
    oscillator1.stop(audioContext.currentTime + 0.4);
    oscillator2.stop(audioContext.currentTime + 0.4);

    // Limpiar el contexto después de que termine el sonido
    setTimeout(() => {
      audioContext.close();
    }, 1000);
  }, []);

  // Función de limpieza
  const cleanup = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    document.body.classList.remove('dj-mode');
    document.querySelectorAll('.dj-reactive').forEach((element) => {
      element.classList.remove('dj-reactive');
      (element as HTMLElement).style.transform = '';
    });
    setWaves([]);
    setSpotlights([]);
  };

  useEffect(() => {
    // Solo mostrar el mensaje de fin si estábamos en modo DJ y ahora no lo estamos
    if (previousMode && !isDJMode) {
      cleanup();
      setShowEndMessage(true);
      playDJSound('end');
      const endMessageTimer = setTimeout(() => {
        setShowEndMessage(false);
      }, 3000);
      return () => clearTimeout(endMessageTimer);
    }

    // Actualizar el estado previo
    setPreviousMode(isDJMode);

    if (!isDJMode) {
      cleanup();
      setShowStartMessage(false);
      return;
    }

    document.body.classList.add('dj-mode');
    setShowStartMessage(true);
    setShowEndMessage(false);
    playDJSound('start');

    const startMessageTimer = setTimeout(() => {
      setShowStartMessage(false);
    }, 3000);

    // Crear un AudioContext para analizar la música
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    // Conectar con el elemento de audio existente
    const audioElement = document.querySelector('audio');
    if (!audioElement) return;

    sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement);
    sourceRef.current.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);

    let waveId = 0;
    let spotlightId = 0;

    const createWave = (intensity: number) => {
      const x = Math.random() * window.innerWidth;
      setWaves(prev => [...prev, { id: waveId++, x, intensity }]);
      setTimeout(() => {
        setWaves(prev => prev.filter(wave => wave.id !== waveId - 1));
      }, 2000);
    };

    const createSpotlight = () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      setSpotlights(prev => [...prev, { id: spotlightId++, x, y }]);
      setTimeout(() => {
        setSpotlights(prev => prev.filter(spot => spot.id !== spotlightId - 1));
      }, 4000);
    };

    const animate = () => {
      if (!isDJMode || !analyserRef.current) return;

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;

      if (average > 100) {
        createWave(average / 256);
        if (Math.random() > 0.7) createSpotlight();
      }

      document.querySelectorAll('.dj-reactive, .text-4xl, .text-5xl, .text-6xl, .navbar-brand').forEach((element) => {
        const scale = 1 + (average / 256) * 0.2;
        const rotate = (average / 256) * 5;
        
        if (element.classList.contains('text-4xl') || 
            element.classList.contains('text-5xl') || 
            element.classList.contains('text-6xl') ||
            element.classList.contains('navbar-brand')) {
          const subtleScale = 1 + (average / 256) * 0.1;
          const subtleRotate = (average / 256) * 2;
          (element as HTMLElement).style.transform = `scale(${subtleScale}) rotate(${subtleRotate}deg)`;
        } else {
          (element as HTMLElement).style.transform = `scale(${scale}) rotate(${rotate}deg)`;
        }
        
        element.classList.add('dj-reactive');
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cleanup();
      clearTimeout(startMessageTimer);
    };
  }, [isDJMode, previousMode, playDJSound]);

  return (
    <>
      {/* Mensaje de fin del modo DJ */}
      {showEndMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black/80 p-8 rounded-2xl transform animate-dance-message">
            <div className="text-4xl font-bold text-white mb-4 text-center animate-neon-text">
              Let's get back to business
            </div>
            <div className="relative w-48 h-48 mx-auto">
              <Image
                src="/chibidj2.png"
                alt="Business Chibi"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      )}

      {isDJMode && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-slide" />
          
          {/* Mensaje de inicio del modo DJ */}
          {showStartMessage && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-black/80 p-8 rounded-2xl transform animate-dance-message">
                <div className="text-4xl font-bold text-white mb-4 text-center animate-neon-text">
                  TIME TO DANCE!
                </div>
                <div className="relative w-48 h-48 mx-auto">
                  <Image
                    src="/chibidj.png"
                    alt="DJ Chibi"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Ondas musicales */}
          {waves.map(wave => (
            <div
              key={wave.id}
              className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-wave-expand"
              style={{
                left: wave.x,
                bottom: '20px',
                opacity: wave.intensity,
                transform: `scale(${1 + wave.intensity})`,
              }}
            />
          ))}

          {/* Spotlights */}
          {spotlights.map(spot => (
            <div
              key={spot.id}
              className="spotlight"
              style={{
                left: spot.x,
                top: spot.y,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DJMode; 