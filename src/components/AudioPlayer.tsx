'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaMusic, FaTimes } from 'react-icons/fa';

// Declarar la interfaz para el window con webkitAudioContext
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Create audio element
        const audio = new Audio('/Butterfly Culture - Benjamin Francis Leftwich.mp3');
        audio.loop = true;
        audio.volume = volume;
        
        // Configurar eventos
        audio.addEventListener('error', (e) => {
          console.error('Error de audio:', e);
          setError('Error al cargar el audio');
        });

        audio.addEventListener('canplaythrough', () => {
          console.log('Audio listo para reproducir');
          setError(null);
        });

        audioRef.current = audio;

        // Load user preferences from localStorage
        const savedVolume = localStorage.getItem('backgroundMusicVolume');
        const savedIsPlaying = localStorage.getItem('backgroundMusicPlaying');
        const savedIsMuted = localStorage.getItem('backgroundMusicMuted');

        if (savedVolume) setVolume(parseFloat(savedVolume));
        if (savedIsMuted) setIsMuted(savedIsMuted === 'true');
        
        // Solo intentar reproducir si estaba reproduciéndose antes
        if (savedIsPlaying === 'true') {
          try {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                  setError(null);
                })
                .catch((error) => {
                  console.error('Error al reproducir:', error);
                  setIsPlaying(false);
                  setError('Error al reproducir el audio');
                });
            }
          } catch (error) {
            console.error('Error al intentar reproducir:', error);
            setIsPlaying(false);
            setError('Error al intentar reproducir');
          }
        }
      } catch (error) {
        console.error('Error al inicializar el audio:', error);
        setError('Error al inicializar el audio');
      }
    };

    initializeAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!audioRef.current) {
      setError('No se pudo encontrar el reproductor de audio');
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          // Intentar reproducir directamente sin crear un AudioContext
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
                setError(null);
              })
              .catch((error) => {
                console.error('Error al reproducir:', error);
                setIsPlaying(false);
                setError('Error al reproducir el audio');
              });
          }
        } catch (error) {
          console.error('Error en togglePlay:', error);
          setError('Error al controlar la reproducción');
        }
      }
      localStorage.setItem('backgroundMusicPlaying', (!isPlaying).toString());
    } catch (error) {
      console.error('Error en togglePlay:', error);
      setError('Error al controlar la reproducción');
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('backgroundMusicVolume', newVolume.toString());
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    localStorage.setItem('backgroundMusicMuted', (!isMuted).toString());
  };

  // Mobile floating button
  const MobileButton = () => (
    <button
      onClick={() => setIsExpanded(true)}
      className="audio-player md:hidden fixed bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg flex items-center justify-center transform hover:scale-110 transition-all duration-300 z-50 border border-gray-800/20"
      aria-label="Open music player"
    >
      <FaMusic className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
    </button>
  );

  // Full player content
  const PlayerContent = () => (
    <div className="audio-player hidden md:flex items-center gap-4 px-6 py-3 bg-white/10 dark:bg-black/10 backdrop-blur-lg rounded-xl border border-gray-800/20 group relative">
      {error && (
        <div className="absolute -top-12 left-0 bg-red-500 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap">
          {error}
        </div>
      )}

      {/* Song title tooltip */}
      <div className="absolute -top-12 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-blue-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap">
        <div className="flex items-center gap-2">
          <FaMusic className="animate-pulse" />
          <span>Butterfly Culture - Benjamin Francis Leftwich</span>
        </div>
      </div>

      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <button
        onClick={togglePlay}
        className={`w-10 h-10 flex items-center justify-center bg-gradient-to-r ${
          isPlaying 
            ? 'from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600' 
            : 'from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600'
        } text-white rounded-full transition-all duration-300 transform hover:scale-110 relative z-10`}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <FaPause size={14} className="animate-pulse" />
        ) : (
          <FaPlay size={14} className="ml-1" />
        )}
      </button>

      <button
        onClick={toggleMute}
        className={`w-10 h-10 flex items-center justify-center ${
          isMuted
            ? 'text-orange-500 hover:text-orange-600'
            : 'text-blue-500 hover:text-blue-600'
        } transition-all duration-300 transform hover:scale-110 relative z-10`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <FaVolumeMute size={18} className="animate-pulse" />
        ) : (
          <FaVolumeUp size={18} className={volume > 0.7 ? 'animate-pulse' : ''} />
        )}
      </button>

      <div className="relative z-10">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-2 bg-gradient-to-r from-blue-200 to-orange-200 rounded-lg appearance-none cursor-pointer 
          dark:from-blue-700 dark:to-orange-700 
          hover:from-blue-300 hover:to-orange-300 
          dark:hover:from-blue-600 dark:hover:to-orange-600 
          transition-all duration-300"
          aria-label="Volume control"
          style={{
            backgroundSize: `${volume * 100}% 100%`
          }}
        />
        
        {/* Volume level indicators */}
        <div className="absolute -top-2 left-0 w-full flex justify-between px-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-0.5 h-1.5 rounded-full transition-all duration-300 ${
                volume > (i / 4)
                  ? 'bg-gradient-to-t from-blue-500 to-orange-500 scale-100'
                  : 'bg-gray-300 scale-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Animated rings effect when playing */}
      {isPlaying && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 border border-blue-500/20 rounded-xl animate-ping-slow" />
          <div className="absolute inset-0 border border-orange-500/20 rounded-xl animate-ping-slower" />
        </div>
      )}
    </div>
  );

  // Mobile expanded player
  const MobileExpandedPlayer = () => (
    <div className="audio-player fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center md:hidden">
      <div className="w-full max-w-sm mx-4 mb-4 bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-gray-800/20">
        <div className="relative p-6">
          {error && (
            <div className="absolute -top-12 left-0 right-0 bg-red-500 text-white px-4 py-2 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {/* Close button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="close-button"
            aria-label="Close audio player"
          >
            <FaTimes size={20} />
          </button>

          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent">
              Now Playing
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Butterfly Culture - Benjamin Francis Leftwich
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={togglePlay}
              className={`w-16 h-16 flex items-center justify-center bg-gradient-to-r ${
                isPlaying 
                  ? 'from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600' 
                  : 'from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600'
              } text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110`}
            >
              {isPlaying ? (
                <FaPause size={24} className="animate-pulse" />
              ) : (
                <FaPlay size={24} className="ml-1" />
              )}
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleMute}
                className={`w-12 h-12 flex items-center justify-center ${
                  isMuted
                    ? 'text-orange-500 hover:text-orange-600'
                    : 'text-blue-500 hover:text-blue-600'
                } transition-colors duration-300`}
              >
                {isMuted ? (
                  <FaVolumeMute size={24} className="animate-pulse" />
                ) : (
                  <FaVolumeUp size={24} className={volume > 0.7 ? 'animate-pulse' : ''} />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-32 h-2 bg-gradient-to-r from-blue-200 to-orange-200 rounded-lg appearance-none cursor-pointer 
                dark:from-blue-700 dark:to-orange-700 
                hover:from-blue-300 hover:to-orange-300 
                dark:hover:from-blue-600 dark:hover:to-orange-600 
                transition-all duration-300"
                style={{
                  backgroundSize: `${volume * 100}% 100%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile version */}
      <MobileButton />
      {isExpanded && <MobileExpandedPlayer />}

      {/* Desktop version */}
      <div className="fixed bottom-4 left-4 hidden md:flex items-center gap-4 p-4 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm group transition-all duration-300 hover:bg-white/95 dark:hover:bg-gray-900/95 border border-gray-800/20 shadow-lg">
        <PlayerContent />
      </div>
    </>
  );
};

export default AudioPlayer; 