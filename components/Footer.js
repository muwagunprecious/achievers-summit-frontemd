"use client";
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-bg-deep text-white pt-32 pb-16 relative overflow-hidden">
            {/* Background Motif Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-copper to-transparent opacity-30"></div>
            <div className="motif-bg opacity-[0.03]"></div>

            <div className="container relative z-10 flex flex-col items-center">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-16 group cursor-pointer">
                    <div className="w-40 h-32 flex items-center justify-center transform group-hover:scale-105 transition-all duration-500 mb-6">
                        <img src="/logo.png" alt="Achievers Summit Logo" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-text-secondary text-lg font-light leading-relaxed max-w-xl mx-auto text-center">
                        Catalyzing the next era of African excellence through visionary leadership and institutional transformation.
                    </p>
                </div>

                {/* Navigation Section */}
                <nav className="mb-12">
                    <ul className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-xs font-black tracking-[0.3em] uppercase">
                        <li><a href="/" className="text-text-secondary hover:text-white transition-all duration-300">Home</a></li>
                        <li><a href="/why-attend" className="text-text-secondary hover:text-white transition-all duration-300">Why Attend</a></li>
                        <li><a href="/theme" className="text-text-secondary hover:text-white transition-all duration-300">Theme</a></li>
                        <li><a href="/program" className="text-text-secondary hover:text-white transition-all duration-300">Program</a></li>
                        <li><a href="/#tickets" className="text-text-secondary hover:text-white transition-all duration-300">Tickets</a></li>
                    </ul>
                </nav>

                {/* Social Section */}
                <div className="flex justify-center gap-6 mb-20">
                    {[
                        { Icon: Facebook, href: 'https://facebook.com/achieverssummit' },
                        { Icon: Twitter, href: 'https://twitter.com/achieverssummit' },
                        { Icon: Instagram, href: 'https://instagram.com/achievers_summit' },
                        { Icon: Linkedin, href: 'https://linkedin.com/company/achievers-summit' }
                    ].map((social, i) => (
                        <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass-panel flex items-center justify-center text-text-muted hover:text-primary-copper hover:border-primary-copper/30 transition-all duration-300 rounded-2xl border border-white/5">
                            <social.Icon size={20} />
                        </a>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="w-full pt-12 border-t border-white/5 flex flex-col items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">
                        © 2026 Achievers Summit Africa • All Rights Reserved
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-text-muted/60">
                        <a href="/privacy" className="hover:text-white transition-colors">Privacy Protocol</a>
                        <a href="/terms" className="hover:text-white transition-colors">Digital Terms</a>
                        <a href="/find-ticket" className="hover:text-white transition-colors">Verified Portal</a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .text-primary-copper { color: var(--primary-copper); }
                .bg-primary-copper { background-color: var(--primary-copper); }
            `}</style>
        </footer>
    );
}
