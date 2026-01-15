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
            <section className="relative py-32 overflow-hidden border-b border-white/5">
                <div className="container relative z-10 text-center">
                    <div className="text-primary-copper font-black text-xs tracking-widest uppercase mb-6">Our DNA</div>
                    <h1 className="text-5xl md:text-8xl text-white mb-10 font-black italic uppercase tracking-tighter leading-tight">
                        About the <br />
                        <span className="text-gradient NOT-italic font-black">Achievers Summit.</span>
                    </h1>
                    <p className="text-xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed">
                        The Achievers Summit is Africa’s premier convergence of leadership and entrepreneurship. Convened annually by <span className="text-white font-bold">Emmanuel Agida International (EAI)</span>, we bridge the gap between visionary thinking and institutional transformation.
                    </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary-copper/30 to-transparent"></div>
            </section>

            {/* Vision & Mission Sections */}
            <section className="py-40 bg-midnight-black relative overflow-hidden">
                <div className="motif-bg opacity-5"></div>
                <div className="container relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
                        <div className="glass-panel p-12 rounded-[48px] border border-white/5 relative group h-full">
                            <div className="flex items-center gap-6 mb-10">
                                <div className="w-14 h-14 bg-primary-copper rounded-[20px] flex items-center justify-center text-white shadow-xl shadow-primary-copper/20">
                                    <Target size={28} />
                                </div>
                                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Vision</h2>
                            </div>
                            <blockquote className="text-2xl text-text-secondary font-light leading-relaxed border-l-2 border-primary-copper/30 pl-8 italic">
                                "To raise and empower 10 million visionary leaders across Africa by 2030, equipped with the innovation and integrity to redefine the global leadership landscape."
                            </blockquote>
                        </div>

                        <div className="glass-panel p-12 rounded-[48px] border border-white/5 relative group h-full">
                            <div className="flex items-center gap-6 mb-10">
                                <div className="w-14 h-14 bg-white/5 rounded-[20px] flex items-center justify-center text-primary-copper border border-white/10">
                                    <Rocket size={28} />
                                </div>
                                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Mission</h2>
                            </div>
                            <ul className="space-y-8">
                                {[
                                    "Catalyzing value-based leadership and governance reforms.",
                                    "Fostering an ecosystem for high-impact entrepreneurship.",
                                    "Providing mentorship from global industry titans.",
                                    "Amplifying the African narrative through excellence."
                                ].map((text, i) => (
                                    <li key={i} className="flex gap-6 items-start group/item">
                                        <div className="mt-2.5 w-2 h-2 rounded-full bg-primary-copper shadow-[0_0_10px_rgba(161,136,127,0.5)] transition-all" />
                                        <span className="text-text-secondary text-xl font-light leading-tight group-hover/item:text-white transition-colors">{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who Should Attend */}
            <section className="py-40">
                <div className="container">
                    <div className="text-center mb-24">
                        <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">Target Audience</div>
                        <h2 className="text-4xl md:text-6xl text-white font-black italic uppercase tracking-tighter leading-tight">Who Should <span className="text-gradient NOT-italic">Attend?</span></h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Users />, label: "Young Leaders", desc: "Visionary changemakers" },
                            { icon: <Lightbulb />, label: "Entrepreneurs", desc: "Startup founders & innovators" },
                            { icon: <Landmark />, label: "Policymakers", desc: "Government officials & advisors" },
                            { icon: <GraduationCap />, label: "Professionals", desc: "Emerging sector leaders" },
                            { icon: <Building2 />, label: "Executives", desc: "C-Suite & corporate heads" },
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
