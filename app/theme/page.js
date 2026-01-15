"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Flag, Globe, ShieldCheck, Flame, Scale, Network,
    ArrowRight, Rocket, Star, Compass
} from 'lucide-react';

export default function ThemePage() {
    const outcomes = [
        { icon: <Globe />, text: "Scaling local influence to global continental impact." },
        { icon: <Compass />, text: "Instilling value-based leadership as the new African standard." },
        { icon: <Scale />, text: "Driving structural and policy-driven governance reforms." },
        { icon: <Rocket />, text: "Building competitive global enterprises rooted in Africa." },
        { icon: <Flag />, text: "Pioneering indigenous innovation for global sustainability." },
        { icon: <Star />, text: "Resetting the African narrative via authoritative excellence." }
    ];

    const objectives = [
        {
            category: "Leadership & Governance",
            items: [
                "Mentoring ethical leadership through institutional partnerships.",
                "Facilitating discussions on sustainable governance frameworks.",
                "Capacity building for future public sector administration."
            ]
        },
        {
            category: "Entrepreneurship & Innovation",
            items: [
                "Providing access to tech-driven market entry strategies.",
                "Supporting SMEs with scalable operational blueprints.",
                "Fostering R&D for disruptive African solutions."
            ]
        },
        {
            category: "Civic Engagement & Advocacy",
            items: [
                "Empowering youth voices in legislative processes.",
                "Advocating for inclusive policy-making platforms.",
                "Strengthening community-based leadership hubs."
            ]
        },
        {
            category: "Personal & Professional Development",
            items: [
                "Curating masterclasses for high-level skill acquisition.",
                "Institutionalizing professional ethics and standards.",
                "Unlocking soft skills for global competitiveness."
            ]
        },
        {
            category: "Networking & Partnerships",
            items: [
                "Bridging the Gap between startup founders and VCs.",
                "Creating corridors for inter-continental trade networking.",
                "Solidifying strategic B2B and public-private alliances."
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden border-b border-white/5">
                <div className="container relative z-10 text-center">
                    <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-8">Intellectual Foundation</div>
                    <h1 className="text-4xl md:text-7xl text-white mb-10 font-black italic uppercase tracking-tighter leading-tight">
                        Theme & <span className="text-gradient NOT-italic">Objectives.</span>
                    </h1>
                    <div className="max-w-4xl mx-auto glass-panel p-10 rounded-[32px] border border-white/5 bg-white/[0.02]">
                        <p className="text-primary-copper font-black text-xs tracking-widest uppercase mb-4">Official 2026 Theme</p>
                        <h2 className="text-2xl md:text-4xl text-white font-light italic leading-tight">
                            “The Global Emerging Leader: <br className="hidden md:block" />
                            <span className="text-gradient font-black NOT-italic">Redefining the African Narrative”</span>
                        </h2>
                    </div>
                </div>
            </section>

            {/* Rationale & Outcomes */}
            <section className="py-40 bg-midnight-black relative overflow-hidden">
                <div className="motif-bg opacity-5"></div>
                <div className="container relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        <div>
                            <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-6">Theme Rationale</div>
                            <h2 className="text-3xl md:text-5xl text-white font-black italic uppercase tracking-tighter mb-8 leading-tight">
                                Narrative <span className="text-gradient NOT-italic">Transformation.</span>
                            </h2>
                            <div className="space-y-6 text-text-secondary text-lg font-light leading-relaxed">
                                <p>
                                    Africa stands at an unprecedented demographic tipping point. With over 60% of our population under 25, the continent is no longer just a participant in global affairs—it is the laboratory for the world's next major economic and leadership shift.
                                </p>
                                <p>
                                    This theme explores the necessity for African leaders to look beyond geographic boundaries, mastering <span className="text-white font-bold italic">Global Competitiveness</span> while maintaining authentic African values. We are redefining the narrative from one of struggle to one of authoritative excellence.
                                </p>
                            </div>
                        </div>

                        <div className="glass-panel p-12 rounded-[40px] border border-white/5">
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-10">Summit Outcomes</h3>
                            <div className="grid grid-cols-1 gap-8">
                                {outcomes.map((outcome, i) => (
                                    <div key={i} className="flex gap-6 items-center group">
                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary-copper group-hover:bg-primary-copper group-hover:text-white transition-all border border-white/5">
                                            {React.cloneElement(outcome.icon, { size: 22 })}
                                        </div>
                                        <p className="text-text-secondary font-medium tracking-tight group-hover:text-white transition-colors uppercase text-xs tracking-widest leading-loose">{outcome.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Objectives */}
            <section className="py-40">
                <div className="container">
                    <div className="text-center mb-20">
                        <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">Strategic Goals</div>
                        <h2 className="text-3xl md:text-5xl text-white font-black italic uppercase tracking-tighter">Event <span className="text-gradient NOT-italic">Objectives.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {objectives.map((obj, i) => (
                            <div key={i} className="glass-panel p-10 rounded-[40px] border border-white/5 hover:border-primary-copper/30 transition-all duration-700 bg-white/[0.01]">
                                <h3 className="text-lg font-black text-primary-copper uppercase tracking-widest mb-8 border-b border-white/5 pb-4">{obj.category}</h3>
                                <ul className="space-y-5">
                                    {obj.items.map((item, idx) => (
                                        <li key={idx} className="flex gap-4 items-start group/li">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 group-hover/li:bg-primary-copper transition-colors" />
                                            <span className="text-sm font-light text-text-secondary leading-relaxed group-hover/li:text-white transition-colors">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
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
