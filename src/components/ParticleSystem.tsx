import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'star' | 'circle' | 'butterfly';
  angle: number;
  rotationSpeed: number;
  wobbleOffset: number;
  wobbleSpeed: number;
}

const ParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  // Colores para los diferentes modos
  const colors = {
    light: ['#2563eb', '#3b82f6', '#f97316', '#fb923c'],
    dark: ['#60a5fa', '#93c5fd', '#fdba74', '#fed7aa']
  };

  // Inicializar partículas
  const initParticles = () => {
    const particles: Particle[] = [];
    const types: ('star' | 'circle' | 'butterfly')[] = ['star', 'circle', 'butterfly'];
    
    for (let i = 0; i < 50; i++) {
      const canvas = canvasRef.current;
      if (!canvas) continue;

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[isDarkMode ? 'dark' : 'light'][Math.floor(Math.random() * colors[isDarkMode ? 'dark' : 'light'].length)],
        type: types[Math.floor(Math.random() * types.length)],
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        wobbleOffset: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03
      });
    }
    particlesRef.current = particles;
  };

  // Dibujar una estrella
  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number, angle: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size, 0);
      ctx.lineTo(size + size/2, size/2);
      ctx.lineTo(size, size);
      ctx.lineTo(0, 0);
      ctx.fill();
    }
    ctx.restore();
  };

  // Dibujar una mariposa simple
  const drawButterfly = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number, angle: number, wobbleOffset: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    
    const wingFlutter = Math.sin(wobbleOffset) * 0.3;
    
    // Alas superiores
    ctx.save();
    ctx.rotate(wingFlutter);
    ctx.beginPath();
    ctx.ellipse(-size, -size/2, size, size/2, Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.rotate(-wingFlutter);
    ctx.beginPath();
    ctx.ellipse(size, -size/2, size, size/2, -Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    // Alas inferiores
    ctx.save();
    ctx.rotate(wingFlutter * 0.7);
    ctx.beginPath();
    ctx.ellipse(-size*0.8, size/2, size*0.8, size/2, -Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.rotate(-wingFlutter * 0.7);
    ctx.beginPath();
    ctx.ellipse(size*0.8, size/2, size*0.8, size/2, Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    
    ctx.restore();
  };

  // Animar partículas
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      // Actualizar posición
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.angle += particle.rotationSpeed;
      particle.wobbleOffset += particle.wobbleSpeed;

      // Efecto de repulsión del mouse
      const dx = mousePosition.x - particle.x;
      const dy = mousePosition.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const force = (150 - distance) / 1500;
        
        // Alejarse del cursor
        particle.speedX -= Math.cos(angle) * force;
        particle.speedY -= Math.sin(angle) * force;
        
        // Aumentar velocidad de aleteo cerca del cursor
        particle.wobbleSpeed = 0.08;
      } else {
        // Velocidad normal de aleteo
        particle.wobbleSpeed = 0.02 + Math.random() * 0.03;
      }

      // Simular efecto de vuelo natural
      particle.speedY += Math.sin(particle.wobbleOffset * 0.5) * 0.01;
      particle.speedX += Math.cos(particle.wobbleOffset * 0.5) * 0.01;

      // Limitar velocidad
      const maxSpeed = 2;
      const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
      if (currentSpeed > maxSpeed) {
        particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
        particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
      }

      // Aplicar fricción del aire
      particle.speedX *= 0.99;
      particle.speedY *= 0.99;

      // Rebotar en los bordes con efecto suave
      const padding = 20;
      if (particle.x < padding) {
        particle.x = padding;
        particle.speedX = Math.abs(particle.speedX) * 0.8;
      }
      if (particle.x > canvas.width - padding) {
        particle.x = canvas.width - padding;
        particle.speedX = -Math.abs(particle.speedX) * 0.8;
      }
      if (particle.y < padding) {
        particle.y = padding;
        particle.speedY = Math.abs(particle.speedY) * 0.8;
      }
      if (particle.y > canvas.height - padding) {
        particle.y = canvas.height - padding;
        particle.speedY = -Math.abs(particle.speedY) * 0.8;
      }

      // Dibujar partícula según su tipo
      switch (particle.type) {
        case 'star':
          drawStar(ctx, particle.x, particle.y, particle.size * 2, particle.color, particle.opacity, particle.angle);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity;
          ctx.fill();
          break;
        case 'butterfly':
          drawButterfly(ctx, particle.x, particle.y, particle.size * 2, particle.color, particle.opacity, particle.angle, particle.wobbleOffset);
          break;
      }
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Manejar cambios de tamaño de ventana
  const handleResize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      initParticles();
    }
  };

  // Manejar movimiento del mouse
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Detectar modo oscuro
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    
    setIsDarkMode(darkModeMediaQuery.matches);
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    
    return () => darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
  }, []);

  // Configurar canvas y eventos
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Reinicializar partículas cuando cambia el modo
  useEffect(() => {
    initParticles();
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleSystem; 