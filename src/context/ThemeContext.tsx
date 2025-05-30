'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  isTransitioning: false,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [theme, setThemeState] = useState('light');

  const setTheme = (newTheme: string) => {
    setIsTransitioning(true);
    setThemeState(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', newTheme);
    
    // Resetear el estado de transición después de la animación
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  useEffect(() => {
    // Recuperar tema guardado o usar preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }

    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeContext.Provider value={{ theme, setTheme, isTransitioning }}>
        <div className={`theme-transition ${isTransitioning ? 'transitioning' : ''}`}>
          {children}
        </div>
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
} 