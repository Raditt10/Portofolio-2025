import React, { useEffect, useState } from "react";
import { techstack } from "../../constant";

const TechStack = () => {
  const [theme, setTheme] = useState("dark");
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

  return (
    <section
      className="relative min-h-screen px-4 sm:px-6 py-16 sm:py-20"
      style={{ fontFamily: "Sora Variable" }}
    >
      {/* Title */}
      <h1
        className="text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent font-semibold text-center mb-12"
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

      {/* Tech Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 max-w-6xl mx-auto">
        {techstack.map((tech) => (
          <div
            key={tech.id}
            className={`flex flex-col items-center justify-center p-3 sm:p-4 backdrop-blur-sm rounded-xl border transition-all duration-200 hover:scale-105 ${
              isLight
                ? "bg-white/70 border-amber-200/50 hover:border-amber-300"
                : "bg-gray-900/40 border-gray-700/30 hover:border-purple-500/30"
            }`}
          >
            {/* Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-2">
              <img
                src={`/img/${tech.src}`}
                alt={tech.name}
                className="w-full h-full object-contain"
                style={{
                  filter: isLight
                    ? "grayscale(1) contrast(0) brightness(0.85)"
                    : "grayscale(1) contrast(0) brightness(0.75)",
                }}
                loading="lazy"
              />
            </div>

            {/* Label */}
            <p
              className={`${
                isLight ? "text-slate-800" : "text-white"
              } text-xs sm:text-sm font-medium text-center leading-tight`}
            >
              {tech.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;