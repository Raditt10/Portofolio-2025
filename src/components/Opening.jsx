import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Opening = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('loading'); // loading, entering, complete
  const [typedText, setTypedText] = useState('');
  
  const fullText = "自豪地呈现";

  useEffect(() => {
    // Typing animation
    let currentIndex = 0;
    const typingTimer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingTimer);
      }
    }, 80);

    return () => clearInterval(typingTimer);
  }, []);

  useEffect(() => {
    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setStage('entering');
          setTimeout(() => {
            setStage('complete');
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 800);
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#030303] via-[#050608] to-[#0b0d11] pointer-events-auto text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'complete' ? 0 : 1 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      style={{ pointerEvents: stage === 'complete' ? 'none' : 'auto' }}
    >
      {/* Luxurious static backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial gradients for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.06),transparent_50%)]" />
        
        {/* Elegant vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Planet Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0.85, rotate: -90 }}
          animate={{ 
            scale: stage === 'entering' ? 1.08 : 1,
            rotate: stage === 'entering' ? 180 : 0,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Planet Core */}
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            {/* Soft glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-white/8 to-white/12 blur-2xl" />

            <div className="relative w-full h-full rounded-full shadow-2xl overflow-hidden border-4 border-white/20 bg-[#0f1116]">
              <img 
                src="/img/meow.jpg" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-white/15" />
            </div>
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-wide">
            Hao!
          </h1>
          <div className="text-white/80 text-lg md:text-xl font-semibold tracking-[0.35em] uppercase h-8 flex items-center justify-center bg-gradient-to-r from-white via-slate-100 to-white/70 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(255,255,255,0.35)]">
            <span>{typedText}</span>
            <motion.span
              className="inline-block w-0.5 h-5 bg-white ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Progress Bar Container */}
        <motion.div
          className="w-72 md:w-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Progress Label */}
          <div className="flex justify-between items-center mb-3 text-sm">
            <span className="text-white/60">Tunggu bentar yaa..</span>
            <span className="text-white font-mono font-bold">
              {progress}%
            </span>
          </div>

          <div className="relative h-2 bg-white/8 rounded-full overflow-hidden backdrop-blur border border-white/15 shadow-lg">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/50 via-white/35 to-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default Opening;