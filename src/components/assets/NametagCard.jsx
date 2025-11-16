import React, { useState } from 'react';
import { X, GraduationCap, Briefcase, MapPin, Calendar, Award, Code } from 'lucide-react';

const NametagCard = () => {
  const [isPulled, setIsPulled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  const handlePull = () => {
    if (!isPulled) {
      setIsPulled(true);
    }
  };

  const handleClose = () => {
    setIsPulled(false);
    setPullDistance(0);
  };

  const handleMouseDown = (e) => {
    if (!isPulled) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isPulled) {
      const distance = Math.min(e.clientY - 100, 150);
      if (distance > 0) {
        setPullDistance(distance);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (pullDistance > 80) {
        setIsPulled(true);
      }
      setPullDistance(0);
    }
  };

  return (
    <div 
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Tali Nametag */}
      <div className="relative">
        {/* Holder/Klip di atas */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-8 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700 rounded-t-xl border-2 border-gray-500 shadow-lg">
          <div className="absolute inset-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-lg">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-1 bg-gray-600 rounded-full" />
          </div>
        </div>

        {/* Tali */}
        <svg 
          width="4" 
          height={isPulled ? "500" : `${100 + pullDistance}`}
          className="absolute left-1/2 -translate-x-1/2 top-4 transition-all duration-300"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        >
          <defs>
            <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: '#a78bfa', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          <rect width="4" height="100%" fill="url(#ropeGradient)" rx="2" />
          {/* Efek Tekstur Tali */}
          <line x1="1" y1="0" x2="1" y2="100%" stroke="#7c3aed" strokeWidth="0.5" opacity="0.5" strokeDasharray="2,3" />
          <line x1="3" y1="0" x2="3" y2="100%" stroke="#c4b5fd" strokeWidth="0.5" opacity="0.5" strokeDasharray="2,3" />
        </svg>

        {/* Card Nametag */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-out cursor-pointer ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ 
            top: isPulled ? '500px' : `${100 + pullDistance}px`,
            transform: `translateX(-50%) ${isDragging ? 'scale(1.02)' : 'scale(1)'}`,
          }}
          onMouseDown={handleMouseDown}
          onClick={handlePull}
        >
          {/* Hole untuk tali */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-purple-500/50 shadow-lg z-10">
            <div className="absolute inset-1 rounded-full bg-black" />
          </div>

          {/* Main Card */}
          <div className="relative w-80 sm:w-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border-2 border-purple-500/30 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 95%, #8b5cf6 100%),
                  linear-gradient(180deg, transparent 95%, #06b6d4 100%)
                `,
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Close Button - Only when pulled */}
            {isPulled && (
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-20 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-500/50 transition-all duration-300 group"
              >
                <X className="w-5 h-5 text-red-400 group-hover:text-red-300 group-hover:rotate-90 transition-all duration-300" />
              </button>
            )}

            {/* Header - Always Visible */}
            <div className="relative p-6 border-b border-purple-500/20">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-0.5">
                    <img 
                      src="/img/radit2.jpg" 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover border-2 border-gray-900"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Rafaditya Syahputra
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium">Front-End Developer</p>
                  <p className="text-gray-400 text-xs mt-1">@rafaa_ndl</p>
                </div>
              </div>

              {/* Pull Indicator - Only when not pulled */}
              {!isPulled && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
                  <div className="text-purple-400 text-xs font-semibold">Pull Me ↓</div>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}} />
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Information - Only when pulled */}
            {isPulled && (
              <div className="relative p-6 space-y-4 animate-fadeIn">
                {/* Education */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-purple-400">
                    <GraduationCap className="w-5 h-5" />
                    <h4 className="font-semibold text-sm uppercase tracking-wide">Education</h4>
                  </div>
                  <div className="ml-7 space-y-1 text-sm">
                    <p className="text-white font-medium">SMK Negeri 1 Cimahi</p>
                    <p className="text-gray-400">Rekayasa Perangkat Lunak</p>
                    <p className="text-gray-500 text-xs">2022 - 2025</p>
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Briefcase className="w-5 h-5" />
                    <h4 className="font-semibold text-sm uppercase tracking-wide">Experience</h4>
                  </div>
                  <div className="ml-7 space-y-3 text-sm">
                    <div>
                      <p className="text-white font-medium">Front-End Developer</p>
                      <p className="text-gray-400">Freelance</p>
                      <p className="text-gray-500 text-xs">2023 - Present</p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-purple-400">
                    <Code className="w-5 h-5" />
                    <h4 className="font-semibold text-sm uppercase tracking-wide">Skills</h4>
                  </div>
                  <div className="ml-7 flex flex-wrap gap-2">
                    {['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Next.js', 'UI/UX Design'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location & Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <MapPin className="w-5 h-5" />
                    <h4 className="font-semibold text-sm uppercase tracking-wide">Location</h4>
                  </div>
                  <div className="ml-7 text-sm">
                    <p className="text-gray-300">Cimahi, Jawa Barat, Indonesia</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-purple-400">
                    <Award className="w-5 h-5" />
                    <h4 className="font-semibold text-sm uppercase tracking-wide">Achievements</h4>
                  </div>
                  <div className="ml-7 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5" />
                      <p className="text-gray-300">10+ Projects Completed</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5" />
                      <p className="text-gray-300">Passionate about Modern Web Development</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-purple-500/20">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Updated Nov 2025</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-400">Available for work</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Glow Effects */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-50 -z-10" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default NametagCard;
