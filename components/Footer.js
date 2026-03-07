"use client";
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-neutral-950 text-white">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-16 pt-20 pb-10">
                {/* Top grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <img src="/logo.png" alt="Achievers Summit" className="h-14 w-auto mb-4 brightness-0 invert" />
                        <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                            Africa&apos;s premier leadership and innovation conference. August 12–14, 2026 · Lagos, Nigeria.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Event</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'About', href: '/about' },
                                { label: 'Program', href: '/program' },
                                { label: 'Speakers', href: '/#speakers' },
                                { label: 'Tickets', href: '/#tickets' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Get involved</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Community', href: '/community' },
                                { label: 'Nominate', href: '/nominate' },
                                { label: 'Partnership', href: '/partnership' },
                                { label: 'Volunteer', href: '/community' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Support</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Find ticket', href: '/find-ticket' },
                                { label: 'FAQ', href: '/#faq' },
                                { label: 'Privacy', href: '/privacy' },
                                { label: 'Terms', href: '/terms' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/30">
                        &copy; 2026 Achievers Summit Africa. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {[
                            { Icon: Facebook, href: 'https://facebook.com/achieverssummit' },
                            { Icon: Twitter, href: 'https://twitter.com/achieverssummit' },
                            { Icon: Instagram, href: 'https://instagram.com/achievers_summit' },
                            { Icon: Linkedin, href: 'https://linkedin.com/company/achievers-summit' },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/30 hover:text-white transition-colors"
                            >
                                <social.Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
