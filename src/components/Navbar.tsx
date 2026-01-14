'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  return (
    <nav className="w-full bg-transparent px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Company Name */}
        <div className="flex items-center gap-3">
          <img src="/gama-logo.png" alt="GAMA Logo" className="h-10 w-auto" />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setIsSolutionsOpen(true)}
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <button className="text-black flex items-center gap-1 hover:text-gray-700 transition-colors">
              Solutions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isSolutionsOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[200px]">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Solution 1</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Solution 2</a>
              </div>
            )}
          </div>

          <a href="#" className="text-black hover:text-gray-700 transition-colors">
            Working with Kaizen
          </a>

          <a href="#" className="text-black hover:text-gray-700 transition-colors">
            Our Cities
          </a>

          <div
            className="relative"
            onMouseEnter={() => setIsResourcesOpen(true)}
            onMouseLeave={() => setIsResourcesOpen(false)}
          >
            <button className="text-black flex items-center gap-1 hover:text-gray-700 transition-colors">
              Resources
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isResourcesOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[200px]">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Resource 1</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Resource 2</a>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsCompanyOpen(true)}
            onMouseLeave={() => setIsCompanyOpen(false)}
          >
            <button className="text-black flex items-center gap-1 hover:text-gray-700 transition-colors">
              Company
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isCompanyOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[200px]">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About Us</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</a>
              </div>
            )}
          </div>
        </div>



        {/* Mobile Menu Button */}
        <button className="md:hidden text-black">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
