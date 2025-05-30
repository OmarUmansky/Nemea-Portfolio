'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import QuizModal from './QuizModal';

const SecretCharacter = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [hasBeenFound, setHasBeenFound] = useState(false);

  const handleClick = () => {
    setIsQuizOpen(true);
    if (!hasBeenFound) {
      setHasBeenFound(true);
      localStorage.setItem('quizCharacterFound', 'true');
    }
  };

  const imageStyle = {
    objectFit: 'contain' as const,
    width: '100%',
    height: '100%',
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed group cursor-pointer transition-all duration-300"
        style={{
          bottom: '2%',
          right: '2%',
          transform: 'rotate(-5deg) scale(0.6)',
          zIndex: 10,
          opacity: 0.85,
        }}
      >
        {/* Character speech text */}
        <div className="absolute bottom-[120%] right-[-20px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 min-w-[300px]">
          <p className="text-base font-medium italic text-gray-700 dark:text-gray-200 text-right pr-4">
            I'm just standing here, not hiding anything..
          </p>
        </div>

        <div className="relative w-24 h-24">
          {/* Normal state image */}
          <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
            <Image
              src="/chibi.png"
              alt="Secret Character"
              width={96}
              height={96}
              style={imageStyle}
              className="drop-shadow-lg"
              priority
            />
          </div>

          {/* Hover state image */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Image
              src="/chibi2.png"
              alt="Secret Character Hover"
              width={96}
              height={96}
              style={imageStyle}
              className="drop-shadow-lg"
              priority
            />
          </div>

          {/* Sparkle effects */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-blue-300 rounded-full animate-ping delay-100"></div>
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-purple-300 rounded-full animate-ping delay-200"></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-300 rounded-full animate-ping delay-300"></div>
          </div>
        </div>

        {/* Found state tooltip - only shows after being clicked */}
        {hasBeenFound && (
          <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs whitespace-nowrap">
              You found me!
            </div>
          </div>
        )}
      </button>

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
};

export default SecretCharacter; 