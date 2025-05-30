import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="theme-toggle relative p-2 rounded-xl bg-gradient-to-br from-blue-100 to-orange-100 dark:from-blue-900 dark:to-orange-900 group transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {/* Light mode sun */}
      <div className={`absolute inset-0 transition-all duration-700 transform ${theme === 'dark' ? 'scale-0 opacity-0 rotate-180' : 'scale-100 opacity-100 rotate-0'}`}>
        <div className="absolute inset-0 bg-yellow-300 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <svg
          className="relative w-6 h-6 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
          />
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </svg>
      </div>

      {/* Dark mode moon */}
      <div className={`absolute inset-0 transition-all duration-700 transform ${theme === 'dark' ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-180'}`}>
        <div className="absolute inset-0 bg-blue-400 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <svg
          className="relative w-6 h-6 text-blue-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>

      {/* Stars */}
      <div className="absolute -inset-2 transition-opacity duration-300">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-yellow-300 rounded-full animate-sparkle`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              opacity: theme === 'dark' ? 1 : 0,
            }}
          />
        ))}
      </div>
    </button>
  );
};

export default ThemeToggle; 