import React, { useState, useEffect } from 'react'
import { navlinks } from '../../constant'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      {/* Desktop Navbar dengan efek cyberpunk */}
      <nav className={`hidden md:flex justify-center font-sora font-semibold text-white items-center h-20 transition-all duration-500 fixed z-50 w-full px-8 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/20' 
          : 'bg-transparent'
      }`}>
        {/* Animated Border Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-b-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
          {/* Scanning Line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
        </div>
        
        <div className="relative z-10">
          {/* Modern Glassmorphism Container */}
          <div className="relative px-6 py-3 rounded-full bg-gradient-to-r from-gray-900/50 via-gray-800/40 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 shadow-2xl shadow-cyan-500/10">
            {/* Inner Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse" />
            
            {/* Animated Border Glow */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
            
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="relative px-4 py-2">
                <h1 className='text-2xl glitch-text' data-text="R'e">
                  R'e
                  {/* Glitch Effect Layers */}
                  <span className="glitch-layer glitch-layer-1">R'e</span>
                  <span className="glitch-layer glitch-layer-2">R'e</span>
                </h1>
                {/* Logo Separator */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent" />
              </div>
            
              {/* Navigation Links */}
              <ul className='relative flex gap-1'>
                {navlinks.map((navlink, index) => (
                <li key={navlink.id} className="relative group">
                  <a 
                    href={navlink.link}
                    className='relative block text-base font-medium px-6 py-2.5 rounded-full transition-all duration-500 hover:text-white overflow-hidden'
                  >
                    {/* Orbital Ring Effect */}
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <span className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-spin-slow" style={{animationDuration: '8s'}} />
                      <span className="absolute inset-0 rounded-full border-2 border-purple-400/20 animate-spin-slow" style={{animationDuration: '12s', animationDirection: 'reverse'}} />
                    </span>
                    
                    {/* Planet Core - Glowing Center */}
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full blur-sm" />
                    
                    {/* Atmosphere Glow */}
                    <span className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full blur-lg" />
                    
                    {/* Starfield Background */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden rounded-full">
                      <span className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0s'}} />
                      <span className="absolute top-4 right-5 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse" style={{animationDelay: '0.3s'}} />
                      <span className="absolute bottom-3 left-6 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.6s'}} />
                      <span className="absolute top-5 left-10 w-1 h-1 bg-blue-200 rounded-full animate-pulse" style={{animationDelay: '0.9s'}} />
                    </span>
                    
                    {/* Cosmic Shimmer - Light Speed Effect */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    
                    {/* Text with Cosmic Glow */}
                    <span className="relative text-gray-300 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] transition-all duration-500 font-medium">
                      {navlink.text}
                    </span>
                    
                    {/* Orbiting Particles */}
                    <span className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,1)] animate-orbit" />
                    <span className="absolute bottom-0 right-1/2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_8px_rgba(168,85,247,1)] animate-orbit-reverse" style={{animationDelay: '0.5s'}} />
                    
                    {/* Gravitational Pull Line */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent group-hover:w-4/5 transition-all duration-700 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  </a>
                  
                  {/* Separator Line (except last item) */}
                  {index < navlinks.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-gradient-to-b from-transparent via-gray-600 to-transparent" />
                  )}
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className={`md:hidden flex justify-between items-center h-20 transition-all duration-500 fixed z-50 w-full px-6 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/20' 
          : 'bg-transparent'
      }`}>
        <div className="relative z-10">
          <h1 className='text-xl font-sora font-semibold text-white glitch-text' data-text="R'e">
            R'e
            <span className="glitch-layer glitch-layer-1">R'e</span>
            <span className="glitch-layer glitch-layer-2">R'e</span>
          </h1>
        </div>
        
        <button
          onClick={toggleSidebar}
          className='relative z-10 text-white p-3 hover:bg-cyan-500/20 rounded-lg transition-all duration-300 group border border-cyan-500/30'
          aria-label='Toggle menu'
        >
          {/* Animated Hamburger Icon */}
          <div className="relative w-6 h-6">
            <span className={`absolute left-0 w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${
              isSidebarOpen ? 'rotate-45 top-3' : 'top-1'
            }`} />
            <span className={`absolute left-0 w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${
              isSidebarOpen ? 'opacity-0' : 'top-3'
            }`} />
            <span className={`absolute left-0 w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${
              isSidebarOpen ? '-rotate-45 top-3' : 'top-5'
            }`} />
          </div>
          
          {/* Button Glow Effect */}
          <div className="absolute inset-0 bg-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40'
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed top-0 right-0 h-full w-full max-w-[400px] sm:max-w-[450px] bg-black/95 backdrop-blur-xl border-l border-cyan-500/30 shadow-2xl shadow-cyan-500/20 z-50 transform transition-transform duration-500 ease-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b border-cyan-500/30 relative z-10'>
          <h1 className='text-xl font-bold text-white'>R'e</h1>
          <button
            onClick={closeSidebar}
            className='text-white p-2 hover:bg-cyan-500/20 rounded-lg transition-all duration-300 group border border-cyan-500/30'
            aria-label='Close menu'
          >
            <div className="relative w-6 h-6">
              <span className="absolute left-0 top-3 w-6 h-0.5 bg-cyan-400 rotate-45" />
              <span className="absolute left-0 top-3 w-6 h-0.5 bg-cyan-400 -rotate-45" />
            </div>
          </button>
        </div>
        
        {/* Navigation with Desktop Style */}
        <nav className='p-6 relative z-10'>
          {/* Glassmorphism Container */}
          <div className="relative px-4 py-4 rounded-2xl bg-gradient-to-r from-gray-900/50 via-gray-800/40 to-gray-900/50 backdrop-blur-lg border border-gray-700/50">
            {/* Inner Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse" />
            
            <ul className='relative flex flex-col gap-2'>
              {navlinks.map((navlink, index) => (
                <li key={navlink.id} className="relative group">
                  <a
                    href={navlink.link}
                    onClick={closeSidebar}
                    className='relative block text-base font-medium px-6 py-3 rounded-full transition-all duration-500 hover:text-white overflow-hidden'
                  >
                    {/* Orbital Ring Effect */}
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <span className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-spin-slow" style={{animationDuration: '8s'}} />
                      <span className="absolute inset-0 rounded-full border-2 border-purple-400/20 animate-spin-slow" style={{animationDuration: '12s', animationDirection: 'reverse'}} />
                    </span>
                    
                    {/* Planet Core - Glowing Center */}
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full blur-sm" />
                    
                    {/* Atmosphere Glow */}
                    <span className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full blur-lg" />
                    
                    {/* Starfield Background */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden rounded-full">
                      <span className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0s'}} />
                      <span className="absolute top-4 right-5 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse" style={{animationDelay: '0.3s'}} />
                      <span className="absolute bottom-3 left-6 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.6s'}} />
                    </span>
                    
                    {/* Cosmic Shimmer */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    
                    {/* Text with Cosmic Glow */}
                    <span className="relative text-gray-300 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] transition-all duration-500 font-medium">
                      {navlink.text}
                    </span>
                    
                    {/* Orbiting Particles */}
                    <span className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,1)] animate-orbit" />
                    <span className="absolute bottom-0 right-1/2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_8px_rgba(168,85,247,1)] animate-orbit-reverse" style={{animationDelay: '0.5s'}} />
                    
                    {/* Gravitational Pull Line */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent group-hover:w-4/5 transition-all duration-700 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  </a>
                  
                  {/* Separator Line (except last item) */}
                  {index < navlinks.length - 1 && (
                    <div className="my-2 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/10 blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      </aside>

      {/* Global Styles untuk efek cyberpunk */}
      <style jsx>{`
        .glitch-text {
          position: relative;
          display: inline-block;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        .glitch-text::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: -2px;
          width: 100%;
          height: 100%;
          color: #06b6d4;
          background: transparent;
          clip: rect(0, 900px, 0, 0);
          animation: glitch-1 3s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 2px;
          width: 100%;
          height: 100%;
          color: #8b5cf6;
          background: transparent;
          clip: rect(0, 900px, 0, 0);
          animation: glitch-2 2s infinite linear alternate-reverse;
        }

        .glitch-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .glitch-layer-1 {
          color: #06b6d4;
          animation: glitch-3 4s infinite linear alternate-reverse;
          z-index: -1;
        }

        .glitch-layer-2 {
          color: #8b5cf6;
          animation: glitch-4 5s infinite linear alternate-reverse;
          z-index: -2;
        }

        .glitch-link {
          position: relative;
          overflow: hidden;
        }

        .glitch-link:hover::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: -1px;
          width: 100%;
          height: 100%;
          color: #06b6d4;
          animation: link-glitch-1 0.3s linear;
        }

        .glitch-link:hover::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 1px;
          width: 100%;
          height: 100%;
          color: #8b5cf6;
          animation: link-glitch-2 0.3s linear;
        }

        @keyframes glitch-1 {
          0% { clip: rect(20px, 9999px, 25px, 0); }
          5% { clip: rect(15px, 9999px, 30px, 0); }
          10% { clip: rect(40px, 9999px, 35px, 0); }
          15% { clip: rect(10px, 9999px, 40px, 0); }
          20% { clip: rect(30px, 9999px, 45px, 0); }
          25% { clip: rect(25px, 9999px, 50px, 0); }
          30% { clip: rect(45px, 9999px, 55px, 0); }
          35% { clip: rect(15px, 9999px, 60px, 0); }
          40% { clip: rect(35px, 9999px, 65px, 0); }
          45% { clip: rect(20px, 9999px, 70px, 0); }
          50% { clip: rect(40px, 9999px, 75px, 0); }
          55% { clip: rect(25px, 9999px, 80px, 0); }
          60% { clip: rect(45px, 9999px, 85px, 0); }
          65% { clip: rect(30px, 9999px, 90px, 0); }
          70% { clip: rect(50px, 9999px, 95px, 0); }
          75% { clip: rect(35px, 9999px, 100px, 0); }
          80% { clip: rect(55px, 9999px, 105px, 0); }
          85% { clip: rect(40px, 9999px, 110px, 0); }
          90% { clip: rect(60px, 9999px, 115px, 0); }
          95% { clip: rect(45px, 9999px, 120px, 0); }
          100% { clip: rect(65px, 9999px, 125px, 0); }
        }

        @keyframes glitch-2 {
          0% { clip: rect(65px, 9999px, 125px, 0); }
          5% { clip: rect(45px, 9999px, 120px, 0); }
          10% { clip: rect(60px, 9999px, 115px, 0); }
          15% { clip: rect(40px, 9999px, 110px, 0); }
          20% { clip: rect(55px, 9999px, 105px, 0); }
          25% { clip: rect(35px, 9999px, 100px, 0); }
          30% { clip: rect(50px, 9999px, 95px, 0); }
          35% { clip: rect(30px, 9999px, 90px, 0); }
          40% { clip: rect(45px, 9999px, 85px, 0); }
          45% { clip: rect(25px, 9999px, 80px, 0); }
          50% { clip: rect(40px, 9999px, 75px, 0); }
          55% { clip: rect(20px, 9999px, 70px, 0); }
          60% { clip: rect(35px, 9999px, 65px, 0); }
          65% { clip: rect(15px, 9999px, 60px, 0); }
          70% { clip: rect(30px, 9999px, 55px, 0); }
          75% { clip: rect(10px, 9999px, 50px, 0); }
          80% { clip: rect(25px, 9999px, 45px, 0); }
          85% { clip: rect(5px, 9999px, 40px, 0); }
          90% { clip: rect(20px, 9999px, 35px, 0); }
          95% { clip: rect(0px, 9999px, 30px, 0); }
          100% { clip: rect(15px, 9999px, 25px, 0); }
        }

        @keyframes glitch-3 {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes glitch-4 {
          0% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
          100% { transform: translate(0); }
        }

        @keyframes link-glitch-1 {
          0% { transform: translate(0); clip: rect(0, 0, 0, 0); }
          10% { transform: translate(-1px, 1px); clip: rect(0, 500px, 10px, 0); }
          20% { transform: translate(1px, -1px); clip: rect(0, 500px, 20px, 0); }
          30% { transform: translate(-1px, -1px); clip: rect(0, 500px, 30px, 0); }
          40% { transform: translate(1px, 1px); clip: rect(0, 500px, 40px, 0); }
          50% { transform: translate(-1px, 1px); clip: rect(0, 500px, 50px, 0); }
          60% { transform: translate(1px, -1px); clip: rect(0, 500px, 60px, 0); }
          70% { transform: translate(-1px, -1px); clip: rect(0, 500px, 70px, 0); }
          80% { transform: translate(1px, 1px); clip: rect(0, 500px, 80px, 0); }
          90% { transform: translate(-1px, 1px); clip: rect(0, 500px, 90px, 0); }
          100% { transform: translate(0); clip: rect(0, 0, 0, 0); }
        }

        @keyframes link-glitch-2 {
          0% { transform: translate(0); clip: rect(0, 0, 0, 0); }
          10% { transform: translate(1px, -1px); clip: rect(10px, 500px, 20px, 0); }
          20% { transform: translate(-1px, 1px); clip: rect(20px, 500px, 30px, 0); }
          30% { transform: translate(1px, 1px); clip: rect(30px, 500px, 40px, 0); }
          40% { transform: translate(-1px, -1px); clip: rect(40px, 500px, 50px, 0); }
          50% { transform: translate(1px, -1px); clip: rect(50px, 500px, 60px, 0); }
          60% { transform: translate(-1px, 1px); clip: rect(60px, 500px, 70px, 0); }
          70% { transform: translate(1px, 1px); clip: rect(70px, 500px, 80px, 0); }
          80% { transform: translate(-1px, -1px); clip: rect(80px, 500px, 90px, 0); }
          90% { transform: translate(1px, -1px); clip: rect(90px, 500px, 100px, 0); }
          100% { transform: translate(0); clip: rect(0, 0, 0, 0); }
        }

        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        .animate-scan {
          animation: scan 3s linear infinite;
        }

        /* Planet-themed animations */
        @keyframes orbit {
          0% { 
            transform: rotate(0deg) translateX(20px) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% { 
            transform: rotate(360deg) translateX(20px) rotate(-360deg);
            opacity: 1;
          }
        }

        @keyframes orbit-reverse {
          0% { 
            transform: rotate(360deg) translateX(18px) rotate(-360deg);
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
          100% { 
            transform: rotate(0deg) translateX(18px) rotate(0deg);
            opacity: 1;
          }
        }

        .animate-orbit {
          animation: orbit 3s linear infinite;
        }

        .animate-orbit-reverse {
          animation: orbit-reverse 4s linear infinite;
        }

        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}

export default Navbar