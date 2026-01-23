'use client';

import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
        ? 'py-3 md:py-4 bg-white/80 backdrop-blur-md shadow-sm'
        : 'py-4 md:py-7 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center px-6 relative z-[60]">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/gama-logo.png"
            alt="GAMA Logo"
            className={`transition-all duration-500 ${scrolled ? 'h-8 md:h-12' : 'h-11 md:h-18'
              } w-auto`}
          />
        </div>
      </div>
    </nav>
  );
}
