import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import ProjectCard from "./assets/ProjectCard";
import { projectsData } from "../../constant";

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);

  // Update scroll progress
  const updateScrollProgress = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress || 0);
    }
  };

  // Mouse drag handlers with momentum
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setVelocity(0);
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.scrollBehavior = 'smooth';
      
      // Apply momentum
      if (Math.abs(velocity) > 5) {
        const momentumScroll = velocity * 15;
        scrollContainerRef.current.scrollLeft -= momentumScroll;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2.5; // Increased speed multiplier
    const newVelocity = walk - (scrollLeft - scrollContainerRef.current.scrollLeft);
    setVelocity(newVelocity);
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX;
    const walk = (startX - x) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft + walk;
  };

  // Scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollProgress);
      return () => container.removeEventListener('scroll', updateScrollProgress);
    }
  }, []);

  // Navigation buttons
  const scrollTo = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/10 touch-manipulation"
      style={{ fontFamily: "Sora Variable" }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center'
        }} />
      </div>

      {/* Pulsing Orb Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-cyan-600/10 animate-pulse-slow" 
             style={{ filter: 'blur(60px)' }} />
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: Math.random() > 0.5 
                ? 'linear-gradient(45deg, #8b5cf6, #00fff9)'
                : 'linear-gradient(45deg, #ff00de, #8b5cf6)',
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${
                Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.8)' : 'rgba(0, 255, 249, 0.8)'
              }`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1 
          ref={titleRef}
          variants={titleVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent font-bold text-center relative z-30 overflow-hidden mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4"
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 60px rgba(139, 92, 246, 0.5)',
            letterSpacing: '0.02em'
          }}
        >
          My Projects
        </motion.h1>
        
        {/* Navigation Buttons */}
        <div className="relative">
          <button
            onClick={() => scrollTo('left')}
            disabled={scrollProgress === 0}
            className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/10 items-center justify-center transition-all duration-500 hover:scale-110 hover:border-white/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] ${
              scrollProgress === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <svg className="w-7 h-7 text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scrollTo('right')}
            disabled={scrollProgress >= 99}
            className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/10 items-center justify-center transition-all duration-500 hover:scale-110 hover:border-white/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] ${
              scrollProgress >= 99 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <svg className="w-7 h-7 text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        
          {/* Scroll Container with Drag */}
          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-4 relative"
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              scrollBehavior: isDragging ? 'auto' : 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <motion.div 
              className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12 min-w-max px-4"
              variants={gridVariants}
              style={{
                userSelect: 'none',
              }}
            >
              {projectsData.map((data, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -12,
                    scale: 1.03,
                    rotateY: 2,
                    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } 
                  }}
                  className="relative group w-[320px] sm:w-[380px] md:w-[420px] lg:w-[450px] flex-shrink-0"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: 1000,
                  }}
                >
              {/* Cyberpunk Glow Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  transform: 'scale(1.1)'
                }}
              />
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-600 overflow-hidden">
                {/* Grid Pattern */}
                <div 
                  className="absolute inset-[-2px] rounded-xl opacity-70"
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, transparent 95%, #8b5cf6 100%),
                      linear-gradient(180deg, transparent 95%, #06b6d4 100%)
                    `,
                    backgroundSize: '20px 20px',
                    animation: 'gridMove 2s linear infinite'
                  }}
                />
                
                {/* Scanning Line */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan rounded-full" />
                
                {/* Pulsing Corner Brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400 animate-pulse" />
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-purple-400 animate-pulse" style={{animationDelay: '0.3s'}} />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-purple-400 animate-pulse" style={{animationDelay: '0.6s'}} />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400 animate-pulse" style={{animationDelay: '0.9s'}} />
              </div>

              {/* Original ProjectCard dengan wrapper untuk efek tambahan */}
              <div className="relative transform transition-all duration-300 group-hover:border-purple-500/50 rounded-xl overflow-hidden">
                <ProjectCard 
                  gambar={data.gambar} 
                  judul={data.judul} 
                  parag={data.parag} 
                  tech={data.tech} 
                  linkDemo={data.linkDemo} 
                  linkCode={data.linkCode}
                  isComingSoon={data.isComingSoon || false}
                />
                
                {/* Hover Shine Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        </div>
        </div>

        {/* Enhanced Progress Bar & Scroll Indicators */}
        <div className="flex flex-col items-center gap-6 mt-12">
          {/* Progress Bar */}
          <div className="w-full max-w-2xl">
            <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 rounded-full transition-all duration-300 ease-out relative"
                style={{ 
                  width: `${scrollProgress}%`,
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.6)'
                }}
              >
                {/* Animated glow at the end of progress bar */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              </div>
            </div>
            
            {/* Progress percentage indicator */}
            <div className="flex justify-between items-center mt-2 px-2">
              <span className="text-xs text-gray-500">Start</span>
              <span className="text-xs font-medium text-cyan-400 tabular-nums">
                {Math.round(scrollProgress)}%
              </span>
              <span className="text-xs text-gray-500">End</span>
            </div>
          </div>

          {/* Scroll Instruction */}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2 animate-pulse">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="hidden sm:inline">Swipe</span>
            </div>
            
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-sm">
              <span className="text-white/80">Drag to explore</span>
            </div>
            
            <div className="flex items-center gap-2 animate-pulse">
              <span className="hidden sm:inline">or Click</span>
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10"></div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100vh) translateX(100px) rotate(180deg); 
            opacity: 0; 
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-scan {
          animation: scan 3s linear infinite;
        }

        .floating-particle {
          animation: float 15s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default Projects;