"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AboutSummit() {
    return (
        <section id="about-summit" className="py-40 bg-midnight-black relative overflow-hidden">
            <div className="motif-bg opacity-5"></div>

            <div className="container relative z-10">
                <div className="max-w-5xl">
                    <div className="animate-fade-in-right">
                        <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-10">About the Summit</div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                            <div className="lg:col-span-8">
                                <h2 className="text-5xl md:text-7xl text-white font-black italic uppercase tracking-tighter mb-12 leading-[0.9]">
                                    The Annual <br />
                                    <span className="text-gradient NOT-italic font-black">International Youth Day</span> <br />
                                    Conference.
                                </h2>

                                <div className="space-y-8 text-text-secondary text-xl font-light leading-relaxed mb-12">
                                    <p>
                                        The Achievers Summit is Africa’s premier convergence of leadership and entrepreneurship. Convened annually by <span className="text-white font-bold">Emmanuel Agida International (EAI)</span>, this summit serves as a high-level platform for global and African participation.
                                    </p>
                                    <p>
                                        With a core focus on <span className="text-primary-copper font-bold italic">Leadership & Entrepreneurship</span>, we bridge the gap between visionary thinking and institutional transformation.
                                    </p>
                                </div>

                                <a href="/about" className="btn btn-outline py-5 px-10 border-white/10 hover:border-primary-copper group inline-flex items-center">
                                    <span className="tracking-[0.3em] font-black text-[10px] uppercase">Read More</span>
                                    <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform text-primary-copper" />
                                </a>
                            </div>

                            <div className="lg:col-span-4 lg:pt-24 border-t border-white/5 lg:border-t-0 lg:border-l lg:pl-16">
                                <h3 className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-8 flex items-center gap-4">
                                    Context
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                                </h3>
                                <p className="text-text-secondary text-lg font-light leading-relaxed mb-8 italic">
                                    “This year’s edition is uniquely positioned, coinciding with the Convener’s 23rd birthday and International Youth Day.”
                                </p>
                                <div className="p-1 px-4 rounded-full border border-white/10 bg-white/5 inline-block">
                                    <span className="text-[10px] font-black text-primary-copper uppercase tracking-widest">Official 2026 Theme</span>
                                </div>
                                <p className="mt-4 text-white font-black text-xs uppercase tracking-tighter italic">
                                    "Redefining the African Narrative"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .text-gradient {
                    background: linear-gradient(to right, #ffffff, var(--primary-copper));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </section>
    );
}
