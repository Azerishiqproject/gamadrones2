'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const footerLinks = {
    explore: [
        { name: 'Home', href: '/' },
        { name: 'Why Gama', href: '#' },
        { name: 'Specs', href: '#' },
        { name: 'Wiki', href: '#' },
        { name: 'Safety', href: '#' },
    ],
    company: [
        { name: 'Culture', href: '#' },
        { name: 'Career', href: '#' },
        { name: 'Services', href: '#' },
        { name: 'Gallery', href: '#' },
    ]
};

export default function Footer({ onUnderDevelopment }: { onUnderDevelopment: () => void }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-100 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/gama-logo.png" alt="GAMA Logo" className="h-12 w-auto" />
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Defining the future of autonomous aerial logistics. Building sustainable, safe, and intelligent sky networks for the next generation of delivery.
                        </p>
                        <div className="flex gap-4">
                            {/* LinkedIn */}
                            <Link
                                href="https://www.linkedin.com/company/gamadrones/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </Link>

                            {/* Instagram */}
                            <Link
                                href="https://www.instagram.com/gamadrones/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50 transition-all duration-300"
                            >
                                <span className="sr-only">Instagram</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.465C6.103 2.218 6.83 2.049 7.894 2c1.024-.047 1.379-.06 3.808-.06h.63zm0 2.16c-2.6 0-2.9.01-3.95.06-.9.04-1.4.2-1.74.33-.42.17-.74.37-1.02.66-.29.28-.48.6-.66 1.02-.13.34-.3.83-.34 1.74-.05 1.04-.06 1.35-.06 3.94v.63c0 2.59.01 2.9.06 3.94.04.9.2 1.4.33 1.74.17.42.37.74.66 1.02.28.29.6.48 1.02.66.34.13.83.3.174.34 1.05.05 1.36.06 3.95.06h.63c2.59 0 2.9-.01 3.94-.06.9-.04 1.4-.2 1.74-.33.42-.17.74-.37 1.02-.66.29-.28.48-.6.66-1.02.13-.34.3-.83.34-1.74.05-1.05.06-1.36.06-3.95v-.63c0-2.59-.01-2.9-.06-3.94-.04-.9-.2-1.4-.33-1.74-.17-.42-.37-.74-.66-1.02-.28-.29-.6-.48-1.02-.66-.34-.13-.83-.3-1.74-.34-1.05-.05-1.36-.06-3.95-.06h-.63zm-.15 3.65a5.85 5.85 0 110 11.7 5.85 5.85 0 010-11.7zm0 2.16a3.69 3.69 0 100 7.38 3.69 3.69 0 000-7.38zm7.39-4.71a1.44 1.44 0 110 2.88 1.44 1.44 0 010-2.88z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8 md:flex md:justify-end md:gap-20">
                        <div className="min-w-[120px]">
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Explore</h4>
                            <ul className="space-y-4">
                                {footerLinks.explore.map((link) => (
                                    <li key={link.name}>
                                        {link.href === '#' || link.href === '' ? (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onUnderDevelopment();
                                                }}
                                                className="text-sm text-slate-500 hover:text-blue-600 transition-colors text-left"
                                            >
                                                {link.name}
                                            </button>
                                        ) : (
                                            <Link href={link.href} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="min-w-[120px]">
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Company</h4>
                            <ul className="space-y-4">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        {link.href === '#' || link.href === '' ? (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onUnderDevelopment();
                                                }}
                                                className="text-sm text-slate-500 hover:text-blue-600 transition-colors text-left"
                                            >
                                                {link.name}
                                            </button>
                                        ) : (
                                            <Link href={link.href} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-400 text-xs">
                        © {currentYear} GAMA Drones
                    </div>
                    <div className="flex gap-8">
                        <button onClick={(e) => { e.preventDefault(); onUnderDevelopment(); }} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</button>
                        <button onClick={(e) => { e.preventDefault(); onUnderDevelopment(); }} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</button>
                        <button onClick={(e) => { e.preventDefault(); onUnderDevelopment(); }} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Cookie Policy</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
