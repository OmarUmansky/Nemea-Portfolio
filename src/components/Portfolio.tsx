import React, { useState } from 'react';
import ImageModal from './ImageModal';

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const projects = Array.from({ length: 8 }, (_, i) => `/projects/${i + 1}.jpeg`);

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent mb-4">
            Portfolio
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my collection of creative projects, where each design tells a unique story and reflects my passion for art and graphic design
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(project)}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            >
              {/* Neon border effect container */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg opacity-0 group-hover:opacity-70 blur-sm transition-all duration-500 animate-pulse-slow"></div>
              
              {/* Image container */}
              <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <img
                  src={project}
                  alt={`Project ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  onLoad={(e) => {
                    const target = e.target as HTMLElement;
                    target.parentElement?.querySelector('.animate-pulse')?.classList.add('hidden');
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-base text-white">Project {index + 1}</h3>
                    <p className="text-xs text-gray-200">Click to view details</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage || ''}
      />
    </section>
  );
};

export default Portfolio; 