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
        <section id="partner" className="py-20 bg-white relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="motif-bg opacity-[0.015]"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-primary-copper/5 rounded-full blur-[80px]"></div>
            </div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Image Visual - Proportional Width Increase */}
                    <div className="order-1 flex justify-center">
                        <div className="relative group w-full max-w-[750px]">
                            <div
                                className="relative rounded-xs overflow-hidden border border-black/10 bg-[#F8F6F4] shadow-xl"
                                style={{ aspectRatio: '4/3' }}
                            >
                                <img
                                    src="/images/hand 2.jpeg"
                                    alt="Strategic Partnership"
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Text Content - Highly Compact */}
                    <div className="text-left order-2 flex flex-col">
                        <div className="inline-block self-start px-6 py-2 rounded-full bg-primary-copper/10 border border-primary-copper/20 text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">
                            Strategic Alliance
                        </div>

                        <h2 className="text-3xl md:text-5xl text-text-primary mb-3 italic leading-tight uppercase font-black tracking-tighter">
                            BECOME A <br />
                            <span className="text-gradient NOT-italic block">STRATEGIC PARTNER.</span>
                        </h2>

                        <p className="text-base text-text-secondary font-light leading-relaxed mb-4 max-w-lg">
                            Join forces with Africa's premier summit for achievers. Strategic partnerships position your organization at the forefront of continental innovation.
                        </p>

                        {/* Value Props */}
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            {[
                                {
                                    icon: <Users size={20} />,
                                    title: "Elite Access",
                                    desc: "Engagement with decision makers."
                                },
                                {
                                    icon: <Target size={20} />,
                                    title: "Brand Visibility",
                                    desc: "Continental exposure & recognition."
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-center group/item p-2 rounded-xs hover:bg-black/[0.02] transition-colors">
                                    <div className="flex-shrink-0 w-10 h-10 glass-panel rounded-xs flex items-center justify-center text-primary-copper border border-black/10 group-hover/item:bg-primary-copper group-hover/item:text-white transition-all">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-text-primary font-black uppercase tracking-widest text-[10px] mb-0.5">{item.title}</h4>
                                        <p className="text-[9px] text-text-muted font-medium uppercase tracking-widest">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-start">
                            <button
                                onClick={handleBook}
                                disabled={isLoading}
                                className="btn btn-primary disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    'Partner with us'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(20px);
                }
                .bg-midnight-black { background-color: #FFFFFF; }
                .bg-midnight-obsidian { background-color: #F8F6F4; }
                .text-gradient {
                    background: linear-gradient(135deg, #783A28 0%, #4A2419 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </section>
    );
}
