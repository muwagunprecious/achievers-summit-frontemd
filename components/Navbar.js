"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const DonateModal = dynamic(() => import('./DonateModal'), { ssr: false });

export default function Navbar({ isHidden }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDonateOpen, setIsDonateOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Community', href: '/community' },
        { name: 'Program', href: '/program' },
        { name: 'Faculty', href: '/#speakers' },
        { name: 'Nominate', href: '/nominate' },
        { name: 'Tickets', href: '/#tickets' },
    ];

    return (
        <>
            {/* Main Navbar Wrapper */}
            <nav
                suppressHydrationWarning
                className={`fixed top-0 left-0 w-full z-100 transition-all duration-700 ${isScrolled ? 'py-4' : 'py-8'} ${isHidden ? 'opacity-0 pointer-events-none translate-y-[-100%]' : 'opacity-100 translate-y-0'}`}
            >
                {/* Mobile Navbar Background - Consistent background for mobile header */}
                <div className={`md:hidden absolute inset-0 bg-midnight-black/95 backdrop-blur-xl border-b border-white/10 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>

                <div
                    className={`container mx-auto flex items-center justify-between transition-all duration-700 relative z-10 ${isScrolled
                        ? 'glass-panel py-3 px-8 shadow-2xl border border-white/10'
                        : 'py-2 px-4'
                        } ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <a href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-24 h-16 flex items-center justify-center transform group-hover:scale-105 transition-all duration-500">
                            <img src="/logo.png" alt="Achievers Summit Logo" className="w-full h-full object-contain object-left mix-blend-screen" />
                        </div>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-16">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                className="text-xs font-black text-text-secondary hover:text-white transition-all duration-300 tracking-widest uppercase relative group/link"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary-copper transition-all duration-300 group-hover/link:w-full"></span>
                            </a>
                        ))}
                        <button onClick={() => setIsDonateOpen(true)} className="btn btn-primary !py-3 !px-8 !text-xs">
                            Donate now
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-white border border-white/10"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Moved OUTSIDE the main nav to ensure full coverage and avoid clipping */}
            <div
                className={`md:hidden fixed top-0 left-0 right-0 z-1000 bg-midnight-black/95 backdrop-blur-3xl border-b border-white/10 shadow-2xl transform transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-[-100%] opacity-0 pointer-events-none'}`}
            >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-copper rounded-xl flex items-center justify-center">
                            <span className="text-white font-black text-2xl italic">A</span>
                        </div>
                        <div className="text-xl font-black tracking-tighter">
                            <span className="text-white">ACHIEVERS</span>
                            <span className="text-primary-copper ml-1 uppercase">SUMMIT</span>
                        </div>
                    </div>
                    <button
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-white border border-white/10"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 py-6 px-4 overflow-y-auto">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className={`text-xl font-bold text-white hover:text-primary-copper transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            style={{ transitionDelay: `${i * 30}ms` }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="btn btn-primary w-full mt-2 !py-2 text-sm" onClick={() => { setIsMenuOpen(false); setIsDonateOpen(true); }}>
                        Donate now
                    </button>
                </div>
            </div>

            <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
        </>
    );
}
