"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Flag, Target, Coins, ShieldCheck, Heart,
    Globe, Network, ArrowRight, Lightbulb, Users
} from 'lucide-react';

export default function ThemePage() {
    const objectives = [
        {
            category: "Leadership & Governance",
            icon: <ShieldCheck />,
            items: [
                "Strengthen leadership capacity among young Africans to prepare them for roles in public service, governance, diplomacy, and civil society.",
                "Promote responsible, ethical, and value-driven leadership to build trust and institutional stability."
            ]
        },
        {
            category: "Entrepreneurship & Innovation",
            icon: <Lightbulb />,
            items: [
                "Equip youth with entrepreneurial skills, access to resources, and mentorship networks.",
                "Showcase innovative African projects, startups, and youth-led ventures."
            ]
        },
        {
            category: "Civic Engagement & Advocacy",
            icon: <Flag />,
            items: [
                "Inspire young people to participate actively in civic processes and policy development.",
                "Encourage responsible citizenship, patriotism, and socio-political accountability."
            ]
        },
        {
            category: "Personal & Professional Development",
            icon: <Target />,
            items: [
                "Build confidence, global perspective, and resilience in emerging leaders.",
                "Provide exposure to top leaders across sectors, enabling mentorship and direct learning pathways."
            ]
        },
        {
            category: "Networking & Partnerships",
            icon: <Network />,
            items: [
                "Strengthen linkages between youth, government, private sector, donors, and development institutions.",
                "Create multi-sectoral partnerships that accelerate youth development and economic opportunities."
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-bg-deep pt-32">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden border-b border-black/5">
                <div className="container relative z-10 text-center">
                    <div className="text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">2026 Official Theme</div>
                    <h1 className="text-4xl md:text-7xl text-text-primary mb-6 font-black italic uppercase tracking-tighter leading-tight">
                        “The Global Emerging Leader: <br />
                        <span className="text-gradient NOT-italic font-black text-primary-copper">Redefining the African Narrative”</span>
                    </h1>
                </div>
            </section>

            {/* Rationale Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="motif-bg opacity-5"></div>
                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl text-text-primary font-black italic uppercase tracking-tighter">Theme <span className="text-primary-copper NOT-italic">Rationale</span></h2>
                            <div className="h-1 w-20 bg-primary-copper mx-auto"></div>
                        </div>
                        <div className="prose prose-invert max-w-none text-text-secondary text-lg font-light leading-relaxed space-y-6 text-center">
                            <p>
                                Africa is experiencing a historic demographic shift, with over 60% of its population under the age of 25. This generation of emerging leaders has the potential to reimagine Africa’s trajectory in governance, innovation, entrepreneurship, technology, education, and global diplomacy.
                            </p>
                            <p>
                                Despite enormous potential, young Africans still face systemic barriers including limited access to opportunities, low civic participation, constrained economic mobility, and insufficient platforms for leadership expression.
                            </p>
                            <p>
                                The theme reflects a central reality: today’s youth are no longer limited by geography. Technology, migration, global markets, and transnational collaboration have positioned African youth to participate meaningfully in global transformation.
                            </p>
                        </div>

                        <div className="glass-panel p-10 rounded-xs border border-black/10 bg-black/[0.02] space-y-8">
                            <h3 className="text-xl text-text-primary font-black italic uppercase tracking-tighter leading-tight text-center">The 2026 Summit seeks to explore how Africa's new generation can:</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    "Transition from local impact to global influence",
                                    "Drive value-based leadership",
                                    "Lead governance reforms",
                                    "Build enterprises that compete globally",
                                    "Innovate around African solutions",
                                    "Reclaim and redefine the continent’s global reputation"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-center group text-left">
                                        <div className="w-8 h-8 rounded-xs bg-primary-copper/10 border border-primary-copper/30 flex items-center justify-center text-primary-copper text-sm font-black transition-all group-hover:bg-primary-copper group-hover:text-white flex-shrink-0">
                                            {i + 1}
                                        </div>
                                        <span className="text-text-secondary text-base font-light group-hover:text-text-primary transition-colors">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Objectives Section */}
            <section className="pt-12 pb-24">
                <div className="container">
                    <div className="text-center mb-16">
                        <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">Core Objectives</div>
                        <h2 className="text-4xl md:text-5xl text-text-primary font-black italic uppercase tracking-tighter leading-tight">What We Aim to <span className="text-gradient NOT-italic">Achieve.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {objectives.map((obj, i) => (
                            <div key={i} className="glass-panel p-8 rounded-xs border border-black/5 hover:border-primary-copper/30 transition-all duration-500 group flex flex-col h-full">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-14 h-14 bg-black/5 rounded-xs flex items-center justify-center text-primary-copper border border-black/10 group-hover:scale-110 transition-transform">
                                        {React.cloneElement(obj.icon, { size: 28 })}
                                    </div>
                                    <h3 className="text-xl font-black text-text-primary uppercase italic tracking-tighter leading-tight flex-1">{obj.category}</h3>
                                </div>
                                <ul className="space-y-3 flex-1">
                                    {obj.items.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 items-start">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-copper flex-shrink-0" />
                                            <p className="text-text-secondary text-sm font-light leading-relaxed">{item}</p>
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
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(40px);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                }
                .text-gradient {
                    background: linear-gradient(to right, #1A1A1A, var(--primary-copper));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </main>
    );
}
