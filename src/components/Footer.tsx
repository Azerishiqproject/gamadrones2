'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const footerLinks = {
    company: [
        { name: 'About Us', href: '#' },
        { name: 'Our Vision', href: '#' },
        { name: 'Ecosystem', href: '#' },
        { name: 'Partners', href: '#' },
        { name: 'Contact', href: '#' },
    ],
    product: [
        { name: 'LCE Battery Tech', href: '#' },
        { name: 'Auto-Nav Pilot', href: '#' },
        { name: 'SkyCore Firmware', href: '#' },
        { name: 'Mission CID', href: '#' },
        { name: 'Delivery Services', href: '#' },
    ],
    resources: [
        { name: 'Documentation', href: '#' },
        { name: 'Safety Standards', href: '#' },
        { name: 'Regulatory Compliance', href: '#' },
        { name: 'Environmental Impact', href: '#' },
        { name: 'Support', href: '#' },
    ],
    social: [
        { name: 'Twitter', href: '#' },
        { name: 'LinkedIn', href: '#' },
        { name: 'Instagram', href: '#' },
        { name: 'YouTube', href: '#' },
    ],
};

export default function Footer() {
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
                            {footerLinks.social.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    {/* Icons could be added here */}
                                    <div className="w-5 h-5 bg-current opacity-20" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-4 gap-8">
                        <div>
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Company</h4>
                            <ul className="space-y-4">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Product</h4>
                            <ul className="space-y-4">
                                {footerLinks.product.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Resources</h4>
                            <ul className="space-y-4">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-400 text-xs">
                        © {currentYear} GAMA Autonomous Technologies. All rights reserved.
                    </div>
                    <div className="flex gap-8">
                        <Link href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Terms of Service</Link>
                        <Link href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
