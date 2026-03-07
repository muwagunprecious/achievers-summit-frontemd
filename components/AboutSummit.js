"use client";
import React from 'react';
import { Users, Handshake, Puzzle, Play, Star } from 'lucide-react';

export default function AboutSummit() {
    return (
        <section id="about-summit" className="relative py-20 overflow-hidden bg-white">
            {/* Background blurs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary-gold/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-copper/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-primary-copper text-white text-xs font-bold tracking-wider uppercase rounded-full mb-6">
                        About This Event
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-4xl mx-auto text-text-primary">
                        An International Youth Day Conference Convened by Emmanuel Agida International (EAI)
                    </h2>
                    <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                        Bringing together policymakers, entrepreneurs, and global leaders to redefine the African narrative through actionable insights and collaborative networks.
                    </p>
                </div>

                {/* Video / Image Block */}
                <div className="relative max-w-5xl mx-auto mb-20 group cursor-pointer">
                    {/* Decorative stars */}
                    <div className="absolute -left-12 top-1/4 w-8 h-8 text-secondary-gold hidden lg:block">
                        <Star fill="currentColor" />
                    </div>
                    <div className="absolute -right-8 top-1/3 w-6 h-6 text-blue-500 hidden lg:block">
                        <Star fill="currentColor" size={24} />
                    </div>
                    <div className="absolute -left-6 bottom-1/4 w-5 h-5 text-primary-copper hidden lg:block">
                        <Star fill="currentColor" size={20} />
                    </div>

                    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-2 border border-slate-200">
                        <div className="relative rounded-2xl overflow-hidden aspect-video">
                            <img
                                alt="Conference crowd"
                                className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-700 group-hover:scale-105"
                                src="/images/hero/summit-1.jpg"
                            />
                            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                                    <Play size={36} className="text-slate-800 ml-1" fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-primary-copper/10 flex items-center justify-center shrink-0">
                            <Users size={28} className="text-primary-copper" />
                        </div>
                        <div>
                            <h4 className="font-bold text-text-primary text-lg leading-tight">5,000+ Leaders</h4>
                            <p className="text-text-secondary text-sm mt-1">In-Person Meet-Up</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-primary-copper/10 flex items-center justify-center shrink-0">
                            <Handshake size={28} className="text-primary-copper" />
                        </div>
                        <div>
                            <h4 className="font-bold text-text-primary text-lg leading-tight">Connect With</h4>
                            <p className="text-text-secondary text-sm mt-1">Global Industry Pioneers</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-primary-copper/10 flex items-center justify-center shrink-0">
                            <Puzzle size={28} className="text-primary-copper" />
                        </div>
                        <div>
                            <h4 className="font-bold text-text-primary text-lg leading-tight">20+ High-Level</h4>
                            <p className="text-text-secondary text-sm mt-1">Policy Sessions</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
