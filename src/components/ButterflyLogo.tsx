import React, { useEffect, useState } from 'react';

const ButterflyLogo = () => {
  const [isRetroMode, setIsRetroMode] = useState(false);

  useEffect(() => {
    // Función para verificar si el modo retro está activo
    const checkRetroMode = () => {
      setIsRetroMode(document.body.classList.contains('retro-mode'));
    };

    // Verificar inicialmente
    checkRetroMode();

    // Crear un observer para detectar cambios en las clases del body
    const observer = new MutationObserver(checkRetroMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      viewBox="0 0 120 80"
      className={`w-10 h-10 ${isRetroMode ? '' : 'butterfly-hover'} dj-reactive`}
      style={isRetroMode ? { imageRendering: 'pixelated' } : undefined}
    >
      {/* Left wing top */}
      <path
        d="M60 40 C45 35, 30 15, 15 25 C5 32, 20 38, 60 40"
        className="fill-blue-600"
      >
        {!isRetroMode && (
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            values="
              M60 40 C45 35, 30 15, 15 25 C5 32, 20 38, 60 40;
              M60 40 C45 32, 30 12, 15 22 C5 29, 20 35, 60 40;
              M60 40 C45 35, 30 15, 15 25 C5 32, 20 38, 60 40
            "
          />
        )}
      </path>
      {/* Left wing bottom */}
      <path
        d="M60 40 C45 45, 30 65, 15 55 C5 48, 20 42, 60 40"
        className="fill-orange-400"
      >
        {!isRetroMode && (
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            values="
              M60 40 C45 45, 30 65, 15 55 C5 48, 20 42, 60 40;
              M60 40 C45 48, 30 68, 15 58 C5 51, 20 45, 60 40;
              M60 40 C45 45, 30 65, 15 55 C5 48, 20 42, 60 40
            "
          />
        )}
      </path>
      {/* Right wing top */}
      <path
        d="M60 40 C75 35, 90 15, 105 25 C115 32, 100 38, 60 40"
        className="fill-blue-600"
      >
        {!isRetroMode && (
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            values="
              M60 40 C75 35, 90 15, 105 25 C115 32, 100 38, 60 40;
              M60 40 C75 32, 90 12, 105 22 C115 29, 100 35, 60 40;
              M60 40 C75 35, 90 15, 105 25 C115 32, 100 38, 60 40
            "
          />
        )}
      </path>
      {/* Right wing bottom */}
      <path
        d="M60 40 C75 45, 90 65, 105 55 C115 48, 100 42, 60 40"
        className="fill-orange-400"
      >
        {!isRetroMode && (
          <animate
            attributeName="d"
            dur="2s"
            repeatCount="indefinite"
            values="
              M60 40 C75 45, 90 65, 105 55 C115 48, 100 42, 60 40;
              M60 40 C75 48, 90 68, 105 58 C115 51, 100 45, 60 40;
              M60 40 C75 45, 90 65, 105 55 C115 48, 100 42, 60 40
            "
          />
        )}
      </path>

      {/* Wing patterns - Left top */}
      <path
        d="M60 40 C50 35, 40 25, 30 30"
        className={`stroke-white stroke-[0.5] fill-none ${isRetroMode ? 'opacity-100' : 'opacity-50'}`}
      />
      <path
        d="M60 40 C45 35, 35 20, 25 28"
        className={`stroke-white stroke-[0.5] fill-none ${isRetroMode ? 'opacity-100' : 'opacity-50'}`}
      />

      {/* Wing patterns - Right top */}
      <path
        d="M60 40 C70 35, 80 25, 90 30"
        className={`stroke-white stroke-[0.5] fill-none ${isRetroMode ? 'opacity-100' : 'opacity-50'}`}
      />
      <path
        d="M60 40 C75 35, 85 20, 95 28"
        className={`stroke-white stroke-[0.5] fill-none ${isRetroMode ? 'opacity-100' : 'opacity-50'}`}
      />

      {/* Body */}
      <path
        d="M58 38 C58 35, 62 35, 62 38 L62 42 C62 45, 58 45, 58 42 Z"
        className="fill-gray-800"
      />
      
      {/* Antennae */}
      <path
        d="M59 36 Q57 32, 55 30"
        className="stroke-gray-800 stroke-[0.75] fill-none"
      />
      <path
        d="M61 36 Q63 32, 65 30"
        className="stroke-gray-800 stroke-[0.75] fill-none"
      />
    </svg>
  );
};

export default ButterflyLogo; 