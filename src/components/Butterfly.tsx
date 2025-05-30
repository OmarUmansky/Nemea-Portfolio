import React from 'react';

interface ButterflyProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  pattern?: 1 | 2 | 3;
}

const Butterfly: React.FC<ButterflyProps> = ({ 
  className = '', 
  color = 'text-blue-500',
  size = 'md',
  pattern = 1
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const flutterPatterns = {
    1: 'animate-flutter-1',
    2: 'animate-flutter-2',
    3: 'animate-flutter-3'
  };

  return (
    <div className={`
      absolute
      ${flutterPatterns[pattern]}
      transform
      ${sizeClasses[size]}
      ${color}
      ${className}
      cursor-pointer
      p-4
      hover:scale-110
      transition-transform
      duration-300
      dj-reactive
    `}>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-wing-flap w-full h-full"
      >
        {/* Left wing */}
        <path d="M12 8C12 8 9 5 4 6C4 6 2 12 6 14C10 16 12 12 12 8Z" />
        {/* Right wing */}
        <path d="M12 8C12 8 15 5 20 6C20 6 22 12 18 14C14 16 12 12 12 8Z" />
        {/* Left lower wing */}
        <path d="M12 12C12 12 10 14 6 14C6 14 5 18 8 19C11 20 12 16 12 12Z" />
        {/* Right lower wing */}
        <path d="M12 12C12 12 14 14 18 14C18 14 19 18 16 19C13 20 12 16 12 12Z" />
        {/* Body */}
        <path d="M11 8C11 8 12 7 13 8C14 9 13 19 12 19C11 19 10 9 11 8Z" />
        {/* Antennae */}
        <path d="M11 8C11 8 10 6 9 5M13 8C13 8 14 6 15 5" strokeWidth="0.5" stroke="currentColor" fill="none" />
      </svg>
    </div>
  );
};

export default Butterfly; 