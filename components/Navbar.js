"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ isHidden }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        { name: 'Faculty', href: '/faculty' },
        { name: 'Tickets', href: '/tickets' },
        { name: 'Find Pass', href: '/find-ticket' },
        { name: 'Volunteer', href: 'https://forms.gle/7PeSzZQzAo6T36BQ6', external: true },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-100 transition-all duration-700 ${isScrolled ? 'py-4' : 'py-8'} ${isHidden ? 'opacity-0 pointer-events-none translate-y-[-100%]' : 'opacity-100 translate-y-0'}`}>
            <div
                className={`container mx-auto flex items-center justify-between transition-all duration-700 ${isScrolled
                    ? 'glass-panel py-3 px-8 shadow-2xl border border-white/10'
                    : 'py-2 px-4'
                    }`}
            >
                <a href="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-primary-copper rounded-xl flex items-center justify-center transform group-hover:rotate-[15deg] transition-all duration-500 shadow-lg shadow-primary-copper/20">
                        <span className="text-white font-black text-2xl italic">A</span>
                    </div>
                    <div className="text-xl font-black tracking-tighter">
                        <span className="text-white">ACHIEVERS</span>
                        <span className="text-primary-copper ml-1 uppercase">SUMMIT</span>
                        <span className="text-primary-copper">.</span>
                    </div>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
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
                    <a href="/tickets" className="btn btn-primary !py-3 !px-8 !text-xs">
                        Donate now
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-white border border-white/10"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-0 z-100 transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-midnight-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 p-8">
                    <button
                        className="absolute top-12 right-12 w-16 h-16 flex items-center justify-center rounded-full bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <X size={32} />
                    </button>
                    {navLinks.map((link, i) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className={`text-3xl font-black text-white hover:text-primary-copper transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="/tickets" className="btn btn-primary w-full max-w-xs mt-4" onClick={() => setIsMenuOpen(false)}>
                        Donate now
                    </a>
                </div>
            </div>
        </nav>
    );
}
