import React, { useEffect, useState, useMemo } from "react";

// Mock data - replace with your actual techstack import
const techstack = [
  { id: 1, name: "React", src: "react.svg" },
  { id: 2, name: "Next.js", src: "nextjs.svg" },
  { id: 3, name: "TypeScript", src: "typescript.svg" },
  { id: 4, name: "Tailwind", src: "tailwind.svg" },
  { id: 5, name: "Node.js", src: "nodejs.svg" },
  { id: 6, name: "MongoDB", src: "mongodb.svg" },
  { id: 7, name: "Git", src: "git.svg" },
  { id: 8, name: "Docker", src: "docker.svg" },
  { id: 9, name: "AWS", src: "aws.svg" },
  { id: 10, name: "GraphQL", src: "graphql.svg" },
  { id: 11, name: "Redux", src: "redux.svg" },
  { id: 12, name: "Figma", src: "figma.svg" },
];

const TechStack = () => {
  const [theme, setTheme] = useState("dark");
  const [hoveredId, setHoveredId] = useState(null);
  const isLight = theme === "light";

  // Sync theme
  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current);
    };
    
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    
    return () => observer.disconnect();
  }, []);

  // Memoize filter style to avoid recalculation
  const filterStyle = useMemo(() => ({
    filter: isLight
      ? "grayscale(1) contrast(0) brightness(0.85)"
      : "grayscale(1) contrast(0) brightness(0.75)",
  }), [isLight]);

  // Preconnect to image domain for faster loading
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = window.location.origin;
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <section
      className="relative min-h-screen px-4 sm:px-6 py-16 sm:py-20"
      style={{ fontFamily: "Sora Variable" }}
    >
      {/* Simplified Background - Static */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div 
          className="absolute inset-0"
          style={{
            background: isLight
              ? 'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(245, 158, 11, 0.03) 0%, transparent 50%)'
              : 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(14, 165, 233, 0.03) 0%, transparent 50%)'
          }}
        />
      </div>

      {/* Title */}
      <div className="text-center mb-12 sm:mb-16">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent font-semibold mb-3"
          style={{
            backgroundImage: isLight
              ? "linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          Tech Stack
        </h1>
        <p className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
          Technologies & tools I work with
        </p>
      </div>

      {/* Tech Grid - Optimized */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 max-w-6xl mx-auto">
        {techstack.map((tech) => {
          const isHovered = hoveredId === tech.id;
          
          return (
            <div
              key={tech.id}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 backdrop-blur-sm rounded-xl border transition-all duration-300 ${
                isLight
                  ? "bg-white/70 border-amber-200/50 hover:border-amber-400 hover:shadow-md"
                  : "bg-gray-900/40 border-gray-700/30 hover:border-purple-500/50 hover:shadow-lg"
              }`}
              style={{
                transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                willChange: 'transform',
              }}
              onMouseEnter={() => setHoveredId(tech.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Icon Container */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-2 relative">
                {/* Subtle glow on hover */}
                {isHovered && (
                  <div 
                    className="absolute inset-0 rounded-lg blur-md opacity-30"
                    style={{
                      background: isLight 
                        ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                        : 'linear-gradient(135deg, #a855f7, #8b5cf6)'
                    }}
                  />
                )}
                <img
                  src={`/img/${tech.src}`}
                  alt={tech.name}
                  className="w-full h-full object-contain relative z-10"
                  style={filterStyle}
                  loading="lazy"
                  decoding="async"
                  // Prevent layout shift
                  width="56"
                  height="56"
                />
              </div>

              {/* Label */}
              <p
                className={`${
                  isLight ? "text-slate-800" : "text-white"
                } text-xs sm:text-sm font-medium text-center leading-tight transition-opacity duration-200`}
                style={{ opacity: isHovered ? 1 : 0.9 }}
              >
                {tech.name}
              </p>
            </div>
          );
        })}
      </div>

      {/* Optional: Tech Categories for better organization */}
      <div className="mt-12 text-center">
        <div className="inline-flex flex-wrap gap-2 justify-center">
          {['Frontend', 'Backend', 'DevOps', 'Design'].map((category) => (
            <span
              key={category}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                isLight
                  ? 'bg-amber-100/50 text-amber-900 border border-amber-200'
                  : 'bg-purple-900/30 text-purple-100 border border-purple-700/30'
              }`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;