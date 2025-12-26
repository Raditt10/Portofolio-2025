import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Opening = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('loading'); // loading, entering, complete
  const [typedText, setTypedText] = useState('');
  
  const fullText = "Welcome to My Portfolio";

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
    }, 100);

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
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#030303] via-[#050608] to-[#0b0d11] pointer-events-auto text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'complete' ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      style={{ pointerEvents: stage === 'complete' ? 'none' : 'auto' }}
    >
      {/* Soft ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[360px] h-[360px] -left-6 -top-6 rounded-full bg-white/8 blur-2xl"
          animate={{ opacity: [0.18, 0.28, 0.18], scale: [1, 1.02, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-[460px] h-[460px] right-0 bottom-[-70px] rounded-full bg-white/6 blur-2xl"
          animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.03, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_42%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.04),transparent_36%),radial-gradient(circle_at_50%_78%,rgba(255,255,255,0.05),transparent_38%)]" />

        {/* Gentle rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[540px] md:h-[540px] border border-white/15 rounded-full" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] md:w-[660px] md:h-[660px] border border-dashed border-white/10 rounded-full" />
        </motion.div>

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 1.5, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Planet Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: stage === 'entering' ? 1.2 : 1,
            rotate: stage === 'entering' ? 360 : 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Planet Core */}
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/15 via-white/5 to-white/10 blur-2xl"
              animate={{ scale: [1, 1.04, 1], opacity: [0.32, 0.5, 0.32] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative w-full h-full rounded-full shadow-xl overflow-hidden border-4 border-white/15 bg-[#0f1116]">
              <img 
                src="/img/meow.jpg" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-white/10" />
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35) 0%, transparent 45%),
                                   radial-gradient(circle at 70% 70%, rgba(0,0,0,0.45) 0%, transparent 45%)`
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <motion.div
              className="absolute inset-0 -m-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full border-2 border-dashed border-white/12 rounded-full" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white/60 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.35)]" />
            </motion.div>
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
            Hi!
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

          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur border border-white/10 shadow-inner">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/40 via-white/25 to-white/10 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          <div className="flex justify-center items-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white/50 rounded-full"
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.35, 0.9, 0.35],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Opening;