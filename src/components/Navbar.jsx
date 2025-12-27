import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { navlinks } from '../../constant'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Deteksi mobile dengan useEffect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Optimasi scroll handler dengan throttle
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 10
          setScrolled(isScrolled)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handler dengan useCallback
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false)
  }, [])

  // Memoisasi navlinks
  const memoizedNavlinks = useMemo(() => navlinks, [])

  // Navbar untuk desktop (lebih sederhana)
  const DesktopNavbar = () => (
    <nav className={`hidden md:flex justify-center items-center h-16 transition-all duration-300 fixed top-0 left-0 right-0 z-50 px-4 ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
        : 'bg-black/60 backdrop-blur-sm'
    }`}>
      <div className="max-w-4xl w-full flex items-center justify-between">
        {/* Logo */}
        <div className="px-4">
          <h1 className='text-xl font-bold text-white'>
            R'e
          </h1>
        </div>
        
        {/* Navigation Links - lebih sederhana */}
        <ul className='flex items-center gap-1'>
          {memoizedNavlinks.map((navlink) => (
            <li key={navlink.id}>
              <a 
                href={navlink.link}
                className='block text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 text-white/90 hover:text-white hover:bg-white/10'
              >
                {navlink.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )

  // Mobile header yang tidak menghalangi konten
  const MobileHeader = () => (
    <header className={`md:hidden flex justify-between items-center transition-all duration-300 fixed top-4 left-4 right-4 z-50 px-4 py-3 rounded-2xl ${
      scrolled 
        ? 'bg-black/80 backdrop-blur-lg border border-white/10 shadow-lg' 
        : 'bg-black/70 backdrop-blur-md'
    }`} style={{ marginTop: 'env(safe-area-inset-top, 0)' }}>
      <div>
        <h1 className='text-lg font-bold text-white'>
          R'e
        </h1>
      </div>
      
      <button
        onClick={toggleSidebar}
        className='text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all'
        aria-label='Toggle menu'
      >
        <div className="relative w-6 h-6">
          <span className={`absolute left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
            isSidebarOpen ? 'rotate-45 top-3' : 'top-2'
          }`} />
          <span className={`absolute left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
            isSidebarOpen ? 'opacity-0' : 'top-3'
          }`} />
          <span className={`absolute left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
            isSidebarOpen ? '-rotate-45 top-3' : 'top-4'
          }`} />
        </div>
      </button>
    </header>
  )

  // Mobile sidebar yang tidak penuh layar
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />
      
      {/* Sidebar */}
      <aside
        className={`md:hidden fixed top-4 right-4 z-50 w-64 rounded-2xl bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 transform ${
          isSidebarOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{ marginTop: `calc(env(safe-area-inset-top, 0) + 60px)` }}
      >
        {/* Navigation */}
        <nav className='p-4'>
          <ul className='space-y-1'>
            {memoizedNavlinks.map((navlink) => (
              <li key={navlink.id}>
                <a
                  href={navlink.link}
                  onClick={closeSidebar}
                  className='block text-base font-medium px-4 py-3 rounded-lg transition-all text-white/90 hover:text-white hover:bg-white/10 active:bg-white/15'
                >
                  {navlink.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )

  return (
    <>
      <DesktopNavbar />
      <MobileHeader />
      <MobileSidebar />
      
      {/* Spacer untuk mobile header */}
      <div className="md:hidden h-20" />
      
      <style jsx>{`
        @media (max-width: 767px) {
          /* Pastikan konten tidak tertutup navbar */
          body {
            padding-top: env(safe-area-inset-top, 0px);
          }
          
          /* Touch-friendly buttons */
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Smooth transitions */
          * {
            -webkit-tap-highlight-color: transparent;
          }
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar