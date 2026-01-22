'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UnderDevelopmentModal from '@/components/UnderDevelopmentModal';

// --- Why Gama Megamenu ---
const WhyGamaMenu = ({ isOpen, onClose, onUnderDevelopment }: { isOpen: boolean; onClose: () => void; onUnderDevelopment: () => void }) => {
  const [activeTab, setActiveTab] = useState('Timeline');

  const content = {
    Timeline: {
      image: '/timeline.webp',
      title: 'Gama Timeline',
      description: "Gama has built a strong and distinguished track record throughout its long-term civil aviation activities.",
      link: '#'
    },
    Technology: {
      image: '/technology.webp',
      title: 'Technology',
      description: 'Gama Drones operates on the foundation of highly qualified engineering expertise and distinguishes itself from its competitors through exceptional specifications. We extend our gratitude to our engineers for their dedicated efforts.',
      link: '#'
    },
    Connect: {
      image: '/connect.webp',
      title: 'Stay Connected',
      description: 'Do you have brilliant ideas? Or would you like to benefit from our brilliant ideas? Please get in touch with us.',
      link: '#'
    }
  };

  const activeData = content[activeTab as keyof typeof content];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/5 z-[40]"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute left-0 right-0 top-0 bg-white shadow-2xl z-[50] pt-24 pb-12 overflow-y-auto max-h-screen"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12">
                {/* Left: Nav */}
                <div className="md:col-span-2 md:border-r md:border-gray-100 md:pr-8">
                  <h3 className="text-xs md:text-[14px] font-bold text-black uppercase tracking-[0.2em] mb-6 md:mb-10">Why Gama</h3>
                  <div className="flex md:flex-col gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-hide">
                    {Object.keys(content).map((tab) => (
                      <button
                        key={tab}
                        onMouseEnter={() => setActiveTab(tab)}
                        onClick={() => setActiveTab(tab)}
                        className={`text-left whitespace-nowrap text-xs md:text-[12px] uppercase tracking-wider transition-all duration-200 ${activeTab === tab ? 'text-rose-500 font-bold' : 'text-gray-400 hover:text-black'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Middle: Feature */}
                <div className="md:col-span-10 md:pl-8">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                    <div className="w-full md:w-1/2 overflow-hidden rounded-sm bg-gray-50 aspect-video md:aspect-auto">
                      <motion.img
                        key={activeData.image}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        src={activeData.image}
                        alt={activeData.title}
                        className="w-full h-full md:h-80 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                      <h4 className="text-lg md:text-[18px] font-bold text-black mb-3 md:mb-4">{activeData.title}</h4>
                      <p className="text-gray-500 text-sm md:text-[14px] mb-6 leading-relaxed font-light max-w-md">
                        {activeData.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          onUnderDevelopment();
                        }}
                        className="text-xs md:text-[13px] font-bold text-black border-b border-black w-fit hover:text-rose-500 hover:border-rose-500 transition-all uppercase tracking-widest leading-loose cursor-pointer"
                      >
                        Details »
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Mobile Menu ---
const MobileMenu = ({ isOpen, onClose, links, handleLinkClick }: { isOpen: boolean; onClose: () => void; links: { name: string; href: string }[]; handleLinkClick: (name: string, e: React.MouseEvent) => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-[100] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <img src="/gama-logo.png" alt="GAMA" className="h-10" />
              <button onClick={onClose} className="p-2 text-slate-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleLinkClick(link.name, e);
                    if (link.name !== 'Why Gama') onClose();
                  }}
                  className="text-xl font-medium text-slate-800 hover:text-rose-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isWhyGamaOpen, setIsWhyGamaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Why Gama', href: '#' },
    { name: 'Specs', href: '#' },
    { name: 'Wiki', href: '#' },
    { name: 'Safety', href: '#' },
    { name: 'Culture', href: '#' },
    { name: 'Career', href: '#' },
  ];

  const handleLinkClick = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (name === 'Why Gama') {
      setIsWhyGamaOpen(!isWhyGamaOpen);
    } else {
      setIsModalOpen(true);
      setIsWhyGamaOpen(false);
    }
  };

  return (
    <>
      <nav className={`relative w-full px-6 py-4 md:py-6 z-50 transition-colors duration-300 ${isWhyGamaOpen ? 'bg-white' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-[60]">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/gama-logo.png" alt="GAMA Logo" className="h-10 w-auto md:h-16 transition-all duration-300" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(link.name, e)}
                className={`text-black text-base font-medium tracking-wide transition-colors duration-200 cursor-pointer ${link.name === 'Why Gama' && isWhyGamaOpen ? 'text-rose-500' : 'hover:text-gray-600'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-black p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Why Gama Megamenu */}
        <WhyGamaMenu
          isOpen={isWhyGamaOpen}
          onClose={() => setIsWhyGamaOpen(false)}
          onUnderDevelopment={() => {
            setIsDetailModalOpen(true);
          }}
        />
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        handleLinkClick={handleLinkClick}
      />

      <UnderDevelopmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <UnderDevelopmentModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Future Insights"
        description="We are currently detailing these specific milestones and achievements. Stay tuned for a deeper dive into Gama's journey."
        theme="rose"
      />
    </>
  );
}
