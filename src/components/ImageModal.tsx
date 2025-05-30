import React from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-orange-300 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal container with neon effect */}
        <div className="relative">
          {/* Neon border effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg opacity-70 blur-sm animate-pulse-slow"></div>
          
          {/* Image container */}
          <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            <img
              src={imageSrc}
              alt="Portfolio project"
              className="w-full max-h-[70vh] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal; 