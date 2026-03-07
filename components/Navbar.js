"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const DonateModal = dynamic(() => import('./DonateModal'), { ssr: false });

export default function Navbar({ isHidden, variant = 'dark' }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDonateOpen, setIsDonateOpen] = useState(false);

    // variant = 'dark'  → white text before scroll (for dark hero backgrounds like homepage)
    // variant = 'light' → dark text before scroll (for light hero backgrounds like sub-pages)
    const isLight = variant === 'light';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'About', href: '/about' },
        { name: 'Program', href: '/program' },
        { name: 'Speakers', href: '/#speakers' },
        { name: 'Community', href: '/community' },
        { name: 'Nominate', href: '/nominate' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isHidden ? 'opacity-0 pointer-events-none -translate-y-full' : ''}`}>
                <div className={`transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg border-b border-black/5 shadow-sm' : ''}`}>
                    <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>

                            {/* Logo */}
                            <a href="/" className="flex items-center gap-2 shrink-0">
                                <Image
                                    src="/logo.png"
                                    alt="Achievers Summit"
                                    width={120}
                                    height={40}
                                    priority
                                    className={`h-10 w-auto object-contain transition-all duration-300 ${!isScrolled && !isLight ? 'brightness-0 invert md:brightness-0 md:invert' : ''}`}
                                />
                            </a>

                            {/* Desktop Nav */}
                            <div className="hidden lg:flex items-center gap-8">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className={`text-[13px] font-medium transition-colors ${isScrolled ? 'text-neutral-600 hover:text-neutral-900' : isLight ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/80 hover:text-white'}`}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>

                            {/* Desktop CTAs */}
                            <div className="hidden lg:flex items-center gap-3">
                                <a href="/#tickets" className={`text-[13px] font-semibold transition-colors ${isScrolled ? 'text-brand hover:text-brand-dark' : isLight ? 'text-brand hover:text-brand-dark' : 'text-white hover:text-white/80'}`}>
                                    Tickets
                                </a>
                                <button onClick={() => setIsDonateOpen(true)} className="btn btn-primary btn-sm">
                                    Donate
                                </button>
                            </div>

                            {/* Mobile toggle */}
                            <button
                                className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${isScrolled ? 'text-neutral-700 hover:bg-neutral-100' : isLight ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white/10'}`}
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <Menu size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`lg:hidden fixed inset-0 z-[100] transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}>
                {/* Backdrop */}
                <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />

                {/* Panel */}
                <div className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                        <span className="text-lg font-semibold tracking-tight">Menu</span>
                        <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-500">
                            <X size={22} />
                        </button>
                    </div>

                    <div className="p-6 flex flex-col gap-1">
                        {[{ name: 'Home', href: '/' }, ...navLinks, { name: 'Tickets', href: '/#tickets' }].map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="flex items-center justify-between py-3 px-4 rounded-lg text-neutral-700 hover:bg-neutral-50 hover:text-brand transition-colors font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                                <ArrowRight size={16} className="text-neutral-300" />
                            </a>
                        ))}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-neutral-100">
                        <button onClick={() => { setIsMenuOpen(false); setIsDonateOpen(true); }} className="btn btn-primary w-full">
                            Donate now
                        </button>
                    </div>
                </div>
            </div>

            <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
        </>
    );
}
