"use client";
import React, { useState } from 'react';
import { Target, Users, Loader2 } from 'lucide-react';

export default function ExhibitionStand() {
    const [isLoading, setIsLoading] = useState(false);

    const handleBook = () => {
        setIsLoading(true);
        // Open the partner page in a new tab as requested
        const newWindow = window.open('/partnership', '_blank');

        // Reset loader once the tab is opened (or after a short delay)
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    };

    return (
        <section id="partner" className="py-32 bg-midnight-black relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="motif-bg opacity-[0.02]"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary-copper/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-stretch gap-10 md:gap-20 lg:gap-32">
                    {/* Left Column: Fixed Portrait Handshake Visual */}
                    <div className="flex flex-col h-full w-full order-1 md:order-1">
                        <div className="relative group h-full w-full max-w-[450px]">
                            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10 bg-midnight-obsidian h-full min-h-[500px]">
                                <img
                                    src="/images/handshake.jpg"
                                    alt="Partnership Handshake"
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-midnight-black via-transparent to-transparent opacity-60"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Text Content */}
                    <div className="text-left order-2 md:order-2 flex flex-col justify-center">
                        <div className="inline-block self-start px-8 py-3 rounded-full bg-primary-copper/10 border border-primary-copper/20 text-primary-copper font-black text-xs tracking-[0.4em] uppercase mb-6">
                            Strategic Alliance
                        </div>

                        <h2 className="text-4xl md:text-6xl text-white mb-6 italic leading-tight uppercase font-black tracking-tighter">
                            BECOME A <br />
                            <span className="text-gradient NOT-italic block">STRATEGIC PARTNER.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-text-secondary font-light leading-relaxed mb-8 max-w-xl">
                            Join forces with Africa's premier summit for achievers and industry leaders. Strategic partnerships position your organization at the forefront of continental innovation.
                        </p>

                        {/* Value Props */}
                        <div className="grid grid-cols-1 gap-6 mb-10">
                            {[
                                {
                                    icon: <Users size={24} />,
                                    title: "Elite Access",
                                    desc: "Direct engagement with decision makers."
                                },
                                {
                                    icon: <Target size={24} />,
                                    title: "Brand Visibility",
                                    desc: "Continental exposure & recognition."
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-center group/item p-4 rounded-3xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                                    <div className="flex-shrink-0 w-14 h-14 glass-panel rounded-2xl flex items-center justify-center text-primary-copper border border-white/10 group-hover/item:bg-primary-copper group-hover/item:text-white transition-all">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">{item.title}</h4>
                                        <p className="text-xs text-text-muted font-medium uppercase tracking-widest">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-start">
                            <button
                                onClick={handleBook}
                                disabled={isLoading}
                                className="btn btn-primary group !py-5 !px-16 !text-xs tracking-[0.5em] shadow-2xl shadow-primary-copper/20 hover:shadow-primary-copper/40 transition-all flex items-center justify-center gap-4 min-w-[280px]"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>PARTNER WITH US</span>
                                        <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-white animate-pulse"></div>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
                .bg-midnight-black { background-color: var(--midnight-black); }
                .bg-midnight-obsidian { background-color: var(--midnight-obsidian); }
                .text-gradient {
                    background: linear-gradient(135deg, #ff8c00 0%, #ff4500 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </section >
    );
}
