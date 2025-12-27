import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techstack } from "../../constant";

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TechStack = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const itemsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi mobile dengan useEffect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimasi: Memoisasi techstack data
  const optimizedTechstack = useMemo(() => {
    return techstack.map(tech => ({
      id: tech.id,
      name: tech.name,
      src: tech.src,
      // Preload critical images
      preload: tech.id <= 8 // Preload hanya 8 pertama
    }));
  }, [techstack]);

  // Optimasi: GSAP animation dengan debounce
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !gridRef.current) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;
    const items = itemsRef.current.filter(Boolean);

    // Cancel animations jika sudah ada
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Set initial states lebih minimal
    gsap.set(title, { opacity: 0 });
    gsap.set(grid, { opacity: 0 });
    gsap.set(items, { opacity: 0 });

    // Timeline lebih sederhana
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        markers: false // Nonaktifkan markers di production
      },
      defaults: {
        ease: "power2.out",
        duration: 0.4
      }
    });

    // Animasi sederhana
    tl.to(title, { opacity: 1 })
      .to(grid, { opacity: 1 }, "-=0.2")
      .to(items, {
        opacity: 1,
        stagger: isMobile ? 0.02 : 0.03,
        duration: 0.3
      }, "-=0.1");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, [isMobile]);

  // Optimasi: useCallback untuk handler
  const addToRefs = useCallback((el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  }, []);

  // Optimasi: Preload critical images
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const preloadImages = () => {
      const criticalImages = optimizedTechstack
        .filter(tech => tech.preload)
        .map(tech => `/img/${tech.src}`);
      
      criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
  }, [optimizedTechstack]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[90vh] px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 overflow-hidden bg-gradient-to-br from-[#040507] to-[#050608]"
      style={{ fontFamily: "Sora Variable" }}
    >
      {/* Background lebih sederhana */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_50%)]" />

      {/* Title Section */}
      <div className="relative z-10 px-4">
        <h1 
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent font-semibold text-center mb-8 sm:mb-12 md:mb-16"
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
          }}
        >
          Tech Stack
        </h1>
      </div>

      {/* Tech Grid - lebih ringkas */}
      <div 
        ref={gridRef}
        className="relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-5 mt-8 max-w-6xl mx-auto px-2"
      >
        {optimizedTechstack.map((tech, index) => (
          <div
            key={tech.id}
            ref={addToRefs}
            className="relative group"
          >
            {/* Card Container - sederhana */}
            <div className="relative flex flex-col items-center justify-center p-3 sm:p-4 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-700/30 transition-all duration-200 hover:bg-gray-800/50 hover:border-purple-500/30">
              
              {/* Tech Icon */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-2">
                <img 
                  src={`/img/${tech.src}`}
                  alt={tech.name}
                  width={isMobile ? 48 : 64}
                  height={isMobile ? 48 : 64}
                  className="w-full h-full object-contain"
                  loading={tech.preload ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>

              {/* Label - selalu tampil */}
              <p className="text-white text-xs sm:text-sm font-medium text-center leading-tight mt-1">
                {tech.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Gradient - opsional, bisa dihapus */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-5"></div>
      
      {/* Inline CSS minimal */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TechStack;