"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Target, Users, Award, Shield, Rocket, Sparkles,
    Lightbulb, Building2, Landmark, HeartHandshake, ArrowRight, GraduationCap, Briefcase
} from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden border-b border-white/5">
                <div className="container relative z-10 text-center">
                    <div className="text-primary-copper font-black text-xs tracking-widest uppercase mb-6">About the Summit</div>
                    <h1 className="text-5xl md:text-8xl text-white mb-10 font-black italic uppercase tracking-tighter leading-tight">
                        Inspire. Equip. <br />
                        <span className="text-gradient NOT-italic font-black">Elevate.</span>
                    </h1>
                    <div className="space-y-8 text-xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed mb-16">
                        <p>
                            The Achievers Summit is an annual International Youth Day Leadership and Entrepreneurship Conference designed to inspire, equip, and elevate the next generation of African leaders. Convened by <span className="text-white font-bold">Emmanuel Agida International (EAI)</span>, the Summit brings together young innovators, policymakers, professionals, industry experts, development partners, and influential leaders from across Nigeria, Africa, and the global community.
                        </p>
                        <p>
                            The Summit serves as a strategic platform for young people to explore the future of leadership, governance, entrepreneurship, and innovation within Africa’s rapidly evolving socio-economic landscape. It provides a unique environment where emerging leaders gain access to transformative ideas, mentorship, opportunities, and real-world insights that shape their journey toward global relevance.
                        </p>
                    </div>

                    {/* Context & Theme Teaser - Centered */}
                    <div className="max-w-3xl mx-auto">
                        <div className="glass-panel p-10 md:p-12 rounded-[48px] border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden text-center">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-copper/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <div className="relative z-10">
                                <p className="text-white text-xl md:text-2xl font-light leading-relaxed mb-10 italic">
                                    “This edition holds special significance as it commemorates the <span className="text-primary-copper font-bold NOT-italic">23rd birthday of the Convener on the 12th of August</span>, aligning with International Youth Day, a global celebration dedicated to empowering the voices and possibilities of young people.”
                                </p>

                                <div className="pt-8 border-t border-white/10">
                                    <div className="inline-block px-4 py-1.5 rounded-full border border-primary-copper/30 bg-primary-copper/5 mb-4">
                                        <span className="text-[10px] font-black text-primary-copper uppercase tracking-widest">Official 2026 Theme</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-tight mt-2">
                                        "The Global Emerging Leader: <br />
                                        <span className="text-gradient NOT-italic">Redefining the African Narrative"</span>
                                    </h3>
                                    <p className="mt-6 text-text-secondary text-sm font-light leading-relaxed max-w-2xl mx-auto italic">
                                        Reflecting a bold commitment to shaping a generation of African leaders who are confident, visionary, globally competitive, and ready to influence systems at scale.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary-copper/30 to-transparent"></div>
            </section>

            {/* Vision & Mission Sections */}
            <section className="py-40 bg-midnight-black relative overflow-hidden">
                <div className="motif-bg opacity-5"></div>
                <div className="container relative z-10">
                    <div className="max-w-5xl mx-auto space-y-24">
                        {/* Vision - Centered */}
                        <div className="glass-panel p-16 rounded-[56px] border border-white/5 relative group text-center">
                            <div className="flex flex-col items-center mb-10">
                                <div className="w-16 h-16 bg-primary-copper rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-primary-copper/30 mb-6">
                                    <Target size={32} />
                                </div>
                                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Vision</h2>
                            </div>
                            <blockquote className="text-2xl md:text-3xl text-text-secondary font-light leading-relaxed italic max-w-4xl mx-auto">
                                "To build a generation of globally competent African leaders who inspire excellence, drive innovation, and redefine the continent’s narrative through leadership, entrepreneurship, and civic responsibility."
                            </blockquote>
                        </div>

                        {/* Mission - Centered */}
                        <div className="glass-panel p-16 rounded-[56px] border border-white/5 relative group text-center">
                            <div className="flex flex-col items-center mb-10">
                                <div className="w-16 h-16 bg-white/5 rounded-[24px] flex items-center justify-center text-primary-copper border border-white/10 mb-6">
                                    <Rocket size={32} />
                                </div>
                                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Mission</h2>
                            </div>
                            <blockquote className="text-2xl md:text-3xl text-text-secondary font-light leading-relaxed italic max-w-4xl mx-auto">
                                "To provide a transformative platform that empowers young Africans with knowledge, mentorship, networks, and opportunities for leadership growth, entrepreneurial development, social impact, and global exposure."
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Should Attend */}
            <section className="pt-20 pb-40">
                <div className="container">
                    <div className="text-center mb-24">
                        <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">Target Audience</div>
                        <h2 className="text-4xl md:text-6xl text-white font-black italic uppercase tracking-tighter leading-tight">Who Should <span className="text-gradient NOT-italic">Attend?</span></h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Target />, label: "Young leaders", desc: "Visionary changemakers" },
                            { icon: <Lightbulb />, label: "Entrepreneurs", desc: "Startup founders & innovators" },
                            { icon: <Landmark />, label: "Policymakers", desc: "Government officials & advisors" },
                            { icon: <GraduationCap />, label: "Emerging Professionals", desc: "Students & sector leaders" },
                            { icon: <Building2 />, label: "Corporate Executives", desc: "C-Suite & industry heads" },
                            { icon: <Briefcase />, label: "Investors", desc: "Venture capitalists & donors" },
                            { icon: <HeartHandshake />, label: "CSO Leaders", desc: "Civil society advocates" },
                            { icon: <Rocket />, label: "Delegates", desc: "High-impact individuals" }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-10 rounded-[40px] border border-white/5 hover:border-primary-copper/30 hover:bg-primary-copper/[0.02] transition-all duration-700 group text-center flex flex-col items-center">
                                <div className="w-16 h-16 bg-white/5 rounded-[24px] flex items-center justify-center text-primary-copper mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-inner">
                                    {React.cloneElement(item.icon, { size: 32 })}
                                </div>
                                <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-3">{item.label}</h4>
                                <p className="text-text-muted text-[11px] uppercase font-black tracking-widest leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-28 p-16 glass-panel rounded-[56px] border border-primary-copper/20 bg-primary-copper/[0.03] text-center max-w-5xl mx-auto">
                        <h3 className="text-3xl md:text-5xl text-white font-black italic uppercase tracking-tighter mb-10">
                            Be Part of the <span className="text-gradient NOT-italic">African narrative.</span>
                        </h3>
                        <a href="/tickets" className="btn btn-primary py-6 px-16 group">
                            <span className="tracking-[0.3em] font-black text-xs">SECURE YOUR PASS</span>
                            <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(32px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .text-gradient {
                    background: linear-gradient(to right, #ffffff, var(--primary-copper));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </main>
    );
}
