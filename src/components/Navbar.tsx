'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ButterflyLogo from './ButterflyLogo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Efecto para detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="relative group navbar-brand"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent transition-all duration-500 dj-reactive ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}>
                Nemea
              </span>
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                isHovered ? 'opacity-100 scale-110 rotate-[360deg]' : 'opacity-0 scale-0 rotate-0'
              }`}>
                <ButterflyLogo />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['services', 'about', 'portfolio', 'contact'].map((item) => (
              <Link
                key={item}
                href={`/#${item}`}
                className="relative group text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 py-2 dj-reactive"
              >
                <span className="capitalize">
                  {item === 'services' ? 'Services' :
                   item === 'about' ? 'About Me' :
                   item === 'portfolio' ? 'Portfolio' : 'Contact'}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-orange-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <div className="flex items-center dj-reactive">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 block w-full h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`} />
                <span className={`absolute left-0 block w-full h-0.5 bg-current transform transition-all duration-300 ease-in-out top-3 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute left-0 block w-full h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`fixed left-0 right-0 transform transition-all duration-300 ease-in-out md:hidden ${
        isMenuOpen 
          ? 'opacity-100 translate-y-0 visible' 
          : 'opacity-0 -translate-y-full invisible'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg">
          {['services', 'about', 'portfolio', 'contact'].map((item) => (
            <Link
              key={item}
              href={`/#${item}`}
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 dark:hover:from-blue-900/50 dark:hover:to-orange-900/50 rounded-md transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item === 'services' ? 'Services' :
               item === 'about' ? 'About Me' :
               item === 'portfolio' ? 'Portfolio' : 'Contact'}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 