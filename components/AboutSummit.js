"use client";
import React from 'react';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

export default function AboutSummit() {
    return (
        <section id="about-summit" className="py-32 bg-midnight-black relative overflow-hidden border-t border-white/5">
            <div className="motif-bg opacity-5"></div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                    {/* Left: Heading and Intro */}
                    <div>
                        <div className="inline-flex items-center gap-3 text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-8">
                            <Sparkles size={12} />
                            About the Summit
                        </div>

                        <h2 className="text-4xl md:text-6xl text-white font-black italic uppercase tracking-tighter mb-10 leading-tight">
                            The Annual <br />
                            <span className="text-gradient NOT-italic font-black">International Youth Day</span> <br />
                            Conference.
                        </h2>

                        <div className="space-y-6 text-text-secondary text-lg font-light leading-relaxed mb-10 max-w-2xl">
                            <p>
                                The Achievers Summit is Africa’s premier convergence of leadership and entrepreneurship. Convened annually by <span className="text-white font-bold">Emmanuel Agida International (EAI)</span>, this summit serves as a high-level platform for global and African participation.
                            </p>
                            <p>
                                With a core focus on <span className="text-primary-copper font-bold italic">Leadership & Entrepreneurship</span>, we bridge the gap between visionary thinking and institutional transformation.
                            </p>
                        </div>

                        <a href="/about" className="btn btn-primary py-5 px-10 group inline-flex items-center shadow-2xl shadow-primary-copper/20">
                            <span className="tracking-[0.3em] font-black text-[10px] uppercase">READ MORE ABOUT US</span>
                            <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Right: Context & Theme Teaser */}
                    <div className="relative">
                        <div className="glass-panel p-10 md:p-12 rounded-[48px] border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-copper/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-copper/10 flex items-center justify-center text-primary-copper border border-primary-copper/20">
                                        <Calendar size={20} />
                                    </div>
                                    <div className="h-[1px] flex-1 bg-white/10"></div>
                                </div>

                                <p className="text-white text-xl font-light leading-relaxed mb-10 italic">
                                    “This year’s edition is uniquely positioned, coinciding with the <span className="text-primary-copper font-bold NOT-italic">Convener’s 23rd birthday</span> and aligned perfectly with <span className="text-white font-bold NOT-italic">International Youth Day</span>.”
                                </p>

                                <div className="pt-8 border-t border-white/10">
                                    <div className="inline-block px-4 py-1.5 rounded-full border border-primary-copper/30 bg-primary-copper/5 mb-4">
                                        <span className="text-[10px] font-black text-primary-copper uppercase tracking-widest">Official 2026 Theme</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight mt-2">
                                        "Redefining the <br />
                                        <span className="text-gradient NOT-italic">African Narrative"</span>
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/5 rounded-[48px] -z-10"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(40px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
                .text-gradient {
                    background: linear-gradient(to right, #ffffff, var(--primary-copper));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </section>
    );
}
