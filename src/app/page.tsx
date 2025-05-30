'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ContactModal from '@/components/ContactModal';
import Portfolio from '@/components/Portfolio';
import SecretCharacter from '@/components/SecretCharacter';
import Butterfly from '@/components/Butterfly';
import ParticleSystem from '@/components/ParticleSystem';
import FunFactsPanel from '@/components/FunFactsPanel';

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFunFactsOpen, setIsFunFactsOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((elem) => {
      observer.observe(elem);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Particle System */}
      <ParticleSystem />
      
      {/* Secret Character */}
      <SecretCharacter />
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center pt-32 pb-32 md:pt-40 md:pb-40 overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-blue-800/5 to-orange-100/20 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-orange-900/30">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        </div>
        {/* Animated Butterflies */}
        <Butterfly className="-top-10 -left-10" color="text-blue-400" size="lg" pattern={1} />
        <Butterfly className="top-40 -right-10" color="text-orange-400" size="md" pattern={2} />
        <Butterfly className="bottom-20 left-1/4" color="text-blue-300" size="sm" pattern={3} />
        <Butterfly className="top-1/3 right-1/4" color="text-orange-300" size="md" pattern={1} />
        <Butterfly className="-bottom-10 right-1/3" color="text-blue-400" size="lg" pattern={2} />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:mix-blend-soft-light"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:mix-blend-soft-light"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 animate-fade-in">
              Transform your vision<br />
              <span className="bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent">
                into art..
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 animate-fade-in animation-delay-200 max-w-3xl mx-auto">
              Where creativity meets passion, turning ideas into captivating visual experiences
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block bg-gradient-to-r from-blue-600 to-orange-400 text-white px-10 py-4 rounded-full text-lg font-medium hover:from-blue-500 hover:to-orange-300 transform hover:scale-105 transition-all duration-300 animate-fade-in animation-delay-400 hover:shadow-lg"
            >
              Let's Create Together!
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="min-h-[90vh] py-24 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden scroll-mt-16 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-orange-900/20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-orange-400"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent inline-block">
              Artistic Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              Transforming ideas into visual masterpieces with creativity and passion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Brand Identity",
                description: "Creating unique and expressive visual identities that tell your story through artistic elements and meaningful design.",
                icon: "✨",
                gradient: "from-blue-500 to-blue-300"
              },
              {
                title: "Digital Art",
                description: "Crafting stunning digital artwork that combines traditional artistic principles with modern digital techniques.",
                icon: "🎨",
                gradient: "from-orange-400 to-orange-300"
              },
              {
                title: "Creative Design",
                description: "Bringing your vision to life through innovative design solutions that push creative boundaries.",
                icon: "✏️",
                gradient: "from-blue-400 to-orange-300"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-on-scroll border border-blue-50 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-500 overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${service.gradient}`}></div>
                
                <div className="relative mb-6">
                  <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {service.icon}
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-orange-100 dark:from-blue-500/20 dark:to-orange-500/20 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white relative z-10">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 relative z-10 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>
                
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-orange-400 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent inline-block">
              Technical Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll">
              Mastering industry-leading tools to bring creative visions to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Adobe Photoshop Card */}
            <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🎨</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Adobe Photoshop</h3>
              </div>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="mr-2">✦</span>
                  Advanced photo manipulation and editing
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✦</span>
                  Digital painting and artwork creation
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✦</span>
                  Complex compositing and effects
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✦</span>
                  Color correction and enhancement
                </li>
              </ul>

              <div className="mt-6 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[95%] transform origin-left scale-x-0 animate-on-scroll"></div>
              </div>
            </div>

            {/* Adobe Illustrator Card */}
            <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">✏️</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Adobe Illustrator</h3>
              </div>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="mr-2">✦</span>
                  Vector illustration and design
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✦</span>
                  Logo and brand identity creation
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✦</span>
                  Custom typography and lettering
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✦</span>
                  Scalable graphics development
                </li>
              </ul>

              <div className="mt-6 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-orange-300 w-[98%] transform origin-left scale-x-0 animate-on-scroll"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-blue-900/5 to-orange-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <Butterfly className="top-20 right-20" color="text-blue-500" size="md" pattern={1} />
        <Butterfly className="-bottom-10 left-1/4" color="text-orange-300" size="lg" pattern={3} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <div className="flex items-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-400 bg-clip-text text-transparent">About Me</h2>
                <button
                  onClick={() => setIsFunFactsOpen(true)}
                  className="ml-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-400 rounded-full opacity-40 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110"
                  aria-label="Ver datos curiosos"
                >
                  <span className="text-white text-lg">✨</span>
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                As a Chilean graphic designer, my journey in the world of art began in my early years, 
                nurtured by a family that always encouraged creative expression. I'm Fernanda Rodriguez, 
                and my passion for visual arts has been the driving force behind every project I undertake.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Growing up surrounded by art and creativity shaped my perspective and approach to design. 
                This foundation, combined with my professional training in graphic design, allows me to 
                bring a unique blend of artistic sensitivity and technical expertise to each project.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                My commitment to continuous growth and artistic evolution drives me to push boundaries 
                and explore new creative horizons daily. I believe that each design challenge is an 
                opportunity to create something extraordinary, merging traditional artistic values 
                with contemporary design trends.
              </p>
            </div>
            <div className="relative h-[500px] animate-on-scroll group">
              <div className="absolute inset-0 bg-orange-200 dark:bg-orange-500/30 rounded-lg transform rotate-3 transition-transform group-hover:rotate-6"></div>
              <div className="absolute inset-0 bg-blue-200 dark:bg-blue-500/30 rounded-lg -rotate-3 transition-transform group-hover:-rotate-6"></div>
              <div className="relative h-full overflow-hidden rounded-lg shadow-xl transform transition-transform hover:scale-105">
                <Image
                  src="/Bebita%202.jpg"
                  alt="Brand Designer in a creative environment"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts Panel */}
      <FunFactsPanel isOpen={isFunFactsOpen} onClose={() => setIsFunFactsOpen(false)} />

      {/* Portfolio Section */}
      <Portfolio />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-orange-900 text-white py-12">
        <Butterfly className="-top-10 right-10" color="text-orange-300" size="lg" pattern={3} />
        <Butterfly className="bottom-20 left-1/3" color="text-blue-200" size="md" pattern={2} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-on-scroll">
              <h3 className="text-xl font-bold mb-4">Nemea</h3>
              <p className="text-blue-200">
                Creating art that inspires and connects.
              </p>
            </div>
            <div className="animate-on-scroll space-y-4">
              <h3 className="text-xl font-bold mb-6">Contact</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:fernandarodriguezplaza@gmail.com" 
                  className="flex items-center group text-blue-200 hover:text-orange-200 transition-colors duration-300"
                >
                  <span className="inline-block w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-blue-800 group-hover:bg-orange-800 transition-colors duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  fernandarodriguezplaza@gmail.com
                </a>
                <a 
                  href="tel:+56923893495" 
                  className="flex items-center group text-blue-200 hover:text-orange-200 transition-colors duration-300"
                >
                  <span className="inline-block w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-blue-800 group-hover:bg-orange-800 transition-colors duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </span>
                  +56 9 2389 3495
                </a>
                <p className="flex items-center text-blue-200">
                  <span className="inline-block w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-blue-800">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Santiago, Chile
                </p>
              </div>
            </div>
            <div className="animate-on-scroll">
              <h3 className="text-xl font-bold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/artbynemea" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group"
                >
                  <span className="inline-block w-10 h-10 flex items-center justify-center rounded-full bg-blue-800 text-blue-200 group-hover:bg-orange-800 group-hover:text-orange-200 transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>© {new Date().getFullYear()} Nemea. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 