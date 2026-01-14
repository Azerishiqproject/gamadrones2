'use client';

export default function Navbar() {
  const navLinks = [
    { name: 'WHY GAMA', href: '#' },
    { name: 'Specs', href: '#' },
    { name: 'Wiki', href: '#' },
    { name: 'Safety', href: '#' },
    { name: 'Culture', href: '#' },
    { name: 'Career', href: '#' },
  ];

  return (
    <nav className="w-full bg-transparent px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/gama-logo.png" alt="GAMA Logo" className="h-12 w-auto md:h-14 transition-all duration-300" />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-black text-sm font-medium tracking-wide uppercase hover:text-gray-600 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black p-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
