"use client";
import React from 'react';
import { Target, Lightbulb, Users, Briefcase, GraduationCap, Building2, Landmark, HeartHandshake, Rocket, Sparkles } from 'lucide-react';

export default function AboutSummit() {
    return (
        <section id="about-summit" className="py-40 bg-midnight-black relative overflow-hidden">
            <div className="motif-bg opacity-5"></div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <div className="animate-fade-in-right">
                        <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-6">About the Summit</div>
                        <h2 className="text-4xl md:text-6xl text-white font-black italic uppercase tracking-tighter mb-8 leading-tight">
                            The Annual <br />
                            <span className="text-gradient NOT-italic font-black">International Youth Day</span> <br />
                            Conference.
                        </h2>
                        <div className="space-y-6 text-text-secondary text-lg font-light leading-relaxed">
                            <p>
                                The Achievers Summit is Africa’s premier convergence of leadership and entrepreneurship. Convened annually by <span className="text-white font-bold">Emmanuel Agida International (EAI)</span>, this summit serves as a high-level platform for global and African participation.
                            </p>
                            <p>
                                With a core focus on <span className="text-primary-copper font-bold uppercase tracking-widest text-sm">Leadership & Entrepreneurship</span>, we bridge the gap between visionary thinking and institutional transformation.
                            </p>
                        </div>

                        <div className="mt-12 glass-panel p-8 rounded-[32px] border-l-4 border-l-primary-copper bg-white/[0.02]">
                            <p className="text-white font-black uppercase tracking-[0.2em] text-xs mb-4">Why This Edition Matters</p>
                            <p className="text-text-secondary leading-relaxed">
                                This year’s edition is uniquely positioned, coinciding with the <span className="text-white font-bold">Convener’s 23rd birthday (12th August)</span> and aligned perfectly with International Youth Day celebrations. The 2026 theme explores <span className="italic text-primary-copper font-medium">“The Global Emerging Leader: Redefining the African Narrative.”</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 animate-fade-in-left">
                        <div className="glass-panel p-10 rounded-[40px] border border-white/5 relative group">
                            <div className="absolute -top-6 left-10 w-12 h-12 bg-primary-copper rounded-2xl flex items-center justify-center text-white shadow-xl">
                                <Target size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mt-4 mb-4">Vision</h3>
                            <blockquote className="text-xl text-text-secondary font-light leading-relaxed border-l-2 border-white/10 pl-6 italic">
                                "To raise and empower 10 million visionary leaders across Africa by 2030, equipped with the innovation and integrity to redefine the global leadership landscape."
                            </blockquote>
                        </div>

                        <div className="glass-panel p-10 rounded-[40px] border border-white/5 relative group">
                            <div className="absolute -top-6 left-10 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary-copper shadow-xl border border-white/10">
                                <Rocket size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mt-4 mb-4">Mission</h3>
                            <ul className="space-y-4">
                                {[
                                    { icon: <Sparkles size={16} />, text: "Catalyzing value-based leadership and governance reforms." },
                                    { icon: <Sparkles size={16} />, text: "Fostering an ecosystem for high-impact entrepreneurship." },
                                    { icon: <Sparkles size={16} />, text: "Providing mentorship from global industry titans." },
                                    { icon: <Sparkles size={16} />, text: "Amplifying the African narrative through excellence." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start group/item">
                                        <div className="mt-1.5 p-1 rounded-md bg-primary-copper/10 text-primary-copper">{item.icon}</div>
                                        <span className="text-text-secondary text-base group-hover/item:text-white transition-colors">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Who Should Attend */}
                <div className="pt-20 border-t border-white/5">
                    <div className="text-center mb-20 px-4">
                        <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">Target Audience</div>
                        <h2 className="text-3xl md:text-5xl text-white font-black italic uppercase tracking-tighter">Who Should <span className="text-gradient NOT-italic">Attend?</span></h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
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
                            <div key={i} className="glass-panel p-8 rounded-[32px] border border-white/5 hover:border-primary-copper/30 hover:bg-primary-copper/[0.02] transition-all duration-500 group text-center flex flex-col items-center">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary-copper mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5">
                                    {React.cloneElement(item.icon, { size: 28 })}
                                </div>
                                <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-2">{item.label}</h4>
                                <p className="text-text-muted text-[10px] uppercase font-bold tracking-widest">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .text-primary-copper { color: var(--primary-copper); }
                .text-gradient {
                    background: linear-gradient(to right, #ffffff, var(--primary-copper));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </section>
    );
}
