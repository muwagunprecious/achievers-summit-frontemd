"use client";
import React from 'react';

export default function Hero() {
    return (
        <section className="relative bg-[#121212] pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Text Content */}
                    <div className="flex flex-col text-left z-10">
                        <div className="mb-8 flex items-center gap-2">
                            <span className="inline-block px-3 py-1 bg-white/10 rounded-xs text-[10px] font-bold tracking-widest text-white/70 uppercase border border-white/5">
                                Lagos, Nigeria &bull; Aug 2026
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-medium tracking-tight text-white mb-6 leading-[1.1]">
                            AFRICA&apos;S MOST INFLUENTIAL <br className="hidden lg:block" />
                            LEADERSHIP &amp; <br className="hidden lg:block" />
                            ENTREPRENEURSHIP SUMMIT
                        </h1>

                        <p className="text-lg text-gray-400 mb-10 max-w-xl font-normal leading-relaxed">
                            A 3-day high-level experience designed to unite innovators, policymakers, and changemakers redefining the African narrative.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <a
                                className="btn btn-primary"
                                href="#tickets"
                            >
                                Buy ticket
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </a>
                            <a
                                className="btn bg-white text-black hover:bg-gray-200"
                                href="#about"
                            >
                                View location
                            </a>
                        </div>

                        <div className="mt-12 flex items-center gap-4 opacity-60">
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Powered By</p>
                            <div className="h-px bg-gray-800 w-12"></div>
                            <span className="text-sm font-semibold text-gray-400">EAI International</span>
                        </div>
                    </div>

                    {/* Right Column: Image Grid - Desktop */}
                    <div className="relative h-full min-h-[500px] w-full hidden lg:block">
                        <div className="grid grid-cols-2 gap-4 h-full">
                            {/* Left column images */}
                            <div className="flex flex-col gap-4 pt-12">
                                <div className="aspect-square w-full overflow-hidden bg-gray-800">
                                    <img
                                        alt="Summit attendee"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                        src="/images/hero/summit-1.jpg"
                                    />
                                </div>
                                <div className="aspect-[4/5] w-full overflow-hidden bg-gray-800 relative group">
                                    <img
                                        alt="Summit workshop"
                                        className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                                        src="/images/hero/summit-2.jpg"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <span className="text-white text-sm font-medium">Digital Workshops</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right column images */}
                            <div className="flex flex-col gap-4">
                                <div className="aspect-[4/3] w-full rounded-full overflow-hidden bg-gray-800 border-4 border-[#121212] relative z-10 transform translate-y-8 shadow-2xl">
                                    <img
                                        alt="Team meeting"
                                        className="w-full h-full object-cover object-top transition-all duration-700"
                                        src="/images/hero/summit-3.jpg"
                                    />
                                </div>
                                <div className="aspect-square w-full overflow-hidden bg-gray-800 mt-8">
                                    <img
                                        alt="Handshake"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                        src="/images/hero/summit-4.jpg"
                                    />
                                </div>
                                <div className="aspect-video w-full rounded-full overflow-hidden bg-gray-800 relative">
                                    <img
                                        alt="Summit speakers"
                                        className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                                        src="/images/hero/summit-6.jpg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Background glow effects */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#783A28]/20 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#CC9933]/10 rounded-full blur-3xl -z-10"></div>
                    </div>

                    {/* Mobile Image */}
                    <div className="lg:hidden w-full mt-8">
                        <div className="aspect-video rounded-xs overflow-hidden relative shadow-xl">
                            <img
                                alt="Conference Audience"
                                className="w-full h-full object-cover"
                                src="/images/hero/summit-5.jpg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <span className="text-white font-bold text-lg">Join the Movement</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
