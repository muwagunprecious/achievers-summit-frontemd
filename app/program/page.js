"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Mic2, Presentation, GraduationCap, MapPin,
    Handshake, Briefcase, Award, Zap
} from 'lucide-react';

export default function ProgramPage() {
    const components = [
        {
            icon: <Mic2 />,
            title: "Keynote Sessions",
            desc: "Visionary addresses delivered by global heads of state and industry titans.",
            who: "All Delegates",
            outcomes: "Strategic high-level perspectives."
        },
        {
            icon: <Presentation />,
            title: "Plenary Sessions",
            desc: "Deep-dive panel discussions covering finance, policy, and technology.",
            who: "Corporate & Policy Leaders",
            outcomes: "Actionable thematic roadmaps."
        },
        {
            icon: <GraduationCap />,
            title: "Masterclasses",
            desc: "Intensive workshops for capacity building and vertical skillsets.",
            who: "Emerging Professionals",
            outcomes: "Certification & skill acquisition."
        },
        {
            icon: <MapPin />,
            title: "Exhibition Arena",
            desc: "Showcasing the latest from African startups and global tech entities.",
            who: "Entrepreneurs & Brands",
            outcomes: "Market exposure & brand visibility."
        },
        {
            icon: <Zap />,
            title: "Launch of EAI Consortium",
            desc: "The official unveiling of our multi-sector leadership alliance.",
            who: "Investors & Development Agencies",
            outcomes: "Institutional membership & partnerships."
        },
        {
            icon: <Handshake />,
            title: "Deal Rooms",
            desc: "Private matchmaking for high-stakes investment and capital raising.",
            who: "Startups & VCs",
            outcomes: "Direct capital funding rounds."
        },
        {
            icon: <Award />,
            title: "Private Dinner & Awards",
            desc: "A black-tie evening celebrating the 100Under40 Young Achievers.",
            who: "VIP & First Class Pass Only",
            outcomes: "Elite networking & recognition."
        }
    ];

    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden border-b border-white/5">
                <div className="container relative z-10 text-center">
                    <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-8">Event Architecture</div>
                    <h1 className="text-4xl md:text-7xl text-white mb-10 font-black italic uppercase tracking-tighter leading-tight">
                        Summit <span className="text-gradient NOT-italic">Components.</span>
                    </h1>
                    <p className="text-xl text-text-secondary font-light max-w-3xl mx-auto leading-relaxed">
                        A carefully curated program designed to provide depth, structure, and professional excellence.
                    </p>
                </div>
            </section>

            {/* Program Grid */}
            <section className="py-40">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {components.map((item, i) => (
                            <div key={i} className="glass-panel p-10 rounded-[40px] border border-white/5 hover:border-primary-copper/30 transition-all duration-700 group flex flex-col h-full bg-white/[0.01]">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary-copper mb-8 group-hover:bg-primary-copper group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-primary-copper/20">
                                    {React.cloneElement(item.icon, { size: 28 })}
                                </div>
                                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">{item.title}</h3>
                                <p className="text-text-secondary font-light leading-relaxed mb-8 flex-grow">{item.desc}</p>

                                <div className="space-y-4 pt-8 border-t border-white/5">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-text-muted">Targeted at:</span>
                                        <span className="text-primary-copper">{item.who}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-left">
                                        <span className="text-text-muted w-24">Outcome:</span>
                                        <span className="text-white flex-1 text-right">{item.outcomes}</span>
                                    </div>
                                </div>
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
