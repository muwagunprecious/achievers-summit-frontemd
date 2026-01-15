"use client";
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function AboutSummit() {
    return (
        <section id="about-summit" className="py-32 bg-midnight-black relative overflow-hidden border-t border-white/5">
            <div className="motif-bg opacity-5"></div>

            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="animate-fade-in-up">
                        <div className="inline-flex items-center gap-3 text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-10">
                            <Sparkles size={12} />
                            About the Summit
                        </div>

                        <h2 className="text-5xl md:text-7xl text-white font-black italic uppercase tracking-tighter mb-12 leading-tight">
                            The Annual <br />
                            <span className="text-gradient NOT-italic font-black">International Youth Day</span> <br />
                            Conference.
                        </h2>

                        <div className="space-y-8 text-text-secondary text-xl font-light leading-relaxed mb-16 mx-auto max-w-3xl">
                            <p>
                                The Achievers Summit is Africa’s premier convergence of leadership and entrepreneurship. Convened annually by <span className="text-white font-bold">Emmanuel Agida International (EAI)</span>, this summit serves as a high-level platform for global and African participation.
                            </p>
                            <p>
                                Designed to <span className="text-primary-copper font-bold italic uppercase tracking-widest text-sm">Inspire, Equip, and Elevate</span> the next generation, we bridge the gap between visionary thinking and institutional transformation.
                            </p>
                        </div>

                        <a href="/about" className="btn btn-primary py-5 px-12 group inline-flex items-center shadow-2xl shadow-primary-copper/30">
                            <span className="tracking-[0.3em] font-black text-[10px] uppercase">DISCOVER OUR VISION</span>
                            <ArrowRight size={18} className="ml-4 group-hover:translate-x-2 transition-transform" />
                        </a>
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
